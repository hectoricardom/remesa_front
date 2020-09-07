

import React, { useState, useEffect } from 'react';

const handleChange = (props,active,setActive) => {
  if(!props.disabled){
    if(typeof props.updChange === 'function') {      
      props.updChange(!active)
    }  
    setActive(!active);  
  }
}


const CheckBoxSlide = (props) => {
  const [active, setActive] = useState(false);
  const [initialize, setInitialize] = useState(false);

  useEffect(() => {
    if(!initialize){
      // setTimeout(()=>{  },1);
      setActive(props.initvalue)  
      setInitialize(true);
    }
  });
  return (
    <>
      <div className={`toggle-container ptoggle-button ${active?'_active':''}`} onClick={()=>handleChange(props, active, setActive)} >
        <div  className="toggle-bar ptoggle-button"></div>
        <div className="toggle-button ptoggle-button" >
          <div  className="pripple" style={{opacity: 0.00448}}></div>
          <div className="pripple"></div>
        </div>
        <div className="toggle-label ptoggle-button"></div>      
      </div>
      <style>
        {_style_}
      </style>
    </>

  )
}

export default CheckBoxSlide



const _style_ = `

.toggle-container.ptoggle-button {
  display: inline-block;
  position: relative;
  width: 36px;
  height: 14px;
  margin: 4px 1px;
  cursor: pointer;
}

.toggle-label.ptoggle-button {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  pointer-events: none;
  color: navy;
}


.toggle-bar.ptoggle-button {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  pointer-events: none;
  opacity: 0.4;
  transition: background-color linear .08s;
  background-color:  #000000;
  
}

.toggle-button.ptoggle-button {
  -webkit-transform: translate(0px, 0);
  transform: translate(0px, 0);
  background-color: var(--checkBox--button--color,#1a73e8);
}

.toggle-button.ptoggle-button {
  position: absolute;
  top: -3px;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.6);
  transition: -webkit-transform linear .08s, background-color linear .08s;
  transition: transform linear .08s, background-color linear .08s;
  will-change: transform;
  background-color: #fafafa;
}

.toggle-container._active .toggle-button.ptoggle-button {
  -webkit-transform: translate(16px, 0);
  transform: translate(16px, 0);
  background-color:var(--checkBox--button--Active--color,#1a73e8);
}


.toggle-container._active .toggle-bar.ptoggle-button {
  opacity: 0.5;
  background-color: var(--checkBox--button--Active--color,#1a73e8);
}



/*
--checkBox--button--color
--checkBox--button--Active--color
*/
`