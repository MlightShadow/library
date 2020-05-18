# vscode 搭建各类开发环境

## .NET

环境:

* .NET Core SDK

插件选择:

* C#
* vscode-solution-explorer
* .NET Core Test Explorer
* NuGet Package Manager

NuGet Package Manager 存在问题需要修改 `C:\Users\Administrator\.vscode\extensions\jmrog.vscode-nuget-package-manager-1.1.6\out\src\actions\add-methods\fetchPackageVersions.js` 文件, 否则无法正常获取包版本

修改 `promise` 中代码, 添加 `.toLowerCase()`

```javascript
`${versionsUrl}${selectedPackageName.toLowerCase()}/index.json`
```

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
* Lombok Annotations Support for VS Code
    > 使用Lombok相关注解不写getter/setter, 构造函数等. 需要添加该插件
