
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import * as _Util from '../../store/Util';

import {  CloseModal,  } from '../../actions/common'
import { updVideoFile } from '../../actions/videos'
// import {  getProducts } from '../actions/products'

import BTN_f from '../btns_confirm'

import CheckBox from '../CheckBoxSlide'





const operationType = 'departments'








const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges);
 
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id});
  }

  const _updVideoFile = (doc) => {
    updVideoFile(doc);
  }





  return { observe,  close , _updVideoFile}
}

const OnChangeCheckBox = (q, bw, id, _updVideoFile) => {
  let nw = {id:id,quality:bw, action:q?'add':'remove'};
  _updVideoFile(nw);
}


const OnChangeisAllowResize = (q, id, _updVideoFile) => {
  let nw = {id:id,isAllowResize:q};
  _updVideoFile(nw);
}

const OnChangeisprogressThumbnail = (q, id, _updVideoFile) => {
  let nw = {id:id,progressThumbnail:q};
  _updVideoFile(nw);
}




const VideoFileOptionComponent = (props) => {  

  const {data} = props;  
  const { observe,  close, _updVideoFile } = useObserve();
  const item = data.item || {};
  let modalID = data.modalID; 
  let Rdxuse = useObserve();
  let bW = 480;
  var bwL = [1440, 1080, 720, 480, 360, 240, 144];    
  var s = bwL.filter(r=>r<bW);
  let bwActive = item && item.quality?quality2Object(item.quality):{};
  return (
    <>
    <div className={` A9Uzve g3VIld V639qd J9Nfi`}  {...data.modalID?{"dialog-key-id":data.modalID}:""}> 
      <div className={` oEOLpc tOrNgd R6Lfte `}>
        <span className={` x1LMef `} > {`Configuracion Video `} </span>
      </div>  

      
      <div className={`_dsplFlx _bdy_Wrp`}>
        <span className={` x1LMef `} > {` Imagen en la barra de progreso`} </span>
        <div className={`flexSpace`}/>
        <CheckBox icon={`more_vert`} field={`progressThumbnail`} updChange={(e)=>OnChangeisprogressThumbnail(e, item.id, _updVideoFile)} initvalue={item.progressThumbnail}/>   
      </div>
      <div className={`_dsplFlx _bdy_Wrp`}>
        <span className={` x1LMef `} > {`Multiples Calidades `} </span>
        <div className={`flexSpace`}/>
        <CheckBox icon={`more_vert`} field={`isAllowResize`} updChange={(e)=>OnChangeisAllowResize(e, item.id, _updVideoFile)} initvalue={item.isAllowResize}/>   
      </div>
      <div className={` _bdy_Wrp`}>
        <span className={` qultBw `} > {false && `${bW} es la calidad maxima y disponible del video`} </span>
        {
          s && s.map(bwQ=>{
              let isActive = bwActive[bwQ];
              return(
                <div className={`_dsplFlx fieldPadding `}>
                  <h5>{bwQ}</h5>
                  <div className={`flexSpace`}/>
                  <p>Activo</p>
                  <CheckBox icon={`more_vert`} field={`autoGrabber`} updChange={(e)=>OnChangeCheckBox(e, bwQ, item.id, _updVideoFile)} initvalue={isActive}/>   
                </div>
              )
          })
        }
      </div>
      <div className={` XfpsVe `}>
        <span onClick={()=>close(data.modalID)}>
          <BTN_f theme={`light_blue`} title={'Cancel'}/>
        </span>      

        <span className={`_separateBtn`} onClick={()=>close(data.modalID)}>
          <BTN_f  theme={`blue_white`} title={'Update'}/>
        </span>
      </div>
    </div>      
    <style>{AddDepartments_styles}</style>
  </>
  )
}





export default VideoFileOptionComponent




function quality2Object(d) {
  let qtObj = {} 
  d.map(q=>{
    qtObj[q] = 1;
  })
  return qtObj;
}




function checkBitRate(d) {
  d = Number(d);
  if(d>1079){
      return 1080
  }
  else if(d>719){
      return 720
  }
  else if(d>479){
      return 480
  }
  else if(d>359){
      return 360
  }
  else{
      return 240
  }
}







const AddDepartments_styles = `

._dsplFlx{
  display:flex;
}

.flexSpace{
  flex-basis: 0.000000001px;
  flex: 1 1;
}





.fieldPadding{
  padding: 7px 6px 7px;
  letter-spacing: .00625em;
  font-family: 'Google Sans',Roboto,Arial,sans-serif;  
  font-weight: 500;
}

.fieldPadding p{  
  margin: 1px 10px 1px 0;
  font-size: 0.8rem;
  line-height: 1.5rem;
  letter-spacing: .00925em;
  font-weight: 600;
  color: rgba(0,0,0,0.63);
}

.fieldPadding h5{
  margin: 1px; 
  font-size: 1rem;
  line-height: 1.5rem;
  color: rgba(0,0,0,0.43);
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


._bdy_Wrp{
  padding: 15px 12px;
}

.qultBw{ 
  color: rgba(0,0,0,0.84);
  font: 400 0.81rem/1.1rem Roboto,Arial,sans-serif;
  line-height: 16px;
}



`

