<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="css/mock.css" />
    <title>mock</title>
</head>
<body>
<%--<form action="<%=request.getContextPath()%>/result" method="post">--%>
<table class="gridtable" >
    <tr>
        <th>序号</th>
        <%--<td>sqlKey</td>--%>
        <th>HTTP请求方式</th>
        <th>请求地址</th>
        <th>请求报文关键字</th>
        <th>期待返回</th>
        <th>更新</th>
        <th>说明</th>
    </tr>
    <c:forEach items="${mocos}" var="m" varStatus="st">
    <form action="<%=request.getContextPath()%>/update" method="post">
        <tr>
            <td>${m.id} </td>
            <%--<td>${s.sqlKey}</td>--%>
            <td><input class="inputWidth" name="method" type="text"
                       value=${m.method} > </td>
            <td><input class="inputWidth" name="uri" type="text"
                       value=${m.uri} > </td>
            <td><input class="inputWidth" name="req" type="text"
                       value=${m.req} > </td>
            <td><textarea name="rsp" wrap=soft>'${m.rsp}'</textarea></td>
            <td><input type="submit" name="Submit" value="确定修改"></td>
            <td><input name="id" type="hidden" value="${m.id}" > </td>

        </tr>
        </form>
    </c:forEach>
</table>
<%--</form>--%>
</br>
</body>
</html>
