import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; //  important
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message'; // for <p-message>
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DividerModule, PasswordModule, InputTextModule, ButtonModule, MessageModule, DatePickerModule, RadioButtonModule, FormsModule, ToastModule, CheckboxModule, AutoCompleteModule], //  must import CommonModule for *ngIf
  templateUrl: './login.html',
  providers: [MessageService],
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  isLoginview = true; //to view login or register
  formSubmitted: boolean = false;
  loginForm!: FormGroup; // login form group
  registerForm!: FormGroup; // register form group
  ingredient!: string;
  filteredRatings: { [key: string]: string[] } = {};
  subjects = ['java', 'python', 'angular', 'django'];


  private fb = inject(FormBuilder);
  private router = inject(Router);
  private ms = inject(MessageService);



  ngOnInit(): void { // life cycle hook to run component is ianstalized
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    const subjectControls: any = {};
    this.subjects.forEach((subject) => {
      subjectControls[subject] = [false]; // checkbox
      subjectControls[`${subject}Rating`] = ['']; // dropdown rating
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      ingredient: [''],
      date2: [null, Validators.required],
      ...subjectControls

    });


  }

  search(event: AutoCompleteCompleteEvent, subject: string): void {
    const allRatings = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

    // Filter ratings based on user query
    const filtered = allRatings.filter(rating =>
      rating.toLowerCase().includes(event.query.toLowerCase())
    );

    // Assign filtered ratings under the subject key
    this.filteredRatings[subject] = filtered;
  }

  get formKeys(): string[] {
    return this.subjects;
  }
  isInvalid(): boolean {
    return this.formSubmitted && !this.isAtLeastOneSubjectSelected();
  }
  isAtLeastOneSubjectSelected(): boolean {
    return this.subjects.some((subject) => this.registerForm.get(subject)?.value);
  }
  isRatingMissingFor(subject: string): boolean {
    return this.registerForm.get(subject)?.value && !this.registerForm.get(`${subject}Rating`)?.value;
  }





  onRegister(): void {


    this.formSubmitted = true;
    if (!this.registerForm.valid) {
      this.ms.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields.',
        life: 3000,
      });
      return;
    }
    if (!this.isAtLeastOneSubjectSelected()) {
      this.ms.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please select at least one subject.',
        life: 3000,
      });
      return;
    }
    for (const subject of this.subjects) {
      if (this.isRatingMissingFor(subject)) {
        this.ms.add({
          severity: 'error',
          summary: 'Validation',
          detail: `Please select rating for ${subject}`,
          life: 3000,
        });
        return;
      }
    }
    const newUser = this.registerForm.value;
    const key = 'Local';
    const users = JSON.parse(localStorage.getItem(key) || '[]');//converting the string format to array of object





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


    if (newUser.password != newUser.confirm_password) {
      alert('Password is not matching');
      return;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(newUser.password)) {
      alert("Password must contain at least 1 uppercase letter, 1 digit, and 1 special character.");
      return;
    }





    if (!newUser.date2) {
      alert('Date is Required');
      return;
    }









    users.push(newUser);
    localStorage.setItem(key, JSON.stringify(users));

    this.ms.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Registered successfully!',
      life: 3000
    });





    // Save user to localStorage
    //convert the updated array to string




    // Success alert and switch view


    this.registerForm.reset();
    this.formSubmitted = false;
    this.isLoginview = true; // Show login form after success
  }

  get dateFormat(): string {
    const format = this.registerForm.get('ingredient')?.value;
    return format === 'mm-dd-yy' ? 'mm-dd-yy' : 'dd-mm-yy';
  }





  onLogin(): void {
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
