<%@ page language="java" contentType="text/html; charset=GBK"
	import="com.baidu.ueditor.ActionEnter"
    pageEncoding="GBK"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%

    request.setCharacterEncoding( "gbk" );
	response.setHeader("Content-Type" , "text/html");
	
	String rootPath = application.getRealPath( "/" );
	
	out.write( new ActionEnter( request, rootPath ).exec() );
	
%>