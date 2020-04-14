import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  retriveAllTodos(userName) {
    return this.http.get<Todo[]>(`http://localhost:8080/users/${userName}/todos`)
  }

  deleteTodo(userName, id) {
    return this.http.delete(`http://localhost:8080/users/${userName}/todos/${id}`)
  }


  getTodo(userName, id) {
    return this.http.get<Todo>(`http://localhost:8080/users/${userName}/todos/${id}`)
  }

  postTodo(userName, todo) {
    return this.http.post(`http://localhost:8080/users/${userName}/todos`, todo)
  }

  updateTodo(userName, id, todo) {
    return this.http.put(`http://localhost:8080/users/${userName}/todos/${id}`, todo)
  }
}
