import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Layout, Menu, theme } from 'antd'
import {
  CrownFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SafetyCertificateFilled,
  TeamOutlined,
} from '@ant-design/icons'
import './index.scss'

const { Sider } = Layout
const getItem = (label, key, icon, children) => {
  return {
    label,
    key,
    icon,
    children,
  }
}

const itemsSideBarUPA = [
  getItem('Admin', 'admin', <PieChartOutlined />, [
    getItem(
      <Link to="/admin/posted-product">Add products</Link>,
      '/admin/posted-product'
    ),
    getItem(
      <Link to="/admin/product-deleted">Product management</Link>,
      '/admin/product-deleted'
    ),
  ]),
  getItem('Settings', 'settings', <TeamOutlined />, [
    getItem(<Link to="/settings/account">Account</Link>, '/settings/account'),
  ]),
]

const Sidebar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [current, setCurrent] = useState(
    location.pathname || '/admin/posted-product'
  )
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onClick = e => {
    setCurrent(e.key)
  }

  useEffect(() => {
    setCurrent(location.pathname)
  }, [location.pathname])

  return (
    <Sider
      width={250}
      style={{ background: colorBgContainer }}
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        items={itemsSideBarUPA}
      />
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Sider>
  )
}

export default Sidebar
