
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import Images from '../../assets/images'
import './index.scss'

const { Header } = Layout

const TopNavigation = () => {
  return (
    <Header className='header-hrdept'>
      <div className='header-hrdept__logo-name'>
        <Link to='/admin/posted-job'>
          <img src={Images.logo} alt='Logo' />
        </Link>
      </div>
    </Header>
  )
}

export default TopNavigation
