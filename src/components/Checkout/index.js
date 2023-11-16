import React, { useEffect, useState } from 'react'
import { Space, Table, Avatar, Modal, Image } from 'antd'
import { QuestionCircleTwoTone } from '@ant-design/icons'
import '../Checkout/index.scss'
import { toast } from 'react-toastify'
import { fetchApi } from '../../api/api'
import { formatNumber } from '../../utils'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Checkout = props => {
  const [products, setProducts] = useState([])
  console.log('🚀 ~ file: index.js:11 ~ Checkout ~ products:', products)

  const [loading, setLoading] = useState(false)
  const [sortOption, setSortOption] = useState(null)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null)
  const showModal = id => {
    setProductIdToDelete(id) // Store the product ID to delete
    setIsModalVisible(true)
  }

  const handleResponseGetAllProducts = data => {
    setProducts(data)
  }

  const handleOk = () => {
    // Perform the delete operation here
    setIsModalVisible(false)
    toast.success('Đã xóa thành công đơn hàng!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const history = useHistory()

  const handleClickEdit = id => {}

  const handleError = data => {
    toast.error(data?.message || 'Something went wrong!', {
      position: 'top-right',
      autoClose: 1500,
    })
  }

  const handleSelectProduct = searchString => {
    setLoading(true)
    fetchApi(
      'GET',
      'https://dummyjson.com',
      `products/search?q=${searchString}&limit=100`,
      handleResponseGetAllProducts,
      handleError
    )
    setLoading(false)
  }

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: link => {
        return (
          <Avatar
            style={{ width: '50px', height: '50px' }}
            icon={<Image width={50} height={50} src={link}></Image>}
          ></Avatar>
        )
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      key: 'stock',
      render: (text, record) => {
        return <a>{text}</a>
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => {
        return (
          <a>
            ₫
            {formatNumber(
              Math.round(
                record?.price -
                  (record?.price * record?.discountPercentage) / 100
              ) * 23000
            )}
          </a>
        )
      },
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: text => <a>{text.charAt(0).toUpperCase() + text.slice(1)}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        console.log('🚀 ~ file: index.js:128 ~ Checkout ~ record:', record)
        return (
          <Space size="middle">
            <button onClick={() => showModal(record?.id)}>Delete</button>
            <button onClick={() => handleClickEdit(record?.id)}>
              <Link to={`/admin/edit/${record?.id}`}>Edit</Link>
            </button>
          </Space>
        )
      },
    },
  ]

  useEffect(() => {
    handleSelectProduct('')
  }, [])

  return (
    <div className="my-40 lg:my-32 mx-7 ">
      <h1 className="order">QUẢN LÝ SẢN PHẨM</h1>
      <Table
        className="table-list"
        columns={columns}
        dataSource={products?.products}
      />
      <Modal
        title="Delete Confirmation"
        onOk={handleOk}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <div className="modal-delete">
          <QuestionCircleTwoTone className="modal-delete__icon" />
          <p className="modal-delete__msg">Do you want to delete this item?</p>
        </div>
      </Modal>
    </div>
  )
}

export default Checkout
