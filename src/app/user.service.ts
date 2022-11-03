import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }
  
  getContacts() {
    return this.httpClient.get<any>('https://localhost:44335/api/contact');
  }
  getContact(contactId: number) {
    return this.httpClient.get<any>('https://localhost:44335/api/contact/' + contactId);
  }
}
