import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Router } from '@angular/router';
import { Todo } from '../model/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {


  data: Todo[]
  message: string

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.refreshTodo()
  }

  refreshTodo() {
    this.todoService.retriveAllTodos("ovi").subscribe(
      response => {
        console.log(response)
        this.data = response
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
