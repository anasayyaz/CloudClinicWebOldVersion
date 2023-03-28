import React, {useEffect, useState} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
  const [show, setShow] = useState(true);
  function clickHandler(){
    setShow(show ? false : true)
  }
  useEffect(()=>{
    setShow(window.innerWidth < 992 ? false : true)
  },[])
  return (
    <div className="c-app c-default-layout">
      <TheSidebar clickHandler={clickHandler} show={show}/>
      <div className="c-wrapper" style={{marginLeft:show ? "256px" : "60px", opacity: show && window.innerWidth < 992 ? 0.3 : 1}}>
        <TheHeader show={show}/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
