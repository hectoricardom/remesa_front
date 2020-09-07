
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../../store/Util'

import { getThumbnailbyTime } from '../../actions/common';

import Icon2 from '../Icons'

import './style.css';



const useObserveChanges = () => {
  const observePlayer =  useSelector(state => state.observePlayer);
 
  const dispatch = useDispatch();
  const updKV= (k,v) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:k,value:v}
    })  
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:observePlayer,value:_Util.gen12CodeId()}
    })  
  }
  

  
  let _dispatch_ = dispatch;
  return { observePlayer, updKV, _dispatch_ }
}





const PlayButtonV = () => {

}










const handleProgressBar_Click = (event, duration, updKV) => {  
   var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
   var Wbar = (event.clientX-dd.left)*100 / dd.width;
   var c2ct = duration*(Wbar/100); 
    let _player = document.getElementById(window.playerHrmTag);
    if(c2ct && !isNaN(c2ct) && isFinite(c2ct)){     
      if(window.dashHLM){
        window.dashHLM.seek(c2ct)
      }else{
        _player["currentTime"] = c2ct;
      }
    }
    _Util.updPlayerStore("currentTime",c2ct)  
    updKV('observePlayer',_Util.gen12CodeId());
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
    //updKV('W2Seek',{newCt:c2ct,oldCt:_player["currentTime"]}); 
    _Util.updPlayerStore("W2Seek",{newCt:c2ct,oldCt:_player["currentTime"]})  
    if(window.dashHLM){
      window.dashHLM.seek(c2ct)
    }else{
      _player["currentTime"] = c2ct;
    }
    _stateHover['ct']=c2ct;     
  }  
  if(_state.dragging){    
    _Util.updPlayerStore("dragging",false) 
  }
  setStateHover(_stateHover);
  updKV('observePlayer',_Util.gen12CodeId());
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
        if(window.dashHLM){
          window.dashHLM.seek(c2ct)
        }else{
          _player["currentTime"] = c2ct;
        }        
        _stateHover['ct']=c2ct;
      }    
      if (typeof props.seek2 === 'function') { 
        props.seek2(c2ct);
      }
      setTimeout(()=>{
        //event.stopPropagation();
        event.persist()
        if(_state.dragging){          
          _Util.updPlayerStore("dragging",false) 
        }
        //_stateHover['dragging'] = false;
        setStateHover(_stateHover);
        updKV('observePlayer',_Util.gen12CodeId());
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
    _Util.updPlayerStore("dragging",true)    
  } 
  _stateHover['startX']=e.pageX;
  setStateHover(_stateHover);
  updKV('observePlayer',_Util.gen12CodeId());

}











const ProgressBar = (props) => {

  const { updKV, observePlayer,  _dispatch_ } = useObserveChanges();
  var _state = _Util.getPlayerStore();
  const keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;
  const { idWatch} = props;
  const [stateHover, setStateHover] = useState({});
  const [obs, setObs] = useState(0);
  const {progress_time, progress_hover, hoverBar,    ct, progress_thumbnail }  = stateHover;

  const { duration, currentTime, barVisible, dragging, W2Seek }  = _state;

  
  var Tduration = duration?_Util.buildTimeString_(duration,true):'';
    
  var progress_width = W2Seek? (W2Seek/duration)*100: dragging? (ct/duration)*100: (currentTime/duration)*100;  

  let classN = _styleProgressBar(idWatch);
  if(W2Seek && W2Seek["newCt"]>W2Seek["oldCt"] &&  W2Seek["newCt"]<currentTime){    
    _Util.updPlayerStore("W2Seek",null) 
  }else if(W2Seek && W2Seek["newCt"]<W2Seek["oldCt"] &&  W2Seek["newCt"]>currentTime){
    _Util.updPlayerStore("W2Seek",null) 
  }


  let styleRange = {
    "--heliumPlayer--max":1,
    "--heliumPlayer--min":0,
    "--heliumPlayer--val":progress_width/100,
    "--heliumPlayer--range--volume--active-percent":`${progress_width}%`,
    "--heliumPlayer--range--volume--back-percent":`${100-progress_width}%`,
    "--heliumPlayer--color--range--volume--active":"#e50914",
    "--slider_thumb_prgBar--":"32px",
    "--heliumPlayer--color--range--volume--back":"#7e7e7e"
  }
  
  return (
    <>
     <div className=""  >
        <div  className={`ControlBar ${barVisible?'visible':'hidden'}`} onMouseOut={(e)=>handleOut(e,stateHover, setStateHover,setObs)}>
          <div className="scrubber-container" style={styleRange}>
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
  
  `
}


const confirm_Volume = (props) => { 

}

const handleIn_Volume = (props) => { 
  
}

const handleOut_Volume = (props) => { 
  
}



const mute_Volume = (props) => { 
  
}

const FullScreenButton = (props) => { 
  
}





export const ProgressBarMobile = (props) => { 


  const { updKV, observePlayer,  _dispatch_ } = useObserveChanges();
  var  _state = _Util.getPlayerStore(); 

  const keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;

  const {activeVolume,isMute, volume, duration, currentTime, barVisible, dragging, W2Seek,  isFullscreen,  }  = _state;


  const [stateHover, setStateHover] = useState({});

  const { ct } = stateHover; 

  let _volume = volume?volume:1;

  var ct2 = dragging? ct: _volume*100;
  var icon = isMute?'volume_mute':ct2/100>0.5?'volume_up':ct2/100===0?'volume_mute':'volume_down';
  let ProgressVolumeId  = `${keys[82]}_prgbar`;
  let classN = _styleMobileProgressBar(ProgressVolumeId);
    
  var Tcurrent = currentTime?_Util.buildTimeString_(currentTime,true):'';
  var Tduration = duration?_Util.buildTimeString_(duration,true):'';
    
  var progress_width = W2Seek? (W2Seek/duration)*100: dragging? (ct/duration)*100: (currentTime/duration)*100;  

 
  const handleRange_Time = (event) => { 
    var c2ct = event.target.value;
    let _player = document.getElementById(window.playerHrmTag);
    _player["currentTime"] = c2ct; 
    _Util.updPlayerStore('currentTime',c2ct);
    updKV('observePlayer',_Util.gen12CodeId());
  }



  const FullScreenButton = (e, updKV, id ) => {
    let  _videoContainer = document.getElementById(id);
    if(_videoContainer){     
      var isfS = !_Util.IsFullScreen(_videoContainer); 
      _Util.updPlayerStore("isFullscreen",isfS) 
      _videoContainer.requestFullscreen = _videoContainer.requestFullscreen || _videoContainer.mozRequestFullScreen || _videoContainer.msRequestFullscreen || _videoContainer.webkitRequestFullscreen;
      _videoContainer.requestFullscreen();
      if (_Util.fullscreenElement()) { 
        let doc = document;
        doc.exitFullscreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen || doc.webkitExitFullscreen;     
        if(doc.exitFullscreen){
          try{
            doc.exitFullscreen();
          }catch(e){
            console.log(e)
          }
        }
      }
    } 
  }




  var Fsc = isFullscreen?'fullscreenExit':'fullscreenExit';



  let styleRange = {
    "--heliumPlayer--max":1,
    "--heliumPlayer--min":0,
    "--heliumPlayer--val":progress_width/100,
    "--heliumPlayer--range--volume--active-percent":`${progress_width}%`,
    "--heliumPlayer--range--volume--back-percent":`${100-progress_width}%`,
    "--heliumPlayer--color--range--volume--active":"#e50914",
    "--slider_thumb_prgBar--":"32px",
    "--heliumPlayer--color--range--volume--back":"#7e7e7e"
  }
    
  return(
          <div className={``} >
            <div  className={`_dsplFlx _prel`} > 
              <div className={`_barBtnWrp _dsplFlx`}>
                <time className="time-remaining__time">{Tcurrent?`${Tcurrent} | ${Tduration} `:""}</time>
              </div>                    
              
              <div className="flexSpace"/>   
              <a className="mobile_player-button-control" onClick={(e)=>FullScreenButton(e,updKV, keys[90])}>            
                <Icon2 name={Fsc} color={'#fff'} size={'1.6em'}/>
              </a>    
            </div>
            <div className={`touchable popup-content-wrapper keep-right  Vol_ ${activeVolume?'active':''}`} >              
              <div className="volume--container"  style={styleRange}>                  
                <div id={`${ProgressVolumeId}`} className={`volume_bar_wrp_${ProgressVolumeId}`}/>
                <div id={`${ProgressVolumeId}`} className={`volume_bar_progress_${ProgressVolumeId}`}/> 
                <div className="current-progress"  style={{width: `${progress_width}%`}}></div>                 
                <input className={`slider_bar_progress_${ProgressVolumeId}`} type="range" min={0} max={duration?duration:0} step={0.01} value={currentTime?currentTime:0} onChange={(e)=>handleRange_Time(e)}/>      
              </div>        
            </div>
            <style>{classN}</style>
          </div>
  )
}

/*
<div className="buffered" style={{width:`${progress_hover}%`}}></div>
<div className="current-progress"  style={{width: `${progress_width}%`}}></div>
*/




const _styleMobileProgressBar = (idWatch) => {  
  return `


  input[type='range'].slider_bar_progress_${idWatch} { 
    -webkit-appearance: none;
    width: 100%;
    height: 1px;
    padding: 1px;
    outline: none;
    opacity: 0.6;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px; 
    background-color: transparent;
    position: absolute;    
  }

  input[type='range'].slider_bar_progress_${idWatch}::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 25px;
    background: var(--heliumPlayer--color--range--volume--active); 
    cursor: pointer;
  }

  input[type='range'].slider_bar_progress_${idWatch}::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--heliumPlayer--color--range--volume--active); 
    cursor: pointer;
  }




  .volume_bar_wrp_${idWatch}{
    -webkit-appearance: none;
    outline: none;
    opacity: 0.6;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px;     
    background-color: var(--heliumPlayer--color--range--volume--back);
    -webkit-appearance: none;
    width: 96%;
    height: 6px;
    outline: none;
    opacity: 0.6;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px;
    --slider_thumb--: 2em;
    position: absolute;
    margin-left: 10px;
  }


  .volume_bar_progress_${idWatch}{
    -webkit-appearance: none;
    outline: none;
    opacity: 0.6;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px; 
    background-color: var(--heliumPlayer--color--range--volume--active);
    -webkit-appearance: none;
    width: var(--heliumPlayer--range--volume--active-percent);
    max-width: 90%;
    height: 6px;
    outline: none;
    opacity: 0.6;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px;
    --slider_thumb--: 2em;
    position: absolute;
    margin-left: 10px;
  }

  .volume_bar_wrp_${idWatch}::after{
    content:"";

  }







  `
}










  /*



  .volume_bar_slide_thumb_${idWatch}{
    -webkit-appearance: none;
    appearance: none;
    margin-top: 4px;
    width: var(--slider_thumb_prgBar--);
    height: var(--slider_thumb_prgBar--);
    border-radius: 50px;
    background: var(--heliumPlayer--color--range--volume--active); 
    cursor: pointer;
    position: absolute;
  }

 


  






 @media screen and (-webkit-min-device-pixel-ratio:0) {

}


  input[type='range'].slider_${idWatch} {      
  
    -webkit-appearance: none;
    width: 100%;
    height: 12px;
    padding: 5px;
    outline: none;
    opacity: 0.6;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px;
    --slider_thumb--:32px;  
    background-color: var(--heliumPlayer--color--range--volume--back); 


  }
  
  input[type='range'].slider_${idWatch}::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: var(--heliumPlayer--color--range--volume--active); 
    margin-top: -1px;
  }
  



  input[type='range'].slider_${idWatch}::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--slider_thumb_prgBar--);
    height: var(--slider_thumb_prgBar--);
    border-radius: 50px;
    background: var(--heliumPlayer--color--range--volume--active); 
    cursor: pointer;
    
  }
  
  input[type='range'].slider_${idWatch}::-moz-range-thumb {
    width: var(--slider_thumb_prgBar--);
    height: var(--slider_thumb_prgBar--);
    background: var(--heliumPlayer--color--range--volume--active); 
    cursor: pointer;
  }


  ////  FF

  input[type="range"].slider_${idWatch}::-moz-range-progress {
    background-color: var(--heliumPlayer--color--range--volume--active);
  }
  input[type="range"].slider_${idWatch}::-moz-range-track {  
    background-color: var(--heliumPlayer--color--range--volume--back); 
  }
  ///  IE
  input[type="range"].slider_${idWatch}::-ms-fill-lower {
    background-color:var(--heliumPlayer--color--range--volume--active);
  }
  input[type="range"].slider_${idWatch}::-ms-fill-upper {  
    background-color:  var(--heliumPlayer--color--range--volume--back);
  }

  */
