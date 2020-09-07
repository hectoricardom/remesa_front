
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as _Util from '../../store/Util';


import {  CloseModal, VideoFileUpload  } from '../../actions/common'



/* import {  getProducts } from '../actions/products'

import BTN_f from '../btns_confirm'


// import Icons from '../components/Icons'


const operationType = 'departments'



*/




const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges);  
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id});
  }

 
 
 


  return { observe,  close, dispatch }
}



  const dropHandler = (props) => {  }

  const dragOverHandler = (props) => {  }


  
  


const UploadVideo = (props) => {  
  const {data} = props;  
  const { observe,  close, dispatch } = useObserve();
  const item = data.item || {};
  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;

  let uploadID = `${_state.keys[71]}_video_upload`;

  let modalID = data.modalID; 
  let Rdxuse = useObserve();
  
  if(_state.uploadProgressDone){
    close(modalID);
  }


  let pUpl = 0;

  const fileCheckInput = (e) => {
    var formName = "_uploadVideo"; 
    var UploadUrl = `/UploadVideo`;
    // const {active,_Id,label} = this.state;
  
    var input = e.target;
   
    let filess = Array.from(input.files);
    filess.map(fl=>{
      if(fl.type==="video/mp4" || fl.type==="video/x-matroska"){
        VideoFileUpload(UploadUrl, [], fl, formName );
      }
    })
    close(modalID)
  } 




  return (
    <>
     <div style={{"--progress_upload":pUpl+'%'}} className={` A9Uzve g3VIld V639qd J9Nfi`} {...data.modalID?{"dialog-key-id":data.modalID}:""}> 
        <div className={` oEOLpc tOrNgd R6Lfte `}>
        <span className={` x1LMef `} > {`Upload Video`} </span>  
          <div className={`fieldPadding`}>      
            <div  className={` _upload_video_  `}  onDrop={(e)=>dropHandler(e)} onDragOver={(e)=>dragOverHandler(e)}>    
              <input type={`file`} 
                style={{opacity:`0`,height:`100%`,width:`100%`}} 
                id={uploadID} 
                onChange={(e)=>fileCheckInput(e, dispatch)}  
                // accept="video/*" 
                multiple={true}
                //upload-type-label={`${uploadID}`}
              />   
              <span >upload {pUpl?pUpl+"%":""}</span>
              <div className={`_upload_video_progress`} />

            </div> 
          </div>
        </div>
     </div>
      <style>
        {xStl}
      </style>
    </>
  )
}





export default UploadVideo




const xStl = `


._dsplFlx{
  display:flex;
}

.flexSpace{
  flex-basis: 0.000000001px;
  flex: 1 1;
}



._upload_video_{
  padding: 0;
  position: relative;
  border: 1px dashed  #7d7d7d;
  border-radius: 13px;
  width: 95%;
  margin: 0 2%;  
  overflow: hidden;
}

.upload__Link{
  opacity: 0;
  -webkit-transition: opacity .16s ease;
  /*, fade-in .6s ease-out forwards, enter-text .6s forwards;*/
  transition: opacity .16s ease;
  transition-delay: 0s; 
  max-height: 0px;
  padding: 0;
}


._upload_video_ input{
  opacity: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 35;
  top: 0;
  left: 0;
}


._upload_video_progress_2{ 
  z-index: 420;
  transition: opacity 150ms linear;
  width: 100%;
  height: 40%; 
  opacity: 1;
  position: absolute;
  background-color: var(--mdc-theme-primary-color,#1a73e8);
}



._upload_video_progress22::before
{
  transition: opacity 15ms linear,background-color 15ms linear;
  z-index: 420;
  transition: opacity 150ms linear;
  top: calc(50% - 100%);
  left: calc(50% - 100%);
  width: 200%;
  height: 200%;
}


._upload_video_progress::before
{ 
  background-color:  var(--mdc-theme-primary-color,#1a73e8);
  content:"";
  position: absolute;
  opacity: 0.05;
  opacity: var(--mdc-theme-init-opacity,0.05);
  pointer-events: none;
  width: 100%;
  height: var(--progress_upload);
  bottom: 0;
}

._upload_video_ svg{
  fill:  #7d7d7d;
}



._upload_video_ span{
  font-family: Dosis,sans-serif;
  font: 500 15px/19px "Roboto","Arial","Open Sans",sans-serif;
  color:  #7d7d7d;
  left: 50%;
  width: 100px;
  position: absolute;
  margin-left: -50px;
  text-align: center;
  z-index: 25;
}



.A9Uzve ._upload_video_ {
  padding: 152px 0;
}



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
  font: 600 1rem/1.5rem Roboto,Arial,sans-serif;
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

