
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'



import * as _Util from '../../store/Util';
import Icons from '../Icons'

import {  CloseModal,  } from '../../actions/common'
import { UpdUser,} from '../../actions/videos'
// import {  getProducts } from '../actions/products'

import BTN_f from '../btns_confirm'

import InputText from '../InputText'
import CheckBox from '../CheckBoxSlide'


const formName = "newIP_User";





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



  const _addUserIP = (doc,modalID) => {
    UpdUser(doc, dispatch);
    CloseModal(dispatch,{id:modalID});
    clearForms(formName)
  }

  const _rmvUserIP = (doc,modalID) => {
    UpdUser(doc, dispatch);
    CloseModal(dispatch,{id:modalID});
    clearForms(formName)
  }
 
 


  return { observe, forms, close ,  _addUserIP, _rmvUserIP}
}








const handleValidate = (e, setValid, forms, field ) => {
  
  let fld2Prs = ['ips'] ;
  let addValidate = {
    ips: {required:true,minLength:8,maxLength:15,ip:true}
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





const handleSave = (func, item, forms, modalID ) => {  
  let fld2Prs = ['ips'];
  let addValidate = {
    ips: {required:true,minLength:8,maxLength:15,ip:true}
  }
  let _2Fs = forms[formName] || {};
  let _2s = {};
  _2Fs && fld2Prs.map(fld=>{
    _2s[fld] = _2Fs[fld];
  })  
  var _Valid = _Util.validations(addValidate,_2s); 
  if(_Valid.valid){
    _2s["id"] = item.id;
    func(_2s,modalID)
  }
}



const OnChangeCheckBox = (q,func, item, modalID ) => {
  let _2s = {id:item.id,active:q};
  func(_2s,modalID);
}

const OnChangeAutoPlay = (q,func, item, modalID ) => {
  let _2s = {id:item.id,autoplay:q};
  func(_2s,modalID);
}









const AddVideoComponent = (props) => {  

  const {data} = props;  
  const { observe,  close, forms,  _addUserIP, _rmvUserIP, } = useObserve();
  const item = data.items || {};
  let modalID = data.modalID; 
  let Rdxuse = useObserve();
  const [valid, setValid] = useState(null);
 
  const rmvIp = (ipID) => {      
    let _2s = {};
    _2s["id"] = item.id;
    _2s["ips"] = ipID+":-";
    _rmvUserIP(_2s,modalID)
  }


  return (
    <>
    <div className={` A9Uzve g3VIld V639qd J9Nfi`}  {...data.modalID?{"dialog-key-id":data.modalID}:""}> 
      <div className={` oEOLpc tOrNgd R6Lfte `}>
        <span className={` x1LMef `} > {`Configuracion para `}<span  className={`_textBlueLbl_ _Upp`}>{item.username}</span> </span>
      </div> 
      <div className={`_dy_mrg`}> 
        <div className={"_separator_"}/> 
      </div>
      <div className={`_dsplFlx  tOr4hY`}>
        <span className={` x1LMef `} > {`Activo`} </span>
        <div className={`flexSpace`}/>
        <CheckBox icon={`more_vert`} field={`active`} updChange={(e)=>OnChangeCheckBox(e,_addUserIP, item, data.modalID)} initvalue={item.isActive}/>   
      </div>
      <div className={`_dsplFlx  tOr4hY`}>
        <span className={` x1LMef `} > {` Auto Play`} </span>
        <div className={`flexSpace`}/>
        <CheckBox icon={`more_vert`} field={`active`} updChange={(e)=>OnChangeAutoPlay(e,_addUserIP, item, data.modalID)} initvalue={item.isAutoPlay}/>   
      </div>
     
      <div className={`_dy_mrg`}> 
        <div className={"_separator_"}/> 
      </div>   
      <div className={` oEOLpc tOr4hY R6Lfte `}>
        <span className={` x1LMef `} > {`Agregar IP Autorizados `} </span>
      </div>  
      {item && item["ips"] && item["ips"].length<4?  
        null
        :
        <div className={` errLCntx `}>
          <span className={` errLMef `} > {`Alcanzo el numero de IPs permitido `} </span>
        </div> 
        }
      <div className={` _frmWrp `}>
        {item && item["ips"] && item["ips"].length<4?  
        <div style={{position:'relative',marginTop: `1px`}} onClick={()=>{}}  className={`fieldPadding`}>
          <InputText
            form={formName} 
            field={`ips`}                  
            placeholder={'IP'}
            validations={{required:true,minLength:8,maxLength:15,ip:true}} 
            OnChange={(e)=>handleValidate(e, setValid, forms,  `ips` ) } 
          />
        </div>
        :null 
        }
        <div className={` `}>
          {item && item["ips"] && item["ips"].map(_ip=>{
            return (
              
              <div className={`_dsplFlx _ip_item`}>
                <p>
                  {_ip}
                </p>                                   
                <div className="flexSpace"/> 
                <div onClick={()=>rmvIp(_ip)}>
                  <Icons 
                    name={'outline_delete'} 
                    color={'#555'} 
                    size={24} 
                    //tooltip={'delete locations'}
                    extraClass={'delete'}
                  />            
                </div>
              </div>
            )
          })}
         
        </div>
      </div>
      <div className={` XfpsVe `}>
        <span onClick={()=>close(data.modalID)}>
          <BTN_f theme={`light_blue`} title={'Cancelar'}/>
        </span>      
        {valid && 
        <span className={`_separateBtn`} onClick={()=>handleSave(_addUserIP, item, forms, data.modalID)}>
          <BTN_f  theme={`blue_white`} title={'Salvar'}/>
        </span>
        }
      </div>
    </div>      
    <style>{AddDepartments_styles}</style>
  </>
  )
}





export default AddVideoComponent




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

.tOr4hY {
  padding: 2px 14px 8px 14px;
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


._ip_item { 
  padding: 2px 7px;
}

._ip_item p {
  font-weight: 700;
  padding: 8px 7px;
  color: var(--checkBox--button--Active--color,#1a73e8);
  margin: 2px 1px 2px;
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
  padding: 8px 16px 16px 16px;
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


._textBlueLbl_{
  font-weight: 700;
  color: var(--checkBox--button--Active--color,#1a73e8);
}


._bdy_Wrp{
  padding: 15px 12px;
}

.qultBw{ 
  color: rgba(0,0,0,0.84);
  font: 400 0.81rem/1.1rem Roboto,Arial,sans-serif;
  line-height: 16px;
}


.errLMef {
  color: firebrick;
  font: 400 13px/17px Roboto,Arial,sans-serif;
  text-align:right;
}

.errLCntx {
  text-align:right;
  margin-right: 10px;
}

._dy_mrg {
  padding: 8px 12px 8px;
}

._Upp{
  text-transform: uppercase;
  margin-left: 9px;
}

.V639qd.J9Nfi
._frmWrp {
  width: 80%;
  margin: 5px auto 15px;
}



`

