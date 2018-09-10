<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<body>
<form action="<%=request.getContextPath()%>/user/test6" method="post">
    userName:&nbsp;<input type="text" name="userName"/><br/>
    passWord:&nbsp;<input type="text" name="passWord"/><br/>
    <input type="submit" value="提交"/>
    <input type="reset" value="重置"/>
</form>
</body>