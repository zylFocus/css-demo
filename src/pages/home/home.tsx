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
        'relative',
        'w-[100vw] h-[100vh] bg-pink-50 text-5',
        'flex flex-col justify-center items-center gap-3',
      )}
    >
      <div
        style={{
          filter: 'grayscale(50%) blur(3px)',
        }}
        className={classNames('home-bg-img absolute w-full h-full', 'bg-[url(./src/assets/images/linKe.png)] bg-cover')}
      ></div>
      <h1 className="text-[30px] my-5">css demo</h1>
      <div className="home-btns flex flex-col gap-2">
        {homeRoute.children?.map(i => {
          return (
            <Button
              onClick={() => {
                navigate(i.path!)
              }}
              key={i.path}
              className="home-btn hover:scale-125"
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
