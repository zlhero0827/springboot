package com.moco.springboot.pojo;

public class Moco {
    private String id;
    private String sqlKey;
    private String method;
    private String uri;
    private String req;
    private String rsp;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSqlKey() {
        return sqlKey;
    }

    public void setSqlKey(String sqlKey) {
        this.sqlKey = sqlKey;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getReq() {
        return req;
    }

    public void setReq(String req) {
        this.req = req;
    }

    public String getRsp() {
        return rsp;
    }

    public void setRsp(String rsp) {
        this.rsp = rsp;
    }
}
