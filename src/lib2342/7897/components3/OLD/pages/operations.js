

import React, { useEffect, useState } from 'react'
import { withRedux } from './../lib/redux'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import { getDepartmentsById } from './../actions/departments'
import { OpenModal } from './../actions/common'

import * as _Util from './../lib/Util'
import Icons from './../components/Icons'
import Layout from './../components/MyLayout';

import DeleteDialogDepartments from './../components/department/deleteDialogDepartments'
import deleteDialogLocations from './../components/department/deleteDialogLocations'
import AddLocations from './../components/department/addLocations'
import AddDepartments from './../components/department/addDepartments'
import BTN_HRM from './../components/btns_confirm';



import DialogHRM from './../components/DialogHRM';
import Link from 'next/link'

import MenuSlideSide from './../components/MenuSlideSide';

const operationType = 'departments'
let _options = [
  {label: 'receiving', icon:'analytics', visible:true },
  {label: 'movements', icon:'analytics', visible:true },
  {label: 'expenses', icon:'analytics', visible:true },
  {label: 'sales', icon:'analytics', visible:true }

]

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  let _state =  useSelector(state => state);
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();
  const fetchDetails =  useSelector(state => state.fetchDetails);
  
  const modal = useSelector(state => state.listDialog);
  let details  = _state['detailDepartmentByID'];
  
  const updForms= (form,field,v) => {
    let _forms = forms;
    if(!_forms[form]){
      _forms[form] = {};
    }
    _forms[form][field] = v;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })   
  }

  const _getProducts= (operation) => {
   // getProducts(dispatch, _state, operation);
  }

  const _getDepartmentsById = (id) => {
    getDepartmentsById(id, dispatch, _state);
  }

  const OpenDeleteModalHRM = (i) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={item:i};
    data['content'] = DeleteDialogDepartments; 
    //console.log(data)
    OpenModal(dispatch,data);
  }


  const OpenDeleteLocation = (i, _ID) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={item:i, dID: _ID};
    data['content'] = deleteDialogLocations; 
    //console.log(data)
    OpenModal(dispatch,data);
  }

  const OpenAddLocation = (i, n, _ID) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={title:"Add Location", departmentID:i, departmentName:n, dID: _ID};
    data['content'] = AddLocations; 
    //console.log(data)
    OpenModal(dispatch,data);
  }


  const OpenEditLocation = (i, n, _ID,items) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={title:"Update Location", departmentID:i, departmentName:n, dID: _ID, items:items};
    data['content'] = AddLocations; 
    //console.log(data)
    OpenModal(dispatch,data);
  }



  const OpenEditDepartment = (items, _ID) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={title:"Update Department", dID: _ID, items:items};
    data['content'] = AddDepartments; 
    //console.log(data)
    OpenModal(dispatch,data);
  }


  return { 
    observeChanges, 
    details, 
    forms, 
    fetchDetails,
    updForms, 
    _getProducts, 
    _getDepartmentsById, 
    OpenDeleteLocation, 
    OpenDeleteModalHRM,
    OpenAddLocation,
    OpenEditLocation,
    OpenEditDepartment
  }
}



const handleEdit = () => {


}


const handleConfirmDelete = () => {


}

const updFiltersTab = () => {


}



const OperationComponent = (props) => {
  const { 
    fetchDetails, details, observeChanges,
    _getDepartmentsById, 
    OpenDeleteModalHRM, 
    OpenDeleteLocation, 
    OpenAddLocation,
    OpenEditLocation,
    OpenEditDepartment
  } = useObserveChanges();


  const router = useRouter()
  const [initialize, setInitialize] = useState(false);

  const [view, setView] = useState(0);

  let _ID = router.query.id;
  // console.log(router)
  useEffect(() => {
    if(!initialize){
      setInitialize(true);      
      _getDepartmentsById(_ID);
      if(!item){
        setTimeout(()=>{
          if(!item){
            //router.push('/departments')
          }
        },4000)
      }
    }
  });

  let item = details;
  
  let _name = item && item['name']?item['name']:''; 
  
  let _sections = item && item.sections?item.sections:[];

  //let options = parseOptions(_sections);
  let sc = _sections[view];
  let _stock = totalStock(_sections);

    return (
      <>
      <Layout />

      
         {fetchDetails && !item &&

            <Link href="/departments" as={`/departments`}>
            <a>{'this item is no longer exist, click and go to department'}</a>
            </Link>
         
         }
         {false && !fetchDetails && 

            <Link href="/departments" as={`/departments`}>
            <a>{'Loading .... '}</a>
            </Link>

          }


        {item && item.id && null  }
        <div className={`_dsplFlx _operationsWrp_`}>
          <MenuSlideSide options={_options} updFiltersTab={(e)=>setView(e)} />
          <div className={"locationWrp"}>
            <div  className={'_dsplFlx _mrg15 _sections _locations_dept_'}>    
                           
                            
            </div>
          </div>
        </div>
      
        <DialogHRM />  
      </>
    );
  
}  


export default withRedux(OperationComponent)





function parseOptions(_sections){
  let opt = []
  _sections.map(sc=>{   
    let h = {label:sc['name'],icon:'analytics', visible:sc['active'] }
    opt.push(h)
  })
  return opt;
}


function totalStock(_sections){
  let _stock = 0;
  _sections.map(sc=>{
    sc.locations.map(slc=>{
      _stock += slc['stockDetails'] && slc['stockDetails']['inStock']?slc['stockDetails']['inStock']:0;      
    })
  })
 return _stock;
}


const dep_style = `



._dsplFlx{
  display:flex;
}

.flexSpace{
  flex-basis: 0.000000001px;
  flex: 1 1;
}

.IconRippleEffectContainer {
  height: 24px;
  width: 24px;  
  align-items: center;
  border: none;
  display: inline-flex;
  justify-content: center;
  outline: none;
  position: relative;
  z-index: 0;
  cursor: pointer;
  list-style: none;
  margin: 5px 10px 0;
  opacity: 0.55;
  outline: none;
}



.IconRippleEffectContainer:not(.pW)::before {
  content: '';
  display: block;
  opacity: 0;
  position: absolute;
  transition-duration: .15s;
  transition-timing-function: cubic-bezier(0.4,0.0,0.2,1);
  z-index: -1;
  bottom: -10px;
  left: -10px;
  right: -10px;
  top: -10px;
  background: none;
  border-radius: 50%;
  box-sizing: border-box;
  transform: scale(0);
  transition-property: transform,opacity;
  bottom: -10px;
  left: -10px;
  right: -10px;
  top: -10px;
}

.IconRippleEffectContainer:not(.pW):after {
  content: '';
  height: 200%;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
}

.IconRippleEffectContainer:hover svg {
  opacity: 1;
}

.IconRippleEffectContainer:not(.pW):hover::before {  
  background-color: rgba(32,33,36,0.059);
  border: none;
  box-shadow: none;
  opacity: 1;
  transform: scale(1);
}


.IconRippleEffectContainer:not(.pW):after {
  content: '';
  height: 200%;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
}



.IconRippleEffectContainer:hover{   
  opacity: 1;
} 

.view.IconRippleEffectContainer:hover svg{  
  fill: var(--color-base--hover, #00838f);
} 

.edit.IconRippleEffectContainer:hover svg{  
  fill: var(--color-base--hover, #1a38e8);
} 

.delete.IconRippleEffectContainer:hover svg{
  fill: #ea4335;
} 


.gray.IconRippleEffectContainer:hover svg{
  fill: #6d6d60;
} 



.AddDepartment 
._form_group_body_{
  width: 360px;
  margin: 15px auto;
}


.AddDepartment 
._form_group_field_{
  margin: 15px;
}



._departmen_Wrp_Itm_{
  padding: 15px 9px;
}



._departmen_Wrp_Itm_{
  margin: 15px 10px 10px;
  box-shadow: 0 3px 5px 0 rgba(60,64,67,.302), 0 1px 6px 1px rgba(60,64,67,0);
  background: #fff;
  border-radius: 10px;
}


._departmen_Wrp_Itm_ 
._topContainer_ {
  padding: 1px 0px 9px;
}

._departmen_Wrp_Itm_ 
._bottomContainer_ {
  padding: 9px 0px 2px;
}




._departmen_Wrp_Itm_
._topContainer_
._labelName_{
  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-size: .925rem;
  letter-spacing: .2px;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--color-base--hover);
  color: #1a38e8;

  margin-top: 8px;
}




._departmen_section_{
  margin: 2px 7px 5px 20px;
}




._departmen_section_
._labelName_{
  margin: 7px 7px 2px 0;
  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-size: .875rem;
  letter-spacing: .2px;
  font-weight: 500;
  text-transform: capitalize;
  color: rgba(0,0,0,0.86);

}

._departmen_section_
._InStock_checkBox_ {
   margin: 2px 7px 2px 0;
}

.payment_details p.__locations__{
  text-align: left;  
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .875rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  margin: 17px 7px 2px;
}


._departmentDetails
._sections
{
  min-width: 450px;
}

._departmentDetails
._sections
._sectionsItem{
  width: 100%;
}


._departmentDetails
._sections
._sectionsItem
.locations{
  text-align: left;  
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .875rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  margin: 7px 7px 2px;
}


._departmentDetails
._sections
._sectionsItem
._mrg15 .payment_details .__amount__ {
  margin-left: 9px;
}

._departmentDetails
._sections
._sectionsItem
._mrg15 .payment_details._stock{
  margin-top: 5px;
}



._departmentDetails
._sections
._sectionsItem
._mrg15 .payment_details._stock
.__gm2_text_
{
  margin-top: 3px;
}


._operationsWrp_{   
  height: 45px;
}



._operationsWrp_
._actions_Location_{   
  display: none;
}

._operationsWrp_
._actions_Location_
._actions_Btns_{
   --animation_param: .1s ease;
    opacity: 0;
    width: 100px;
    display: flex;
    -webkit-transition: opacity .1s ease;
    transition: opacity .1s ease;   
}





._operationsWrp_:hover
._actions_Location_{   
  display: flex;
}


._operationsWrp_:hover
._actions_Location_
._actions_Btns_{  
  --animation_param: .31s ease;
  opacity: 1;  
  -webkit-transition-delay: 0.16s;
  transition-delay: 0.16s;
}




._operationsWrp_
._stock_Location_{
  display: flex;
}

._operationsWrp_:hover
._stock_Location_{
  display: none;
}

._operationsWrp_
._stock_Location_
._stock{
  opacity: 1;
  width: 100px;
  display: flex;
  -webkit-transition: opacity .1s ease;
  transition: opacity .1s ease;  
}


._operationsWrp_:hover
._stock_Location_
._stock{
  --animation_param: .31s ease;
  opacity: 0;
  margin-top: 0px;
  -webkit-transition-delay: 0.16s;
  transition-delay: 0.16s;  
}




._addLoc{
    margin: 5px 0;
}



/*
        DETAILS

*/


._label__category__ {
  color: #6d6d60;
  font: 500 14px/17px Roboto,sans-serif;
}

._label__category__ {
  font: 500 12px/14px Roboto,sans-serif;
  padding: 0 0 8px;
  color: var(--printcolor-error-text);
}



._desktopV{
  max-width:960px;
  margin: 15px auto;
}


._locations_dept_{
  margin: 15px 15px 15px 30px;
}




.payment_details._stock .__amount__ {
  text-align: right;
  min-width: 40px; 
}






.locationWrp{
  margin: 15px 15px 15px 30px;
  width: calc(100% - 180px);
}



._total2._sectionsItem{
  width: calc(100% - 20px);
}














._location_
._stock{   
  display: flex;
}


._location_:hover
._stock{   
  display: none;
}




 

._location_
._actions_Location_{   
  display: none;
}

._location_
._actions_Location_
._actions_Btns_{
   --animation_param: .1s ease;
    opacity: 0;
    width: 160px;
    display: flex;
    -webkit-transition: opacity .1s ease;
    transition: opacity .1s ease;   
}

._location_
._actions_Location_
._actions_Btns_{
  padding: 6px 0 0 6px;
}




._location_:hover
._actions_Location_{   
  display: flex;
}






._location_:hover
._actions_Location_
._actions_Btns_{  
  --animation_param: .31s ease;
  opacity: 1;  
  -webkit-transition-delay: 0.16s;
  transition-delay: 0.16s;
}


._location_{
  background-color: var(--gm-hairlinebutton-state-color,transparent);
  border:none;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  transition:background-color 15ms linear;
  height: 48px;
  margin: 2px;  
}

._location_:hover{
  background-color: var(--gm-hairlinebutton-state-color,rgba(0,0,0,0.042));
}

._location_
.locations{
  padding: 15px 0 0 17px;
}



._location_
.payment_details._stock p {
  margin : 0 7px 0 0;
  padding: 15px 0 0 17px;
}

._location_
.payment_details._stock .__amount__ {
  text-align: right;
  min-width: 40px;
  padding: 15px 0 0 7px;
}



._location_
.payment_details._stock{  
  min-width: 160px;
} 


._operationsWrp_
{

}


._operationsWrp_
h1{
  margin: 5px ;
}

._operationsWrp_
._stock_Location_{
  margin: 5px ;
}


._operationsWrp_ ._stock_Location_ ._stock{
    width: 180px;
}


._operationsWrp_ ._stock_Location_ ._stock p{
  margin: 4px 0 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  text-transform: capitalize;
}

._operationsWrp_ ._stock_Location_ ._stock .__amount__{
  margin: 4px 0 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
}


._operationsWrp_ ._stock_Location_ ._stock .__amount__{
  text-align: right;
  min-width: 80px;
}




._operationsWrp_ 
.nav-item-text {
 
  padding: 15px 0 0 1px;
}









`




















