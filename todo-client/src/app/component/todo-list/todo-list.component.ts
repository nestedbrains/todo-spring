import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';
import { TodoDataService } from 'src/app/service/todo-data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[]
  message: string

  constructor(private todoService: TodoDataService, private router: Router) { }

  ngOnInit(): void {
    this.refreshTodo()
  }

  refreshTodo() {
    this.todoService.retriveAllTodos("ovi").subscribe(
      response => {
        console.log(response)
        this.todos = response
      }
    )
  }

  deleteTodo(id) {
    this.todoService.deleteTodo("ovi", id).subscribe(
      response => {
        console.log(response)
        this.message = `Todo with id : ${id} is successfully delete `
        this.refreshTodo()
      }
    )
  }

  updateTodo(id) {
    console.log(id)
    this.router.navigate(['todo', id])
  }

  AddTodo() {
    this.router.navigate(["todo", -1])
  }

}
