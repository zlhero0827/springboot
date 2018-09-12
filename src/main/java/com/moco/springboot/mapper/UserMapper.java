package com.moco.springboot.mapper;

import com.moco.springboot.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
        @Select("SELECT * FROM t_user")
        List<User> findAll();

        /**
         * 方式1：使用注解编写SQL。
         */
        @Select("select * from t_user")
        @Results({
                @Result(property = "mobileNum", column = "PHONE_NUM")
        })
        List<User> list();

        /**
         * 方式2：使用注解指定某个工具类的方法来动态编写SQL.
         */
        @SelectProvider(type = UserSqlProvider.class, method = "listByUsername")
        @Results({
                @Result(property = "mobileNum", column = "PHONE_NUM")
        })
        List<User> listByUsername(String username);

        /**
         * 延伸：上述两种方式都可以附加@Results注解来指定结果集的映射关系.
         *
         * PS：如果符合下划线转驼峰的匹配项可以直接省略不写。
                @Results({
                        @Result(property = "userId", column = "USER_ID"),
                        @Result(property = "username", column = "USERNAME"),
                        @Result(property = "password", column = "PASSWORD"),
                        @Result(property = "mobileNum", column = "PHONE_NUM")
                })
         */

        @Select("select * from t_user")
        @Results({
                @Result(property = "mobileNum", column = "PHONE_NUM")
        })
        List<User> listSample();

        /**
         * 延伸：无论什么方式,如果涉及多个参数,则必须加上@Param注解,否则无法使用EL表达式获取参数。
         */
        @Select("select * from t_user where username like #{username} and password like #{password}")
        @Results({
                @Result(property = "mobileNum", column = "PHONE_NUM")
        })
        User get(@Param("username") String username, @Param("password") String password);

        @SelectProvider(type = UserSqlProvider.class, method = "getBadUser")
        @Results({
                @Result(property = "mobileNum", column = "PHONE_NUM")
        })
        User getBadUser(@Param("username") String username, @Param("password") String password);

        /**
         * 新增一条数据
         * @param username
         * @param password
         * @return
         */
        @Insert("INSERT INTO t_user(username,password) VALUES (#{username},#{password})")
        int add(@Param("username") String username, @Param("password") String password);

}
