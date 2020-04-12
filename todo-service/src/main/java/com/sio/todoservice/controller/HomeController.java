package com.sio.todoservice.controller;

import com.sio.todoservice.model.Home;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping(path = "/home")
    public Home home(){
        return new Home("Ovi Islam");
    }
}
