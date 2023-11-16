import { Breadcrumb } from 'antd'
import './index.scss'

const HeadingTemplateChildPage = ({title, breadcrumbItems, buttonEvent}) => {
  return (
    <div className='title-breadcrumb-button'>
      <div className='title-breadcrumb'>
        <Breadcrumb items={breadcrumbItems}/>
        <p className='title'>{title}</p>
      </div>
      <>{buttonEvent}</>
    </div>
  )
}

export default HeadingTemplateChildPage
