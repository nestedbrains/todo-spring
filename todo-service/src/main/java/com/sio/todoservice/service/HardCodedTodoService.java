package com.sio.todoservice.service;

import com.sio.todoservice.model.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class HardCodedTodoService {

    private static List<Todo> TODO_LIST = new ArrayList<>();
    private static int idCounter = 0;

    static {
        TODO_LIST.add(new Todo(++idCounter, "Abc", new Date(), "DER", false));
        TODO_LIST.add(new Todo(++idCounter, "ASD", new Date(), "DEQWER", true));
        TODO_LIST.add(new Todo(++idCounter, "FRD", new Date(), "SCSD", false));
    }

    public List<Todo> findAll() {
        return TODO_LIST;
    }

    public Todo findById(int id) {
        for (Todo todo : TODO_LIST) {
            if (todo.getId() == id) {
                return todo;
            }
        }

        return null;
    }

    public Todo deleteById(int id) {
        Todo todo = findById(id);
        if (todo == null) {
            return null;
        }
        if (TODO_LIST.remove(todo)) {
            return todo;
        }

        return null;
    }

    public Todo saveOrdUpdate(Todo todo) {
        if (todo.getId() == -1 || todo.getId() == 0) {
            todo.setId(++idCounter);
            TODO_LIST.add(todo);
        }
        else {
            deleteById(todo.getId());
            TODO_LIST.add(todo);
        }
        return todo;
    }
}
