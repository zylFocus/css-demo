import { ReactNode } from 'react'
import { Button } from 'antd'
import classNames from 'classnames'
import { FormCom } from './components/antd-form'

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

export const ScrollDividerOne = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className={classNames(
          'w-[500px] h-[800px] flex flex-col',
          ' border border-solid border-gray-300 overflow-auto',
          'shadow-lg',
        )}
      >
        <div className="h-[80px] w-full flex-none bg-pink-50 p-5 flex items-center">header</div>
        <ScrollContainer className={classNames('flex-1')}>
          <div className="p-5">
            <FormCom />
          </div>
        </ScrollContainer>
        <div className=" w-full flex-none bg-white-50 p-5 flex justify-end gap-4">
          <Button>取消</Button>
          <Button>确定</Button>
        </div>
      </div>
    </div>
  )
}
