# stable diffusion

## 框架

### tensorflow

### pytorch

## 硬件加速器

### cuda

#### TensorRT (TRT)

### mps

#### webui x openvino

在game.intel.com找到文章[intel-arc-graphics-generative-ai-art](https://game.intel.com/us/stories/intel-arc-graphics-generative-ai-art/)可以找到 [Installation-on-Intel-Silicon](https://github.com/openvinotoolkit/stable-diffusion-webui/wiki/Installation-on-Intel-Silicon)的链接, 其中就包含windows，和linux的安装方法。

clone仓库之后有，使用steam++整体下载还是下的来的，一直通过重启steam++和重新执行webui-user.bat/sh的方式尝试安装，最终安装成功。

但是启动后在网页切换模型就报错，提示是需要下载`clip-vit-large-patch14`但是没法访问 [huggingface.co](huggingface.co)，在魔塔找到了一个仓库可以下载[clip-vit-large-patch14](https://www.modelscope.cn/models/AI-ModelScope/clip-vit-large-patch14/files)

git下载的方式让我直呼别致

下载之后 放入openai/clip-vit-large-patch14 路径或者自己修改代码中的这个路径符合你自己的位置也可以。

好了现在我可以切模型了，可以cpu跑了但是gpu跑就报错

```error
OSError: We couldn't connect to 'https://huggingface.co' to load this file, couldn't find it in the cached files and it looks like CompVis/stable-diffusion-safety-checker is not the path to a directory containing a file named config.json. Checkout your internet connection or see how to run the library in offline mode at 'https://huggingface.co/docs/transformers/installation#offline-mode'.
Time taken: 10.8 sec.
```

应该我需要下载
CompVis/stable-diffusion-safety-checker

但是实际上这套东西已经在 clip-vit-large-patch14 上下载了

只要把 `config.json`, `preprocessor_config.json` `pytorch_model.bin` 装入目录即可

提示词实际上 xxx/yyy的 yyy需要一致，之前应该都是插件帮我完成这个事的

### rocm

## 低秩微调

### lora

sdxl 模型训练需要注意：

## prompt

阅读本篇之前，已假定你有了一定的Stable diffusion的创作基础，已经知道怎么去输入自然语言表达和标签语言表达，现在为追求更细节的权重控制和逻辑控制。
权重控制

提示词tag元素的权重总体原则是有先后顺序的，越靠前的提示词，影响会越大，这也就是我们常常见到的提示词一般都是遵循先描述整体画风画面，再描述局部画面，最后控光影效果，但通过实践来看如果不对个别元素加以控制，只简单的堆砌提示词，权重效果并不是那么明显，因此我们需要通过使用语法，来使得我们更精细的控制我们想要的输出结果。

加权

* `()`,小括号，指的是将括号里的元素提升1.1倍权重，可以通过嵌套的方式进一步加权，比如:

    `(red dress)`代表red dress提升1.1倍权重
    `((red dress))`则代表1.1*1.1=1.21倍权重

    但是这样调整起来也会比较麻烦，实践当中一般用`(red dress: 1.5)`这样的方式来控制权重。

* `{}`,大括号，指的是将括号里的元素提升1.05倍权重，同理，也可以通过多层嵌套实现复数加权，但是与小括号不同的地方是，**并不支持`{red dress: 1.5}`这样的表达。** 实际运用中，较少使用大括号，用小括号居多，因为调整起来也比较便捷。

降权

“[]”,中括号，指的是将括号里的元素权重除以1.1，也就相当于1/1.1=0.90909090……，大约相当于降成0.9权重，同理，也支持多层嵌套的方式，但是，与大括号类似，也不支持[red dress:0.8]这样的表达，实践当中，如果想方便调整，降权也是用小括号里加数字会比较方便
小结

实践当中，无论是加权或者是降权，都习惯用小括号居多，方便调整，书写简单。
逻辑表达

逻辑表达会用到+、|、:等逻辑表达符号，往往用来控制一些细节或者实现融合体等效果。
元素融合

元素融合一般采用"|"或者“:”符号。

1. "｜",用竖杠的话，会在两个元素之间循环往复绘制，相当于逻辑OR，以此来达到元素融合的效果。比如，我想实现红色和蓝色头发渐变效果，可以写成red hair | blue hair,Stable diffusion处理这两个tag时，会按照画一步红头发，画一步蓝头发循环往复的方式进行。这种这种表达方式也支持加权(red hair：1.2) | (blue hair：1.3)，用竖杠来元素融合，可以不必考虑两个元素之间的权重之和是否等于100%。

2. ":",用冒号的话，书写起来跟竖杠有一些差异，表达式为:"tag1:tag2:权重1:权重2"，比如，我想画一个现实中不存在的生物，可以写成cat:dog:0.5:0.5，要特别注意的是，权重总和要为100%，如果超过了100%，容易出现失控的现象，虽然我试过小于100%，肉眼没看出什么问题，但建议还是控制总和为100%比较好。

3. 用":"的另一种方法,"tag1:tag2:切入时机",其中，切入时机为0～1之间的一个数值，举例：red hair:blue hair:0.5，会在前面50%的步骤画红头发，后面50%的步骤画蓝头发，假设你的采样步数是30，那么30*0.5=15,代表前15步画红头发，后面15步画蓝头发。切入时机也可以直接写步数比如red hair:blue hair:15。
元素控制

1. 多元素控制，"+",用加号表示的是同时满足两个元素条件，"+"与"AND"作用一样，一般来说，用来控制一些微观细节，比如beach AND umbrella

2. 单元素控制，控制什么时候开始画什么元素，表达式："[tag:切入时机]"、"[tag::退出时机]"。举例：hat:5，表示第五步时开始画帽子，直到结束，hat::20,代表是从一开始就开始画帽子，但是到第20步停止。用这种方式的时候，要注意采样步数不能太短，那么问题来了，如果我希望从第5步开始画，第20步结束呢？那得写成[[hat::20]:5]这样。
小结

实践当中，逻辑表达主要是控制元素之间的细节呈现，但建议不要搞的太复杂，一来投入产出比不合适（肉眼也难分辨细节），而来太复杂自己也会晕。
总结

无论是赋权或者逻辑表达，都受限于模型本身影响、采样方法、采样步数等因素的影响，上述内容为一般通用的控制方法，有些模型，作者本身会额外提供一些控制方式和表达方式，使用期，要仔细阅读作者提供的文档，应根据具体模型的文档确定正确用法。

此外，Prompt关键词tag也不是越多越好，跟图片分辨率之间也有很大的影响关系，如果分辨率低，tag过多，会产生tag元素“相互污染”。

## 参考

正面提示词
voxel art of people playing soccer in a soccer field

Tiny cute isometric temple, soft smooth lighting, soft colors, soft colors, 100mm lens, 3d blender render, trending on polycount, modular constructivism, blue blackground, physically based rendering, centered

Die-cut sticker, Cute kawaii flower character sticker, white background, illustration minimalism, vector, pastel colors

Tiny cute isometric steampunk factory, soft smooth lighting, soft colors, soft colors, 100mm lens, 3d blender render, trending on polycount, modular constructivism, blue blackground, physically based rendering, centered

masterpiece, best quality, realistic,  cinematic_lighting,1girl ,Beautiful female  Chinese  character, dressed in black_pantyhose, stockings, pantyhose, with soft and delicate lighting, detailed facial features, and including the entire body. Need to display face

solo, Tiny cute isometric planet with build or plante, lava and ice, soft smooth lighting, soft colors, soft colors, 100mm lens, 3d blender render, trending on polycount, modular constructivism, blue blackground, physically based rendering, centered

反面提示词

nsfw,logo,text, mutated hands and fingers,poorly drawn face,extra limb,missing limb,disconnected limbs,malformed hands,ugly, mutated hands and fingers, disconnected limbs, long neck, long body, gape
