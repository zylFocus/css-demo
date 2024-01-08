import { Button } from 'antd'
import classNames from 'classnames'
import { FormCom } from './components/antd-form'
import './scroll-divider-two.css'

export const ScrollDividerTwo = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-300">
      <div
        className={classNames(
          'w-[500px] h-[800px] flex flex-col',
          ' border border-solid border-gray-300 overflow-auto',
          'shadow-lg bg-[#fff]',
        )}
      >
        <div className="h-[80px] w-full flex-none bg-pink-50 p-5 flex items-center">header</div>
        <div className={classNames('overflow-auto flex-1 relative has-scroll-top-divider')}>
          <div className="p-5 ">
            <FormCom />
          </div>
        </div>
        <div className=" w-full flex-none bg-white-50 p-5 flex justify-end gap-4">
          <Button>取消</Button>
          <Button>确定</Button>
        </div>
      </div>
    </div>
  )
}
