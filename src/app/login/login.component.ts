import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
     private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
    ) { 
      if (this.userService.currentUserValue) { 
        this.router.navigate(['/']);
      }
    }

    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl?: string;
    error!: string

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm?.controls; }

  onSubmit(): void {
    this.submitted = true;

    if(this.loginForm?.invalid) {
      return ;
    }
    this.loading = true;
    this.userService.login(this.f?.username.value, this.f?.password.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error.error;
        this.loading = false;
      }
    )
  }
 
}
