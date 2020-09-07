
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../../store/Util'
import {  getFtpStreamVideo64 } from '../../actions/common';

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
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
  return {  updKV, _dispatch_ }
}







const onReady =  (e,updKV) => {
}

const onEnded = (dispatch) => {
  let state = _Util.getPlayerStore();
  let nextlist = state && state["nextlist"];
  let nextlistCurrent = state && state["nextlistCurrent"];
  let nxtInd = null;   
  let nextlistS = nextlist.sort(function(a, b) {
    if(a < b) { return -1; }
    if(a > b) { return 1; }      
    return 0;
  })    
  nextlistS.map((nt,i2)=>{
    if(nt===nextlistCurrent){
      nxtInd = i2+1;
    }
  })
  let nxt = nextlist[nxtInd];
  if(nxt){
    _Util.updPlayerStore("loadedVideo",false);
    _Util.updPlayerStore("hls",null);
    _Util.updPlayerStore("currentTime",0);
    _Util.updPlayerStore("W2Seek",false);
    _Util.updPlayerStore("dragging",false);
    _Util.updPlayerStore("subtitleId",null);
    _Util.updPlayerStore("subtitle",{});
    _Util.updPlayerStore("duration",0);
    if(window._hlsHRM){
      window._hlsHRM.destroy();
    }
    _Util.updPlayerStore("nextlistCurrentIndex",nxtInd);
    _Util.updPlayerStore("nextlistCurrent",nxt);
    let q = {pth:nxt, ext:nxt.split(".").pop()}
    let filName = nxt.split("/").pop()
    _Util.updPlayerStore("titleName",filName);
    getFtpStreamVideo64(q,dispatch); 
  } 
  
}

const onError = (e) => {
  
}

const PlayPauseClick_ = (updKV,_openBezel) => {  
  let player = document.getElementById(window.playerHrmTag);  
  if (!player.duration) {
  // return;
  }
  if (player.paused) {  
    _Util.updPlayerStore("isplaying",true);
    _Util.updPlayerStore("duration",player.duration);
    player.play();
    _openBezel('play');
  } else {   
    _Util.updPlayerStore("isplaying",false);
    player.pause();
    _openBezel('pause');
  } 
  updKV('observePlayer',_Util.gen12CodeId()); 
}


const onFullscreenClick_ = (state,updKV) => {
  let  _videoContainer = document.getElementById(state.keys[90]);
  if(_videoContainer){
    var isfS = !_Util.IsFullScreen(_videoContainer);  
    _Util.updPlayerStore("isFullscreen",isfS);
    _videoContainer.requestFullscreen = _videoContainer.requestFullscreen || _videoContainer.mozRequestFullScreen || _videoContainer.msRequestFullscreen || _videoContainer.webkitRequestFullscreen;
    _videoContainer.requestFullscreen();
    console.log(_videoContainer)
    if (_Util.fullscreenElement()) { 
      let doc =  document;
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
  updKV('observePlayer',_Util.gen12CodeId());
}



var lastClick = 0;

const onKeyDown_ = (event,updKV,state,_openBezel) => {
  var _now = (new Date()).getTime();
  if(_now>lastClick){
    lastClick = _now+230;
    let player = document.getElementById(window.playerHrmTag);
    let hls = window._hlsHRM;
    var ignoreSiema = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(event.target.nodeName) !== -1;
    if (ignoreSiema) {
      return;
    }
    if(player){ 

      var key =  event.keyCode; 
      var elm = player;
      var drt = elm.duration;
      event.preventDefault();
      if(key >48 && key < 58){
        let p = (10-(58-key))*.1;
        elm.currentTime = drt*p;
        _openBezel('');
      }
      else if(key >96 && key < 106 ){
        let p = (10-(106-key))*.1;
        elm.currentTime = drt*p;
       
      }
      else if(key === 32){
        PlayPauseClick_(updKV,_openBezel);          
      }
      else if(key === 37){
        if(elm.currentTime - 5>0){
          elm.currentTime = elm.currentTime - 5;
        }else{
        elm.currentTime = 0;
        }
      }
      else if(key === 39){
        if(elm.currentTime + 5< drt){
          elm.currentTime = elm.currentTime + 5;
        }else{
        elm.currentTime = drt;
        }
      }
      else if(key === 109){
        if(elm.currentTime - 30>0){
          elm.currentTime = elm.currentTime - 30;
        }else{
        elm.currentTime = 0;
        }
      }
      else if(key === 107){
        if(elm.currentTime + 30< drt){
          elm.currentTime = elm.currentTime + 30;
        }else{
        elm.currentTime = drt;
        }
      }
      else if(key === 40){
        if(elm.volume - 0.1>0){
          elm.volume = elm.volume - 0.1;
          _Util.updPlayerStore('volume',elm.volume);
          _openBezel('volume_down');
        }else{
        elm.volume = 0;
        _Util.updPlayerStore('volume',elm.volume);
        _openBezel('volume_mute');
        }
      }
      else if(key === 38){
        if(elm.volume + 0.1< 1){
          elm.volume = elm.volume + 0.1;
          _Util.updPlayerStore('volume',elm.volume);
          _openBezel('volume_up');
        }else{
          _Util.updPlayerStore('volume',elm.volume);
          elm.volume = 1;         
        }
      }
      else if(key === 82){
        elm.currentTime = 0;
      }
      else if(key === 83){
        //onCaptionClick_();
      }
      else if(key === 27){          
        onFullscreenClick_(state,updKV);
      }
      else if(key === 81){  
        if(hls){
          var c = hls.streamController;          
          var nlc = c.level+1
          if(nlc>=c.levels.length){
            nlc = 0;
          }
          hls.nextLevel = nlc;
        }
      }
      else if(key === 65){
        if(hls){
          let aud = hls.audioTrackController; 
                 
          let alc = aud.audioTrack+1
          if(alc>=aud.audioTracks.length){
            alc = 0;
          }
          // hls.audioTrackController.setAudioTrackInternal(alc);
        }
      }
      else if(key === 70){   
        onFullscreenClick_(state,updKV);
      }
      else if(key === 77){  
        elm.muted = !elm.muted;
        if(elm.muted){
          _openBezel('volume_mute');
          _Util.updPlayerStore('isMute',true);
        }else{
          _openBezel('volume_up');
          _Util.updPlayerStore('isMute',false);
        }            
      }
    }
  }
  updKV('observePlayer',_Util.gen12CodeId());
}

let lastUpdateBookmarkPosition = 0;


const updCurrentTime = (e, dispatch, ste, props) => { 
  let state = _Util.getPlayerStore();
  let _currentTime = (e.target.currentTime)*1; 
  _Util.updPlayerStore("currentTime",_currentTime);
  
  props.updTimebyVideoId(e.target.currentTime,e.target.duration);
  
  
  if(!state.duration || isNaN(state.duration)){
   // updKV("duration",e.target.duration);
  }
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observePlayer',value:_Util.gen12CodeId()}
  }) 
}




const addListeners = (player, updKV, state, _openBezel, props, dispatch) => {
  document.addEventListener('keydown', (e)=>onKeyDown_(e,updKV,state,_openBezel))
  player.addEventListener('canplay', (e)=>onReady(e,updKV))
  //document.addEventListener('contextmenu', onContextmenu.bind(_th6_))
  /*
  player.addEventListener('play', onPlay)
  player.addEventListener('pause', onPause)
  player.addEventListener('seeked', onSeek)
  */
  player.addEventListener('ended',  ()=>onEnded(dispatch));
  player.addEventListener('error', onError)
  player.addEventListener('timeupdate',  (e)=>updCurrentTime(e,dispatch,state,props) )
  /*
  if (playsinline) {
    player.setAttribute('playsinline', '')
    player.setAttribute('webkit-playsinline', '')
  }
  */
}




const removeListeners = (player) => {
  document.removeEventListener('keydown', ()=>onKeyDown_())
  player.removeEventListener('canplay', onReady)

  /*
  player.removeEventListener('play', onPlay)
  player.removeEventListener('pause', onPause)
  player.removeEventListener('seeked', onSeek)
  */
  player.removeEventListener('ended', onEnded)
  player.removeEventListener('error', onError)
}






const HRMPLAYER = React.forwardRef((props, ref) => {
  const { 
    url,
    distpatch,
    loop,
    controls,
    state,
    updKV,
    ct,
    keys,
    idWatch,
    _openBezel
  } = props 

  const { hover }  = state;

  const [initialize, setInitialize] = useState(false);
  
  let IdVideo = keys[95];

  var _Url = window.location.href.split("#")[1];
  const useAudio = _Util.shouldUseAudio(props)
  const useHLS = _Util.shouldUseHLS(_Url)
  //const useDASH = this.shouldUseDASH(_Url)
  const Element = useAudio ? 'audio' : 'video';    
  const src = useHLS;  
  const style = {
    width: '100%',
    height:'100%',
    top:0,
    left:0,
    position:'absolute',
    cursor: hover ? `default` : `none`
  }


  useEffect(() => {
    let _player = document.getElementById(`${IdVideo}_video`);
    if(_player && !initialize){
      addListeners(_player, updKV, state, _openBezel,props, distpatch);
      setInitialize(true);
      window.playerHrmTag = `${IdVideo}_video`;
    }
  });



  
  return (
    <>
    <Element
      // ref={ref}
      id={`${IdVideo}_video`}
      src={src?src:""}
      style={style}
      preload='auto'
      controls={controls}        
      loop={loop}      
      crossOrigin={'anonymous'}
      >                              
    </Element>
    </>
  )
})

export default HRMPLAYER;
