import React from 'react'

function DropDownItem ({ children, onClick }) {
  return <li onClick={onClick}>{children}</li>
}

export default DropDownItem
