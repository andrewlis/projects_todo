import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { TaskService } from 'src/app/servises/task.service';
import { UserService } from 'src/app/servises/user.service';
import { DialogService } from 'src/app/servises/dialog.service';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  form: FormGroup;
  viewedTasks: any;
  userId: string;

  constructor(
    private tasks: TaskService,
    private api: UserService,
    private dialogService: DialogService, 
  ) { }


  ngOnInit() {
    let now = new Date();
    const date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`; 
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'date': new FormControl(date),
      'description': new FormControl('', [Validators.required]),
      'priority': new FormControl('', [Validators.required]),
      'planedTime': new FormControl('', [Validators.required]),
      'factTime': new FormControl(''),
      'done': new FormControl('false'),
    });
    setTimeout(() => {
      this.viewedTasks = this.tasks.getUserTasks();
      this.userId = this.tasks.getUserId();
    }, 200)
  }

  onSubmit(){
    let obj = {
      name: this.form.value.name,
      date: this.form.value.date,
      description: this.form.value.description,
      priority: this.form.value.priority,
      planedTime: this.form.value.planedTime,
      factTime: this.form.value.factTime,
      done: this.form.value.done,
    }
    this.viewedTasks.push(obj);
    this.api.putUserByEmail(this.viewedTasks, this.userId).subscribe(()=>{
      const warning = {
        'text': 'Дело добавлено!',
        confirmButtonText: 'Ок'
      };
      this.dialogService.openDialog(AlertDialogComponent, warning);  
      this.form.reset();
    });
  }

}
