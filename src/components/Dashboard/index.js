import React from 'react'
import './index.scss'
import HeadingTemplateChildPage from '../HeadingTemplateChildPage'
import AddNewProduct from '../AddNewProduct'

const breadcrumbAuditTrails = [{}]

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-page">
        <AddNewProduct />
      </div>
    </>
  )
}

export default Dashboard
