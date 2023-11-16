import React from 'react'
import './index.scss'
import HeadingTemplateChildPage from '../HeadingTemplateChildPage'
import AddNewProduct from '../AddNewProduct'

const breadcrumbAuditTrails = [
  {
    title: 'Dashboard',
  },
]

const Dashboard = () => {
  return (
    <>
      <HeadingTemplateChildPage
        title="Add product"
        breadcrumbItems={breadcrumbAuditTrails}
      />
      <div className="dashboard-page">
        <AddNewProduct />
      </div>
    </>
  )
}

export default Dashboard
