import fetch from 'isomorphic-fetch';
import loadScript from 'load-script';
import CryptoJS from 'crypto-js';


// npm install isomorphic-fetch load-script crypto-js redux react-redux react-router-dom redux-thunk


var vttt = `





`


if(!window.CryptoJS){
    window.CryptoJS = CryptoJS;
}



var _hls = null;

 

export function getCurrentHls() {
    return _hls;
}

export function setCurrentHls(h) {
    _hls = h;
    return _hls;
}

export function gethhhhhhh() {

    var mv25 = {};

var f2A = {};
    var _bdy = vttt.replace(/(\r\n|\n|\r)/gm,"");            
    _bdy.split('{"2":180,"4":0,"7":{"1":3,"3":').map((d2,inLK)=>{   
        var d3 = d2.split('{},{},{}')[0];
        /*var js2 = '{"2":180,"4":0,"7":{"1":3,"3":'+d;
        console.log(js2)
        if(isJson(js2)){
            console.log(JSON.parse(js2));
        }*/
        var obj = {};
        obj['_index'] = parseInt(d3.split('.0},"8":')[0]);
        var yy = d3.split('"3":[null,2,"')[1];
        if(yy && yy.indexOf('"],"6":0},')>=0){
            obj['_name'] = yy.split('"],"6":0},')[0];
            var g_name = yy.split('"],"6":0},')[1].trim();
            obj['_codes'] = {};
            g_name.split('{"2":3,"3":{"1":3,"3":').map((m23,i23)=>{                
                if(!obj['_codes']['m23']){
                    obj['_codes']['m23']=[]
                } 
                if(i23>0){
                    //obj['_codes']['m23'][parseInt(m23.split('},')[0])]=SumDays(parseInt(m23.split('},')[0]));
                    obj['_codes']['m23'].push(SumDays(parseInt(m23.split('},')[0])))
                }                
            })
            g_name.split('{"25":').map((m25,i25)=>{
                if(!obj['_codes']['m25']){
                    obj['_codes']['m25']=[];
                }
                if(i25>0){
                    if(!mv25[parseInt(m25.split('},')[0])]){
                        mv25[parseInt(m25.split('},')[0])]=true
                    }
                    //obj['_codes']['m25'][parseInt(m25.split('},')[0])]=true;
                    obj['_codes']['m25'].push(parseInt(m25.split('},')[0]));
                }               
            })
            console.log(obj);
        }

        console.log(mv25);
       // 

      /* 
      if(yy){            
            var index = parseInt(yy.split(',')[0].trim());
            var name = d.split(',,,')[1].split(',,,')[0].trim(); 
            var priority_date = (new Date(d.split(',,,')[2].split(',,,')[0].trim())).getTime();
            var completed_date = (new Date(d.split(',,,')[3].split(',,,')[0].trim())).getTime();
            var obj = {};  
            obj['index']=index;
            obj['name']=name; 
            obj['priority_date']=priority_date; 
            obj['completed_date']=completed_date;   
            f2A[index] = obj; 
        }   */           
    });
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(f2A)], {type:  'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'f2A.json';
    //a.click();
   // console.log(f2A)
   //console.log(SumDays(42646));
}





const fingerprint_GLOBAL = 'Fingerprint2'
const firebaseUrl = `https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/1.8.0/fingerprint2.min.js`


export function getFingerPrint() {
    return new Promise((resolve, reject) => {        
        getSDK(firebaseUrl, fingerprint_GLOBAL).then(fp => {
            fp().get(function(result, components) { 
                resolve(result);
            })    
        }) 
    })      
};




const HLS_GLOBAL = 'Hls'
//const hlsUrl = `https://cdn.jsdelivr.net/hls.js/latest/hls.min.js`
const hlsUrl = `http://localhost:7070/getStatic/hls.js`

export function getHlsSDK() {
    var s = document.createElement('script');
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
    
};





var animatinClass ='';
var _root =null,_rootC = null, dark = false, scroll = 0,totalHeight=0;
export function addScroll2(s) { 
   // document.addEventListener('scroll',scrollEvent);
}

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
  


export function bodyOverflow(b){
    var bdy  = document.getElementsByTagName('body')[0];
    if(b){      
      bdy.style.overflowY = `hidden`;
      bdy.style.width = `calc( 100% - 16px)`;
    }else{
      bdy.style.overflowY = `scroll`;
      bdy.style.width = `100%`; 
    }    
}

  var keys = {33:1, 34:1, 35:1, 36:1,  38: 1, 40: 1};

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
   
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
}
  
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

export function genId() {
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 16;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
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
  


  



export function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }
  
export function enableScroll() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;  
  }















/*




export function scroll2(s) {   
    _rootC = !_rootC?document.getElementById('content_body'):_rootC;   
    animatinClass = `.52s`;
    setTimeout(()=>{
        _rootC.style.transform = `translate3d(0px,-${s}px,0)`;
        _rootC.style['transition-duration'] = animatinClass;   
        window.scrollTo(0,s);     
        setTimeout(()=>{
            animatinClass = `.12s`;
        },500)       
    },5)
}



export function UpdateTotalHeight(th) {
    _rootC = !_rootC?document.getElementById('content_body'):_rootC;
    if(th){
        totalHeight=th/2;
        _rootC.style['max-height'] = totalHeight+'px'; 
    }
}


export function scrollEvent(t) {    
    _rootC = !_rootC?document.getElementById('content_body'):_rootC;        
    totalHeight<=100 && calc_TotalHeight();    
    totalHeight = totalHeight!==t?totalHeight=t:totalHeight;    
    scroll  =  window.pageYOffset || document.documentElement.scrollTop;    
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    if(_rootC && totalHeight>scroll*2+windowHeight){
        _rootC.style['transition-duration'] = animatinClass;     
        _rootC.style.transform = `translate3d(0px,-${scroll}px,0)`;
    }
}



function calc_TotalHeight() {
    var sumH=0;
    var section_list = document.querySelectorAll('[section-index]');
    for(var i =0;i<section_list.length;i++){
        var hh = section_list[i];        
        sumH+=hh.getBoundingClientRect().height;                  
    }
    totalHeight=sumH/2;
    if(!_rootC){
        _rootC = document.getElementById('content_body');
    }else{
        _rootC.style['max-height'] = totalHeight+'px'; 
    }
}




 .paleteC{
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
}



export function changetheme(s){
    var  light_style = `
    --dropDown--background--color:#ffffff;
    --footer--text-color--: #c4c4c4 ;
    --background--color--cards: #fafafa;
    --slide__card--p-color--:#6e6e6e;
    --slide__card--title-color--:#5e5e5e;
    --tip__card--p-color--:#777;
    --color-logo_:#333;
    --color-base--hover:#e91e63;
    --background--color: #f5f5f5;
    --colorText_: #263238;
    --icon--color_: #b0bec5;
    --tip__card--backgropund-Color--:#fff;
    --tab--nav-Color--:#5f6368;    
    --tab--nav-icon-color--:#c7c7c7;
    --fill--theme--color:#666;`;

    var  dark_style = `
    --dropDown--background--color: #263238;
    --footer--text-color--:#3a3a3a ;
    --background--color--cards: #263238;
    --slide__card--p-color--:#aaaaaa;
    --slide__card--title-color--:#e5e5e5;
    --tip__card--p-color--:#aaaaaa;
    --color-logo_:#fff;
    --color-base--hover:#e91e63;
    --background--color: #000;
    --colorText_: #e5e5e5;
    --icon--color_: #b0bec5;
    --tip__card--backgropund-Color--:#444;
    --tab--nav-Color--:#aaaaaa;
    --tab--nav-icon-color--:#aaaaaa;
    --fill--theme--color:#f5f5f5;`;
     var bdy = document.getElementsByTagName('body')[0];
       
    if(s){
        bdy.style = light_style;        
    }
    else{
        dark = !dark;
        dark?bdy.style = dark_style:bdy.style = light_style;
        
    }          
}
*/  

export const getClassCode = id => {
    var cClss = Base64.encode(id).toString()
    var h = new RegExp('=','g')
    cClss=cClss.replace(h,'');
    return cClss;    
};



String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


export function isJson(s) {
    var r =false;try{JSON.parse(s);r=true; }catch(e){r =false;}return r
}
  
  
export function list2Array(a) {
    var r = [];
    for(let x=0;x<a.length;x++){
        r.push(a[x]);
    }
    return r;
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
 
  export const parseQuery =(url) =>{
    var urlParams = new URLSearchParams(url);
    var  obj = {};
    var entries = urlParams.entries();
    for(var pair of entries) { 
        obj[pair[0]]= pair[1]; 
    }    
    return obj
  } 


  
  export function isLandscape() {
    return (window.orientation === 90 || window.orientation === -90);
  }
  
  export function isPortrait() {
    return window.innerHeight > window.innerWidth;
  }



export const fetchGet = async graphQLUrl => {
    const res = await fetch(graphQLUrl, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `HRMsgsdgsdgsdgsdgr2341241hgf`
      }     
    });
    const resJSON = await res.json();
    const {errors} = resJSON;
    return {data:resJSON, error: errors};
};

  
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




export function gen12CodeId() {
    var ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz';
    var ID_LENGTH = 12;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }
  

let tempTk = `VTJGc2RHVmtYMTg1Q3RUWW56UmtvNkFBbFlMZ1h4WHFFQ25CWExmVlFFUXd6VURpR2wxRUpIUXJWS1RpajlhZA@@`;

export function getAuth(){
    var h = new RegExp('@','g')   
  
    var _tkn = window.localStorage.getItem('jwt_hrm_fincance')?window.localStorage.getItem('jwt_hrm_fincance'):tempTk;
    var authToken = _tkn.replace(h,'=');       
    /*
     var _parseCokies = parseCokies(document.cookie);
    if(_parseCokies && _parseCokies['jwt_hrm_fincance']){
        authToken =_parseCokies['jwt_hrm_fincance'].replace(h,'=');
    }
    */
    return authToken
  }


export const  fetchGraphQL = async (url,graphParams) => {
    const serializedParams = prepareGraphQLParams(graphParams);     
    var fp = gen12CodeId() || window.localStorage.getItem('fpXb');
    var tempK = genId();
  
    // console.log(graphParams) 
    
    var encRypt = CryptoJS.AES.encrypt(serializedParams, tempK).toString()
    var encRyptK = CryptoJS.AES.encrypt(tempK, fp).toString()
  
    var bsParams = JSON.stringify({q:Base64.encode(encRypt),k:Base64.encode(encRyptK)});
   
  
    var authToken = getAuth();
    var fbtkClnt = window.localStorage.getItem('fbtkClnt');
    const graphQLUrl = `${url}`;
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
    const resJSON = await res.text();    
    var _Data = {};
    var basD = Base64.decode(resJSON);  
    if(isJson(basD)){        
        var basdJson = JSON.parse(basD)
        if(basdJson.status===200){            
            var kb = CryptoJS.AES.decrypt(basdJson.k, fp).toString(CryptoJS.enc.Utf8);
            var decdData = CryptoJS.AES.decrypt(basdJson.r, kb).toString(CryptoJS.enc.Utf8);
            if(isJson(decdData)){
                _Data = JSON.parse(decdData);
            }
        }if(basdJson.status===500){
            
        }
    }     
    const {data, errors} = _Data;
    //console.log(data)
    return {data, error: getClientError(errors)};
  };
  




export const DecryptAES = (text,key) => {    
    var bytes = CryptoJS.AES.decrypt(text, key);
    var basD = bytes.toString(CryptoJS.enc.Utf8);    
    return basD;
};


export const fetchPostUrlC = async (url,graphParams) => {
    const serializedParams = prepareBodyParams(graphParams);
    var fp = window.localStorage.getItem('fpXb');     
    var encRypt = CryptoJS.AES.encrypt(serializedParams, fp).toString()
    var bsParams = JSON.stringify({q:Base64.encode(encRypt)});   
    var authToken = window.localStorage.getItem('jwt');    
    const graphQLUrl = `${url}/apivh2`;
    const res = await fetch(graphQLUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}:${fp}`,
      },
      body: bsParams
    });
    const resJSON = await res.text();    
    var _Data = {};
    var bytes = CryptoJS.AES.decrypt(Base64.decode(resJSON), fp);
    var basD = bytes.toString(CryptoJS.enc.Utf8);
    if(basD && isJson(basD)){
        _Data = JSON.parse(basD);
    }     
    const {data, errors} = _Data;
    return {data, error: getClientError(errors)};
};


export const UniqueArray = (c) => {
    var a = JSON.stringify(c);
    a = JSON.parse(a);
    var t = [],tobj = {};
    for(var i=0;i<a.length;i++){
        if(!tobj[a[i].id]){            
            t.push(a[i]);
            tobj[a[i].id]=true
        }
    }
    return t;
}



export function convertArray2Obj(arr1) {
     var obj ={};
    if(arr1.length>0){
        arr1.map(s=>{
            obj[s.id]=s;
        })
    }else{
        obj = null
    }
   return obj;
}

export function convertObj2Array(obj) {
    var arr = [];
    ObjectKeys(obj).map(o=>{
        arr.push(obj[o]);
    })    
   return arr;
}




export const getBrowserUserAgent = ()=>{
    var br = navigator.userAgent;
    var User = {
        platform:null,     
        Mozilla:null,
        AppleWebKit:null,
        Chrome:null,
        Safari:null,
        IsMobile:false  
    }  
    br = br.toString().replace('(KHTML, like Gecko)','');
    var stream_start = br.indexOf('(') + 1, stream_end = br.lastIndexOf(')');
    var _plattForm = br.slice(stream_start, stream_end).trim();
    User.platform = {arch:_plattForm.split(';')[0],os:_plattForm.split(';')[1],build:_plattForm.split(';')[2]};  
    br = br.toString().replace('('+_plattForm+')','').split(' ');
    br.map(att =>{
        if(att.indexOf('Mozilla/')>=0){
            User.Mozilla = att.split('Mozilla/')[1];
        }
        else if(att.indexOf('AppleWebKit/')>=0){
            User.AppleWebKit = att.split('AppleWebKit/')[1];
        }
        else if(att.indexOf('Chrome/')>=0){
            User.Chrome = att.split('Chrome/')[1];
        }
        else if(att.indexOf('Safari/')>=0){
            User.Safari = att.split('Safari/')[1];
        }
        else if(att.indexOf('Mobile')>=0){
            User.IsMobile = true;
        }
    })
    return User;
  }

  export const fetchGetUrl = async v => {
    var authToken = window.localStorage.getItem('jwt');
    var fp = window.localStorage.getItem('fpXb'); 
    const res = await fetch(v, {
      method: 'get',     
      headers: {
        //'Content-Type': 'text/plain',
        'mode': 'no-cors',
        'Content-Type': 'application/json',
        'Authorization': `${authToken}:${fp}`,
      },     
    });
    const resJSON = await res.json();    
    return resJSON;
  };
  

  export const fetchPostUrl = async v => {
    var authToken = window.localStorage.getItem('jwt');
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
  

export const monthsList_Short =[``,`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];


export const _dayShortNames = {"en":['S','M','T','W','T','F','S'],"es":['D','L','M','M','J','V','S']}
export const _monthNames = {"en":['','January','February','March','April','May','June','July','August','September','October','November','December'],"es":['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']}
export const _dayLargeNames = {"en":["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"],"es":["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes", "Sabado"]} ;

export function parseDate(d) {
    var lng = localStorage.getItem('lng');
    d = Number(d);     
    var tp =  new Date(d);
    return `${_monthNames[lng][tp.getMonth()+1]} ${tp.getDate()}, ${tp.getFullYear()}`;
}

export function parseFullDate(d) {
    var lng = localStorage.getItem('lng');
    d = Number(d);     
    var tp =  new Date(d);
    return `${tp.getDate()} de ${_monthNames[lng][tp.getMonth()+1]} del ${tp.getFullYear()}`;
}


export function parseDateShort(d) {
    d = Number(d);     
    var tp =  new Date(d);
    return `${monthsList_Short[tp.getMonth()+1]} ${tp.getDate()}`;
}

export function parseDay(d) {
    d = Number(d);     
    var tp =  new Date(d);
    return `${tp.getDate()}`;
}

export function parseMonthShort(d) {
    d = Number(d);     
    var tp =  new Date(d);
    return `${monthsList_Short[tp.getMonth()+1]}`;
}

export function sumArraybyKey(a,k) {
    var sumK = 0;
    a.map(d=>{
        sumK += d[k];
    })
    return sumK.toFixed(2);
}




export function getJson2P(p){
    return JSON.parse(p);
}

export function ObjectKeys(p) {    
    var r =[];
    try{
       r= Object.keys(p);       
    }
    catch(e){
        for (var k in p) {
           r.push(k);
        }
    }
    return r
  }

export function febMaxDays(year){
    if ( (year%100!==0)){
        if((year%4===0) || (year%400===0)){
            return 29;
        }else{
            return 28;
        }
    }else{
      return 28;
    }
  }

export function NextMonth(month){
    if (month>8){
      return `${month}`;
    }else{
      return `0${month}`;
    }
  }
  

export function MaxDayperMotnh(yyyy,mm){
    if(!yyyy || !mm){
        return null
    }
    var y = parseInt(yyyy.toString()),m= parseInt(mm.toString())
    var _dayPerMonth = [0,31,febMaxDays(y),31,30,31,30,31,31,30,31,30,31]
    return _dayPerMonth[m];
}

  
export function isInteger(f) {
    return typeof(f)==="number" && f%1===0;
}

export function isFloat(f) {
   return typeof(f)==="number" && f%1!==0;
}

export const extList = {
    webp:`image/webp`,
    jpg:`image/jpg`,
    png:`image/png`,
    gif:`image/gif`,
    ts:`video/MP2T`,
    m3u8:`application/x-mpegURL`,
    mp4:`video/MP4`,
    m4s:`text/plain`,
    js:`application/javascript; charset=UTF-8`,
    css:'text/css; charset=utf-8',
    mpd:`application/dash+xml`,
    svg:`image/svg+xml`,
    html:`text/html; charset=UTF-8`
} 

export function isEmail(value){
    const re = /.+@.+/;
    var rs = false;    
    if (re.test(value)) {
        rs = true
    }
    return rs;
}

export function isDate(yyyy,mm,dd){
    var rs = false;
    if(isInteger(yyyy) && isInteger(mm) && isInteger(dd)){
        if(mm<10){ mm='0'+mm}
        if(dd<10){ dd='0'+dd}
        var dtMMDD = `${mm}/${dd}/${yyyy}`;  
        const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2|3)\d{1})\/((19|20)\d{2})/g;        
        if (validDateMMDDYYYY.test(dtMMDD)) {  
            rs = true
        }
        else{
            rs = false
        }
    }    
    return rs;
}

export function formatDate(yyyy,mm,dd){    
    var rs = null;
    if(isInteger(yyyy) && isInteger(mm) && isInteger(dd)){
        if(mm<10){ mm='0'+mm}
        if(dd<10){ dd='0'+dd}
        var dtMMDD = `${mm}/${dd}/${yyyy}`;  
        const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2|3)\d{1})\/((19|20)\d{2})/g;        
        if (validDateMMDDYYYY.test(dtMMDD)) {  
            rs = dtMMDD
        }
        else{
            rs = null
        }
    }    
    return rs;
}

export function formatSDate(s){
    var rs = null;
    var yyyy=s.split('/')[2],mm=s.split('/')[0],dd=s.split('/')[1];
    if(isInteger(yyyy) && isInteger(mm) && isInteger(dd)){
        if(mm<10){ mm='0'+mm}
        if(dd<10){ dd='0'+dd}
        //var dtDDMM = `${dd}/${mm}/${yyyy}`; const validDateDDMMYYYY = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g
        var dtMMDD = `${mm}/${dd}/${yyyy}`;  
        const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2|3)\d{1})\/((19|20)\d{2})/g;        
        if (validDateMMDDYYYY.test(dtMMDD)) {  
            rs = dtMMDD
        }
        else{
            rs = null
        }
    }    
    return rs;
}


export function ValidateForm(fmr,fv){
    var rs = {valid:false,fld:''};
    if(fmr){
        rs = {valid:true,fld:''};        
        ObjectKeys(fmr).map(fl=>{
            var params = fv[fl];
            var isValid = ValidateField(fmr[fl],params);        
            if(!isValid.valid){
                rs = isValid;
                return rs;
            }
        })
    }        
    return rs;
}

export function isNumeric(num){
    return !isNaN(num)
}

export function ValidateField(value,params){
    var rs = {valid:true,msg:''};    
    ObjectKeys(params).map(pr=>{   
        if(pr==='required'){
            if(value.length===0){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        } 
        if(pr==='number'){            
            if(isNaN(value)){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }    
        if(pr==='minLenght'){
            if(value.length<params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        if(pr==='minValue'){
            if(value<=params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        if(pr==='maxLenght'){
            if(value.length>params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        if(pr==='maxValue'){
            if(value>=params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        
    })
    return rs;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
     date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  

  Date.prototype.getWeekYear = function() {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    return date.getFullYear();
  }


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


  var month= 6,
  _dayPerMonth = [0,31,febMaxDays((new Date()).getFullYear()),31,30,31,30,31,31,30,31,30,31],
  _counter = 1;
  

 export function printYear(y){
    var _allYear2Render={};
    [1,2,3,4,5,6,7,8,9,10,11,12].map(m=>{
      var mnt = printMonth(m,y);
      _allYear2Render[m]=mnt;
    })
    return _allYear2Render;
  }


  export function printMonth(m,year){
    const month_ =   m || month;
    const dateNow = new Date();
    const _day = dateNow.getDate();
    const _month = dateNow.getMonth();
    const _year = dateNow.getFullYear();    
    const _nextDateString = `${NextMonth(month_)}/01/${year}`; 
    const _nextDate = new Date(_nextDateString);    
    const _numOfDays = _dayPerMonth[month_];
    _counter=1;
    var _week= 0;
    var _weekdays= _nextDate.getDay();
    var _weekdays2 = _weekdays;
    var _MonthDataToRender=[];
    _MonthDataToRender.push([]);
    while (_weekdays>0){      
      _weekdays--;
      _MonthDataToRender[_week].push({d:null,cls:"monthPre"})
   } 
   while (_counter <= _numOfDays){   
      if (_weekdays2 > 6){
        _weekdays2 = 0;
        _week++;
        _MonthDataToRender.push([]);         
      } 
       
      if (_counter === _day && _month+1 === month_  && year === _year){
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays dayNow"})
      }

      else if(_weekdays2 ===0){
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays isWeekEnd"})
      } 
      else if(_weekdays2 ===6){
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays isWeekEnd"})
      } 
      else{    
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays"})
      }      
      _weekdays2+=1;
      _counter+=1;  
   }  
   return _MonthDataToRender;
  }





  export function printYearWeekly(year){
    var month =   1;   
    var  _nextDateString = `${NextMonth(month)}/01/${year}`; 
    var _nextDate = new Date(_nextDateString);    
    var _numOfDays = _dayPerMonth[month];
    const _numOfYear = 337+  febMaxDays(year);    
        _counter=1;
        var _counterDay = 1;
        var _week= 0;
        var _weekdays= _nextDate.getDay();
        var _weekdays2 = _weekdays;
        var _MonthDataToRender={};        
        while (_counter <= _numOfYear){ 
                    
            if (_weekdays2 > 6){
                _weekdays2 = 0;
                _week++;
                if(!_MonthDataToRender[_week]){
                    _MonthDataToRender[_week] = {}                    
                }
            }            
            if(_weekdays2 ===0){
                if(!_MonthDataToRender[_week]){
                    _MonthDataToRender[_week] = {}                    
                }
                _MonthDataToRender[_week]['start'] = {}
                _MonthDataToRender[_week]['start']['day'] =_counterDay;
                _MonthDataToRender[_week]['start']['class'] ="monthDays isWeekEnd";
                _MonthDataToRender[_week]['start']['month'] = month;
            } 
            else if(_weekdays2 ===6){
                if(!_MonthDataToRender[_week]){
                    _MonthDataToRender[_week] = {}                    
                }
                _MonthDataToRender[_week]['end'] = {}
                _MonthDataToRender[_week]['end']['day'] =_counterDay;
                _MonthDataToRender[_week]['end']['class'] ="monthDays isWeekEnd";
                _MonthDataToRender[_week]['end']['month'] = month;
            }                 
            
            _weekdays2+=1;
            _counter+=1;
            if(_counterDay>=_numOfDays){
                _counterDay =1;
                month += 1;  
                _numOfDays = _dayPerMonth[month];
            }else{
                _counterDay +=1; 
            } 
            
        }
   return _MonthDataToRender;
  }


  export function getDayofyear(d){
    var now = new Date();
    if(d){
        now = new Date(d);
    }
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }



  export function hiddeEmail(d){
    var email = '';
      if(d && d.indexOf('@')>3){
        var h = d.split('@')[0];
        var domain = d.split('@')[1];
        var ast2Hdd = h.length;    
        email = h.substring(0, 3);
        for(var i = 1;i< ast2Hdd-3;i++){
            email += `•`;
        }
        email += h.substring(ast2Hdd-1, ast2Hdd);    
        email += '@'+domain;
      }
    
    return email;
  }


export function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}




export function emailValidate(v){
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
}

export function ssnValidate(v){
    return /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(v)
}

export function phoneValidate(v){
    return /^[\dX]{3}-?[\dX]{3}-?[\dX]{4}$/.test(v)
}

export function dobValidate(v){
    return /^(\d{2})(\/)(\d{2})(\/)(\d{4})$/.test(v)
}

export function urlValidate(v){
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(v)
}





export async function getAddress(q){
    q = q.split('%20').map((e)=>{return e.capitalize()}).join('%20');
    var api = `https://www.google.com/s?tbm=map&gs_ri=maps&suggest=p&authuser=0&hl=es&gl=us&pb=!2i4!4m9!1m3!1d14928.327758595553!2d-85.77029233022462!3d38.10847554999999!2m0!3m2!1i1059!2i913!4f13.1!7i20!10b1!12m6!2m3!5m1!6e2!20e3!10b1!16b1!19m4!2m3!1i360!2i120!4i8!20m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i200!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!2b1!4b1!9b0!22m3!1sl6hwXOW6E8uSjwSvgLeYBQ!3b1!7e81!23m2!4b1!10b1!24m26!2b1!5m5!2b1!3b1!5b1!6b1!7b1!10m1!8e3!14m1!3b1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!30m1!2b1!36b1!43b1!52b1!55b1!56m1!1b1!26m4!2m3!1i80!2i92!4i8!34m1!3b1!37m1!1e81!47m0!49m1!3b1&pf=t&tch=1&q=${q}`     
    const res = await fetch(api, {
        method: 'get',
        headers: {
        }     
      });
      const resJSON = await res.text();
      return parseAddress(resJSON);          
}

function parseAddress(body){
    var a = { }
    body = body.replace(/\\/g, '')            
    var _null = new RegExp('null','g');            
    body = body.replace(_null, "");        
    body.split('","e":"')[0].split(']n,,,,[,,').map(s=>{
        s = s.replace(/\//g, "")                                
        var xtr = s;
        var dd = xtr && xtr.indexOf('","') >= 0 ? xtr.split('","')[1] && xtr.split('","')[1].split('",,[,,')[0] : xtr && xtr.indexOf(']n,,,["') >= 0?xtr.split(']n,,,["')[1].split('"]n,,,,,,')[0]:'';
        var position = xtr && xtr.indexOf(']n,,[["') >= 0 ? xtr.split(']n,,[["')[0]: xtr && xtr.indexOf(']n,,,["') >= 0 ? xtr.split(']n,,,["')[0]:'';   
        var addr = dd && dd.split(',');
        var address = addr && addr[0];
        var city = addr && addr[1];
        var state = addr && addr[2];                        
        if(state && !a[dd]){
            var tt = {address:address,city:city,state:state,position:position}                    
            a[dd] = tt;
        }                
    })
    return a; 
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



function SumDays(days) {
    var day0 = -2209143600000 || '12/30/1899';
    var result = new Date(day0);
    result.setDate(result.getDate() + days);
    return result;
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




export const cleanbase64 = id => {
    var cClss = id;
    var h = new RegExp('=','g')
    cClss=cClss.replace(h,'');
    return cClss;
    
};



export function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  