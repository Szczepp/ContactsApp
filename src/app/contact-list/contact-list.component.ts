import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Output } from "@angular/core";
import { UserService } from "../_services/user.service";

export interface Contact {
    id: number,
    name: string,
    email: string, 
    phone: string,
    password: string, 
    category: string, 
    dateOfBirth: Date
}

@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit{
    contactToLoad: any;
    contacts: Contact[] | undefined;
    loadContactCheck = false;
    title = 'Contacts';
    constructor(
       private httpClient: HttpClient,
       private userService: UserService
    ) {
    }
    ngOnInit(): void {
        this.getContacts();
    }

    loadContact(contactId: Contact){
        this.loadContactCheck = true;
        this.contactToLoad = contactId;
    }

    getContacts() {
        this.userService.getContacts().subscribe(
            response => {
                console.log(response);
                this.contacts = response;
            }
        );
    }
}
