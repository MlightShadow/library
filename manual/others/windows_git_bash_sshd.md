#先编辑C:\Program Files (x86)\Git\etc\ssh下的conf文件, 比如端口等,
#上一步不修改可以不做

#然后生成服务器端秘钥

ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
/usr/bin/sshd

#停止的时候必须kill, 不支持stop参数
