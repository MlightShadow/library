# MAVEN

## 概述

* 依赖
* 构建

## 依赖管理

现代java项目开发依赖项错综复杂，Maven可以自动下载、安装和管理项目所需的依赖。

### jar包坐标

这里的坐标是指代如何定位到一个jar包的三个字段

`groupId`：项目的组ID，通常为公司或组织的域名倒序。
`artifactId`：项目的唯一标识符，通常为项目名称。
`version`：项目的版本号，遵循x.y.z的格式，其中x、y、z分别为主版本号、次版本号和修订版本号。

## 项目管理

### 项目管理概述

创建项目：使用Maven的archetype命令创建项目骨架。例如，可以使用以下命令创建一个基于Java的Web项目：

```shell
mvn archetype:generate -DgroupId=com.example -DartifactId=my-webapp -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
```

编写代码：在项目目录中编写项目的源代码和配置文件等。

定义依赖：在pom.xml文件中定义项目的依赖。例如，可以使用以下代码定义JUnit测试框架的依赖：

```xml
<dependencies>
<dependency>
<groupId>junit</groupId>
<artifactId>junit</artifactId>
<version>4.12</version>
<scope>test</scope>
</dependency>
</dependencies>
```

构建项目：在命令行中使用Maven的package命令构建项目。例如，可以使用以下命令将项目打包成war文件：

```shell
mvn package
```

运行项目：使用Maven的tomcat插件或其他Web容器启动项目。例如，可以使用以下命令启动内置的Tomcat Web服务器：

```shell
mvn tomcat7:run
```

通过以上步骤，就可以使用Maven构建和运行项目了。同时，Maven还提供了丰富的插件和配置选项，可以进行更加灵活和高效的项目构建和管理。

### 定义

在项目根目录下创建pom.xml文件，该文件包含了项目的基本信息、依赖和构建方式等。

在一个类似`mvn archetype:generate`的命令中：
`archetype`:称为插件，实际上就是某种子命令
`generate`:称为目标

定义过程中需要填入 `groupId`, `artifactId`, `version`, `package` 信息

```shell
mvn archetype:generate -DgroupId=com.example -DartifactId=my-webapp -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
```
以上命令可以设置生成的模板

### 约定目录

* src: 源码目录
  * main: 主体程序目录
    * java: java源码
      * com: package目录
    * resources: 配置文件
  * test: 测试程序目录
    * java: java源码
      * com: package目录

### 依赖

在pom.xml中定义项目所需的依赖，Maven会自动下载、安装和管理这些依赖。

关于依赖范围：
* 

### compile 构建

使用Maven的命令行工具或集成开发环境（IDE）的插件构建项目。

```shell
mvn clean
mvn compile
mvn test-compile
mvn test
```

### test 测试

使用Maven的命令行工具或IDE的插件运行项目的单元测试

### package 打包

打包项目：使用Maven的命令行工具或IDE的插件打包项目，生成可执行的jar、war或其他格式的文件。

### install 安装

使用Maven的命令行工具或IDE的插件发布项目到本地或远程仓库。

管理多模块项目：对于多模块项目，使用Maven的父子项目管理功能，定义父项目和子项目之间的依赖关系。

管理插件：使用Maven的插件管理功能，管理项目所需的插件，方便开发者扩展构建过程。

管理文档：使用Maven的文档生成插件，自动生成项目的文档。

通过以上步骤，Maven可以对项目进行全面的管理，方便开发者进行项目开发、构建和发布等工作。

## 构建管理

Maven可以自动构建、测试和打包项目。

Maven的构建管理主要包括以下几个方面：

生命周期：Maven定义了一套标准的构建生命周期，包括clean、validate、compile、test、package、verify、install和deploy等阶段。每个阶段对应着一组插件的执行，开发者可以通过重写插件的执行顺序来实现自定义构建过程。

clean
validate
compile
test
package
verify
install
deploy

插件：Maven提供了丰富的插件库，包括编译、测试、打包、文档、发布等方面的插件。开发者可以在pom.xml中定义所需的插件，Maven会自动下载和安装这些插件。

配置：Maven的插件可以通过pom.xml中的configuration节点进行配置，开发者可以根据需要设置插件的参数。例如，可以通过maven-compiler-plugin的configuration节点设置Java编译器的版本。

打包：Maven可以将项目打包成可执行的jar、war或其他格式的文件。开发者可以在pom.xml中定义打包的方式和目标文件名等信息。

版本管理：Maven可以管理项目的版本号，开发者可以通过修改pom.xml中的version节点来更新项目的版本号。同时，Maven还提供了版本控制机制，可以管理项目的历史版本。

通过以上构建管理功能，Maven可以实现自动化的项目构建，简化项目管理和维护工作，提高开发效率和质量。


## 插件管理

Maven可以管理项目所需的插件，方便开发者扩展构建过程。

## 清理和发布

Maven可以清理项目构建过程中生成的临时文件，同时可以发布构建好的项目到本地或远程仓库。

## 多模块管理

Maven可以管理多个模块之间的依赖和构建顺序。

## 模板生成

Maven可以根据模板自动生成项目骨架。

## 生命周期管理

Maven定义了一套标准的生命周期，可以管理项目构建过程中各个环节的执行顺序。

## 其他功能

Maven还提供了其他一些功能，例如源码管理、文档生成和版本管理等。

## 附

### 下载&安装

#### 下载

打开[Maven官网](https://maven.apache.org/download.cgi)，下载最新版本的Maven二进制文件（zip或tar.gz格式）。

#### 安装

在Windows系统中：

解压Maven：将下载的Maven二进制文件解压到本地磁盘的任意目录中，例如C:\maven。

配置环境变量：在Windows系统中，右键点击“计算机”图标，选择“属性”菜单，进入“高级系统设置”页面，在“系统变量”中添加名为MAVEN_HOME，值为Maven解压目录的路径，然后在系统变量的Path中添加%Maven解压目录%\bin。

在Linux系统中：

解压Maven：将下载的Maven二进制文件解压到本地磁盘的任意目录中，例如/opt/maven。

配置环境变量：在Linux系统中，可以将Maven的路径添加到/etc/profile或~/.bashrc文件中，例如在/etc/profile中添加以下内容：

```shell
export MAVEN_HOME=/opt/maven
export PATH=$PATH:$MAVEN_HOME/bin
```

使环境变量生效：在命令行中执行source /etc/profile或source ~/.bashrc命令，使环境变量生效。

#### 验证安装

验证安装：在命令行中输入mvn -version命令，如果显示了Maven的版本信息，则说明安装成功。

### setting.xml 配置

* 可以通过添加`localRepository`节点来修改本地仓库位置，且填写的文件路径不用自己事先建立，maven会自己创建
* 通过修改`mirrors`节点来配置源
* 调整`profiles`标签保障jdk版本正确

### pom.xml

下面是一个简单的pom.xml(Project Object Model)模板，以及各个节点的功能：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             http://maven.apache.org/xsd/maven-4.0.0.xsd">

  <!-- 项目基本信息 -->
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>my-project</artifactId>
  <version>1.0.0</version>
  <!--打包方式 jar, war, pom(父工程)-->
  <packaging>jar</packaging>

  <name></name>
  <url></url>

  <!--属性值定义-->
  <properties>
  </properties>

  <!-- 项目依赖 -->
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <!--依赖的范围-->
      <scope>test</scope>
    </dependency>
  </dependencies>

  <!-- 项目构建 -->
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.8.1</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
    </plugins>
  </build>

</project>
```

各个节点的功能如下：

project：根节点，包含了整个pom文件。

modelVersion：pom文件的版本号，固定为4.0.0。

groupId：项目的组ID，通常为公司或组织的域名倒序。

artifactId：项目的唯一标识符，通常为项目名称。

version：项目的版本号，遵循x.y.z的格式，其中x、y、z分别为主版本号、次版本号和修订版本号。

dependencies：项目所需的依赖，包含多个dependency节点，每个节点对应一个依赖。

dependency：依赖节点，包含groupId、artifactId、version和scope等子节点。

scope：依赖范围，指定依赖在编译、测试或运行时的使用范围。

build：项目的构建配置，包含多个plugin节点，每个节点对应一个插件。

plugin：插件节点，包含groupId、artifactId、version和configuration等子节点。

configuration：插件的配置信息，用于设置插件的参数。