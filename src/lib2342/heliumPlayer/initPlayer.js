
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../../store/Util'
import { withRedux } from '../../store/redux';


import { OpenModal, OpenBezel, OpenSlideOption, upgradeBookmarkPosition , SrtCachingFile } from '../../actions/common';

import { withRouter} from 'react-router-dom';

import FilePlayer from './player';
import ProgressBar from './progressbar';

import ButtonActions from './btn-action';

import {SubtitleChoose} from './btn-action';
import BezelContainer from './bezel';

import CloseCaption from './closeCaption.js';


import {Icon2} from '../Icons.js';


import SomethingWentWrong from './SomethingWentWrong';

import OpenSubtitle from './OpenSubtitle';

import {ProgressBarMobile} from './progressbar';



const useObserveChanges = () => {
  const observePlayer =  useSelector(state => state.observePlayer);
  const keys =  useSelector(state => state.keys);
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

  const _loadData= (id) => {
    // LoadData(id,dispatch); 
  } 

  const _srtCachingFile = (fileBlob,label) => {    
    SrtCachingFile(fileBlob,label, dispatch);
  }


  const _openMobileOptions = (e) => { 
    let player = document.getElementById(window.playerHrmTag);
    player.pause();
    let data = {};
    data['display']=true;
    data['zIndex']=150;
    data['height']='115px';
    data['observeResize']=true;
    data['content'] = <SubtitleChoose/>; 
    OpenSlideOption(dispatch,data);
  }
  

  
  let _dispatch_ = dispatch;
  return {  updKV, _dispatch_, _loadData, _srtCachingFile , keys, observePlayer, _openMobileOptions}
}



const useModal = () => { 
  const listBezel = useSelector(state => state.listBezel);
  const observePlayer = useSelector(state => state.observePlayer);
  const dispatch = useDispatch();

  const OpenModalHRM = () => {       
    let data = {};
    data['display']=true;
    data['zIndex']=150;
    data['height']='115px';    
    data['content'] = null; 
    OpenModal(dispatch,data);
  }
 
  const OpenSomethingWrong = () => { 
    let player = document.getElementById(window.playerHrmTag);
    player.pause();
    let data = {};
    data['display']=true;
    data['zIndex']=150;
    data['height']='115px';
    data['observeResize']=true;
    data['content'] = SomethingWentWrong; 
    OpenModal(dispatch,data);
  }

  const OpenSubtitleFile = (e) => { 
    let player = document.getElementById(window.playerHrmTag);
    player.pause();
    let data = {};
    data['display']=true;
    data['zIndex']=150;
    data['height']='115px';
    data['observeResize']=true;
    data['content'] = OpenSubtitle; 
    OpenModal(dispatch,data);
  }


  const _openBezel = (icon) => {      
    let data = {};
    data['list']=listBezel;
    data['icon']=icon;
    OpenBezel(dispatch,data);
  }



 

  return { OpenModalHRM, OpenSomethingWrong, OpenSubtitleFile, _openBezel, observePlayer }
}











// const refsd = React.createRef();


const  Watch =(props)=> {
  const { OpenModalHRM,  OpenSomethingWrong, OpenSubtitleFile, _openBezel } = useModal();
  const {  updKV, _dispatch_, _loadData, _openMobileOptions, _srtCachingFile, observePlayer } = useObserveChanges();
  

  var  _state = _Util.getPlayerStore(); 

  const keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;

  const { hover, isplaying,  _url } = _state
  






  const PlayButtonV = (e) =>{
    var toElement = e.toElement || e.relatedTarget || e.target;
    let IdControl = keys[15];
    var _Elmm = document.getElementById(IdControl);
    if(toElement && !_Elmm.contains(toElement)){
      PlayButton(null,updKV,_state,_dispatch_,_openBezel);
    }
  }


 







  let seek2 = 10;
  let display_Pbar = true;
  let idWatch = keys[99];
  let classN = _styleWatch(idWatch)
 // const refsd = useRef();
 
 const [initialize, setInitialize] = useState(false);  
 const [loaded, setLoaded] = useState(false);  
 const [subtitle, setSubtitle] = useState({});  
  let IdVideo = keys[95];
  let _player = document.getElementById(`${IdVideo}_video`);


  useEffect(() => {    
    if(!_state["audio_list"] && window._hlsHRM &&  window._hlsHRM.audioTrackController && window._hlsHRM.audioTrackController.audioTracks){    
      if(Array.isArray(window._hlsHRM.audioTrackController.audioTracks) && window._hlsHRM.audioTrackController.audioTracks.length>0){
        //updKV('audio_list',window._hlsHRM.audioTrackController.audioTracks);
        _Util.updPlayerStore("audio_list",window._hlsHRM.audioTrackController.audioTracks) 
      }
    }
    
    /*
    let _srt_ = _state["srt2List"];    
    let _ftpStreamJson = _state["srtStreamJson"];
    if(_srt_ && !subtitle[_srt_] && _ftpStreamJson && _ftpStreamJson[_srt_] && _ftpStreamJson[_srt_]['done']){
      
    }

    */
    if(!initialize){
      setInitialize(true);
      _loadData();

      _Util.updStore("goDark",false);
      _Util.updPlayerStore('barVisible',true);
      _Util.updStore("goDark",false);
      updKV('goDark',false);
      
      if(!document.exitFullscreen){
        //_Util.Y();
      }
    }
  });


  const goBack = () =>{

    let  _videoContainer = document.getElementById(keys[90]);    
    lastCurrenTime = {}; 
    window.localStorage.setItem("titleName","")
    _Util.updPlayerStore("loadedVideo",false);
    _Util.updPlayerStore("hls",null);
    _Util.updPlayerStore("currentTime",0);
    _Util.updPlayerStore("W2Seek",false);
    _Util.updPlayerStore("dragging",false);
    _Util.updPlayerStore("subtitleId",null);
    _Util.updPlayerStore("subtitle",{});
    _Util.updPlayerStore("duration",0);
    _Util.updPlayerStore("bookmarkPositionTimeline",null);
    updKV('goDark',false);
      
    if(window._hlsHRM){
      window._hlsHRM.destroy();
    }
    const _store = _Util.getStore();
    if(_store["nextlistInterval"]){
      clearInterval(_store["nextlistInterval"]);
    }

  
    if(_store["route_history"]){
        let source = _store["flixSource"]?_store["flixSource"]:"browse";
        let pt = {pathname:`/`+source }
        if(_store["prevUrl"]){
          pt =_store["prevUrl"];
        }
        _store["route_history"].push(pt);      
    }
    if(_videoContainer){
      if(_Util.IsFullScreen(_videoContainer)){
        _Util.updPlayerStore("isFullscreen",false); 
        if (_Util.fullscreenElement()) {           
            let doc = document;
             
            //doc.requestFullscreen = doc.requestFullscreen || doc.mozRequestFullScreen || doc.msRequestFullscreen || doc.webkitRequestFullscreen;            
            doc.exitFullscreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen || doc.webkitExitFullscreen;
            if(doc.exitFullscreen){
              try{
                doc.exitFullscreen();
              }catch(e){
              }         
            }
        }
      }
    }
  }

 
  if(_state["bookmarkPositionTimeline"]>0 && !_state["timelineUpdated"] && _player && _player.currentTime>0){
    _Util.updPlayerStore("timelineUpdated",true);
    _player.currentTime = _state["bookmarkPositionTimeline"];
    _Util.updPlayerStore("currentTime",_state["bookmarkPositionTimeline"]);
    _Util.updPlayerStore("duration",_player.duration);
    
  }

  let userA = _Util.getBrowser();
  
  let isMobile = userA.os === "Android" || userA.os === "iPhone" || _state["outerWidth"]<720 ;

  var IconPP = isplaying?"pause":"play";  

  // nextlist  hiddeCur
  let isHover_ =  hover;
  if(isMobile){
    isHover_ =  hover || !isplaying ;
  }

 let nextBezel = _state["dbNextEffect"]?"block":"none"
 let prevBezel = _state["dbPrevEffect"]?"block":"none"
 
  return (
    <>
    <style>
            {`._colorPalette{
              --heliumPlayer__color_fire :#e50914;
              --heliumPlayer__color_fire_2 :#bf1315;
              --heliumPlayer__color_fire :#69f0ae;
              --heliumPlayer__color_fire_2 :#69f0ae;
              
              --heliumPlayer__color_shadow: #454545;
              --heliumPlayer__color_dark_2: #2e2e2e; 
              --heliumPlayer__color_dark_9_7: #979797; 
              --heliumPlayer__color_dark_14: #141414;
              --heliumPlayer__color_light_9: #d9d9d9;
              --heliumPlayer__color_light_2: #a2a2a2;
              --heliumPlayer__color_light_4: #b4b4b4;
              --heliumPlayer__color_light_5: #d5d5d5;
              --heliumPlayer__color_light_6: #f6f6f6;
              --heliumPlayer__color_white_: #ffffff;
              --heliumPlayer__color_blck_: #000000;
              --heliumPlayer__bckcolor_blck_opacity_:rgba(10,10,10,.695);              
            }`
            }
      </style>
     <div  id={keys[90]} onMouseMove={(e)=>handleOnMouseMove(e, _state, updKV, 5)} onMouseOut={(e)=>handleOnMouseOut(e, _state, updKV, 15)}  >
      <div  id={keys[5]} className={`control-container_ _colorPalette ${isHover_?'active':'hiddeCur'}`} onClick={(e)=>{
          if(!isMobile){
            PlayButtonV(e, updKV, _state, _dispatch_, _openBezel)
          }
        }}> 
          <div className={`control-left-box_`}>
           
          { isMobile && isHover_?
            <>
              <div className={`_dsplFlx`}>
              {isplaying?<div className={`margRgt`}/>:
                <div  onClick={()=>goBack()}>
                  <Icon2 name={'arrowBack'} color={'#f3f3f3'} size={'2.6em'}/>  
              </div> }             
                <div className="titleName">
                  <p>
                    { _state["titleName"]?` ${_state["titleName"]}`:""}
                  </p>
                </div>
                <div className="flexSpace"/> 
                {isplaying?null:
                <div  onClick={()=>_openMobileOptions()}>
                  <Icon2 name={'more_vert'} color={'#f3f3f3'} size={'2.2em'} ripple={false}/>  
                </div> 
                }  
              </div>  
            </>
           : null}
            {!isMobile &&
            <span className={`rowTitleBack`}> 
           
              <div className="_dsplFlx">
                <div  onClick={()=>goBack()}>
                  <Icon2 name={'arrowBack'} color={'#f3f3f3'} size={'2.6em'}/>  
                </div>    
              </div>
            
            </span> 
            }               
          </div>    
          {isMobile?   
          <div className={`control-middle-box_   ${isHover_?"_visibleControls":""}`} >  
            <div className={`_dsplFlx relPots wdt100`}>
              <div className={`_dsplFlx wdt24 relPots`} onClick={(e)=>handleDoubleClick(e,updKV,-10)}  id={`${keys[38]}_prev`}>
                <div className={`VideoBezel`} style={{display:prevBezel,position: 'absolute',width:'100px',height:'100px',zIndex: 350}}>
                  <div style={{position: 'relative',width:'100%',height:'100%'}}>
                    <div style={{position: 'absolute',top:'50%',left:'50%',marginLeft:'-1.72rem',marginTop:'-1.2rem'}}>
                      <Icon2 name={'timer_10'} color={'#f3f3f3'} size={"4vw"}/>   
                    </div> 
                  </div>                      
                </div>
              </div>
              <div className={` wdt50 relPots`}>
                <div className={`_dsplFlx _actionBtnPly `}>
                  <div  className={`_btnMobile `}>
                    <div  className={`_next_prev`}>
                      <Icon2 name={'prev_outline'} color={'#f3f3f3'} size={'6vw'}/>    
                    </div>
                  </div>
                  <div className="flexSpace"/>  
                  <div  className={`_btnMobile `}>
                    <div className={`_play`} onClick={(e)=>PlayButton(null,updKV,_state,_dispatch_)} >
                      <Icon2 name={IconPP} color={'#f3f3f3'} size={'9vw'}/>  
                    </div>
                  </div>
                  <div className="flexSpace"/>  
                  <div  className={`_btnMobile `}>
                    <div  className={`_next_prev`}>
                      <Icon2 name={'next_outline'} color={'#f3f3f3'} size={'6vw'}/>    
                    </div>
                  </div>
                </div>
              </div>
              <div className={`_dsplFlx wdt24 relPots`}  onClick={(e)=>handleDoubleClick(e,updKV,10)}  id={`${keys[38]}_next`}>
                <div className={`VideoBezel`} style={{display:nextBezel,position: 'absolute',width:'100px',height:'100px',zIndex: 350}}>
                  <div style={{position: 'relative',width:'100%',height:'100%'}}>
                    <div style={{position: 'absolute',top:'50%',left:'50%',marginLeft:'-1.72rem',marginTop:'-1.2rem'}}>
                      <Icon2 name={'timer_10'} color={'#fff'} size={"4vw"}/>   
                    </div> 
                  </div>                      
                </div>
              </div>
            </div>
          </div>
          :null}
          <div className={`control-bottom-box_  ${isHover_?"_visibleControls":""}`} >        
            <div className={`nfp_`} id={keys[15]}> 
              {isMobile?
                <div>
                  <ProgressBarMobile />
                </div>
                :<ProgressBar idWatch={idWatch} seek2={seek2} visible={display_Pbar}/>
              }
               {isMobile?
                <div>

                </div>
                :
                <ButtonActions 
                  idWatch={idWatch}
                  state={_state}                  
                  updKV={updKV}
                  _openBezel={_openBezel}
                  PlayButton={()=>PlayButton(_player,updKV,_state,_dispatch_,_openBezel)} 
                  somethingWrong={()=>OpenSomethingWrong()} 
                  OpenSubtitleFile={()=>OpenSubtitleFile()} 
                  //FullScreenButton={onFullscreenClick_}
                />
                }
            </div>
        </div>
        </div>
        <div   className={`video-container_`}>
          <CloseCaption state={_state} observePlayer={observePlayer}/>
          <FilePlayer
            distpatch={_dispatch_}            
            //FullScreen={(e)=>onFullscreenClick_(e)} 
            OpenBezel={(e)=>launchBezel(e,_openBezel)}
            updTimebyVideoId={(e,d)=>_updTimebyVideoId(e, d, _dispatch_, updKV)}
            state={_state}
            keys={keys}
            observePlayer={observePlayer}
            _openBezel={_openBezel}
            updKV={updKV}
            _url={_url}
          />        
        </div>
      <BezelContainer/>
      <style>{classN}</style>
      </div>
    </>
  )
} 


export default withRouter(withRedux(Watch))


var dbClickevt = {}




const handleDoubleClick = (e,updKV,nm) => { 
  let _id = e.target.id;
  if(_id && !dbClickevt[_id]){
    dbClickevt[_id] = _Util.gTm();    
  }else{    
    if(_Util.gTm()-dbClickevt[_id]<200){
      doubleClickEffect(updKV,nm);
      let elm = document.getElementById(window.playerHrmTag);
      elm.currentTime = elm.currentTime + nm;     
    }
    dbClickevt[_id] = _Util.gTm();
  }
}


const doubleClickEffect = (updKV,nm) => { 
  if(nm>0){
    _Util.updPlayerStore("dbNextEffect",true);
  }else{
    _Util.updPlayerStore("dbPrevEffect",true);
  }
  updKV('observePlayer',_Util.gen12CodeId());
  setTimeout(()=>{
    if(nm>0){
      _Util.updPlayerStore("dbNextEffect",false);
    }else{
      _Util.updPlayerStore("dbPrevEffect",false);
    }
    updKV('observePlayer',_Util.gen12CodeId());
  },1300)
  
}

/*

1591043393198
initPlayer.js:410 _vZlqTzlw49NQ__next 1591043393344

*/





const handleOnMouseMove = (e,state,updKV,keyCode) => {
 
  if(!state.duration || isNaN(state.duration)){
    let player = document.getElementById(window.playerHrmTag);
    if(player){
      _Util.updPlayerStore("duration",player.duration);
    }
  }
  if(!state.isHover_){
    _Util.updPlayerStore("isHover_",true);
  }
  if(!state.hover){
    _Util.updPlayerStore("hover",true);
    //document.exitPointerLock();
  }
  if ( e.type === 'mousemove'){
    if (state.mouseStillTimeoutId_){      
      window.clearTimeout(state.mouseStillTimeoutId_);
    }
    let _mouseStillTimeoutId_ = window.setTimeout(()=>onMouseStill_(state, updKV), 3200);
    _Util.updPlayerStore("mouseStillTimeoutId_",_mouseStillTimeoutId_)
  }
  updKV('observePlayer',_Util.gen12CodeId());

}


const onMouseStill_ = (state,updKV) => { 

  _Util.updPlayerStore("mouseStillTimeoutId_",null);
  if(state.isplaying){
    if(state.isHover_){
      _Util.updPlayerStore("isHover_",false);
    }
    if(state.hover){
      _Util.updPlayerStore("hover",false);
      //document.body.requestPointerLock();
    }  
    if(state.dragging){
      _Util.updPlayerStore("dragging",false);
    }
  }
  updKV('observePlayer',_Util.gen12CodeId());
}


const handleOnMouseOut = (e,state,updKV,keyCode) => {
  var toElement = e.toElement || e.relatedTarget || e.target;
  if(state.isplaying){
    if(toElement){  
      let IdControl = state.keys[keyCode];
      var _Elmm = document.getElementById(IdControl);    
      if(_Elmm.contains(toElement)){ 
        if(!state.isHover_){
          _Util.updPlayerStore("isHover_",true);
        }
        if(!state.hover){
          _Util.updPlayerStore("hover",true);
         // document.exitPointerLock();
        }       
      }
      else{
        if(state.isHover_){
          _Util.updPlayerStore("isHover_",false);
        }
        if(state.hover){
          _Util.updPlayerStore("hover",false);
          //document.body.requestPointerLock();
        }  
        if(state.dragging){
          _Util.updPlayerStore("dragging",false);
        }
      }
    }
    else{
      if(state.isHover_){
        _Util.updPlayerStore("isHover_",false);
      }
      if(state.hover){
        _Util.updPlayerStore("hover",false);
        //document.body.requestPointerLock();
      }  
      if(state.dragging){
        _Util.updPlayerStore("dragging",false);
      }
    }
  }
  if(!state.isHover_){
    if (state.mouseStillTimeoutId_) {
      window.clearTimeout(state.mouseStillTimeoutId_);
    }
    _Util.updPlayerStore("mouseStillTimeoutId_",null);
  }
  updKV('observePlayer',_Util.gen12CodeId());
}


/*

const onFullscreenClick_ = (state,updKV) => {  
  let id = state.keys[90]
  let  _videoContainer = document.getElementById(id);
  if(_videoContainer){     
    var isfS = !_Util.IsFullScreen(_videoContainer);
    _Util.updPlayerStore("isFullscreen",isfS);
    // setState({isFullscreen:isfS}); 
    _videoContainer.requestFullscreen();            
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
  }
  updKV('observePlayer',_Util.gen12CodeId());
}

*/



let lastCurrenTime = {};

const _updTimebyVideoId = (e, d, dispatch, updKV) => {
  let state = _Util.getPlayerStore();
  let detailVideoByID = null
  let bookmarkPositionID = state && state['bookmarkPositionID']?state['bookmarkPositionID']:"t308m72puwfcij4n";    
  if(!detailVideoByID){
    detailVideoByID = state && state["mediaId"];
  }

  if(e-lastCurrenTime[detailVideoByID]>10 || e-lastCurrenTime[detailVideoByID]<-10){
      lastCurrenTime[detailVideoByID] = e;
  }
  if(!lastCurrenTime[detailVideoByID] || e>lastCurrenTime[detailVideoByID] ){ 
  
    lastCurrenTime[detailVideoByID] = e+4;

    let NewBmP = {};
    NewBmP["started"] = true;
    NewBmP["completed"] = false;
    NewBmP["timeline"] = e;
    NewBmP["duration"] = d;
    if(d && e && detailVideoByID){  
      NewBmP["id"] = bookmarkPositionID    
      NewBmP["videoId"] = detailVideoByID;
      let Qry = {
        form:NewBmP,
        fields:["videoId"],
        query:"upgradeBookmarkPosition"
      }
      upgradeBookmarkPosition(Qry);

    }
  }
  
  
}





const launchBezel = (icon,ob) => {
  ob(icon);
}



const load = (url,_player, state,updKV,dispatch) => {
  
}




const beLoad = (state,updKV,distpatch,u) => { 
  let player = document.getElementById(window.playerHrmTag);
  if(player){
    const {_url, loadedVideo, _mp4} = state;
    var url = u || _url;
    if (_Util.shouldUseHLS(url) && !loadedVideo) {
      load(url,player,state,updKV,distpatch);
    }
    else if (_Util.shouldUseHLM(url) && !loadedVideo) {
      load(url,player,state,updKV,distpatch);
    }
    else if (_Util.shouldUseMP4(url) && !_mp4) {
      load(url,player,state,updKV,distpatch);
    } 
  }
  
}



const PlayButton = (e,updKV,state,distpatch,_openBezel) => {  
  let player = document.getElementById(window.playerHrmTag);
 // player && beLoad(state,updKV,distpatch);


 if (!player.duration) {
  // return;
 } 
 if (player.paused) {  
  _Util.updPlayerStore("isplaying",true);
  _Util.updPlayerStore("duration",player.duration);
   player.play();
   if(_openBezel){
      _openBezel('play');
   }
   
 } else {   
  _Util.updPlayerStore("isplaying",false); 
   player.pause();
  /*  
  var playPromise = player.play();
   if (playPromise !== undefined) {
     playPromise.then(_ => {
     
     })
     .catch(error => {
       
     });
   }
   */
   if(_openBezel){
    _openBezel('pause');
 }
 } 
 updKV('observePlayer',_Util.gen12CodeId());
}


/*

const seekTo = (seconds,player) => { 
  player.currentTime = seconds
}

const pause = (player,updKV) => {  
  player.pause()
  updKV("isplaying",false);
} 

const stop = (player,updKV) => {  
  player.pause();
  player.removeAttribute('src');
  updKV("isplaying",false);
  
}





*/



























const _styleWatch = (idWatch) => {  
  return `


  `
}







/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */