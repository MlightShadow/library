# 机器学习

参考资料
[google机器学习, 无需翻墙](https://developers.google.cn/machine-learning/crash-course/)
[机器学习资源](https://github.com/allmachinelearning/MachineLearning)
[图解机器学习](http://www.r2d3.us/%E5%9C%96%E8%A7%A3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E7%AC%AC%E4%B8%80%E7%AB%A0/?charset=simplified)
[解析深度学习——卷积神经网络原理与视觉实践](http://lamda.nju.edu.cn/weixs/book/CNN_book.html)

## 基础知识(备查)

### 深度学习框架

* python  
  * TensorFlow
  * Scikit-learn
  * PyTorch
  * Keras
  * MXNet
  * Caffe
  * Caffe2
* java
  * Deeplearning4j
* Matlab
  * Neural Network Toolbox
  * Deep Learning Toolbox

### 十大算法

* C4.5决策树
* K-均值(K-mean)
* 支持向量机(SVM)
* Apriori
* 最大期望算法(EM)
* PageRank算法
* AdaBoost算法
* k-近邻算法(kNN)
* 朴素贝叶斯算法(NB)
* 分类回归树(CART)算法

### 监督学习与非监督学习

#### 监督学习(supervised learning)  

在监督学习的过程中, 我们只需要给定输入样本集, 机器就可以从中推演出指定目标变量的可能结果.
分类和回归属于监督学习, 之所以称之为监督学习, 是因为这类算法必须知道预测什么, 即目标变量的分类信息.

##### 数据

为了测试机器学习算法的效果, 通常使用两套独立的样本集:  

* 训练数据: 机器学习程序开始运行时, 使用训练样本集作为算法的输入, 此时包括目标变量
* 测试数据: 训练完成之后输入测试样本, 输入测试样本时并不提供测试样本的目标变量, 由程序决定样本属于哪个类别

比较测试样本预测的目标变量值与实际样本类别之间的差别, 就可以得出算法的实际精确度.  

##### 训练集

通常我们为算法输入大量已分类数据作为算法的训练集, 训练集中为训练样本

##### 目标变量  

目标变量是机器学习算法的预测结果
监督学习一般使用两种类型的目标变量: 标称型和数值型

* 标称型目标变量的结果只在有限目标集中取值
    > {爬行类, 鱼类, 哺乳类, 两栖类}
* 数值型目标变量则可以从无限的数值集合中取值
    > 1.222, 32.233, 223.232

##### 回归

预测数值型数据(例: 数据拟合曲线)

##### 分类

预测标称型目标变量

###### 类别

我们通常将分类问题中的目标变量称为类别

#### 非监督学习(unsupervised learning)  
