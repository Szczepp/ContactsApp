import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Output } from "@angular/core";
import { UserService } from "../_services/user.service";

export interface Contact {
    id: number,
    name: string,
    email: string,
    phone: string,
    password: string,
    category: any,
    dateOfBirth: Date
}

@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
    contactToLoad: any;
    contacts: Contact[] | undefined;
    loadContactCheck = false;
    title = 'Contacts';
    constructor(
        private userService: UserService
    ) {
    }
    ngOnInit(): void {
        this.getContacts();
    }

    loadContact(contactId: Contact) {
        this.loadContactCheck = true;
        this.contactToLoad = contactId;
    }

    getContacts() {
        this.userService.getContacts().subscribe(
            response => {
                console.log(response);
                this.contacts = response.$values;
            }, error => {
                this.contacts = [
                    {
                        category : null,
                        dateOfBirth : new Date("2000-12-10T13:45:00"),
                        email: "Test1@test.com",
                        id: 1,
                        name: "John Doe",
                        password: "zaqfgj1@8WSX",
                        phone: "+48123123123"
                    },
                    {
                        category : null,
                        dateOfBirth : new Date("2002-12-10T13:45:00"),
                        email: "test2@test.com",
                        id: 2,
                        name: "Jack Ichan",
                        password: "z23gaq1@WSX",
                        phone: "+48123123123"
                    },
                    {
                        category : null,
                        dateOfBirth : new Date("2001-12-10T13:45:00"),
                        email: "tes3@test.com",
                        id: 3,
                        name: "Marie C.",
                        password: "zadg32q1@WSX",
                        phone: "+48123123123"
                    },
                    {
                        category : null,
                        dateOfBirth : new Date("1998-12-10T13:45:00"),
                        email: "test4@test.com",
                        id: 4,
                        name: "Peter Griffin",
                        password: "zadfg43q1@WSX",
                        phone: "+48123123123"
                    },
                ]
            }

        );
    }
}
