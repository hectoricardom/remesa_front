
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'


import Icons from './Icons/Icons'

import './styles/style.css';
// import OpenSubtitle from './OpenSubtitle';





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
  console.log(_videoContainer);
  if(_videoContainer){     
    var isfS = !_Util.IsFullScreen(_videoContainer);  
    updKV("isFullscreen",isfS);
    // setState({isFullscreen:isfS}); 
    _videoContainer.requestFullscreen();            
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
  } 
}

const open_UploadOptions = (e) => {

}

const handleSubtitleId = (e) => {

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

  const { _state, updKV, _dispatch_ } = useObserveChanges();

  const { idWatch,_openBezel} = props;
  const [obs, setObs] = useState(0);
  const { 
    isFullscreen, 
    visible, 
    currentTime, 
    isplaying, 
    volume, 
    isMute, 
    audio_list, 
    subtitle_list,
    subtitleSyncTime, 
    keys, 
    subtitleId,  
    subtitle 
  }  = _state;


  let audioID = 0;
 
  let classN = _styleBtnsAction(idWatch);




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
            <Icons name={IconPP} color={'#fff'} size={'1.6em'}/>
          </a>
          <ProgressVolume           
            state={_state} 
            updKV={updKV}
            _openBezel={_openBezel}
          />
          <div className="PlayerControls--control-element text-control time-remaining--modern PlayerControls--control-element-hidden"><time className="time-remaining__time">{Tcurrent}</time></div>           
          <div className="flexSpace"/>  
         {/* 
          <a className="nfp-button-control" onClick={()=>open_UploadOptions()}>
            <Icons name={'public'} color={'#fff'} size={'1.6em'}/>
          </a>
          */}

          <TouchablePopupButton confirm={()=>handleSomethingWrong()} icon={'alert'}  updKV={updKV} state={_state}  keyCode={62}> 
              <div className="something--wrong" >
                <a onClick={()=>somethingWrong(props)}> Algo salio mal? Cuentanos.</a>                  
              </div>
          </TouchablePopupButton>


          
          <TouchablePopupButton confirm={()=>handleSomethingWrong} icon={'quality'}   updKV={updKV}  state={_state} keyCode={64}> 
              <div className="audio--subtitle--options">
                <div className="wrapper">
                  {                  
                  audio_list && audio_list.length>0 && 
                  <div className="colums">
                    <div  className="title">
                      Audio
                    </div>   
                    {audio_list.map((ad,i)=>{
                      return(
                        <div className={`items ${audioID===i?'active':''}`} onClick={(e)=>handleSubtitleId(e,ad)} key={i}>
                          <div className={`marked`}>{audioID===i?<Icons name={'done'} color={'#fff'} size={'1.6em'}/>:null}</div> <div className={`_label`}>{ad.lang}</div>
                        </div>
                      )
                    })}
                  </div>
                  }
                  <div className="colums">
                    <div  className="header_subtitle">
                      <div  className="syncTime_seconds"> {subtitleSyncTime?subtitleSyncTime:null}</div>  
                      <div  className="title">
                        Subtitulos
                      </div>
                      {/*
                      {isSyncTime? <a className="icons_btn" onClick={(e)=>rw0_5SecSyncTime(e)}>
                          <Icons name={'arrow_left'} color={'#fff'} size={'0.986em'}/>
                        </a> :null}
                        {isSyncTime? <a className="icons_btn" onClick={(e)=>fw0_5SecSyncTime(e)}>
                          <Icons name={'arrow_right'} color={'#fff'} size={'0.986em'}/>
                        </a> :null}
                        {isSyncTime? <a className="icons_btn" onClick={(e)=>clearSyncTime(e)}>
                          <Icons name={'delete'} color={'#fff'} size={'0.986em'}/>
                        </a>
                        :null}
                        {false && isSyncTime? null: <a className="icons_btn" onClick={(e)=>enableSyncTime(e)}>
                          <Icons name={'history'} color={'#fff'} size={'0.986em'}/>
                        </a>}
                      */}
                    </div>  
                    <div className="list_subtitles">
                      <div className={`items ${subtitleId?'':'active'}`} onClick={(e)=>handleSubtitleId(e,null)}>
                        <div className={`marked`}>{!subtitleId?<Icons name={'done'} color={'#fff'} size={'1.6em'}/>:null}</div> <div className={`_label`}>{'Desactivado'}</div>
                      </div>
                      {subtitle && Object.keys(subtitle).map((st,i)=>{
                        return(
                        <div className={`items ${subtitleId===st?'active':''}`} onClick={(e)=>handleSubtitleId(e,st)} key={i}>
                          <div className={`marked`}>{subtitleId===st?<Icons name={'done'} color={'#fff'} size={'1.6em'}/>:null}</div> <div className={`_label`}>{st}</div>
                        </div>
                        )
                      })} 
                       {/*
                      <div className="items"  onClick={(e)=>open_actionsOptions(e,false)}>                        
                        <div className={`marked`}></div> <div className={`_label`}>{'from Url'}</div>    
                      </div>
                      */}
                      <div className="items" onClick={(e)=>open_actionsOptions(props,true)} >
                        <div className={`marked`}></div> <div className={`_label`}>{'cargar archivo'}</div>                       
                      </div>
                    </div>
                  </div>
                </div>                 
              </div>
          </TouchablePopupButton>
         {/*   */}
          <a className="nfp-button-control" onClick={(e)=>FullScreenButton(e,updKV, keys[90])}>            
            <Icons name={Fsc} color={'#fff'} size={'1.6em'}/>
          </a>            
        </div>
       </div>        
    </div>
    <style>{classN}</style>
    </>
  )
}

export default BtnsAction;






const _styleBtnsAction = (idWatch) => {  
  return `
  .nfp_${idWatch} .scrubber-action--container {
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
    height: 2.5em; 
  }
  


  


  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 12px;
    padding: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.6;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px;
    --slider_thumb--:32px;
  }
  
  
  
  /*
  [is-mobile="false"] .slider:hover {
    opacity: 1;
    padding: 5px;
    margin-left: -2px;
    margin-top: -1px;
  }
  
  
  [is-mobile="false"] .slider:hover::-webkit-slider-thumb,
  [is-mobile="false"] .slider:hover::-moz-range-thumb
  {
    width: 30px;
    height: 30px;
  }
  
  */
  
  
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--slider_thumb--);
    height: var(--slider_thumb--);
    border-radius: 50px;
    background: var(--color-base--hover);;
    cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
    width: var(--slider_thumb--);
    height: var(--slider_thumb--);
    background: var(--color-base--hover);
    cursor: pointer;
  }
  
  
  

  `
}
















const handleIn_Volume = (state,updKV) => {   
  if(!state.activeVolume){    
    if(state.barVisible){
      updKV('barVisible',false);
    }
    updKV('activeVolume',true);
  }
}
 
 
 const handleOut_Volume = (state,updKV) => { 
    if(state.activeVolume){  
      if(!state.barVisible){
        updKV('barVisible',true);
      }
      updKV('activeVolume',false);
    }
 }
 
 const handleRange_Volume = (event, updKV) => { 
   var c2ct = event.target.value;
   let _player = document.getElementById(window.playerHrmTag);
    _player["volume"] = c2ct;
    updKV('volume',c2ct);
 }
 
 const confirm_Volume = (props, updKV, state) => {
  if(state.activeVolume){  
    if(!state.barVisible){
      updKV('barVisible',true);
    }
    updKV('activeVolume',false);
  }  
  if (typeof props.confirm === 'function') { props.confirm();}
 }
 
 const mute_Volume = (props,updKV,state,_openBezel) => { 
 
    let _player = document.getElementById(window.playerHrmTag);
    if(state.activeVolume){
      updKV('activeVolume',false);
    }
    updKV('isMute',!_player.muted);
    if(_player.muted){
      _openBezel('volume_up');
    }else{
      _openBezel('volume_mute');
    }
    _player.muted = !_player.muted; 
    if(!state.barVisible){
      updKV('barVisible',true);
    }
    if (typeof props.confirm === 'function') { props.confirm();}
 }
 




const ProgressVolume = (props) => { 
    const {state, updKV, _openBezel} = props; 

    const {activeVolume,isMute, volume,  keys} = state; 

    const [stateHover, setStateHover] = useState({});

    const { ct, dragging} = stateHover; 

    let _volume = volume?volume:1;

    var ct2 = dragging? ct: _volume*100;
    var icon = isMute?'volume_mute':ct2/100>0.5?'volume_up':ct2/100===0?'volume_mute':'volume_down';
    let ProgressVolumeId  = `${keys[82]}_progressVolume`;
    let classN = _styleVolumeAction(ProgressVolumeId);
    

    let styleRange = {
      "--heliumPlayer--max":1,
      "--heliumPlayer--min":0,
      "--heliumPlayer--val":ct2/100,
      "--heliumPlayer--range--volume--active-percent":`${ct2}%`,
      "--heliumPlayer--range--volume--back-percent":`${100-ct2}%`,
      "--heliumPlayer--color--range--volume--active":"#e50914",
      "--heliumPlayer--color--range--volume--back":"#7e7e7e"
    }
      
    return(
            <div className={`touchable ReportAProblemPopupContainer PlayerControls--control-element nfp-popup-control `} 
              onClick={(e)=>confirm_Volume(props,updKV,state)} 
              onMouseMove={(e)=>handleIn_Volume(state,updKV)} 
              onMouseOut={(e)=>handleOut_Volume(state,updKV)}
              >
              <a className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerReportAProblem" onClick={(e)=>mute_Volume(props,updKV, state,_openBezel)} >
                <Icons name={icon} color={'#fff'} size={'1.6em'}/>
              </a>
              <div className={`touchable popup-content-wrapper keep-right  Vol_ ${activeVolume?'active':''}`} >              
                <div className="volume--container"  style={styleRange}>                  
                  <div id={`${ProgressVolumeId}`} className={`volume_bar_wrp_${ProgressVolumeId}`}/>
                  <div id={`${ProgressVolumeId}`} className={`volume_bar_progress_${ProgressVolumeId}`}/>                  
                  <input className={`slider_${ProgressVolumeId}`} type="range" min={0} max={1} step={0.01} value={ct2/100} onChange={(e)=>handleRange_Volume(e,updKV)}/>      
                </div>        
              </div>
              <style>{classN}</style>
            </div>
    )
}





const _styleVolumeAction = (idWatch) => {  
  return `


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
    --slider_thumb--:3em;  
    background-color: transparent;
    position: absolute;    
  }

  input[type='range'].slider_${idWatch}::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--slider_thumb--);
    height: var(--slider_thumb--);
    border-radius: 50px;
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
    --slider_thumb--:32px;  
    background-color: var(--heliumPlayer--color--range--volume--back);
    -webkit-appearance: none;
    width: 96%;
    height: 24px;
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
    --slider_thumb--:32px;  
    background-color: var(--heliumPlayer--color--range--volume--active);
    -webkit-appearance: none;
    width: var(--heliumPlayer--range--volume--active-percent);
    max-width: 90%;
    height: 24px;
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








  /*



  .volume_bar_slide_thumb_${idWatch}{
    -webkit-appearance: none;
    appearance: none;
    margin-top: -10px;
    width: var(--slider_thumb--);
    height: var(--slider_thumb--);
    border-radius: 50px;
    background: var(--heliumPlayer--color--range--volume--active); 
    cursor: pointer;
    position: absolute;
  }

 


  */






  @media screen and (-webkit-min-device-pixel-ratio:0) {

  }
/*


    input[type='range'].slider_${idWatch} {      
      /*overflow: hidden;*/
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
      width: var(--slider_thumb--);
      height: var(--slider_thumb--);
      border-radius: 50px;
      background: var(--heliumPlayer--color--range--volume--active); 
      cursor: pointer;
      /*
      box-shadow: -120px 0 0 120px var(--heliumPlayer--color--range--volume--active);
      */
    }
    
    input[type='range'].slider_${idWatch}::-moz-range-thumb {
      width: var(--slider_thumb--);
      height: var(--slider_thumb--);
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



  `
}


















const confirm_TouchablePopupButton = (e,setActive) => {
  setActive(e)
  setTimeout(()=>{
    // this.dialogRef && this.dialogRef.resizehandler();
  },120)  

}

const handleIn_TouchablePopupButton = (e,active,setActive,updKV,state) => { 
  if(!active){
    if(state.barVisible){
      updKV('barVisible',false);
    }
    setActive(true);
  }
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
        updKV('barVisible',true);
      }
      setActive(false);
    }
  }
}

const handleOut_TouchablePopupButtonContent = (e,active,setActive,updKV,state, keyCode) => {  
  var toElement = e.toElement || e.relatedTarget || e.target;
  let IdControl = state.keys[keyCode];
  var _Elmm = document.getElementById(IdControl);
  if(toElement && _Elmm && _Elmm.contains(toElement)){
    console.log(toElement)
  }else{
    if(active){
      if(!state.barVisible){
        updKV('barVisible',true);
      }
      //setActive(false);
    }
  }
}

const handleIn_TouchablePopupButtonContent = (e,active,setActive,updKV,state) => { 
  if(!active){
    if(state.barVisible){
      updKV('barVisible',false);
    }
    setActive(true);
  }
}


const TouchablePopupButton = (props) => {

  const {children,style,icon, state, updKV, keyCode} = props; 
  
  const [active,setActive] = useState(false);
  var sty = style?style:{};
  return(
          <div className="touchable ReportAProblemPopupContainer PlayerControls--control-element nfp-popup-control" 
          onClick={(e)=>confirm_TouchablePopupButton(e,setActive)}             
          onMouseMove={(e)=>handleIn_TouchablePopupButton(e,active,setActive,updKV,state)} 
          onMouseOut={(e)=>handleOut_TouchablePopupButton(e,active,setActive,updKV,state,keyCode)}
          >
            <a className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerReportAProblem">
              <Icons name={icon} color={'#fff'} size={'1.6em'}/>
            </a>
            <div 
              id={state.keys[keyCode]} 
              style={sty} 
              className={`touchable popup-content-wrapper keep-right ${active?'active':''}`}  
              // onMouseOut={(e)=>handleOut_TouchablePopupButtonContent(e,active,setActive,updKV,state)}
              onMouseMove={(e)=>handleIn_TouchablePopupButtonContent(e,active,setActive,updKV,state)} 
            >   
              {state.hover && active?children:null}        
            </div>
          </div>
  )
}

