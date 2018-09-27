package com.moco.springboot.mapper;


import com.moco.springboot.pojo.Moco;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MocoMapper {
    @Select("SELECT * FROM moco")
    List<Moco> findAll();

    /**
     * 新增一条数据
     * @param sqlKey
     * @param method
     * @param uri
     * @param req
     * @param rsp
     * @return
     */
    @Insert("INSERT INTO moco(sqlKey,method,uri,req,rsp) VALUES (#{sqlKey},#{method},#{uri},#{req},#{rsp})")
    int add(@Param("sqlKey") String sqlKey, @Param("method") String method, @Param("uri") String uri,
            @Param("req") String req, @Param("rsp") String rsp);

    /**
     * 更新一条数据
     * @param id
     * @param sqlKey
     * @param method
     * @param uri
     * @param req
     * @param rsp
     * @return
     */
    @Update("UPDATE moco SET sqlKey = #{sqlKey}, method = #{method},uri = #{uri},req = #{req},rsp = #{rsp} WHERE id = #{id}")
    int update(@Param("sqlKey") String sqlKey, @Param("method") String method, @Param("uri") String uri,
            @Param("req") String req, @Param("rsp") String rsp, @Param("id") String id);
}
