


import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './_styles.css'

import {Icon2} from './Icons'
import { UpdateDetails, CloseWatchDialog, OpenWatchDialog} from '../actions/common';

import InputText from './InputHr'

import { withRouter, NavLink} from 'react-router-dom';

import * as _Util from '../store/Util'



const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
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

  return { 
    close,
    _openMd
  }
}








const Details = (props) => {
  

  const {
    _openMd,
    close
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





  let _item = usersFBList && usersFBList[id]
  let processTime = _item && _item["processTime"]

  console.log(processTime)

  const updActive = (e) => {
    // let id = _state['ActiveUser'];
    //let h = dt && dt['isActive'];
    //h["active"] = e;
    ///UpdateDetails(id, {running:e})
  }


  const openSetting = (e) => { 
    //UpdateDetails(id, {running:e})
  }

  
  const updSlow = (e,f) => {
    //console.log(e,f)
    let h = processTime;
    h[f] = e;
    //console.log({processTime:h})
     e && UpdateDetails(id, {processTime:h})
  }

  const updlightSpeed = (e) => { 
    e && UpdateDetails(id, {speedLight:e})
  }


  
  return (
      <>
        <div className={`notificationBox`}>
          <div className={``}>
            <div className={`_dsplFlx spaceAround `}>         
                <div className={`_dsplFlx flxbsc40`}>
                  <div className={`_dsplFlx`}>
                    <p className={`_icon_on_menu `} onClick={()=>{}}>
                      <Icon2 name={'tortoise'} color={`#d3d3d3`}/>
                    </p>
                    <h4>Slow 1</h4>
                  </div>
                </div>
                <div className={`flxbsc60 alignSelf`}>
                {processTime?  <InputText icon={`more_vert`} field={"slow1"} validations={{number:true}} OnChange={(e)=>updSlow(e, 'slow1')} initvalue={processTime && processTime['slow1']} keyCode={keys[85]}/> :null}
                </div>
            </div>
            <div className={`_dsplFlx spaceAround `}>
                <div className={`_dsplFlx flxbsc40`}>
                  <div className={`_dsplFlx`}>
                    <p className={`_icon_on_menu `} onClick={()=>{}}>
                      <Icon2 name={'tortoise'} color={`#d3d3d3`}/>
                    </p>
                    <h4>Slow 2</h4>
                  </div>
                </div>
                <div className={`flxbsc60 alignSelf`}>
                {processTime? <InputText icon={`more_vert`} field={"slow2"} validations={{number:true}} OnChange={(e)=>updSlow(e, 'slow2')} initvalue={processTime['slow2']} keyCode={keys[75]}/> :null}
                </div>
            </div> 
            <div className={`_dsplFlx spaceAround `}>
                <div className={`_dsplFlx flxbsc40`}>
                  <div className={`_dsplFlx`}>
                    <p className={`_icon_on_menu `} onClick={()=>{}}>
                      <Icon2 name={'tortoise'} color={`#d3d3d3`}/>
                    </p>
                    <h4>Light</h4>
                  </div>
                </div>
                <div className={`flxbsc60 alignSelf`}>
                {_item? <InputText icon={`more_vert`} field={"speedLight"} validations={{number:true}} OnChange={(e)=>updlightSpeed(e)} initvalue={_item['speedLight']} keyCode={keys[95]}/> :null}
                </div>
            </div>
        </div> 
      </div>       
    </>
  );
}  
// JAMI CARPENTER 5026193662

export default withRouter(Details)

