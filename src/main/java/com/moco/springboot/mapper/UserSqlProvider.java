package com.moco.springboot.mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


public class UserSqlProvider {
    private final Logger LOG = LoggerFactory.getLogger(UserSqlProvider.class);
    @Autowired private UserMapper userMapper;
    /**
     * 方式1：在工具类的方法里,可以自己手工编写SQL。
     */
    public String listByUsername(String username) {
        return "select * from t_user where username =#{username}";
    }

    /**
     * 方式2：也可以根据官方提供的API来编写动态SQL。
     */
    public String getBadUser(@Param("username") String username, @Param("password") String password) {
        return new SQL() {{
            SELECT("*");
            FROM("t_user");
            if (username != null && password != null) {
                WHERE("username like #{username} and password like #{password}");
            } else {
                WHERE("1=2");
            }
        }}.toString();
    }

    public String add(String username, String password){
        int t = userMapper.add(username,password);
        LOG.info("t=" + t);
        if(t==1){
            LOG.info("sucess");
            return "sucess";
        }else{
            LOG.info("fail");
            return "fail";
        }

    }

}
