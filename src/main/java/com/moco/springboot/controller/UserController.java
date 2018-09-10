package com.moco.springboot.controller;

import com.moco.springboot.mapper.UserMapper;
import com.moco.springboot.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/user/*")
public class UserController {
    @SuppressWarnings("all")
    @Autowired
    UserMapper userMapper;

    @GetMapping("list")
    public List<User> list() {
        return userMapper.list();
    }

    @RequestMapping("/listUser")
    public String listUser(Model model) {
        List<User> users = userMapper.findAll();
        model.addAttribute("users", users);
        return "listUser";
    }

    @GetMapping("list/{username}")
    public List<User> listByUsername(@PathVariable("username") String username) {
        return userMapper.listByUsername(username);
    }

    @GetMapping("get/{username}/{password}")
    public User get(@PathVariable("username") String username, @PathVariable("password") String password) {
        return userMapper.get(username, password);
    }

    @GetMapping("get/bad/{username}/{password}")
    public User getBadUser(@PathVariable("username") String username, @PathVariable("password") String password) {
        return userMapper.getBadUser(username, password);
    }

    @RequestMapping("/test1")
    @ResponseBody
    public String test1(String name, String pwd){
        String s1 = name;
        String s2 = pwd;
        return s1+s2;
    }

    @RequestMapping("/test2")
    @ResponseBody
    public String test2(HttpServletRequest request){
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        return firstName + lastName;
    }

    @RequestMapping("/test3")
    @ResponseBody
    public String test3(User user){
        String username =user.getUsername();
        String password = user.getPassword();
        return username + password;
    }

    @RequestMapping(value = "/kkk")
    public String kkk(){
        return "test2";
    }

    @RequestMapping(value = "/test6")
    public String test6(@ModelAttribute("kkk") User s){
        return "test3";
    }
}
