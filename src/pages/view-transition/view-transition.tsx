import classNames from 'classnames'
import React, { HTMLProps } from 'react'
import './view-transition.css'

export interface ViewTransitionProps extends HTMLProps<HTMLDivElement> {}

export const ViewTransition = (props: ViewTransitionProps) => {
  const { className = '', ...restProps } = props

  const itemList = new Array(10).fill(1).map((_, index) => index + 1)
  return (
    <div className={classNames('w-[550px] m-auto', className)} {...restProps}>
      <h2>点击开始删除</h2>
      <div
        className="grid grid-cols-[repeat(auto-fill,100px)] gap-5"
        id="list"
        onClick={e => {
          console.log('click ====', e.target)
          const targetEle = e.target as HTMLDivElement
          if (targetEle.classList.contains('zzz-list-item')) {
            if (document.startViewTransition) {
              // targetEle.remove()
              document.startViewTransition(() => {
                targetEle.remove()
              })
            } else {
              targetEle.remove()
            }
          }
        }}
      >
        {itemList.map(i => {
          return (
            <div
              key={i}
              className={classNames(
                'zzz-list-item',
                'bg-orange-700 h-[100px]',
                'flex justify-center items-center',
                'text-[24px] text-[#fff]',
                'rounded-lg cursor-pointer',
                'view-transition-name',
              )}
              style={
                {
                  '--i': `i-${i}`,
                } as any
              }
            >
              {i}
            </div>
          )
        })}
      </div>
    </div>
  )
}
