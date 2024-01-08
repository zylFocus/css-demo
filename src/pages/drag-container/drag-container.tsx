import classNames from 'classnames'
import React, { HTMLProps } from 'react'
import './drag-container.css'

export interface DragContainerProps extends HTMLProps<HTMLDivElement> {}

export const DragContainer = (props: DragContainerProps) => {
  const { className = '', ...restProps } = props
  return (
    <div className={classNames('', className)} {...restProps}>
      <div className="drag-container">
        <aside className=" bg-blue-300">
          <div className="resize-1">
            <div className="opacity-100">我是resize的子元素</div>
          </div>
          <div className="line-1"></div>
          <div>SIDE</div>
        </aside>
        <main className="bg-red-300">MAIN</main>
      </div>
    </div>
  )
}
