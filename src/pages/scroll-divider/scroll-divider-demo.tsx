import { TabsProps, Tabs } from 'antd'
import { ScrollDividerOne } from './scroll-divider-one'
import { ScrollDividerTwo } from './scroll-divider-two'

export const ScrollDividerDemo = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: <ScrollDividerOne />,
    },
    {
      key: '2',
      label: 'Tab 2',
      children: <ScrollDividerTwo />,
    },
  ]
  return <Tabs items={items} defaultActiveKey="1" className="w-full h-full" />
}
