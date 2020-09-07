import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {
  getThumbnail, 
  OpenWatchDialog, 
  getMoviesById, 
  UpdateDetails,
  getStoryArtById 
} from '../actions/common'


import CheckBoxSlide from './CheckBoxSlide'

import {Icon2} from './Icons'
import { NavLink } from 'react-router-dom'


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
 
  const dispatch = useDispatch();

  const _openMd = (dmz, item,_id) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;    
    data['props']={dmz:dmz,item:item};  
    OpenWatchDialog(dispatch,data);
  }
  
  
  const _getThumbnail = (url) => {
    getThumbnail(url,dispatch);
  }

  const _getVideosById= (q,operation) => {
    getMoviesById(q, dispatch, operation);
  }

  const _getstoryArtsById= (q,operation) => {
    getStoryArtById(q, dispatch, operation);
  }

  return { 
    observeChanges,  
    _openMd,  
    _getThumbnail, 
    _getVideosById, 
    _getstoryArtsById 
  }

}




var itemData = {
  
}


const RowViewPort = (props) => {
  const {  data,  typeBrowse, _key_, _ID } = props;  
  const [initialize, setInitialize] = useState(false);  
  let _idK = `_**_${_ID}_${typeBrowse}_row_`;


  const scrollhandler = () => {
    let _evnt = _Util.getEventStore();
    let sc = _evnt["scrollPosition"] || 0;
    if(!initialize){
      let cmp =document.getElementById(_idK);
      if(cmp){
        let dm =_Util.offset(cmp);
        var _top = dm.top;
        let delay = 1600;
        if(_top>=sc-100 && _top<=(sc+window.innerHeight)+(sc>500?delay:0)){
          setInitialize(true);          
          let timeOut = itemData[_idK]["timeOut"];
          if(timeOut){
            clearInterval(timeOut);
            itemData[_idK]["timeOut"] = null;
          }
          let _state = _Util.getStore();
          if(_state[`_${typeBrowse}_row_`]===_key_ && !itemData[_idK][_key_] && typeof props.updLastIndex === "function"){
            props.updLastIndex(_key_);
            itemData[_idK][_key_] = 1;
          }
        }
      }
    }
  }
  
 
  
  
  useEffect(() => {    
    if(!itemData[_idK]){
      itemData[_idK] = {} 
    }   
    let _state = _Util.getStore();
    let maxIndex = _state[`_${typeBrowse}_row_`] || 0;
    if(maxIndex<_key_){
      _Util.updStore(`_${typeBrowse}_row_`,_key_)
    }  
    if(!initialize && !itemData[_idK]["timeOut"]){      
      itemData[_idK]={}
      itemData[_idK]["timeOut"] = setInterval(()=>{
        scrollhandler();
      },50);
    }
    return function cleanup() {
      let timeOut = itemData[_idK]["timeOut"];
      if(timeOut){
        clearInterval(timeOut);
        itemData[_idK]["timeOut"] = null;
      }
    }
  });
  

  return (    
    <div  id={_idK} className={`_dsplFlx containerGrid spaceAround _flxWrp`}>
    {_Util.ObjectKeys(data).map((_grTGid,_grTGid_ind)=>{
      let _item = data[_grTGid];
      _item["id"] = _grTGid;
      return (
        <>
          {initialize?
          <RowItemViewPort _item={_item} key={_grTGid_ind} indX={_grTGid_ind} _id={`${_grTGid}_img`} _idK={_idK} rowNumber={_key_} typeBrowse={typeBrowse}/>
          :
          <>
          {_key_>9?
          <div key={_grTGid_ind}  className={`loadingTitle pulsate ratio-16x9`}></div>:    
          <div key={_grTGid_ind}  className={`loadingTitle pulsate ratio-16x9`} style={{height:"200px"}}></div>
          }
          </>
          }
        </> 
      )
    })}
    </div>                                      
  )

}



export default RowViewPort;






















const RowItemViewPort = (props) => {
  const { 
    observeChanges
  } = useObserveChanges();

  const {  _item, indX } = props;

  const [initialize, setInitialize] = useState(false); 
  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()

  useEffect(() => {    
    if(!initialize){
      setInitialize(true);
    }
    return function cleanup() {
    }
  });

  let usersFBList = _state["usersFBList"];
  let dt = usersFBList && usersFBList[_item.id]

  let isActive = dt && dt['isActive'] && dt['isActive']['active'];
 
  const updActive = (e) => {
    // let id = _state['ActiveUser'];
    let h = dt && dt['isActive'];
    h["active"] = e;
    UpdateDetails(_item.id, {isActive:h})
  }

  const openDetails = () => {
    _Util.updStore('ActiveUser',_item.id)
  }
  
  

  return (
    <div className={`pym81b boxCard`}>
       <NavLink  to={{pathname:"/details", search:'?id='+_item.id}} className="" onClick={()=>openDetails()}>
        <p className={`_Id_card `}>
          {_item.id}
        </p>
        <div className={`_email_card `}>
          {_item.email}
        </div>
      </NavLink>
      <div className={`_email_card _dsplFlx spaceAround `}>
        <CheckBoxSlide icon={`more_vert`} field={"inStock"} updChange={(e)=>updActive(e)} initvalue={isActive} keyCode={keys[indX]}/>
        <div>
          <Icon2 name={'calendar'}/>
        </div>
      </div>
    </div>
  )


}