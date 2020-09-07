
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'


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

const onEnded = (e) => {
  
}

const onError = (e) => {
  
}

const PlayPauseClick_ = (updKV,_openBezel) => {  
  let player = document.getElementById(window.playerHrmTag);  
  if (!player.duration) {
   // return;
  } 
  if (player.paused) {  
    updKV("isplaying",true);
    updKV("duration",player.duration);
    player.play();
    _openBezel('play');
  } else {   
    updKV("isplaying",false);
    player.pause();
    _openBezel('pause');
  }  
}


const onFullscreenClick_ = (e,state,updKV) => {
  let  _videoContainer = document.getElementById(state.keys[90]);
  console.log(_videoContainer);
  if(_videoContainer){     
    var isfS = !_Util.IsFullScreen(_videoContainer);  
    updKV("isFullscreen",isfS); 
    _videoContainer.requestFullscreen();            
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
  } 
}





const onKeyDown_ = (event,updKV,state,_openBezel) => {
 
  let player = document.getElementById(window.playerHrmTag);
  let hls = window._hlsHRM;
  var ignoreSiema = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(event.target.nodeName) !== -1;
  if (ignoreSiema) {
    return;
  }
  if(player){ 

      var key =  event.keyCode;  
      console.log(key)
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
          updKV('volume',elm.volume);
          _openBezel('volume_down');
        }else{
        elm.volume = 0;
        updKV('volume',elm.volume);
        _openBezel('volume_mute');
        }
      }
      else if(key === 38){
        if(elm.volume + 0.1< 1){
          elm.volume = elm.volume + 0.1;
          updKV('volume',elm.volume);
          _openBezel('volume_up');
        }else{
          updKV('volume',elm.volume);
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
        onFullscreenClick_(event,state,updKV);
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
      else if(key === 70){   
        onFullscreenClick_(event,state,updKV);
      }
      else if(key === 77){  
        this.player.muted = !this.player.muted;
        if(this.player.muted){
          _openBezel('volume_mute');
          updKV('isMute',true);
        }else{
          _openBezel('volume_up');
          updKV('isMute',false);
        }            
      }
    }
  
}




const updCurrentTime = (e,updKV,state) => {  
  updKV("currentTime",e.target.currentTime);
  if(!state.duration){
    updKV("duration",e.target.duration);
  }
}




const addListeners = (player,updKV,state,_openBezel) => {
  document.addEventListener('keydown', (e)=>onKeyDown_(e,updKV,state,_openBezel))
  player.addEventListener('canplay', (e)=>onReady(e,updKV))
  //document.addEventListener('contextmenu', onContextmenu.bind(_th6_))
  /*
  player.addEventListener('play', onPlay)
  player.addEventListener('pause', onPause)
  player.addEventListener('seeked', onSeek)
  */
  player.addEventListener('ended', onEnded)
  player.addEventListener('error', onError)
  player.addEventListener('timeupdate',  (e)=>updCurrentTime(e,updKV,state) )
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
    loop,
    controls,
    updKV,
    ct,
    idWatch,
    _openBezel
  } = props 



  var  _state = _Util.getPlayerStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;

  const { hover}  = _state;

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
      addListeners(_player,updKV,_state,_openBezel);
      setInitialize(true);
      window.playerHrmTag = `${IdVideo}_video`;
    }
  });



  
  return (
    <>
    <Element
      // ref={ref}
      id={`${IdVideo}_video`}
      src={src}
      style={style}
      preload='auto'
      controls={controls}        
      loop={loop}
      >                              
    </Element>
    </>
  )
})

export default HRMPLAYER;
