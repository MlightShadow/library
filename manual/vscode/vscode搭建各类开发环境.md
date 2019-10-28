# vscode 搭建各类开发环境

## .NET

环境:

* .NET Core SDK

插件选择:

* C#
* vscode-solution-explorer
* .NET Core Test Explorer

## JAVA

环境:

* jdk
* maven或其他

setting:

```json
{
    "java.home": "/usr/local/lib/jdk1.8.0_172",
    "maven.executable.path": "/usr/local/bin/apache-maven-3.5.4/bin/mvn",
    "java.configuration.maven.userSettings": "/usr/local/bin/apache-maven-3.5.4/conf/settings.xml",
    "maven.terminal.customEnv": [
        {
            "environmentVariable": "JAVA_HOME",
            "value": "/usr/local/lib/jdk1.8.0_172"
        }
    ],
    "java.jdt.ls.vmargs": "-noverify -Xmx1G -XX:+UseG1GC -XX:+UseStringDeduplication",
}
```

插件选择:

* Language support for Java ™ for Visual Studio Code
* Java Extension Pack
* Debugger for Java
* Java Test Runner
