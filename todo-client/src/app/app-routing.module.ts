import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { ErrorComponent } from './component/error/error.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { LogoutComponent } from './component/logout/logout.component';
import { TodoComponent } from './component/todo/todo.component';
import { AuthGuardService } from './service/auth-guard.service';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardService] },
  { path: 'todo', component: TodoListComponent, canActivate: [AuthGuardService] },
  { path: 'todo/:id', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
