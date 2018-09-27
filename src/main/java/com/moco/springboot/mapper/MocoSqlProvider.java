package com.moco.springboot.mapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class MocoSqlProvider {
    private final Logger LOG = LoggerFactory.getLogger(MocoSqlProvider.class);
    @Autowired private MocoMapper mocoMapper;

    public String add(String sqlKey, String method, String uri, String req, String rsp){
        int t = mocoMapper.add(sqlKey, method, uri, req, rsp);
        LOG.info("添加条目=" + t);
        if(t==1){
            LOG.info("add sucess");
            return "sucess";
        }else{
            LOG.info("add fail");
            return "fail";
        }

    }

    public String update(String sqlKey, String method, String uri, String req, String rsp, String id){
        int t = mocoMapper.update(sqlKey,method,uri,req,rsp,id);
        LOG.info("更新条目=" + t);
        if(t==1){
            LOG.info("update sucess");
            return "sucess";
        }else{
            LOG.info("update fail");
            return "fail";
        }
    }

}
