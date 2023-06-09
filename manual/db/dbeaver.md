# dbeaver

## MySQL Public Key Retrieval is not allowed 

[参考](https://community.atlassian.com/t5/Confluence-questions/MySQL-Public-Key-Retrieval-is-not-allowed/qaq-p/778956)

To change the settings on Dbeaver:

1) Right click your connection, choose "Edit Connection"

2) On the "Connection settings" screen (main screen) click on "Edit Driver Settings"

3) Click on "Connection properties"

4) Right click the "user properties" area and choose "Add new property"

5) Add two properties: "useSSL" and "allowPublicKeyRetrieval"

6) Set their values to  "false" and "true" by double clicking on the "value" column