import classNames from 'classnames'
import React, { HTMLProps } from 'react'
import './motion-path-animation.css'

export interface MotionPathAnimationProps extends HTMLProps<HTMLDivElement> {}

export const MotionPathAnimation = (props: MotionPathAnimationProps) => {
  const { className = '', ...restProps } = props

  const pathMoveCube = (
    <div>
      <div className={classNames('motion-path-item', 'w-10 h-10 bg-lime-700 offset')}></div>

      <h1 className="mt-8">svg</h1>
      <div>
        <svg width="400" height="160" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 80 C 80 10, 130 10, 190 80 S 300 150, 360 80" stroke="black" fill="transparent" />
        </svg>
      </div>
    </div>
  )

  const scrollPathAnimation = (
    <div className="relative w-[800px]">
      <svg className="g-svg" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
        <path id="svgpath" d="M 350 40 C 1000 1000, -350 1000, 350 1960" stroke="black" fill="transparent" />
      </svg>
      <div className={classNames('arrow', 'bg-red-400 ', 'w-10 h-10')}></div>
    </div>
  )

  return (
    <div className={classNames('w-full h-full p-10', className)} {...restProps}>
      <div className="font-bold text-[24px] my-2">移动的小方块</div>
      {pathMoveCube}
      <div className="font-bold text-[24px] my-2">路径动画</div>
      {scrollPathAnimation}
    </div>
  )
}
