# 自适应文本：
[图片]
http://mp.weixin.qq.com/s?__biz=MzIyMDc1NTYxNg==&mid=2247486274&idx=1&sn=056118df01e1d68fd14cc2aad8b880de&chksm=97c6688da0b1e19b0b2ec74a30b433e0ab2eea21c8d59f5f880714ec6c654c08846d84308553&scene=21#wechat_redirect

css容器查询：CSS 容器查询 - CSS：层叠样式表 | MDN

css显示数字：
滑动验证页面


# 滚动和动画结合：
mp.weixin.qq.com
CSS 滚动驱动动画终于正式支持了~ - 掘金

案例：https://baoyu.io/pages/ft/generative-ai

animation-timeline: scroll();
这里的scroll()是一个简写，可以传递两个参数，分别是<scroller>和<axis>
<scroller>表示滚动容器，支持以下几个关键值
- nearest：使用最近的祖先滚动容器*（默认）*
- root：使用文档视口作为滚动容器。
- self：使用元素本身作为滚动容器。
<axios>表示滚动方向，支持以下几个关键值
- block：滚动容器的块级轴方向*（默认）*。
- inline：滚动容器内联轴方向。
- y：滚动容器沿 y 轴方向。
- x：滚动容器沿 x 轴方向。

animation-range: 0 100px;
表示只在0-100px范围内触发动画。

## 路径动画：
animateMotion - SVG：可缩放矢量图形 | MDN
CSS Motion Path 规范主要包含以下几个属性：
- offset-path：接收一个 SVG 路径（与 SVG 的path、CSS 中的 clip-path 类似），指定运动的几何路径
- offset-distance：控制当前元素基于 offset-path 运动的距离
- offset-position：指定 offset-path 的初始位置
- offset-anchor：定义沿 offset-path 定位的元素的锚点。 这个也算好理解，运动的元素可能不是一个点，那么就需要指定元素中的哪个点附着在路径上进行运动
- offset-rotate：定义沿 offset-path 定位时元素的方向，说人话就是运动过程中元素的角度朝向

## 元素裁剪：
clip-path CSS 属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏

clip-path - CSS：层叠样式表 | MDN
circle() (en-US)
定义一个圆形（使用一个半径和一个圆心位置）。
ellipse() (en-US)
定义一个椭圆（使用两个半径和一个圆心位置）。
polygon() (en-US)
定义一个多边形（使用一个 SVG 填充规则和一组顶点）。
path() (en-US)
定义一个任意形状（使用一个可选的 SVG 填充规则和一个 SVG 路径定义）。

## Svg 线条动画：
【Web动画】SVG 线条动画入门 - ChokCoco - 博客园
原生视图转换动画 View Transitions API
mp.weixin.qq.com
重点：
- 视图变化其实和元素是否相同没有关联，有关联的只有view-transition-name，浏览器是根据view-transition-name寻找的，也就是相同名称的元素在前后会有一个过渡动画。
- 使用 document.startViewTransition 