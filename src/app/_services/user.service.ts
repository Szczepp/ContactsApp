import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private user? : any = localStorage.getItem('currentUser');
  private token! : string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(this.user));
    this.currentUser = this.currentUserSubject.asObservable();
  }

    public get currentUserValue() {
      return this.currentUserSubject.value;
    }
    public get currentUserToken() {
      return this.token;
    }
  
  getContact(contactId: number) {
    return this.httpClient.get<any>('https://localhost:44335/api/contact/' + contactId);
  }

  getContacts() {
    return this.httpClient.get<any>('https://localhost:44335/api/contact');
  }

  addContact(contact: any) {
    const jsonContact  = {
      "name": contact.name,
      "email": contact.email,
      "password": contact.password,
      "phone": contact.phone,
      "dateOfBirth": contact.dateOfBirth,
      "category": {
        "id": contact.category
      }
    };
        
    return this.httpClient.post<any>('https://localhost:44335/api/contact/add', jsonContact);
  }

  getCategories() {
    return this.httpClient.get<any>('https://localhost:44335/api/category');
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>(`https://localhost:44335/api/authentication/login`, { username, password })
        .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.token = user.token;
            localStorage.setItem('currentUserToken', user.token);
            return user;
        }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserToken');
    this.currentUserSubject.next(null);
  }
}
