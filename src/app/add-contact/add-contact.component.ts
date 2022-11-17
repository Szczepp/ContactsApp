import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from '../_services';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  addContactForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl?: string;
  error!: string
  categories!: any
  formValues!: any
  contact!: any

  getCategories(): any{
    this.userService.getCategories().subscribe(response => {
      this.categories = response.$values;
    });
  } 
  
  ngOnInit(): void {
    this.addContactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      category: ['', Validators.required],
    })
    console.log(this.categories);
    this.getCategories();
  }
  get f() { return this.addContactForm?.controls; }

  onSubmit(): void {
    this.submitted = true;

    if(this.addContactForm?.invalid) {
      return ;
    }
    this.loading = true;
    this.formValues = this.addContactForm.value;
    this.contact = this.formValues;

    console.log(this.contact);

    this.userService.addContact(this.contact)
    .pipe(first())
    .subscribe(response => {
      console.log(this.contact);
      console.log("contact added");
    }, error => {
        console.log(error);
    });

  }
}
