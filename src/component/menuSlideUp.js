


import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './_styles.css'

import {Icon2} from './Icons'
import { UpdateDetails, CloseWatchDialog, OpenWatchDialog} from '../actions/common';

import CheckBoxSlide from './CheckBoxSlide'
import MenuSlideUpProcessTime from './menuSlideUpProcessTime'

import MenuSlideUpSchedule from './menuSlideUpSchedule'


import { withRouter, NavLink} from 'react-router-dom';

import * as _Util from '../store/Util'


var notificationsWays = {
  "email":false,
  "sms":false,
  "webapp":false,
}




const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const dispatch = useDispatch(); 


  const _openMd = (_id, item) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;    
    data['props']={item:item};
    data['content']=<MenuSlideUpProcessTime />;
    OpenWatchDialog(dispatch,data);
  }


  const _openMdSchedule = (_id, item) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;
    data['content']=<MenuSlideUpSchedule />;
    OpenWatchDialog(dispatch,data);
  }




  return {
    _openMdSchedule,
    _openMd
  }
}








const Details = (props) => {
  

  const {
    _openMd,
    _openMdSchedule
  } = useObserveChanges();

  const { modalId, closePop } = props;

  const [initialize, setInitialize] = useState(false); 
  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()

  let searchHash = window.location.hash.split('?')[1]?window.location.hash.split('?')[1]:null;
 
  const router = _Util.parseQuery(searchHash);
  let _id = router.id?router.id:null;
  // const typeBrowse = window.location.hash.split('/')[1].split('?')[0];


  let usersFBList = _state["usersFBList"];
  const id  = _id || _state["ActiveUser"];

  const isAdmin  = _state["isAdmin"];

  




  let _item = usersFBList && usersFBList[id]
  const updActive = (e) => {
    // let id = _state['ActiveUser'];
    //let h = dt && dt['isActive'];
    //h["active"] = e;
    UpdateDetails(id, {running:e})
  }


  const openProcTime22 = (e) => { 
    closePop(1)
    _openMd()
    setTimeout(()=>  {},50)  
    //UpdateDetails(id, {running:e})
  }


  const openSchedule2 = (e) => { 
    closePop(1)
    _openMdSchedule()
  }
  
 
  const [ openNotification, setOpenNotification ] = useState(false); 
  const [ openScheduleBox, setopenScheduleBox ] = useState(false); 
  const [ procTimeView, setopenProcTimeView ] = useState(false); 
  



  const openSchedule = (e) => { 
    setopenScheduleBox(!openScheduleBox)
  }


  let servicesAreas = _item && _item["filters"]

  let notificationTypes = _item && _item["notificationTypes"]

  console.log(notificationTypes)

  const updsleepMode = (e) => {    
    UpdateDetails(id, {sleepMode:e})
  }  
  
  const updturtleMode = (e) => { 
    UpdateDetails(id, {turtleMode:e})
  }

  const updSpeedByHours = (e) => { 
    UpdateDetails(id, {speedByHours:e})
  }

  const openNotificationFunc = (e) => { 
    setOpenNotification(!openNotification)
  }
  
  const openProcTime = (e) => { 
    setopenProcTimeView(!procTimeView)
  }
  
  


  const updNotificationTypes = (e,f) => { 
    let sch = notificationTypes;
    sch[f] = e;
    UpdateDetails(id, {notificationTypes:sch});
  }
  



  const notificationActive = () => { 
    let ntf = []
    let isAct = false;
    _Util.ObjectKeys(notificationTypes).map(ntF=>{
      if(notificationTypes[ntF]){
        ntf.push(ntF);
        isAct = true;
      }
    })
    if(isAct){
      return ntf.join(', ')
    }else{
      return 'None'
    }
    
  }


  

  let isNot = true
  return (
      <>
        <div className={`optionsMenu boxCard`}>
          <div className={`slideWrp`}>
            <div className={`flexColor _dsplFlx `}>
              <h4>{"Options"}</h4>
              <div className="previewModal-close" data-uia="previewModal-closebtn"  onClick={()=>closePop(1)} >
                  <Icon2 name={'Xclose'} color={'currentColor'} />
              </div>
            </div>
            <div className={openScheduleBox ?`active SlideboxCard `:"SlideboxCard"}>
              <div className={`_dsplFlx spaceAround  `} onClick={()=>openSchedule()}>
                <div className={`_dsplFlx flxbsc90 ${openScheduleBox?'_marginTitle':''}`} >
                  <div className={`_dsplFlx`}>
                    <p className={`_icon_on_menu `} >
                      <Icon2 name={'calendar'} color={`#d3d3d3`}/>
                    </p>
                    <h4>Schedule</h4>
                  </div>
                </div>
                <div className={`flxbsc10 alignSelf`}>
                  <p className={`_icon_on_menu `} >
                    <Icon2 name={openScheduleBox?'Xclose':'timer_outline'} color={`#ff7817`}/>
                  </p>
                </div>
              </div>
              <div className={openScheduleBox?`scheduleDrop _open`:"scheduleDrop"}>
                {openScheduleBox ?
                  <MenuSlideUpSchedule />:
                null}
              </div>
            </div>
            <div className={openNotification ?`active SlideboxCard `:"SlideboxCard"}>
            <div className={`_dsplFlx spaceAround `}  onClick={()=>openNotificationFunc()}>         
                <div className={`_dsplFlx flxbsc50  ${openNotification?'_marginTitle':''}`}  >
                  <div className={`_dsplFlx`}>
                    <p className={`_icon_on_menu `} onClick={()=>{}}>
                      <Icon2 name={isNot?'notifications_active':'notifications_off'} color={`#d3d3d3`}/>
                    </p>
                    <h4>Notification</h4>
                  </div>
                </div>
                <div className="flexSpace"/>
                <div className={`alignSelf`} >
                  {openNotification?
                  <p className={`_icon_on_menu `} >
                    <Icon2 name={'Xclose'} color={`#ff7817`}/>
                  </p>
                  : 
                  <p className={`_notification_label `} >
                    <span>{notificationActive()}</span>
                  </p>
                  }
                </div>
              </div>
              <div className={openNotification?`scheduleDrop _open`:"scheduleDrop"}>
                {openNotification ?
                  <div className={` notificationBox`} >
                    <div className={`_dsplFlx spaceAround `}>         
                        <div className={`_dsplFlx flxbsc80`}>
                          <div className={`_dsplFlx`}>
                            <p className={`_icon_on_menu `} onClick={()=>{}}>
                              <Icon2 name={'email'} color={`#d3d3d3`} size={18}/>
                            </p>
                            <h5>Email</h5>
                          </div>
                        </div>
                        <div className={`flxbsc20 alignSelf`}>
                          <CheckBoxSlide icon={`more_vert`} field={"email"} updChange={(e)=>updNotificationTypes(e,'email')} initvalue={notificationTypes && notificationTypes['email']} keyCode={keys[85]}/>
                        </div>
                    </div>
                    <div className={`_dsplFlx spaceAround `}>         
                      <div className={`_dsplFlx flxbsc80`}>
                        <div className={`_dsplFlx`}>
                          <p className={`_icon_on_menu `} onClick={()=>{}}>
                            <Icon2 name={'sms'} color={`#d3d3d3`} size={18}/>
                          </p>
                          <h5>SMS</h5>
                        </div>
                      </div>
                      <div className={`flxbsc20 alignSelf`}>
                        <CheckBoxSlide icon={`more_vert`} field={"sms"} updChange={(e)=>updNotificationTypes(e,'sms')} initvalue={notificationTypes && notificationTypes['sms']} keyCode={keys[85]}/>
                      </div>
                    </div>
                    <div className={`_dsplFlx spaceAround `}>         
                      <div className={`_dsplFlx flxbsc80`}>
                        <div className={`_dsplFlx`}>
                          <p className={`_icon_on_menu `} onClick={()=>{}}>
                            <Icon2 name={'notification_webApp'} color={`#d3d3d3`} size={18}/>
                          </p>
                          <h5>WebApp</h5>
                        </div>
                      </div>
                      <div className={`flxbsc20 alignSelf`}>
                        <CheckBoxSlide icon={`more_vert`} field={"webapp"} updChange={(e)=>updNotificationTypes(e,'webapp')} initvalue={notificationTypes && notificationTypes['webapp']} keyCode={keys[85]}/>
                      </div>
                    </div>
                  </div>
                  :null}
              </div>
            </div>
            
            {isAdmin?
            <>
            <div className={procTimeView ?`active SlideboxCard `:"SlideboxCard"}>
              <div className={`_dsplFlx spaceAround `}>
                <div className={`_dsplFlx flxbsc90  ${procTimeView?'_marginTitle':''}`}  onClick={()=>openProcTime()}>
                  <div className={`_dsplFlx`}>
                    <p className={`_icon_on_menu `} >
                      <Icon2 name={'setting'} color={`#d3d3d3`}/>
                    </p>
                    <h4>Process Time</h4>
                  </div>
                </div>
                <div className={`flxbsc10 alignSelf`}>
                  <p className={`_icon_on_menu `} >
                    <Icon2 name={'speedometer'} color={`#ff7817`}/>
                  </p>
                </div>
              </div>
              <div className={procTimeView?`scheduleDrop _open`:"scheduleDrop"}>
                  {procTimeView ? 
                    <MenuSlideUpProcessTime />
                  :null}
              </div>
            </div>
            <div className={`_dsplFlx spaceAround `}>
                <div className={`_dsplFlx flxbsc80`}>
                  <div className={`_dsplFlx`}>
                    <p className={`_icon_on_menu `} onClick={()=>{}}>
                      <Icon2 name={'moon'} color={`#d3d3d3`}/>
                    </p>
                    <h4>Sleep Mode</h4>
                  </div>
                </div>
                <div className={`flxbsc16 alignSelf`}>
                  <CheckBoxSlide icon={`more_vert`} field={"sleepMode"} updChange={(e)=>updsleepMode(e)} initvalue={_item && _item['sleepMode']} keyCode={keys[75]}/>
                </div>
            </div> 
            <div className={`_dsplFlx spaceAround `}>
                <div className={`_dsplFlx flxbsc80`}>
                  <div className={`_dsplFlx`}>
                    <p className={`_icon_on_menu `} onClick={()=>{}}>
                      <Icon2 name={'tortoise'} color={`#d3d3d3`}/>
                    </p>
                    <h4>Turtle Mode</h4>
                  </div>
                </div>
                <div className={`flxbsc16 alignSelf`}>
                  <CheckBoxSlide icon={`more_vert`} field={"turtleMode"} updChange={(e)=>updturtleMode(e)} initvalue={_item && _item['turtleMode']} keyCode={keys[95]}/>
                </div>
            </div> 
            <div className={`_dsplFlx spaceAround `}>
                <div className={`_dsplFlx flxbsc80`}>
                  <div className={`_dsplFlx`}>
                    <p className={`_icon_on_menu `} onClick={()=>{}}>
                      <Icon2 name={'speedometer'} color={`#d3d3d3`}/>
                    </p>
                    <h4>Speed By Hours</h4>
                  </div>
                </div>
                <div className={`flxbsc16 alignSelf`}>
                  <CheckBoxSlide icon={`more_vert`} field={"speedByHours"} updChange={(e)=>updSpeedByHours(e)} initvalue={_item && _item['speedByHours']} keyCode={keys[85]}/>
                </div>
            </div>
            </>
            :null}
        </div> 
      </div>       
    </>
  );
}  


export default withRouter(Details)

