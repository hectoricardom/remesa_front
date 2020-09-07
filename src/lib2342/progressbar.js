
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'

import { getThumbnailbyTime } from './lib/common';






const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  let _state =  useSelector(state => state);
  const dispatch = useDispatch();
  const updKV= (k,v) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:k,value:v}
    })  
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:observeChanges,value:_Util.gen12CodeId()}
    })  
  }

  
  let _dispatch_ = dispatch;
  return { _state, updKV, _dispatch_ }
}





const PlayButtonV = () => {

}










const handleProgressBar_Click = (event, duration, updKV) => {  
   var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
   var Wbar = (event.clientX-dd.left)*100 / dd.width;
   var c2ct = duration*(Wbar/100); 
    let _player = document.getElementById(window.playerHrmTag);
    if(c2ct && !isNaN(c2ct) && isFinite(c2ct)){
      _player["currentTime"] = c2ct;
    }
    // updKV("currentTime",c2ct);
}


const handleDragOver = (event,stateHover, setStateHover, _state) => {

  
    const {duration} = _state;  
    let _stateHover = stateHover || {};
    event.persist()
    // event.stopPropagation(); 
    if(_state.dragging){      
      var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
      //document.getElementsByClassName('videoBarButton')[0].style.cursor = 'pointer';    
      var Wbar = (event.clientX-dd.left)*100 / dd.width;  
      var c2ct = null;
      if(Wbar>=0 && Wbar<100){
        event.preventDefault(); 
        c2ct = duration*(Wbar/100); 
        var ctdrg = parseInt(c2ct/10)*10
        _stateHover['ct'] = ctdrg;
        setStateHover(_stateHover)     
      } 
    } 
}

const handleOut = (event,stateHover, setStateHover) => {
  let _stateHover = stateHover || {};
  _stateHover['hoverBar']=false;
  // _stateHover['dragging']=false;
  _stateHover['progress_hover']=0; 
  setStateHover(_stateHover);
}



const handleProgressBar_Hover = (event,stateHover, setStateHover, _state, dispatch, state) => {  
  let _stateHover = stateHover || {};
  if(_state.dragging){
    handleDragOver(event,stateHover, setStateHover, _state);
  }  
  const {duration, progressThumbnail} = _state; 
  var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
  var Wbar = (event.clientX-dd.left)*100 / dd.width;
  if(Wbar<0){
    Wbar = 0;
  }
  var c2ct = duration*(Wbar/100);
  c2ct = !isNaN(c2ct)?c2ct:0;
 
  if(duration && progressThumbnail){
    var img = getThumbnailbyTime(parseInt(c2ct/10)*10, dispatch, state);
    _stateHover['progress_thumbnail']=img; 
  }

  _stateHover['hoverBar']=true;
  _stateHover['progress_hover']=Wbar;
 

  _stateHover['progress_time']=  _Util.buildTimeString_(c2ct,true);  
  setStateHover(_stateHover);
}



const handleDragFinish = (event,stateHover, setStateHover, duration,updKV,_state) => {
  var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
  var Wbar = (event.clientX-dd.left)*100 / dd.width;
  var c2ct = duration*(Wbar/100); 
  let _player = document.getElementById(window.playerHrmTag);
  let _stateHover = stateHover || {}; 
  if(c2ct && !isNaN(c2ct)){    
    updKV('W2Seek',{newCt:c2ct,oldCt:_player["currentTime"]});
    _player["currentTime"] = c2ct;
    _stateHover['ct']=c2ct;
  }  
  if(_state.dragging){
    updKV('dragging',false);
  }
  setStateHover(_stateHover);
}





const handleDragEnd = (event,stateHover, setStateHover, _state, props, updKV) => {
  let _stateHover = stateHover || {};
  const {duration, dragging} = _state;
  if(event.pageX && dragging && stateHover.startX ){    
    var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
    var Wbar = (event.clientX-dd.left)*100 / dd.width;  
    var c2ct = null;
    if(Wbar>=0 && Wbar<100){
      c2ct = duration*(Wbar/100);
    }    
    var diif = event.pageX-stateHover.startX; 
    if( diif>25 || diif<-25){
      if(c2ct && !isNaN(c2ct)){
        let _player = document.getElementById(window.playerHrmTag);
        _player["currentTime"] = c2ct;
        _stateHover['ct']=c2ct;
      }    
      if (typeof props.seek2 === 'function') { 
        props.seek2(c2ct);
      }
      setTimeout(()=>{
        //event.stopPropagation();
        event.persist()
        if(_state.dragging){
          updKV('dragging',false);
        }
        //_stateHover['dragging'] = false;
        setStateHover(_stateHover);
      },400)
    }
  }
}





const handleDragStart = (e,stateHover, setStateHover, _state, updKV) => {

  //e.stopPropagation();
  e.persist()
  const {currentTime} = _state; 
  let _stateHover = stateHover || {};
  _stateHover['ct']=currentTime;
  // _stateHover['dragging']=true;
  if(!_state.dragging){
    updKV('dragging',true);
  }
  _stateHover['startX']=e.pageX;
  setStateHover(_stateHover);


}











const ProgressBar = (props) => {

  const { updKV, _state, _dispatch_ } = useObserveChanges();
  const { idWatch} = props;
  const [stateHover, setStateHover] = useState({});
  const [obs, setObs] = useState(0);
  const {progress_time, progress_hover, hoverBar,    ct, progress_thumbnail }  = stateHover;

  const { duration, currentTime, barVisible, dragging, W2Seek }  = _state;

  var Tduration = duration?_Util.buildTimeString_(duration,true):'';
    
  var progress_width = W2Seek? (W2Seek/duration)*100: dragging? (ct/duration)*100: (currentTime/duration)*100;  

  let classN = _styleProgressBar(idWatch);
  if(W2Seek && W2Seek["newCt"]>W2Seek["oldCt"] &&  W2Seek["newCt"]<currentTime){
    updKV('W2Seek',null)
  }else if(W2Seek && W2Seek["newCt"]<W2Seek["oldCt"] &&  W2Seek["newCt"]>currentTime){
    updKV('W2Seek',null)
  }


  // console.log({barVisible})

  
  return (
    <>
     <div className="" >
        <div  className={`ControlBar ${barVisible?'visible':'hidden'}`} onMouseOut={(e)=>handleOut(e,stateHover, setStateHover,setObs)}>
          <div className="scrubber-container">
              <div className="scrubber-bar"  
                onMouseMove={(e)=>handleProgressBar_Hover(e,stateHover, setStateHover,_state, _dispatch_, _state)} 
                onClick={(e)=>handleProgressBar_Click(e, duration, updKV) } 
                onMouseUp={(e)=>handleDragEnd(e,stateHover, setStateHover ,_state,props, updKV)}
                >
                <div className="track">
                  <div className="buffered" style={{width:`${progress_hover}%`}}></div>
                  <div className="current-progress"  style={{width: `${progress_width}%`}}></div>
                  <div className="play-head"></div>
                </div>
                <div className={`trickplay trickplay-text-and-image ${hoverBar?"trickplay-visible":""}`} 
                  style={{left: `calc(${progress_hover}% - 125px)`, width:`250px`}}>
                  <div className="tp-image">
                    <img src={progress_thumbnail} alt=""/>
                  </div>
                  <div className="tp-text">{progress_time}</div>
                </div>
                <div className="scrubber-head" style={{left: `${progress_width}%`}}  
                  onMouseDown={(e)=>handleDragStart(e,stateHover, setStateHover,_state, updKV)}
                  onMouseUp={(e)=>handleDragFinish(e,stateHover, setStateHover, duration, updKV,_state)}
                ></div>
              </div>
          </div>
          <div className="PlayerControls--control-element text-control time-remaining--modern PlayerControls--control-element-hidden"><time className="time-remaining__time">{Tduration}</time></div>                                 
        </div>        
      </div> 
      <style>{classN}</style>
    </>
  )
}

export default ProgressBar;






const _styleProgressBar = (idWatch) => {  
  return `
  .nfp_${idWatch} .scrubber-container {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    -ms-touch-action: none;
    touch-action: none;
    height: 3.3em;
  }
  
  .nfp_${idWatch} .scrubber-container .scrubber-bar {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -moz-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: auto;
    position: relative;
  }
  
  .nfp_${idWatch} .scrubber-container .track {
    height: .5em;
    background: var(--heliumPlayer__color_shadow);
    position: relative;
    -webkit-transition: height .2s ease;
    -o-transition: height .2s ease;
    -moz-transition: height .2s ease;
    transition: height .2s ease;
    will-change: height;
    border-radius: 0.2em;
  }
  
  
  
  
  .nfp_${idWatch} .scrubber-container:hover .track{
    height: .86em;
  }
  
  .nfp_${idWatch} .scrubber-container:hover .scrubber-head{
    -webkit-transform: scale(1) translateZ(0);
    -moz-transform: scale(1) translateZ(0);
    transform: scale(1.2) translateZ(0);
  }
  
  
  
  .nfp_${idWatch} .scrubber-container .buffered {
    background: rgba(255,255,255,.2);
  }
  
  .nfp_${idWatch} .scrubber-container .buffered, .nfp_${idWatch} .scrubber-container .current-progress {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;  
  }
  
  
  .nfp_${idWatch} .scrubber-container .current-progress {
    background:  var(--heliumPlayer__color_fire);
    border-radius: 0.2em;
  }
  
  
  
  
  
  
  .nfp_${idWatch} .scrubber-container .play-head {
    height: 100%;
    border-left: solid 1px rgba(255,255,255,.5);
    border-right: solid 1px rgba(255,255,255,.5);
    margin-left: -1px;
    position: absolute;
    display: none;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    transform: translateZ(0);
  }
  
  
  
  .nfp_${idWatch} .trickplay {
    pointer-events: none;
    display: none;
    position: absolute;
    bottom: 2.5em;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
    overflow: hidden;
  }
  
  .nfp_${idWatch} .trickplay.trickplay-visible {  
    display: block;
  }
  
  .nfp_${idWatch}{
    width: 100%;
  }
  
  
  .nfp_${idWatch} .scrubber-container .scrubber-head {
    position: absolute;
    top: 50%;
    height: 1.4em;
    width: 1.4em;
    margin: -.75em;
    background:  var(--heliumPlayer__color_fire);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    opacity: 1;
    -webkit-transform: scale(1) translateZ(0);
    -moz-transform: scale(1) translateZ(0);
    transform: scale(1) translateZ(0);
    -webkit-transition: -webkit-transform .2s ease;
    transition: -webkit-transform .2s ease;
    -o-transition: -o-transform .2s ease;
    -moz-transition: transform .2s ease,-moz-transform .2s ease;
    transition: transform .2s ease;
    transition: transform .2s ease,-webkit-transform .2s ease,-moz-transform .2s ease,-o-transform .2s ease;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    -o-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    cursor: pointer;  
    outline: none;
  }
  
  
  .nfp_${idWatch} .trickplay.trickplay-text-and-image {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom: 0;
    background: rgba(38,38,38,.85);
    -webkit-box-shadow: 0 0 1em rgba(0,0,0,.5);
    -moz-box-shadow: 0 0 1em rgba(0,0,0,.5);
    box-shadow: 0 0 1em rgba(0,0,0,.5);
  }
  
  .nfp_${idWatch} .trickplay.trickplay-text-and-image .tp-text {
    padding: .35em 0;
    text-align: center;
    font-size: 1.28em;
    color:  var(--heliumPlayer__color_light_5);
  }
  
  
  
  
  .nfp_${idWatch} .trickplay.trickplay-text-and-image img {
    display: block;
    width: 100%;
  }
  
  .PlayerControls--control-element {
    -webkit-transition: opacity .25s,-webkit-transform .25s cubic-bezier(.5,0,.1,1);
    transition: opacity .25s,-webkit-transform .25s cubic-bezier(.5,0,.1,1);
    -o-transition: opacity .25s,-o-transform .25s cubic-bezier(.5,0,.1,1);
    -moz-transition: transform .25s cubic-bezier(.5,0,.1,1),opacity .25s,-moz-transform .25s cubic-bezier(.5,0,.1,1);
    transition: transform .25s cubic-bezier(.5,0,.1,1),opacity .25s;
    transition: transform .25s cubic-bezier(.5,0,.1,1),opacity .25s,-webkit-transform .25s cubic-bezier(.5,0,.1,1),-moz-transform .25s cubic-bezier(.5,0,.1,1),-o-transform .25s cubic-bezier(.5,0,.1,1);
    -webkit-transform: translateZ(0) scale(1);
    -moz-transform: translateZ(0) scale(1);
    transform: translateZ(0) scale(1);
  }
  .time-remaining--modern {
    width: 8em;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    -moz-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
  }
  
  .time-remaining__time {
    font-size: 1.5em;
    color:  var(--heliumPlayer__color_white_);
  }
  
  .time-remaining--modern {
    width: 8em;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    -moz-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
  }
  
  
  .ControlBar.visible{
    opacity: 1;
  }
  
  .ControlBar.hidden{
    opacity: 0;
  }
  
  .ControlBar{
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    padding: .4em .1em;
    -webkit-transition: opacity .2s ease;
    -o-transition: opacity .2s ease;
    -moz-transition: opacity .2s ease;
    transition: opacity .2s ease;
    width:calc(100% - 50px);
    position:relative;
    margin: 0px 25px;
  }
  `
}