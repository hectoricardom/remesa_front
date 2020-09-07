

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../lib/redux'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import { getLocationsById } from '../../actions/locations'
import { OpenModal } from '../../actions/common'

import * as _Util from '../../lib/Util'
import Icons from '../../components/Icons'
import Layout from '../../components/MyLayout';

import DeleteDialogDepartments from '../../components/department/deleteDialogDepartments'
import deleteDialogLocations from '../../components/department/deleteDialogLocations'
import AddLocations from '../../components/department/addLocations'
import MoveBtwLocations from '../../components/department/moveProductBtwLocations'
import BTN_HRM from '../../components/btns_confirm';



import DialogHRM from '../../components/DialogHRM';
import Link from 'next/link'

import MenuSlideSide from '../../components/MenuSlideSide';


const operationType = 'locations'

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  let _state =  useSelector(state => state);
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();
  const fetchDetails =  useSelector(state => state.fetchDetails);
  const modal = useSelector(state => state.listDialog);
  let _detailLocationByID = _state['detailLocationByID'];
  let details  = null, _prods = null;
  if(_Util.isJson(_detailLocationByID)){
    let parsedDetail = JSON.parse(_detailLocationByID);
    details  = parsedDetail['details'];
    _prods = parsedDetail['productsOnLocation'];
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

  const _getLocationsById= (id,operation) => {
    getLocationsById(id, dispatch, _state);
  }
  console.log({details})
  
  
 

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
    _prods,
    fetchDetails,
    updForms, 
    OpenDeleteLocation, 
    OpenEditLocation,
    _getLocationsById,
    OpenMoveBtwLocations
  }
}



const handleEdit = () => {


}





const LocationViewDetail = (props) => {
  const { 
    fetchDetails, details, observeChanges,_prods,
    OpenMoveBtwLocations,
    OpenDeleteLocation, 
    OpenEditLocation,
    _getLocationsById
  } = useObserveChanges();

  const router = useRouter()
  const [initialize, setInitialize] = useState(false);

  const [view, setView] = useState(0);

  let _ID = router.query.id;
  // console.log(router)
  useEffect(() => {
    if(!initialize){
      setInitialize(true);      
      _getLocationsById(_ID);
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

 
  let _stock = item && item['stockDetails'] && item['stockDetails']['inStock']?item['stockDetails']['inStock']:0;
  
  let _department = item?`${item["departmentDetail"]?item["departmentDetail"]['departmentParentDetail']?`${item["departmentDetail"]['departmentParentDetail']["name"]} - ${item["departmentDetail"]["name"]}`:'':''} `:"";

    return (
      <>
      <style>
        {dep_style}
      </style>
      <Layout />

        {item && item.id && 
        <>
        
        <div  className={'_dsplFlx _mrg15 _locationsDepartment_ _desktopV'}>  
                      
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
          <div className={` _locationsDepartment_`}>
            <p>{_Util.translatetext(303)}</p>
            <div className={`_deptName  _upprC`}>
              {_department}
            </div>
          </div>

          <div className="flexSpace"/>  
          <div className={`_locationsArea_ rgt_align`}>
            <p className={``}>{_Util.translatetext(306)}</p>
            <div className={`_deptName`}>
              {_area}
            </div>
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
               <span>Items</span>
                    {
                    _Util.ObjectKeys(_prods).map(slcId=>{
                      let slc = _prods[slcId];
                      if(slc && slc['qty']>0){
                        
                        return(
                          <div  className={'_dsplFlx _mrg15 _location_ showActions'} key={_Util.gen12CodeId()}>                    
                            <div className={'payment_details   '}>                            
                              <div  className={'_idsProd'}> {slcId}</div> 
                            </div>
                            <div className={'payment_details  _total2 '}>                            
                              <div  className={'locations'}> {slc['name']}</div> 
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
                                      tooltip={'Product details'}
                                      extraClass={'view'}
                                    />
                                  </div>
                                </Link>
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


export default withRedux(LocationViewDetail)










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









._locationsDepartment_
._stock_Location_{
  display: flex;
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


._locationsDepartment_.tobcosaj
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


._locationsDepartment_
{

}


._locationsDepartment_
h1{
  margin: 5px ;
}

._locationsDepartment_
._stock_Location_{
  margin: 5px ;
}


._locationsDepartment_ ._stock_Location_ ._stock{
    width: 180px;
}


._locationsDepartment_ ._stock_Location_ ._stock p{
  margin: 8px 0 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  text-transform: capitalize;
}

._locationsDepartment_ ._stock_Location_ ._stock .__amount__{
  margin: 4px 0 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
}


._locationsDepartment_ ._stock_Location_ ._stock .__amount__{
  text-align: right;
  min-width: 80px;
}


._locationsDepartment_ p{   
  margin: 4px 9px 9px 0;
  color: #6d6d60;
  font: 500 14px/17px Roboto,sans-serif;
  
}




._locationsDepartment_ ._deptName{   
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

._locations_dept_ ._location_ .payment_details._total2  {
  position: relative;
  max-width: 57%;
}

._locations_dept_ ._location_ .locations {
 
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}





`




















