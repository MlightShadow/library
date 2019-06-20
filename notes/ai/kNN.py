from numpy import *
import operator

def log(label, var):
    print(label, var)

def file2matrix(filename):
    fr = open(filename)
    arrayOlines=fr.readlines()
    numberOfLines = len(arrayOlines)
    returnMat = zeros((numberOfLines,3))
    classLabelVector = []
    index = 0

    for line in arrayOlines:
        line = line.strip()
        listFromLine = line.split('\t')
        returnMat[index,:] = listFromLine[0:3]
        classLabelVector.append(int(listFromLine[-1]))
        index += 1
    return returnMat, classLabelVector

def autoNorm(dataSet):
    minVals = dataSet.min(0)  
    maxVals = dataSet.max(0)
    ranges = maxVals - minVals
    normDataSet = zeros(shape(dataSet))
    m = dataSet.shape[0]
    normDataSet = dataSet - tile(minVals, (m,1))
    normDataSet = normDataSet/tile(ranges, (m,1))
    return normDataSet, ranges, minVals

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
