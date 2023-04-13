# MAVEN

## 概述

* 结构
* 构建
  * 定义
  * 构
  * 安装
* 依赖
  * 定位
  * 范围
  * 传递/阻断

[toc]

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

### 父子项目定义

#### 创建父工程

在任意目录下创建一个新目录，作为父工程的根目录。在该目录下创建pom.xml文件，作为父工程的pom文件。在pom文件中添加如下内容：

```xml
<project>
    <groupId>com.example</groupId>
    <artifactId>parent</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>pom</packaging>
    <modules>
        <module>child1</module>
        <module>child2</module>
    </modules>
</project>
```

其中，groupId、artifactId和version分别指定了父工程的坐标，packaging指定了打包方式为pom，modules指定了子工程的名称。

#### 创建子工程

在父工程的根目录下创建子工程的目录。在子工程目录下创建pom.xml文件，作为子工程的pom文件。在pom文件中添加如下内容：

```xml
<project>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>parent</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>
    <!--子工程的groupid不写表示使用父工程设定 同理version也是-->
    <artifactId>child1</artifactId>
    <version>1.0.0-SNAPSHOT</version>
</project>
```

其中，parent元素中指定了父工程的坐标，artifactId和version分别指定了子工程的坐标。

重复步骤2创建其他子工程。

在父工程的根目录下执行Maven构建命令，例如：

```shell
mvn clean install
```

这样，Maven会自动构建父工程和所有子工程，并将它们安装到本地仓库中。

通过以上步骤，就可以成功创建一个Maven的父子工程。

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

* `compile`：默认依赖范围，依赖在编译、测试和运行时都可用, 这种类型在发布后能够传递依赖。
* `provided`：依赖在编译和测试时可用，但在运行时由容器或其他方式提供，例如servlet-api和jsp-api等。
* `runtime`：依赖在运行时可用，但在编译和测试时不需要，例如jdbc驱动等。
* `test`：依赖仅在测试时可用，不参与项目的编译和运行，例如JUnit和Mockito等。
* `system`：依赖在编译、测试和运行时都可用，但不会从Maven仓库中下载，需要手动指定路径和版本号等信息。
* `import`：该依赖范围仅用于管理依赖的版本号，不参与项目的编译和运行。

**tips**: [maven repository](https://mvnrepository.com/)中查找到的定位配置都会自己带好以来范围，很少需要自己去修改, 尤其一些`provided`依赖使用`compile`可能会在部署时与部署环境产生冲突

```xml
<dependencies>
  <dependency>
    <groupId>com.example</groupId>
    <artifactId>my-library</artifactId>
    <version>1.0.0</version>
    <scope>compile</scope>
  </dependency>
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>2.5</version>
    <scope>provided</scope>
  </dependency>
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.23</version>
    <scope>runtime</scope>
  </dependency>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>
```

依赖传递

Maven依赖传递指的是在Maven项目中，如果一个模块依赖于其他模块，那么这些依赖关系会自动传递给当前模块。

具体来说，当一个模块需要依赖另一个模块时，Maven会自动检查这个模块的pom.xml文件中的依赖关系，然后递归查找这些依赖的依赖，直到找到所有的依赖项。然后，Maven会将这些依赖项一一下载到本地仓库，并将它们添加到当前模块的classpath中，以便在编译和运行时使用。

依赖传递的机制可以大大简化项目的构建过程，避免了手动下载和配置依赖项的繁琐过程，同时也可以确保不同模块之间的依赖关系得到正确处理。

举例：
> 当一个Maven项目中的模块A依赖于模块B和模块C，而模块B又依赖于模块D和模块E，模块C又依赖于模块F和模块G，那么在Maven中的依赖传递过程如下：
>
> 1. 当模块A被构建时，Maven会检查它的pom.xml文件中的依赖关系，并下载模块B和模块C的jar包到本地仓库。
> 2. 在下载模块B的jar包时，Maven会检查模块B的pom.xml文件中的依赖关系，并下载模块D和模块E的jar包到本地仓库。
> 3. 在下载模块C的jar包时，Maven会检查模块C的pom.xml文件中的依赖关系，并下载模块F和模块G的jar包到本地仓库。
> 4. 最终，Maven会将模块A、B、C、D、E、F和G的jar包添加到模块A的classpath中，以便在编译和运行时使用。
>
> 这样，通过依赖传递机制，模块A可以自动使用模块B、C、D、E、F和G的功能，而无需手动下载和配置这些依赖项。

需要注意的是，如果不同的依赖项之间存在版本冲突，Maven会尝试解决这些冲突，通常会选择使用最新的版本。同时，Maven还可以通过排除依赖项的方式，显式地指定不使用某些依赖项，以解决版本冲突问题。


依赖传递的阻断：

在Maven中，可以通过在pom.xml文件中的依赖项中添加排除元素来排除依赖传递。具体步骤如下：

打开pom.xml文件，找到需要排除的依赖项的声明，例如：

```xml
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-core</artifactId>
<version>5.2.0.RELEASE</version>
</dependency>
```

在该依赖项中添加排除元素，指定需要排除的依赖项，例如：

```xml
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-core</artifactId>
<version>5.2.0.RELEASE</version>
<exclusions>
    <exclusion>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jcl</artifactId>
    </exclusion>
</exclusions>
</dependency>
```

这里的exclusions元素指定了需要排除的依赖项，其中exclusion元素指定了需要排除的依赖项的groupId和artifactId。

保存pom.xml文件并执行Maven构建命令，例如：

```shell
mvn clean package
```

这样，在构建过程中就会排除指定的依赖项，避免了依赖传递带来的问题。

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

发布项目到本地或远程仓库，可以方便其他项目使用。

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