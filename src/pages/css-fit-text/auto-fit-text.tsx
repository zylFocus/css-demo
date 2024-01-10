import classNames from 'classnames'
import React, { HTMLProps } from 'react'
import './auto-fit-text.css'

interface CssFitTextProps extends HTMLProps<HTMLDivElement> {
  className?: string
}

export const TextAvatar = ({ title }: { title: string }) => {
  return (
    <div>
      <div className="flex items-center justify-center w-[50px] h-[50px] rounded-md bg-orange-300 whitespace-nowrap">
        <div className="relative">
          <div className="text-[50px] invisible">{title}</div>
          <div className={classNames('avatar-container w-full', 'absolute inset-0 flex justify-center items-center')}>
            <span className="text-[calc(30px-10cqw)] truncate">{title}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CssFitText(props: CssFitTextProps) {
  const { className, ...restProps } = props

  const titleList = ['业务集成', '连接器', '设置', '方案中心']
  return (
    <div
      className={classNames(className, 'h-full w-full flex flex-col gap-8 justify-center items-center father')}
      {...restProps}
    >
      <h1>查询容器宽度</h1>
      <div className="container w-[30%] border-solid border-px shadow-xl resize overflow-hidden">
        <p className="text-[5cqw]">
          青丘有坟立丘首，白狐盖坟口。 我于坟前三叩首，请狐为神胄。 狐狸与我共饮酒，护我游青丘。
        </p>

        <p className="text-[#2d555f]">时间不在于你拥有多少，而在于你怎样使用</p>
      </div>
      <h1>缩小时加粗</h1>
      <div className="container w-[30%] border-solid border-px shadow-xl resize overflow-hidden">
        <p className="text-[clamp(12px,4cqw,60px)] dufu-poem">
          风急天高猿啸哀，渚清沙白鸟飞回。 无边落木萧萧下，不尽长江滚滚来。 万里悲秋常作客，百年多病独登台。
          艰难苦恨繁霜鬓，潦倒新停浊酒杯。
        </p>
      </div>
      <h1>自适应文本</h1>
      <div className="flex flex-col gap-2">
        {titleList.map(i => {
          return <TextAvatar title={i} />
        })}
      </div>
    </div>
  )
}
