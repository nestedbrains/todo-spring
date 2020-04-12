package com.sio.todoservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Todo {
    private int id;
    private String title;
    private Date targetedDate;
    private String description;
    private boolean isCompleted;
}
