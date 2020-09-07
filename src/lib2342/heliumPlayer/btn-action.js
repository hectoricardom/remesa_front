
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../../store/Util'


import {Icon2} from '../Icons'

import './style.css';

import { getFtpStreamSrt , getFtpStreamVideo64 } from '../../actions/common';
// import OpenSubtitle from './OpenSubtitle';

import ProgressVolume from './VolumenBar'



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
  return { updKV, _dispatch_, observePlayer }
}





const PlayButton = (props) => {
  if(typeof props.PlayButton === "function"){
    props.PlayButton();
  }
}

const handleSomethingWrong = (e) => {
  //console.log(e);
}

const somethingWrong = (props) => {
  if(typeof props.somethingWrong === "function"){
    props.somethingWrong();
  }
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



const open_UploadOptions = (e) => {

}



const handleAudioId = (e) => {
  // window._hlsHRM.audioTrackController.setAudioTrackInternal(e);
}



const open_actionsOptions = (props,e) => {
  if(typeof props.OpenSubtitleFile === "function"){
    props.OpenSubtitleFile(e);
  }
}

const rw0_5SecSyncTime = (e) => {

}

const fw0_5SecSyncTime = (e) => {

}

const clearSyncTime = (e) => {

}

const enableSyncTime = (e) => {

}




const BtnsAction = (props) => {

  const {  updKV, _dispatch_, observePlayer } = useObserveChanges();

  var _state = _Util.getPlayerStore();
  const keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;

  const { idWatch,_openBezel} = props;
  const [obs, setObs] = useState(0);


  const { 
    isFullscreen,
    currentTime, 
    isplaying,
    /*  
    visible, 
   
    volume, 
    isMute, 
    audio_list, 
    subtitle_list,
    subtitleSyncTime, 
    subtitleId,  
    subtitle 
    */
  }  = _state;
  


 

//const [nextIndex, setNextIndex] = useState(null);

const _nextlist = _state && _state["nextlist"];
const nextlistCurrent = _state && _state["nextlistCurrent"];


//const [nextlist, setNextlist] = useState(null);

let isNextAvailable = _nextlist && Array.isArray(_nextlist) && _nextlist.length>0;  
let cInd = null;  
if(isNextAvailable){
  _nextlist.map((nt,i2)=>{
    if(nt===nextlistCurrent){
      cInd = i2;
    }
  })
  // setNextIndex(nxtInd);
}


const onNext = () => {
  let nxtInd = null;   
  let nextlistS = _nextlist.sort(function(a, b) {
    if(a < b) { return -1; }
    if(a > b) { return 1; }      
    return 0;
  })    
  nextlistS.map((nt,i2)=>{
    if(nt===nextlistCurrent){
      nxtInd = i2+1;
    }
  })
  //setNextlist(nextlistS);
  //setNextIndex(nxtInd);
  let nxt = nextlistS[nxtInd];
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
    getFtpStreamVideo64(q,_dispatch_); 
  } 
  
}




  // let audioID = window._hlsHRM &&  window._hlsHRM.audioTrackController && window._hlsHRM.audioTrackController.audioTrack;



  var Tcurrent = currentTime?_Util.buildTimeString_(currentTime,true):'';
  var IconPP = isplaying?"pause":"play";  
  var Fsc = isFullscreen?'fullscreenExit':'fullscreenExit';




 
  return(
    <>
    <div className="btnC" >
      {/*<Dialog ref={this.ref} height={124}>
       
        </Dialog>*/}
      <div  className="ControlBar">
        <div className="scrubber-action--container">       
          <a className="nfp-button-control" onClick={()=>PlayButton(props)}>
            <Icon2 name={IconPP} color={'#fff'} size={'1.6em'}/>
          </a>
          <ProgressVolume           
            state={_state}
            observePlayer={observePlayer} 
            updKV={updKV}
            keys={keys}
            _openBezel={_openBezel}
          />
          <div className="PlayerControls--control-element text-control time-remaining--modern PlayerControls--control-element-hidden"><time className="time-remaining__time">{Tcurrent}</time></div>           
          <div className="title_video">{ _state["titleName"]?` ${_state["titleName"]}`:""}</div>           
          
          <div className="flexSpace"/>  
         {/* 
          <a className="nfp-button-control" onClick={()=>open_UploadOptions()}>
            <Icon2 name={'public'} color={'#fff'} size={'1.6em'}/>
          </a>
          */} 


          {isNextAvailable && _nextlist && _nextlist[cInd+1] ?
          <TouchablePopupButton confirm={()=>onNext(props)} icon={'next_outline'}  updKV={updKV} state={_state} keys={keys} observePlayer={observePlayer}  keyCode={67}> 
              <div className="next--alert" >
                <p> {`${_Util.translatetext(539)}`}</p>
                <a onClick={()=>onNext(props)}> { _nextlist[cInd+1].split('/').pop()}</a>                  
              </div>
          </TouchablePopupButton>
          :null}



          <TouchablePopupButton confirm={()=>handleSomethingWrong()} icon={'alert'}  updKV={updKV} state={_state} keys={keys} observePlayer={observePlayer}  keyCode={62}> 
              <div className="something--wrong" >
                <a onClick={()=>somethingWrong(props)}> {`${_Util.translatetext(540)}`} </a>                  
              </div>
          </TouchablePopupButton>


          
          <TouchablePopupButton confirm={()=>handleSomethingWrong} icon={'quality'}   updKV={updKV}  state={_state} keys={keys}  observePlayer={observePlayer} keyCode={64}> 
            <SubtitleChoose />
          </TouchablePopupButton>
         {/*   */}
          <a className="nfp-button-control" onClick={(e)=>FullScreenButton(e,updKV, keys[90])}>            
            <Icon2 name={Fsc} color={'#fff'} size={'1.6em'}/>
          </a>            
        </div>
       </div>        
    </div>
   
    </>
  )
}

export default BtnsAction;











































const SubtitleChoose = (props) => { 

  const {  updKV, _dispatch_, observePlayer } = useObserveChanges();

  var _state = _Util.getPlayerStore();
  const keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;

  const { 
    /*
    isFullscreen, 
    visible, 
    currentTime, 
    isplaying, 
    volume, 
    isMute,
    subtitle_list,
    */
    audio_list, 
    subtitleSyncTime, 
    subtitleId,  
    subtitle 
  }  = _state;
  
  let audioID = window._hlsHRM &&  window._hlsHRM.audioTrackController && window._hlsHRM.audioTrackController.audioTrack;
 
  const handleSubtitleId = (e,id) => {
    _Util.updPlayerStore("subtitleId",id) 
    updKV("observePlayer",_Util.gen12CodeId());
  }

  const rmvSrt = (id) => {
    setTimeout(()=>{
      let _ftpSubtitle = subtitle;    
      let _ftpStreamJson = _state["srtStreamJson"];
      if(_ftpSubtitle[id]){
        delete _ftpSubtitle[id];
        _Util.updPlayerStore("subtitle",_ftpSubtitle) 
        _Util.updPlayerStore("subtitleId",null);      
      }
      Object.keys(_ftpStreamJson).map(srt=>{
        if(srt.indexOf(id)>=0){        
          delete _ftpStreamJson[srt];   
          _Util.updPlayerStore("srtStreamJson",_ftpStreamJson) 
        }
      });
      updKV("observePlayer",_Util.gen12CodeId());
    },250)
   
  }


  const getSrtbyVideo = () => {
    let fV = _state && _state["nextlistCurrent"]; 
    fV && ["srt"].map(sbt=>{      
      let ext = fV.split('.').pop();
      let _srt_  = fV.replace(ext,sbt);
      let _srtObj = {pth:_srt_,ext:sbt}
      getFtpStreamSrt(_srtObj,_dispatch_, _state);
      _Util.updPlayerStore("srt2List",_srt_) 
      //updKV("srt2List",_srt_);
    })

  }


return (
      <div className="audio--subtitle--options">
                <div className="wrapper">
                  {                  
                  audio_list && audio_list.length>1 && 
                  <div className="colums">
                    <div  className="title">
                      {`${_Util.translatetext(541)}`}
                    </div>   
                    {audio_list.map((ad,i)=>{

                      return(
                        <div className={`items ${audioID===i?'active':''}`} onClick={(e)=>handleAudioId(i,ad)} key={i}>
                          <div className={`marked`}>{audioID===i?<Icon2 name={'success'} color={'#fff'} size={'1.6em'}/>:null}</div> <div className={`_label`}>{ad.lang}</div>
                        </div>
                      )
                    })}
                  </div>
                  }
                  <div className="colums">
                    <div  className="header_subtitle">
                      <div  className="syncTime_seconds"> {subtitleSyncTime?subtitleSyncTime:null}</div>  
                      <div  className="title">
                      {`${_Util.translatetext(542)}`}
                        
                      </div>
                      <div className="flexSpace"/>  
                      <a className="icons_btn_search" onClick={(e)=>getSrtbyVideo(_state)}>
                        <Icon2 name={'search'} color={'#fff'} size={'1.2em'}/>
                      </a>
                      {/*
                      {isSyncTime? <a className="icons_btn" onClick={(e)=>rw0_5SecSyncTime(e)}>
                          <Icon2 name={'arrow_left'} color={'#fff'} size={'0.986em'}/>
                        </a> :null}
                        {isSyncTime? <a className="icons_btn" onClick={(e)=>fw0_5SecSyncTime(e)}>
                          <Icon2 name={'arrow_right'} color={'#fff'} size={'0.986em'}/>
                        </a> :null}
                        {isSyncTime? <a className="icons_btn" onClick={(e)=>clearSyncTime(e)}>
                          <Icon2 name={'delete'} color={'#fff'} size={'0.986em'}/>
                        </a>
                        :null}
                        {false && isSyncTime? null: <a className="icons_btn" onClick={(e)=>enableSyncTime(e)}>
                          <Icon2 name={'history'} color={'#fff'} size={'0.986em'}/>
                        </a>}
                      */}
                    </div>  
                    <div className="list_subtitles">
                      <div className={`items ${subtitleId?'':'active'}`} onClick={(e)=>handleSubtitleId(e,null)}>
                        <div className={`marked`}>{!subtitleId?<Icon2 name={'success'} color={'#bf1315'} size={'1.6em'}/>:null}</div> <div className={`_label`}>{`${_Util.translatetext(543)}`}</div>
                      </div>
                      {subtitle && Object.keys(subtitle).map((st,i)=>{
                        return(
                        <div className={`items ${subtitleId===st?'active':''}`} onClick={(e)=>handleSubtitleId(e,st)} key={i}>
                          <div className={`marked`}>{subtitleId===st?<Icon2 name={'success'} color={'#bf1315'} size={'1.6em'}/>:null}</div> <div className={`_label`}>{st}</div>
                          <div className="flexSpace"/> 
                          <div onClick={()=>rmvSrt(st)}>
                            <Icon2 
                              name={'outline_delete'} 
                              color={'#555'} 
                              size={24} 
                              //tooltip={'delete locations'}
                              extraClass={'delete'}
                            />            
                          </div>
                        </div>
                        )
                      })} 
                       {/*
                      <div className="items"  onClick={(e)=>open_actionsOptions(e,false)}>                        
                        <div className={`marked`}></div> <div className={`_label`}>{'from Url'}</div>    
                      </div>
                      */}
                      
                      <div className="items" onClick={(e)=>open_actionsOptions(props,true)} >
                        <div className={`marked`}></div> <div className={`_label`}>{`${_Util.translatetext(544)}`}</div>                       
                      </div>
                    </div>
                  </div>
                </div>                 
              </div>
    )
}



export {SubtitleChoose}









const confirm_TouchablePopupButton = (e,setActive, props) => {
  setActive(e)
  if (typeof props.confirm === 'function') { props.confirm();}
}

const handleIn_TouchablePopupButton = (e,active,setActive,updKV,state) => { 
  if(!active){
    if(state.barVisible){
      _Util.updPlayerStore('barVisible',false);
    }
    setActive(true);
  }
  updKV('observePlayer',_Util.gen12CodeId()); 
}

const handleOut_TouchablePopupButton = (e,active,setActive,updKV,state, keyCode) => {  
  var toElement = e.toElement || e.relatedTarget || e.target;
  let IdControl = state.keys[keyCode];
  var _Elmm = document.getElementById(IdControl);
  if(toElement && _Elmm && _Elmm.contains(toElement)){
    // console.log(toElement)
  }else{
    if(active){
      if(!state.barVisible){
        _Util.updPlayerStore('barVisible',true);
      }
      setActive(false);
    }
  }
  updKV('observePlayer',_Util.gen12CodeId()); 
}


const handleIn_TouchablePopupButtonContent = (e,active,setActive,updKV,state) => { 
  if(!active){
    if(state.barVisible){
      _Util.updPlayerStore('barVisible',false);
    }
    setActive(true);
  }
  updKV('observePlayer',_Util.gen12CodeId()); 
}


const TouchablePopupButton = (props) => {

  const {children,style,icon, state, updKV, keys, keyCode} = props; 
  
  const [active,setActive] = useState(false);
  var sty = style?style:{};
  return(
          <div className="touchable ReportAProblemPopupContainer PlayerControls--control-element nfp-popup-control" 
            onClick={(e)=>confirm_TouchablePopupButton(e, setActive, props)}             
            onMouseMove={(e)=>handleIn_TouchablePopupButton(e,active,setActive,updKV,state)} 
            onMouseOut={(e)=>handleOut_TouchablePopupButton(e,active,setActive,updKV,state,keyCode)}
          >
            <a className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerReportAProblem">
              <Icon2 name={icon} color={'#fff'} size={'1.6em'}/>
            </a>
            <div 
              id={keys[keyCode]} 
              style={sty} 
              className={`touchable popup-content-wrapper keep-right ${active?'active':''}`}
              onMouseMove={(e)=>handleIn_TouchablePopupButtonContent(e,active,setActive,updKV,state)} 
            >   
              {state.hover && active?children:null}        
            </div>
          </div>
  )
}

