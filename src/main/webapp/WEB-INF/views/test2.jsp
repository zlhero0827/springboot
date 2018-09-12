<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta charset="utf-8">
</head>
<body>
<form action="<%=request.getContextPath()%>/user/test6" method="post">
    userName:&nbsp;<input type="text" name="username"/><br/>
    passWord:&nbsp;<input type="text" name="password"/><br/>
    <input type="submit" value="提交"/>
    <input type="reset" value="重置"/>
</form>
</body>
</html>