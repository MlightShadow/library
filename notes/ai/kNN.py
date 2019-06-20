from numpy import *
import operator

def log(label, var):
    print(label, var)

def createDataSet():
    group = array([[1.0, 1.1], [1.0, 1.0], [0, 0], [0, 0.1]])
    labels = ['A', 'A', 'B', 'B']
    return group, labels

def classify0(inX, dataSet, labels, k):
    # 按 dataset 大小扩展 inx
    diffMat = tile(inX, (dataSet.shape[0], 1)) - dataSet

    # 按行计算距离
    sqDiffMat = diffMat ** 2
    sqDistances = sqDiffMat.sum(axis=1)
    distances = sqDistances ** 0.5

    # 距离排序
    sortedDistIndicies = distances.argsort()   
    
    # 统计临近点label
    classCount = {}    
    for i in range(k):
        voteIlabel = labels[sortedDistIndicies[i]]
        classCount[voteIlabel] = classCount.get(voteIlabel,0) + 1
    sortedClassCount = sorted(classCount.items(), 
        key = operator.itemgetter(1), 
        reverse = True)

    # 返回最大可能的结果
    return sortedClassCount[0][0]

group,labels = createDataSet()
print(classify0([1.5, 1], group, labels, 3))
