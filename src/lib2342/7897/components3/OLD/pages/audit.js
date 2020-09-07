

import React, { useEffect, useState } from 'react'
import { withRedux } from '../lib/redux'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import { getProductsById, getProductsByCode  } from '../actions/products'

import { getSubDepartments, AddStockTakings } from '../actions/stocks'

import * as _Util from '../lib/Util'

import Layout from '../components/MyLayout';

import Icons from '../components/Icons'

import AddProductByUPC from '../components/operations/addProductByUPC'

import { OpenModal } from '../actions/common'


/*




import DeleteDialogDepartments from '../components/department/deleteDialogDepartments'
import deleteDialogLocations from '../components/department/deleteDialogLocations'
import AddLocations from '../components/department/addLocations'
import MoveBtwLocations from '../components/department/moveProductBtwLocations'
import Link from 'next/link'
import InputAutocomplete from '../components/InputAutocomplete';



*/

import DropBtn from '../components/dropBtn';

import BTN_HRM from '../components/btns_confirm';


import DialogHRM from '../components/DialogHRM';


import InputText from '../components/InputText';

import InputAutocomplete from '../components/InputAutocomplete';


const operationType = 'audit'

const formName = "_audit_";

const deptByPrd = (s) => {
  let rr = [{id:null,name:"All"}];
  s && _Util.ObjectKeys(s).map(d=>{
      rr.push({id:d,name:s[d].name})
  })
  return rr;
}


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  let _state =  useSelector(state => state);
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();
  const fetchDetails =  useSelector(state => state.fetchDetails); 

  const products2Audit =  useSelector(state => state.products2Audit); 
  

  const departments =  useSelector(state => state.departments); 


  
  const modal = useSelector(state => state.listDialog);


  let _detailByID = _state['detailProductByID'];
  let details  = null, _productsMovements = [], _productsByDepartment = null;
  if(_Util.isJson(_detailByID)){
    let parsedDetail = JSON.parse(_detailByID);
    details  = parsedDetail['details'];
    _productsMovements = parsedDetail['productsMovements'];
    _productsByDepartment = parsedDetail['productsByDepartment'];
  }


  let _deptByPrd = deptByPrd(_productsByDepartment);
  
  let productList = useSelector(state => state.productList);
  
  const _OpenAddProd= (UPC, _ID) => {
    let data = {};
    data['list']= modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={title:"Add Product", dID: _ID, upc:UPC};
    data['content'] = AddProductByUPC; 
    //console.log(data)
    OpenModal(dispatch,data);
  }





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


  const clearForms= (form,v) => {
    let _forms = forms;
    if(!v){
      v={};
    }
    if(!_forms[form]){
      _forms[form] = {};
    }else{
      _forms[form] = v;  
    }
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })   
  }


  
  const deleteProd2Received= (id,v) => {
    let _productList = productList;
    delete _productList[id];
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'productList',value:_productList}
    })   
  }



  const editProd2Received= (id) => {
    let _productList = productList;
    let pt = _productList[id];
    let _forms = forms; 
    pt['oldProduct'] = pt['productID']
    _forms[`${formName}_prod`] = pt;
    console.log(_forms)
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms', value: _forms}
    })   
  }


  const updProd2Received= (id,obj) => {    
    let pt = productList;
    let prod2 = pt[id];
    if(prod2 && prod2['id']){
      

    }else{
      delete pt[id];
      let newP =Object.assign({},prod2,obj);
      pt[obj.id] = newP;
    }
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'productList',value:pt}
    })  
    let _forms = forms; 
    _forms[`${formName}_prod`] = {};
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })
  }



  const _getProductsById= (id,operation) => {
    getProductsById(id, dispatch, _state);
  }



  const _addStockTakings= (doc,operation) => {
    AddStockTakings(doc, dispatch, _state, operation );
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'productList',value:{}}
    }) 
    clearForms(formName,{})
  }

  
  
 
  const setProductList= (proL) => {
    let pp = productList;
    if(!pp){
      pp = {};
    }
    if(proL['id']){
      pp[proL['id']] = proL;
    }else{
      if(proL['oldProduct']){
        pp[proL['oldProduct']] = proL;
        delete pp[proL['oldProduct']]['oldProduct'];
      }else{
        pp[proL['productID']] = proL;
      }
    }
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'productList',value:pp}
    }) 
    let _forms = forms; 
    _forms[`${formName}_prod`] = {};
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })
  }


  

  const _getProductsByCode= (query, operation) => {
    setTimeout(()=>{
      getProductsByCode(dispatch, _state, operation,query);
    },30);
    return true
  }

 
  const _getDepartments= (operation) => {
    getSubDepartments(dispatch, _state, operation);
  }


  return { 
    observeChanges, 
    
    forms,  
    updForms, 

    /*

    OpenDeleteLocation, 
    OpenEditLocation,
    details, 
    OpenMoveBtwLocations,
   _productsMovements,
    fetchDetails,
    */




    _getProductsById,
    _productsByDepartment,
    _deptByPrd,
    _getProductsByCode,


    editProd2Received,
    deleteProd2Received,
    productList,
    setProductList,
    products2Audit,
    departments,
    _getDepartments,
    _addStockTakings,
    updProd2Received,
    _OpenAddProd
  }
}











const SubmitReceivingDocument = (forms, productList, _addStockTakings ) => {
   
    let header = forms[formName] || {};
    let fld2Prs = ['productID','price','qty','departmentID','locationID','document','trackingNumber','sellerID'] ;
    _Util.ObjectKeys(productList).map(pObjId=>{
      let product2S = productList[pObjId];
      product2S['productID'] = product2S['id'];
      let _2Fs = Object.assign({},product2S,header);
     

      let _2s = {};
      _2Fs && fld2Prs.map(fld=>{
        _2s[fld] = _2Fs[fld];
      })  
      _addStockTakings(_2s,"");

    })
    
    
}







const handleEdit = () => {


}

const handleDepartmentSelect= (e, dept, setDeptID, setLocations, field, formName, updForms) => {
  let id = e.id;
  // let dd = dept[id];
  console.log(e, dept)
  setDeptID(id);
  e && e.locations &&  setLocations(e.locations)
  updForms(formName,field,id)
}


const handleLocationSelect= (e,field, formName, updForms) => {
  
  updForms(formName,field,e)
}






const handleValidAdd= (e, setValidAdd, forms, formName, field ) => {
  
  let fld2Prs = ['productID','price','qty'] ;
  let addValidate = {
    productID: {required:true,minLength:3,maxLength:50},
    price: {required:true, number:true, minValue:0.01, maxValue:50000},
    qty: {required:true, number:true, minValue:0.01, maxValue:5000}
  }
  let _2Fs = forms[formName] || {};
  _2Fs[field] = e;
  
  let _2s = {};
  _2Fs && fld2Prs.map(fld=>{
    _2s[fld] = _2Fs[fld];
  })    

  var _Valid = _Util.validations(addValidate,_2s);   
  if(_Valid.valid){
    setValidAdd(true)
  }else{
    setValidAdd(false)
  }

}



const handleValidForm= (e, setValidForm, forms, formName, field ) => {
  
  
    let fld2Prs = ['departmentID','locationID','document','trackingNumber','sellerID'] ;
    let addValidate = {
      departmentID: {required:true,minLength:3,maxLength:50},
      locationID: {required:true,minLength:3,maxLength:50},
      document: {required:true,minLength:3,maxLength:50},
      trackingNumber: {required:true,minLength:3,maxLength:50},
    }
    let _2Fs = forms[formName] || {};
    field?_2Fs[field] = e:null;
    let _2s = {};
    _2Fs && fld2Prs.map(fld=>{
      _2s[fld] = _2Fs[fld];
    })    
    var _Valid = _Util.validations(addValidate,_2s);   
    // console.log(_Valid)
    if(_Valid.valid){
      setValidForm(true)
    }else{
      setValidForm(false)
    }
  
}



const AddProduct2Receive= (validAdd, e, setProductList, forms, _getProductsByCode, setValidForm ) => {
  
    let ss = forms[e];

    console.log('AddProduct',ss)
    
    setProductList(ss)
    let prodID = ss['productID'];
    _getProductsByCode(prodID, "products2Audit")
    /*
    handleValidForm("", setValidForm, forms, formName)
    */
  
}










const AuditComponent = (props) => {

  const { 
    observeChanges,
    forms,
    productList, 
    setProductList,
    products2Audit,
    _getProductsByCode,
    departments,
    _getDepartments,
    deleteProd2Received,
    editProd2Received,
    updProd2Received,
    _OpenAddProd,
    _addStockTakings,
    updForms
  } = useObserveChanges();

  const router = useRouter()
  const [initialize, setInitialize] = useState(false);

  const [view, setView] = useState(0);
  const [deptID, setDeptID] = useState(null);
  const [validForm, setValidForm] = useState(null);
  const [validAdd, setValidAdd] = useState(null);


  const [locations, setLocations] = useState(null);

  let _ID = router.query.id;
  // console.log(router)
  useEffect(() => {
    if(!initialize){
      setInitialize(true);  
      _getDepartments("departments");
      
    }
  });




  let _productsMovementsList = [];


  
  
  var filtered_departments = {};
  filtered_departments = parseDeparments(departments);
 
  let productListFormName = `${formName}_prod`;
  let ssFomrm = forms[productListFormName];
  let locationsList = {};
  let productListValid = ValidateProductList(productList,products2Audit);
 

  var filtered_locations  = locations || {};
  

  
    return (
      <>
      <style>
        {dep_style}
      </style>
      <Layout />
        <>
        <div className={`fieldPadding`}  onClick={()=>SubmitReceivingDocument(forms, productList, _addStockTakings )}>
            <BTN_HRM theme={productListValid &&  validForm?`light_blue`:"disabled"} title={'Submit'}/>
        </div>
          
        <div className={'_dsplFlx _desktopV '} >
          <div className={'_dsplFlx _wrp_Flx '} >
            <div>
              <div style={{position:'relative'}} onClick={()=>{}}  className={`fieldPadding`}>
               
              
              <InputAutocomplete
                icon={`more_vert`} 

                keyCode={30}
                form={formName} 
                field={`departmentID`}
                data={filtered_departments} 
                placeholder={_Util.translatetext(303)} 
                //OnChange={(e)=>handleGroupSearch(e,_getDepartmentsByName,forms, setValidForm)}
                OnSelect={(e)=>handleDepartmentSelect(e, departments, setDeptID, setLocations, "departmentID", formName, updForms)}
               
              />
              </div> 
            </div>
          </div>  

          <div className="flexSpace"/>  
          <div className={`_dsplFlx _wrp_Flx` }>
            {deptID && 
                <div style={{position:'relative'}} onClick={()=>{}}  className={`fieldPadding`}>
                  <InputAutocomplete
                    icon={`more_vert`} 
                    keyCode={31}
                    form={formName} 
                    field={`locationID`}
                    data={filtered_locations} 
                    placeholder={_Util.translatetext(311)} 
                    //OnSelect={(e)=>handleLocationSelect(e, "locationID", formName,updForms)}
                    //OnChange={(e)=>handleGroupSearch(e,_getDepartmentsByName,forms, setValidForm)}
                    OnSelect={(e)=>handleLocationSelect(e, "locationID", formName,updForms)}
                  />
              </div>
              }
          </div>
        </div>


        <div className={`_separator_`}/>
        <div className={'_dsplFlx _desktopV '} >
          <div className={`fieldPadding`}>
            <InputText 
              icon={`textFormat`} 
              form={`${formName}_prod`} 
              field={`productID`}
              index={2}  
              keyCode={35}
              submitKeyEnter={()=>AddProduct2Receive(validAdd,`${formName}_prod`, setProductList, forms, _getProductsByCode, setValidForm)}
              validations={{required:true,minLength:3,maxLength:50}} 
              placeholder={_Util.translatetext(312)}
              OnChange={(e)=>handleValidAdd(e,setValidAdd,forms,`${formName}_prod`,"productID")}  
              //initValue={ssFomrm?ssFomrm['product']:null}
            />
          </div>
          <div className="flexSpace"/>  
         {false && 
          <div className={`fieldPadding`}  onClick={()=>AddProduct2Receive(validAdd,`${formName}_prod`, setProductList, forms, _getProductsByCode, setValidForm)}>
            <BTN_HRM theme={validAdd?`light_blue`:"disabled"} title={'Add Items'}/>
          </div>
          }
        </div>


       
        </>


      
        <div className={`_dsplFlx`}>
            <div  className={'_dsplFlx _mrg15 _sections _locations_dept_'}>                   
              <div className={'payment_details  _total2 _sectionsItem'}>             
               <span>Items</span>
                    {
                   productList && _Util.ObjectKeys(productList).map(slcId=>{
                     let slc = productList[slcId];
                     let isValidP = dasdg0smpdhg(products2Audit, slc['productID']);
                     let isV = isValidP['qty'];
                     let isIds = isValidP['ids'];
                      if(slc){
                        if(!slc.id && isV===1){
                          updProd2Received(slcId, isIds)
                        }
                     
                        return(
                          <div  className={'_dsplFlx _mrg15 _location_ showActions'} key={_Util.gen12CodeId()}>                    
                         
                          <div className={`payment_details  prodID `} >       
                            <div  className={`locations _3link_    ${isV>0?isV===1?"_ok_":"_duplicate_":"_noAvailable_"} ` }> {slc['productID']}</div>
                          </div>
                          {isIds && isIds['name'] ?
                          <div className={`payment_details  prodID `} >       
                            <div  className={`locations _3link_ title_noWrAP` }> {isIds && isIds['name']}</div>
                          </div>
                          :
                          <div className={`payment_details  prodID `}  onClick={()=>_OpenAddProd(slc['productID'])}>       
                            <div  className={`locations _link_error_ ` }> {`no product find relate with this code`}</div>
                          </div>
                          }
                          <div className="flexSpace"/>  
                          
                          <div className={'payment_details  _stock _qty_'}>
                          </div>

                          <div className={'_actions_Location_'}>
                            <div className={'_actions_Btns_'}>
                              <div  onClick={()=>editProd2Received(slcId)}>
                                <Icons 
                                  name={'outline_edit'} 
                                  color={'#555'} 
                                  size={24} 
                                  tooltip={`edit`}
                                  extraClass={'edit'}
                                  ripple={true}
                                  />
                              </div>
                              <div className={'_spaceMrg_'}/>
                              <div onClick={()=>deleteProd2Received(slcId)}>
                                <Icons 
                                  name={'outline_delete'} 
                                  color={'#555'} 
                                  size={24} tooltip={'delete'}
                                  extraClass={'delete'}
                                  ripple={true}
                                />
                              </div>
                            </div>
                          </div>
                          

                        </div>
                        )
                        
                      }else{
                        return null
                      }
                    }) 
                    }
              </div>                  
            </div>
        </div>
        <DialogHRM />  
      </>
    );
  
}  


export default withRedux(AuditComponent);






function parseDeparments(a) {
  let r = [];
  a && _Util.ObjectKeys(a).map(stId=>{
        let st = a[stId]
        if(st.type==="inventory" ){
          let dpt = st.departmentParentDetail;
          let obj2Save = {id:st.id,name:`${dpt.name} - ${st.name.toString().toUpperCase()}`,locations:st.locations, parent:dpt}
          r.push(obj2Save);
        }
      });
  return r;
}







function calcStock(a) {
  let res = 0;
  a && a.map(i=>{


    res += i['qty']
  })
  return res;
}


function dasdg0smpdhg(a,v) {
  let res = {qty:0,ids:{}};
  let _v = v && v.toString().toLowerCase();
  a && _Util.ObjectKeys(a).map(i=>{
    let _id = a[i]['id'].toString().toLowerCase();
    let _upc = a[i]['upc'].toString().toLowerCase();
    if(_id.indexOf(_v)>=0 || _upc.indexOf(_v)>=0){
      res['qty'] += 1;
      // console.log(i);
      res['ids'] = a[i];
    }
  })
  return res;
}






function ValidateProductList(p,a) {
  let res = true; 
  if(p && a){
    let plist = _Util.ObjectKeys(p);
    if(plist.length>0){
      plist.map(i=>{
        if(!a[i]){
          res = false; 
        }
      })
    }
    else{
      res = false;
    }
  }else{
    res = false; 
  }
  return res;
}


const dep_style = `

._dsplFlx{
  display:flex;
}

.flexSpace{
  flex-basis: 0.000000001px;
  flex: 1 1;
}


._separator_ {
  height: 1px;
  width: 96%;
  margin: 0 auto;
  background-color: #dcdcdc;
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
  margin: 2px 7px 2px;
  padding: 5px 2px;
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


.product_Department_{   
  height: 45px;
}



.product_Department_
._actions_Location_{   
  display: none;
}

.product_Department_
._actions_Location_
._actions_Btns_{
   --animation_param: .1s ease;
    opacity: 0;
    width: 100px;
    display: flex;
    -webkit-transition: opacity .1s ease;
    transition: opacity .1s ease;   
}









.product_Department_
._stock_Location_{
  display: flex;
}



.product_Department_
._stock_Location_
._stock{
  opacity: 1;
  width: 100px;
  display: flex;
  -webkit-transition: opacity .1s ease;
  transition: opacity .1s ease;  
}


.product_Department_.tobcosaj
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
  width: 100%;
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


._location_.showActions:hover
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




._location_.showActions:hover
._actions_Location_{   
  display: flex;
}











._location_.showActions:hover
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


.product_Department_
{

}


.product_Department_
h1{
  margin: 5px ;
}

.product_Department_
._stock_Location_{
  margin: 5px ;
}


.product_Department_ ._stock_Location_ ._stock{
    width: 180px;
}


.product_Department_ ._stock_Location_ ._stock p{
  margin: 8px 0 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  text-transform: capitalize;
}

.product_Department_ ._stock_Location_ ._stock .__amount__{
  margin: 4px 0 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
}


.product_Department_ ._stock_Location_ ._stock .__amount__{
  text-align: right;
  min-width: 80px;
}


.product_Department_ p{   
  margin: 4px 9px 9px 0;
  color: #6d6d60;
  font: 500 14px/17px Roboto,sans-serif;
  
}




.product_Department_ ._deptName{   
  margin: 4px 0 0;
  color: #3c3c3c;
  font: 600 15px/17px Roboto,sans-serif;
  padding: 0 0 18px 7px;
}



._upprC{
  text-transform: uppercase;
}


.area_wrpp{
  max-width:960px;
  margin: 7px auto;
}





._locationsArea_ p{   
  margin: 4px 9px 9px 0;
  color: #6d6d60;
  font: 500 14px/17px Roboto,sans-serif;
  text-align: right;
}




._locationsArea_ ._deptName{   
  margin: 4px 0 0;
  color: #3c3c3c;
  font: 600 15px/17px Roboto,sans-serif;
  padding: 0 0 18px 7px;
  text-align: right;
}


._location_ ._idsProd{
  padding: 15px 0 0 17px;
  min-width: 160px;
}



._total2._sectionsItem {
  max-width: 780px;
  margin: 10px auto;
}


._total2._sectionsItem {
  max-width: 780px;
  margin: 10px auto;
}

._total2._sectionsItem 
._location_ .payment_details._stock{
  min-width: 60px;
}




._link_{
  cursor: pointer;
}
._link_:hover{
  color: var(--mdc-theme-primary-color,#1a73e8);
  font: 600 15px/17px Roboto,sans-serif;
}



.product_Department_ h1 {
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50vw;
}




.departByProd
{
  max-width: 960 
}

.fieldPadding{
  padding: 15px 6px 7px;
}




._wrp_Flx{
  flex-wrap: wrap;
}



._location_ ._actions_Location_ ._actions_Btns_ {
 
  width: 94px;
  
}


.qty{
  width: 65px;  
}


._qty_{
  width: 160px
}

._isValidProd{
  padding: 15px 0 0 17px;
  min-width: 40px;
}

.prodID{
  min-width: 165px;
}





._ok_{
  background-color:#e6f4ea;
  color: #34a853;
  font-weight: 600;

}

._duplicate_{
  
  background-color: #fef7e0;
  color: #fbbc04;
}

._noAvailable_{

  background-color: #fce8e6;
  color: #ea4335;

}




._link_error_{
  cursor: pointer;
  color: #ea4335;
}

._link_error_:hover{
  font-weight: 600;
}






._location_ .locations {
  padding: 7px 9px;
  margin-top: 7px;
  border-radius: 7px;  
  text-align: left;
}


._location_ .title_noWrAP {
    margin: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

`




















