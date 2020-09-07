import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../lib/Util'
import Icons from './Icons'
import {OpenModal, CloseModal} from '../actions'


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const dialog=  useSelector(state => state.listDialog);
  const navigations =  useSelector(state => state.navigations);
  let _state =  useSelector(state => state);
  let list = dialog;
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id, list:list});
  }

  const updNavigations = (v, actionFetch, operations) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'navigations',value:v}
    })  
    setTimeout(()=>{
      actionFetch(dispatch, _state, operations);
    },80)
    
  }


  return { observeChanges, navigations,  list, close, updNavigations }
}







const NavigationTablet = (props) => {
  
  return (
    <div className="nH aqK">
        <div className="navigator_bar">
          <TabletNavigatorControls operation={props.operations} actionFetch={props.actionFetch}/>
        </div>
    </div>
  )
}

/*
 navigationLoading={navigationLoading} 
            handlePrev={this.handlePrev.bind(this)}  
            handleNext={this.handleNext.bind(this)}
            requestSort={this.requestSort.bind(this)}
            requestLimitUpd={this.requestLimitUpd.bind(this)}
            
*/

export default NavigationTablet


const TabletNavigatorControls = (props) => {
 

const handleOnMouseIn = (e, setVisible, visible) => { 
  setTimeout(()=>{
    if(!visible && typeof setVisible === "function"){
      setVisible(true)
    }
  },80)
}


const handleOnMouseOut = (e, setVisible, visible, nav_Id, nav_pop_Id  ) => {  

 
  let Cnt = document.getElementById(nav_Id);


 
  let CntPop = document.getElementById(nav_pop_Id);
  
  var toElement = e.toElement || e.relatedTarget || e.target;  
  

  // console.log({toElement}, CntPop.contains(toElement), Cnt.contains(toElement))

  if(toElement.document){
    setTimeout(()=>{
      if(visible && typeof setVisible === "function"){
        setVisible(false)
      }
    },80)
  }
  else{
    try{
      if(CntPop.contains(toElement)){    
       
      }
      else if(Cnt.contains(toElement)){    
        
      }else{
        setTimeout(()=>{
          if(visible && typeof setVisible === "function"){
            setVisible(false)
          }
        },80)
      }
    }
    catch(e){
      setTimeout(()=>{
        if(visible && typeof setVisible === "function"){
          setVisible(false)
        }
      },80)
    } 
  }  
}




const handleLimitOnMouseOut = (e, setVisible, visible, nav_pop_Id_Limit  ) => {   
  let CntPop = document.getElementById(nav_pop_Id_Limit);  

  var toElement = e.toElement || e.relatedTarget || e.target;  

  if(toElement.document){
    setTimeout(()=>{
      if(visible && typeof setVisible === "function"){
        setVisible(false)
      }
    },80)
  }
  else{
    try{
      if(CntPop.contains(toElement)){    
        
      }
      else{
        setTimeout(()=>{
          if(visible && typeof setVisible === "function"){
            setVisible(false)
          }
        },80)
      }
    }
    catch(e){
      setTimeout(()=>{
        if(visible && typeof setVisible === "function"){
          setVisible(false)
        }
      },80)
    } 
  }  
}







const handlePrev = (operation, navigations, updNavigations,actionFetch) => { 
  let nav = navigations;
  let _nav =  nav[operation];
  if(_nav['page']>1){
    setTimeout(()=>{ 
      _nav['page'] -=1;
      _nav['navigationLoading'] = true;
      nav[operation] = _nav;     
      console.log( operation)
      console.log(nav)
      updNavigations(nav, actionFetch, operation);
    },40)
  }
}

const handleNext = (operation, navigations, updNavigations,actionFetch) => {
  let nav = navigations; 
  let _nav =   nav[operation];
  let _page = _nav['page']?_nav['page']:1;
  let lastPg = Math.floor(_nav['total'] / _nav['limit']);
  if(_page<=lastPg){
    setTimeout(()=>{  
      _page +=1;
      _nav['page'] = _page;
      _nav['navigationLoading'] = true;
      nav[operation] = _nav;
      console.log( operation)
      console.log(nav)
      updNavigations(nav, actionFetch, operation);
    },40)
  }
}



const requestSort = (e) => { 
  setTimeout(()=>{
    //_th.setState({visible:true});
  },80)
}


const requestLimitUpd = (e) => { 
  setTimeout(()=>{
    //_th.setState({visible:true});
  },80)
}


  const {operation, actionFetch , popMenu} = props ;
  
  const [nav_Id] = useState(_Util.gen12CodeId());
  const [nav_pop_Id,] = useState(_Util.gen12CodeId());
  const [nav_pop_Id_Limit] = useState(_Util.gen12CodeId());
  const [visible_Limit_Pop, setVisible_Limit_Pop] = useState(false);
  const [visible, setVisible] = useState(false);
 
  
  const { updNavigations, navigations  } = useObserveChanges();
  
 
  let _navigations  =  navigations && operation &&  navigations[operation]?navigations[operation]:{};
 
  const {navigationLoading, total, limit, page, sort } = _navigations;

  var _page  = page?page>=1?page:1:1;
  var _limit  = limit || 50; 
  let _total = total || 0;
  let _sort = sort;
  let start = (_page-1)*_limit<_total?(_page-1)*_limit:_total;
  let end = (_page)*_limit <= _total?(_page)*_limit:_total ;

  let lastPg = Math.ceil(_total / _limit);
  let _nxBtn = false, _prvBtn = false;
  if(_page<lastPg){
    _nxBtn = true
  }
  if(_page>1){
    _prvBtn = true
  }
  return (
    <>
     <div className={`navigator_controls ${visible?"_visible":""} `}>
          <span className="navigator_controls_span">
            <div className="flexSpace"/>
            <div >
              <div  className={`_dsplFlx`}> 
                <div id={`${nav_Id}`} className={`_navigation_counters`}  onMouseEnter={(e)=>handleOnMouseIn(e, setVisible, visible)} onMouseLeave={(e)=>handleOnMouseOut(e, setVisible,visible, nav_Id, nav_pop_Id )}>
                {navigationLoading? 
                  <div className={`_counters_Wrp`}>
                    <div>loading ... </div>
                  </div>:
                  <div className={`_counters_Wrp`}>
                    <span>{start}</span> <span>-</span> <span>{end}</span> <span>de</span> <span>{_total}</span>
                  </div>
                  }
                </div>
                <div className={`_navigation_actions`}>
                  <div className={''}  onClick={()=>handlePrev(operation, navigations, updNavigations, actionFetch)}>
                    <Icons name={'arrow_left'} color={'#555'} size={20} tooltip={'prev'} ripple={_prvBtn}/>
                  </div>                
                  <div className={''}  onClick={()=>handleNext(operation, navigations, updNavigations, actionFetch)}>
                    <Icons name={'arrow_right'} color={'#555'} size={20} tooltip={'next'} ripple={_nxBtn}/>
                  </div>
                  <div className={``}  onClick={()=>setVisible_Limit_Pop(true)}>
                    <Icons name={'setting'} color={'#555'} size={20} tooltip={'setting'} ripple={true} />
                  </div>
                </div>
              </div>
              { popMenu && 
              <div id={`${nav_pop_Id}`} className={`popFloat`}  onMouseLeave={(e)=>handleOnMouseOut(e,  setVisible, visible, nav_Id, nav_pop_Id )}>
               { popMenu && visible && <div className="popFloatWrapper" style={{userSelect: "none"}}>
                      <div id=":110" className={`_pop_item_ ${!_sort?'_active_item_ ':'_disabled_item_'}`} role="menuitem" style={{userSelect: "none"}} aria-disabled={_sort?false:true}  onClick={()=>requestSort(true)}>
                        <div className="_pop_item_label_" style={{userSelect: "none"}}>{_Util.translatetext(308)}</div>
                      </div>
                      <div id=":113" className={`_pop_item_ ${_sort?'_active_item_ ':'_disabled_item_'}`} role="menuitem" aria-disabled={_sort?true:false} style={{userSelect: "none"}}  onClick={()=>requestSort(false)}>
                        <div className="_pop_item_label_" style={{userSelect: "none"}}>{_Util.translatetext(307)}</div>
                      </div>
                </div>
                }
              </div>
            }
            { popMenu && 
              <div id={`${nav_pop_Id_Limit}`} className={`popFloat ${popMenu && visible_Limit_Pop?'_show':''}`}  onMouseLeave={(e)=>handleLimitOnMouseOut(e,setVisible_Limit_Pop, visible_Limit_Pop, nav_pop_Id_Limit)} >
               { popMenu && visible_Limit_Pop && <div className="popFloatWrapper" style={{userSelect: "none"}}>
                      <div id=":110" className={`_pop_item_ ${_limit!==50?'_active_item_ ':'_disabled_item_'}`} role="menuitem" style={{userSelect: "none"}}  onClick={()=>requestLimitUpd(50)}>
                        <div className="_pop_item_label_" style={{userSelect: "none"}}>{50}</div>
                      </div>
                      <div id=":113" className={`_pop_item_ ${_limit!==100?'_active_item_ ':'_disabled_item_'}`} role="menuitem"  style={{userSelect: "none"}}  onClick={()=>requestLimitUpd(100)}>
                        <div className="_pop_item_label_" style={{userSelect: "none"}}>{100}</div>
                      </div>
                      <div id=":113" className={`_pop_item_ ${_limit!==150?'_active_item_ ':'_disabled_item_'}`} role="menuitem" style={{userSelect: "none"}}  onClick={()=>requestLimitUpd(150)}>
                        <div className="_pop_item_label_" style={{userSelect: "none"}}>{150}</div>
                      </div>
                </div>
                }
              </div>
            }
            </div>
            
          </span>
          
        </div>
        <style>
          {
             
              `
              .navigator_controls_span{
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                min-height: 38px;
              }
              
              ._navigation_counters{ 
                position: relative;
                display: inline-block;
                width: 136px;
                margin-top: 7px;
              }
              
              ._counters_Wrp{
                position: relative;
                -webkit-font-smoothing: auto;
                font-size: .75rem;
                letter-spacing: .3px;
                font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
                text-decoration: none;
                padding: 10px 5px 8px;
                max-width: 135px;
                color: #5f6368;
                text-align: right;
              }
              
              
              
              ._counters_Wrp::before {
                content: '';
                display: block;
                opacity: 0;
                position: absolute;
              
                z-index: -1;
                bottom: 0;
                left: 0;
                right: 0;
                top: 0;
                background: #202124;
                border-radius: 4px;
                -webkit-transform: scale(0);
                transform: scale(0);
              
                -webkit-transition-duration: .15s;
                transition-duration: .15s;
                -webkit-transition-timing-function: cubic-bezier(0.4,0.0,0.2,1);
                transition-timing-function: cubic-bezier(0.4,0.0,0.2,1);
                -webkit-transition-property: opacity,-webkit-transform;
                transition-property: opacity,-webkit-transform;
                transition-property: transform,opacity;
                transition-property: transform,opacity,-webkit-transform;
              }
              
              ._visible  ._navigation_counters ._counters_Wrp::before{
                opacity: .12;
                transform: scale(1);
                opacity: .12;
              }
              
              
              
              .popFloat {
                -webkit-border-radius: 0;
                border-radius: 0;
                -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                -webkit-transition: opacity .218s;
                transition: opacity .218s;
                background: #fff;
                border: 1px solid #ccc;
                border: 1px solid rgba(0,0,0,.2);
                cursor: default;
                font-size: .875rem;
                margin: 0;
                outline: none;
                padding: 6px 0;
                position: absolute;
              
              }
              
              
              
              
              
              .popFloat {
                  -webkit-font-smoothing: antialiased;
                  font-size: .875rem;
                  letter-spacing: .2px;
                  border: none;
                  -webkit-border-radius: 4px;
                  border-radius: 4px;
                  -webkit-box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
                  box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
                  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
                  line-height: 20px;
                  opacity: 0;
                  max-height: 600px;
                  overflow: auto;
                  z-index: 7;
              }
              
              
              
              .popFloatWrapper {
                -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 1px solid #ccc;
                border: 1px solid rgba(0,0,0,0.2);
                padding: 5px;
              }
              
              
              
              .popFloat .popFloatWrapper {
                -webkit-box-shadow: none;
                -webkit-box-shadow: none;
                box-shadow: none;
                border: none;
                padding: 0;
              }
              
              ._show.popFloat{
                opacity: 1;
                transition-delay: 120ms;
              } 
              
              
              ._visible .popFloat{
                opacity: 1;
                transition-delay: 120ms;
              } 
              
              
              
              
              
              ._disabled svg {
                opacity: 0.55;
              }
              
              




              ._navigation_actions{
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;    
                margin: 6px 7px 0px 13px;
              }







              ._navigation_actions
              .IconRippleEffectContainer{
                height: 20px;
                width: 20px;
                margin: 0px 7px 0;
              }






              ._pop_item_ {
                padding-bottom: 6px;
                padding-top: 6px;
                color: #202124;
                padding-left: 48px;
                padding-right: 48px;
              }



              ._pop_item_ {
                position: relative;
                color: #333;
                cursor: pointer;
                list-style: none;
                margin: 1px 0;
                padding: 6px 8em 6px 48px;
                white-space: nowrap;
              }




              ._active_item_  {
                border-style: none;
              }


              ._active_item_  {
                background-color: #eee;
                border-color: #eee;
                border-style: dotted;
                border-width: 1px 0;
                padding-top: 5px;
                padding-bottom: 5px;
              }


              ._disabled_item_, ._disabled_item_ {
                color: #ccc!important;
              }
              





              ._pop_item_._active_item_:hover {
                background-color: #e2e2e2;
              }
              .J_pop_item_._active_item_:hover
              ._pop_item_label_{
                color: #5c5c5c;
                font-family: "Google Sans",Roboto,Arial,sans-serif;
                font-size: .875rem;
                font-weight: 500;
                letter-spacing: .0107142857em;
              }
              
              
              ._active_item_ ._pop_item_label_ {
                color: #333;
              }
              
              
              ._pop_item_label_ {
                -webkit-align-items: center;
                align-items: center;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                -webkit-justify-content: space-between;
                justify-content: space-between;
                position: relative;
              }
              
              
              .J-N-JE .J-N-atj, .J-N-JE ._pop_item_label_ {
                color: #ccc!important;
              }
              
              
              ._pop_item_label_, .J-Ks {
                -webkit-align-items: center;
                align-items: center;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                -webkit-justify-content: space-between;
                justify-content: space-between;
                position: relative;
              }
              
              

              
              `
 


          }
        </style>
      </>
    )
 // }
}

