import classNames from 'classnames'
import React, { HTMLProps } from 'react'
import './scroll-driven-animation.css'
import { tengWangGeXu } from './const'

export interface ScrollDrivenAnimationProps extends HTMLProps<HTMLDivElement> {}

export const ScrollDrivenAnimation = (props: ScrollDrivenAnimationProps) => {
  const { className = '', ...restProps } = props
  return (
    <>
      <div
        className={classNames('scroll-process', 'fixed inset-0 h-2 bg-orange-800 opacity-100 mb-4', 'origin-[0%_0%]')}
      ></div>
      <div
        className={classNames(
          'relative',
          'h-[800px] overflow-auto',
          ' w-[500px] mx-auto mt-8',
          'rounded-xl p-4 pt-0',
          'border border-solid border-[#181818]',
          'shadow-2xl',
          className,
        )}
        id="scroll-container"
        {...restProps}
      >
        <div
          className={classNames(
            'scroll-process',
            'sticky inset-0 h-2 bg-orange-800 opacity-100 mb-4',
            'origin-[0%_0%]',
          )}
        ></div>
        {tengWangGeXu.split(/。|：|？/).map((text, i) => {
          return <div key={i}>{text}</div>
        })}
      </div>
    </>
  )
}
