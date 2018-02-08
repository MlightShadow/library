#python 练习

#1.有四个数字：1、2、3、4，能组成多少个互不相同且无重复数字的三位数？各是多少？
def get3from4():
    list = [1, 2, 3, 4];
    for x in list:
        for y in list:
            for z in list:
                if(x != y and y != z and z != x):
                    print(str(x)+str(y)+str(z))

#1.1 测试list的一个特性
def listChange():
    list = [1,2,3]
    list2 = list
    list2.remove(1)
    print(list,list2)
	
    a = 1
    b = a
    b = 2
    print (a,b)
					
#99.有两个磁盘文件A和B,各存放一行字母,要求把这两个文件中的信息合并(按字母顺序排列), 输出到一个新文件C中。
def readFile(filename):
    f = open(filename)
    str = f.read()
    f.close()
    return str

def read2File():
    f = open('testC.txt','w')
    f.write(readFile('testA.txt')+readFile('testB.txt'))
    f.close()				
					
#100.列表转为字典
def list2Dict():
    l = [1,2]
    sameKeyList = [1,3] #key 若重复, 则新值覆盖旧值
    j = ['a','basestring']
    #转换的list必须是2个元素 其他一概会报错
    #j = ['a','basestring','b','basestring']
    print(dict([l,j,sameKeyList]))
    print(dict([l]))



def func():
    a = input('输入数字');
    if a == '1': 
        print(1)
    else:
        print(0)

#testArea
#func()

#1
#get3from4()

#1.1
#listChange()

#99
#read2File()


#100
#list2Dict()



