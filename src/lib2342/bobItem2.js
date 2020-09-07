import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {getThumbnail, OpenWatchDialog, CloseWatchDialog } from '../actions/common'


/*
import Icons from './Icons'
import WithScroll from './scroll-decorator'
import LazyImage from './lazyImage'
*/


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  //const observeImage =  useSelector(state => state.observeImage);
  
  const dispatch = useDispatch();




  const _openMd = (dmz, item,_id) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;    
    data['props']={dmz:dmz,item:item};    
    //console.log(data)
    OpenWatchDialog(dispatch,data);
  }
  
  const closeMd = (Id) => {
    CloseWatchDialog(dispatch,{id:Id});
  }


  return { observeChanges,  _openMd, closeMd }
}



var itemData = {}


const TitleCardHRM = (props) => {

  const {  observeChanges, _openMd, close, dispatch } = useObserveChanges();
  ///const [collapse, setcollapse] = useState(true);
  const {  data, _item, indx, _key_ } = props;
  let keys = _Util.getGlobalsKeys()
  let _state = _Util.getStore();

  const [initialize, setInitialize] = useState(false); 
  // const [timeOut, settimeOut] = useState(null); 
  
  let _idK = `${_item.id}_${_item.id}_bItem`;

  
  const open = () => {
    let cmp =document.getElementById(_idK);
    if(cmp){
      let dm =_Util.offset(cmp);
      _openMd(dm,_item)
    }
  }


 



  const scrollhandler = () => {
    let sc = _state["scrollPosition"] || 0;
    let _Elmm =document.getElementById(`data_ui_${keys[93]}`); 
    if(!initialize &&  _Elmm.style.position === "static"){ 
      let cmp =document.getElementById(_idK);

      if(cmp){
        let dm =_Util.offset(cmp);
        var _top = dm.top;
        if(_top>=sc && _top<=(sc+window.innerHeight)+(sc>2400?3500:0)){
          setInitialize(true);
          let timeOut = itemData[_idK]["timeOut"];
          if(timeOut){
            clearInterval(timeOut);
            itemData[_idK]["timeOut"] = null;
          }
        }
      }
    }
  }
  
 
  
  
  useEffect(() => {    
    if(!itemData[_idK]){
      itemData[_idK] = {} 
    }
    if(!initialize && !itemData[_idK]["timeOut"]){
      itemData[_idK]["timeOut"] = setInterval(()=>{
        scrollhandler()
      },50);
    }
  });
  

  return (    
    <>
      {initialize?
      <div id={_idK} style={initialize?{width:"350px",height:"200px"}:{}} onClick={()=>open()}>
        <img src={initialize && _item && _item.boxarts?_item.boxarts:"_blob"} alt={""}  />
      </div>
      :
      <>
      {_key_>20?<div id={_idK} ></div>:    
      <div id={_idK} style={{width:"350px"}}></div>
      }
      </>
      }
    </>                                   
  )


}




export default TitleCardHRM;