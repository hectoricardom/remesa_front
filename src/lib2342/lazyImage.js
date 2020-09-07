import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {getThumbnail} from '../actions/common'


import WithScroll from './scroll-decorator'



const useObserveChanges = () => {  
  const observeImage =  useSelector(state => state.observeImage);
  
  const dispatch = useDispatch();

  const _getThumbnail = (url) => {
    getThumbnail(url,dispatch);
  }
  
  return { observeImage, _getThumbnail }
}

// 8665785409
// a61c-f2-5a3d

// 4307 estate dr, louisville, Kentucky, 40216;  


const scrollhandler = (sc,lzId,src,visible,setVisible,_getThumbnail) => {
  if(!visible){
    let Elm = document.getElementById(lzId);
    var dm = Elm.getBoundingClientRect();
    var _top = dm.top;
    if(_top>=sc && _top<=(sc+window.innerHeight)){
      _getThumbnail(src);
      //setTimeout(()=>{ },500);
      setVisible(true);
    }
  }
}


const LazyImage = (props) => {
  const { observeImage, _getThumbnail } = useObserveChanges();

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys();
    
  const { src } = props;
  const [visible,setVisible] = useState(false);
  let lzId = keys?`${keys[88]}_${src}_`:'';
  var _src = '';
  var _thumbnailJson = _state['thumbnailJsonBlob'] && _state['thumbnailJsonBlob'][src];
  let _blob = _thumbnailJson ? _thumbnailJson['blob'] : _src;
  
  let isLandscape = _thumbnailJson && _thumbnailJson["width"]>_thumbnailJson["height"];

  

  return (
      < >
        <WithScroll scrollhandler={(e)=>scrollhandler(e,lzId,src,visible,setVisible,_getThumbnail)}/>       
        {_blob?<img id={lzId} alt={''} className={_blob && isLandscape?`isLandscape`:"portrait"} src={_blob}/>:<div id={lzId} ></div>}
      </>
  )
}

export default LazyImage



const txt_styles = `

.fieldPadding{
  padding: 15px 6px 7px;
}

._separateBtn{
  margin-left: 16px;
}

.V639qd.J9Nfi .R6Lfte {
  letter-spacing: .00625em;
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
}


.oEOLpc .R6Lfte {
  padding-bottom: 0;
}
.tOrNgd {
  padding: 22px 24px 18px 24px;
}

.x1LMef {
  color: rgba(0,0,0,0.54);
  font: 400 1rem/1.5rem Roboto,Arial,sans-serif;
  line-height: 24px;
}



.dialogsdfa{
background-color: #fff; 
padding: 25px;
min-height:65px;  
}
.dialogsdfa p{
margin: 5px;
color: firebrick; 
}

.V639qd.J9Nfi {
border-radius: 8px;
min-width: 280px;
}






.A9Uzve {
  max-width: 100vw;
  overflow: visible;
  position: absolute;
  width: 320px;
}
.g3VIld {
  -webkit-box-align: stretch;
  box-align: stretch;
  align-items: stretch;
  display: flex;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  flex-direction: column;
  transition: transform .225s cubic-bezier(0.0,0.0,0.2,1);
  position: relative;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24);
  max-width: 24em;
  outline: 1px solid transparent;
  overflow: hidden;
}


.XfpsVe {
flex-wrap: wrap-reverse;
}

.V639qd .XfpsVe {
  padding: 24px 16px 16px 16px;
}

.XfpsVe {
  display: flex;
  flex-shrink: 0;
  box-pack: end;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding: 24px 24px 16px 24px;
}


.VfPpkd-LgbsSe .VfPpkd-Jh9lGc::before, .VfPpkd-LgbsSe .VfPpkd-Jh9lGc::after {
top: calc(50% - 100%);
left: calc(50% - 100%);
width: 200%;
height: 200%;
}

`