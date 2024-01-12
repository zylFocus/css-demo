import classNames from 'classnames'
import React, { HTMLProps, useState } from 'react'
import './view-transition.css'
import { Button } from 'antd'
import { nanoid } from 'nanoid'

export interface ViewTransitionProps extends HTMLProps<HTMLDivElement> {}

const initList = new Array(10).fill(1).map((_, index) => String(index + 1))

export const ViewTransition = (props: ViewTransitionProps) => {
  const { className = '', ...restProps } = props

  const [itemList, setItemList] = useState(initList)

  const shiftItem = () => {
    const item = nanoid(8)
    if (document.startViewTransition) {
      // targetEle.remove()
      document.startViewTransition(() => {
        setItemList([item, ...itemList])
      })
    } else {
      setItemList([item, ...itemList])
    }
  }
  return (
    <div className={classNames('w-[550px] m-auto', className)} {...restProps}>
      <h2>点击开始删除</h2>
      <Button onClick={shiftItem}>向前插入</Button>
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
              {String(i).slice(0, 2)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
