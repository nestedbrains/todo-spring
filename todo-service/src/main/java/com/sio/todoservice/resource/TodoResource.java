package com.sio.todoservice.resource;

import com.sio.todoservice.config.AuthenticationBean;
import com.sio.todoservice.model.Todo;
import com.sio.todoservice.service.HardCodedTodoService;
import com.sun.jndi.toolkit.url.Uri;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200", "http://localhost:8081" })
@RestController
public class TodoResource {

    @Autowired
    HardCodedTodoService todoService;

    @GetMapping(path = "/basicauth")
    public AuthenticationBean helloWorldBean() {
        //throw new RuntimeException("Some Error has Happened! Contact Support at ***-***");
        return new AuthenticationBean("You are authenticated");
    }

    @GetMapping("/users/{userName}/todos")
    public List<Todo> getAllTodos(@PathVariable String userName) {
        return todoService.findAll();
    }

    @GetMapping("/users/{userName}/todos/{id}")
    public Todo getTodo(@PathVariable String userName, @PathVariable int id) {
        return todoService.findById(id);
    }


    @PostMapping("/users/{userName}/todos")
    public ResponseEntity<Void> save(@PathVariable String userName, @RequestBody Todo todo) {
        Todo result = todoService.saveOrdUpdate(todo);

        //get the url from newly created result-info
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/id").buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Todo> update(@PathVariable String userName, @PathVariable String id, @RequestBody Todo todo) {
        Todo result = todoService.saveOrdUpdate(todo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable int id, @PathVariable String userName) {
        Todo todo = todoService.deleteById(id);
        if (todo != null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
