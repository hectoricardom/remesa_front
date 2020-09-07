
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'

import * as _Util from '../../lib/Util';
// import Icons from '../components/Icons'

import {  CloseModal,  } from '../../actions/common';
import { AddLocations, UpdLocations} from '../../actions/locations';
import { getDepartmentsByName } from '../../actions/departments';

import { AddStockTakings } from '../../actions/stocks';

// import {  getProducts } from '../actions/products'

import InputText from '../InputText';

import BTN_f from '../btns_confirm';

import InputAutocomplete from '../InputAutocomplete'



const operationType = 'locations';






var formName = "transfer_location";


let _2validateLct = {
  locationID:{required:true,minLength:3}, 
  departmentID:{required:true,minLength:3},
  qty:{required:true, number:true }, 
}


let fld2Prs = [
  'id',
  'locationID',  
  'departmentID',  
  'qty'
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

  const _AddStockTakings = (doc,operation,dID) => {
    AddStockTakings(doc, dispatch, _state, operation, dID);
  }

  

  return { 
    observe, list, forms, departmentsByName,
    clearForms, close, _updLocations,
    _addLocations, _getDepartmentsByName, _AddStockTakings    
  }
}





const validate = (forms, setValidForm , qtyVldt) => {
  
  var _2Fs = forms[formName]?forms[formName]:null;



  let _2s = {};
  _2Fs && fld2Prs.map(fld=>{
    _2s[fld] = _2Fs[fld];
  })      
  let _2validate = _2validateLct;
  if(qtyVldt){
    _2validate['qty'] = qtyVldt;
  }
  
  var _Valid = _Util.validations(_2validate,_2s);
  if(_Valid.valid){
    setValidForm(true)
  }else{
    setValidForm(false)
  }
}



const handlerSaveForm = (FuseObserve, props) => {
  const {  close, forms, clearForms, _addLocations, _AddStockTakings } = FuseObserve;
  const {data} = props; 
  let modalID = data.modalID;
  let dID = data.dID;
  var _2Fs = forms[formName]?forms[formName]:null;
 
  let _save = {};
  let _2save = _2Fs;

  _save['departmentID'] = data.fromlocation.department;
  _save['locationID'] = data.fromlocation.id;
  _save['productID'] = data.product.id;
  _save['price'] = data.product.price;
  _save['to'] = _2Fs && _2Fs['departmentID'];
  _save['qty'] = _2Fs && _2Fs['qty'] * -1;


  
  _2save['productID'] = data.product.id;
  _2save['price'] = data.product.price;
  _2save['from'] = data.fromlocation.department;
  _2save['qty'] = _2Fs && _2Fs['qty'] * 1;


 
  _AddStockTakings(_save);
  setTimeout(()=>{
    _AddStockTakings(_2save);
        close(modalID);  
        clearForms(formName);
  },300)


  
 
}




const handleGroupSearch = (v,getDepartmentsByName,forms, setValidForm) => {
  validate(forms, setValidForm)
  setTimeout(()=>{
    getDepartmentsByName(v);
  },20);
}



const handleLocationSearch = (v, locationsList,setLocationsListFiltered ) => {

}


const handlerInputAutoLValue = (v,forms, setValidForm) => {
  validate(forms, setValidForm)
}



const handlerInputAutoValue = (ss, setLocationsList,setLocationsListFiltered) => {
  setLocationsList(ss);
  setLocationsListFiltered(ss.locations);
 }



 const handlerAddLocations = (router , id, close, Mid,clearForms) => {
  close(Mid);
  clearForms(formName);
  router.push('/department/[id]', `/department/${id}`);
  /*
  router.push({
    pathname: '/department/[id]',
    query: { id: id, name: 'tbf86t'}
  })
  */
 }






const MoveBtwLocationComponent = (props) => {  
  const {data} = props;  
  const [initialize, setInitialize] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter()
  const { 
      clearForms,
      // observe, departmentsByName ,    _addLocations, _updLocations,
      departmentsByName,
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

  const [ locationsList, setLocationsList] = useState(false);
  const [ locationsListFiltered, setLocationsListFiltered] = useState(false);
  
  var initValue = forms[formName] && forms[formName]['departmentID']?forms[formName]['departmentID']:''; 
  // let parentID = data && data.fromlocation && data.fromlocation.departmentDetail && data.fromlocation.departmentDetail.departmentParentDetail && data.fromlocation.departmentDetail.departmentParentDetail['id'] ; 
  let parentID = locationsList && locationsList.parent && locationsList.parent.id;
  var filtered_departments = {};
  filtered_departments = parseDeparments(departmentsByName,data.fromlocation.department );
  // console.log('AddLocationsComponent', filtered_departments);
  if(data.fromlocation && filtered_departments[data.fromlocation.department]){

    // console.log('AddLocationsComponent', data.fromlocation);
  }
  let hasLocation = locationsListFiltered && locationsListFiltered.length>0?true:false;
  
  return (
    <>
      <div className={` A9Uzve g3VIld V639qd J9Nfi`}  {...data.modalID?{"dialog-key-id":data.modalID}:""}> 
        <div className={` oEOLpc tOrNgd R6Lfte `}>
          <span className={` x1LMef `} > {`Transfer product`} </span> 
          <div>
            <span className={` x1LMefPrdt uppCs`} > {`${data.product && data.product['name']?data.product['name']:''}`} </span> 
          </div>
          <span className={` x1LMef `} > {`from`} </span> 
          <div>
            <span className={` x1LMef uppCs`} > {`${data.fromlocation && data.fromlocation['name']?data.fromlocation['name']:''}`} </span> 
          </div>
          
          <div className={`fieldPadding`}>           
            <InputAutocomplete
              icon={`more_vert`} 
              form={formName} 
              field={`departmentID`}
              data={filtered_departments} 
              placeholder={_Util.translatetext(303)} 
              OnChange={(e)=>handleGroupSearch(e,_getDepartmentsByName,forms, setValidForm)}
              OnSelect ={(e)=>handlerInputAutoValue(e, setLocationsList, setLocationsListFiltered)}
            />
          </div>


          {initValue &&  hasLocation && 
            <div className={`fieldPadding`}>           
              <InputAutocomplete
                icon={`more_vert`} 
                form={formName} 
                field={`locationID`}
                data={locationsListFiltered} 
                placeholder={_Util.translatetext(311)} 
                OnChange={(e)=>handleLocationSearch(e,locationsList,setLocationsListFiltered)}
                OnSelect ={(e)=>handlerInputAutoLValue(e, forms, setValidForm,{required: true, number: true, minValue:1, maxValue: data.product['qty']} )}
              />
            </div>

          }


          {initValue && !hasLocation && 
          
            <div>
              
              <span className={`_separateBtn`} onClick={()=>handlerAddLocations(router,parentID, close, data.modalID, clearForms )}>
                <BTN_f  theme={`fire_brick`} title={'No location defined'}/>
              </span>
            </div>
          }

          <div className={`fieldPadding`}>      
            <InputText 
              icon={`textFormat`} 
              form={formName} 
              field={`qty`}  
              validations={{required: true, number: true, minValue:1, maxValue: data.product['qty']}} 
              placeholder={_Util.translatetext(316)} 
              OnChange={(e)=>validate(forms, setValidForm, {required: true, number: true, minValue:1, maxValue: data.product['qty']} )}
              initvalue={isEdit?data.items[`qty`]:''}
            />
          </div>  
        </div> 
        

        <div className={` XfpsVe `}>
          <span onClick={()=>close(data.modalID)}>
            <BTN_f theme={`light_blue`} title={'Cancel'}/>
          </span>      
          {validForm && 
          <span className={`_separateBtn`} onClick={()=>handlerSaveForm(Rdxuse, props)}>
            <BTN_f  theme={`blue_white`} title={'Save'}/>
          </span>
          }
        </div>
      </div>      
      <style>{AddLocations_styles}</style>
    </>
  )
}





export default MoveBtwLocationComponent



function parseDeparments(a, deptID) {
  let r = [];
  a && _Util.ObjectKeys(a).map(dptId=>{
    let dpt = a[dptId];
    if(dpt.sections){
      dpt.sections.map(st=>{
        if(st.id!==deptID && st.type==="inventory" ){
         
          let obj2Save = {id:st.id,name:`${dpt.name} - ${st.name.toString().toUpperCase()}`,locations:st.locations, parent:dpt}
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


.x1LMefPrdt.uppCs{
  text-transform: uppercase;
  color: #1a73e8;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .66rem;
  font-weight: 700;
  letter-spacing: .0107142857em;
}





`

