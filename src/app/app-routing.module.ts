import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {MainComponent} from './main/main.component';
import {AuthGuard} from './auth.guard';
import {AddTaskComponent} from './main/add-task/add-task.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      {path: '', component: AddTaskComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
