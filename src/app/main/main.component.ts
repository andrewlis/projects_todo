import { Component, OnInit } from '@angular/core';
import { TaskService } from '../servises/task.service';
import { UserService } from '../servises/user.service';
import { DialogService } from '../servises/dialog.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  viewedTasks: any;
  userId: string = this.tasks.getUserId();

  constructor(
    private tasks: TaskService,
    private api: UserService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
      setTimeout(() => {
        this.viewedTasks = this.getAll();
        this.userId = this.tasks.getUserId();
      }, 200)
  }

  getAll(){
    return this.tasks.getUserTasks();
  }

  priorityFilter(event){
    if(event){
      this.viewedTasks = this.getAll();
      this.viewedTasks =  this.viewedTasks.filter(e => e.priority === event);
    }
    else{
      this.viewedTasks = this.getAll();
    }
  }


  doneFilter(event){
    if(event === ''){
      this.viewedTasks = this.getAll();
    }
    else {
      this.viewedTasks = this.getAll();
      this.viewedTasks = this.viewedTasks.filter(e => e.done === JSON.parse(event));
    }
  }

  cangeState(event,i){
    event.preventDefault();
    if(!this.viewedTasks[i].done){
    }
    this.viewedTasks[i].done = !this.viewedTasks[i].done;
    this.api.putUserByEmail(this.viewedTasks, this.userId).subscribe(()=>{
    });
    this.viewedTasks = this.getAll();
  }

  deleteTask(i){
    const data = {
      text: 'Вы действительно хотите удалить документ?',
      confirmButtonText: 'Да',
      notButtonText: 'Нет'
    };
    this.dialogService.openDialog(AlertDialogComponent, data).subscribe((confirmRes) => {
      if(confirmRes){
        this.viewedTasks.splice(i, 1);
        this.api.putUserByEmail(this.viewedTasks, this.userId).subscribe(()=>{});
      }
    });  
  }

  showAll(ev){
    const taskList = ev.target.offsetParent.nextSibling.classList;
    const arrow = ev.target.classList;
    if(taskList.contains('show')){
      arrow.remove('rotate');
      taskList.remove('show');
    }
    else{
      taskList.add('show');
      arrow.add('rotate');
    }
  }

}
