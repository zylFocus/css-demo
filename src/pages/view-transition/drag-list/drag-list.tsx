import classNames from 'classnames'
import type { Identifier } from 'dnd-core'
import React, { HTMLProps, useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { nanoid } from 'nanoid'
import './drag-list.css'

const names = ['aaa', 'bbb', '发达', '杜甫', '李白', '安其拉', '压缩', '瑟提', '天音波在滑行的过程中', '肉弹葱鸡']

const mockList = names.map(name => {
  return {
    id: nanoid(),
    name: name,
  }
})

export interface DragListProps extends HTMLProps<HTMLDivElement> {}
interface DragItem {
  index: number
  id: string
  type: string
}

export const DragItem = (
  props: HTMLProps<HTMLDivElement> & {
    id: string
    name: string
    index: number
    moveCard: (drag: number, drop: number) => void
  },
) => {
  const { id, name, index, moveCard, ...restProps } = props
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'drag-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop(item: DragItem) {
      if (!ref.current) {
        return
      }
      console.log('drop ====', item, index)
      const dragIndex = item.index
      const dropIndex = index
      moveCard(dragIndex, dropIndex)
    },
  })
  const [collected, drag] = useDrag(() => ({
    type: 'drag-item',
    item: { id, index },
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  }))

  drag(drop(ref))
  return (
    <div
      ref={ref}
      className={classNames(
        'w-[300px] h-8 border border-solid border-black',
        'rounded-md flex items-center px-2 cursor-move',
        collected.isDragging && 'opacity-20',
        'drag-list-item',
      )}
      {...restProps}
      data-handler-id={handlerId}
      style={
        {
          '--i': id,
        } as any
      }
    >
      {name}
    </div>
  )
}

export const DragList = (props: DragListProps) => {
  const { className = '', ...restProps } = props
  const [list, setList] = useState(mockList)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classNames('flex flex-col gap-3', className)} {...restProps}>
        {list.map((i, index) => {
          return (
            <DragItem
              {...i}
              index={index}
              moveCard={(dragIndex, dropIndex) => {
                const dragItem = list[dragIndex]
                const hoverItem = list[dropIndex]
                const newList = [...list]
                newList.splice(dragIndex, 1, hoverItem)
                newList.splice(dropIndex, 1, dragItem)
                console.log('move vard ====', { dragIndex, dropIndex, list, newList, dragItem, hoverItem })
                if (document.startViewTransition) {
                  document.startViewTransition(async () => {
                    setList([...newList])
                    return new Promise(r => {
                      setTimeout(r, 200)
                    })
                  })
                }
              }}
            />
          )
        })}
      </div>
    </DndProvider>
  )
}
