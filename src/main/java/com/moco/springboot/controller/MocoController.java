package com.moco.springboot.controller;

import com.moco.springboot.mapper.MocoMapper;
import com.moco.springboot.pojo.Moco;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class MocoController {
    private final Logger LOG = LoggerFactory.getLogger(MocoController.class);
    @SuppressWarnings("all")
    @Autowired
    MocoMapper mocoMapper;

    @RequestMapping("/listMoco")
    public String listMoco(Model model) {
        List<Moco> mocos = mocoMapper.findAll();
        model.addAttribute("mocos", mocos);
        return "listMoco";
    }

    @RequestMapping("/add") //用户接口post提交
    @ResponseBody
    public String add(HttpServletRequest request){
        String sqlKey = request.getParameter("sqlKey");
        String method = request.getParameter("method");
        if(method!=null&&method.equalsIgnoreCase("get")){
            method = "get";
        }else{
            method = "post";
        }
        String uri = request.getParameter("uri");
        String req = request.getParameter("req");
        if(req==null){
            req = "";
        }
        String rsp = request.getParameter("rsp");
        int i = mocoMapper.add(sqlKey,method,uri,req,rsp);
        LOG.info("影响行数="+i+"行");
        if(i>0){
            return "add sucess";
        }else {
            return "add fail";
        }

    }

    @RequestMapping(value = "/update")
    public String update(@ModelAttribute("listMoco") Moco m){
        LOG.info("提交保存页面");
        LOG.info("参数：Method="+m.getMethod()+"|uri="+m.getUri()+"|req="+m.getReq()+"|rsp="+m.getRsp()+"|id="+m.getId());
        int i = mocoMapper.update("update",m.getMethod(),m.getUri(),m.getReq(),m.getRsp(),m.getId());
        LOG.info("影响行数="+i+"行");
        if(i>0){
            return "success";
        }else {
            return "fail";
        }
    }

}
