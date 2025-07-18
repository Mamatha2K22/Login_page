import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api-service/api-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ReactiveFormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  userList: any[] = [];
  searchId: string = "";
  filterSearch: any[] = [];

  dashboardform!: FormGroup







  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);




  ngOnInit(): void {

    this.userList = this.route.snapshot.data['preload'];
    this.filterSearch = this.userList;
    console.log('Resolved user list:', this.userList);

  }

  onSearch(): void {
    const trimmedElement = this.searchId.trim();

    if (!trimmedElement) {
      // If the search box is empty, show all users
      this.filterSearch = this.userList;
    } else {
      const searchIdNumber = Number(trimmedElement);

      this.filterSearch = this.userList.filter(user =>
        user.userId === searchIdNumber
      );
    }
  }



  onDelete(itemToDelete: any): void {
    this.userList = this.userList.filter(item => item != itemToDelete);

    this.onSearch();
  }

}
