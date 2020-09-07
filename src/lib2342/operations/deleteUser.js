
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import * as _Util from '../../lib/Util'
// import Icons from '../components/Icons'

import {  CloseModal,  } from '../../actions/common'
import { RmvUser } from '../../actions/videos'
// import {  getProducts } from '../actions/products'

import BTN_f from '../btns_confirm'








const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges);
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id});
  }


  const _rmvUser = (id,modalID, _ID) => {
    let qry = forms && forms["fileVideoSearch"] && forms["fileVideoSearch"]["search_file"]
    RmvUser({id:id},dispatch,"fileVideoSearch", qry?qry:"")
    CloseModal(dispatch,{id:modalID});
    // router.push({  pathname: '/departments',   query: { name: 'Someone' }  })
    
  }


  return { observe,  close, _rmvUser }
}

const RmvUserComponent = (props) => {  
  const {data} = props;  
  const { observe,  close,  _rmvUser } = useObserve();
  const item = data.item || {};
  let modalID = data.modalID; 
  let _ID = data.dID; 
  // let Rdxuse = useObserve();
  let _name = item && item['username']
                      
  return (
    <>
      <div className={` A9Uzve g3VIld V639qd J9Nfi`}  {...data.modalID?{"dialog-key-id":data.modalID}:""}> 
        <div className={` oEOLpc tOrNgd R6Lfte `}>
          <span className={` x1LMef `} > {` ¿Desea eliminar el usuario `}<span  className={`_textLbl_`}>{_name}</span>{`, una vez eliminado no podra ser recuperado?`} </span>        
        </div>     
        
        <div className={` XfpsVe `}>
          <span onClick={()=>close(data.modalID)}>
            <BTN_f theme={`light_blue`} title={'Cancel'}/>
          </span>           
          <span className={`_separateBtn`} onClick={()=>_rmvUser(item.id, modalID, _ID)}>
            <BTN_f  theme={`fire_brick`} title={'Delete'}/>
          </span>
         
        </div>
      </div>      
      <style>{AddUser_styles}</style>
    </>
  )
}





export default RmvUserComponent




const AddUser_styles = `

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


._textLbl_{
  color: firebrick;
  font-weight: 700;
}

`

