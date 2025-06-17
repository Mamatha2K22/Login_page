import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('loggedInUser'); // Clear session (optional)
    alert('Logged out successfully!');
    this.router.navigateByUrl('login'); // Redirect to login page
  }

}
