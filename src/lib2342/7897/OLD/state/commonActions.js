import * as types from '../constants/ActionTypes';
import { DATA_URL, GRAPHQL_URL } from '../constants/Api';
import * as _Util from './Util';


window.HrmPlayer={};
window.HrmPlayer.config={"url":"http://localhost:7070/","path":"Stream2HRM/","id":"htZBtxUUjiwWhvFl","videoExt":"hlm"}



export var _Dispatch = null;
export var _State = null;


export function UpdsubtitleId(v) {
  return function (dispatch, getState) {
    dispatch(UpdKeyValue({key:'subtitleId',value:v}));
  }       
}  

export function SrtCachingFile(url,id) {
  return function (dispatch, getState) {
    const state = getState().common;
    var _subtitles = state.subtitle;
    _subtitles[id] = {}
    _subtitles[id]['srt']=srt2Json(url); 
    dispatch(UpdKeyValue({key:'subtitle',value:_subtitles}));
    dispatch(UpdKeyValue({key:'subtitleId',value:id}));    
  }
}



 export function SrtCaching(url,id) {
  return function (dispatch, getState) { 
    const state = getState().common;
    var _subtitles = state.subtitle;
    _subtitles[id] = {}
    var xhr = new XMLHttpRequest();    
          xhr.open( "GET",url , true );
          xhr.responseType = "text";
          xhr.onload = function( e ) {
            if (xhr.status === 200) {
              _subtitles[id]['srt']=srt2Json(this.responseText);  
              dispatch(UpdKeyValue({key:'subtitle',value:_subtitles})); 
              dispatch(UpdKeyValue({key:'subtitleId',value:id}));             
            }             
          };  
    xhr.send();   
  }       
}  



export function updSecSyncTime(sec) {
  return function (dispatch, getState) {    
    dispatch(UpdKeyValue({key:'subtitleSyncTime',value:sec}));
  }
}



export function LoadData() {
  return function (dispatch, getState) {   
    if(!_Dispatch){
      _Dispatch = dispatch;
    }
    if(!_State){
      _State = getState;
    }
    var config = window.HrmPlayer?window.HrmPlayer.config:{};
    var _url = window.location.href.split("#")[1]; 
    if(config.url){      
      _url = `${config.url}${config.path}${config.id}.${config.videoExt}`;
    }  
    _url && dispatch(UpdKeyValue({key:'_url',value:_url}));    
  };
}





export function updTimebyVideoId(doc){
  return function (dispatch, getState) {
    let _now = (new Date()).getTime();
    const query= `
    mutation($doc: UpdateBookmarkPosition!){
      payload:  updateBookmarkPosition(bookmark: $doc) {
        id,
        started,
        completed,
        timeline,
        duration      
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(window.HrmPlayer.config.url+"streamdata",{query,variables}) 
    .then(res => {
      var b = res.data
      console.log(b)
      let dur = (new Date()).getTime() - _now;            
      let bytePerMls =  Math.floor((14/dur)*1000) ;
      window.bandWidthPerSecond = bytePerMls*10;
      //console.log(b)           
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}



export function appLoaded(res) {
  return {
    type: types.APPLOADED_SUCCESS,
    appLoaded: res
  };
}
 




  export function UpdateFormbyName(form,v){
    return function (dispatch, getState) { 
      const state = getState().common;
      UpdForm(state,dispatch,form,v);
    }
  }
  
   
  
  export function UpdateForm(form,fld,v){
    return function (dispatch, getState) {   
      const state = getState().common;
      var _forms = state.forms;
      if(!_forms[form]){
        _forms[form] = {}
      }
      _forms[form][fld] =v;    
      UpdForm(state,dispatch,form,_forms[form]);
    }
  }


  function UpdForm(state,dispatch, form,v){
    var __forms = state.forms;
    if(!__forms[form]){
      __forms[form] = {}
    }
    __forms[form] =v;
    dispatch(UpdKeyValue({key:'forms',value:__forms}));
    dispatch(callFormOberves()); 
  }
  

  
  export function callFormOberves() {
    return function (dispatch, getState) {
      const state = getState().common;
      var foBs =  state.formObserve + 1; 
      dispatch(UpdKeyValue({key:'formObserve',value:foBs}));
    }
  }
  



  export function Image2Caching(url,blob) {
    return function (dispatch, getState) {   
      const state = getState().common;      
        var xhr = new XMLHttpRequest();
          xhr.open( "GET", url, true );
          xhr.responseType = "arraybuffer";
          xhr.onload = function( e ) {
            if (xhr.status === 200) {
              var arrayBufferView = new Uint8Array( this.response );              
              if(arrayBufferView.length>200){
                //blob && blob.append(arrayBufferView);
               // console.log(blob);
                               
                //var base64String = btoa(new Uint8Array(arrayBufferView).reduce((data, byte) => data + String.fromCharCode(byte), ''));                
                var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);    
                console.log(imageUrl);          
                //_ImagesList[param].buffer = base64String;
                                         
              } 
            }             
          };  
        xhr.send();    
           
    }  
  }
  

/*


  function updPathInfo() {
    let _now = (new Date()).getTime();
    let url = "http://localhost:7070/updPathInfo";    
      var xhr = new XMLHttpRequest();    
        xhr.open( "GET",url , true );
        xhr.responseType = "json";        
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {           
            //document.getElementById("demo").innerHTML = this.responseText;
          }
        };
        xhr.onload = function( e ) {          
          if (xhr.status === 200) {
            let dur = (new Date()).getTime() - _now;            
            let bytePerMls =  Math.floor((14/dur)*1000) ;
            window.bandWidthPerSecond = bytePerMls*10;
            console.log('bandWidthPerSecond',bytePerMls*10);
          }
        };
      xhr.send(); 
  };  
  
  
  updPathInfo();
  setInterval(()=>updPathInfo(),5000)

         
   */



  function getThumbnail(url) {
    return function (dispatch, getState) {
      const state = getState().common;     
      var xhr = new XMLHttpRequest();    
        xhr.open( "GET",url , true );
        xhr.responseType = "json";        
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {           
            //document.getElementById("demo").innerHTML = this.responseText;
          }
        };
        xhr.onload = function( e ) {          
          if (xhr.status === 200) {
            if(this.response && this.response.data){
              dispatch(UpdKeyValue({key:'thumbnailJsonValid',value:true}));
              var _thumbnailJson = state['thumbnailJson'];
              _Util.ObjectKeys(this.response.data).map(rtt=>{
                _thumbnailJson[rtt]=this.response.data[rtt];
              })
              dispatch(retrieveThumbnailJson(_thumbnailJson));
              dispatch(UpdKeyValue({key:'thumbnailJsonUrl',value:url.split('?')[0]}));
              var yIndex = state['thumbnailJsonIndex'];
              yIndex[0]=true;
              dispatch(UpdKeyValue({key:'thumbnailJsonIndex',value:yIndex}));
            }
          }
        };
      xhr.send(); 
    };             
  }  

 


  export function getThumbnail2Distpatch(url) {    
      _Dispatch(getThumbnail(url));
  }  
  

  export function retrieveThumbnailJson(res) {
    return {
      type: types.THUMBNAILJSON,
      thumbnailJson : res
    };
  }

  export function retrieveThumbnailBlob(res) {
    return {
      type: types.THUMBNAILBLOB,
      thumbnailBlob : res
    };
  }



  

  export function getThumbnailbyTime(d){    
    return function (dispatch, getState) {
      const state = getState().common;
      const {thumbnailJson, thumbnailBlob, thumbnailJsonUrl, thumbnailJsonValid} = state;       
      var blb = thumbnailBlob;
      if(thumbnailJsonValid && thumbnailJson && thumbnailJson[d] && !blb[d]){
        blb[d]=getBlob(thumbnailJson[d]);
        dispatch(retrieveThumbnailBlob(blb));        
      }
      if(thumbnailJsonValid && thumbnailJson && !thumbnailJson[d]){
        let Nindex = Math.floor(d/10)
        var _url = `${thumbnailJsonUrl}?init=${Nindex}`;        
        var yIndex = state['thumbnailJsonIndex'];
        if(!yIndex[Nindex]){
          dispatch(getThumbnail(_url));
          yIndex[Nindex]=true;
          dispatch(UpdKeyValue({key:'thumbnailJsonIndex',value:yIndex}));
        }
      }
      return blb[d];
    };
  }
  


  

export function UpdKeyValue(res) {
  return {
    type: types.UPD_KEY_VALUE,
    kv : res
  };
}

 


  function getBlob(t){    
    var arrayBufferView = base64ToArrayBuffer(t);
    //Util.DecodeWebp(arrayBufferView);       
    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);     
    return imageUrl;
  }




  
  function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }


export  function srt2Json(srt) {
  srt = srt.replace(/(\r\n|\n|\r)/gm,"&*^");
  var SrtL=[],nObjSrt = {id:null,start:null,end:null,startSt:null,endSt:null,text:''};
  srt.split('&*^').map(f=>{
      if(isNaN(f)){
          if(f.indexOf('-->')>3){
              nObjSrt.start = time2number(f.split('-->')[0]);
              nObjSrt.end = time2number(f.split('-->')[1]);
              nObjSrt.startSt = (f.split('-->')[0]);
              nObjSrt.endSt = (f.split('-->')[1]);
          }
          else{
              nObjSrt.text += f+'\n'; 
          }  
      }
      else{
          if(f===''){               
              if(nObjSrt.id){
                  SrtL.push(nObjSrt);
              }
              nObjSrt = {id:null,start:null,end:null,startSt:null,endSt:null,text:''};
          }
          else{
              nObjSrt.id = parseInt(f);
          }
      }        
  })    
  return SrtL
}

function time2number(s){
  var tm = s.split(':'),num = 0;
  if(tm.length>2){
      num = parseFloat(tm[0])*3600+parseFloat(tm[1])*60+parseFloat(tm[2])        
  }
  else{
      num = parseFloat(tm[1])*60+parseFloat(tm[2])
  }
  return num;
}








let wt = {}

var open = window.XMLHttpRequest.prototype.open,
  send = window.XMLHttpRequest.prototype.send;

function openReplacement(method, url, async, user, password) {
  this._url = url;
  wt[url] = (new Date()).getTime();
  return open.apply(this, arguments);
  
}

function sendReplacement(data) {
  if(this.onreadystatechange) {
    this._onreadystatechange = this.onreadystatechange;
  }
 
  /**
   * PLACE HERE YOUR CODE WHEN REQUEST IS SENT  
   */
  this.onreadystatechange = onReadyStateChangeReplacement;
  return send.apply(this, arguments);
}

function onReadyStateChangeReplacement() {
  /**
   * PLACE HERE YOUR CODE FOR READYSTATECHANGE
   */
  //console.log(this)

  if(this.responseType === 'text' || this.responseType === ''){
    let url = this.responseURL;
    let data = this.responseText;
    let len = data.length;    
    console.log({size:len})
    let bandWidth = (new Date()).getTime() - wt[url]
    window.bandWidth = bandWidth;
    console.log(bandWidth)
    //wt[url] = (new Date()).getTime();
    console.log('onReadyStateChangeReplacement');
  }
 
  if(this._onreadystatechange) {
    return this._onreadystatechange.apply(this, arguments);
  }
}

// window.XMLHttpRequest.prototype.open = openReplacement;
// window.XMLHttpRequest.prototype.send = sendReplacement;




















export function updateKeyValue(k,v) {
  return function (dispatch, getState) {
    dispatch(UpdKeyValue({key:k,value:v}));
  }
}


