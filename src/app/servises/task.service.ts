import { UserService } from './user.service';
import { Injectable } from '@angular/core';

interface User {
  id: string,
  email: string,
  tasks: []
}

@Injectable()
export class TaskService {
  constructor(private auth: UserService){}

  tasks: any;
  id: string;
  email: any;

  setUser(email){
    this.email = email;
  }

  getUserEmail(){
    return this.email;
  }
  
  getUserTasks(){
    return this.tasks;
  }

  getUserId(){
    return this.id;
  }

  setTask(){
    this.auth.getUserByEmail(this.email).subscribe((response: User)=>{
      this.id = response[0].id;
      this.tasks = response[0].tasks;
    });
  }
}
