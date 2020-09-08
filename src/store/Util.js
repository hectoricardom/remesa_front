import fetch from 'isomorphic-fetch';







import CryptoJS from 'crypto-js';
import loadScript from 'load-script';


/*

import seriesNtflx from './serie.json';

import moviesNtflx from './movie.json';
import videoList from './videosCollections.json';


import videoList from './videosCollection.json';
import videoList from './seasonsCollection.json';


*/


//import videoList from './episodeCollection.json';



let utlBase= "/";
 
 utlBase = "http://localhost:7070"

 utlBase = "https://hrmfinance.com"

 // utlBase = "http://localhost:7258"




export const fsConfig = 'eyJhcGlLZXkiOiJBSXphU3lDeDBFcnFmbENVdXZpRlRqald4SEFITWpvQjBsd2xGX00iLCJhdXRoRG9tYWluIjoiaHJtLTExMjguZmlyZWJhc2VhcHAuY29tIiwiZGF0YWJhc2VVUkwiOiJodHRwczovL2hybS0xMTI4LmZpcmViYXNlaW8uY29tIiwicHJvamVjdElkIjoiaHJtLTExMjgiLCJzdG9yYWdlQnVja2V0IjoiaHJtLTExMjguYXBwc3BvdC5jb20iLCJtZXNzYWdpbmdTZW5kZXJJZCI6IjEwNDkyNTA1ODUyNDUiLCJhcHBJZCI6IjE6MTA0OTI1MDU4NTI0NTp3ZWI6OGI0ZTA3NGI5Yzg4MDA1ZiJ9';



const fMP44444 =  x =>  new Promise((resolve, reject) => {


    var xmlhttp = new XMLHttpRequest();
    var bdy = JSON.parse(x);
    let _url = "http://localhost:7070/stream_addVideo?bdy="+bdy;
  

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            console.log(myArr)
            // myFunction(myArr);
        }
    };
    xmlhttp.open("GET", _url, true);
    xmlhttp.send();

 })




 



 
 
 
 
 
 
 async function fetchQueue(a,f) {
	for (let job of a.map(x => () => f(x)))
	await job()
 }
 


 function init() {
	let d=[];
  let jsOn = {};
	Object.keys(jsOn).map((_ntId,inD)=>{	
		let _vId = _ntId;
    let _2s = _vId && jsOn[_vId];
    if(1 && _vId && _2s && inD>=15100 && inD<51000){
      _2s["id"] = _vId;
        let Qry = {
          form:_2s,
          fields:[
            "id", 
        ],
        query:"upgradeVideo",
        collection:"Episodes"
      };
      
		  d.push(Qry);
    }
  })
 
	fetchQueue(d,fMP44444);
}


//  init();




 export function initializeClassName(){
  let maskClassName = {};
  let classes = [
    'N3Hzgf','rFrNMe','jjwyfe',
    'u3bW4e','CDELXb','Wic03c',
    'aCsJod','oJeWuf','Xb9hP',
    'aXBtI','whsOnd','zHQkBf',
    'AxOyFc','AxOyFc','snByac',
    'i9lrp','cXrdqd','Y2Zypf',
    'OabDMe', 'mIZh1c',"btn_base",
    "hover_base","blue_white",
    "light_blue","INVALID","fire_brick",
    "focus_active", "ripple_in", "ripple_out"   
  ]

  classes.map(cl=>{
    maskClassName[cl] = `_${gen12CodeId()}_`;
  }) 
  return maskClassName
  
} 

var _isSupportWebp_ = false;

export function isSupportWebp(){
  return _isSupportWebp_;
}


export function initializeKeys(){
  let Kr = {}
  let ks = Array.from(Array(100).keys());
  ks.map(_k=>{
    Kr[_k] = `_${gen12CodeId()}_`;
  })
  return Kr;
}



 var _genres= {
  3063:{name:"Anime"},
  1492:{name:"Ciencia ficción y fantasía"},
  31574:{name:"Clásicas"},
  6548:{name:"Comedias"},
  11559:{name:"Comedias de stand&nbsp;up"},
  7627:{name:"De culto"},
  4370:{name:"Deportes"},
  108663:{name:"Diablitos y calaveras"},
  2243108:{name:"Documentales"},
  5763:{name:"Dramas"},
  26835:{name:"Fe y espiritualidad"},
  7077:{name:"Independientes"},
  783:{name:"Infantiles y familiares"},
  78367:{name:"Internacional"},
  5977:{name:"LGBTQ"},
  52852:{name:"Música y musicales"},
  8883:{name:"Romances"},
  5824:{name:"Sobre crímenes"},
  8711:{name:"Terror"},
  8933:{name:"Thrillers"},
  11714:{name:"Dramas de TV"},
  83059:{name:"Series y programas de TV de terror"},
  1372:{name:"Ciencia ficción y fantasía para TV"},
  1819174:{name:"Programas de TV basados en libros"},
  67644:{name:"TV mexicana"},
  67708:{name:"TV latinoamericana"},
  920:{name:"Películas basadas en la vida real"},
  1096:{name:"Películas biográficas"},
  9889:{name:"Películas basadas en libros"},
  1255:{name:"Dramas románticos"},   
  26146:{name:"TV sobre crimen"},
  10741:{name:"Música latina"},
  2192320:{name:"Programas basados en cómics"},
  52847:{name:"Comedias familiares"},    
  65437:{name:"Películas de Disney"},    
  43040:{name:"Comedias de acción"},  
  11881:{name:"Animación para adultos"},
  1365:{name:"Acción y aventuras"},
  43048:{name:"Thrillers de acción"},
  9584:{name:"Acción y aventuras criminales"},
  31851:{name:"Películas de gánsteres"},
  89811:{name:"Thrillers de TV"},
};


var globalsKeys = initializeKeys();

export const getGlobalsKeys =  () => {
  return globalsKeys;
}


const initStore = {};

export const rmvStore =  (k) => {
  delete initStore[k];
}
export const updStore =  (k,v) => {
  initStore[k] = v;
}
export const getStore =  () => {
  return initStore;
}



let eventStore = {};
export const updEventStore =  (k,v) => {
  eventStore[k] = v;
}
export const getEventStore =  () => {
  return eventStore;
}



const formStore = {};

export const updFormStore =  (k,v) => {
  formStore[k] = v;
}

export const getFormStore =  (k) => {
  return formStore[k];
}



const PaymentMethod = {
  "Card":{"url":"https://firebasestorage.googleapis.com/v0/b/hrm-1128.appspot.com/o/images%2Fcreditcard2.png?alt=media&token=b0789ba5-2924-49c3-b9da-0d0d8af54fc9"},
  "Zelle":{"url":"https://firebasestorage.googleapis.com/v0/b/hrm-1128.appspot.com/o/images%2Fzelle.png?alt=media&token=cad36ac4-2b6e-457f-a8ee-7ca8291bd7d5"},
  "CashApp":{"url":"https://www.lmaic.com/wp-content/uploads/2020/04/cash-app-png-1.png"},
  "GooglePay":{"url":"https://firebasestorage.googleapis.com/v0/b/hrm-1128.appspot.com/o/images%2Fgpay.png?alt=media&token=ebc809ed-25ac-4ce7-826f-a1f177489be2"},
  "BitCoin":{"url":"https://firebasestorage.googleapis.com/v0/b/hrm-1128.appspot.com/o/images%2Fbitcoin.png?alt=media&token=d1400f5f-aed3-478b-969d-1b658be70e4f"}
}



export const getPaymentMethod =  () => {
  return PaymentMethod;
}




let playerStore = {};
export const updPlayerStore =  (k,v) => {
  playerStore[k] = v;
}

export const getPlayerStore =  () => {
  return playerStore;
}

export const initializeStore =  () => {
  initStore["maskClassName"] = initializeClassName();
  /*
  if(videoList){
    initStore["videoList"] = videoList;
  }
   */
  
}


initializeStore();



export function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft,width:rect.width,height:rect.height }
}


export const  initConfig = async () => {
  
  /*
  const res = await fetch(utlBase+"initConfig", {
    method: 'get'
  });
  const resJSON = await res.json();     
  window.HrmConfig=resJSON;
 */


  let getStaticUrl = utlBase+"/getStatic/";
  fetchSVGSymbols(getStaticUrl);
  getHlsSDK(getStaticUrl);
  //getDashSDK(getStaticUrl);
  getFingerPrint(getStaticUrl).then(fp=>{
    window.localStorage.setItem('fpXb',fp);
  });
  ["showList","serieList","movieList"].map(_fl=>{
   // getStaticFetch(getStaticUrl,_fl,_fl)
  });
  return true;
}

//initConfig();












export function gTm() {
  return (new Date()).getTime();
};


var maskClassName = {}
var maskClassFunction = {}

var _svgSymbols = null;


export function getSvgSymbols() {
  return _svgSymbols;
};
   



var GRAPHQLURL = window.HrmConfig && window.HrmConfig["url"];




export function getTabs(outerWidth) {
  let tabs = 6;
  if(outerWidth>=1700){
    tabs = 6;
  }
  else if(outerWidth>=1400){
     tabs = 5;
  }
  else if(outerWidth>=900){
     tabs = 4;
  }
  else if(outerWidth>=650){
     tabs = 3;
  }else{
     tabs = 2;
  }
  return tabs;
};



export function getTabs2(outerWidth) {
  let tabs = 6;
  if(outerWidth>=1400){
     tabs = 6;
  }
  else if(outerWidth>=1100){
     tabs = 5;
  }
  else if(outerWidth>=800){
     tabs = 4;
  }
  else if(outerWidth>=500){
     tabs = 3;
  }else{
     tabs = 2;
  }
  return tabs;
};


export function groupByTabs(obj,tabs) {
  let hh = {}
  tabs && obj && ObjectKeys(obj).map((mID,inM)=>{
      let nIn = Math.floor(inM/tabs);
      if(!hh[nIn]){
        hh[nIn]={}
      }
      hh[nIn][mID]=obj[mID]
      
  })
  return hh;
}

export function groupByTabsNm(obj,tabs) {
  let hh = {}
  tabs && obj && ObjectKeys(obj).map((mID,inM)=>{
      let nIn = Math.floor(inM/tabs);     
      if(!hh[nIn]){
        hh[nIn]={}
      }
      hh[nIn][mID]=obj[mID]
      
  })
  return hh;
}



const fingerprint_GLOBAL = 'Fingerprint2'


export function getFingerPrint(getStaticUrl) {
  const fingerprint2Url = `${getStaticUrl}${'fingerprint2.min.js'}`
    return new Promise((resolve, reject) => {        
        getSDK(fingerprint2Url, fingerprint_GLOBAL).then(fp => {
            fp().get(function(result, components) { 
                resolve(result);
            })    
        }) 
    })      
};




const HLS_GLOBAL = 'Hls'




export function getStaticFetch(getStaticUrl,param,key) {
  const hlsUrl = `${getStaticUrl}${param}.json`;  
  var xhr = new XMLHttpRequest();    
  xhr.open( "GET",hlsUrl , true );
  xhr.responseType = "json";        
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) { }
  };
  xhr.onload = function( e ) {          
    if (xhr.status === 200) {
      if(this.response){
        let d = this.response;        
        updStore(key,d);
      }
    }
  };
xhr.send(); 
  
};




export function getHlsSDK(getStaticUrl) {
    let hlsV = 'hls.js';
    hlsV = 'hls.min.js';
    //var s = document.createElement('script');
    var hlsUrl = `${getStaticUrl}${hlsV}`  
    
    hlsUrl = "https://cdn.jsdelivr.net/npm/hls.js@latest"
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';    
    script.src = hlsUrl;
    head.appendChild(script);

    /*
    if(window.chrome && window.chrome.runtime && typeof window.chrome.runtime.getURL === 'function'){
        s.src = window.chrome.runtime.getURL('hls.0.9.1.min.js');
        (document.head || document.documentElement).appendChild(s); 
    }else{

        return new Promise((resolve, reject) => {        
            getSDK(hlsUrl, HLS_GLOBAL).then(fp => {
                resolve(fp);
            }) 
        })
    }  
    */ 
    
};

export function getDashSDK(getStaticUrl) {
  let hlsV = 'dash.min.js';
  hlsV = 'dash.all.debug.js';
  //var s = document.createElement('script');
  const hlsUrl = `${getStaticUrl}${hlsV}`   
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';    
  script.src = hlsUrl;
  head.appendChild(script);

  /*
  if(window.chrome && window.chrome.runtime && typeof window.chrome.runtime.getURL === 'function'){
      s.src = window.chrome.runtime.getURL('hls.0.9.1.min.js');
      (document.head || document.documentElement).appendChild(s); 
  }else{

      return new Promise((resolve, reject) => {        
          getSDK(hlsUrl, HLS_GLOBAL).then(fp => {
              resolve(fp);
          }) 
      })
  }  
  */ 
  
};




export function fetchSVGSymbols(getStaticUrl) {
  let SymbolsUrl =  `${getStaticUrl}${'Symbols.svg'}`;
  SymbolsUrl =  `${getStaticUrl}${'svgs.json'}`;   
  var xhr = new XMLHttpRequest();    
  xhr.open( "GET",SymbolsUrl , true );
  xhr.responseType = "json";        
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) { }
  };
  xhr.onload = function( e ) {          
    if (xhr.status === 200) { 
      if(this.response){
        _svgSymbols = this.response;        
        
      }
    }
  };
xhr.send();   
};



/*

export function fetchSVGList(getStaticUrl) {
  let SymbolsUrl =  `${getStaticUrl}${'svgs.jsob'}`; 
  var xhr = new XMLHttpRequest();    
  xhr.open( "GET",SymbolsUrl , true );
  xhr.responseType = "json";        
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {      

      //document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhr.onload = function( e ) {          
    if (xhr.status === 200) { 
      if(this.response){
        _svgSymbols = this.response;        
        
      }
    }
  };
xhr.send();   
};
*/


export function f42etchHLS(getStaticUrl) {
  let SymbolsUrl =  `${getStaticUrl}${'Symbols.svg'}`;
  // hlsV = 'hls858888.js'
  /*
  var _svg_ = document.createElement('svg');
  _svg_.style.width = "0px";
  _svg_.style.height = "0px";
  _svg_.style.position = "relative";
  */
  var xhr = new XMLHttpRequest();    
  xhr.open( "GET",SymbolsUrl , true );
  xhr.responseType = "txt";        
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {      

      //document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhr.onload = function( e ) {          
    if (xhr.status === 200) { 
      if(this.response){
        _svgSymbols = this.response;        
        
      }
    }
  };
xhr.send();   
};


/*
        var def = new DOMParser().parseFromString(this.response, "text/xml");
        let _def = def.firstChild.toString;
        _svg_.appendChild(_def);
        let bdy = document.getElementsByTagName('body')[0];
        bdy.appendChild(_svg_);
*/



export function getSDK (url, sdkGlobal, sdkReady = null, isLoaded = () => true) {
    if (window[sdkGlobal] && isLoaded(window[sdkGlobal])) {
      return Promise.resolve(window[sdkGlobal])
    }
    return new Promise((resolve, reject) => {
      if (sdkReady) {
        const previousOnReady = window[sdkReady]
        window[sdkReady] = function () {
          if (previousOnReady) previousOnReady()
          resolve(window[sdkGlobal])
        }
      }
      loadScript(url, err => {
        if (err) reject(err)
        if (!sdkReady) {
          resolve(window[sdkGlobal])
        }
      })
    })
  }
  








export function isJson(s) {
  var r =false;try{JSON.parse(s);r=true; }catch(e){r =false;}return r
}

export function ObjectKeys(p) {    
  var r =[];
   if(p){
      try{
      r= Object.keys(p);       
    }
    catch(e){
        for (var k in p) {
          r.push(k);
        }
    }
  }
  return r
}


export const Base64 = {
  
  
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


  encode: function(input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {

          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }

          output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
  },


  decode: function(input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {

          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }

      }

      output = Base64._utf8_decode(output);

      return output;

  },

  _utf8_encode: function(string) {        
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {

          var c = string.charCodeAt(n);

          if (c < 128) {
              utftext += String.fromCharCode(c);
          }
          else if ((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          }
          else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }

      }

      return utftext;
  },

  _utf8_decode: function(utftext) {
      var string = "";
      var i = 0,c1,c2,c3;
      var c = c1 = c2 = 0;

      while (i < utftext.length) {

          c = utftext.charCodeAt(i);

          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          }
          else if ((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          }
          else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }

      }

      return string;
  }

}





export const generateUUID = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
      let r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};


export function genHex16Id() {
  var ALPHABET = '123456789abcdefghijklmnopqrstuvwxyz';
  var ID_LENGTH = 16;
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

 
export function genId() {
  var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
  var ID_LENGTH = 16;
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

export function gen6CodeId() {
  var ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ID_LENGTH = 6;
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}



export function gen12CodeId() {
  var ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz';
  var ID_LENGTH = 12;
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}




export function getMaskClassName(){
  return maskClassName ;
} 






export function getClassMask(cmp){
  return maskClassFunction[cmp];
} 





export function convertArray2Obj(arr1,key) {
  key=key?key:'id';
  var obj ={};
  if(arr1.length>0){
      arr1.map(s=>{
          obj[s[key]]=s;
      })
  }else{
      obj = null
  }
 return obj;
}

export function convertArray2ObjGroupby(arr1,key) {
  key=key?key:'id';
   var obj ={};
  if(arr1.length>0){
      arr1.map(s=>{
          if(!obj[s[key]]){
              obj[s[key]]=[];
          }
          obj[s[key]].push(s);
      })
  }else{
      obj = null
  }
 return obj;
}

export function convertObj2Array(obj) {
  var arr = [];
  obj && ObjectKeys(obj).map(o=>{
      arr.push(obj[o]);
  })    
 return arr;
}





export const getClientError = errors => {
  if (!errors) {
    return;
  }
  const error = errors[0].message;
  if (!error || error.indexOf('{"_error"') === -1) {
    return {_error: 'Server query error'};
  }
  return JSON.parse(error);
};



export const prepareGraphQLParams = graphParams => {    
  graphParams.query = graphParams.query.replace(/\s/g, '');
  return JSON.stringify(graphParams);
  
};



export const prepareBodyParams = q => {
  return JSON.stringify(q);
};




let tempTk = `VTJGc2RHVmtYMTg1Q3RUWW56UmtvNkFBbFlMZ1h4WHFFQ25CWExmVlFFUXd6VURpR2wxRUpIUXJWS1RpajlhZA@@`;

function parseCokies(){
  Object.fromEntries(document.cookie.split('; ').map(c => {
    const [ key, ...v ] = c.split('=');
    return [ key, v.join('=') ];
  }));
}


function getAuth(){
  var h = new RegExp('@','g')   
  let k = "hxmTkn"
  var _tkn = window.localStorage.getItem(k)?window.localStorage.getItem(k):tempTk;
  var authToken = _tkn.replace(h,'=');   
  var useCokies = false;
  if(useCokies){
    var _parseCokies = parseCokies();
    if(_parseCokies && _parseCokies[k]){
        authToken =_parseCokies[k].replace(h,'=');
    }
  }
  return authToken
}

  
export const  fetchGraphQL = async (url,graphParams) => {
  const serializedParams = prepareGraphQLParams(graphParams);  
  
  var fp = genFP16bytes();

  var tempK = genId();

  // console.log(graphParams) 
  
  

  var encRypt = generateAESKEY(serializedParams,tempK);  
  var encRyptK = generateAESKEY(tempK, fp)



  var bsParams = JSON.stringify({q:Base64.encode(encRypt),k:Base64.encode(encRyptK)});
 

   var authToken = getAuth();
  //var authToken = window.localStorage.getItem('hrm_auth_token_media');
  var fbtkClnt = window.localStorage.getItem('fbtkClnt');
  const graphQLUrl = `${url}/streamdata`;
  const res = await fetch(graphQLUrl, {
    method: 'post',
    headers: {
      //'Content-Type': 'text/plain',
      'Content-Type': 'application/json',
      'Authorization': `${authToken}:${fp}`,
      'x-fb-tk': `${fbtkClnt}`,        
    },
    body: bsParams
  });  
  const resJSON = await res.json();    
  var _Data = resJSON;     
  if(_Data.status===200){            
    var kb = decryptAESKEY(_Data.k, fp);
    var decdData = decryptAESKEY(_Data.r, kb);
    if(isJson(decdData)){
      _Data = JSON.parse(decdData);
    }
  }  
  const {data, errors} = _Data;
  //console.log(data)
  return {data, error: getClientError(errors)};
};




export const monthsList_Short =[``,`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];


export const _dayShortNames = {"en":['S','M','T','W','T','F','S'],"es":['D','L','M','M','J','V','S']}
export const _monthNames = {"en":['','January','February','March','April','May','June','July','August','September','October','November','December'],"es":['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']}
export const _dayLargeNames = {"en":["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"],"es":["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes", "Sabado"]} ;






var hrs2Add = 0;
  
  
export function date2pretyfy(dt) {
  var date = dt?!isNaN(dt)?new Date(parseInt(dt.toString())):new Date():new Date();   
  return `${monthsList_Short[date.getMonth()+1]} ${date.getDate()}, ${date.getFullYear()}`;  
}

  
export function time2pretyfy(dt,ss) {
    var date = dt?!isNaN(dt)?new Date(parseInt(dt.toString())):new Date():new Date();
    date.setHours(date.getHours()+hrs2Add);
    var MM = date.getMinutes();
    var sec = date.getSeconds();
    var SS = ss?`:${sec>9?sec:`0${sec}`}`:'';
    return `${date.getHours()}:${MM>9?MM:`0${MM}`}${SS}`;
 }






 export  function isURL(str) {
  var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  var url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
}







const languageL_L={
  0:{en: "yes",es:"si"},
  1:{en: "attendance",es:"asistencia"},
  2:{en: "incomes",es:"ingresos"},
  3:{en: "kids",es:"niños"},
  4:{en: "kid",es:"niño"},
  5:{en: "shift",es:"turno"},
  6:{en: "groups",es:"grupos"},
  7:{en: "group",es:"grupo"},
  8:{en: "dashboard",es:"resumen"},
  9:{en: "settings",es:"herramientas"},
  10:{en: "setting",es:"herramienta"},
  11:{en: "logout",es:"salir"},
  12:{en: "daycare",es:"guardería"},
  13:{en: "save",es:"salvar"},
  14:{en: "delete",es:"borrar"},
  15:{en: "remove",es:"remover"},
  16:{en: "edit",es:"editar"},
  17:{en: "confirm",es:"confirmar"},
  18:{en: "title",es:"titulo"},
  19:{en: "description",es:"descripcion"},
  20:{en: "date",es:"fecha"},
  21:{en: "filter",es:"filtro"},
  22:{en: "order by",es:"ordenar por"},
  23:{en: "filter by",es:"filtrar por"},
  24:{en: "year",es:"año"},
  25:{en: "month",es:"mes"},
  26:{en: "day",es:"dia"},
  27:{en: "Date of Birth",es:"Fecha de Nacimiento"},
  28:{en: "cancel",es:"cancelar"},
  29:{en: "close",es:"cerrar"},
  30:{en: "address",es:"direccion"},
  31:{en: "cellphone",es:"telefono"},
  32:{en: "name",es:"nombre"},
  33:{en: "categories",es:"categorias"},
  34:{en: "vaccination",es:"vacunacion"},
  35:{en: "contract",es:"contrato"},
  36:{en: "amount",es:"cantidad"},
  37:{en: "parent Name",es:"Nombre de los Padres"},
  38:{en: "Email sent to",es:"Mensaje enviado a"},
  39:{en: "please check your email we sent a new key",es:"por favor revise su correo electrónico, le enviamos una nueva clave"},
  40:{en: "Email sent to",es:"Mensaje enviado a"},
  41:{en: "loans",es:"prestamos"},
  42:{en: "finance",es:"finanza"},
  43:{en: "Are you want to eliminate it",es:"Esta seguro que desea elimiarlo"},
  44:{en: "open App",es:"abrir Aplicacion"},
  45:{en: "Profile Updated",es:"Perfil Actualizado"},
  46:{en: "Profile",es:"Perfil"},
  47:{en: "You want to permanently delete",es:"Desea eliminar permanentemente"},
  48:{en: "You want to send an email to",es:"Desea enviar un correo a"},
  49:{en: "does not have registered email",es:"no tiene correo registrado"},
  50:{en: "requesting vaccines for",es:"solicitando las vacunas de"},
  51:{en: "requesting the contract for",es:"solicitando el contrato de"},    
  52:{en: "options",es:"opciones"},
  53:{en: "expenses",es:"gastos"},
  54:{en: "income",es:"ingresos"},
  55:{en: "kind",es:"type"},    
  56:{en: "losses",es:"perdidas"},
  57:{en: "earnings",es:"ganancias"},
  58:{en: "orders",es:"ordenes"},
  59:{en: "printer",es:"impresora"},
  60:{en: "The Field",es:"El campo"},
  61:{en: "is not a number",es:"no es un numero"},
  62:{en: "is required",es:"es obligatorio"},
  63:{en: "is too short",es:"es muy corto"},
  64:{en: "is too long",es:"es muy largo"},
  65:{en: "it must be greater than",es:"debe ser mayor que"},
  66:{en: "it must be less than",es:"debe ser menor que"},
  67:{en: "Function",es:"Funciones"},
  68:{en: "it must be less than",es:"debe ser menor que"},
  69:{en: "see receipt",es:"ver recibo"},
  70:{en: "fill manualy",es:"rellenar manualmente"},
  71:{en: "fill from a picture",es:"rellenar desde una foto"},
  73:{en: "You must verify the information, this is not 100% accurate",es:"Debe verificar la informacion, esta no es 100% precisa"},
  74:{en: "Adding a new",es:"Agregar nuevo"},
  75:{en: "store",es:"almacen"},
  76:{en: "unit",es:"unidad"},
  77:{en: "price",es:"precio"},
  78:{en: "image",es:"imagen"},
  79:{en: "image url",es:"url de la imagen"},
  80:{en: "search",es:"buscar"},
  81:{en: "first name",es:"nombre"},
  82:{en: "last name",es:"apellidos"},
  83:{en: "phone number",es:"telefono"},
  84:{en: "date of birth",es:"fecha nacimiento"},
  85:{en: "searching",es:"buscando"},
  86:{en: "interests",es:"intereses"},
  87:{en: "interest percentage",es:"porcentaje intereses"},
  88:{en: "payment frequency",es:"frecuencia de pago"},
  89:{en: "payments",es:"pagos"},




  91:{en: "Language",es:"Idioma"},
  92:{en: "Dark Theme",es:"Tema Oscuro"},
  93:{en: "On",es:"Endendido"},
  94:{en: "Off",es:"Apagado"},
  95:{en: "Choose your language",es:"Seleccione su idioma "},
  96:{en: "Dark theme turns the light surfaces of the page dark, creating an experience ideal for night.",es:"Este tema oscurece las zonas claras de la página, lo que brinda una experiencia ideal para la noche."},
  97:{en: "Your setting will apply to this browser only.",es:"Tu configuración se aplicará solo en este navegador."},
  98:{en: "Choose the functions you want to use.",es:"Seleccione las funciones que desea utilizar."},
  99:{en: "This option makes the title of the groups visible in the assistance.",es:"Esta opcion hace visible el titulo de los grupo en la asistencia."},
  100:{en: "This option defines the size sheet to print.",es:"Esta opcion define el tamaño de hoja a imprimir."},
  
  
  110:{en: "What days do you work?",es:"Qué días trabajas?"},

  192:{en: "Spanish",es:"Español"},
  193:{en: "English",es:"Ingles"},


  301:{en: "upc",es:"upc"},
  302:{en: "unit",es:"unidad"},
  303:{en: "department",es:"departamento"},
  304:{en: "brand",es:"marca"},
  305:{en: "product type",es:"tipo de producto"},
  306:{en: "area",es:"area"},
  307:{en: "ascendant",es:"ascendente"},
  308:{en: "descendant",es:"descendiente"},
  309:{en: "newer",es:"mas nuevas"},
  310:{en: "older",es:"mas antiguas"},
  311:{en: "location",es:"locacion"},
  312:{en: "product",es:"producto"},
  313:{en: "Serial Number",es:"Numero Serie"},
  314:{en: "By serial Number",es:"Por Numero Serie"},
  315:{en: "By Quantity",es:"Por Cantidad"},
  316:{en: "quantity",es:"cantidad"},
  317:{en: "in stock",es:"en existencia"},
  318:{en: "product's",es:"productos"},
  319:{en: "new",es:"nueva"},

  320:{en: "old",es:"antigua"},
  321:{en: "document",es:"documento"},
  322:{en: "tracking Number",es:"numero rastreo"},
  323:{en: "add",es:"agregar"},
  324:{en: "save",es:"guardar"},
  325:{en: "store type",es:"tipo almacen"},
  326:{en: "you must define at least one inventory location",es:"debe definir al menos una locacion de inventario"},
  327:{en: "save",es:"guardar"},



  501:{en: "Audio and subtitles",es:"Audio y subtítulos"},
  502:{en: "Descriptive audio",es:"Audio descriptivo"},
  503:{en: "Help Center",es:"Centro de ayuda"},
  504:{en: "Terms of use",es:"Términos de uso"},
  505:{en: "Privacy",es:"Privacidad"},
  506:{en: "Legal notices",es:"Avisos legales"},
  507:{en: "Cookie preferences",es:"Preferencias de cookies"},
  508:{en: "Corporate information",es:"Información corporativa"},
  509:{en: "Contact us",es:"Contáctanos"},
  510:{en: "This site is a humble copy of Netflix, no video is offered through this. It was developed for learning purposes and to test my skills only.",es:"Este sitio es una humilde copia de Netflix, no se ofrece ningún video a través de este. Fue desarrollado con fines de aprendizaje y para probar mis habilidades únicamente."},



  521:{en: "Play",es:"Reproducir"},
  522:{en: "Resume",es:"Reanudar"},
  523:{en: "More information",es:"Más información"},

  524:{en: "Home",es:"Inicio"},
  525:{en: "Movies",es:"Películas"},
  526:{en: "Shows",es:"Programas"},
  527:{en: "Latest Movies",es:"Películas Recientes"},
  528:{en: "Latest Shows",es:"Programas Recientes"},


  530:{en: "Search related to",es:"Busqueda relacionada con"},

  531:{en: "Cast",es:"Elenco"},
  532:{en: "Genders",es:"Géneros"},
  533:{en: "This title is",es:"Este título es"},
  534:{en: "More like this",es:"Más títulos similares a este"},
  535:{en: "Episodes",es:"Episodios"},
  536:{en: "About",es:"Acerca de"},
  537:{en: "Created by",es:"Creado por"},
  538:{en: "Age classification",es:"Clasificación por edad"},
  539:{en: "Next",es:"Siguiente"},
  540:{en: "Something went wrong? Tell us.",es:"Algo salio mal? Cuentanos."},
  
  541:{en: "Audio",es:"Audio"},
  542:{en: "Subtitles",es:"Subtitulos"},
  543:{en: "Disabled",es:"Desactivado"},
  544:{en: "Load file",es:"Cargar archivo"},
  545:{en: "What's going on?",es:"¿Qué sucede?"},
  546:{en: "Select all that apply.",es:"Selecciona todas las opciones que correspondan."},
  547:{en: "Labeling problem",es:"Problema de etiquetado"},
  548:{en: "Video problems",es:"Problemas de video"},
  549:{en: "Sound problem",es:"Problema de sonido"},
  550:{en: "Subtitle or closed caption problems",es:"Problemas de subtítulos o subtítulos ocultos"},
  551:{en: "Connection or buffering problem",es:"Problema de almacenamiento en búfer o conexión"},
  552:{en: "Wrong title or summary, or episodes out of order",es:"Título o resumen erróneos, o episodios fuera de orden"},
  553:{en: "Image blurred, cut off or not in good condition",es:"Imagen borrosa, se corta o no está en buenas condiciones"},
  554:{en: "Difficult to listen, does not go with the image, the sound is lost in some parts",es:"Difícil de escuchar, no va con la imagen, el sonido se pierde en algunas partes"},
  555:{en: "They are missing, they are difficult to read, they do not go with the sound, they have spelling mistakes or bad translations",es:"Faltan, son difíciles de leer, no van con el sonido, tienen faltas de ortografía o malas traducciones"},
  556:{en: "Replay buffering, playback does not start or other problem",es:"Repetición de almacenamiento en búfer, la reproducción no empieza u otro problema"},
  557:{en: "optional",es:"opcional"},
  558:{en: "Send report",es:"Enviar informe"},


  


 
  
  


}




export function getUserLanguage(){
  var userLang = navigator.language || navigator.userLanguage; 
  var lngLcSt = window && window.localStorage.getItem('lng') || userLang || 'en';
  var lng = lngLcSt.indexOf("es")>=0?"es":"en";
  return lng
}  

export function translatetext(s){   
  var r = s;    
  let lng = getUserLanguage();
  if(languageL_L[s]){
    r = languageL_L[s][lng];
  }  
  return r;
}




const languageL_TXT={
  "gastos":{en: "expenses",es:"gastos"},
  "ingresos":{en: "income",es:"ingresos"},
  "expenses":{en: "expenses",es:"gastos"},
  "income":{en: "income",es:"ingresos"},
  "categories":{en: "categories",es:"categorias"},
  "categorias":{en: "categories",es:"categorias"},
}


export function translateTxt(s){   
  var r = s;    
  let lng = getUserLanguage();
  if(languageL_TXT[s]){
    r = languageL_TXT[s][lng];
  }  
  return r;
}





export const DecryptAES = (text,key) => {    
    var bytes = CryptoJS.AES.decrypt(text, key);
    var basD = bytes.toString(CryptoJS.enc.Utf8);    
    return basD;
};



var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
var amexpRegEx = /^(?:3[47][0-9]{13})$/;
var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/; 


  
  
export  var validations = function(validate,data){
  var rs = {valid:true,msg:''};
  if(!data){
      rs =  {valid:false,msg:'missing data'};
  }
  ObjectKeys(validate).map(fld=>{
      if(fld && data){          
          if(data[fld]===undefined){ rs = {fld:fld, valid:false, msg:`not field data`}; }
          else if(data[fld]===null){ rs = {fld:fld, valid:false, msg:`not field data`}; }
          else{
              var _value =data[fld].toString();
              // console.log(_value);
              ObjectKeys(validate[fld]).map(vld=>{
                  if(vld==='minLength'){
                      if(_value.toString().length<validate[fld][vld]){
                          rs={fld:fld, valid:false,msg:`Minimum ${validate[fld][vld]} characters required`};
                      }        
                  }
                  if(vld==='maxLength'){
                      if(_value.toString().length>validate[fld][vld]){
                          rs = {fld:fld, valid:false,msg:`Maximum characters are ${validate[fld][vld]}`};
                      }        
                  }
                  if(vld==='number' && validate[fld][vld]){
                      let _v = !isNaN(_value)?true:false;
                      if(!_v){
                          rs = {fld:fld, valid:_v,msg:'number invalid'};      
                      }
                  }
                  if(vld==='minValue'){
                      if(_value<validate[fld][vld]){
                          rs = {fld:fld, valid:false,msg:'value is less than the required'};
                      }        
                  }
                  if(vld==='maxValue'){
                      if(_value>validate[fld][vld]){
                          rs = {fld:fld, valid:false,msg:'value is grather than the required'};
                      }        
                  }
                  if(vld==='date' && validate[fld][vld]){
                      let _v = !isNaN(_value)?(new Date(parseInt(_value.toString()))).getTime()?true:false:false; 
                      if(!_v){
                          rs = {fld:fld, valid:_v,msg:'date invalid'};       
                      }  
                  }
                  if(vld==='phone' && validate[fld][vld]){
                      let _v = /^[\dX]{3}-?[\dX]{3}-?[\dX]{4}$/.test(_value);  
                      if(!_v){
                          rs = {fld:fld, valid:_v,msg:'phone invalid'};       
                      }   
                  } 
                  if(vld==='ssn' && validate[fld][vld]){
                      let _v = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(_value); 
                      if(!_v){
                          rs = {fld:fld, valid:_v,msg:'ssn invalid'};        
                      }  
                  }
                  if(vld==='ip' && validate[fld][vld]){
                    let _v = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(_value); 
                    if(!_v){
                        rs = {fld:fld, valid:_v,msg:'invalid IP address'};        
                    }  
                }
                  if(vld==='email' && validate[fld][vld]){
                      let _v = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(_value);
                      if(!_v){
                          rs = {fld:fld, valid:_v,msg:'email invalid'};   
                      }    
                  } 
                  if(vld==='card' && validate[fld][vld]){
                    let _v =visaRegEx.test(_value);
                    if(!_v){
                        rs = {fld:fld, valid:_v,msg:'card invalid'};   
                    }    
                  }

                  if(vld==='required' && !_value){            
                      rs = {fld:fld, valid:false,msg:`value required ${fld}`};     
                  } 
              })             
          }
      }
  })
  return rs;
}



export function ValidateIPaddress(ipaddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
    {
      return (true)
    }
  // alert("You have entered an invalid IP address!")
  return (false)
}





export function buildTimeString_(displayTime, showHour) {
    var h = Math.floor(displayTime / 3600);
    var m = Math.floor((displayTime / 60) % 60);
    var s = Math.floor(displayTime % 60);
    if (s < 10) s = '0' + s;
    var text = m + ':' + s;
    if (showHour) {
      if (m < 10) text = '0' + text;
      text = h + ':' + text;
    }
    return text;
  };


  const AUDIO_EXTENSIONS = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i
  const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i
  const HLS_EXTENSIONS = /\.(m3u8|ts)($|\?)/i
  const HLM_EXTENSIONS = /\.(hlm|ts)($|\?)/i
  
  
  const DASH_EXTENSIONS = /\.(mpd)($|\?)/i
  const MP4_EXTENSIONS = /\.(mp4)($|\?)/i
  
  




  export const shouldUseHLS = (url) => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    return (HLS_EXTENSIONS.test(url) && !iOS) //|| this.props.config.file.forceHLS
  }
  
  export const shouldUseAudio = (url) => {
    return AUDIO_EXTENSIONS.test(url) //|| props.config.file.forceAudio
  }
  
  export const shouldUseHLM = (url) => {
    return (HLM_EXTENSIONS.test(url));
  }
  
  export const shouldUseDASH = (url) => {
    return DASH_EXTENSIONS.test(url)
  }
  
  export const shouldUseMP4 = (url) => {
    return MP4_EXTENSIONS.test(url)
  }
  



export function fullscreenElement(){
  var doc = document;
  return doc.fullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement || document.webkitFullscreenElement;
}


export function fullscreenEnabled(){
  var doc = document;
  return doc.fullscreenEnabled || doc.mozFullScreenEnabled || doc.msFullscreenEnabled || document.webkitFullscreenEnabled;  
}




  
export function Y(){
  if (window.document) {
            var a = Element.prototype;
            a.requestFullscreen = a.requestFullscreen || a.mozRequestFullScreen || a.msRequestFullscreen || a.webkitRequestFullscreen;
            a = Document.prototype;
            a.exitFullscreen = a.exitFullscreen || a.mozCancelFullScreen || a.msExitFullscreen || a.webkitExitFullscreen;
              document.fullscreenElement = (
              Object.defineProperty(document, "fullscreenElement", {
                get: function() {
                var doc = document;
                        return doc.mozFullScreenEnabled || doc.msFullscreenEnabled || document.webkitFullscreenEnabled
                    }
              }),
               Object.defineProperty(document, "fullscreenEnabled", {
                    get: function() {
                      var doc = document;
                        return doc.mozFullScreenEnabled || doc.msFullscreenEnabled || document.webkitFullscreenEnabled
                    }
                })
              );
            document.addEventListener("webkitfullscreenchange", Tg);
            document.addEventListener("webkitfullscreenerror", Tg);
            document.addEventListener("mozfullscreenchange", Tg);
            document.addEventListener("mozfullscreenerror", Tg);
            document.addEventListener("MSFullscreenChange", Tg);
            document.addEventListener("MSFullscreenError", Tg)
        }
    };


function Tg(a) {
  var b = a.type.replace(/^(webkit|moz|MS)/, "").toLowerCase();
  if ("function" === typeof Event) var c = new Event(b, a);
  else c = document.createEvent("Event"); c.initEvent(b, a.bubbles, a.cancelable);
  a.target.dispatchEvent(c)
}




export  function IsFullScreen(elm) {
  //window.innerWidth == elm.clientWidth && window.innerHeight == elm.clientHeight
  var rs = false;
  if((window.innerWidth === elm.clientWidth)) {
      rs = true;
  }
  return rs;
}




export  function srtBySecond(s,arr) {
  var txt = null; 
  if(s && arr){
      var start = 0,end = arr.length,factor=10, range=end-start,step=range/factor;               
      for(var i=0;i<factor;i++){
         
          var Ind = Math.floor((i*step)+start);
          var ArrStep = arr[Ind];
  
          var Cst = Cst && ArrStep.start
          var Cend = Cst && ArrStep.end
          if(Cst>s){
              end=Ind;
              range=end-start;
              step=range/factor; 
          }
          else if(Cst<s){
              start=Ind;
              range=end-start;
              step=range/factor; 
          }
          if(range<100){ 
              break
          }             
      }        
      for(var i = start;i<=end;i++){        
          var CSt = arr[i];
          if(CSt){
              var Cst = CSt.start
              var Cend = CSt.end            
              if(Cst<=s && Cend>=s){
                  txt = CSt.text;    
              }
          }
      }
  }
  return txt
}




  
export const parseQuery =(url) =>{
  var urlParams = new URLSearchParams(url);
  var  obj = {};
  var entries = urlParams.entries();
  for(var pair of entries) { 
      obj[pair[0]]= pair[1]; 
  }    
  return obj
} 






var maskClassName = {}
var maskClassFunction = {}











  








export const fetchPostUrl = async v => {
    var authToken = window.localStorage.getItem('hxmTkn');
    var fp = window.localStorage.getItem('fpXb'); 
    const res = await fetch(v, {
      method: 'post',
      headers: {
        //'Content-Type': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': `${authToken}:${fp}`,
      },
      body:``     
    });
    const resJSON = await res.json();    
    return resJSON;
};
  



export function genNumber() {
    var ALPHABET = '0123456789';
    var ID_LENGTH = 2;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }


  var FPHEX = {}



  export function genFP16bytes(tr) {    
    var fp = window.localStorage.getItem('fpXb');
    if(tr){
      return fp;
    }
    else if(FPHEX[fp]){
      return FPHEX[fp];
    }else{
      let id = genHex16Id();
      FPHEX[fp] = id
      return id;
    }  
  }

  


export const get_GRAPHQLURL = () =>{
  return utlBase || window.HrmConfig && window.HrmConfig["url"];
} 






export const  Auth = async (url,graphParams) => {
 
  const serializedParams = JSON.stringify(graphParams); 
  
  
  var fp = genFP16bytes();

  var tempK = genId();

  // console.log(graphParams)

  var encRypt = generateAESKEY(serializedParams,tempK);  
  var encRyptK = generateAESKEY(tempK, fp)


  var bsParams = JSON.stringify({q:Base64.encode(encRypt),k:Base64.encode(encRyptK)});
 

  var authToken = getAuth();
  //var authToken = window.localStorage.getItem('hrm_auth_token_media');
  //var fbtkClnt = window.localStorage.getItem('fbtkClnt');
  const graphQLUrl = `${url}/auth`;
  const res = await fetch(graphQLUrl, {
    method: 'post',
    headers: {
      //'Content-Type': 'text/plain',
      'Content-Type': 'application/json',
      'Authorization': `${authToken}:${fp}`,            
    },
    body: bsParams
  });
    let resJSON = await res.json();    
    var _Data = resJSON;     
    if(_Data.status===200){            
      var kb = decryptAESKEY(_Data.k, fp);
      var decdData = decryptAESKEY(_Data.r, kb);
      if(isJson(decdData)){
        _Data = JSON.parse(decdData);
      }
    }   
    return _Data;
};





export const  fetchFtp = async (url,graphParams) => {
 
  const serializedParams = JSON.stringify(graphParams); 
  
  
  var fp = genFP16bytes();

  var tempK = genId();

  // console.log(graphParams)

  var encRypt = generateAESKEY(serializedParams,tempK);  
  var encRyptK = generateAESKEY(tempK, fp)


  var bsParams = JSON.stringify({q:Base64.encode(encRypt),k:Base64.encode(encRyptK)});
 

  var authToken = getAuth();
  //var authToken = window.localStorage.getItem('hrm_auth_token_media');
  //var fbtkClnt = window.localStorage.getItem('fbtkClnt');
  const graphQLUrl = `${url}/streamftp`;
  const res = await fetch(graphQLUrl, {
    method: 'post',
    headers: {
      //'Content-Type': 'text/plain',
      'Content-Type': 'application/json',
      'Authorization': `${authToken}:${fp}`,            
    },
    body: bsParams
  });
    let resJSON = await res.json();    
    var _Data = resJSON;     
    if(_Data.status===200){            
      var kb = decryptAESKEY(_Data.k, fp);
      var decdData = decryptAESKEY(_Data.r, kb);
      if(isJson(decdData)){
        _Data = JSON.parse(decdData);
      }
    }   
    return _Data;
};






export const  fetchStream_movie_data = async (url,graphParams) => {
 
  const serializedParams = JSON.stringify(graphParams); 
  
  
  var fp = genFP16bytes();
  var fprntId = genFP16bytes(true);

  var tempK = genId();

  // console.log(graphParams)

  var encRypt = generateAESKEY(serializedParams,tempK);  
  var encRyptK = generateAESKEY(tempK, fp)


  var bsParams = JSON.stringify({q:Base64.encode(encRypt),k:Base64.encode(encRyptK)});
 

  var authToken = getAuth();
  //var authToken = window.localStorage.getItem('hrm_auth_token_media');
  //var fbtkClnt = window.localStorage.getItem('fbtkClnt');
  const graphQLUrl = `${url}/streamdata`;
  const res = await fetch(graphQLUrl, {
    method: 'post',
    headers: {
      //'Content-Type': 'text/plain',
      'Content-Type': 'application/json',
      'Authorization': `${authToken}:${fp}:${fprntId}`,            
    },
    body: bsParams
  });
    let resJSON = await res.json();    
    var _Data = resJSON;     
    if(_Data.status===200){            
      var kb = decryptAESKEY(_Data.k, fp);
      var decdData = decryptAESKEY(_Data.r, kb);
      if(isJson(decdData)){
        _Data = JSON.parse(decdData);
      }
    }   
    return _Data;
};









export function Base64Decode(str) {
  if (!(/^[a-z0-9+/]+={0,2}$/i.test(str)) || str.length%4 != 0) throw Error('Not base64 string');

  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, d=[];

  for (var c=0; c<str.length; c+=4) {  // unpack four hexets into three octets
      h1 = b64.indexOf(str.charAt(c));
      h2 = b64.indexOf(str.charAt(c+1));
      h3 = b64.indexOf(str.charAt(c+2));
      h4 = b64.indexOf(str.charAt(c+3));

      bits = h1<<18 | h2<<12 | h3<<6 | h4;

      o1 = bits>>>16 & 0xff;
      o2 = bits>>>8 & 0xff;
      o3 = bits & 0xff;

      d[c/4] = String.fromCharCode(o1, o2, o3);
      // check for padding
      if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
      if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
  }
  str = d.join('');  // use Array.join() for better performance than repeated string appends

  return str;
}








export function Base64Encode(str) {
  if (/([^\u0000-\u00ff])/.test(str)) throw Error('String must be ASCII');

  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c;

  c = str.length % 3;  // pad string to length of multiple of 3
  if (c > 0) { while (c++ < 3) { pad += '='; str += '\0'; } }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars

  for (c=0; c<str.length; c+=3) {  // pack three octets into four hexets
      o1 = str.charCodeAt(c);
      o2 = str.charCodeAt(c+1);
      o3 = str.charCodeAt(c+2);

      bits = o1<<16 | o2<<8 | o3;

      h1 = bits>>18 & 0x3f;
      h2 = bits>>12 & 0x3f;
      h3 = bits>>6 & 0x3f;
      h4 = bits & 0x3f;

      // use hextets to index into code string
      e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  str = e.join('');  // use Array.join() for better performance than repeated string appends

  // replace 'A's from padded nulls with '='s
  str = str.slice(0, str.length-pad.length) + pad;

  return str;
}




export async function supportsWebp() {
  if (!window.createImageBitmap) return false;  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}

export async function SupportWebp(){
  if(await supportsWebp()) {
    _isSupportWebp_ = true;
    updStore("isWebp",true)
    return _isSupportWebp_;
  }
  else {
      _isSupportWebp_ = false;
      updStore("isWebp",false)
      return _isSupportWebp_;
  }
};

SupportWebp();


export async function supportsSVG() {
  if (!window.createImageBitmap) return false;
  
  const webpData = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz4NCg0KDQoNCg0KDQoNCjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek03LjA3IDE4LjI4Yy40My0uOSAzLjA1LTEuNzggNC45My0xLjc4czQuNTEuODggNC45MyAxLjc4QzE1LjU3IDE5LjM2IDEzLjg2IDIwIDEyIDIwcy0zLjU3LS42NC00LjkzLTEuNzJ6bTExLjI5LTEuNDVjLTEuNDMtMS43NC00LjktMi4zMy02LjM2LTIuMzNzLTQuOTMuNTktNi4zNiAyLjMzQzQuNjIgMTUuNDkgNCAxMy44MiA0IDEyYzAtNC40MSAzLjU5LTggOC04czggMy41OSA4IDhjMCAxLjgyLS42MiAzLjQ5LTEuNjQgNC44M3pNMTIgNmMtMS45NCAwLTMuNSAxLjU2LTMuNSAzLjVTMTAuMDYgMTMgMTIgMTNzMy41LTEuNTYgMy41LTMuNVMxMy45NCA2IDEyIDZ6bTAgNWMtLjgzIDAtMS41LS42Ny0xLjUtMS41UzExLjE3IDggMTIgOHMxLjUuNjcgMS41IDEuNVMxMi44MyAxMSAxMiAxMXoiLz4NCg0KDQoNCg0KDQo8L3N2Zz4=';
  const blob = await fetch(webpData).then(r => r.blob());  
  return createImageBitmap(blob).then(() => true, () => false);
}

export async function isSVGSupported(){
  if(await supportsSVG()) {
    return true
  }
  else {
      return false
  }
};
















export function getBrowser(usera) {
  var useragent = usera || navigator.userAgent;
  var os = false;
  var browser = false;
  var icon = '';
  var name = '';
  var verTag = '';
  var nameTrans = '';
  var current = false;
  var brand = false;
  var details = {};

  if (Object(useragent).details !== undefined) {
      return useragent.details;
  }
  useragent = (' ' + useragent).toLowerCase();

  
  if (useragent.indexOf('windows phone') > 0) {
      icon = 'wp.png';
      os = 'Windows Phone';
  }
  else if (useragent.indexOf('android') > 0) {
      os = 'Android';
  }
  else if (useragent.indexOf('windows') > 0) {
      os = 'Windows';
  }
  else if (useragent.indexOf('iphone') > 0) {
      os = 'iPhone';
  }
  else if (useragent.indexOf('imega') > 0) {
      os = 'iPhone';
  }
  else if (useragent.indexOf('ipad') > 0) {
      os = 'iPad';
  }
  else if (useragent.indexOf('mac') > 0
      || useragent.indexOf('darwin') > 0) {
      os = 'Apple';
  }
  else if (useragent.indexOf('linux') > 0) {
      os = 'Linux';
  }
  else if (useragent.indexOf('blackberry') > 0) {
      os = 'Blackberry';
  }

  if (useragent.indexOf(' edge/') > 0) {
      browser = 'Edge';
  }
  else if (useragent.indexOf('iemobile/') > 0) {
      icon = 'ie.png';
      brand = 'IEMobile';
      browser = 'Internet Explorer';
  }
  else if (useragent.indexOf('opera') > 0 || useragent.indexOf(' opr/') > 0) {
      browser = 'Opera';
  }
  else if (useragent.indexOf(' dragon/') > 0) {
      icon = 'dragon.png';
      browser = 'Comodo Dragon';
  }
  else if (useragent.indexOf('vivaldi') > 0) {
      browser = 'Vivaldi';
  }
  else if (useragent.indexOf('maxthon') > 0) {
      browser = 'Maxthon';
  }
  else if (useragent.indexOf('electron') > 0) {
      browser = 'Electron';
  }
  else if (useragent.indexOf('palemoon') > 0) {
      browser = 'Palemoon';
  }
  else if (useragent.indexOf('cyberfox') > 0) {
      browser = 'Cyberfox';
  }
  else if (useragent.indexOf('waterfox') > 0) {
      browser = 'Waterfox';
  }
  else if (useragent.indexOf('iceweasel') > 0) {
      browser = 'Iceweasel';
  }
  else if (useragent.indexOf('seamonkey') > 0) {
      browser = 'SeaMonkey';
  }
  else if (useragent.indexOf('lunascape') > 0) {
      browser = 'Lunascape';
  }
  else if (useragent.indexOf(' iron/') > 0) {
      browser = 'Iron';
  }
  else if (useragent.indexOf('avant browser') > 0) {
      browser = 'Avant';
  }
  else if (useragent.indexOf('polarity') > 0) {
      browser = 'Polarity';
  }
  else if (useragent.indexOf('k-meleon') > 0) {
      browser = 'K-Meleon';
  }
  else if (useragent.indexOf(' crios') > 0) {
      browser = 'Chrome';
      details.brand = verTag = 'CriOS';
  }
  else if (useragent.indexOf('chrome') > 0) {
      browser = 'Chrome';
  }
  else if (useragent.indexOf('safari') > 0) {
      verTag = 'Version';
      browser = 'Safari';
  }
  else if (useragent.indexOf('firefox') > 0) {
      browser = 'Firefox';
  }
  else if (useragent.indexOf(' otter/') > 0) {
      browser = 'Otter';
  }
  else if (useragent.indexOf('thunderbird') > 0) {
      browser = 'Thunderbird';
  }
  else if (useragent.indexOf('es plugin ') === 1) {
      icon = 'esplugin.png';
      browser = 'ES File Explorer';
  }
  else if (useragent.indexOf('megasync') > 0) {
      browser = 'MEGAsync';
  }
  else if (useragent.indexOf('msie') > 0
      || useragent.indexOf('trident') > 0) {
      browser = 'Internet Explorer';
  }

  // Translate "%1 on %2" to "Chrome on Windows"
  if ((os) && (browser)) {
      name = (brand || browser) + ' on ' + os;
      //nameTrans = String(l && l[7684]).replace('%1', brand || browser).replace('%2', os);
  }
  else if (os) {
      name = os;
      icon = icon || (os.toLowerCase() + '.png');
  }
  else if (browser) {
      name = browser;
  }
  else {
      name = 'Unknown';
      icon = 'unknown.png';
  }
  if (!icon && browser) {
      if (browser === 'Internet Explorer' || browser === 'Edge') {
          icon = 'ie.png';
      }
      else {
          icon = browser.toLowerCase() + '.png';
      }
  }

  details.name = name;
  details.nameTrans = nameTrans || name;
  details.icon = icon;
  details.os = os || '';
  details.browser = browser;
  details.version =
      (useragent.match(RegExp("\\s+" + (verTag || brand || browser) + "/([\\d.]+)", 'i')) || [])[1] || 0;

  // Determine if the OS is 64bit
  details.is64bit = /\b(WOW64|x86_64|Win64|intel mac os x 10.(9|\d{2,}))/i.test(useragent);

  // Determine if using a browser extension
  details.isExtension = (current  || useragent.indexOf('megext') > -1);

  if (useragent.indexOf(' MEGAext/') !== -1) {
      var ver = useragent.match(/ MEGAext\/([\d.]+)/);

      details.isExtension = ver && ver[1] || true;
  }

  if (brand) {
      details.brand = brand;
  }

  // Determine core engine.
  if (useragent.indexOf('webkit') > 0) {
      details.engine = 'Webkit';
  }
  else if (useragent.indexOf('trident') > 0) {
      details.engine = 'Trident';
  }
  else if (useragent.indexOf('gecko') > 0) {
      details.engine = 'Gecko';
  }
  else {
      details.engine = 'Unknown';
  }

  // Product info to quickly access relevant info.
  details.prod = details.name + ' [' + details.engine + ']'
      + (details.brand ? '[' + details.brand + ']' : '')
      + '[' + details.version + ']'
      + (details.isExtension ? '[E:' + details.isExtension + ']' : '')
      + '[' + (details.is64bit ? 'x64' : 'x32') + ']';
      
  return details;
}









var AesUtil = function(keySize, iterationCount) {
  this.keySize = keySize / 32;
  //this.keySize = keySize ;
  this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function(salt, passPhrase) {
  var key = CryptoJS.PBKDF2(
      passPhrase, 
      CryptoJS.enc.Hex.parse(salt),
      { keySize: this.keySize, iterations: this.iterationCount });
  return key;
}

AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, passPhrase);
  var encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, passPhrase); 
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
   
  return decrypted.toString(CryptoJS.enc.Utf8);
}



const sizeKey = 128;



export const  generateAESKEY = (d,k) => {

  var iv = CryptoJS.lib.WordArray.random(sizeKey/8).toString(CryptoJS.enc.Hex);
  var salt = CryptoJS.lib.WordArray.random(sizeKey/8).toString(CryptoJS.enc.Hex);
  var aesUtil = new AesUtil(sizeKey, 1000);
  var ciphertext = aesUtil.encrypt(salt, iv,k,d);
  var aesText = (iv + "::" + salt + "::" + ciphertext);  
  var aesB64 = btoa(aesText);

  return aesB64;
}



export const  decryptAESKEY = (d,k) => {
  let decryptedPassword =  atob(d);
  //console.log({decryptedPassword})
  var aesUtil = new AesUtil(sizeKey, 1000);
  //salt, iv, passPhrase, cipherText
  let  result =  aesUtil.decrypt(decryptedPassword.split("::")[1], decryptedPassword.split("::")[0], k, decryptedPassword.split("::")[2]); 
  return result;
}


/*
let decrr =  decryptAESKEY("YTk4ODdjOTQ0Mjg4ZmU0NGZjYjYyMDFmYWI0YjdkZDA6OjcxODIyNTI5MWRjNWVkZGFiZmIzNzVmYjYxODJlOWIzOjpQeWhVWWhzblFTRTlsY3lQZDhIdG42b3o4YTJzNnZlVFI1K3V3M3pJVmZrQVBGQ0ZNbklwQnlCWCs4U0dtc2dINzd0THM5TTNwQTMrCnpRMzBlOG50NHVBR2xNbXRPY1lhN3UreDNCRlFHQUxNR3VGckpKdm1PUVBYV2d0Z3NyajZyMm1SeEdLQTg0VHdlN1h5ZUFUQytMbk8KMGE4aE5wSjFRcTFzdnNxNVpTN282Skg4MU4weFc2bWRxU1VYa24yNnE3MmxZSTMrLzFQbVZZdUtnbTlFQXc9PQo=","Yu5LbzNpTOtPUT8e");
console.log({decrr})

*/


export const getGenres =  () => {
  return _genres;
}



export const fileData = (Data) => {
  let data = Data;
  let store = getStore();
  let _ftpPath = store["ftpPath"] || "";
  let fld = _ftpPath.split('@@');   
  data && fld.map(_fl=>{
    if(_fl && data[_fl]){
      data = data[_fl]
    }
  })  
  return data;
}




const  decryptAESKEY333 = (f) => {
  var aesUtil = new AesUtil(256, 1000);
   //salt, iv, passPhrase, cipherText
  let  result =  aesUtil.decrypt(f.keyid, f.iv, f.signature, f.ciphertext); 
  return result;
}





/*

let yyg =  {
  "ciphertext":"x+U25hYqBBhxiqebLGVV1VPRKyN55RXbDLLD4KUVmvnOOlAAgKBXlOfZEw5o1JLHkw9ZINYF8Db+1AQMnfFxeJWef9BIXTvRrsllhKxDNALZxhhkAm220GwGlDpn03elab0nYirQEySk/iMklUxXoqV6S4p3BvulMaRUTsz6aRz514n8flN1ggQyaK6EaS1cBmSvC9PmVKA0xPWYPbuWU7hvdCQ5vPxxYWQ1Tg/ll3ky4xkbelNnaol4DXtkgiyx/ftgS7uglwkuDhLT1inowSF9af3i0FY0q1q03YEKJN/YqdT2FWm3TZLzJQCuN8v9ToHD8OZx4TFwE/81R++j8D7W7INnwAPxOeHU/9vw96Ij6Xl7qFwxRAkSv27YDfhdvJ7yVnAk8qH0n2iDhQAy2nFtAQWTL3SCbmwR+4K/Aj8Fjsu78hvk0sU7Esh1PbDEYX/v1AlNwgsNUGeR5YtBQiPXaML2YotL+T5TddREFLBdP81FugvZWjg393rgYr1dJoqf6qXX3DorrIamHhda9ZQNlkZUToFtKIAtlrlQYzGOSpu4ZQrxVRRUkGMGtqUS34xru6GAsdBG8HCFmVpNtkZwc9eXBLVWkVO1QYmadaGqrOElGmuRvSEPJHhys3V97qWN4rSww8sCDsfy7E2E4CHD78a4/zyLjBxnn8HIuTBDcE9Vm68gIWlOjuJEUzjwTlNg0MavEb7cObjPT3MKshEvJxv6kN2MnqN+dOQS5fyDd/Vmgml09y484F8aGrIRaH/z3NUPO6Hq76+W4RaAbhTb5EXuyEzw1vqWva5I3XdtO4kwqYbBrkluwdH4xTBSCt3tjXYJf7gPv+4fkLnxBS8BxnX6ZIKTRO9xCD7b7qq7pxLqtoKAA+xEkir50Lmcgx/ZlJOiOgzmMfjVg4TEOXq60doVa/cRIJzAMAhydMw0zCamSyFzGcau91xdCjxzv4Ba6WdAYozwhDAPuWd5SEOfl1Pe1BdriuSWphhmPA0xYuNDRxeD4t8vpIK97kAJczVcqUHr5I+azcJXbEI4YsuBiEvH9YiHc+7+wP2a1gnRwfp4WOkFPkpSntR5643D/PpwWxBFxst95hFumaNNXU+ObYAs2lvzvcovLydVkRSRWU7TifbgtpaOjrZBZQ7g9l5jQy3dxmXnmrA2Dtfg8/OR0VByhhLVtb72XgM+8DY3e6f5omGyfWK42Rg6S/cbHALE43k6oHlSNKK2d33Sv2GTTxycoNKZpsatiAjvqMvmbQHjQx+MlwU9Ruc2G9uhJBSAoDKr/WQZERs02ki+vg==",
  "sha256":"AA==",
  "keyid":"NFCDCH-02-F2EXU8392JWU1LK7EJQTHYMK873HUX_183",
  "iv":"Ofj0A9h5SEi2fyc96nKEHA=="
}

let yyg3 = {
  "ciphertext":"HLhj2RBa1H99LQXJ3kcYMtB7xVQdeGyMmq6csu6LmqBq5iebzE2QCaf/X0GKemIzWRu970oIrHvNYZlHxa+cQY8X8jA8c9FS7AgimE0nbd5CO7gntUpm4w/YTogyS2PQ0WoXGvHev1NW0ElTX+LT2QOWngFqnTE/NbSzcVo2O8Z0wki2QU3x+CeJfRQWDLr07dmZAiksZjWj6b4POQxlIYmLFIHWSdtMuGkmvTJbdrgy8cbP69RnI+DEZ34OX9VQZhTtpcH9Zpd4mOr0vIcQmsAbqpswiNVtnnnq/pFzYgI=",
  "sha256":"AA==",
  "keyid":"NFCDCH-02-F2EXU8392JWU1LK7EJQTHYMK873HUX_183",
  "iv":"1BpwnWP3itmBZv3Zhl8g8Q==",
  "signature":"/TLnxl4cJ7ALbhLO+U0wauwU0UvT9pYSJFdZoDvl84s="
}




decryptAESKEY333(yyg3);

let ffff  = {
  "headerdata":"eyJjaXBoZXJ0ZXh0IjoieCtVMjVoWXFCQmh4aXFlYkxHVlYxVlBSS3lONTVSWGJETExENEtVVm12bk9PbEFBZ0tCWGxPZlpFdzVvMUpMSGt3OVpJTllGOERiKzFBUU1uZkZ4ZUpXZWY5QklYVHZScnNsbGhLeEROQUxaeGhoa0FtMjIwR3dHbERwbjAzZWxhYjBuWWlyUUV5U2svaU1rbFV4WG9xVjZTNHAzQnZ1bE1hUlVUc3o2YVJ6NTE0bjhmbE4xZ2dReWFLNkVhUzFjQm1TdkM5UG1WS0EweFBXWVBidVdVN2h2ZENRNXZQeHhZV1ExVGcvbGwza3k0eGtiZWxObmFvbDREWHRrZ2l5eC9mdGdTN3VnbHdrdURoTFQxaW5vd1NGOWFmM2kwRlkwcTFxMDNZRUtKTi9ZcWRUMkZXbTNUWkx6SlFDdU44djlUb0hEOE9aeDRURndFLzgxUisrajhEN1c3SU5ud0FQeE9lSFUvOXZ3OTZJajZYbDdxRnd4UkFrU3YyN1lEZmhkdko3eVZuQWs4cUgwbjJpRGhRQXkybkZ0QVFXVEwzU0NibXdSKzRLL0FqOEZqc3U3OGh2azBzVTdFc2gxUGJERVlYL3YxQWxOd2dzTlVHZVI1WXRCUWlQWGFNTDJZb3RMK1Q1VGRkUkVGTEJkUDgxRnVndlpXamczOTNyZ1lyMWRKb3FmNnFYWDNEb3JySWFtSGhkYTlaUU5sa1pVVG9GdEtJQXRscmxRWXpHT1NwdTRaUXJ4VlJSVWtHTUd0cVVTMzR4cnU2R0FzZEJHOEhDRm1WcE50a1p3YzllWEJMVldrVk8xUVltYWRhR3FyT0VsR211UnZTRVBKSGh5czNWOTdxV040clN3dzhzQ0RzZnk3RTJFNENIRDc4YTQvenlMakJ4bm44SEl1VEJEY0U5Vm02OGdJV2xPanVKRVV6andUbE5nME1hdkViN2NPYmpQVDNNS3NoRXZKeHY2a04yTW5xTitkT1FTNWZ5RGQvVm1nbWwwOXk0ODRGOGFHcklSYUgvejNOVVBPNkhxNzYrVzRSYUFiaFRiNUVYdXlFencxdnFXdmE1STNYZHRPNGt3cVliQnJrbHV3ZEg0eFRCU0N0M3RqWFlKZjdnUHYrNGZrTG54QlM4QnhuWDZaSUtUUk85eENEN2I3cXE3cHhMcXRvS0FBK3hFa2lyNTBMbWNneC9abEpPaU9nem1NZmpWZzRURU9YcTYwZG9WYS9jUklKekFNQWh5ZE13MHpDYW1TeUZ6R2NhdTkxeGRDanh6djRCYTZXZEFZb3p3aERBUHVXZDVTRU9mbDFQZTFCZHJpdVNXcGhobVBBMHhZdU5EUnhlRDR0OHZwSUs5N2tBSmN6VmNxVUhyNUkrYXpjSlhiRUk0WXN1QmlFdkg5WWlIYys3K3dQMmExZ25Sd2ZwNFdPa0ZQa3BTbnRSNTY0M0QvUHB3V3hCRnhzdDk1aEZ1bWFOTlhVK09iWUFzMmx2enZjb3ZMeWRWa1JTUldVN1RpZmJndHBhT2pyWkJaUTdnOWw1alF5M2R4bVhubXJBMkR0Zmc4L09SMFZCeWhoTFZ0YjcyWGdNKzhEWTNlNmY1b21HeWZXSzQyUmc2Uy9jYkhBTEU0M2s2b0hsU05LSzJkMzNTdjJHVFR4eWNvTktacHNhdGlBanZxTXZtYlFIalF4K01sd1U5UnVjMkc5dWhKQlNBb0RLci9XUVpFUnMwMmtpK3ZnPT0iLCJzaGEyNTYiOiJBQT09Iiwia2V5aWQiOiJORkNEQ0gtMDItRjJFWFU4MzkySldVMUxLN0VKUVRIWU1LODczSFVYXzE4MyIsIml2IjoiT2ZqMEE5aDVTRWkyZnljOTZuS0VIQT09In0=",
  "signature":"kYGSmxByR8zGnasxBj9Ev7kpsKP52F1E2wse5KtY634=",
  "mastertoken": {
      "tokendata":"eyJzZXNzaW9uZGF0YSI6IkJRQ0FBQUVCRUN2WXd1dG9EZjJ5NzlJQU9OTWk3eVdCUUZaTjlPNXdEcUt5VlhsOE53aXdkOG1BSWlFUTZHNTlDT2d6M2szQ1pnYThDbzdDa09ZbVpLb2xtS1JLelhHTFAzZ3I1SjFyNHA5U0V4Q3BoZ2VUdDBZcHRkNnoxdEtVYmdFaWt4TzczWjZjRXFySm4zR0pEWE83TVZCVGR3bjZKZ2lrSlcvdFRzS2pPMWV1VVN2NFpPejRaSVdXUUVhL0N1WU1pVk5iRkltRWZDbktiZHRKN3dkY3V2MllrVm5iZjlVbk9zYkNiLy9jcXpsVkZyWERZYWJKSDdrMUhNRTFvUHFWeTVHenNsTlpYN2dOT2J5MjJXZ0VGVWtoWTZ2QlhFSEVsT05YeWRYTWFnSm9DRDUvcnNWd2NLdE1Dd3BJUEJkZEpjcG83S1BSY3VQeXd6YXBkZVFiMlpCeWwvOWwyTlErNW9RckNOWVZpRzlienVZMlhIL1RRVi9yelhmM0ZrTjBRTThNTi8vbFRnYXFvVzNQMG5nZFJnTEozREd1clRVclV4RlJ5d01nSmdTdThFWTRycCtLREpSaWhCREk4RkZYTmJWS3ZDUVgiLCJyZW5ld2Fsd2luZG93IjoxNTk2MTUwMDQ5LCJzZXJpYWxudW1iZXIiOjQyMTgyMjk4NjkxNTU3NzksImV4cGlyYXRpb24iOjE1OTcyNzMyNDksInNlcXVlbmNlbnVtYmVyIjoxODN9",
      "signature":"AQEAgQABASAi39xsFfU8TQG7IAxf8t1M7F9drcUKmbn8a48Wz7nodJUjsFA="}
  }
  {
      "payload":"eyJjaXBoZXJ0ZXh0IjoiSExoajJSQmExSDk5TFFYSjNrY1lNdEI3eFZRZGVHeU1tcTZjc3U2TG1xQnE1aWViekUyUUNhZi9YMEdLZW1JeldSdTk3MG9Jckh2TllabEh4YStjUVk4WDhqQThjOUZTN0FnaW1FMG5iZDVDTzdnbnRVcG00dy9ZVG9neVMyUFEwV29YR3ZIZXYxTlcwRWxUWCtMVDJRT1duZ0ZxblRFL05iU3pjVm8yTzhaMHdraTJRVTN4K0NlSmZSUVdETHIwN2RtWkFpa3NaaldqNmI0UE9ReGxJWW1MRklIV1NkdE11R2ttdlRKYmRyZ3k4Y2JQNjlSbkkrREVaMzRPWDlWUVpoVHRwY0g5WnBkNG1PcjB2SWNRbXNBYnFwc3dpTlZ0bm5ucS9wRnpZZ0k9Iiwic2hhMjU2IjoiQUE9PSIsImtleWlkIjoiTkZDRENILTAyLUYyRVhVODM5MkpXVTFMSzdFSlFUSFlNSzg3M0hVWF8xODMiLCJpdiI6IjFCcHduV1AzaXRtQlp2M1pobDhnOFE9PSJ9",
      "signature":"/TLnxl4cJ7ALbhLO+U0wauwU0UvT9pYSJFdZoDvl84s="
}

*/


function getWindowScrollTop() {
   var sc = window.pageYOffset || document.documentElement.scrollTop;
   updEventStore("scrollPosition",sc);
}

const INTERVAL = 50;

document.addEventListener("scroll", getWindowScrollTop);

const EventListenerMode = {capture: true};

function mouseup22Listener (e) {
  //restoreGlobalMouseEvents ();
  document.removeEventListener ('mouseup',   mouseupListener,   EventListenerMode);
  document.removeEventListener ('mousemove', mousemoveListener, EventListenerMode);
  e.stopPropagation ();
}

function updEventStoreAction (e) {
  if(e){
    //let _ev = getEventStore();
    //console.log(_g)
    //console.log(_ev)
    //let _g =  _ev[e.type] || [];
    let ff = {
      event:e.type,
      x:e.x,
      y:e.y,
      target:e.target
    }
    //_g.push(ff)  
    //console.log(_g)
    updEventStore(e.type,ff);
  }
}

function mouseupListener (e) {
  updEventStoreAction(e);
}

function mousemoveListener (e) {
  updEventStoreAction(e);
}

function mouseClicListener (e) {
  updEventStoreAction(e);
}


function captureMouseEvents (e) {
  //preventGlobalMouseEvents ();
  document.addEventListener ('mouseup',   mouseupListener,   EventListenerMode);
  document.addEventListener ('mousemove', mousemoveListener, EventListenerMode);
  document.addEventListener ('click', mouseClicListener, EventListenerMode);
  //e.preventDefault ();
  //e.stopPropagation ();
}


captureMouseEvents() 



export function sortObjectsByKey(obj,_key,order) {
  let _list = ObjectKeys(obj);
  let arrSrt = _list.sort(function(a, b) {
    let objA = obj[a];
    let objB = obj[b]          
    if(order==="desc"){
      if(objA[_key] < objB[_key]) { return -1; }
      if(objA[_key] > objB[_key]) { return 1; }
    }else{
      if(objA[_key] > objB[_key]) { return -1; }
      if(objA[_key] < objB[_key]) { return 1; }
    }
    return 0;
  })
  return arrSrt;
}






/*
setInterval(()=>{
  getWindowScrollTop();
}, INTERVAL);
*/




let bndw = {
  "320x180":628000,
  "480x270":928000,
  "640x360":1728000,
  "960x540":2281000,
  "1280x720":4404000,
  "1920x1080":8108000
}

let codecsByRESOLUTION = {
  "320x180":"avc1.4dc00d,mp4a.40.2",
  "480x270":"avc1.4dc015,mp4a.40.2",
  "640x360":"avc1.4dc01e,mp4a.40.2",
  "960x540":"avc1.4dc01f,mp4a.40.2",
  "1280x720":"avc1.4dc01f,mp4a.40.2",
  "1920x1080":"avc1.4dc032,mp4a.40.2"
}

