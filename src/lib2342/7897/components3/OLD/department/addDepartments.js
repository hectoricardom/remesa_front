
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'


import * as _Util from '../../lib/Util'
// import Icons from '../components/Icons'

import {  CloseModal,  } from '../../actions/common'
import { AddDepartments, UpdDepartments } from '../../actions/departments'
// import {  getProducts } from '../actions/products'

import InputText from '../InputText'

import BTN_f from '../btns_confirm'





const operationType = 'departments'






var formName = "department";
let _2validateDepartmetn = {
  name:{required:true,minLength:3}, 
  store:{required:true,minLength:3} 
}

let fld2Prs = [
  'id',
  'name',  
  'description',  
  'store'
]


const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges);
  const dialog=  useSelector(state => state.listDialog);  
  const forms =  useSelector(state => state.forms); 
  let _state =  useSelector(state => state);
  let list = dialog;
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id, list:list});
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


 

  const _updDepartments = (doc,operation,dID) => {     
    UpdDepartments(doc, dispatch, _state, operation,dID);
  }

  const _addDepartments = (doc,operation,dID) => {
    AddDepartments(doc, dispatch, _state, operation,dID);
  }


  return { observe, list, forms, clearForms, close, _updDepartments, _addDepartments }
}


const handlerInputValue = (forms,setValidForm) => {


}



const validate = (forms,setValidForm) => {
  var _2Fs = forms[formName]?forms[formName]:null;

 

  let _2s = {};
  _2Fs && fld2Prs.map(fld=>{
    _2s[fld] = _2Fs[fld];
  })    
  
  var _Valid = _Util.validations(_2validateDepartmetn,_2s);    
  
   
  if(_Valid.valid){
    setValidForm(true)
  }else{
    setValidForm(false)
  }
}



const handlerSaveForm = (FuseObserve, props, router) => {
  const {  close, forms, clearForms, _addDepartments, _updDepartments } = FuseObserve;
  const {data} = props; 
  let modalID = data.modalID;
  let dID = data.dID;
  var _2Fs = forms[formName]?forms[formName]:null;
  
  let _2s = {};
  _2Fs && fld2Prs.map(fld=>{
    _2s[fld] = _2Fs[fld];
  })  
  var _Valid = _Util.validations(_2validateDepartmetn,_2s);
  
  if(_Valid.valid){
    if(_2s.id){
      _updDepartments(_2s,operationType,dID);
      clearForms(formName);
      
      //forms[formName]={};   var scroll = scrollPosition;window.scrollTo(0,scroll);
    }else{
      _addDepartments(_2s,operationType,dID);
      clearForms(formName);
      router.push('/departments');
    }
    //this.setState({editingSection:'list'});  
    close(modalID);  
    
  }
 
}

 // <InputTextArea 


const AddDepartmentsComponent = (props) => {  
  const {data} = props;  
  const { observe, forms, clearForms, close, _addDepartments, _updDepartments } = useObserve();
 
  let actions = {};
  let Rdxuse = useObserve();

  const router = useRouter()
 
  const [validForm, setValidForm] = useState(false);
  const [initialize, setInitialize] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  
  useEffect(() => {
    if(!initialize){
      setInitialize(true);  
      if(data.items && data.items.id){
        setIsEdit(true);
        let _2s = {};
        let _2Fs = data.items;
        _2Fs && fld2Prs.map(fld=>{
          if(_2Fs[fld]){
            _2s[fld] = _2Fs[fld];
          }
        })
        clearForms(formName,_2s);
        validate(forms,setValidForm);
      }
    }
  });


  
  return (
    < >
      <div className={` A9Uzve g3VIld V639qd J9Nfi`} {...data.modalID?{"dialog-key-id":data.modalID}:""}> 
        <div className={` oEOLpc tOrNgd R6Lfte `}>
          <span className={` x1LMef `} > {data.title} </span>  
          <div className={`fieldPadding`}>      
            <InputText 
              icon={`textFormat`} 
              form={formName} 
              field={`name`}  
              index={1}  
              validations={{required:true,minLength:3,maxLength:50}} 
              placeholder={_Util.translatetext(32)} 
              OnChange={(e)=>validate(forms,setValidForm)}
              initvalue={isEdit?data.items[`name`]:''}
            />
          </div>  
          <div className={`fieldPadding`}>
            <InputText 
              icon={`textFormat`} 
              form={formName} 
              field={`store`}
              index={2}  
              validations={{required:true,minLength:3,maxLength:50}} 
              placeholder={_Util.translatetext(75)}
              OnChange={(e)=>validate(forms,setValidForm)}  
              initvalue={isEdit?data.items[`store`]:''}
            />
          </div>
          <div className={`fieldPadding`}>           
            <InputText
              _rw={4} icon={`more_vert`} 
              form={formName} 
              index={3} 
              field={`description`} 
              placeholder={_Util.translatetext(19)} 
              OnChange={(e)=>validate(forms,setValidForm)}
              initvalue={isEdit?data.items[`description`]:''}
              charLimit={130}
            />
          </div>
        </div>     
        
        <div className={` XfpsVe `}>
          <span onClick={()=>close(data.modalID)}>
            <BTN_f theme={`light_blue`} index={4}  title={'Cancel'}/>
          </span>      

          <span className={`_separateBtn`} onClick={()=>handlerSaveForm(Rdxuse, props, router)}>
            <BTN_f   index={5} theme={validForm?`blue_white`:'disabled'} title={'Save'}/>
          </span>
        </div>
      </div>      
      <style>{AddDepartments_styles}</style>
    </>
  )
}





export default AddDepartmentsComponent




const AddDepartments_styles = `

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

