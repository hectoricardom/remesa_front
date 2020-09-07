
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../lib/Util'

import Icons from './Icons'
// import styles from './btns.module.css'


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const dialog=  useSelector(state => state.listDialog);
  const maskClassName=  useSelector(state => state.maskClassName); 
  let list = dialog;
  const dispatch = useDispatch()
  const close = (Id) => {
    //CloseModal(dispatch,{id:Id, list:list});
  }

  return { observeChanges, list, close, maskClassName }
}



const HandlerSetItem = (e,setFocus,setHover,setSelect,props) => {
  setSelect(e.name);
  setHover(false);
  setFocus(false);
  if (typeof props.OnSelect === 'function') { 
    props.OnSelect(e.id);       
  } 
}


const HandlerOverlayClose = (e,setFocus,setHover,btnId) => { 
  setHover(false);
  setFocus(false);
}


const HandlerOnMouseUp = (e,setFocus,setRipple,btnId) => { 
  setTimeout(()=>{
    // setFocus(false)
  },280)  

  //console.log('HandlerOnMouseUp',e.target)
}



const HandlerOnMouseDown = (e,setFocus,setRipple) => { 
  setFocus(true) 
  setRipple(true) 
  setTimeout(()=>{
    setRipple(false)
  },1200)  
  //console.log('HandlerOnMouseDown',e.target)
}

const HandlerOnMouseEnter = (e,setHover) => { 
  setTimeout(()=>{
    setHover(true)
  },20)  
  //console.log('HandlerOnMouseUp',e.target)
}

const HandlerOnMouseLeave = (e,setHover,setFocus, btnId, focus) => { 
  var toElement = e.toElement || e.relatedTarget || e.target;  
  let cnt = document.getElementById(`_${btnId}_list_`);
  if(!focus){
    if(toElement.document){
      setHover(false);
      setFocus(false);
  
    }else if(cnt && cnt.contains(toElement)){
     
    }else{
      setHover(false);
      setFocus(false);
    }
  }
  
}


const DROP_BTN = (props) => {  
  const {theme,title,index,list} = props;
  const { observeChanges, maskClassName } = useObserveChanges();
  
  const [ focus, setFocus] = useState(false);
  const [ hover, setHover] = useState(false);
  const [ ripple, setRipple] = useState(false);
  const [ select, setSelect] = useState(false);

  const [ btnId ] = useState(_Util.gen12CodeId());
  let _className = maskClassName; 
  
  let classComponent = stylesClass(maskClassName, btnId); 


  let _label = select?select:title;



  let styleRpl = {
    "--mdc-ripple-fg-size": `91px`,
    "--mdc-ripple-fg-scale": 1.82476,
    "--mdc-ripple-fg-translate-start": `69px, -25.5px`,
    "--mdc-ripple-fg-translate-end": `30.4219px, -27.5px`,
    "--mdc-ripple-fg-animations":'mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards',
    "--mdc-theme-init-opacity": theme=="blue_white"?0.6:theme=="fire_brick"?0.0:theme=="light_blue"?0:0.02,
    "--mdc-theme-hover-opacity": theme=="blue_white"?0.8:theme=="fire_brick"?0.04:theme=="light_blue"?0.04:0.04,
    "--mdc-theme-primary": theme=="blue_white"?"#1a73e8":theme=="fire_brick"?"transparent":theme=="light_blue"?"transparent":"rgba(0,0,0,0.812)",
    "--mdc-theme-primary-hover": theme=="blue_white"?"#1a73e8":theme=="fire_brick"?"firebrick":theme=="light_blue"?"#1a73e8":"rgba(0,0,0,0.812)",
    "--mdc-theme-primary-color": theme=="blue_white"?"#fff":theme=="fire_brick"?"firebrick":theme=="light_blue"?"#1a73e8":"rgba(0,0,0,0.41)",
    "--mdc-theme-primary-color-hover": theme=="blue_white"?"#fff":theme=="fire_brick"?"firebrick":theme=="light_blue"?"#174ea6":"rgba(0,0,0,0.973)",
  }   
  
  /// <RippleHRM/>
  // V2fPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-
  // focus_active ripple_in ripple_out 
// ${_className.hove r_base}  - _p91CuWOY1kwy_${btnId}_
/*
  console.log('props',props)
  console.log('hover',hover)
  console.log('focus',focus)
  console.log('ripple',ripple)
  console.log('now',(new Date()).getTime())

  */


  let _list = list
  let isData = _list && _list.length>0;
  return (
    <>      
      <style>
        {classComponent}
      </style>
      <button style={styleRpl} 
        onMouseDown={(e)=>HandlerOnMouseDown(e,setFocus,setRipple)} 
        onMouseUp={(e)=>HandlerOnMouseUp(e,setFocus,setRipple)}
        onMouseEnter={(e)=>HandlerOnMouseEnter(e,setHover,setRipple)} 
        onMouseLeave={(e)=>HandlerOnMouseLeave(e, setHover, setFocus, btnId, focus)}  
        className={` ${_className.btn_base}  ${_className[theme]} ${hover?`Rj2Mlf_${btnId}_`:""} ${focus?ripple?`lJfZMc ${_className.focus_active}`:`OmS1vf ${_className.focus_active}`:''} `} 
        tabIndex={index}
      >
        {true &&  <div className={`_p91CuWOY1kwy_${btnId}_`}></div>}
      
        <span className="_txt_ _mgLf">{_label}</span>
        <span className="_txt_">
          <Icons 
            name={'arrow_drop_down'} 
            color={'#555'} 
            size={20}
          />
        </span>
      </button>
      <div id={`_${btnId}_list_`} className={`${_className.OabDMe} ${_className.cXrdqd}2_${btnId} `}  onMouseLeave={(e)=>HandlerOnMouseLeave(e,setHover, setFocus,  btnId , focus)}   style={{"transform-origin":"146.5px center"}}>
        <div className={`_b6gX9sT3_${btnId}_`}>
        {
          focus && isData && _list.map(ss=>{       
            //let ss = data[d];
            return(
            <div className={`item_${btnId} `} onClick={(e)=>HandlerSetItem(ss, setFocus,setHover, setSelect, props)}   >
              <span>
                {ss.name}
              </span>
            </div>
            )
          })
        }
        </div>
      </div> 
      <div className={`Overlay_${btnId}`} onClick={(e)=>HandlerOverlayClose(e,setFocus,setHover )}/>

    </>
  )
}


export default DROP_BTN;




const stylesClass = (_className, btnId) => {
  let clsss =  `

  
         
  .${_className.btn_base} {
    height: 36px;
  }




  .${_className.btn_base} {
    -webkit-font-smoothing: antialiased;
    font-family: Roboto,sans-serif;
    font-size: .875rem;
    line-height: 2.25rem;
    font-weight: 500;
    letter-spacing: .0892857143em;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0 8px 0 8px;
    position: relative;
    display: -webkit-inline-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 64px;
    border: none;
    outline: none;
    line-height: inherit;
    -webkit-user-select: none;
    -webkit-appearance: none;
    overflow: visible;
    vertical-align: middle;
    border-radius: 4px;
    background-color: transparent;
}





.${_className.btn_base}
._txt_ {
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .875rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  text-transform: none;        
}



.${_className.btn_base}:not(:disabled) {
  border: 1px solid #dadce0;
  border: 1px solid var(--gm-hairlinebutton-outline-color,#dadce0);
  
}






.${_className.btn_base}:not(:disabled) ._txt_{
  color: #1a73e8;       
  color: var(--mdc-theme-primary-color,#1a73e8);     
}


.${_className.btn_base}:hover:not(:disabled) ._txt_,
.${_className.btn_base}:active:not(:disabled) ._txt_{            
  color: #174ea6;
  color: var(--mdc-theme-primary-color-hover,#174ea6);
  
}


.${_className.btn_base}.Rj2Mlf_${btnId}_ ._txt_,
.${_className.btn_base}.Rj2Mlf_${btnId}_.${_className.focus_active} ._txt_{
  color: #174ea6;
  color: var(--mdc-theme-primary-color-hover,#174ea6);
}



.${_className.btn_base}.Rj2Mlf_${btnId}_.${_className.focus_active}:not(:disabled) {
  border: 1px solid #174ea6;
  border: 1px solid var(--gm-hairlinebutton-outline-color,#174ea6);
  
}



.${_className.btn_base} ._txt_{  
  z-index: 24;          
}


.${_className.btn_base}:not(:disabled) ._txt_{
  font-weight: 600;  
}

.${_className.btn_base}:hover:not(:disabled) ._txt_,
.${_className.btn_base}:active:not(:disabled) ._txt_{ 
    font-weight:700;              
}







.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_  {
  position: absolute;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
}


.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_::before,
.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_::after {
  top: calc(50% - 100%);
  left: calc(50% - 100%);
  width: 200%;
  height: 200%;
  transition: opacity 15ms linear,background-color 15ms linear;
  z-index: 1;
}



.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_::before,
.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_::after {
  background-color: transparent;
  background-color: var(--mdc-theme-primary,transparent);
}



.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_::before,
.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_::after {
  position: absolute;
  border-radius: 50%;
  opacity: 0; 
  opacity: var(--mdc-theme-init-opacity,0);  
  pointer-events: none;
  content: "";
}



.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_::before, 
.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_::after { 
  transition: opacity 150ms linear;
  top: calc(50% - 100%);
  left: calc(50% - 100%);
  width: 200%;
  height: 200%;
}

.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_::before {
  transition: opacity 15ms linear,background-color 15ms linear;
  z-index: 1;
}





.${_className.btn_base}.VfPpkd-ksKsZd-mWPk3d ._p91CuWOY1kwy_${btnId}_::before{
  transform:scale(var(--mdc-ripple-fg-scale,1))
}

.${_className.btn_base}.VfPpkd-ksKsZd-mWPk3d ._p91CuWOY1kwy_${btnId}_::after{
  top:0;left:0;transform:scale(0);transform-origin:center center
}





.${_className.btn_base}.VfPpkd-ksKsZd-mWPk3d ._p91CuWOY1kwy_${btnId}_::after{    
  width:var(--mdc-ripple-fg-size,100%);
  height:var(--mdc-ripple-fg-size,100%)
}



.${_className.btn_base}.${_className.focus_active} ._p91CuWOY1kwy_${btnId}_::before{
  transition-duration:75ms;
  opacity:.12
}

.${_className.btn_base}:not(.VfPpkd-ksKsZd-mWPk3d) ._p91CuWOY1kwy_${btnId}_::after{
  transition:opacity 150ms linear
}




.${_className.btn_base}.VfPpkd-ksKsZd-mWPk3d{
  --mdc-ripple-fg-opacity:.12;
}


.${_className.btn_base} ._p91CuWOY1kwy_${btnId}_{
  position:absolute;box-sizing:content-box;width:100%;height:100%;overflow:hidden
}

.${_className.btn_base}:not(.${_className.btn_base}-OWXEXe-INsAgc) ._p91CuWOY1kwy_${btnId}_{
  top:0;left:0
}




.${_className.btn_base}.Rj2Mlf_${btnId}_ ._p91CuWOY1kwy_${btnId}_::before,
.${_className.btn_base}.Rj2Mlf_${btnId}_ ._p91CuWOY1kwy_${btnId}_::after{
  opacity: .04;
  opacity: var(--mdc-theme-hover-opacity,0.04);
}


.${_className.btn_base}.Rj2Mlf_${btnId}_ ._p91CuWOY1kwy_${btnId}_::before,
.${_className.btn_base}.Rj2Mlf_${btnId}_ ._p91CuWOY1kwy_${btnId}_::after {
  background-color: transparent;
  background-color: var(--mdc-theme-primary-hover,transparent);
}

  
.${_className.btn_base}.${_className.focus_active} ._p91CuWOY1kwy_${btnId}_::before
  {
    transition-duration:175ms;
    opacity:.24
  }


/*

.${_className.btn_base}:not(.VfPpkd-ksKsZd-mWPk3d):focus ._p91CuWOY1kwy_${btnId}_::before,
.${_className.btn_base}:not(.VfPpkd-ksKsZd-mWPk3d):active ._p91CuWOY1kwy_${btnId}_::after{

}

.${_className.btn_base}:not(.VfPpkd-ksKsZd-mWPk3d):focus ._p91CuWOY1kwy_${btnId}_::before{

}

*/

.${_className.btn_base}:not(.VfPpkd-ksKsZd-mWPk3d) ._p91CuWOY1kwy_${btnId}_::after,
.${_className.btn_base}:not(.VfPpkd-ksKsZd-mWPk3d) ._p91CuWOY1kwy_${btnId}_::after{
  transition:opacity 150ms linear
}


.${_className.btn_base}.VfPpkd-ksKsZd-mWPk3d,
.${_className.btn_base}.VfPpkd-ksKsZd-mWPk3d{
  --mdc-ripple-fg-opacity:.24
}

.${_className.btn_base}{
  height:36px
}



.${_className.btn_base}.VfPpkd-ksKsZd-mWPk3d-OWXEXe-ZNMTqd ._p91CuWOY1kwy_${btnId}_::after{
  top:var(--mdc-ripple-top,0);
  left:var(--mdc-ripple-left,0)
}

.${_className.btn_base}.lJfZMc ._p91CuWOY1kwy_${btnId}_::after{
  animation: mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}

.${_className.btn_base}.OmS1vf ._p91CuWOY1kwy_${btnId}_::after{
  animation: mdc-ripple-fg-opacity-out 150ms;
  transform: translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))
}









.${_className.btn_base}.OmS1vf ._p91CuWOY1kwy_${btnId}_::after{
  animation: mdc-ripple-fg-opacity-out 150ms;
  transform: translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))
}






@keyframes mdc-ripple-fg-radius-in{
  0%{
    animation-timing-function:cubic-bezier(0.4,0,0.2,1);
    transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)
  }
  to{
    transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))
  }
}
  
  
@keyframes mdc-ripple-fg-opacity-in{
  0%{animation-timing-function:linear;opacity:0}
  to{opacity:var(--mdc-ripple-fg-opacity,0)}
}
  
@keyframes mdc-ripple-fg-opacity-out{
  0%{animation-timing-function:linear;
    opacity:var(--mdc-ripple-fg-opacity,0)
  }
  to{opacity:0}
}




.Rj2Mlf_${btnId}_.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe:not(:disabled) {
  color: #174ea6;
  color: var(--gm-hairlinebutton-ink-color--stateful,#174ea6);
}
























.${_className.btn_base} ~ .${_className.OabDMe}{
  -webkit-font-smoothing: antialiased;
  font-size: .875rem;
  letter-spacing: .2px;
  border: none;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
  box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  line-height: 20px;
  opacity: 0;
  max-height: 600px;
  overflow: auto;
  z-index: 27;
  transition: opacity .03s linear,transform .12s cubic-bezier(0,0,0.2,1);
  box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12);
  background-color: #fff;
  background-color: var(--mdc-theme-surface,#fff);
  max-width: 0px;
  border-radius: 4px;
  position: absolute;
}


.${_className.btn_base}.${_className.focus_active} ~
.${_className.OabDMe}{
  opacity: 1;
  transition-delay: 120ms;
  margin-top: 1px;
  max-width: 200px;
  min-width: 165px;
}


._b6gX9sT3_${btnId}_ {
  -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  padding: 5px;
}


.Overlay_${btnId}{
  height: 0vh; 
  width: 0%;     
  opacity: 0;
  position: fixed;
  z-index: 20; 
  left: 0;
  bottom: 0;
  overflow-x: hidden;   
  transition: opacity ease-in-out .138s;
  transform-origin:  50% 210% 0;
}


.${_className.btn_base}.${_className.focus_active}
 ~ .Overlay_${btnId}{    
  opacity: 1;
  bottom: 0;    
  transition: opacity ease-in-out .58s;
  height: 100vh; 
  width: 100%;
}





.${_className.btn_base}.${_className.focus_active}
 ~ .${_className.OabDMe}__ttt
.q6oraf {
    box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12);
    transform-origin: left top;
    left: 0px;
    top: 36px;
    max-height: 273px;
}
.${_className.btn_base}.${_className.focus_active}
 ~ .${_className.OabDMe}__ttt{
    display: inline-block;
    transform: scale(1);
    opacity: 1;
}

.${_className.btn_base}
 ~ .${_className.OabDMe}__ttt{
    display: none;
    position: absolute;
    box-sizing: border-box;
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 32px);
    margin: 0;
    padding: 0;
    transform: scale(1);
    transform-origin: top left;
    opacity: 0;
    overflow: auto;
    will-change: transform,opacity;
    z-index: 8;
    transition: opacity .03s linear,transform .12s cubic-bezier(0,0,0.2,1);
    box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12);
    background-color: #fff;
    background-color: var(--mdc-theme-surface,#fff);
    color: #000;
    color: var(--mdc-theme-on-surface,#000);
    border-radius: 4px;
    transform-origin-left: top left;
    transform-origin-right: top right;
}






.item_${btnId}{
  padding-left: 56px;
  padding-right: 16px;
  cursor: pointer;
}


.item_${btnId} {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
  overflow: hidden;
  -webkit-user-select: none;
  height: 48px;
}


.item_${btnId}:hover {

}


.item_${btnId} span{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}




.item_${btnId}::before,
.item_${btnId}::after {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
}




.item_${btnId}:hover::before {
  opacity: .04;
  background-color: #000;
}


.item_${btnId}::before,
.item_${btnId}::after {
  top: calc(50% - 100%);
  left: calc(50% - 100%);
  width: 200%;
  height: 200%;
}

.item_${btnId}::before,
.item_${btnId}::after {
  transition: opacity 15ms linear,background-color 15ms linear;
  z-index: 1;
}


._mgLf{
  margin-left: 12px;
}


`
return clsss;
}


