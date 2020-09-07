
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import * as _Util from '../../lib/Util';
// import Icons from '../components/Icons'

import {  CloseModal,  } from '../../actions/common';
import { AddLocations, UpdLocations} from '../../actions/locations';
import { getDepartmentsByName } from '../../actions/departments';

// import {  getProducts } from '../actions/products'

import InputText from '../InputText';

import BTN_f from '../btns_confirm';

// import InputAutocomplete from '../InputAutocomplete'



const operationType = 'locations';






var formName = "location";


let _2validateDepartmetn = {
  name:{required:true,minLength:3}, 
  area:{required:true,minLength:3},
  department:{required:true}, 
}


let fld2Prs = [
  'id',
  'name',  
  'department',  
  'area'
]

const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges);
  const dialog=  useSelector(state => state.listDialog);  
  const forms =  useSelector(state => state.forms); 
  let _state =  useSelector(state => state);
  let departmentsByName =  useSelector(state => state.departmentsByName);
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


  const _updLocations = (doc,operation,dID) => {     
    UpdLocations(doc, dispatch, _state, operation, dID);
  }

  const _addLocations = (doc,operation,dID) => {
    AddLocations(doc, dispatch, _state, operation, dID);
  }

  
  const _getDepartmentsByName = (doc,operation) => {
    getDepartmentsByName(doc, dispatch, _state, operation);
  }

  return { 
    observe, list, forms, departmentsByName,
    clearForms, close, _updLocations,
    _addLocations, _getDepartmentsByName    
  }
}


const handlerInputAutoValue = (e, forms,setValidForm) => {
 //  console.log(e, forms,setValidForm)

}



const validate = (forms, setValidForm) => {
  
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



const handlerSaveForm = (FuseObserve, props) => {
  const {  close, forms, clearForms, _addLocations, _updLocations } = FuseObserve;
  const {data} = props; 
  let modalID = data.modalID;
  let dID = data.dID;
  var _2Fs = forms[formName]?forms[formName]:null;
 
  let _2s = {};
  _2Fs && fld2Prs.map(fld=>{
    if(_2Fs[fld]){
      _2s[fld] = _2Fs[fld];
    }
  })  
  if(!_2s['department'] && data.departmentID){
    _2s['department'] = data.departmentID;
    // clearForms
  }
  var _Valid = _Util.validations(_2validateDepartmetn,_2s);
  if(_Valid.valid){
    
    if(_2s.id){
      _updLocations(_2s,operationType, dID );

      clearForms(formName);
      // var scroll = scrollPosition;window.scrollTo(0,scroll);
    }else{
      _addLocations(_2s, operationType, dID );
      clearForms(formName);
    }
  
    close(modalID);  
  }
 
}




const hadleGroupSearch = (v,getDepartmentsByName) => {
  setTimeout(()=>{
    getDepartmentsByName(v);
  },20);
}

const AddLocationsComponent = (props) => {  
  const {data} = props;  
  const [initialize, setInitialize] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { 
      clearForms,
      // observe, departmentsByName ,    _addLocations, _updLocations,
     forms, close,     
    _getDepartmentsByName
    
  } = useObserve();  
  
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
        clearForms(formName,_2s)
      }
    }
  });


  
  let Rdxuse = useObserve();
 
  
  const [validForm, setValidForm] = useState(false);
  //var filtered_departments = parseDeparments(departmentsByName);
  // console.log('AddLocationsComponent', filtered_departments);
  // console.log(isEdit,data.items);
  return (
    <>
      <div className={` A9Uzve g3VIld V639qd J9Nfi`}  {...data.modalID?{"dialog-key-id":data.modalID}:""}> 
        <div className={` oEOLpc tOrNgd R6Lfte `}>
          <span className={` x1LMef `} > {`${data.title} on `} </span> 
          <div>
            <span className={` x1LMef uppCs`} > {`${data.departmentName}`} </span> 
          </div>
          <div className={`fieldPadding`}>      
            <InputText 
              icon={`textFormat`} 
              form={formName} 
              field={`name`}  
              validations={{required:true,minLength:3,maxLength:50}} 
              placeholder={_Util.translatetext(32)} 
              OnChange={(e)=>validate(forms, setValidForm)}
              initvalue={isEdit?data.items[`name`]:''}
            />
          </div>  
          <div className={`fieldPadding`}>
            <InputText 
              icon={`textFormat`} 
              form={formName} 
              field={`area`}  
              validations={{required:true,minLength:3,maxLength:50}} 
              placeholder={_Util.translatetext(306)}
              OnChange={(e)=>validate(forms, setValidForm)}              
              initvalue={isEdit?data.items[`area`]:''}  
            />
          </div>
        </div>     
        
        <div className={` XfpsVe `}>
          <span onClick={()=>close(data.modalID)}>
            <BTN_f theme={`light_blue`} title={'Cancel'}/>
          </span>      

          <span className={`_separateBtn`} onClick={()=>handlerSaveForm(Rdxuse, props)}>
            <BTN_f  theme={`blue_white`} title={'Save'}/>
          </span>
        </div>
      </div>      
      <style>{AddLocations_styles}</style>
    </>
  )
}





export default AddLocationsComponent



function parseDeparments(a) {
  let r = [];
  a && _Util.ObjectKeys(a).map(dptId=>{
    let dpt = a[dptId];
    if(dpt.sections){
      dpt.sections.map(st=>{
        if(st.type==="inventory"){
          let obj2Save = {id:st.id,name:`${dpt.name} - ${st.name.toString().toUpperCase()}`}
          r.push(obj2Save);
        }
      })
    }
  })
  return r;
}





/*
 {false && <div className={`fieldPadding`}>           
            <InputAutocomplete
              icon={`more_vert`} 
              form={formName} 
              field={`department`}
              data={filtered_departments} 
              placeholder={_Util.translatetext(303)} 
              OnChange={(e)=>hadleGroupSearch(e,_getDepartmentsByName)}
              OnSelect ={(e)=>handlerInputAutoValue(e, forms, setValidForm)}
            />
          </div> 
          }


<div className={`fieldPadding`}>           
            <InputText
              _rw={4} icon={`more_vert`} 
              form={formName} 
              field={`description`} 
              placeholder={_Util.translatetext(19)} 
              OnChange={(e)=>validate(forms, setValidForm)}
              charLimit={130}
            />
          </div>

*/


const AddLocations_styles = `

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




.x1LMef.uppCs{
  text-transform: uppercase;
  color: #1a73e8;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .96rem;
  font-weight: 700;
  letter-spacing: .0107142857em;
}






`

