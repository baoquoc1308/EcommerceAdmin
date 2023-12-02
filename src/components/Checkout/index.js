import React, { useEffect, useState } from 'react'
import { Space, Table, Avatar, Modal, Image } from 'antd'
import { QuestionCircleTwoTone } from '@ant-design/icons'
import '../Checkout/index.scss'
import { toast } from 'react-toastify'
import { fetchApi } from '../../api/api'
import { formatNumber } from '../../utils'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Checkout = props => {
  // Tạo state products để lưu trữ danh sách sản phẩm. Hàm setProducts sẽ được sử dụng để cập nhật giá trị của state này.
  const [products, setProducts] = useState([])
  // Tạo state loading để theo dõi trạng thái tải dữ liệu. Nếu loading là true, có thể hiển thị một hiệu ứng tải để thông báo người dùng rằng dữ liệu đang được tải.
  const [loading, setLoading] = useState(false)
  // Tạo state isModalVisible để kiểm soát việc hiển thị hay ẩn modal (cửa sổ giao diện người dùng) xác nhận khi người dùng muốn xóa sản phẩm.
  const [isModalVisible, setIsModalVisible] = useState(false)
  //  Tạo state productIdToDelete để lưu trữ ID của sản phẩm sẽ bị xóa.
  const [productIdToDelete, setProductIdToDelete] = useState(null)
  // Hàm showModal được gọi khi người dùng muốn xóa một sản phẩm. Nó cập nhật productIdToDelete với ID của sản phẩm cần xóa và đặt isModalVisible thành true, mở modal xác nhận xóa.
  const showModal = id => {
    setProductIdToDelete(id) // Store the product ID to delete
    setIsModalVisible(true)
  }
  // Hàm xử lý phản hồi từ việc lấy danh sách sản phẩm. Nó cập nhật giá trị của products với dữ liệu mới nhận được từ API.
  const handleResponseGetAllProducts = data => {
    setProducts(data)
  }
  // Hàm xử lý khi người dùng nhấn "OK" trong modal xác nhận xóa sản phẩm. Hiện tại, nó chỉ đóng modal, hiển thị thông báo thành công và làm mới trang sau 2 giây.
  const handleOk = () => {
    // Perform the delete operation here
    setIsModalVisible(false)
    toast.success('Đã xóa thành công sản phẩm!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }
  // Hàm xử lý khi người dùng nhấn "Cancel" trong modal xác nhận xóa sản phẩm. Nó chỉ đơn giản là đóng modal.
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  //  Một hàm trống có vẻ sẽ được sử dụng để xử lý khi người dùng nhấn vào nút chỉnh sửa sản phẩm. Hiện tại, nó không có nội dung.
  const handleClickEdit = id => {}
  // Hàm xử lý lỗi khi có lỗi trong quá trình tương tác với API. Nó hiển thị một thông báo lỗi, thông báo này sẽ tự động đóng sau 1.5 giây.
  const handleError = data => {
    toast.error(data?.message || 'Something went wrong!', {
      position: 'top-right',
      autoClose: 1500,
    })
  }
  // Hàm này được gọi khi người dùng chọn một sản phẩm từ ô tìm kiếm. Nó sử dụng fetchApi để gửi yêu cầu tìm kiếm đến API dựa trên chuỗi tìm kiếm (searchString). Sau đó, nó gọi handleResponseGetAllProducts để cập nhật danh sách sản phẩm với kết quả trả về từ API.
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
  // Đây là một hook useEffect có dependencies là một mảng rỗng ([]). Điều này có nghĩa là hàm được truyền vào useEffect sẽ chỉ chạy một lần sau khi component được render lần đầu tiên.
  useEffect(() => {
    // Hàm handleSelectProduct được gọi với tham số là chuỗi rỗng ''. Trong trường hợp này, nó sẽ gửi một yêu cầu tìm kiếm đến API để lấy danh sách sản phẩm. Việc gọi hàm này với tham số rỗng có thể đại diện cho việc lấy tất cả sản phẩm (hoặc một tập hợp lớn của chúng) từ API khi component được render lần đầu tiên.
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
