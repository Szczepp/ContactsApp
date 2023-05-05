import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

  constructor(
    private userService : UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
    )
  { }
  
  updateContactForm!: FormGroup;
  submitted = false;
  selectedContactId: any
  contactValues: any
  loading: boolean = false;
  categories!: any
  formValues!: any
  
  get f() { return this.updateContactForm?.controls}

  getCategories(): any{
    this.userService.getCategories().subscribe(response => {
      this.categories = response.$values;
    });
  } 

  getParam(): void {
    this.route.params.subscribe(params => {
      this.selectedContactId = +params['id'];
    });
  }

  getContact(contactId: number) : void {
    this.userService.getContact(contactId).subscribe(response => {
      this.contactValues = response;
      //console.log("contact: " + JSON.stringify(this.contactValues));

    });
  }

  ngOnInit(): void {
    this.getParam();
    this.getCategories();
    this.getContact(this.selectedContactId);
    this.updateContactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      category: ['', Validators.required],
    });
    console.log("contact: " + JSON.stringify(this.contactValues));
    
    
  }

  onSubmit(): void {
    this.loading = true;
  }

}
