import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../servises/user.service';
import { DialogService } from '../servises/dialog.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { AuthService } from '../servises/auth.service';
import { TaskService } from '../servises/task.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
form: FormGroup;
user: any;

  constructor(
    private api: UserService,
    private auth: AuthService,
    private tasks: TaskService,
    private router: Router,
    private dialogService: DialogService,   
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(){
    let formData = this.form.value;
    this.api.getUserByEmail(formData.email).subscribe((response) => {
      this.user = response
      if(this.user .length){
        if(this.user[0].password == formData.password){
          this.tasks.setUser(this.user[0].email);
          this.tasks.setTask();
          this.auth.login();
          this.router.navigate(['/main']);
        }
        else {
          const warning = {
            'text': 'Введен неверный пароль!',
            confirmButtonText: 'Ок'
          };
          this.dialogService.openDialog(AlertDialogComponent, warning);  
        }
      } 
      else {
        const warning = {
          'text': 'Пользователь с такой почтой не зарегистрирован.',
          confirmButtonText: 'Ок'
        };
        this.dialogService.openDialog(AlertDialogComponent, warning);
      }
    });
  }

  openDialog(){
    const warning = {
      'text': 'Пользователь с такой почтой не зарегистрирован.',
      confirmButtonText: 'Ок'
    };
    this.dialogService.openDialog(AlertDialogComponent, warning);
  }

}
