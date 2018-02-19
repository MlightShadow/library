# SpringMVC教程
# 序章
## 搭建项目
### Maven 简介
使用 `Maven` 可以非常方便的搭建 `SpringMVC` 项目, 并且可以在版本变动时, 快速更新依赖的 `jar`

**提示** 这里使用的还只是 `eclipse` 中整合的 `Maven`, 一般在官网中下载的 `Eclipse JavaEE IDE` 就带有了该插件

>
###### 新建一个 Maven Project  
以下为搭建步骤: 
* new 一个新的 `maven project`
* next 选择 `maven-archetype-webapp`

#### 配置文件 pom.xml
>根目录 `pom.xml` 这是主要需要配置的一个文件

这里给出一个最简配置
```
<!--配置所需依赖项目-->
<dependencies>
...
    <!--
         1. spring-web
    -->
 	<dependency>
    	<groupId>org.springframework</groupId>
    	<artifactId>spring-web</artifactId>
    	<version>${springVersion}</version>
    </dependency>
    
    <!--
        2. spring-webmvc 
        当中包含重要的DispatcherServlet 
        不要漏掉
    -->
    <dependency>
    	<groupId>org.springframework</groupId>
    	<artifactId>spring-webmvc</artifactId>
    	<version>${springVersion}</version>
    </dependency>
...
</dependencies>
    
<properties>
    <!--
    配置中用到的属性${springVersion}
    这边进行统一定义, 避免重复修改
    -->
    <springVersion>4.1.1.RELEASE</springVersion>
</properties>
```
之后选中项目中的 `pom.xml` 执行 `run as Maven install` 

**注意事项**  
生成之后的项目存在报错 
* 注意 `Libraries` 中引用 `Apache Tomcat`  
> 解决方法: 在 `Properties` 中选择 `Java Build Path` -> `Add Library` -> `Server Runtime` 选择其中一项即可  

* 另一个报错来自maven的配置 
> 解决方法: 依然在`Properties` 中选择 `Project  Facets` 其中 `DynamicWebModule`, `Java`, `javaScript` 需要勾选, 另外 `Java` 后的版本号需要修改为于当前 `JRE` 或 `JDK` 相同的版本号

以上配置完成后即已经完成最简 `SpringMVC` 的引用

### 配置SpringMVC
这里给出 `SpringMVC` 的最简配置  

`WEB-INF` 中 `web.xml` 覆盖如下配置
```
<web-app xmlns="http://java.sun.com/xml/ns/javaee"  
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
      xsi:schemaLocation="http://java.sun.com/xml/ns/javaee 
      http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"  
      version="3.0">  
    <servlet>
        <!--spring-mvc这个名字自己定义-->
        <servlet-name>spring-mvc</servlet-name>  
        <init-param>
    		<param-name>contextConfigLocation</param-name>
    		<!--这个名字springmvc.xml是我们一会儿要定义的文件-->
    		<param-value>classpath:springmvc.xml</param-value>
    	</init-param>
    	<load-on-startup>1</load-on-startup>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>  
    </servlet>  
    
    <servlet-mapping>  
        <!--spring-mvc即上面所定义的-->
        <servlet-name>spring-mvc</servlet-name>  
        <url-pattern>/</url-pattern>  
    </servlet-mapping>  
</web-app>  
```
在 `web.xml` 同级文件夹建立 `classpath:springmvc.xml` 中定义的 `springmvc.xml`  
配置内容如下
```
<beans xmlns="http://www.springframework.org/schema/beans"  
    xmlns:context="http://www.springframework.org/schema/context"  
    xmlns:mvc="http://www.springframework.org/schema/mvc" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xsi:schemaLocation="  
        http://www.springframework.org/schema/beans       
        http://www.springframework.org/schema/beans/spring-beans-3.0.xsd  
        http://www.springframework.org/schema/context   
        http://www.springframework.org/schema/context/spring-context-3.0.xsd  
        http://www.springframework.org/schema/mvc  
        http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd">  
    <!--com.springmvc.controller 这个包下就是我们的controller 可以自定义-->
    <context:component-scan base-package="com.springmvc.controller" />  
    <bean id="viewResolver"  
        class="org.springframework.web.servlet.view.InternalResourceViewResolver">  
        <!--/WEB-INF/view/ 这个路径就是我们的view文件夹 可以自定义-->
        <property name="prefix" value="/WEB-INF/view/" />  
        <property name="suffix" value=".jsp" />  
    </bean>  
</beans>  
```
以上定义详解皆可以在网上查到资料 自行查阅全部内容

到此步骤 `SpringMVC` 项目搭建完成

**提示**
安装过 `Spring` 相应IDE插件的情况下`<beans xmlns>` `<web-app xmlns>` 中的属性可以相应点选出来

## Hello World
之前我们已经定义了 `view` 路径 `/WEB-INF/view/` 以及 `controller` 包 `com.springmvc.controller` 之后我们不再赘述, 新建`controller` 以及 `view` 都默认为以此为默认包名与默认根目录

在 `controller` 包下新建 `Java` 文件, 任意取名  
这边我直接给出代码
```
package com.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/Home")
@Controller
public class Home {
	@RequestMapping(value = "/Index")
	public String HelloWorld(Model model) {
		model.addAttribute("message", "Hello World!!!");
		return "index";
	}
}
```

同样 `view` 文件夹中新建视图 名称与 `controller` 中的 `return "index"` 一致为 `index.jsp`   
其中包含的标签同样直接给出
```
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"  
    pageEncoding="ISO-8859-1"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
 "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">  
<title>Insert title here</title>  
</head>  
<body>  
<h1>message:${message}</h1>  
</body>  
</html>  
```
将项目添加至 `Tomcat` 中即可直接 `run as run on server`
浏览器中 `http://localhost:8080/VickOA/Home/Index` 即可看到相关画面与信息  

**提示** `http://地址:端口/项目名/Home/Index`

序章到此完结撒花

## 附
Spring官网 `spring-framework` 传送门: http://projects.spring.io/spring-framework/  
Eclipse官网传送门: https://www.eclipse.org/

TODO
# RequestMapping
## 请求URL
## 请求方法
## 请求参数
## 请求头
## Ant风格通配符
## PathVariable
支持REST URL

## HiddenHttpMethodFilter
RequestMethod四请求方式 GET POST PUT DELETE

## RequestParam

## RequestHeader

## POJO参数与级联属性

## Controller使用Servlet原生API参数
