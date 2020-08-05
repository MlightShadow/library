# java collection and map

## 接口

* Iterator
* Collection
* Queue
* Dueue
* List
* Set
* Map

### Interator接口

所有集合类型都需要实现`Interator`

### Collection接口

继承 `Collection` 接口的接口包括`List`, `Set`, `Queue`

### List接口

允许重复元素, 排布有序

实现类有 `ArrayList`, `LinkedList`

### Set接口

不允许重复元素, 排布无序

实现类有 `HashSet`, `TreeSet`

### Map接口

具有kv对的集合

实现类有 `HashMap`, `TreeMap`

## 实现类

### List实现类

#### ArrayList

基于索引的访问方式

#### LinkedList

采用链表结构实现

### Set实现类

#### HashSet

通过HASH算法实现, 具有很好的查找和存取性能

#### TreeSet

可以对集合进行自然排序(升序), 通过`Iterator`可以按照这个排序进行输出, 但元素必须实现`Comparable`接口

### Map实现类

#### HashMap

典型实现

#### TreeMap

类似TreeSet具有可以排序的特性
