import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo-list/Todo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from 'src/app/service/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo: Todo = new Todo(1, "", new Date(), "", false)
  id: number

  constructor(private route: ActivatedRoute, private todoService: TodoDataService, private router: Router) { }

  ngOnInit(): void {

    this.show()

  }

  show() {
    this.id = this.route.snapshot.params["id"]
    this.todo = new Todo(this.id, "", new Date(), "", false)
    if (this.id != -1) {
      this.todoService.getTodo("ovi", this.id).subscribe(
        (data: any) => {
          this.todo = data
          console.log(this.todo.targetedDate)
        }
      )
    }
  }

  saveOrUpdate() {
    if (this.id == -1) {
      this.todoService.postTodo("ovi", this.todo).subscribe(
        data => {
          console.log(data)
          this.router.navigate(["todo"])
        }
      )
    }
    else {
      this.todoService.updateTodo("ovi", this.id, this.todo).subscribe(
        data => {
          console.log(data)
          this.router.navigate(["todo"])
        }
      )
    }
  }
}