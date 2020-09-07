
import React, { useEffect, useState } from 'react'
import { withRedux } from '../lib/redux'
import { useSelector, useDispatch } from 'react-redux'

import Layout from '../components/MyLayout.js'

import Link from 'next/link'


import * as _Util from '../lib/Util'
import Icons from '../components/Icons'

import DialogHRM from '../components/DialogHRM'
import { OpenModal  } from '../actions/common'
import { getDepartments, UpdSubDepartments } from '../actions/departments'
// import {  getProducts } from '../actions/products'



import CheckBox from '../components/CheckBoxSlide'




import NavigatonsTable from '../components/navigatonsTable'


import BTN_f from '../components/btns_confirm'


import AddDepartmentsComponent from '../components/department/addDepartments'
import DeleteDialogDepartments from '../components/department/deleteDialogDepartments'




const operationType = 'departments'




const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  let _state =  useSelector(state => state);
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();

  let list  = _state[operationType];
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

  

  const _getDepartments= (operation) => {
    getDepartments(dispatch, _state, operation);
  }


  const _updSubDepartment = (doc) => {
    UpdSubDepartments(doc, dispatch, _state);
  }


  return { observeChanges, list, forms, updForms, _updSubDepartment, _getDepartments }
}



const useModal = () => {
  const _modal = useSelector(state => state.listDialog);
  const dispatch = useDispatch();


  const OpenModalHRM = () => {       
    let data = {};
    data['list']=_modal;
    data['zIndex']=150;
    data['height']='80vh';
    data['width']='60vw'; 
    data['props']={title:"Add Department"};
    data['content'] = AddDepartmentsComponent; 
    OpenModal(dispatch,data);
  }

  const OpenDeleteModalHRM = (i) => {
    let data = {};
    data['list']=_modal;
    data['zIndex']=150;
    data['props']={item:i};
    data['content'] = DeleteDialogDepartments; 
    OpenModal(dispatch,data);
  }

  
  const _editDepartment = (items, _ID) => {
    let data = {};
    data['list']=_modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={title:"Update Department", dID: _ID, items:items};
    data['content'] = AddDepartmentsComponent; 
    //console.log(data)
    OpenModal(dispatch,data);
  }

  let modal = null;
  return { modal, OpenModalHRM, OpenDeleteModalHRM, _editDepartment }
}




const handleViewDetails = () => {

}

const handleEdit = () => {
  
}

const handleConfirmDelete = () => {
  
}

const OnChangeCheckBox = (d,_updSubDepartment) => {
  let _d = d;
  _d['active'] = !d.active;
  _updSubDepartment(_d);
}


function Departments() {
  const { OpenModalHRM, OpenDeleteModalHRM, _editDepartment } = useModal();

  const { forms, list, observeChanges,  _updSubDepartment, _getDepartments} = useObserveChanges();
  
  const [initialize, setInitialize] = useState(false);

  useEffect(() => {
    if(!initialize){
      setInitialize(true);
      _getDepartments('departments');
    }
  });

 


  let _list_ = _Util.convertObj2Array(list);
  console.log('Departments')

  console.log( useObserveChanges())

 









  return (
    <>
      <Layout/>
      <span onClick={OpenModalHRM}>
        <BTN_f theme={`light_blue`} title={'Add Departments'}/>
      </span>      

      <span onClick={()=>{}}>
        <BTN_f theme={`light_blue`} title={' teteet'}/>
      </span> 
      <NavigatonsTable operations={'departments'} actionFetch={getDepartments} />
      <div>
                  {_list_.map(dp=>{
                    let _sections = dp.sections || [];
                    return(
                      <div  className={`_departmen_Wrp_Itm_`}  key={_Util.gen6CodeId()}>
                        <div className={'_dsplFlx _topContainer_'}>
                         {/*
                          <div  className={'_labelName_'}   onClick={()=>handleViewDetails(dp)}>
                            {dp.name}
                          </div>
                          */}
                          <Link href="/department/[id]" as={`/department/${dp.id}`}>
                            <a>{dp.name}</a>
                          </Link>
                          <div className="flexSpace"/> 
                          <div className={`IconRippleEffectContainer edit`}  onClick={()=>_editDepartment(dp)}>
                            <Icons name={'outline_edit'} color={'#555'} size={24}/>
                          </div>
                          <div className={'_spaceMrg_'}/>
                          {false && <div className={`IconRippleEffectContainer delete`}  onClick={()=>OpenDeleteModalHRM(dp)}>
                            <Icons name={'outline_delete'} color={'#555'} size={24}/>
                          </div>
                          }
                        </div>
                        <div className={`_separator_`}/>
                        <div className={`_bottomContainer_`}>
                          {
                            _sections.map(dpSct=>{
                              return(
                                <div className={`_dsplFlx _mrg15 _departmen_section_`} key={_Util.gen6CodeId()}>
                                  <div className={'_dsplFlx _labelName_'}>
                                    {dpSct.name}
                                  </div>
                                  <div className="flexSpace"/>  
                                  <div  className={'_dsplFlx _InStock_checkBox_'}>                                 
                                    <span className={`_InStock_label_`}>Active</span>
                                    <div style={{"--checkBox--button--color":"", "--checkBox--button--Active--color":"#1a38e8"}} >
                                     {
                                     <CheckBox icon={`more_vert`} field={`autoGrabber`} updChange={()=>OnChangeCheckBox(dpSct, _updSubDepartment)} initvalue={dpSct.active}/>    
                                     }   
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })}
                  
                </div>


      <DialogHRM />
      <style>
        {dep_style}
      </style>
    </>
  )
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

.edit.IconRippleEffectContainer:hover svg{  
  fill: var(--color-base--hover);
  fill: #1a38e8;
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


._locationsDepartment_{   
  height: 45px;
}



._locationsDepartment_
._actions_Location_{   
  display: none;
}

._locationsDepartment_
._actions_Location_
._actions_Btns_{
   --animation_param: .1s ease;
    opacity: 0;
    width: 100px;
    display: flex;
    -webkit-transition: opacity .1s ease;
    transition: opacity .1s ease;   
}





._locationsDepartment_:hover
._actions_Location_{   
  display: flex;
}


._locationsDepartment_:hover
._actions_Location_
._actions_Btns_{  
  --animation_param: .31s ease;
  opacity: 1;  
  -webkit-transition-delay: 0.16s;
  transition-delay: 0.16s;
 
}




._locationsDepartment_
._stock_Location_{
  display: flex;
}

._locationsDepartment_:hover
._stock_Location_{
  display: none;
}

._locationsDepartment_
._stock_Location_
._stock{
  opacity: 1;
  width: 100px;
  display: flex;
  -webkit-transition: opacity .1s ease;
  transition: opacity .1s ease;  
}


._locationsDepartment_:hover
._stock_Location_
._stock{
  --animation_param: .31s ease;
  opacity: 0;
  margin-top: 0px;
  -webkit-transition-delay: 0.16s;
  transition-delay: 0.16s;  
}



._InStock_checkBox_
._InStock_label_{
  margin: 0 15px 0 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .875rem;
  font-weight: 600;
  letter-spacing: .0107142857em;
  color:rgb(85, 85, 85);
}




._addLoc{
    margin: 5px 0;
}


`




export default withRedux(Departments)
























