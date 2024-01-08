import classNames from 'classnames'
import React, { HTMLProps } from 'react'
import './auto-fit-text.css'

interface CssFitTextProps extends HTMLProps<HTMLDivElement> {
  className?: string
}

export const TextAvatar = ({ title }: { title: string }) => {
  return (
    <div>
      {/* <div className="w-10 h-10 rounded-md shadow-lg bg-pink-400"></div>; */}
      <div className="flex items-center justify-center w-[50px] h-[50px] rounded-md bg-pink-300 whitespace-nowrap">
        <div className="relative before:content-[attr(data-data)] before:invisible text-[50px]" data-data={title}>
          <div className="avatar-container absolute inset-0 flex justify-center items-center">
            <span className="text-[calc(32px-10cqw)] truncate">{title}</span>
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

        <p className="text-[#2d555f] text-[10%]">时间不在于你拥有多少，而在于你怎样使用</p>
      </div>
      <h1>自适应文本</h1>
      <div className="flex flex-col gap-2">
        {titleList.map(i => {
          return <TextAvatar title={i} />
        })}
      </div>
      <h1>测试查询容器</h1>
      <div className="w-[500px]">
        <div className="truncate w-[150px] h-10 zzz-container">世间兵刃万千，唯有过往伤人最深</div>
      </div>
    </div>
  )
}
