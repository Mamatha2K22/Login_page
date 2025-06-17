import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; //  important

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], //  must import CommonModule for *ngIf
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  isLoginview = true; //to view login or register

  loginForm!: FormGroup; // login form group
  registerForm!: FormGroup; // register form group

  private fb = inject(FormBuilder); 
  private router = inject(Router);

  ngOnInit(): void { // life cycle hook to run component is instalized
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onRegister():void {
  const key = 'Local';
  const users = JSON.parse(localStorage.getItem(key) || '[]');
  const newUser = this.registerForm.value;

  // Validate Gmail only
  if (!newUser.email.endsWith('@gmail.com')) {
    alert('Email must end with @gmail.com');
    return;
  }

  // Check if user already exists
  const exists = users.find((u: any) => u.email === newUser.email);
  if (exists) {
    alert('Email already exists!');
    return;
  }

  // Save user to localStorage
  users.push(newUser);
  localStorage.setItem(key, JSON.stringify(users));

  // Success alert and switch view
  alert('Registered successfully!');
  this.registerForm.reset();
  this.isLoginview = true; // Show login form after success
}
 onLogin():void {
  const key = 'Local';
  const users = JSON.parse(localStorage.getItem(key) || '[]');
  const loginUser = this.loginForm.value;

  const found = users.find((u: any) =>
    u.email === loginUser.email && u.password === loginUser.password
  );

  if (found) {
    alert('Login successful!');
    this.router.navigateByUrl('dashboard'); // Adjust route name if needed
  } else {
    alert('Email or password is incorrect.');
  }
}


}
