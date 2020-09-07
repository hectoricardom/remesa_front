import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import {NavLink} from 'react-router-dom';
import * as commonActions from '../../state/commonActions';
import ButtonActions from '../buttons-action';
import ProgressBar from '../progress-bar';
import FilePlayer from '../hrm-player';
import './style.css';
import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';
import BezelActions from '../bezel';
import CloseCaption from '../closeCaption/index';

import DialogHRM from '../DialogHRM';
class Watch extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      controlid:null,
      videoId:null,
      display_Pbar:true,
      mouseStillTimeoutId_:null,
      IsFullScreen:false,
      audio_list:[],
      subtitle_list:[],
      url:null
    };
  }


  componentWillReceiveProps(nextProps){
    var _th6_ = this;
    var _initvalue = this.props._url;
    var next_initvalue = nextProps._url;
    if(_initvalue!==next_initvalue){
      this.setState({url:next_initvalue});
      _th6_.player.loadUrl(next_initvalue);
    } 
  }

  componentWillMount(){
    var k = Util.genId();
    var qprms = Util.parseQuery(window.location.hash.split('?')[1]);
    this.setState({controlid:k,videoId:qprms.vid});
    this.props.commonActions.LoadData()
  } 
   
  componentDidMount() {  
    this.PlayButton = this.PlayButton.bind(this);
    this.PlayButtonV = this.PlayButtonV.bind(this);
    this.volumeMute = this.volumeMute.bind(this);
    this.seek2 = this.seek2.bind(this);
    this.onFullscreenClick_ = this.onFullscreenClick_.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.distpatchAction = this.distpatchAction.bind(this);  
    this.OpenBezel = this.OpenBezel.bind(this);
    this.updState = this.updState.bind(this);
    
    this.mouseStillTimeoutId_ = null;
    this.isHover_ = false;
  }  


  PlayButton(){
    this.player && this.player.PlayPauseClick_();
  }


  PlayButtonV(e){    
    var dd = document.getElementsByClassName('nfp')[0];
    if(dd.contains(e.target)){      
      //console.log(dd.contains(e.target))
    }else{
      //console.log(e)
      this.player && this.player.PlayPauseClick_();
    }
  }

  volumeMute(){
    var _th6_ = this;
    if(_th6_.player && _th6_.player.player){
      _th6_.player.player.muted = !_th6_.player.player.muted;
      _th6_.props.commonActions.updateKeyValue("isMute", _th6_.player.player.muted);
      _th6_.player.player.muted?this.bezel.Open('volume_mute'):this.bezel.Open('volume_up');
      _th6_.props.commonActions.updateKeyValue("hover",false);
    }
  }

  
  OpenBezel(i){
    this.bezel.Open(i);
  }
 
  updState(k,v){
    this.setState({[k]:v})
  }

  onMouseStill_(){   
    var _th6 =this;
    _th6.mouseStillTimeoutId_ =null;    
    if(_th6.props.isplaying){
      _th6.props.commonActions.updateKeyValue("hover",false);
      _th6.isHover_ = false;
    }    
  };

  handleOnMouseMove(event){  
    var _th6_ = this;     
    _th6_.isHover_ = true;        
    _th6_ && _th6_.props.commonActions.updateKeyValue("hover",true);  
    //if(_th6_._Controls){   _th6_.props.store.setControlElm(_th6_._Controls.getBoundingClientRect());}
    if (_th6_ && event.type === 'mousemove'){
      if (_th6_.mouseStillTimeoutId_){      
        window.clearTimeout(_th6_.mouseStillTimeoutId_);
        _th6_.mouseStillTimeoutId_ =window.setTimeout(_th6_.onMouseStill_.bind(_th6_), 6000);
      }else{        
        _th6_.mouseStillTimeoutId_ =window.setTimeout(_th6_.onMouseStill_.bind(_th6_), 6000);
        
      }
    }  
  };



  handleOnMouseOut(e) {
    var _th6 =this;
    var toElement = e.toElement || e.relatedTarget || e.target;
    if(_th6 &&  _th6.props &&  _th6.props.isplaying){
      if(toElement){    
        var _Elmm = document.getElementById(_th6.state.controlid);    
        if(_Elmm.contains(toElement)){        
          _th6.isHover_ = true;
          _th6.props.commonActions.updateKeyValue("hover",true);
        }
        else{
          _th6.isHover_ = false;
          _th6.props.commonActions.updateKeyValue("hover",false);
        }
      }
      else{
        _th6.isHover_ = false;
        _th6.props.commonActions.updateKeyValue("hover",false);
      }
    }
    if(!_th6.isHover_){
      if (_th6.mouseStillTimeoutId_) {
        window.clearTimeout(_th6.mouseStillTimeoutId_);
      }
      _th6.mouseStillTimeoutId_ =null;
    }    
    
  };


  onFullscreenClick_(){
    var _th6_ = this;   
    if(_th6_._videoContainer){     
      var isfS = !Util.IsFullScreen(_th6_._videoContainer);      
      _th6_.setState({isFullscreen:isfS})
      _th6_._videoContainer.requestFullscreen();            
      if (document.fullscreenElement) {
          document.exitFullscreen();
      }
    }    
    
  }

  
  seek2(s){    
    var _th6_ = this;
    if(_th6_.player){ 
      _th6_.player.setCurrentTime(s);
    }
  }

  ref = r => { 
    this._videoContainer = r
  }

  distpatchAction =(k,v)=>{
    var _th6 =this;
    _th6.props.commonActions.updateKeyValue(k,v);
  }

  barVisible =(v)=>{
    this.setState({display_Pbar:v})
  }
  
  updVolume =(v)=>{
    var _th6_ = this;    
    if(_th6_.player){
      _th6_.player.setVolume(v);
    }
  }



  setMute =(v)=>{
    var _th6_ = this; 
    if(_th6_.player){
      _th6_.player.setMute();
    }
  }

  updTimebyVideoId=(v,d)=>{    
    var _th6 =this;
    var Id = null;
    var config = window.HrmPlayer?window.HrmPlayer.config:{};
    if(config.id){
      Id = config.id;
    }
    if(Id){
      var qid =  {id:Id, started:true, timeline:v*5,duration:d};
      _th6.props.commonActions['updTimebyVideoId'](qid);
    }
  }

  refPly = r => { 
    this.player = r
  }

  refBz = r => { 
    this.bezel = r
  }

  render() {  
    var _th6_ = this;    
    const { PlayButton, volumeMute, PlayButtonV, updState,barVisible, distpatchAction, OpenBezel, onFullscreenClick_, handleOnMouseOut, handleOnMouseMove, seek2, updTimebyVideoId } = _th6_; 
    const { isplaying, volume, isMute, hover, isFullscreen, _url } = _th6_.props; 
    const { subtitle_list, display_Pbar, controlid, audio_list,url} = _th6_.state;
    var path = { pathname: `/`}
    return(
      <div  ref={_th6_.ref} onMouseMove={(e)=>handleOnMouseMove(e)} onMouseOut={handleOnMouseOut.bind(_th6_)}  >
        <div className={`control-container ${hover?'active':''}`} onClick={PlayButtonV}> 
          <div className="control-left-box">
            {/*
            <NavLink  to={path}> 
              <div className="nfp-button-control go--Back">
                <Icons name={'arrowBack'} color={'#fff'} size={'1.6em'}/>                
              </div>
            </NavLink>  
            */}                      
          </div>       
          <div className="control-bottom-box" >        
            <div className="nfp" id={`${controlid}`}> 
                <ProgressBar seek2={seek2} visible={display_Pbar}/>
                <ButtonActions audio_list={audio_list} subtitle_list={subtitle_list} videoList={[]} isplaying={isplaying} barVisible={barVisible}  updVolume={this.updVolume.bind(this)} volume={volume} isMute={isMute} setMute={this.setMute.bind(this)} isFullscreen={isFullscreen} PlayButton={PlayButton} VolumeButton={volumeMute} FullScreenButton={onFullscreenClick_}/>
            </div>
          </div>
        </div>
        <div className={`video-container`}>
          <BezelActions  ref={_th6_.refBz}/>
          <CloseCaption/>
          <FilePlayer ref={_th6_.refPly} distpatchAction={distpatchAction} hover={hover} FullScreen={onFullscreenClick_.bind(_th6_)} OpenBezel={OpenBezel} updState={updState} updTimebyVideoId={updTimebyVideoId.bind(_th6_)} _url={_url}/>
        </div>
        <DialogHRM/>
      </div>
    )
  }
}



function mapStateToProps(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded,    
    isplaying: state.common.playing,
    volume: state.common.volume,
    hover: state.common.hover,  
    isMute: state.common.isMute,
    _url: state.common._url,
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Watch);


