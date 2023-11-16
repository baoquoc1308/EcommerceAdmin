import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

function DropDown ({ id, component, className, children, onChange, open = false }) {
  const [isOpen, toggleIsOpen] = useState(open)
  const dropdownElement = useRef()
  const toggleDropdown = () => {
    toggleIsOpen(!isOpen)
    onChange && onChange(!isOpen)
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (!(dropdownElement && dropdownElement?.current?.contains(e.target) && e.target.closest('[data-dropdown-wrapper]'))) {
        toggleIsOpen(false)
        onChange && onChange(false)
      }
    }
    document.addEventListener('click', handleClick)
    return function cleanup () {
      document.removeEventListener('click', handleClick)
    }
  }, [onChange])

  const dropDownWrapperClass = classNames('lm--dropdown', {
    'is-open': isOpen
  }, className)
  const dropDownBodyClass = classNames('lm--dropdown-menu')
  return <div id={id} onClick={toggleDropdown} ref={dropdownElement} className={dropDownWrapperClass} data-dropdown-wrapper>
    {component}
    <ul className={dropDownBodyClass}>
      {children}
    </ul>
  </div>
}

export default DropDown
