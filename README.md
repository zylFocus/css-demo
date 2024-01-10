分享几个css的小技巧：
# 1、滚动才出现的分割线
页面上经常需要分割线来划分区域，但有的分割线一直显示并不优雅，滚动时才出现会比较好，比如 ud 的 dialog
![](https://cdn.nlark.com/yuque/0/2024/gif/12830161/1704896702823-f5664dfe-faa7-4b86-b457-2157f01b721c.gif#averageHue=%23e7e9f3&clientId=u79b14509-fc38-4&from=paste&id=ue8f7477f&originHeight=1148&originWidth=1806&originalType=url&ratio=1.75&rotation=0&showTitle=false&status=done&style=none&taskId=uc173a71c-f3c7-43a2-8194-3a9385ac511&title=)
由上图可以看到 ud 的 dialog 在 header 和 footer 处都有分割线，只有滚动使得有部分超出时才会出现。
我们的 ux 在设计上也有很多类似的情况，如订单页面的抽屉、日志页面的筛选器：
![](https://cdn.nlark.com/yuque/0/2024/gif/12830161/1704896702756-1b70c46a-2154-4d90-adbf-e1b315935e75.gif#averageHue=%23f6f6fc&clientId=u79b14509-fc38-4&from=paste&id=ue15a2c81&originHeight=948&originWidth=1316&originalType=url&ratio=1.75&rotation=0&showTitle=false&status=done&style=none&taskId=ucd5c2fe8-0729-412b-93f0-3094df08701&title=)
## ud 的做法:

- 通过 scrollTop, scrollHeight, clientHeight 来判断是否有上下溢出
- ResizeObserver 和 scroll 事件时去检测溢出

下面的代码从 ud 拷过来的
```
function useCheckVerticalOverflow<T extends HTMLElement>({
  target,
}: {
  target: ThunkElement<T>;
}) {
  const [overflowTop, setOverflowTop] = useState(false);
  const [overflowBottom, setOverflowBottom] = useState(false);

  const checkVerticalOverflow = useCallback(() => {
    const targetEl = getThunkElement(target);
    if (!targetEl) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = targetEl;
    const targetInset = {
      top: 0,
      bottom: clientHeight,
    };
    const childInset = {
      top: -scrollTop,
      bottom: -scrollTop + scrollHeight,
    };

    if (targetInset.top > childInset.top) {
      setOverflowTop(true);
    } else {
      setOverflowTop(false);
    }

    if (targetInset.bottom < childInset.bottom) {
      setOverflowBottom(true);
    } else {
      setOverflowBottom(false);
    }
  }, [target]);

  return {
    overflow: {
      top: overflowTop,
      bottom: overflowBottom,
    },
    checkVerticalOverflow,
  };
}
```
可以用js做，但是麻烦，性能也略差。
## 骚操作：纯html加css也能实现
直接上图：
![](https://cdn.nlark.com/yuque/0/2024/gif/12830161/1704896702774-16d83c0c-0cd2-4369-a6c5-460a97263905.gif#averageHue=%23f6f8fe&clientId=u79b14509-fc38-4&from=paste&id=u8a5d4acf&originHeight=1190&originWidth=1744&originalType=url&ratio=1.75&rotation=0&showTitle=false&status=done&style=none&taskId=u80caa283-228e-4004-936e-7b08e432d8c&title=)
简单讲一下实现原理：
以 header 处的分割线举例，我们用了两个 div，

-  div-one：一直在要要分割的地方，是灰色的
- div-two：跟随 body 容器滚动，颜色和 body 的背景色一样。

让 div-two 的层级在在 div-one 上面，现在我们开始滚动：

- 当 body 没有上溢出时，第二个 div 刚好完全挡住第一个 div，实现分割线隐藏。
- 当 body 有上溢出时第一个 div 显示，实现分割线显示。

footer 处同理。
遵循这个思路我们可以写个滚动出现分割线的容器：
```
const ScrollContainer = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={classNames('relative overflow-auto', className)}>
      {/* 滚动才出现的分割线 上 */}
      <div className={classNames('w-full border-b border-solid border-gray-300 z-10 top-0 sticky')}></div>

      <div className={classNames('w-full h-px bg-[#fff] z-30 top-0 absolute')}></div>

      {children}

      {/* 滚动才出现的分割线 下 */}
      <div className={classNames('w-full h-px bg-[#fff] relative z-10')}></div>
      <div className={classNames('w-full border-t border-solid border-gray-300 sticky bottom-0')}></div>
    </div>
  )
}
```
使用的时候：
```
<ScrollContainer className={classNames('flex-1')}>
  <div className="p-5">
    <FormCom />
  </div>
</ScrollContainer>
```
如果你只需要上分割线，我们还可以 css 加个类就能实现效果 :
```
.has-scroll-top-divider::before {
    content: '';
    @apply block w-full border-b border-solid border-gray-300 z-10 top-0 sticky
}
.has-scroll-top-divider::after {
    content: '';
    @apply w-full h-px bg-[#fff] z-30 top-0 absolute
}
```
# 2、container 容器查询：
参考：

- [介绍2022最期待且已正式支持的CSS container容器查询 « 张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2022/09/css-container-rule/)
- [CSS 容器查询 - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_container_queries)
- [mp.weixin.qq.com](https://mp.weixin.qq.com/s?__biz=MzIyMDc1NTYxNg%3D%3D&mid=2247486274&idx=1&sn=056118df01e1d68fd14cc2aad8b880de&chksm=97c6688da0b1e19b0b2ec74a30b433e0ab2eea21c8d59f5f880714ec6c654c08846d84308553&scene=21#wechat_redirect)

css 目前的媒体查询通常用来查视口的宽高，不能直接查询某个容器的宽高。
现在可以使用 container query 来解决这个问题，不过 chrome 版本要求较高
![](https://cdn.nlark.com/yuque/0/2024/png/12830161/1704896702800-ae3e522e-c64e-4820-8ae8-a4bc029e07ed.png#averageHue=%23e4cfb8&clientId=u79b14509-fc38-4&from=paste&id=u95313947&originHeight=1150&originWidth=992&originalType=url&ratio=1.75&rotation=0&showTitle=false&status=done&style=none&taskId=ubc86a739-37d0-4ab4-956d-4d844e4a2a0&title=)
## 这东西可以用来干嘛？
我暂时只想到这几个：
### “height: 100%” 不生效
是否遇到过 “height: 100%” 不生效，因为父元素没有 height，这时候要么用 flex，要么一路把 height 传下来。现在有了容器查询，你多了一种方法了。
### 根据容器自适应文字大小和效果
![](https://cdn.nlark.com/yuque/0/2024/gif/12830161/1704896702817-26a89c26-d5da-4aeb-a8a2-4f61e22ac614.gif#averageHue=%23f8f9fd&clientId=u79b14509-fc38-4&from=paste&id=u2cb43b6b&originHeight=588&originWidth=1302&originalType=url&ratio=1.75&rotation=0&showTitle=false&status=done&style=none&taskId=u3db81526-929a-4db1-bf04-ed5aa68e6a7&title=)
### 自适应文本头像
![](https://cdn.nlark.com/yuque/0/2024/png/12830161/1704896703386-b84dfab8-7541-49cf-8eed-2a303012c40a.png#averageHue=%23f4d7b9&clientId=u79b14509-fc38-4&from=paste&id=u35d90906&originHeight=504&originWidth=166&originalType=url&ratio=1.75&rotation=0&showTitle=false&status=done&style=none&taskId=u8dbcf531-a5d9-47a7-9298-738133f39fe&title=)
核心思路：
文字大小需要和文字数量成反比，用固定大小的文字撑出容器，然后通过 cqw 可以获取查询容器的宽度，最后通过 calc({num1}px - {num2}cqw)。
**步骤是：**

- 父容器设置为 relative 定位
- 子容器 一，用固定大小的文字撑出一个真实的容器，隐藏这个容器
- 子容器二，设置 绝对定位和容器查询 container-type: inline-size;
- 子容器二，下面设置一个 span 元素来展示文字，文字大小和外层容器成反比，故设置为 font-size: calc(30px - 10cqw)

![](https://cdn.nlark.com/yuque/0/2024/png/12830161/1704896703858-e5c32929-c159-43fa-a208-613040553622.png#averageHue=%23252322&clientId=u79b14509-fc38-4&from=paste&id=ub7ced7db&originHeight=320&originWidth=1718&originalType=url&ratio=1.75&rotation=0&showTitle=false&status=done&style=none&taskId=ua5a493b0-fcd7-4bb9-b9b7-cbc93724bbc&title=)
## 使用方法：
第一步：
父容器设置 container-type: inline-size;
[size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_container_queries#size)
  查询将基于容器的[行向和块向](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Web/CSS/CSS_logical_properties_and_values/Basic_concepts_of_logical_properties_and_values#%E5%9D%97%E5%90%91%E4%B8%8E%E8%A1%8C%E5%90%91%E5%B0%BA%E5%BA%A6)尺度，将布局、样式和大小的限制应用于容器。
[inline-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_container_queries#inline-size)
查询将基于容器的[行向](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Web/CSS/CSS_logical_properties_and_values/Basic_concepts_of_logical_properties_and_values#%E5%9D%97%E5%90%91%E4%B8%8E%E8%A1%8C%E5%90%91%E5%B0%BA%E5%BA%A6)尺度，将布局、样式和行向大小的限制应用于元素。
[normal](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_container_queries#normal)
该元素不是任何容器大小查询的查询容器，但仍然是容器样式查询的查询容器。
第二步：
子容器通过 cqw 来设置宽度，cwh 来设置高度。
容器查询长度单位包括：

- cqw：查询容器宽度的 1%
- cqh：查询容器高度的 1%
- cqi：查询容器行向尺寸的 1%
- cqb：查询容器块尺寸的 1%
- cqmin：cqi 和 cqb 中较小的值
- cqmax：cqi 和 cqb 中较大的值
# 3、视图过渡
参考：

- [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Xs143ON1nEiEYr6kt3fnXg)
- [View Transitions API - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/View_Transitions_API)

之前锡铨分享过 flip 动画，flip对应着四个单词：First 、Last、Inverse、Play 。
flip 是一种动画的制作思路，核心是记住开始和结束的状态，然后通过 transform 不影响布局的特点来反向设置一个 translate，然后倒转播放一下动画。
然后这种思想已经渐渐的变成了 css 官方的 api，View Transition 的 API 设计和这个思想非常像，不能说非常像，简直就是一模一样。不过 css 把它集成为标准后，用起来很方便。
先看几个案例
## 案例：

- [View Transitions + Drag n Drop](https://codepen.io/argyleink/pen/rNQZbLr)
- [developer.chrome.com](https://developer.chrome.com/docs/web-platform/view-transitions?hl=zh-cn)
## 使用方法：
非常简单，分两步
第一步：
给要变化的元素添加 view-transition-name，属性，值随意，自定义就好
第二步：
通过 document.startViewTransition 函数开始动画，这个函数接受一个callback，这个callback里进行你需要的视图操作
## 示例：
js：
```
<div
    className="grid grid-cols-[repeat(auto-fill,100px)] gap-5"
    id="list"
    onClick={e => {
      console.log('click ====', e.target)
      const targetEle = e.target as HTMLDivElement
      if (targetEle.classList.contains('zzz-list-item')) {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            targetEle.remove() // 执行销毁dom元素的操作
          })
        } else {
          targetEle.remove()
        }
      }
    }}
  >
  // ....省略
```
# 4、滚动驱动动画
参考：

- [CSS 滚动驱动动画终于正式支持了~ - 掘金](https://juejin.cn/post/7259026189904805944)
- [CSS scroll-driven animations - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)

案例：[Scroll-driven Animations: Stacking Cards (CSS)](https://scroll-driven-animations.style/demos/stacking-cards/css/)

上图是滚动的时候，卡片会逐渐变小并堆叠在上面。
如果我们要实现上面这种效果，该怎么做呢？
传统方法：
大概是用js或者滚动高度的变化，然后算出每张卡片在这个高度和大小。这种方法性能较差，不够丝滑
换个思路，如果把卡片变小到堆叠在上面这个过程写成一个动画，那么性能会好很多，也丝滑。
那么问题来了，怎么实现滚动和动画结合呢？

- 滚动过程做成动画播放的时间线
- 指定是获取哪个容器滚动
- 滚动的那个容器，滚动距离和动画播放进度的对应关系。（也就是我滚 100px，你动画应该播放多少进度）

解决这三点，就可以实现滚动驱动动画，那么我们可以迎接
css的新特性，**scroll-driven animation**
用起来也是非常的简单
## 使用方法：
第一步：
写一个动画，如下面这个简单例子
```
@keyframes grow-x {
    0% {
        transform: scaleX(0);
    }
    100% {
        transform: scaleX(1);
    }
}
```
第二步：
给要变化的元素加上动画，并指定这个动画跟随哪个容器的滚动来播放
```
.scroll-process {
    animation: grow-x 3s linear;
    animation-timeline: scroll(y);
}
```
scroll(y) 指的是侦测y轴的滚动。
scroll函数，可以传递两个参数，分别是<scroller>和<axis>
<scroller>表示滚动容器，支持以下几个关键值

- nearest：使用最近的祖先滚动容器*（默认）*
- root：使用文档视口作为滚动容器。
- self：使用元素本身作为滚动容器。

<axios>表示滚动方向，支持以下几个关键值

- block：滚动容器的块级轴方向*（默认）*。
- inline：滚动容器内联轴方向。
- y：滚动容器沿 y 轴方向。
- x：滚动容器沿 x 轴方向。

上述简单两步，我们就实现了显示页面阅读进度的进度条。
这时候还有个坑没填：
滚动范围和动画播放进度的对应关系，比如我想实现一个页面滚动200px下面就会出现一个回到顶部的按钮。
我们可以给按钮一个出现动画，然后设置 animation-range为 0 200px 即可
# 5、路径动画
参考：[animateMotion - SVG：可缩放矢量图形 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/animateMotion)
![](https://cdn.nlark.com/yuque/0/2024/gif/12830161/1704896703958-3fa04609-f846-44b4-b667-c25aa58e9377.gif#averageHue=%23fbfbfe&clientId=u79b14509-fc38-4&from=paste&id=ue4198ba3&originHeight=540&originWidth=780&originalType=url&ratio=1.75&rotation=0&showTitle=false&status=done&style=none&taskId=uba7283b8-a12d-4c82-88e6-656912d4bbe&title=)
<animateMotion> 元素定义了一个元素如何沿着运动路径进行移动。
CSS Motion Path 规范主要包含以下几个属性：

- offset-path：接收一个 SVG 路径（与 SVG 的path、CSS 中的 clip-path 类似），指定运动的几何路径
- offset-distance：控制当前元素基于 offset-path 运动的距离
- offset-position：指定 offset-path 的初始位置
- offset-anchor：定义沿 offset-path 定位的元素的锚点。 这个也算好理解，运动的元素可能不是一个点，那么就需要指定元素中的哪个点附着在路径上进行运动
- offset-rotate：定义沿 offset-path 定位时元素的方向，说人话就是运动过程中元素的角度朝向
## 使用方法：

- Css 里定义一个keyframes ，关键帧里设置 offset-distance
- 在要使用的元素上加上 animation 和 offset-path 即可
```
.motion-path-item {
    offset-path: path("M 0 80 C 80 10, 130 10, 190 80 S 300 150, 360 80");
    animation: move 2000ms infinite alternate ease-in-out;
}
@keyframes move {
    0% {
        offset-distance: 0%;
    }
    100% {
        offset-distance: 100%;
    }
}
```
# 6、路径动画和滚动动画结合
就可以实现下面这个效果。
![](https://cdn.nlark.com/yuque/0/2024/gif/12830161/1704896704181-788dd39d-5ac8-465f-b215-25c898f78bee.gif#averageHue=%23515230&clientId=u79b14509-fc38-4&from=paste&id=ud1f46ba4&originHeight=746&originWidth=1000&originalType=url&ratio=1.75&rotation=0&showTitle=false&status=done&style=none&taskId=ubdd3be11-0c83-4ae2-af97-2423b0dd46c&title=)
箭头后面的线是 svg 画的，详情见：[【Web动画】SVG 线条动画入门 - ChokCoco - 博客园](https://www.cnblogs.com/coco1s/p/6225973.html)
Svg 线条动画的重点是：

- stroke-dasharray：值是一组数组，没数量上限，每个数字交替表示划线与间隔的宽度；
- stroke-dashoffset：则是虚线的偏移量
