export const fetchApi = async (
  methodCallApi,
  urlApiDomain,
  pathName,
  handleResponse,
  handleError,
  variables
) => {
  try {
    const response = await fetch(`${urlApiDomain}/${pathName}`, {
      method: `${methodCallApi}`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    })

    const data = await response.json()
    if (response.ok) {
      handleResponse(data)
    } else {
      handleError(data)
    }
  } catch (error) {
    handleError(error)
    if (error.response) {
      if (error.response.status === 401) {
        console.error(
          'Lỗi 401 Unauthorized: Mã token không hợp lệ hoặc đã hết hạn.'
        )
      } else {
        console.error(
          'Lỗi HTTP:',
          error.response.status,
          error.response.statusText
        )
      }
    } else if (error.request) {
      console.error('Không thể kết nối đến máy chủ.')
    } else {
      console.error('Lỗi gửi yêu cầu:', error.message)
    }
  }
}
