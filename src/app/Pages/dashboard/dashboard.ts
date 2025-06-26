import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api-service/api-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  
  userList: any[] = [];

  commentObj: any = {
    userId: 0,
    title: '',
    body: ''
  };

  username: string | null = null;

  private apiService = inject(ApiService);
   private route = inject(ActivatedRoute);
  
  
  constructor(private router: Router) {
    this.username = localStorage.getItem('loggedInUser');
  }

  ngOnInit(): void {
    
    this.userList = this.route.snapshot.data['preload'];
    console.log('Resolved user list:', this.userList);
  }

  getUsers() {
    this.apiService.getUsers().subscribe(data => {
      console.log("Users fetched:", data);
      this.userList = data;
    });
  }

  onSave() {
    this.apiService.postComment(this.commentObj).subscribe(res => {
      this.userList = [...this.userList, res];
      this.commentObj = { userId: 0, title: '', body: '' };
    });
  }

 onEdit(item: any) {
  this.commentObj = { ...item }; 
}
  onUpdate() {
  this.apiService.updatePost(this.commentObj).subscribe({
    next: (res: any) => {
      console.log('Post updated:', res);

      // Find index of the updated comment in userList by id
      const index = this.userList.findIndex(item => item.id === this.commentObj.id);

      if (index !== -1) {
        // Update the list item with new data (res or commentObj)
        this.userList[index] = { ...res, id: this.commentObj.id };
      }

      alert('Comment updated:\n' + JSON.stringify(res, null, 2));

      // Reset form
      this.commentObj = { userId: 0, title: '', body: '' };
    },
    error: (err) => {
      console.error('Error updating comment:', err);
      alert('Failed to update comment.');
    }
  });
}



  onDelete(id: number) {
    if (confirm('Delete this post?')) {
      this.apiService.deletePost(id).subscribe(() => {
        this.userList = this.userList.filter(item => item.id !== id);
      });
    }
  }

  onLogout(): void {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    this.router.navigateByUrl('/login');
  }
}
