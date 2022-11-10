import { HttpClient } from "@angular/common/http";
import { Component, Input, OnChanges } from "@angular/core";
import { Contact } from "../contact-list.component";
import { UserService } from "../../_services/user.service";


@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnChanges{
    @Input() contactToLoad : any;

    contact!: Contact; 
    constructor(
       private httpClient: HttpClient,
       private userService: UserService

    ) {
    }
    ngOnChanges(): void {
        this.getContact()
    }
    getContact() {
        this.userService.getContact(this.contactToLoad.id).subscribe(response => {
            console.log(response);
            this.contact = response;
        });

    }
}