
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import * as _Util from '../../store/Util'

import {  CloseModal,  } from '../../actions/common'
import { AddSeason, getVideosById } from '../../actions/videos'

import BTN_f from '../btns_confirm'

import InputText from '../InputText'





const formName = "newSeason";





const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges);
  const forms=  useSelector(state => state.forms); 
  const dispatch = useDispatch()


  const close = (Id) => {
    CloseModal(dispatch,{id:Id});
  }
  
  const clearForms= (form,v) => {
    if(!v){
      v={};
    }
    let _forms = forms;
    if(!_forms[form]){
      _forms[form] = {};
    }
    _forms[form] = v;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })   
  }

 
  const _addSeason = (doc,modalID) => {
    AddSeason(doc);
    getVideosById(doc["parent"], dispatch);
    CloseModal(dispatch,{id:modalID});    
    clearForms(formName)
  }

 

  
  return { observe, forms, close , _addSeason}
}








const handleValidate = (e, setValid, forms, field ) => {  
  let fld2Prs = ['name','shortName','year','number'] ;
  let addValidate = {
    name: {required:true,minLength:3,maxLength:50},
    shortName: {required:true,minLength:3,maxLength:10},
    number:{required:true, number:true, minValue:1, maxValue:50},
    year:{required:true, number:true, minValue:1900, maxValue:2500}
  }
  let _2Fs = forms[formName] || {};
  _2Fs[field] = e;
  let _2s = {};
  _2Fs && fld2Prs.map(fld=>{
    _2s[fld] = _2Fs[fld];
  })    
  var _Valid = _Util.validations(addValidate,_2s);  
  if(_Valid.valid){
    setValid(true)
  }else{
    setValid(false)
  }

}





const handleSave = (_addSeason, forms, modalID,parentID ) => {  
  let fld2Prs = ['name','shortName','year','number',"parent"] ;
  let addValidate = {
    parent: {required:true,minLength:3,maxLength:50},
    name: {required:true,minLength:3,maxLength:50},
    shortName: {required:true,minLength:3,maxLength:10},
    number:{required:true, number:true, minValue:1, maxValue:50},
    year:{required:true, number:true, minValue:1900, maxValue:2500}
  }

  let _2Fs = forms[formName] || {};
  _2Fs["parent"] = parentID;
  let _2s = {};
  _2Fs && fld2Prs.map(fld=>{
    _2s[fld] = _2Fs[fld];
  })  

  
  var _Valid = _Util.validations(addValidate,_2s); 
  if(_Valid.valid){
    _addSeason(_2s,modalID)
  }

}












const AddSeasonComponent = (props) => {  

  const {data} = props;  
  const { observe,  close, forms, _addSeason } = useObserve();
  const item = data.item || {};
  let modalID = data.modalID; 
  let Rdxuse = useObserve();

  const [valid, setValid] = useState(null);
  return (
    <>
    <div className={` A9Uzve g3VIld V639qd J9Nfi`}  {...data.modalID?{"dialog-key-id":data.modalID}:""}> 
      <div className={` oEOLpc tOrNgd R6Lfte `}>
        <span className={` x1LMef `} > {`Crear Temporada `} </span>
      </div>  
      <div className={` _frmWrp `}>
        <div className={`_Inp `}>
          <InputText
            form={formName} 
            field={`name`}                  
            placeholder={'Nombre'}
            validations={{required:true,minLength:3,maxLength:50}} 
            OnChange={(e)=>handleValidate(e, setValid, forms,  `name` ) } 
          />
        </div>
        <div className={`_Inp `}>
          <InputText
            form={formName} 
            field={`shortName`}                  
            placeholder={'Nombre Corto'}
            validations={{required:true,minLength:3,maxLength:50}} 
            OnChange={(e)=>handleValidate(e, setValid, forms,  `shortName` ) } 
          />
        </div>
        <div className={`_Inp `}>
          <InputText
            form={formName} 
            field={`year`}                  
            placeholder={'Año'}
            validations={{required:true, number:true, minValue:1900, maxValue:2500}} 
            OnChange={(e)=>handleValidate(e, setValid, forms,  `year` ) } 
          />
        </div>
        <div className={`_Inp `}>
          <InputText
            form={formName} 
            field={`number`}                  
            placeholder={'Numero'}
            validations={{required:true, number:true, minValue:1, maxValue:50}} 
            OnChange={(e)=>handleValidate(e, setValid, forms,  `number` ) } 
          />
        </div>
      </div>
      <div className={`2_bdy_Wrp`}>        
      </div>

      <div className={` XfpsVe `}>
        <span onClick={()=>close(data.modalID)}>
          <BTN_f theme={`light_blue`} title={'Cancelar'}/>
        </span>      
        {valid && 
        <span className={`_separateBtn`} onClick={()=>handleSave(_addSeason, forms, data.modalID, item["id"])}>
          <BTN_f  theme={`blue_white`} title={'Salvar'}/>
        </span>
        }
      </div>
    </div>      
    <style>{AddDepartments_styles}</style>
  </>
  )
}





export default AddSeasonComponent




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


._frmWrp{
  width: 80%;
  margin: 15px auto;
}

._frmWrp ._Inp{
  margin: 15px 0;
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

