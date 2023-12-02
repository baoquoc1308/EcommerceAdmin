import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './index.scss'
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons'
import { fetchApi } from '../../api/api'
import { CONFIG } from '../../config'
/* Sử dụng destructuring để lấy Option từ Select của Ant Design.
Khởi tạo biến trạng thái sử dụng useState.
history được sử dụng để quản lý lịch sử điều hướng.
form được tạo bằng Form.useForm() của Ant Design để quản lý biểu mẫu.
products, newProduct là các biến trạng thái được sử dụng để quản lý dữ liệu sản phẩm. */
const { Option } = Select

const AddNewProduct = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState('')
  // Dùng để kiểm tra xem đoạn '/admin/edit/' có xuất hiện trong địa chỉ URL hiện tại hay không.

  // Nếu có, điều này ngụ ý rằng trang web đang ở trong chế độ chỉnh sửa sản phẩm (admin/edit).
  // Nếu không, isEditProduct sẽ được đặt thành false, cho biết trang đang trong chế độ thêm mới sản phẩm.
  const isEditProduct = history?.location?.pathname?.includes('admin/edit/')

  const handleResponseAddNewProduct = data => {
    // Đặt giá trị mới cho state newProduct bằng dữ liệu nhận được từ phản hồi (data).
    setNewProduct(data)
    // Cố gắng thêm newProduct vào mảng products sử dụng hàm setProducts
    setProducts(prevProducts => [...prevProducts, newProduct])
    toast.success('Added new product', {
      position: 'top-right',
      autoClose: 3500,
    })
    // Chuyển hướng người dùng đến trang /admin/product-deleted sau khi đã thêm mới sản phẩm thành công.
    history.push('/admin/product-deleted')
  }

  const handleResponseEditProduct = data => {
    toast.success('Edited a product', {
      position: 'top-right',
      autoClose: 3500,
    })
    // Chuyển hướng người dùng đến trang /admin/product-deleted sau khi đã thêm mới sản phẩm thành công.
    history.push('/admin/product-deleted')
  }
  // Tạo một state productDetail bằng cách sử dụng hook useState với giá trị khởi tạo là một mảng rỗng. productDetail sẽ được sử dụng để lưu trữ thông tin chi tiết của sản phẩm.
  const [productDetail, setProductDetail] = useState([])
  // Hàm xử lý phản hồi từ API khi nhận được thông tin chi tiết của sản phẩm. Nó đơn giản là cập nhật giá trị của productDetail bằng dữ liệu (data) nhận được từ API.
  const handleResponseGetProductById = data => {
    setProductDetail(data)
  }
  // Sử dụng match để trích xuất idProduct từ địa chỉ URL. Biểu thức chính quy /\/([^/]+)$/ được sử dụng để tìm chuỗi kết thúc bằng / và sau đó là một chuỗi không chứa /, và lưu chuỗi không chứa / đó vào match[1].
  const match = history?.location?.pathname?.match(/\/([^/]+)$/)
  // Gán giá trị của idProduct bằng chuỗi không chứa / nếu match không phải là null. Nếu match là null, idProduct sẽ là undefined.
  const idProduct = match && match[1]

  const handleGetDataJobDetail = () => {
    fetchApi(
      'GET',
      `${CONFIG?.URL_DUMMY_API}`,
      `products/${idProduct}`,
      handleResponseGetProductById,
      handleError
    )
  }

  const handleError = data => {
    toast.error(data?.errorCode || data?.message || 'Something went wrong!', {
      position: 'top-right',
      autoClose: 1500,
    })
  }
  // Đây là hàm được gọi khi người dùng hoàn tất việc chỉnh sửa thông tin của sản phẩm và nhấn nút "Submit" trên biểu mẫu.
  const onFinishEditProduct = values => {
    // Gọi hàm fetchApi để thực hiện yêu cầu PUT đến API để cập nhật thông tin sản phẩm. Tham số truyền vào hàm fetchApi bao gồm:
    fetchApi(
      'PUT',
      `${CONFIG?.URL_DUMMY_API}`,
      `products/${idProduct}`,
      handleResponseEditProduct,
      handleError,
      // Dữ liệu được gửi đi là một đối tượng chứa các giá trị từ biểu mẫu đã được điền, bao gồm title, description, price, discountPercentage, rating, stock, brand, category, và images. Các giá trị này được lấy từ đối tượng values, mà là đầu vào của hàm onFinishEditProduct.
      {
        title: values?.title,
        description: values?.description,
        price: values?.price,
        discountPercentage: values?.discountPercentage,
        rating: values?.rating,
        stock: values?.stock,
        brand: values?.brand,
        category: values?.category,
        // values?.img?.[0]?.thumbUrl: Đây là một cách an toàn để truy cập thuộc tính thumbUrl của ảnh đầu tiên trong mảng img nếu có. Nếu không có ảnh hoặc không có thumbUrl, giá trị sẽ là undefined.
        images: values?.img?.[0]?.thumbUrl,
      }
    )
  }
  // Hàm được gọi khi người dùng hoàn tất việc thêm mới thông tin sản phẩm và nhấn nút "Submit" trên biểu mẫu.
  const onFinishAddProduct = values => {
    // Gọi hàm fetchApi để thực hiện yêu cầu POST đến API để thêm mới sản phẩm. Tham số truyền vào hàm fetchApi bao gồm:
    fetchApi(
      'POST',
      `${CONFIG?.URL_DUMMY_API}`,
      'products/add',
      handleResponseAddNewProduct,
      handleError,
      {
        // Dữ liệu được gửi đi là một đối tượng chứa các giá trị từ biểu mẫu đã được điền, bao gồm title, description, price, discountPercentage, rating, stock, brand, category, và images. Các giá trị này được lấy từ đối tượng values, mà là đầu vào của hàm onFinishAddProduct.
        title: values?.title,
        description: values?.description,
        price: values?.price,
        discountPercentage: values?.discountPercentage,
        rating: values?.rating,
        stock: values?.stock,
        brand: values?.brand,
        category: values?.category,
        // values?.img?.[0]?.thumbUrl: Đây là một cách an toàn để truy cập thuộc tính thumbUrl của ảnh đầu tiên trong mảng img nếu có. Nếu không có ảnh hoặc không có thumbUrl, giá trị sẽ là undefined
        images: values?.img?.[0]?.thumbUrl,
      }
    )
  }
  // Đây là một hàm xử lý trước khi dữ liệu từ trường tệp (file) được gửi đến server. Trong trường hợp này, hàm kiểm tra nếu e là một mảng (nghĩa là nhiều tệp đã được chọn), thì trả về chính e, ngược lại trả về e?.fileList (nếu có). Điều này giúp đảm bảo rằng giá trị của trường tệp là một mảng, ngay cả khi chỉ có một tệp được chọn.
  const normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  // Đây là một hook useEffect được sử dụng để thực hiện các hành động sau khi thành phần đã được render. Trong trường hợp này:

  // if (isEditProduct && productDetail) { ... }: Kiểm tra xem trang hiện tại có phải là trang chỉnh sửa sản phẩm (isEditProduct) và liệu có thông tin chi tiết sản phẩm (productDetail) hay không.

  // form.setFieldsValue({ ... }): Nếu điều kiện trên đúng, hàm này được gọi để cập nhật giá trị của trường trong biểu mẫu. Trong trường hợp này, các giá trị từ productDetail được gán cho các trường của biểu mẫu. Tuy nhiên, giá trị của title được đặt thành '123' để minh họa, có thể được sửa lại để lấy giá trị thực tế từ productDetail.

  // [productDetail]: Mảng các dependency, chỉ khi productDetail thay đổi, useEffect mới được thực thi.
  useEffect(() => {
    if (isEditProduct && productDetail) {
      form.setFieldsValue({
        // title: productDetail?.title,
        title: '123',
        description: productDetail?.description,
        price: productDetail?.price,
        discountPercentage: productDetail?.discountPercentage,
        rating: productDetail?.rating,
        stock: productDetail?.stock,
        brand: productDetail?.brand,
        category: productDetail?.category,
        // images: productDetail?.thumbnail,
      })
    }
  }, [productDetail])
  // Hook useEffect khác được sử dụng để thực hiện các hành động sau khi thành phần đã được render, nhưng chỉ chạy một lần (với mảng dependency trống []). Trong trường hợp này, nó gọi hàm handleGetDataJobDetail() để lấy thông tin chi tiết sản phẩm từ API khi thành phần được render lần đầu tiên.
  useEffect(() => {
    handleGetDataJobDetail()
  }, [])

  return (
    <div className="add-job">
      <div className="title-welcome">
        <h2 class="">
          {isEditProduct ? 'CHỈNH SỬA SẢN PHẨM ' : 'THÊM MỚI SẢN PHẨM'}
        </h2>
      </div>
      <Form
        form={form}
        onFinish={isEditProduct ? onFinishEditProduct : onFinishAddProduct}
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
        // initialValues={isEditProduct && productDetail}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="Product title"
          rules={[{ required: true, message: 'Please input product title.' }]}
        >
          <Input placeholder="Please input product title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input description.' }]}
        >
          <Input placeholder="Please input description" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          className="ant-experience-job"
          rules={[
            {
              required: true,
              message: 'Please choose price of product!',
            },
          ]}
        >
          <InputNumber
            min={0}
            max={1000}
            step={1}
            addonAfter="$"
            placeholder="Enter price"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Discount percent (%)"
          name="discountPercentage"
          className="ant-experience-job"
          rules={[
            {
              required: true,
              message: 'Please input discount percent !',
            },
          ]}
        >
          <InputNumber
            min={0}
            max={100}
            step={1}
            addonAfter="%"
            placeholder="Enter discount percent"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Rating"
          name="rating"
          className="ant-experience-job"
          rules={[
            {
              required: true,
              message: 'Please add rating of product!',
            },
          ]}
        >
          <InputNumber
            min={0}
            max={5}
            step={1}
            addonAfter="*"
            placeholder="Enter rating"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          className="ant-experience-job"
          rules={[
            {
              required: true,
              message: 'Please add stock of product!',
            },
          ]}
        >
          <InputNumber
            min={0}
            max={100}
            step={1}
            addonAfter="items"
            placeholder="Enter price"
            size="large"
          />
        </Form.Item>

        <div className="type-experience">
          <Form.Item
            name="brand"
            label="Brand"
            rules={[
              { required: true, message: 'Please select brand product!' },
            ]}
          >
            <Select placeholder="Choose one" size="large">
              <Option value="Apple">Apple</Option>
              <Option value="Iphone">Iphone</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: 'Please select category product!' },
            ]}
          >
            <Select placeholder="Choose one" size="large">
              <Option value="smartphones">smartphones</Option>
              <Option value="laptops">laptops</Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          label="Image product"
          valuePropName="fileList"
          name="img"
          rules={[
            {
              required: true,
              message: 'Please add image product!',
            },
          ]}
          getValueFromEvent={normFile}
          className="upload-logo-company"
        >
          <Upload.Dragger
            action={'http://localhost:3000'}
            listType="picture"
            className="upload-list-inline"
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
            accept=".png,.jpeg,.jpg,.svg"
            beforeUpload={file => {
              return false
            }}
          >
            Drag files here OR <br></br>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload.Dragger>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditProduct ? 'Edit' : 'Add'}
        </Button>
      </Form>
    </div>
  )
}

export default AddNewProduct
