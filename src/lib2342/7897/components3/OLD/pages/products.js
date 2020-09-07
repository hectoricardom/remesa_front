
import React, { useEffect, useState } from 'react'
import { withRedux } from '../lib/redux'
import { useSelector, useDispatch } from 'react-redux'

import Layout from '../components/MyLayout.js'

import Link from 'next/link'


import * as _Util from '../lib/Util'
import Icons from '../components/Icons'

import DialogHRM from '../components/DialogHRM'
import { OpenModal  } from '../actions/common'
import { getProducts } from '../actions/products'
 import InputText from '../components/InputText'



import CheckBox from '../components/CheckBoxSlide'

import DropBtn from '../components/dropBtn'




import NavigatonsTable from '../components/navigatonsTable'


import BTN_f from '../components/btns_confirm'


import AddProductsComponent from '../components/product/addProducts'
import DeleteDialogProducts from '../components/product/deleteDialogProducts'




const operationType = 'products'




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

  

  const _getProducts= (operation) => {
    getProducts(dispatch, _state, operation);
  }


  const _searchProducts= (query, operation) => {
    setTimeout(()=>{
      getProducts(dispatch, _state, operation,query);
    },30);
    return true
  }


  return { observeChanges, list, forms, updForms,  _getProducts, _searchProducts }
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
    data['props']={title:"Add Product"};
    data['content'] = AddProductsComponent; 
    OpenModal(dispatch,data);
  }

  const OpenDeleteModalHRM = (i) => {
    let data = {};
    data['list']=_modal;
    data['zIndex']=150;
    data['props']={item:i};
    data['content'] = DeleteDialogProducts; 
    OpenModal(dispatch,data);
  }

  
  const _editProduct = (items, _ID) => {
    let data = {};
    data['list']=_modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={title:"Update Product", dID: _ID, items:items};
    data['content'] = AddProductsComponent; 
    //console.log(data)
    OpenModal(dispatch,data);
  }

  let modal = null;
  return { modal, OpenModalHRM, OpenDeleteModalHRM, _editProduct }
}




const handleViewDetails = () => {

}

const handleEdit = () => {
  
}



let lastSearch = 0;

const handleSearch= (e,operationType,_searchProducts) => {
let _now = (new Date()).getTime();
    lastSearch = _now;
    let _q_ = e;
    console.log('s',_q_)
    setTimeout(()=>{
      //console.log(_now ,  lastSearch, _now - lastSearch)
      if(_now-lastSearch>=0){
        console.log('fetch',_q_)
        _searchProducts(_q_, operationType)
      }
    },500)
   return true;
  
}






const OnChangeCheckBox = (d,_updSubProduct) => {
  let _d = d;
  _d['active'] = !d.active;
  // _updSubProduct(_d);
}


const setDeptID = (d,_updSubProduct) => {

}









function Products() {
  const { OpenModalHRM, OpenDeleteModalHRM, _editProduct } = useModal();

  
  const { forms, list, observeChanges,  _searchProducts, _getProducts} = useObserveChanges();
  
  const [initialize, setInitialize] = useState(false);

  useEffect(() => {
    if(!initialize){
      setInitialize(true);
      _getProducts('products');
    }
  });

 


  let _list_ = _Util.convertObj2Array(list);





  let _inStockF = [ {id:null,name:"All"}, {id:true, name:"In Stock"}];



  return (
    <>
      <Layout/>
      <span onClick={OpenModalHRM}>
        <BTN_f theme={`light_blue`} title={'Add Products'}/>
      </span>      

      <div className={'_dsplFlx _desktopV '} >
          <div className="flexSpace"/>  
          <span style={{position:'relative'}} onClick={()=>{}}>
            <DropBtn 
              theme={`light_blue`} 
              title={'departments'}
              list={_inStockF}
              OnSelect={(e)=>setDeptID(e)}
            />
          </span> 
          <div className="flexSpace"/>  
        <div className={`fieldPadding`}>
            <InputText 
              icon={`search`} 
              form={'_productSearch_'} 
              field={`search`}
             
              placeholder={_Util.translatetext(75)}
              OnChange={(e)=>handleSearch(e,operationType,_searchProducts)} 
            />
          </div>
        </div>

      <div  className={'_dsplFlx '}>

      
      </div>


      <NavigatonsTable operations={'products'} actionFetch={getProducts} />
      <div>
                  {_list_.map(slc=>{
                    return(
                      <div  className={'_dsplFlx _mrg15 _location_ showActions'} key={_Util.gen12CodeId()}>                    
                     
                      <div className={'payment_details  _total2 '}>       
                        <Link href="/products/[id]" as={`/products/${slc.id}`}>
                          <div  className={'locations _link_'}> {slc['name']}</div>
                        </Link> 
                      </div>
                      <div className="flexSpace"/>  
                      <div className={'payment_details  _stock'}>
                        <div  className={'__amount__ __gm2_text_'}>  {slc['qty']}</div> 
                      </div>
                     
                      <div className={'_actions_Location_'}>
                        <div className={'_actions_Btns_'}>
                          <Link href="/products/[id]" as={`/products/${slc.id}`}>
                            <div className={``} >
                              <Icons 
                                name={'outline_view'} 
                                color={'#555'} 
                                size={24}
                                tooltip={'details'}
                                extraClass={'view'}
                              />
                            </div>
                          </Link>
                          <div className={'_spaceMrg_'}/>
                          <div  onClick={()=>{}}>
                            <Icons 
                              name={'arrows_compare'} 
                              color={'#555'} 
                              size={24} 
                              tooltip={`transfer `}
                              extraClass={'edit'}
                              />
                          </div>
                          <div className={'_spaceMrg_'}/>
                          <div onClick={()=>{}}>
                            <Icons 
                              name={'outline_delete'} 
                              color={'#555'} 
                              size={24} tooltip={'delete'}
                              extraClass={'delete'}
                            />
                          </div>
                        </div>
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



.AddProduct 
._form_group_body_{
  width: 360px;
  margin: 15px auto;
}


.AddProduct 
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


._productDetails
._sections
{
  min-width: 450px;
}

._productDetails
._sections
._sectionsItem{
  width: 100%;
}


._productDetails
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


._productDetails
._sections
._sectionsItem
._mrg15 .payment_details .__amount__ {
  margin-left: 9px;
}

._productDetails
._sections
._sectionsItem
._mrg15 .payment_details._stock{
  margin-top: 5px;
}



._productDetails
._sections
._sectionsItem
._mrg15 .payment_details._stock
.__gm2_text_
{
  margin-top: 3px;
}


._locationsProduct_{   
  height: 45px;
}



._locationsProduct_
._actions_Location_{   
  display: none;
}

._locationsProduct_
._actions_Location_
._actions_Btns_{
   --animation_param: .1s ease;
    opacity: 0;
    width: 100px;
    display: flex;
    -webkit-transition: opacity .1s ease;
    transition: opacity .1s ease;   
}





._locationsProduct_:hover
._actions_Location_{   
  display: flex;
}


._locationsProduct_:hover
._actions_Location_
._actions_Btns_{  
  --animation_param: .31s ease;
  opacity: 1;  
  -webkit-transition-delay: 0.16s;
  transition-delay: 0.16s;
 
}




._locationsProduct_
._stock_Location_{
  display: flex;
}

._locationsProduct_:hover
._stock_Location_{
  display: none;
}

._locationsProduct_
._stock_Location_
._stock{
  opacity: 1;
  width: 100px;
  display: flex;
  -webkit-transition: opacity .1s ease;
  transition: opacity .1s ease;  
}


._locationsProduct_:hover
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




`




export default withRedux(Products)
























