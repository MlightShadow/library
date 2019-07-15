# raspberry_pi搭建image_style_transfor

[image_style_transfor仓库地址](https://github.com/harry19902002/image-style-transfor)

## 安装tensorflow和其他依赖

```bash
sudo apt install libatlas-base-dev
pip3 install tensorflow
```

网速慢可以直接下载whl文件安装

```bash
wget https://www.piwheels.org/simple/tensorflow/tensorflow-1.13.1-cp35-none-linux_armv7l.whl#sha256=6c00dd13db0791e83cb08d532f007cc7fd44c8d7b52662a4a0065ac4fe7ca18a

# 下载之后注意sha256sum一下看看

$ sha256sum tensorflow-1.13.1-cp35-none-linux_armv7l.whl
6c00dd13db0791e83cb08d532f007cc7fd44c8d7b52662a4a0065ac4fe7ca18a tensorflow-1.13.1-cp35-none-linux_armv7l.whl

pip3 install tensorflow-1.13.1-cp35-none-linux_armv7l.whl
```

注意: 因为网速和墙的问题, 多安装几次, 或者开vpn, 实在无法安装的可以使用和上面的方法下载其他whl文件直接安装

其中列举的`numpy`依赖在`tensorflow`和`scipy`的安装中已经加入无需重复添加

## Pre-trained VGG network

这边指定了`MD5 8ee3263992981a1d26e73b3ca028a123`按照链接下载
[Pre-trained VGG network](http://www.vlfeat.org/matconvnet/models/beta16/imagenet-vgg-verydeep-19.mat)

## 代码问题

因为依赖库最新版本的部分方法已经变化, 原作者并未给出对应库的版本, 我还是希望能在最新的依赖环境下运行, 所以部分代码做调整

### 1.scipy.misc

`scipy.misc` 中的 `imread()`与`imsave()` 方法已经在1.2版本被相继废除, 查阅资料后我们这边使用 `imageio` 来替代 `scipy.misc`

* `imageio.imread()` -> `scipy.misc.imread()`
* `imageio.imsave()` -> `scipy.misc.imwrite()`

另外 `scipy.misc.resize()` 也被废除了, 这边用`skimage`来替代, 不过`skimage`也需要使用`scikit-image`来替代了

`scikit-image` 包括 `imageio`

所以我们直接

```bash
pip3 install scikit-image
```
