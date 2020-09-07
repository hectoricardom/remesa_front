import fetch from 'isomorphic-fetch';
import CryptoJS from 'crypto-js';



var maskClassName = {}
var maskClassFunction = {}



export function getTabs(outerWidth) {
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
  

// export const GLOBAL_WINDOW = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global.global === global && global) || this;



export function isJson(s) {
  var r =false;try{JSON.parse(s);r=true; }catch(e){r =false;}return r
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
}


export function translatetext(s){   
  var r = s;    
  let lng = 'en';

  // var lng = window && window.localStorage.getItem('lng') || 'en';
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
  var lng = window.localStorage.getItem('lng') || 'en';
  if(languageL_TXT[s]){
    r = languageL_TXT[s][lng];
  }  
  return r;
}








  
  
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
                  if(vld==='email' && validate[fld][vld]){
                      let _v = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(_value);
                      if(!_v){
                          rs = {fld:fld, valid:_v,msg:'email invalid'};   
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


