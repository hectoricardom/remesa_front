import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../lib/Util'
import IconSVG from './Icons'
import {OpenModal, CloseModal} from '../actions'

import BTN_f from './btns_confirm'

import InputText from './InputText'


const useCounter = () => {
  const count = useSelector(state => state.count); 
  const dispatch = useDispatch();
  const increment = () => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'count',value:count+1}
    })
  }
  const decrement = () =>
    dispatch({
      type: 'DECREMENT',
    })
  const reset = () =>
    dispatch({
      type: 'RESET',
    })
  const openModal = () =>
    dispatch({
      type: 'RESET',
    })
  return { count, increment, decrement, reset }
}


const useModal = () => {
  const modal = useSelector(state => state.listDialog);
  const observeChanges = useSelector(state => state.observeChanges);
  const dispatch = useDispatch();
  const OpenModalHRM = () => {
    let list = {};
    let data = {};
    data['list']=modal;
    data['display']=true;
    data['zIndex']=150;
    data['height']='300px';
    data['width']='320px';   
      
    data['content'] = TEXT; 
    data['props']={title:"HRM djsagraiuy"};
    OpenModal(dispatch,data);
    
  }
  
  return { modal, OpenModalHRM }
}


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const dialog=  useSelector(state => state.listDialog);   
  let list = dialog;
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id, list:list});
  }

  return { observeChanges, list, close }
}


const Counter = () => {
  const { count, increment, decrement, reset } = useCounter()
  const { OpenModalHRM, modal } = useModal()
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
      <button onClick={OpenModalHRM}>OpenModal</button>
    

    </div>
  )
}

export default Counter




const TEXT = (props) => {  
  const {data} = props;
  const { close } = useObserveChanges();
  return (
    <>
      <div className={` A9Uzve g3VIld V639qd J9Nfi`}> 
        <div className={` oEOLpc tOrNgd R6Lfte `}>
          <span className={` x1LMef `} > {data.title} </span> 
          <div className={`fieldPadding`}>
            <InputText placeholder={`email`} form={'lksadjuhf'} field={'email'} validations={{minLength:3,maxLength:50}}/>
          </div>
          <div className={`fieldPadding`}>
            <InputText placeholder={`name`} form={'lksadjuhf'} field={'name'}  validations={{required:true,minValue:3,maxValue:99,number:true}}/>
          </div>
        </div>     
        
        <div className={` XfpsVe `}>
          <span onClick={()=>close(data.modalID)}>
            <BTN_f theme={`light_blue`} title={'cancel'}/>
          </span>          
          <span className={`_separateBtn`} onClick={()=>close(data.modalID)}>
            <BTN_f  theme={`blue_white`} title={'delete'}/>
          </span>
        </div>
      </div>      
      <style>{txt_styles}</style>
    </>
  )
}






const txt_styles = `

.fieldPadding{
  padding: 15px 6px 7px;
}

._separateBtn{
  margin-left: 16px;
}

.V639qd.J9Nfi .R6Lfte {
  letter-spacing: .00625em;
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
}


.oEOLpc .R6Lfte {
  padding-bottom: 0;
}
.tOrNgd {
  padding: 22px 24px 18px 24px;
}

.x1LMef {
  color: rgba(0,0,0,0.54);
  font: 400 1rem/1.5rem Roboto,Arial,sans-serif;
  line-height: 24px;
}



.dialogsdfa{
background-color: #fff; 
padding: 25px;
min-height:65px;  
}
.dialogsdfa p{
margin: 5px;
color: firebrick; 
}

.V639qd.J9Nfi {
border-radius: 8px;
min-width: 280px;
}






.A9Uzve {
  max-width: 100vw;
  overflow: visible;
  position: absolute;
  width: 320px;
}
.g3VIld {
  -webkit-box-align: stretch;
  box-align: stretch;
  align-items: stretch;
  display: flex;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  flex-direction: column;
  transition: transform .225s cubic-bezier(0.0,0.0,0.2,1);
  position: relative;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24);
  max-width: 24em;
  outline: 1px solid transparent;
  overflow: hidden;
}


.XfpsVe {
flex-wrap: wrap-reverse;
}

.V639qd .XfpsVe {
  padding: 24px 16px 16px 16px;
}

.XfpsVe {
  display: flex;
  flex-shrink: 0;
  box-pack: end;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding: 24px 24px 16px 24px;
}


.VfPpkd-LgbsSe .VfPpkd-Jh9lGc::before, .VfPpkd-LgbsSe .VfPpkd-Jh9lGc::after {
top: calc(50% - 100%);
left: calc(50% - 100%);
width: 200%;
height: 200%;
}

`