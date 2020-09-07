

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { OpenBezel} from '../../actions/common'
import {Icon2} from '../Icons'

import * as _Util from '../../store/Util'





const _styleVolumeAction = (idWatch) => {  
  return `


  input[type='range'].slider_${idWatch} { 
    -webkit-appearance: none;
    width: 100%;
    height: 1px;
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
    height: 14px;
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
    height: 14px;
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






const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeCommonChanges);
  const dispatch = useDispatch()

  const updKV= (k,v) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:k,value:v}
    })  
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:"observePlayer",value:_Util.gen12CodeId()}
    })  
  }

  const listBezel = useSelector(state => state.listBezel);
  const _openBezel = (icon) => {      
    let data = {};
    data['list']=listBezel;
    data['icon']=icon;
    OpenBezel(dispatch,data);
  }


  return { observeChanges, updKV,  _openBezel}
}










const ProgressVolume = (props) => { 
  const {  updKV, _openBezel } = useObserveChanges();
  
  var state = _Util.getPlayerStore();
  const keys = _Util.getGlobalsKeys()

  const {activeVolume,isMute, volume} = state; 

  

  let stateHover = {};
  const { ct, dragging} = stateHover; 

  let _volume = volume?volume:1;

  var ct2 = dragging? ct: _volume*100;
  var icon = isMute?'volume_mute':ct2/100>0.5?'volume_up':ct2/100===0?'volume_mute':'volume_down';
  let ProgressVolumeId  = `${keys[82]}_progressVolume`;
  let classN = _styleVolumeAction(ProgressVolumeId);
  

  

  const handleIn_Volume = () => {   
    if(!state.activeVolume){    
      if(state.barVisible){        
        _Util.updPlayerStore('barVisible',false)
      }
      _Util.updPlayerStore('activeVolume',true);
      updKV('observePlayer',_Util.gen12CodeId());
    }
  }
 
  
  const handleOut_Volume = () => { 
      if(state.activeVolume){  
        if(!state.barVisible){
          _Util.updPlayerStore('barVisible',true)
        }
        _Util.updPlayerStore('activeVolume',false);
        updKV('observePlayer',_Util.gen12CodeId());
      }
  }
 
  const handleRange_Volume = (event) => { 
    var c2ct = event.target.value;
    let _player = document.getElementById(window.playerHrmTag);
      _player["volume"] = c2ct; 
      _Util.updPlayerStore('volume',c2ct);
      updKV('observePlayer',_Util.gen12CodeId());
  }
 
  const confirm_Volume = (props) => {
      if(state.activeVolume){  
        if(!state.barVisible){
          _Util.updPlayerStore('barVisible',true)
        }
        _Util.updPlayerStore('activeVolume',false);
        updKV('observePlayer',_Util.gen12CodeId());
      }  
      if (typeof props.confirm === 'function') { props.confirm();}
  }




  const mute_Volume = (props,_openBezel) => { 
 
    let _player = document.getElementById(window.playerHrmTag);
    if(state.activeVolume){      
      _Util.updPlayerStore('activeVolume',false);
    }    
    _Util.updPlayerStore('isMute',!_player.muted);
    if(_player.muted){
      _openBezel('volume_up');
    }else{
      _openBezel('volume_mute');
    }
    _player.muted = !_player.muted; 
    if(!state.barVisible){      
      _Util.updPlayerStore('barVisible',true);
    }
    updKV('observePlayer',_Util.gen12CodeId());
    if (typeof props.confirm === 'function') { props.confirm();}
 }
 



    let styleRange = {
      "--heliumPlayer--max":1,
      "--heliumPlayer--min":0,
      "--heliumPlayer--val":ct2/100,
      "--heliumPlayer--range--volume--active-percent":`${ct2}%`,
      "--heliumPlayer--range--volume--back-percent":`${100-ct2}%`,
     // "--heliumPlayer--color--range--volume--active":"#e50914",
      "--heliumPlayer--color--range--volume--active":"#69f0ae",
      "--heliumPlayer--color--range--volume--back":"#7e7e7e",
      "--heliumPlayer__color_fire" :"#e50914",
      "--heliumPlayer__color_fire_2" :"#bf1315",
       
              

    }

      
    return(
            <div className={`touchable ReportAProblemPopupContainer PlayerControls--control-element nfp-popup-control `} 
              onClick={()=>confirm_Volume(props)} 
              onMouseMove={handleIn_Volume} 
              onMouseOut={handleOut_Volume}
              >
              <span className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerReportAProblem" onClick={(e)=>mute_Volume(props,_openBezel)} >
                <Icon2 name={icon} color={'#fff'} size={'1.6em'}/>
              </span>
              <div className={`touchable popup-content-wrapper keep-right  Vol_ ${activeVolume?'active':''}`} >              
                <div className="volume--container"  style={styleRange}>                  
                  <div id={`${ProgressVolumeId}`} className={`volume_bar_wrp_${ProgressVolumeId}`}/>
                  <div id={`${ProgressVolumeId}`} className={`volume_bar_progress_${ProgressVolumeId}`}/>                  
                  <input className={`slider_${ProgressVolumeId}`} type="range" min={0} max={1} step={0.01} value={ct2/100} onChange={(e)=>handleRange_Volume(e)}/>      
                </div>        
              </div>
              <style>{classN}</style>
            </div>
    )
}




export default ProgressVolume;

