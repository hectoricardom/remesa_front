
import React, { useEffect, useState } from 'react'
import * as _Util from '../store/Util'



const _processSubtitle = (ct,label, subtitle) => { 
  console.log( ct,label, subtitle)

  var _text = '';
  if(subtitle && subtitle[label]){  
    var text = _Util.srtBySecond(ct,subtitle[label]['srt']);
    console.log( text)
    if(text){
      _text = text;     
    }
  } 
  return _text; 
}



const CloseCaption = (props) => { 
    const { state  } = props;  
    
    const {hover, currentTime,subtitleId , subtitleSyncTime,subtitle } = state;    
    let _currentTimeSyncTime = currentTime;
   if(!isNaN(subtitleSyncTime)){
    _currentTimeSyncTime = subtitleSyncTime + currentTime;
   }
    
   var subtitleText = "";
    if(subtitleId){
      subtitleText = _processSubtitle(_currentTimeSyncTime,subtitleId, subtitle);
    }     
    
   

    return(
      <>     
      <div className="" >
        <span id="_SubtitleContainer" className={`__CloseCaptionBox__  43wy4hys ${hover?'isHover':''}`}   style={{}}>
          <div style={{wordWrap: 'normal',display: 'inline-flex', width: '100%'}}>
            <div className="flexSpace" />  
            <span className={`_SubtitleText ${subtitleText && subtitleText.length>0?'':'empty'}`}>
            {subtitleText}
            </span>
            <div className="flexSpace" />
          </div>
        </span>      
      </div>      
      <style>
        {AddLocations_styles}
      </style>
      <style>
            {`._${'43wy4hys'}{
              --heliumPlayer__color_fire :#e50914;
              --heliumPlayer__color_fire_2 :#bf1315;
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
            }`
            }
      </style>   
      </>
    )
  
}

 export default  CloseCaption;



 function urlValidate(v){
  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(v)
}
 

const AddLocations_styles = `


.__CloseCaptionBox__{
  display : block;
  bottom : 2em;
  width:100%;
  position: absolute;
  right:0;
  min-height:35px;
  z-index:  15;
  transition: bottom 0.15s ease;
}

.__CloseCaptionBox__.isHover{
  bottom : 8em;
}

.__CloseCaptionBox__ ._SubtitleText{
  height: 1.5em;
  padding: 0.21em;
  background-color: rgba(30,30,30,.5);
  color: #d5d5d5;
  font-size: 1.75em;
  background: rgba(8, 8, 8, 0.75);
  max-width: 100%;
  border-radius: 2px;    
  color: var(--heliumPlayer__color_white_);
  fill: var(--heliumPlayer__color_white_);
  font-family:  Roboto, "Arial Unicode Ms";
}

.__CloseCaptionBox__ ._SubtitleText.empty {
  padding: 0;
}







`
