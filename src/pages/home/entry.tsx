import { Button } from 'antd'
import classNames from 'classnames'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

export interface EntryProps {
  className?: string
}

export const Entry = (props: EntryProps) => {
  const { className = '', ...restProps } = props
  const navigate = useNavigate()
  const location = useLocation()
  console.log('useLocation data ====', location)
  const showBackHomeBtn = location.pathname !== '/'

  return (
    <div className={classNames('relative h-full w-full', className)} {...restProps}>
      <Outlet />
      {showBackHomeBtn && (
        <Button
          className="fixed right-2 bottom-2"
          onClick={() => {
            navigate('/')
          }}
        >
          回到桌面
        </Button>
      )}
    </div>
  )
}
