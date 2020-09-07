

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../lib/redux'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import { getProductsById } from '../../actions/products'
import { OpenModal } from '../../actions/common'

import * as _Util from '../../lib/Util'
import Icons from '../../components/Icons'
import Layout from '../../components/MyLayout';

import DeleteDialogDepartments from '../../components/department/deleteDialogDepartments'
import deleteDialogLocations from '../../components/department/deleteDialogLocations'
import AddLocations from '../../components/department/addLocations'
import MoveBtwLocations from '../../components/department/moveProductBtwLocations'
import DropBtn from '../../components/dropBtn';



import DialogHRM from '../../components/DialogHRM';
import Link from 'next/link'

import MenuSlideSide from '../../components/MenuSlideSide';


const operationType = 'products'



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

  const _getProductsById= (id,operation) => {
    getProductsById(id, dispatch, _state);
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


  const OpenMoveBtwLocations = (p, l) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={title:"Transfer Betwen Location", fromlocation: l, product: p};
    data['content'] = MoveBtwLocations; 
    //console.log(data)
    OpenModal(dispatch,data);
  }
  



  return { 
    observeChanges, 
    details, 
    forms, 
    _productsMovements,
    fetchDetails,
    updForms, 
    OpenDeleteLocation, 
    OpenEditLocation,
    _getProductsById,
    OpenMoveBtwLocations,
    _productsByDepartment,
    _deptByPrd
  }
}



const handleEdit = () => {


}





const ProductViewDetail = (props) => {
  const { 
    fetchDetails, 
    details,
    observeChanges,
    _productsMovements,
    _productsByDepartment,
    _deptByPrd,
    _getProductsById
  } = useObserveChanges();

  const router = useRouter()
  const [initialize, setInitialize] = useState(false);

  const [view, setView] = useState(0);
  const [deptID, setDeptID] = useState(null);

  let _ID = router.query.id;
  // console.log(router)
  useEffect(() => {
    if(!initialize){
      setInitialize(true);      
      _getProductsById(_ID);
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
  
  let _area = item && item['area']?item['area']:''; 

 
  
  let _department = item?`${item["departmentDetail"]?item["departmentDetail"]['departmentParentDetail']?`${item["departmentDetail"]['departmentParentDetail']["name"]} - ${item["departmentDetail"]["name"]}`:'':''} `:"";

 


  let _productsMovementsList = _productsMovements;

  if(deptID){
    let key = "createdAt";
    let _list = _productsByDepartment[deptID]['list'].sort(function(a, b) {
      if(a[key] < b[key]) { return 1; }
      if(a[key] > b[key]) { return -1; }
      return 0;          
    })
    _productsMovementsList = _list;
  }

  // let _stock = item && item['stockDetails'] && item['stockDetails']['inStock']?item['stockDetails']['inStock']:0;
  let _stock = calcStock(_productsMovementsList);

  let locationsList = {}
    return (
      <>
      <style>
        {dep_style}
      </style>
      <Layout />

        {item && item.id && 
        <>
     
          
        <div className={'_dsplFlx _desktopV '} >
          <div className="flexSpace"/>  
          <span style={{position:'relative'}} onClick={()=>{}}>
            <DropBtn 
              theme={`light_blue`} 
              title={'departments'}
              list={_deptByPrd}
              OnSelect={(e)=>setDeptID(e)}
            />
          </span> 
        </div>
        <div  className={'_dsplFlx _mrg15 product_Department_ _desktopV'}>  
                      
          <div className={'payment_details  _total2 '}>   
            <h1>{_name}</h1>   
          </div>
          <div className="flexSpace"/>  
          <div className={'_stock_Location_'}>
            <div className={'payment_details _dsplFlx  _stock'}>
              <p>{_Util.translatetext(317)}</p>
              <div  className={'__amount__ __gm2_text_'}>  {_stock}</div> 
            </div>
          </div>
          
          
        </div> 
        <div  className={`area_wrpp  _dsplFlx`}>
          <div className={` product_Department_`}>
            <p>{_Util.translatetext(304)}</p>
            <div  className={'__amount__'}>{item['brand']} </div> 
          </div>

          <div className="flexSpace"/>  
          <div className={`_locationsArea_ rgt_align`}>
            <p>{_Util.translatetext(301)}</p>
            <div  className={'__amount__ __gm2_text_'}>  {item['upc']}</div>  
          </div>
        </div>
        <div  className={`area_wrpp  _dsplFlx`}>
          <div className={` product_Department_`}>
            <p>{_Util.translatetext(303)}</p>
            <div className={`_deptName  _upprC`}>
              {_department}
            </div>
          </div>
          
          <div className="flexSpace"/>  
          <div className={`_locationsArea_ rgt_align`}>
            <p>{_Util.translatetext(305)}</p>
            <div  className={'__amount__ __gm2_text_'}>  {item['productType']}</div> 
          </div>
        </div>
        </>
        } 
          {fetchDetails && !item &&

            <Link href="/departments" as={`/departments`}>
            <a>{'this item is no longer exist'}</a>
            </Link>

            }

            {false && !fetchDetails && 

            <div>
              <span>
              {'Loading .... '}
              </span>
            </div>

            }
      
        <div className={`_dsplFlx`}>
            <div  className={'_dsplFlx _mrg15 _sections _locations_dept_'}>                   
              <div className={'payment_details  _total2 _sectionsItem'}>             
               <span>Movements</span>
                    {
                    _productsMovementsList.map(slc=>{
                      // let slc = locationsList[slcId];
                      if(slc){
                        
                        return(
                          <div  className={'_dsplFlx _mrg15 _location_ showActions'} key={_Util.gen12CodeId()}>                    
                            <div className={'payment_details   '}>                            
                              <div  className={'_idsProd'}> {`${_Util.date2pretyfy(slc['createdAt'])} ${_Util.time2pretyfy(slc['createdAt'],true)}`}</div> 
                            </div>
                            <div className={'payment_details  _total2 '}>       
                              <Link href="/locations/[id]" as={`/locations/${slc.id}`}>
                                <div  className={'locations _link_'}> {slc['name']}</div>
                              </Link> 
                            </div>
                            <div className="flexSpace"/>  
                            <div className={'payment_details  _stock'}>
                              <div  className={'__amount__ __gm2_text_'}>  {slc['qty']}</div> 
                            </div>
                           
                            <div className={'_actions_Location_'}>
                              <div className={'_actions_Btns_'}>
                                 <div onClick={()=>{}}>
                                    <Icons 
                                      name={'outline_view'} 
                                      color={'#555'} 
                                      size={24}  
                                      tooltip={'Product details'}
                                      extraClass={`view`}
                                    />
                                  </div>
                                <div className={'_spaceMrg_'}/>
                                <div  onClick={()=>OpenMoveBtwLocations(slc,item)}>
                                  <Icons 
                                    name={'arrows_compare'} 
                                    color={'#555'} 
                                    size={24} 
                                    tooltip={`transfer product`}
                                    extraClass={'edit'}
                                    />
                                </div>
                                <div className={'_spaceMrg_'}/>
                                <div onClick={()=>{}}>
                                  <Icons 
                                    name={'outline_delete'} 
                                    color={'#555'} 
                                    size={24} tooltip={'delete locations'}
                                    extraClass={'delete'}
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


export default withRedux(ProductViewDetail)








function calcStock(a) {
  let res = 0;
  a && a.map(i=>{
    res += i['qty']
  })
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


`




















