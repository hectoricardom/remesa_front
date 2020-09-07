import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';

import * as Util from '../../state/Util';
import './style.css';



/*

const CloseCaption = observer(props =>{  
  const {SubtitleIndex, SubtitleText, Ishover, bezelFontSize, currentTime} = props.store;
  var subtitleBox = 'none';
  var subtitleText = null;
  var IsWidth = null;
  var bottomH = '0';
  var mLft = '-60px';
  var Mwdth = '240px';
  var CfS = '24px'; 
  var ctT = currentTime;
  if(bezelFontSize>10){
    Mwdth = bezelFontSize*15+'px';
    CfS = bezelFontSize+'px';
  }   
  if(Ishover){
    bottomH  = '90px';
   }
  if(SubtitleText!==null && SubtitleIndex>=0){
    subtitleBox = 'block';
    subtitleText = SubtitleText;
  } 
  var CCw = document.getElementById('_SubtitleContainer');
 
  return (           
      <span id="_SubtitleContainer" className="CloseCaptionBox"   style={{display : subtitleBox, bottom : '2%',width:'100%', position: 'absolute ',right:'0', minHeight:'35px', marginBottom:bottomH , marginLeft:mLft, zIndex: '15'}}>
       <div style={{wordWrap: 'normal',display: 'inline-flex', width: '100%'}}>
          <div className="flexSpace" />  
          <span id="_SubtitleText" style={{ background: 'rgba(8, 8, 8, 0.75)', maxWidth: Mwdth, WebkitBoxDecorationBreak: 'clone', borderRadius: '2px', padding: '2px 3px', fontSize: CfS, color: 'rgb(255, 255, 255)',  fill: 'rgb(255, 255, 255)',  fontFamily: `"YouTube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif`}}>
          {subtitleText}
          </span>
          <div className="flexSpace" />
        </div>
      </span>
  );
 })



*/



var subtitleLsit = [
  {
    label:'Spanish',
    url:'https://lookmovie.ag/storage2/1566688048/movies/6139732-aladdin-2019-1565149782/subtitles/Spanish.vtt'
  } 
]




class CloseCaption extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open:false,
      text:''
    };
  }

  componentWillMount() {  
    
    this.SRTList = [];
  }

  componentDidMount(){     
    var {url,label} = subtitleLsit[0];
    
  }



  ProcessSubtitle(ct,label){
    var _th6 = this;
    const {subtitle} = _th6.props;    
    var _text = '';
    if(subtitle && subtitle[label]){  
      var text = Util.srtBySecond(ct,subtitle[label]['srt']);
      if(text){
        _text = text;     
      }
    } 
    return _text; 
  }

  /*
  
  SrtM3u8Caching(url,id) {  
    var _th6 = this;
    var xhr = new XMLHttpRequest();    
          xhr.open( "GET",url , true );
          xhr.responseType = "text";
          xhr.onload = function( e ) {          
            if (xhr.status === 200) {
              _th6.SrtCaching(Util.m3u82srt(this.responseText,_th6.serverUrl),id);
            }             
          };  
    xhr.send();          
  }  
  */
  
  



  render() {
    var _th6_ = this;
    const {hover, currentTime,subtitleId , subtitleSyncTime} = _th6_.props;    
    //var Tduration = duration?Util.buildTimeString_(duration,true):'';
    
    //var progress_width = dragging? (ct/duration)*100: (currentTime/duration)*100;    
    //console.log(subtitle)
    //var styleCloseCaptionBox = {display : display, bottom : '2%',width:'100%', position: 'absolute ',right:'0', minHeight:'35px',  zIndex: '15'}
  //var style_SubtitleText = { background: 'rgba(8, 8, 8, 0.75)', maxWidth: Mwdth, WebkitBoxDecorationBreak: 'clone', borderRadius: '2px', padding: '2px 3px', fontSize: CfS, color: 'rgb(255, 255, 255)',  fill: 'rgb(255, 255, 255)',  fontFamily: `"YouTube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif`}
if(subtitleId){
  var subtitleText = _th6_.ProcessSubtitle(currentTime+subtitleSyncTime,subtitleId);
  
  console.log(currentTime)
  console.log(currentTime+subtitleSyncTime)
    return(
      <div className="" >
        <span id="_SubtitleContainer" className={`__CloseCaptionBox__  ${hover?'isHover':''}`}   style={{}}>
          <div style={{wordWrap: 'normal',display: 'inline-flex', width: '100%'}}>
            <div className="flexSpace" />  
            <span className={`_SubtitleText ${subtitleText.length>0?'':'empty'}`}>
            {subtitleText}
            </span>
            <div className="flexSpace" />
          </div>
        </span>      
      </div>  
    )
}else{
return null; 
}

    
  }
}


function mapStateToProps(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded, 
    currentTime: state.common.currentTime,
    hover: state.common.hover,  
    subtitle: state.common.subtitle,   
    subtitleId: state.common.subtitleId,    
    subtitleSyncTime: state.common.subtitleSyncTime,  
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CloseCaption);


