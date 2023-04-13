# MAVEN

[toc]

## 概述

* 创建项目：使用Maven的archetype命令创建项目骨架。例如，可以使用以下命令创建一个基于Java的Web项目：

    ```shell
    mvn archetype:generate \
     -DgroupId=com.example \
     -DartifactId=my-webapp \
     -DarchetypeArtifactId=maven-archetype-webapp \
     -DinteractiveMode=false
    ```

* 编写代码：在项目目录中编写项目的源代码和配置文件等。
* 定义依赖：在pom.xml文件中定义项目的依赖。例如，可以使用以下代码定义JUnit测试框架的依赖：

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

* 构建项目：在命令行中使用Maven的package命令构建项目。例如，可以使用以下命令将项目打包成war文件：

    ```shell
    mvn package
    ```

* 运行项目：使用Maven的tomcat插件或其他Web容器启动项目。例如，可以使用以下命令启动内置的Tomcat Web服务器：

    ```shell
    mvn tomcat7:run
    ```

通过以上步骤，就可以使用Maven构建和运行项目了。同时，Maven还提供了丰富的插件和配置选项，可以进行更加灵活和高效的项目构建和管理。

## 骨架项目

Maven骨架项目是一种预定义的项目模板，可以帮助您快速创建新的Maven项目。

通过以下命令可以生成骨架项目

```shell
mvn archetype:generate \
    -DgroupId=com.example \
    -DartifactId=my-webapp \
    -DarchetypeArtifactId=maven-archetype-webapp \
    -DinteractiveMode=false
```

定义过程中需要填入 `groupId`, `artifactId`, `version`, `package` 信息，如果不指定骨架项目的类型`archetypeArtifactId` 则也需要选择，可选项包括以下常用Maven骨架项目：

* Maven Quickstart Archetype：这是Maven的默认骨架项目，用于创建一个简单的Java项目。它包括一个Java类和一个测试类。
* Maven Webapp Archetype：这个骨架项目用于创建一个基于Web的Java项目，包括一个Web应用程序的目录结构和配置文件。
* Maven Spring MVC Archetype：这个骨架项目用于创建一个基于Spring MVC框架的Java Web项目。
* Maven Struts 2 Archetype：这个骨架项目用于创建一个基于Struts 2框架的Java Web项目。
* Maven Hibernate Archetype：这个骨架项目用于创建一个基于Hibernate框架的Java项目，包括Hibernate配置文件和实体类。
* Maven OSGi Bundle Archetype：这个骨架项目用于创建一个基于OSGi框架的Java项目，可以用于构建插件化和可扩展的应用程序。
* Maven Android Archetype：这个骨架项目用于创建一个基于Android平台的Java项目。

Maven骨架项目可以帮助您快速创建新的Maven项目，并提供了一些常用的项目模板，您可以根据需要选择适合您的骨架项目。

## 项目管理

### 约定目录

* src: 源码目录
  * main: 主体程序目录
    * java: java源码
      * com: package目录
    * resources: 配置文件
  * test: 测试程序目录
    * java: java源码
      * com: package目录

### 依赖管理

现代java项目开发依赖项错综复杂，Maven可以自动下载、安装和管理项目所需的依赖。

#### 仓库

##### 本地仓库

Maven本地仓库是Maven在本地机器上存储构建项目所需的所有依赖项和插件的地方。以下是一些关于Maven本地仓库的知识：

* 默认位置：Maven本地仓库的默认位置是用户主目录下的.m2/repository目录。
* 仓库结构：Maven本地仓库的结构与远程仓库的结构相同，具有groupId、artifactId和version三个重要的元素。
* 依赖解析：Maven在构建项目时会先查找本地仓库，如果找不到依赖项，则会从中央仓库或其他配置的远程仓库中下载依赖项。
* 清理本地仓库：可以通过命令mvn dependency:purge-local-repository来清理本地仓库中不再需要的依赖项。
* 本地仓库的备份：建议定期备份本地仓库，以避免意外删除或文件损坏导致的依赖项丢失。
* 更改本地仓库的位置：可以通过在settings.xml文件中修改localRepository元素的值来更改本地仓库的默认位置。

总之，Maven本地仓库是Maven构建项目必不可少的一部分，理解并正确使用它可以提高项目构建的效率和稳定性。

##### Nexus仓库

Maven Nexus仓库是一种流行的Maven仓库管理工具，它可以让您轻松地管理Maven仓库。以下是一些关于Maven Nexus仓库的知识：

* Nexus仓库的作用：Nexus仓库可以作为中央仓库的代理，从而提高Maven构建的效率和稳定性。它还可以作为私有仓库，用于存储公司内部的依赖项和插件。

* Nexus仓库的类型：Nexus仓库有三种类型：hosted仓库、proxy仓库和group仓库。hosted仓库是本地仓库，proxy仓库是远程仓库的代理，group仓库是多个仓库的集合。

* Nexus仓库的安装：Nexus仓库可以通过下载二进制文件并解压缩来进行安装。安装后，您可以通过Web界面来管理仓库。

* Nexus仓库的配置：Nexus仓库的配置包括仓库的URL、用户名和密码等信息。您可以通过Web界面或配置文件来进行配置。

* Nexus仓库的使用：在Maven项目中，您可以将Nexus仓库配置为项目的远程仓库，以便Maven在构建项目时下载依赖项和插件。您还可以将Nexus仓库配置为Maven的中央仓库的代理，以提高构建效率。

总之，Maven Nexus仓库是一个强大的Maven仓库管理工具，可以帮助您更好地管理Maven仓库，提高项目构建的效率和稳定性。

[附：搭建方法](#搭建nexus仓库)

#### jar包坐标

这里的坐标是指代如何定位到一个jar包的三个字段

`groupId`：项目的组ID，通常为公司或组织的域名倒序。
`artifactId`：项目的唯一标识符，通常为项目名称。
`version`：项目的版本号，遵循x.y.z的格式，其中x、y、z分别为主版本号、次版本号和修订版本号。

#### 依赖范围

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

### 继承

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
    <dependencyManagement>
        <dependencies>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>dependency1</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>dependency2</artifactId>
            <version>2.0.0</version>
        </dependency>
        </dependencies>
    </dependencyManagement>
</project>
```

其中，groupId、artifactId和version分别指定了父工程的坐标，packaging指定了打包方式为pom，modules指定了子工程的名称, dependencyManagement中列出了需要管理的依赖项。

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
    <dependencies>
        <dependency>
        <groupId>com.example</groupId>
        <artifactId>dependency1</artifactId>
        </dependency>
    </dependencies>
</project>
```

其中，parent元素中指定了父工程的坐标，artifactId和version分别指定了子工程的坐标,dependencies中只列出了需要使用的依赖项，而不需要指定版本号, 如果需要不同于父工程的版本则写上version。

重复步骤2创建其他子工程。

在父工程的根目录下执行Maven构建命令，例如：

```shell
mvn clean install
```

这样，Maven会自动构建父工程和所有子工程，并将它们安装到本地仓库中。在子工程中，只需要声明需要使用的依赖项，而不需要指定版本号，Maven会自动从父工程中继承版本号。

通过以上步骤，就可以使用Maven的父工程来管理依赖，避免在每个子工程中重复声明相同的依赖。

**tips**: 另外父子项目可以多层，不止是两层

### 聚合

Maven聚合是指将多个Maven项目组合成一个大项目的过程。它可以使您在一个地方管理多个相关的子项目，而不是将它们分开管理。聚合可以用于构建和测试子项目，也可以用于生成聚合报告

```xml
<modules>
    <module>child1</module>
    <module>child2</module>
</modules>
```

添加聚合后项目会在使用构建和测试命令时根据依赖关系统一管理

**警告**：不要出现循环依赖的情况

### 依赖传递

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

## 命令

在一个类似`mvn archetype:generate`的命令中：
`archetype`:称为插件，实际上就是某种子命令
`generate`:称为目标, 具体的一种功能

[官方文档-可用插件](https://maven.apache.org/plugins/index.html)

以下是一些常用的Maven命令：

* mvn clean：清理项目，删除target目录及其他生成的文件。
* mvn compile：编译项目源代码。
* mvn test：运行项目的单元测试。
* mvn package：打包项目，生成jar或war文件。
* mvn install：将项目安装到本地Maven仓库中，以供其他项目使用。
* mvn deploy：将项目部署到远程Maven仓库中。
* mvn dependency:tree：查看项目的依赖关系树。
* mvn archetype:generate：生成一个Maven项目的基础框架。
* mvn clean install -DskipTests：跳过测试，直接安装到本地Maven仓库中。
* mvn clean package -Dmaven.test.skip=true：跳过测试，直接打包项目。

这些命令可以在命令行中执行，也可以在Maven插件中使用。通过使用这些命令，可以更方便地管理和构建Java项目。

## 生命周期管理

Maven的生命周期是指在构建项目过程中，Maven定义了一系列的阶段（phase）和插件（plugin），每个阶段都与一组插件关联，这些插件在该阶段执行特定的构建任务。Maven的生命周期包括以下三个阶段：

* 清理阶段（clean）：删除上一次构建生成的目录，清理项目。
* 构建阶段（default）：包括以下几个阶段：
  * 验证阶段（validate）：验证项目是否正确，并检查所有必需的信息是否可用
  * 编译阶段（compile）：编译项目源代码
  * 测试阶段（test）：使用适当的测试框架运行测试
  * 打包阶段（package）：将编译后的代码打包成可部署的格式，如JAR、WAR等
  * 集成测试阶段（integration-test）：在集成测试环境中对打包后的代码进行测试
  * 验收测试阶段（verify）：对集成测试结果进行验证
  * 安装阶段（install）：将打包好的代码安装到本地仓库，以便其他项目可以使用
  * 部署阶段（deploy）：将打包好的代码部署到远程仓库，以便其他开发人员可以使用。
* 站点阶段（site）：生成项目的文档和报告。

生命周期与命令

生命周期定义了一系列阶段，而插件对应执行某个生命周期，插件的目标则是具体的功能

### compile 构建

使用Maven的命令行工具或集成开发环境（IDE）的插件构建项目。

```shell
mvn clean
mvn compile
mvn test-compile
mvn test
```

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

## 其他功能

Maven还提供了其他一些功能，例如源码管理、文档生成和版本管理等。

## 附录

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

* project：根节点，包含了整个pom文件。
* modelVersion：pom文件的版本号，固定为4.0.0。
* groupId：项目的组ID，通常为公司或组织的域名倒序。
* artifactId：项目的唯一标识符，通常为项目名称。
* version：项目的版本号，遵循x.y.z的格式，其中x、y、z分别为主版本号、次版本号和修订版本号。
* dependencies：项目所需的依赖，包含多个dependency节点，每个节点对应一个依赖。
* dependency：依赖节点，包含groupId、artifactId、version和scope等子节点。
* scope：依赖范围，指定依赖在编译、测试或运行时的使用范围。
* build：项目的构建配置，包含多个plugin节点，每个节点对应一个插件。
* plugin：插件节点，包含groupId、artifactId、version和configuration等子节点。
* configuration：插件的配置信息，用于设置插件的参数。
* properties: 可以使用多个属性来管理项目的配置信息。下面以一个简单的示例来演示如何使用pom属性。

    > 例如：
    >
    >    ```xml
    >    <project>
    >    <groupId>com.example</groupId>
    >    <artifactId>my-app</artifactId>
    >    <version>1.0-SNAPSHOT</version>
    >    <properties>
    >        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    >        <java.version>1.8</java.version>
    >        <spring.version>5.2.0.RELEASE</spring.version>
    >    </properties>
    >    <dependencies>
    >        <dependency>
    >        <groupId>org.springframework</groupId>
    >        <artifactId>spring-context</artifactId>
    >        <version>${spring.version}</version>
    >        </dependency>
    >    </dependencies>
    >    </project>
    >    ```
    >
    > 其中，properties元素中定义了三个属性：project.build.sourceEncoding指定了项目的编码格式，java.version指定了Java的版本号，spring.version指定了Spring框架的版本号。在dependencies元素中，我们使用了${spring.version}来引用spring.version属性，从而避免了重复指定版本号。

### 搭建Nexus仓库

搭建Nexus仓库需要以下步骤：

1. 下载Nexus二进制文件：从Sonatype官网下载最新版本的Nexus二进制文件，解压到您选择的目录。
2. 配置Nexus仓库：打开Nexus的conf/nexus.properties文件，配置Nexus的端口号、数据目录、日志目录等信息。
3. 启动Nexus：在Nexus的bin目录下，运行nexus.exe（Windows）或nexus脚本（Linux），启动Nexus。
4. 访问Nexus：在浏览器中输入`http://localhost:8081/nexus`，访问Nexus控制台。首次访问需要输入管理员账号和密码，然后创建一个新的仓库。
5. 创建仓库：在Nexus控制台中，选择“Repositories”菜单，然后选择“Create repository”按钮，创建一个新的仓库。您可以选择hosted、proxy或group仓库类型，并根据需要配置仓库的名称、URL、存储目录等信息。
6. 配置仓库：在Nexus控制台中，选择“Settings”菜单，然后选择“Repositories”标签页，配置仓库的各种属性。您可以配置仓库的访问权限、代理设置、存储目录、缓存策略等。
7. 配置Maven：在Maven项目的pom.xml文件中，添加Nexus仓库的URL和认证信息。

至此，Nexus仓库已经搭建完成，您可以将其作为Maven项目的远程仓库，并使用它来管理依赖项和插件。
