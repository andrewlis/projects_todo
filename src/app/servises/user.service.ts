import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  
    getUserByEmail(email?: string){
     return this.httpClient.get(`http://localhost:3000/users?email=${email}`);
    }

    putUserByEmail(tasks, user_id){
      return this.httpClient.patch(`http://localhost:3000/users/${user_id}`, {tasks: tasks});
    }
}
