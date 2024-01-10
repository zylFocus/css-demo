import { Button } from 'antd'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { allRoutes, routePathNameMap } from '../../route-config'
import './home.css'

export const Home = () => {
  const navigate = useNavigate()
  const homeRoute = allRoutes[0]
  return (
    <div
      className={classNames(
        'home-bg',
        'relative',
        'w-[100vw] h-[100vh] bg-pink-50 text-5',
        'flex flex-col justify-center items-center gap-3',
      )}
    >
      <h1 className="text-[30px] my-5 home-title">
        <p>css demo</p>
      </h1>
      <div className="flex flex-col gap-3">
        {homeRoute.children
          ?.filter(i => i.path !== '/')
          .map(i => {
            return (
              <Button
                onClick={() => {
                  navigate(i.path!)
                }}
                key={i.path}
                size="large"
                className="home-btn hover:shadow-xl hover:scale-125 hover:!border-[#fff] !text-pink-100"
                style={
                  {
                    '--home-btn': `home-btn-${i.path}`,
                  } as any
                }
              >
                {routePathNameMap[i.path as string]}
              </Button>
            )
          })}
      </div>
    </div>
  )
}
