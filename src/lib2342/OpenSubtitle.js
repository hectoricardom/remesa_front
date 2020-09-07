
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as _Util from '../store/Util'
 import Icons from './Icons/Icons'

import {  CloseModal , UpdateModal, SrtCachingFile } from './lib/common'




const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges);
  const dialog=  useSelector(state => state.listDialog); 
  let _state =  useSelector(state => state);
  let list = dialog;
  const dispatch = useDispatch()

  const modal = useSelector(state => state.listDialog);
  const close = (Id) => {
    CloseModal(dispatch,{id:Id, list:list});
  }

  const updateModal = (Id) => {
    //UpdateModal(dispatch,{id:Id, list:list});
  }


  const _srtCachingFile = (fileBlob,label) => {    
    SrtCachingFile(fileBlob,label, dispatch,_state);
  }
  
  
  

  const updKV= (k,v) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:k,value:v}
    })  
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:"observeChanges",value:_Util.gen12CodeId()}
    })  
  }

  
  let _dispatch_ = dispatch;
  return { _state, updKV, _dispatch_ ,observe,  close, updateModal,  _srtCachingFile }
}



const readFile = (event,fileState,setFileState) => { 
  let  _fileState = fileState || {};
  const {label} =_fileState;
  _fileState['fileBlob'] = event.target.result;
  if(event.target.result && label){
    _fileState['active'] = true;   
  }else{
    _fileState['active'] = false;
  }
  setFileState(_fileState);
}


const fileCheckInput = (e,fileState,setFileState) => { 
 let  _fileState = fileState || {};
 const {label} =_fileState;
 var input = document.querySelector('input[type=file]');
 if(input && input.files && input.files[0]){
  var file = input.files[0];
  if(!label){
    var __ext_ = file.name.split('.').pop();
    var __lbl_ = file.name.split(`.${__ext_}`)[0];
    _fileState['label'] = __lbl_;
    _fileState['fileName'] = file.name;
  }else{    
    _fileState['fileName'] = file.name;
  }
  setFileState(_fileState);
  var reader = new FileReader();
  reader.addEventListener('load',(e)=> readFile(e,fileState,setFileState));
  reader.readAsText(file);
 }
}


const labelInputFocus = (e,fileState,setFileState) => { 
  let  _fileState = fileState || {};
  _fileState['focus'] = true;
  setFileState(_fileState);
}

const labelInput = (e,fileState,setFileState) => { 
  let  _fileState = fileState || {};
  const {url,fileBlob} =_fileState;  
  let file = true;
  _fileState['label'] = e.target.value;
  if(!file && urlValidate(url) && e.target.value){
    
    _fileState['active'] = true;
  }
  else if(file && fileBlob && e.target.value){   
    _fileState['active'] = true;
  }
  else{
    _fileState['active'] = false;
  }
  setFileState(_fileState);
}



const labelInput_Blur = (e,fileState,setFileState) => { 
  let  _fileState = fileState || {};
  const {url,fileBlob} =_fileState;  
  let file = true;
  _fileState['label'] = e.target.value;
  if(!file && urlValidate(url) && e.target.value){    
    _fileState['active'] = true;
  }
  else if(file && fileBlob && e.target.value){   
    _fileState['active'] = true;
  }
  _fileState['focus'] = false;  
  setFileState(_fileState);
}


const dropHandler = (active,setActive,props) => { 

}


const dragOverHandler = (active,setActive,props) => { 

}

const UrlCheckInput = (active,setActive,props) => { 

}

const onBlurUrlCheckInput = (active,setActive,props) => { 

}

const confirm = (fileState, _srtCachingFile, close, modalID) => { 
  let  _fileState = fileState || {};
  const {url, label, fileBlob} =_fileState; 
  let file = true;
  if(file){
    _srtCachingFile(fileBlob,label);
    close(modalID);
    //if (typeof this.props.confirmFile === 'function') { this.props.confirmFile(fileBlob,label);}    
  }else{
    if (typeof this.props.confirm === 'function') { this.props.confirm(url,label);}
  
  }
}

const OpenSubtitle = (props) => { 

    const {data, } = props;  
    const { observe,  close,  _srtCachingFile, updateModal  } = useObserve();   
    let modalID = data.modalID;     
    const [fileState,setFileState] = useState({});  
    const {active,_Id,fileBlob,fileName,label,url, focus} = fileState;
    var inputFileStyle ={opacity:`0`,height:`100%`,width:`100%`}
    var labelField = label || '';
    var urlField = url || '';
    let _file = true;
    let _value = !focus?{value:labelField}:{};


    return(
      <>
      <div  {...data.modalID?{"dialog-key-id":data.modalID}:""}  className={`something--wrong--Dialog _${modalID}`} >
        <div>              
          <h3 className="title"><span>Cargar Subtitulo!</span></h3>                       
        </div>
        <div className="ReportAProblemDialogContainer"> 
        <div>
          <h5 className="label--input"><span>Etiqueta.</span></h5>     
          <input type="text" 
            onChange={(e)=>labelInput(e,fileState,setFileState)} 
            onFocus={(e)=>labelInputFocus(e,fileState,setFileState)}
            onBlur={(e)=>labelInput_Blur(e,fileState,setFileState,updateModal,modalID)}
            {..._value} 
          />
        </div>
        {_file?
        <div className={`upload--Wrapper`}>
          <div className={`file_Done`}>{fileBlob?<Icons name={'done'} color={'#fff'} size={'1.6em'}/>:null}</div>
          <div className="upload--Container"  onDrop={(e)=>dropHandler(e)} onDragOver={(e)=>dragOverHandler(e) }>          
            <span>{fileBlob? fileName:'Browse or Drag n Drop files ...'}</span>
            <input type={`file`} style={inputFileStyle} id={_Id} onChange={(e)=>fileCheckInput(e,fileState,setFileState,updateModal,modalID)} accept=".vtt,.srt"/>              
          </div>
        </div>: 
        <div>
          <h5 className="label--input"><span>Type a url</span></h5>           
          <input type="text" onChange={(e)=>UrlCheckInput(e)} onBlur={(e)=>onBlurUrlCheckInput(e)}  value={urlField}/>
        </div>
        }
        <div className={`ReportAProblemDialog--message-fieldset  ${active?'visible':''}`}>              
          <button  type="submit" aria-label="Enviar informe" className="ReportAProblemDialog--submit-button" onClick={(e)=>confirm(fileState,_srtCachingFile,close,modalID)}><span>Cargar Subtitulo</span></button>
        </div>
        </div>                
      </div>
      <style>
        {AddLocations_styles}
      </style>
      <style>
            {`._${modalID}{
              --heliumPlayer__color_fire :#e50914;
              --heliumPlayer__color_fire_2 :#bf1315;
              --heliumPlayer__color_shadow: #454545;
              --heliumPlayer__color_dark_2: #2e2e2e; 
              --heliumPlayer__color_dark_9_7: #979797; 
              --heliumPlayer__color_dark_14: #141414;
              --heliumPlayer__color_light_9: #d9d9d9;
              --heliumPlayer__color_light_2: #a2a2a2;
              --heliumPlayer__color_light_4: #b4b4b4;
              --heliumPlayer__color_light_5: #d5d5d5;
              --heliumPlayer__color_light_6: #f6f6f6;
              --heliumPlayer__color_white_: #ffffff;
              --heliumPlayer__color_blck_: #000000;
            }`
            }
      </style>   
      </>
    )
  
}

 export default  OpenSubtitle;



 function urlValidate(v){
  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(v)
}
 

const AddLocations_styles = `








.something--wrong--Dialog{
  border-top: 2px solid var(--heliumPlayer__color_fire);  
  border-bottom:  1px solid var(--heliumPlayer__color_shadow); 
  border-left:  1px solid var(--heliumPlayer__color_shadow); 
  border-right:  1px solid var(--heliumPlayer__color_shadow); 
  border-bottom-left-radius: 7px; 
  border-bottom-right-radius: 7px; 
  background-color: var(--heliumPlayer__color_dark_14); 
  overflow: hidden;
    min-height: 15rem;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 60vw;
}

.something--wrong--Dialog .title{
  color: var(--heliumPlayer__color_light_9);
  font-size:  1.8em;   
  text-align: left;
  margin: 0.4em 1em;
}

.something--wrong--Dialog .title--desc{
  color: var(--heliumPlayer__color_light_4);
  font-size:  1.4em; 
  text-align: left;
  margin: 0.3em 0.7em;
}











.ReportAProblemDialogContainer{
  padding: 1.6em;
  max-width: 50vw;
  /*
  max-height: 22em;
  overflow-y: auto ;
  */
}



.ReportAProblemDialog--fieldset {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 0 0 1rem;
  text-align: left;
}

.ReportAProblemDialog--fieldset {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}

.ReportAProblemDialog--checkbox-container {
  width: 2em;
  height: 2em;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  margin: 0 1em 0 0;
}

.ReportAProblemDialog--label-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -webkit-flex: 1 0;
  -moz-box-flex: 1;
  -ms-flex: 1 0;
  flex: 1 0;
}
input[type=checkbox], input[type=radio] {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
}

.ReportAProblemDialog--checkbox-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}




.ReportAProblemDialog--checkbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  background: var(--heliumPlayer__color_blck_);
  border: 1px solid var(--heliumPlayer__color_dark_9_7);
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 1.6em;
}


.ReportAProblemDialog--checkbox-label {
  font-size: 1.2em;
  font-weight: 700;
  cursor: pointer;
}

.ReportAProblemDialog--checkbox-label-definition {
  color: var(--heliumPlayer__color_light_4);
  font-size: 0.9em;
  display: block;
  font-weight: 400;
}




.ReportAProblemDialog--message-fieldset {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  max-height: 0;
  opacity: 0;
  -webkit-transition: max-height 250ms ease-out,opacity 250ms ease-out;
  -o-transition: max-height 250ms ease-out,opacity 250ms ease-out;
  -moz-transition: max-height 250ms ease-out,opacity 250ms ease-out;
  transition: max-height 250ms ease-out,opacity 250ms ease-out;
}


.ReportAProblemDialog--details-header {
  font-weight: 400;
  padding: 0;
  margin: 2rem 0 .5rem 0;
}

.ReportAProblemDialog--textarea {
  background-color:var(--heliumPlayer__color_blck_);
  color: var(--heliumPlayer__color_white_);
  resize: none;
  border: 1px solid var(--heliumPlayer__color_dark_9_7);
  width: 50%;
}





.ReportAProblemDialog--submit-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: var(--heliumPlayer__color_white_);
  background-color: var(--heliumPlayer__color_fire); 

  border: 1px solid transparent;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  margin: 1.5rem 0 0 0;
  padding: .75rem;
}

.ReportAProblemDialog--details-question, .ReportAProblemDialog--details-question-optional {
  display: inline-block;
}

.ReportAProblemDialog--details-question-optional {
  padding-left: .5rem;
  color:  var(--heliumPlayer__color_light_4); 
}




.ReportAProblemDialog--message-fieldset.visible {
  max-height: 20rem;
  opacity: 1;
}


.ReportAProblemDialog--fieldset.visible .ReportAProblemDialog--checkbox:before {
  color: var(--heliumPlayer__color_fire); 
  content: '✔';
}

/*
.ReportAProblemDialog--checkbox-input:checked+.ReportAProblemDialog--checkbox:before
*/




.ReportAProblemDialogContainer input{
  background-color: var(--heliumPlayer__color_dark_14);
  padding: .5rem;
  color:  var(--heliumPlayer__color_light_4); 
  border: none;
  border-bottom: 1px solid  var(--heliumPlayer__color_light_4); 
  outline: none;
  min-width: 75%;
  font-size: 0.96em;
  text-align: left;

}

.ReportAProblemDialogContainer .label--input {
  color: var(--heliumPlayer__color_light_2);
  font-size: 1.1em;
  text-align: left;
  margin: 0.3em 0.7em;
}


.upload--Wrapper{
  display: flex;
  position: relative;
}

.upload--Container{
  min-height: 20px;
  margin: 0.3em 0.7em;
}

.upload--Container span{
  position: absolute;
  padding: 15px;
}

.upload--Container input{
  position: absolute;
  opacity:0;
  height:100%;
  width:100%;
  
}

.file_Done{  
  position: relative;
  min-width: 24px;
  height: 30px;
  margin: 0.99em 0.7em 0;
}

.file_Done svg{
  fill: var(--heliumPlayer__color_fire);
}



.header_subtitle{
  display: flex;
}

.header_subtitle .icons_btn{
  padding: 1.199em  0 0 0.7em;
}

.header_subtitle .syncTime_seconds{ 
  padding: 1.45em 0 0 0.7em;
  font: 300 0.95em/1.05em Roboto,sans-serif;
}





@media screen and (min-width: 1200px){
  .ReportAProblemDialog--fieldset {    
    margin: 0 0 16px;
  }
  
  .ReportAProblemDialog--checkbox-container {
    width: 28px;
    height: 28px;    
    margin: 0 16px 0 0;
  }
  
  .ReportAProblemDialog--checkbox-label {
    font-size: 22px;
  }  
  .ReportAProblemDialog--checkbox-label-definition {
    font-size: 17px;
  }
  .ReportAProblemDialog--checkbox {    
    font-size: 30.5px;
  }
  



  .something--wrong--Dialog .title{
    font-size: 32px;
  }
  .something--wrong--Dialog .title--desc{
    font-size: 16px;
  }

  .ReportAProblemDialog--details-header {    
    margin: 32px 0 .8px 0;
  }
  
  .ReportAProblemDialog--submit-button {
    
    margin: 22px 0 0 0;
    padding: 11px;
  }


}



`
