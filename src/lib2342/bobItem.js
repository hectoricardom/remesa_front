import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {getThumbnail, OpenWatchDialog, CloseWatchDialog, getComponentStore } from '../actions/common'

import Icons from './Icons'
import WithScroll from './scroll-decorator'
import LazyImage from './lazyImage'



const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const observeImage =  useSelector(state => state.observeImage);
  const keys =  useSelector(state => state.keys); 

  const dispatch = useDispatch();

  const _getThumbnail = (url) => {
    getThumbnail(url,dispatch);
  }
  


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


  return { observeChanges,observeImage, _getThumbnail, keys, _openMd, closeMd }
}


let dtt = {}


const TitleCardHRM = (props) => {

  const {
    item,
    title,
    indexItem,
    isHover,
    keyCode,
    hv
  } = props;

  const {    
    _getThumbnail,
    observeImage,
    _openMd,
    closeMd,
    observeChanges

  } = useObserveChanges();

  const [hover, setHover] = useState(false);
  const [tmO, setTmO] = useState(null);




  const _listWathDialog = getComponentStore()['listWathDialog'] || {};
  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;


  let _kid = `${keys[44]}_${keyCode}_${item.id}_bItm`;

  if(!dtt[_kid]){
    dtt[_kid] = {};
  }
  
  dtt[_kid]["isHover"] = hv;
  
  const vv = (e) => {
    //if(dtt[_kid]["hover"] && dtt[_kid]["isHover"]){}
    if(dtt[_kid]["hover"]){ }  

      let cmp =document.getElementById(_kid);
      console.log("openModal");
      let dmz = offset(cmp); 
      _openMd(dmz,item,_kid);
   
    
  }

  function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft,width:rect.width }
  }


  const seeDetails = (e) => {
    let ev = e;
   // vv(ev)
    let ishdd = _listWathDialog && _listWathDialog[item.id];
    if(!ishdd || !dtt[_kid]["hover"]){
      dtt[_kid]["hover"] = true;
      dtt[_kid]["tmO"] = setTimeout(()=>{vv(ev)},250)
    }
  }
  


  let _view = false;

  let _blobSty = {
    transform: "scale(1.939999)",
    visibility: "visible",
    top: '0%',
    transitionDuration: "500ms"
  }

let _title =item && item["title"]?item["title"]:title?title:"";
let _boxarts = item && item["boxarts"]?item["boxarts"]:"klYzxjFOOX8DnQnW.jpg";
let _img = "klYzxjFOOX8DnQnW.jpg";
if(_boxarts.toString().indexOf("jpg")<=0){
  _img = _boxarts;
}


let deliveryMedia = item && item["delivery"];
let bookmarkPosition = item && item["bookmarkPosition"];


let duration = deliveryMedia && deliveryMedia["duration"];
let quality = deliveryMedia && deliveryMedia["quality"];

let bookmarkPositionID = bookmarkPosition  && bookmarkPosition["id"];
let bookmarkPositionPercent = 0;
if(bookmarkPositionID && bookmarkPosition["duration"]>0){
  bookmarkPositionPercent = (bookmarkPosition["timeline"] / bookmarkPosition["duration"])*100;
}


let _src = _boxarts;
if(item && _img.toString().indexOf("jpg")<=0){
  _src = `${_img}?size=665x374`;
}
var _thumbnailJson = _state['thumbnailJsonBlob'] && _state['thumbnailJsonBlob'][_src];
let _blob = _thumbnailJson ? _thumbnailJson['blob'] : _boxarts;
if(!_blob){
  _getThumbnail(_src);
}
_blob = _boxarts;
const closeHv = (e) => {
 
  let ishdd = _listWathDialog && _listWathDialog[item.id];
    
  if(dtt[_kid]["hover"]){
    dtt[_kid]["hover"] = false;
  }
  if(dtt[_kid]["tmO"]){
    clearTimeout(dtt[_kid]["tmO"]);
    dtt[_kid]["tmO"] = null;
  }
}


  return(
    <>
          <div className={`title_card ${_view?"blob_active":""}  `}   id={_kid}
            onClick={(e)=>vv(e)} 
            //onMouseMove={(e)=>seeDetails(e)} 
            //onMouseMove={(e)=>seeDetails(e)} 
            //onMouseOut={(e)=>closeHv()} 
            //onMouseLeave={(e)=>closeHv()} 
             >
           {_blob? 
                        <div className={`card_image`} style={_view?_blobSty:{}}>  
                        {_blob?  <img src={_blob} alt={""}/>  :<div/>  }
                            {false && <div className="fallback-text-container" aria-hidden="true" style={_view?{}:{opacity:0.4,zIndex:8}}>
                              <p className="fallback-text">{_title}</p>
                            </div>
                            }
                          <div  className={`card_overlay`} > </div> 
                          <div className={`presentation bob-overlay ${!_view && "bob-overlay-hidden"}`}>
                            {_view && 
                            <>
                            
                              <div className="bob-play-wrapper">
                                { deliveryMedia["duration"] ? 
                                <div className="erview">
                                  <div className="bob-play">
                                      <Icons 
                                        name={'play'} 
                                        color={'#555'} 
                                        size={18}
                                      /// tooltip={'play'}
                                        noStyle={true}
                                      />
                                  </div>
                                </div>
                                :null}
                                </div>
                                <div className="bob-overview-wrapper" onClick={()=>seeDetails()}>
                                <div className="bob-overview">
                                  
                                  <div className="bob-title">{_title}</div>
                                  <div className="bob-metadata-wrapper">
                                      <div className="meta video-meta video-meta--bob-overview">
                                        <span className="match-score-wrapper no-rating">
                                          <div className="show-match-score rating-inner">
                                            <span className="match-score">{item["year"]}</span>
                                          </div>
                                        </span>
                                        {quality?
                                        <span className="maturity-rating ">
                                            <span className="maturity-number">{quality?quality:""}</span>
                                        </span>
                                        :null
                                        }
                                        {duration ?
                                          <span className="duration">{ parse2Duration(duration)}</span>
                                          :null
                                        }
                                      </div>
                                  </div>
                                  <div className="evidence-list">
                                    <div className="evidence-item">
                                      <span className="evidence-text">Emocionante</span>
                                    </div>
                                    <div className="evidence-item">
                                      <span className="evidence-text">Fantasía</span>
                                    </div>
                                    <div className="evidence-item">
                                    {false && <div className="evidence-separator"/>}
                                      <span className="evidence-text">Comedia de acción</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bob-actions-wrapper">
                              <span className="ActionButtons">
                               {false && <div className="thumbs-component thumbs thumbs-vertical animated unrated" data-uia="thumbs-container">
                                  <div className="nf-svg-button-wrapper thumb-container thumb-up-container " data-uia="">
                                    <a role="link" data-rating="2" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar arriba">
                                      <svg data-rating="2" className="svg-icon svg-icon-thumb-up" focusable="true"><use filter="" xlinkHref="#thumb-up"></use></svg>
                                    </a>
                                  </div>
                                  <div className="nf-svg-button-wrapper thumb-container thumb-down-container " data-uia="">
                                    <a role="link" data-rating="1" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar abajo">
                                      <svg data-rating="1" className="svg-icon svg-icon-thumb-down" focusable="true"><use filter="" xlinkHref="#thumb-down"></use></svg>
                                    </a>
                                  </div>
                                </div>
                                }
                                <div className="nf-svg-button-wrapper" >
                                  <Icons 
                                    name={'mylist-add'} 
                                    color={'#555'} 
                                    size={18}
                                   /// tooltip={'play'}
                                    noStyle={true}
                                  />
                                   <span className="nf-svg-button-tooltip" role="status" aria-live="assertive">Agregar a Mi lista</span>
                                </div>                 
                              </span>
                            </div>                                
                            </>
                            }
                          </div>
                          
                        </div>
                        :
                        <div className="fallback-text-container card_image" aria-hidden="true" style={_view?_blobSty:{}}>
                          <p className="fallback-text">{_title}</p>
                        </div>
                      }

                    </div>
                </>
  )


}








export default TitleCardHRM





const parse2Minutes = (s) =>{
  return Math.floor(s/60);
 }
 
 
 
 const parse2Duration = (s) =>{
   let min = Math.floor(s/60000);   
   let hour = Math.floor(min/60);
   let re =  `${hour>0?`${hour} h`:""} ${hour>0?(min-(hour*60)):min }min`;
   return re;
  }
  


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








.fallback-text-container {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(#000000));
  background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0), #000000);
  background-image: -moz- oldlinear-gradient(rgba(0, 0, 0, 0), #000000);
  background-image: -o-linear-gradient(rgba(0, 0, 0, 0), #000000);
  background-image: linear-gradient(rgba(0, 0, 0, 0), #000000);
  background-color: #222;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  z-index: -1;
}





.fallback-text {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 8%;
  right: 8%;
  margin: 0;
  padding: 0 0 10%;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}






`