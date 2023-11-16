import React from 'react'
import moment from 'moment'
import './Footer.scss'

const Footer = () => (
  <footer className='footer'>
    <div className='u-contain'>
      &copy; {moment().year()} All Rights Reserved.
    </div>
  </footer>
)

export default Footer
