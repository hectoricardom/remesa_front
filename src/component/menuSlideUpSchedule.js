


import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './_styles.css'

import {Icon2} from './Icons'
import { UpdateDetails, CloseWatchDialog, OpenWatchDialog} from '../actions/common';

import InputText from './InputText'

import CheckBoxSlide from './CheckBoxSlide'

import { withRouter, NavLink} from 'react-router-dom';

import * as _Util from '../store/Util'



const useObserveChanges = () => {
  const observeScheduleComponent =  useSelector(state => state.observeScheduleComponent);
  const dispatch = useDispatch(); 

  const _openMd = (_id, item) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;    
    data['props']={item:item};
    data['content']=null;
    OpenWatchDialog(dispatch,data);
  }

  const close = (Id) => {
    CloseWatchDialog(dispatch,{id:Id});
  }

  const updRdx = (Id) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeScheduleComponent',value:_Util.gen12CodeId()}
    })
  }

  return { 
    close,
    _openMd,
    updRdx
  }
}








const Schedule = (props) => {  
  const { closePop } = props;

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()

  let searchHash = window.location.hash.split('?')[1]?window.location.hash.split('?')[1]:null;
 
  const router = _Util.parseQuery(searchHash);
  let _id = router.id?router.id:null;
 

  let usersFBList = _state["usersFBList"];
  const id  = _id || _state["ActiveUser"];






  let _item = usersFBList && usersFBList[id];

  let scheduleList = _item && _item["schedule"];


  const openSetting = (e) => { 
    //UpdateDetails(id, {running:e})
  }

  const openHourly = (e) => {    
    //UpdateDetails(id, {sleepMode:e})
  }  

  
  const updActiveDay = (e, dWk) => { 
    let sch = scheduleList;
    sch[dWk]['active'] = e;
    UpdateDetails(id, {schedule:sch})
  }


 


  return (
      <>
        <div className={`notificationBox `}>
          <div className={``}>
            {/*
            <div className={`flexColor _dsplFlx`}>
              <h4>{"Schedule"}</h4>
              <div className="previewModal-close" data-uia="previewModal-closebtn"  onClick={()=>closePop(1)} >
                  <Icon2 name={'Xclose'} color={'currentColor'} />
              </div>
            </div>
            */}
            {scheduleList && _Util.ObjectKeys(scheduleList).map(dys=>{
              
              return(
                  <DayWK dys={dys} />
              )
            })}
            
        </div> 
      </div>       
    </>
  );
}  


// JAMI CARPENTER 5026193662

export default Schedule




const DayWK = (props) => {  
  const { dys } = props;

  const {
    updRdx
  } = useObserveChanges();

  

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()


  let searchHash = window.location.hash.split('?')[1]?window.location.hash.split('?')[1]:null;
 
  const router = _Util.parseQuery(searchHash);
  let _id = router.id?router.id:null;
 

  let usersFBList = _state["usersFBList"];
  const id  = _id || _state["ActiveUser"];


 

  let _item = usersFBList && usersFBList[id];

  let scheduleList = _item && _item["schedule"];

  let itm = scheduleList[dys];
  let dayName =itm && itm["dayName"] 
  let active =itm && itm["active"] 
  let start =itm && itm["start"] 
  let end =itm && itm["end"] 

  let isViewActive = _state["hourView"] === dys;  
  
  

  const openHourly = (e) => { 
    if(isViewActive){
      _Util.updStore('hourView',null);   
    }else{
      _Util.updStore('hourView',dys);   
    }
    updRdx()
  }
  
  const updActiveDay = (e, dWk) => { 
    let sch = scheduleList;
    sch[dWk]['active'] = e;
    UpdateDetails(id, {schedule:sch})
  }


  const _minus = (f) => { 
    let h = scheduleList;
    let ct = h[dys][f];
    h[dys][f] = parseInt(ct) - 1;
    if(h[dys][f]>0){
      UpdateDetails(id, {schedule:h})
    }
  }

  const _plus = (f) => {     
    let h = scheduleList;
    let ct = h[dys][f];
    h[dys][f] = parseInt(ct) + 1;
    if(h[dys][f]<=24){
      UpdateDetails(id, {schedule:h})
    }
  }
  


  return (
    <div>
      <div className={`_dsplFlx spaceAround `}>             
          <div className={`_dsplFlx flxbsc90`}>
            <div className={`_dsplFlx dayWk`}>
              <h4>{dayName}</h4>
              <div className={` alignSelf`}>
                <CheckBoxSlide icon={`more_vert`} field={"active"} updChange={(e)=>updActiveDay(e,dys)} initvalue={active} keyCode={`${keys[85]}_${dys}`}/>
              </div>
            </div>
          </div>
          <div className={`flxbsc10 alignSelf`}>
            <p className={`_icon_on_menu `} onClick={()=>openHourly()}>
              <Icon2 name={isViewActive?'Xclose':'timer_outline'} color={`#ff7817`}/>
            </p>
          </div>
      </div>
      <div className={isViewActive?`scheduleDrop _open`:"scheduleDrop"}>
        {isViewActive?<div>
          <div className={`_dsplFlx spaceAround dayWkWrp`}>
            <div>
              <div className={' _dsplFlx spaceAround'}>
                <div>
                  {'Start'}
                  <div className={'  _dsplFlx spaceAround  hours'}>{start}</div>
                </div>
              </div>
              <div className={'_dsplFlx spaceAround'}>
                  <div className={'__btnsSch__'}  onClick={()=>_minus('start')}>
                    <Icon2 name={'minus'} color={'#1967d2'} size={24}/>
                  </div>
                  <div className="flexSpace minMArg"/>
                  <div className={'__btnsSch__'}  onClick={()=>_plus('start')}>
                    <Icon2 name={'add'} color={'#1967d2'} size={24}/>
                  </div>
              </div>
            </div>
            <div>
              <div className={'  _dsplFlx spaceAround'}>
                <div>
                  {'End'}
                  <div className={'  _dsplFlx spaceAround hours'}>{end}</div>
                </div>
              </div>
              <div className={'  _dsplFlx spaceAround'}>
                  <div className={'__btnsSch__'}  onClick={()=>_minus('end')}>
                    <Icon2 name={'minus'} color={'#1967d2'} size={24}/>
                  </div>
                  <div className="flexSpace minMArg"/>
                  <div className={'__btnsSch__'}  onClick={()=>_plus('end')}>
                    <Icon2 name={'add'} color={'#1967d2'} size={24}/>
                  </div>
              </div>
            </div>
          </div>
        </div>:null} 
      </div> 
    </div>
  );
}  