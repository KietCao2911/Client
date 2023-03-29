import React from 'react'
import NotFoundImage from "~/assets/NotFound.png"
const NotFound = () => {
  return (
    <div className='NotFound'>
        <img style={{objectFit:"contain"}} src={NotFoundImage} alt="" />
    </div>
  )
}

export default NotFound