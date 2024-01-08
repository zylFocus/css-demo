import { RouteObject } from 'react-router-dom'
import { CssFitText } from './pages/css-fit-text/auto-fit-text'
import { DragContainer } from './pages/drag-container/drag-container'
import { Home } from './pages/home/home'
import { ScrollDividerDemo } from './pages/scroll-divider/scroll-divider-demo'
import { Entry } from './pages/home/entry'
import { ViewTransition } from './pages/view-transition/view-transition'
import { ScrollDrivenAnimation } from './pages/scroll-driven-animation/scroll-driven-animation'
import { MotionPathAnimation } from './pages/motion-path-animation/motion-path-animation'

export const allRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Entry />,
    children: [
      { index: true, element: <Home />, path: '/' },
      {
        path: '/scroll-divider',
        element: <ScrollDividerDemo />,
      },
      {
        path: '/css-fit-text',
        element: <CssFitText />,
      },
      {
        path: '/drag-container',
        element: <DragContainer />,
      },
      {
        path: '/view-transition',
        element: <ViewTransition />,
      },
      {
        path: '/scroll-driven-animation',
        element: <ScrollDrivenAnimation />,
      },
      {
        path: '/motion-path-animation',
        element: <MotionPathAnimation />,
      },
    ],
  },
]

export const routePathNameMap: Record<string, string> = {
  '/': 'home',
  '/scroll-divider': '滚动分割线',
  '/css-fit-text': '自适应文本',
  '/drag-container': '拖拽容器',
  '/view-transition': '视图过渡',
  '/scroll-driven-animation': '滚动驱动动画',
  '/motion-path-animation': '运动路径动画',
}
