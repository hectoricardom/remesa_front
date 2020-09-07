import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as Util from '../../state/Util';
var hls;
var debug;
var Video_;
var currentVersion = "0.9.1";
var supportedVersions = ["0.5.52", "0.6.21","0.7.3","0.7.4", "0.7.7", "0.7.8", "0.7.9", "0.7.10", "0.8.0", "0.8.1", "0.8.2", "0.8.5", "0.8.8","0.9.1"]



var _thisElement = null;

/*
chrome.storage.local.get({
  hlsjs: currentVersion,
  debug: false,
  native: false
}, function(settings) {
  debug = settings.debug;
  var s = document.createElement('script');
  var version = currentVersion
  if (supportedVersions.includes(settings.hlsjs)) {
    version = settings.hlsjs
  }
  console.log(window.location.href.split("#")[1]);
  s.src = chrome.runtime.getURL('hls.'+version+'.min.js');
  s.onload = function() { load(window.location.href.split("#")[1]); };
  (document.head || document.documentElement).appendChild(s);
});

(function(open) {

    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

        this.addEventListener("readystatechange", function() {
            console.log(this.readyState); // this one I changed
        }, false);

        open.call(this, method, url, async, user, pass);
    };

})(XMLHttpRequest.prototype.open);


*/


const AUDIO_EXTENSIONS = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i
const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i
const HLS_EXTENSIONS = /\.(m3u8|ts)($|\?)/i
const HLM_EXTENSIONS = /\.(hlm|ts)($|\?)/i
const HLS_SDK_URL = 'https://cdn.jsdelivr.net/hls.js/latest/hls.min.js'
const HLS_GLOBAL = 'Hls'
const DASH_EXTENSIONS = /\.(mpd)($|\?)/i
const MP4_EXTENSIONS = /\.(mp4)($|\?)/i
const DASH_SDK_URL = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/2.5.0/dash.all.min.js'
const DASH_GLOBAL = 'dashjs'

function canPlay (url) {
  if (url instanceof Array) {
    for (let item of url) {
      if (typeof item === 'string' && canPlay(item)) {
        return true
      }
      if (canPlay(item.src)) {
        return true
      }
    }
    return false
  }
  return (
    AUDIO_EXTENSIONS.test(url) ||
    VIDEO_EXTENSIONS.test(url) ||
    HLS_EXTENSIONS.test(url) ||
    DASH_EXTENSIONS.test(url)
  )
}



export default class FilePlayer extends Component {
  static displayName = 'FilePlayer'
  static canPlay = canPlay
  constructor(props) {
    super(props);
    
    this.state = {
      url : '',
      cicle:0,
      videoList:[],
      _mp4:false,
      hls:null      
    };
  }
  componentWillMount () {  
    
  }
  componentDidMount () {
    //this.load(this.props.url);
    var _th = this;
    /*var s = document.createElement('script');
    s.src = HLS_SDK_URL;
    console.log(HLS_SDK_URL)
    s.onload = function() {console.log('s.onload',HLS_SDK_URL);};
    (document.head || document.documentElement).appendChild(s); */ 
    _th.beLoad();_th.addListeners(); 
    _thisElement = _th; 
    
  }


  updateHLS (t) {  
    var _th6_ = this;
    _th6_.hls = t;
  }

  getHLSInfo () {  
    var _th6_ = this;
    return _th6_.hls;
  }

  loadHLSdata(url) {   
    var _th6_ = this;
    var xhr = new XMLHttpRequest();
      xhr.open( "GET", url, true );
      xhr.responseType = "json";
      xhr.onload = function( e ) {
        if (xhr.status === 200) {          
          var param = url.split('/').pop();
          var IdV = param.split('.')[0];          
          var j = Util.DecryptAES(this.response.data,IdV);          
          if(Util.isJson(j)){              
              var _data = JSON.parse(j);
              var _master = _data.hls;         
              Util.ObjectKeys(_data.tracks).map((trk)=>{
                
              console.log(trk)
              console.log(_data.tracks[trk])
                let base64Track = Util.Base64.encode(_data.tracks[trk]);  
                let arrayBufferView = Util.base64ToArrayBuffer(base64Track);
                let blob = new Blob( [ arrayBufferView ], { type: 'text/plain' } );
                let urlCreator = window.URL || window.webkitURL;
                let blobUrl = urlCreator.createObjectURL(blob);
                if(_master.indexOf(trk)>0){
                  _master = _master.replace(trk,blobUrl);
                }            
              })    
              let base64Track = Util.Base64.encode(_master);  
              let arrayBufferView = Util.base64ToArrayBuffer(base64Track);
                        
              let blob = new Blob( [ arrayBufferView ], { type: 'text/plain' } );
              let urlCreator = window.URL || window.webkitURL;
              let blobUrlMaster = urlCreator.createObjectURL(blob);
              _th6_.setState({UrlHlm:blobUrlMaster})
              let Hls = window.Hls          
              _th6_.hls = new Hls()
              _th6_.hls.loadSource(blobUrlMaster);
              _th6_.hls.attachMedia(_th6_.player) 
              _th6_.commonActions("duration",_th6_.player.duration)
              _th6_.player.play();          
              _th6_.commonActions("playing",true);
              _th6_.setState({hls:window.Hls});
              Util.setCurrentHls(_th6_.hls); 
              
            
              
            /*
              console.log(Hls.Events)
              function onLevelLoaded (event, data) {
                console.log(event)
                console.log(data)
              }
              

              _th6_.hls.on(Hls.Events.FRAG_CHANGED, onLevelLoaded);

              */

              var ThmbnailUrl = url.replace('hlm','bif');
              commonActions.getThumbnail2Distpatch(ThmbnailUrl)

              setTimeout(()=>{
                _th6_.updState('audio_list',_th6_.hls.audioTrackController.tracks);
                _th6_.updState('subtitle_list',_th6_.hls.subtitleTrackController.tracks);
                                         
              },1500)              
          }
        }             
      };  
    xhr.send(); 
}















  componentWillReceiveProps (nextProps) {
    if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(nextProps)) {
      this.removeListeners()
    }
    else if (this.shouldUseHLS(this.props.url) !== this.shouldUseHLS(nextProps.url)) {      
      this.load(nextProps.url);
    }
    else if (this.shouldUseDASH(this.props.url) !== this.shouldUseDASH(nextProps.url)) {
      this.load(nextProps.url);
    }
  }



  componentDidUpdate (prevProps) {
    if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(prevProps)) {
      this.addListeners()
    }
  }




  componentWillUnmount () {
    this.removeListeners()
  }




  addListeners () {
    var _th6_ = this;
    const { onReady, onPlay, onPause, onEnded, onError, playsinline } = _th6_.props
    document.addEventListener('keydown', _th6_.onKeyDown_.bind(_th6_))
    _th6_.player.addEventListener('canplay', onReady)
    //document.addEventListener('contextmenu', _th6_.onContextmenu.bind(_th6_))
    /*
    _th6_.player.addEventListener('play', onPlay)
    _th6_.player.addEventListener('pause', onPause)
    _th6_.player.addEventListener('seeked', _th6_.onSeek)
    */
    _th6_.player.addEventListener('ended', onEnded)
    _th6_.player.addEventListener('error', onError)
    _th6_.player.addEventListener('timeupdate', _th6_.updCurrentTime.bind(_th6_))
    if (playsinline) {
      _th6_.player.setAttribute('playsinline', '')
      _th6_.player.setAttribute('webkit-playsinline', '')
    }
  }





  removeListeners () {
    var _th6_ = this;
    const { onReady, onPlay, onPause, onEnded, onError } = _th6_.props
    document.removeEventListener('keydown', _th6_.onKeyDown_.bind(_th6_))
    _th6_.player.removeEventListener('canplay', onReady)

    /*
    _th6_.player.removeEventListener('play', onPlay)
    _th6_.player.removeEventListener('pause', onPause)
    _th6_.player.removeEventListener('seeked', _th6_.onSeek)
    */
    _th6_.player.removeEventListener('ended', onEnded)
    _th6_.player.removeEventListener('error', _th6_.onError)
  }





  onContextmenu =  function(event) {
    var _body = document.getElementsByTagName('body')[0];    
    if(_body.contains(event.target)){  event.preventDefault();  }
  }

  onKeyDown_ = function(event) {
    var _this9 = this;
    //if(_this9.player && _this9.props.IsFocus){
    var ignoreSiema = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(event.target.nodeName) !== -1;
    if (ignoreSiema) {
      return;
    }
    if(_this9.player){ 
        var key =  event.keyCode;  
        var elm = _this9.player;
        var drt = elm.duration;
        event.preventDefault();
        if(key >48 && key < 58){
          let p = (10-(58-key))*.1;
          elm.currentTime = drt*p;
          _this9.OpenBezel('');
          
        }
        else if(key >96 && key < 106 ){
          let p = (10-(106-key))*.1;
          elm.currentTime = drt*p;
         
        }
        else if(key === 32){
          _this9.PlayPauseClick_();          
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
            _this9.commonActions('volume',elm.volume);
            _this9.OpenBezel('volume_down');
          }else{
          elm.volume = 0;
          _this9.commonActions('volume',elm.volume);
          _this9.OpenBezel('volume_mute');
          }
        }
        else if(key === 38){
          if(elm.volume + 0.1< 1){
            elm.volume = elm.volume + 0.1;
            _this9.commonActions('volume',elm.volume);
            _this9.OpenBezel('volume_up');
          }else{
            _this9.commonActions('volume',elm.volume);
            elm.volume = 1;         
          }
        }
        else if(key === 82){
          elm.currentTime = 0;
        }
        else if(key === 83){
          //_this9.onCaptionClick_();
        }
        
        else if(key === 27){          
        _this9.onFullscreenClick_();
        }
        else if(key === 81){       
          var c = _this9.hls.streamController;          
          var nlc = c.level+1
          if(nlc>=c.levels.length){
            nlc = 0;
          }
          _this9.hls.nextLevel = nlc;
        }
        else if(key === 70){   
          _this9.onFullscreenClick_();
        }
        else if(key === 77){  
          this.player.muted = !this.player.muted;
          if(this.player.muted){
            _this9.OpenBezel('volume_mute');
            _this9.commonActions('isMute',true);
          }else{
            _this9.OpenBezel('volume_up');
            _this9.commonActions('isMute',false);
          }            
        }
      }
    
  }
  

  setMute = (t) =>{ 
    var _this9 = this; 
    _this9.player.muted = !_this9.player.muted;
    if(_this9.player.muted){
      _this9.OpenBezel('volume_mute');
      _this9.commonActions('isMute',true);
    }else{
      _this9.OpenBezel('volume_up');
      _this9.commonActions('isMute',false);
    } 
  }


  OpenBezel = (t) =>{  
    if (typeof this.props.OpenBezel === 'function') {
      this.props.OpenBezel(t);
    }
  }

  
  UpdateVideoTrack = () =>{  
    var _this9 = this;    
  }


   
  updTimebyVideoId(t,d) {  
    var ct = parseInt(t/5);
    if(ct!==(this.state.cicle)){
      if (typeof this.props.updTimebyVideoId === 'function') {
        this.setState({cicle:ct});
        this.props.updTimebyVideoId(ct,d);
      }
    }    
  }



          
  commonActions(k,v) {
    if (typeof this.props.distpatchAction === 'function') {      
      this.props.distpatchAction(k,v);
    }
  }

  
  updState(k,v){
    if (typeof this.props.updState === 'function') {
      this.props.updState(k,v);
    }
  }




  onFullscreenClick_ = () =>{
    var _this9 = this;
    if (typeof _this9.props.FullScreen === 'function') {
        _this9.props.FullScreen();
    }
  }

  onSeek = e => {
    //this.props.onSeek(e.target.currentTime)
  }
  shouldUseAudio (props) {
    return AUDIO_EXTENSIONS.test(props.url) //|| props.config.file.forceAudio
  }
  shouldUseHLS (url) {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    return (HLS_EXTENSIONS.test(url) && !iOS) //|| this.props.config.file.forceHLS
  }
  shouldUseHLM (url) {
    return (HLM_EXTENSIONS.test(url));
  }
  

  shouldUseDASH (url) {
    return DASH_EXTENSIONS.test(url) //|| this.props.config.file.forceDASH
  }

  shouldUseMP4 (url) {
     return MP4_EXTENSIONS.test(url) //|| this.props.config.file.forceHLS
  }

  load(url) { 
    var _th6_ = this;
    if (_th6_.shouldUseHLS(url) && window.Hls && !this.state.hls) {     
      let Hls = window.Hls          
        _th6_.hls = new Hls();        
        _th6_.hls.loadSource(url)
        _th6_.hls.attachMedia(_th6_.player) 
        _th6_.commonActions("duration",_th6_.player.duration)
        _th6_.player.play();          
        _th6_.commonActions("playing",true);
        _th6_.setState({hls:window.Hls});
        Util.setCurrentHls(_th6_.hls); 
        setTimeout(()=>{
          _th6_.updState('audio_list',_th6_.hls.audioTrackController.tracks);
          _th6_.updState('subtitle_list',_th6_.hls.subtitleTrackController.tracks);    
          Util.setCurrentHls(_th6_.hls);   
        },1500)
    }
    else if (_th6_.shouldUseHLM(url) && window.Hls && !this.state.UrlHlm) {
        _th6_.loadHLSdata(url);
    } 
    else if (_th6_.shouldUseHLM(url) && window.Hls && this.state.UrlHlm) {      
      let Hls = window.Hls          
        _th6_.hls = new Hls();
        _th6_.hls.loadSource(this.state.UrlHlm)
        _th6_.hls.attachMedia(_th6_.player) 
        _th6_.commonActions("duration",_th6_.player.duration)
        _th6_.player.play();          
        _th6_.commonActions("playing",true);
        _th6_.setState({hls:window.Hls});
        Util.setCurrentHls(_th6_.hls); 
        setTimeout(()=>{
          _th6_.updState('audio_list',_th6_.hls.audioTrackController.tracks);
          _th6_.updState('subtitle_list',_th6_.hls.subtitleTrackController.tracks);    
          Util.setCurrentHls(_th6_.hls);    
        },1500)
      
    }
    else if (!this.state._mp4) {
      this.setState({url:url,_mp4:true})
      _th6_.player.src = url;                 
    }
  }

 
beLoad(u){
  var _th6_ = this;
  const {_url} = _th6_.props;
  var url = u || _url;
  if (_th6_.shouldUseHLS(url) && !this.state.hls) {
    _th6_.load(url);
  }
  else if (_th6_.shouldUseHLM(url) && !this.state.hls) {
    _th6_.load(url);
  }else  if (_th6_.shouldUseMP4(url) && !this.state._mp4) {
    _th6_.load(url);
  } 
}



loadUrl = function(url) { 
  var _th6_ = this;
  _th6_.beLoad(url);    
 
}


  play () {
    var _th6_ = this;
    
    _th6_.commonActions("duration",this.player.duration)
    const promise = _th6_.player.play()
    _th6_.commonActions('volume',_th6_.player.volume);
    _th6_.beLoad()
    if (promise) {
      promise.catch(_th6_.props.onError)
    }
  }


  PlayPauseClick_ = function() {  
    var _th6_ = this;
    _th6_.beLoad();    
    if (!_th6_.player.duration) {
     // return;
    }      
    
    if (_th6_.player.paused) {  
      _th6_.commonActions("playing",true);
      _th6_.commonActions("duration",this.player.duration);
      _th6_.player.play();
      _th6_.OpenBezel('play');
    } else {   
      _th6_.commonActions("playing",false);
      _th6_.player.pause();
      _th6_.OpenBezel('pause');
    }  
};


  pause () {
    this.player.pause()
  }

  stop () {
    this.player.removeAttribute('src')
    if (this.hls) {
      this.hls.destroy()
    }
    if (this.dash) {
      this.dash.reset()
    }
  }

  seekTo (seconds) {
    this.player.currentTime = seconds
  }

  updCurrentTime(){
    var _th6_ = this;
    //console.log(_th6_.hls)
    if(_th6_.player){
      var c = _th6_.hls && _th6_.hls.streamController;
      //console.log(c && c.nextLoadPosition)
      if(c && c.levels &&  _th6_.state.videoList.length != c.levels.length){
        //var imglis = Array.from(Array(Math.floor(c.levels.length-1)).keys());
        var h = [];
        c.levels.map((ql,i)=>{         
          h.push({level:i,qlty:ql.height})
        })
        //_th6_.props.commonActions._videoList = h;
        _th6_.setState({videoList:h});
        //_th6_.load('VideoIndex',c.length-1);
      }
      var v = document.getElementsByTagName('video')[0];
      _th6_.updTimebyVideoId(_th6_.player.currentTime,_th6_.player.duration)
      _th6_.commonActions("currentTime",_th6_.player.currentTime);
      _th6_.commonActions("duration",_th6_.player.duration);
      if(_th6_.props.hover){
        v.style.cursor = 'default'
      }else{
        v.style.cursor = 'none'
      } 
    }      
  }

  



  setVolume (fraction) {
    var _th6_ = this;
    _th6_.player.volume = fraction;
    _th6_.commonActions('volume',fraction);
  }
  setPlaybackRate (rate) {
    this.player.playbackRate = rate
  }

  updSrc(n){
    this.player.src = n;
  }

  getDuration () {
    return this.player.duration
  }
  getCurrentTime () {
    return this.player.currentTime
  }
  setCurrentTime (ct) {
    var _th6_ = this;
    _th6_.player.currentTime = ct;
    _th6_.commonActions('currentTime',ct);
  }
  getSecondsLoaded () {
    if (this.player.buffered.length === 0) return 0
    return this.player.buffered.end(0)
  }
  renderSource = (source, index) => {
    if (typeof source === 'string') {
      return <source key={index} src={source} />
    }
    const { src, type } = source
    return <source key={index} src={src} type={type} />
  }
  renderTrack = (track, index) => {
    return <track key={index} {...track} />
  }
  ref = player => {
    this.player = player
  }
  render () {    
    const { url, loop, controls, hover, width, height, ct } = this.props 
    /*var config = window.HrmPlayer.config;    
    var urlV = config?`${config.url}${config.id}.${config.videoExt}`:''; 
    */
   
    var _Url = window.location.href.split("#")[1];
    const useAudio = this.shouldUseAudio(this.props)
    const useHLS = this.shouldUseHLS(_Url)
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
    return (
      <Element
        ref={this.ref}
        src={src}
        style={style}
        preload='auto'
        controls={controls}        
        loop={loop}
        >       
                                         
      </Element>
    )
  }
}





//// <track src="https://lookmovie.ag/storage2/1566688048/movies/6139732-aladdin-2019-1565149782/subtitles/Spanish.vtt" kind="subtitles" label="Spanish"/>        

/*
let oldXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
  var ext = url && url.split('.').pop();
  if(ext === 'hts'){
    var secure = url.split('?secure=')[1];    
    if(!secure){      
     // loadHTSdata(url);
     // oldXHROpen.abort();
    }
  }
  
 // do something with the method, url and etc.
 this.addEventListener('load', function() {
  // do something with the response text
    //console.log('load: ' + this.responseText);
 });
               
 return oldXHROpen.apply(this, arguments);
}



function loadHTSdata(url) {
  var _url = url+'?secure=true'
  //console.log('loadHTSdata',_url)
  var xhr = new XMLHttpRequest();
    xhr.open( "GET", _url, true );    
    xhr.responseType = "arraybuffer";
    xhr.onload = function( e ) {
      //console.log('loadHTSdata',url)
      if (xhr.status === 200) {          
        var param = url.split('/').pop();
        var IdV = param.split('.')[0];          
        //let base64Track = Util.Base64.encode(_master);  
        //let arrayBufferView = Util.base64ToArrayBuffer(base64Track);
        var arrayBufferView = new Uint8Array( this.response );
        //console.log(arrayBufferView);
        let blob = new Blob( [ arrayBufferView ], { type: 'video/mp4' } );
        let urlCreator = window.URL || window.webkitURL;
        let blobUrlMaster = urlCreator.createObjectURL(blob);
        //console.log(blobUrlMaster)
        var _networkControllers = _thisElement.getHLSInfo().networkControllers; 

        var _levels = null;
        _networkControllers.map((ntCl,ii0)=>{
          if(ntCl.fragCurrent){
            if(ntCl.fragCurrent.relurl===url){
              _networkControllers[ii0].fragCurrent.relurl = blobUrlMaster;
              if(ntCl.fragCurrent._url===url){
                _networkControllers[ii0].fragCurrent._url = blobUrlMaster;
              }
            }           
            ntCl.levels && ntCl.levels.map((lvl,ii1)=>{
              if(lvl && lvl.details){
                var details = lvl.details;            
                if(details.initSegment.relurl===url){
                  _networkControllers[ii0].levels[ii1]['details']['initSegment']['relurl'] = blobUrlMaster;
                  if(details.initSegment._url===url){
                    _networkControllers[ii0].levels[ii1]['details']['initSegment']['_url'] = blobUrlMaster;
                  }
                }
                else{      
                  details.fragments.map((frg,ii2)=>{
                    var fragment = frg;                 
                    if(fragment && fragment['relurl']===url){
                      _networkControllers[ii0].levels[ii2]['details']['fragment']['relurl'] = blobUrlMaster;                       
                    }
                  })
                  
                }
              }
          });
          if(_networkControllers[ii0].levels){
            _levels = _networkControllers[ii0].levels;
          }
          

          ntCl.tracks && ntCl.tracks.map((lvl,ii1)=>{
            if(lvl && lvl.details){
              var details = lvl.details;            
              if(details.initSegment.relurl===url){
                _networkControllers[ii0].tracks[ii1]['details']['initSegment']['relurl'] = blobUrlMaster;
                if(details.initSegment._url===url){
                  _networkControllers[ii0].tracks[ii1]['details']['initSegment']['_url'] = blobUrlMaster;
                }
              }
              else{      
                details.fragments.map((frg,ii2)=>{
                  var fragment = frg;                 
                  if(fragment && fragment['relurl']===url){
                    _networkControllers[ii0].tracks[ii2]['details']['fragment']['relurl'] = blobUrlMaster;                     
                  }
                })
                
              }
            }
        });
          
        } 
      })

      var _hls = _thisElement.getHLSInfo();
      console.log(_hls);
      _hls['networkControllers'] = _networkControllers;
      _hls['levelController']['_levels'] = _levels;
      _thisElement.updateHLS(_hls);
      console.log(_hls); 
        //console.log(_hls)
        _th6_.setState({UrlHlm:blobUrlMaster})
            let Hls = window.Hls          
            _th6_.hls = new Hls()
            _th6_.hls.loadSource(blobUrlMaster);
            _th6_.hls.attachMedia(_th6_.player) 
            _th6_.commonActions("duration",_th6_.player.duration)
            _th6_.player.play();          
            _th6_.commonActions("playing",true);
            _th6_.setState({hls:window.Hls});
            setTimeout(()=>{
              _th6_.updState('audio_list',_th6_.hls.audioTrackController.tracks);
              _th6_.updState('subtitle_list',_th6_.hls.subtitleTrackController.tracks);          
          },1500)      
         
      }             
    };  
  xhr.send(); 
}



*/

