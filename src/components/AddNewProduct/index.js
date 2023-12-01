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

const { Option } = Select

const AddNewProduct = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState('')

  const isEditProduct = history?.location?.pathname?.includes('admin/edit/')

  const handleResponseAddNewProduct = data => {
    setNewProduct(data)
    setProducts(prevProducts => [...prevProducts, newProduct])
    toast.success('Added new product', {
      position: 'top-right',
      autoClose: 3500,
    })
    history.push('/admin/product-deleted')
  }

  const handleResponseEditProduct = data => {
    toast.success('Edited a product', {
      position: 'top-right',
      autoClose: 3500,
    })
    history.push('/admin/product-deleted')
  }

  const [productDetail, setProductDetail] = useState([])
  const handleResponseGetProductById = data => {
    setProductDetail(data)
  }

  const match = history?.location?.pathname?.match(/\/([^/]+)$/)
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

  const onFinishEditProduct = values => {
    fetchApi(
      'PUT',
      `${CONFIG?.URL_DUMMY_API}`,
      `products/${idProduct}`,
      handleResponseEditProduct,
      handleError,
      {
        title: values?.title,
        description: values?.description,
        price: values?.price,
        discountPercentage: values?.discountPercentage,
        rating: values?.rating,
        stock: values?.stock,
        brand: values?.brand,
        category: values?.category,
        images: values?.img?.[0]?.thumbUrl,
      }
    )
  }

  const onFinishAddProduct = values => {
    fetchApi(
      'POST',
      `${CONFIG?.URL_DUMMY_API}`,
      'products/add',
      handleResponseAddNewProduct,
      handleError,
      {
        title: values?.title,
        description: values?.description,
        price: values?.price,
        discountPercentage: values?.discountPercentage,
        rating: values?.rating,
        stock: values?.stock,
        brand: values?.brand,
        category: values?.category,
        images: values?.img?.[0]?.thumbUrl,
      }
    )
  }

  const normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

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
