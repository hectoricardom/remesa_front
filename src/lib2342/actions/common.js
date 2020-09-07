import * as _Util from '../store/Util'

import {loadMediadata,  SrtCachingFile} from '../component/lib/common'




let _getState = null;
let _Distpatch;
let _State_outerWidth;



var uploadConatiner = {}



export function getUploadConatiner(){  
  return uploadConatiner;
}


export function clearUploadConatiner(h){  
  uploadConatiner = h;
  _Distpatch({
    type: 'UPD_KEY_VALUE',
      kv:{key:'UploadObsoreve',value:_Util.gen12CodeId()}
  })    
}


export function UpdateRdx(dispatch, state){    
  if(!_Distpatch){
    _Distpatch = dispatch;
  }
  if(!_getState){
    _getState = state;
  }
  _Distpatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'rdxOK',value:true}
  })  
}



//window.addEventListener("resize",()=>resizeWd())

setInterval(()=>resizeWd(),125);

const resizeWd = (e) => {
 
  if(_Distpatch){
    let wdW = window.outerWidth;
    // let _state = _Util.getStore();
  
    let state = _Util.getStore();    
    if(state["outerWidth"]!==wdW){
      _Util.updStore('outerWidth',wdW);
      _Util.updPlayerStore('outerWidth',wdW);
      _Distpatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
      _Distpatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observePlayer',value:_Util.gen12CodeId()}
      })
    }
  }
}



let componentStore = {};
export const updComponentStore =  (k,v) => {
  componentStore[k] = v;
}

export const getComponentStore =  () => {
  return componentStore;
}




export const OpenSlideOption = (dispatch, data) => {
  if(!_Distpatch){
    _Distpatch = dispatch;
  }
  let list = getComponentStore()["listSlideOption"] || {};
  let Id = _Util.gen12CodeId();
  if(data['Id']){
    Id = data['Id']
  }
  if(!list[Id]){
    list[Id]={};
  }
  list[Id]['visible']=true;
  let _dataProps = {}
  if(!data['props']){
    _dataProps['modalID'] = Id
  }else{
    _dataProps = data['props'];
    _dataProps['modalID'] = Id;
  }
  if(data['zIndex']){
    list[Id]['zIndex']=data['zIndex']
  }
  if(data['height']){
    list[Id]['height']=data['height']
  }
  if(data['width']){
    list[Id]['width']=data['width']
  }  
  if(data['content']){
    list[Id]['content']=data['content']
  }
  _dataProps['text'] = data.text
  list[Id]['data']=_dataProps;      
  updComponentStore('listSlideOption',list);
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observeComponent',value:_Util.gen12CodeId()}
  })

  setTimeout(()=>{
    list[Id]['display']=true;
    updComponentStore('listSlideOption',list);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeComponent',value:_Util.gen12CodeId()}
    })
  },25)
  
}



export const CloseSlideOption = (dispatch, data) => {  
  if(!_Distpatch){
    _Distpatch = dispatch;
  }    
  
  let list = getComponentStore()["listSlideOption"] || {};
  let Id = data['id']; 
  if(list && list[Id]){
    list[Id]['display']=false;  
    updComponentStore('listSlideOption',list);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeComponent',value:_Util.gen12CodeId()}
    })
    setTimeout(()=>{
      delete list[Id];      
      updComponentStore('listSlideOption',list);
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeComponent',value:_Util.gen12CodeId()}
      })
    },275)
  }
}










export const OpenToast = (dispatch, data) => {
  if(!_Distpatch){
    _Distpatch = dispatch;
  }
  
  let list = getComponentStore()["listToat"] || {};
  let Id = _Util.gen12CodeId();
  if(data['Id']){
    Id = data['Id']
  }
  if(!list[Id]){
    list[Id]={};
  }
  list[Id]['visible']=true;
  let _dataProps = {}
  if(!data['props']){
    _dataProps['modalID'] = Id
  }else{
    _dataProps = data['props'];
    _dataProps['modalID'] = Id;
  }
  _dataProps['text'] = data.text
  list[Id]['data']=_dataProps; 
  list[Id]['display']=true;    
  updComponentStore('listToat',list);
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observeComponent',value:_Util.gen12CodeId()}
  })

  setTimeout(()=>{    
    CloseToast(dispatch, {id:Id})
  },3000)

}



export const CloseToast = (dispatch, data) => {  
  if(!_Distpatch){
    _Distpatch = dispatch;
  }    
  
  let list = getComponentStore()["listToat"] || {};
  let Id = data['id']; 
  if(list && list[Id]){
    list[Id]['display']=false;  
    updComponentStore('listToat',list);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeComponent',value:_Util.gen12CodeId()}
    })
    setTimeout(()=>{
      delete list[Id];      
      updComponentStore('listToat',list);
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeComponent',value:_Util.gen12CodeId()}
      })
    },275)
  }
}








const OpenModal = (dispatch, data) => {

  
  if(!_Distpatch){
    _Distpatch = dispatch;
  }
  let list = getComponentStore()["listDialog"] || {};
  let Id = _Util.gen12CodeId();
  if(!list[Id]){
    list[Id]={};
  }
  list[Id]['visible']=true;
  let _dataProps = {}
  if(!data['props']){
    _dataProps['modalID'] = Id
  }else{
    _dataProps = data['props'];
    _dataProps['modalID'] = Id;
  }       
  list[Id]['observeResize'] = data['observeResize'];
  if(list[Id]['observeResize']){
    list[Id]['observeInterval'] = setInterval(()=>{     
      let cmp = document.querySelector(`[dialog-key-id='${Id}']`);
      let dmz = cmp && cmp.getBoundingClientRect(); 
      if(dmz){      
        if(dmz.width!== list[Id]['width'] || dmz.height!== list[Id]['height']){
          list[Id]['height']=dmz.height;   
          list[Id]['width']=dmz.width;          
          updComponentStore('listDialog',list);
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'observeComponent',value:_Util.gen12CodeId()}
          })
        }
      }
    },200)
  }
  setTimeout(()=>{     
    list[Id]['display']=true;
    if(data['zIndex']){
      list[Id]['zIndex']=data['zIndex']
    }
    if(data['height']){
      list[Id]['height']=data['height']
    }
    if(data['width']){
      list[Id]['width']=data['width']
    }  
    if(data['content']){
      list[Id]['content']=data['content']
    }
    list[Id]['data']=_dataProps;
    updComponentStore('listDialog',list);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeComponent',value:_Util.gen12CodeId()}
    })
  },175)
  updComponentStore('listDialog',list);
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observeComponent',value:_Util.gen12CodeId()}
  })

}



const CloseModal = (dispatch, data) => {
  
if(!_Distpatch){
  _Distpatch = dispatch;
}
let list = getComponentStore()["listDialog"] || {};
let Id = data['id'];
if(list[Id]){
  list[Id]['display']=false;
  if(list[Id]['observeResize']){
    if(list[Id]['observeInterval']){
      clearInterval(list[Id]['observeInterval'])
    }
  }
  setTimeout(()=>{
    delete list[Id];
    updComponentStore('listDialog',list);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeComponent',value:_Util.gen12CodeId()}
    })
  },275)
  updComponentStore('listDialog',list);
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observeComponent',value:_Util.gen12CodeId()}
  })
}
}







export const OpenWatchDialog = (dispatch, data) => {
  if(!_Distpatch){
    _Distpatch = dispatch;
  }
  
  let list = getComponentStore()["listWathDialog"] || {}; 
  list =  {};
  let Id = _Util.gen12CodeId();
  if(data['Id']){
    Id = data['Id']
  }
  if(!list[Id]){
    list[Id]={};
  }
  list[Id]['visible']=true;
  list[Id]['action']="showing";
  let _dataProps = {}
  if(!data['props']){
    _dataProps['modalID'] = Id
  }else{
    _dataProps = data['props'];
    _dataProps['modalID'] = Id;
  }
  _dataProps['text'] = data.text
  list[Id]['data']=_dataProps; 
  //list[Id]['isTitleDetail']=true;
  updComponentStore('listWathDialog',list);
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observeComponent',value:_Util.gen12CodeId()}
  })

  setTimeout(()=>{ 
    if(list && list[Id]){
      list[Id]['display']=true;
      
    }   
    updComponentStore('listWathDialog',list);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeComponent',value:_Util.gen12CodeId()}
    })
    setTimeout(()=>{           
      if(list && list[Id]){
        list[Id]['loaded']=true;
      }
      updComponentStore('listWathDialog',list);
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeComponent',value:_Util.gen12CodeId()}
      })
     },60)
   },20)
  
   


}



export const CloseWatchDialog = (dispatch, data) => {  
  if(!_Distpatch){
    _Distpatch = dispatch;
  }    
  
  let list = getComponentStore()["listWathDialog"] || {};
  let Id = data['id']; 
  if(list && list[Id]){
    list[Id]['display']=false;  
    
    updComponentStore('listWathDialog',list);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeComponent',value:_Util.gen12CodeId()}
    })    
    setTimeout(()=>{ 
      if(list && list[Id]){
        list[Id]['loaded']=false;  
        list[Id]['action']="closing";
        list[Id]['display']=false; 
        list[Id]['isTitleDetailInit']=false;
        list[Id]['isTitleDetail']=false;
        
        updComponentStore('listWathDialog',list);
        dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:'observeComponent',value:_Util.gen12CodeId()}
        })
      }
      setTimeout(()=>{ 
        if(list && list[Id]){
          //delete list[Id];  
          list[Id]['visible']=false;   
          updComponentStore('listWathDialog',list);
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'observeComponent',value:_Util.gen12CodeId()}
          })
        }
       },30)
     },20)
  }
}










 export function VideoFileUpload(url,parmas, file){    
  
    let formData = new FormData(),
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    //for (let i = 0; i < files.length; i++) {}
    formData.append("file", file, file.name);


    
    let videosUpload = uploadConatiner["videosUpload"] || {};

    if(file.type==="video/mp4" || file.type==="video/x-matroska"){

        videosUpload[file.name] = {}
        videosUpload[file.name]["type"] = file.type;
        videosUpload[file.name]["progress"] = 0;
        videosUpload[file.name]["done"] = false;
        videosUpload[file.name]["file"] = file;        
        videosUpload[file.name]["url"] = url;








        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  if(_Util.isJson(xhr.response)){
                    var data = JSON.parse(xhr.response)
                    if(data && data.id){
                      videosUpload[file.name]["done"] = true;
                      videosUpload[file.name]["videoId"] = data.id;
                      uploadConatiner["videosUpload"] = videosUpload;       
                      setTimeout(()=>{
                        _Distpatch({
                          type: 'UPD_KEY_VALUE',
                            kv:{key:'UploadObsoreve',value:_Util.gen12CodeId()}
                        })
                      },650) 
                      _Distpatch({
                        type: 'UPD_KEY_VALUE',
                          kv:{key:'UploadObsoreve',value:_Util.gen12CodeId()}
                      })
                      /*
                      dispatch(UpdateForm(formName,'isPlayable',true));   
                      dispatch(UpdateForm(formName,'code',data.id));
                      dispatch(UpdKeyValue({key:'uploadVideoDone',value:true}));
                      dispatch(getVideoById(videoRef));
                      */
                    } 
                  }
                                
                } else {
                  console.log(`error`);
                  console.log(xhr.response);
                }
            }
        };

        xhr.onabort= (event) => {
          videosUpload[file.name]["cancelled"] = true;
          videosUpload[file.name]["progress"] = 0;
          uploadConatiner["videosUpload"] = videosUpload; 
          _Distpatch({
            type: 'UPD_KEY_VALUE',
              kv:{key:'UploadObsoreve',value:_Util.gen12CodeId()}
          })
        }


        xhr.upload.onprogress = (event) => {
            let progress = Math.round(event.loaded / event.total * 100);
            videosUpload[file.name]["progress"] = progress;
            uploadConatiner["videosUpload"] = videosUpload; 
            _Distpatch({
              type: 'UPD_KEY_VALUE',
                kv:{key:'UploadObsoreve',value:_Util.gen12CodeId()}
            })
        }


        let _url = window.HrmConfig["url"]+url;
        xhr.open('POST', _url, true); 
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("autorization", "e7d278c5-d443-aa4c-a001-8ebd9bbb9073");        
        xhr.send(formData); 
        //this.props.commonStore.UploadList[file.name][`xhr`] = xhr; 
        videosUpload[file.name]["xhr"] = xhr;
        uploadConatiner["videosUpload"] = videosUpload;
  }
  
}




export function ImageFileUpload(url,parmas, file,formName){ 
  
  
  let formData = new FormData(),
  xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  //for (let i = 0; i < files.length; i++) {}
  formData.append("file", file, file.name);

  if(file.type==="image/jpeg" || file.type==="image/jpg"){

      let imagesUpload = uploadConatiner["imagesUpload"] || {};

        imagesUpload[file.name] = {}
        imagesUpload[file.name]["type"] = file.type;
        imagesUpload[file.name]["progress"] = 0;
        imagesUpload[file.name]["done"] = false;
        uploadConatiner["imagesUpload"] = imagesUpload;

      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                if(_Util.isJson(xhr.response)){
                  var data = JSON.parse(xhr.response)              
                  if(data && data.id){
                    imagesUpload[file.name]["done"] = true;
                    imagesUpload[file.name]["imgId"] = data.id;
                    uploadConatiner["imagesUpload"] = imagesUpload;
                    setTimeout(()=>{
                      _Distpatch({
                        type: 'UPD_KEY_VALUE',
                          kv:{key:'UploadObsoreve',value:_Util.gen12CodeId()}
                      })
                    },650)
                    _Distpatch({
                      type: 'UPD_KEY_VALUE',
                        kv:{key:'UploadObsoreve',value:_Util.gen12CodeId()}
                    })
                  } 
                }
                              
              } else {
                console.log(`error`);
                console.log(xhr.response);
              }
          }
      };

      xhr.upload.onprogress = (event) => {
          let progress = Math.round(event.loaded / event.total * 100);
          imagesUpload[file.name]["progress"] = progress;
          uploadConatiner["imagesUpload"] = imagesUpload;
          _Distpatch({
              type: 'UPD_KEY_VALUE',
                kv:{key:'UploadObsoreve',value:_Util.gen12CodeId()}
          })
          
          //dispatch(UpdKeyValue({key:'uploadProgress',value:progress}));
          //this.props.commonStore.UploadList[file.name][`progress`] = progress;
          //this.props.commonStore.UploadProgress()
        
      };


      let _url = window.HrmConfig["url"]+url;
      xhr.open('POST', _url, true);     
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("autorization", "e7d278c5-d443-aa4c-a001-8ebd9bbb9073");
      xhr.send(formData);
      //this.props.commonStore.UploadList[file.name][`xhr`] = xhr; 
  }
}


 


export function UploadImageFromUrl(url,videoRef,dispatch){
  return function (dispatch, getState) {
    _Util.fetchPostUrl(url) 
    .then(res => {
      //dispatch(getVideoById(videoRef));
      //dispatch(UpdateFormbyName(formName,data));
      //dispatch(UpdKeyValue({key:'uploadImageDone',value:true}));
    }).catch(error => {      
      console.log(error);
    });
  }
}






export function getThumbnail(url,dispatch){
  let state = _Util.getStore()
  if(!_Distpatch){
    _Distpatch = dispatch;
  }
  let res = ''
  if(url){
    var _thumbnailJson = state && state['thumbnailJsonBlob']?state['thumbnailJsonBlob']:{};   
    if(_thumbnailJson && _thumbnailJson[url]){
      if(_thumbnailJson[url]['blob']){       
        res = _thumbnailJson[url]['blob'];
      }
    }else{ 
      dispatch && getThumbnail64(url,state,dispatch)
    }
  }
  return res  
    
}





function getThumbnail64(url,state,dispatch) {  
  var _url = _Util.get_GRAPHQLURL() && _Util.get_GRAPHQLURL().concat('/getImages/').concat(url);
  
    var _thumbnailJson = state && state['thumbnailJsonBlob'];
   
    if(!_thumbnailJson){
      _thumbnailJson = {}
    }
    if(!_thumbnailJson[url]){
      _thumbnailJson[url] = {}
    }
    _thumbnailJson[url]['requested'] = true;    
    _Util.updStore('thumbnailJsonBlob',_thumbnailJson)
    var xhr = new XMLHttpRequest();    
      xhr.open( "GET",_url , true );
      xhr.responseType = "json";
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {           
          //document.getElementById("demo").innerHTML = this.responseText;
        }
      };
      xhr.onload = function( e ) {          
        if (xhr.status === 200) {
          if(this.response && this.response.b64){
            _thumbnailJson[url]['blob']=getBlob(this.response.b64,this.response.type);
            _thumbnailJson[url]['done']=true;
            var i = new Image();             
            i.onload = function(){
              _thumbnailJson[url]['width']=i.width;
              _thumbnailJson[url]['height']=i.height;              
              _Util.updStore('thumbnailJsonBlob',_thumbnailJson)
              dispatch({
                type: 'UPD_KEY_VALUE',
                kv:{key:'observeImage',value:_Util.gen12CodeId()}
              })
            };
            i.src = "data:"+this.response.type+";base64,"+  this.response.b64;                
            _Util.updStore('thumbnailJsonBlob',_thumbnailJson)     
            dispatch({
              type: 'UPD_KEY_VALUE',
              kv:{key:'observeImage',value:_Util.gen12CodeId()}
            })
          }
        }
      };
      _url &&  xhr.send(); 
};             
 









function getBlob(t,tp){    
  var arrayBufferView = base64ToArrayBuffer(t);
  //Util.DecodeWebp(arrayBufferView);       
  var blob = new Blob( [ arrayBufferView ], { type: tp || "image/jpeg" } );
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




































export const  getFTP = async (dispatch, state, operations, dID) => {
  let bdy = {q:"getFTP"}
  _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  .then(res => {      
    let dt = res;
    //console.log(dt)
    if(dt && dt.data){      
      _Util.updStore('ftpData',dt.data);
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
    }
    
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
  
}






export function getFtpStream22File(body,state,dispatch){ 
  let url = body["pth"];
  let res = ''
  if(url && state){
    var _ftpStreamJson =  state['ftpStreamJson'] || {};   
    if(_ftpStreamJson && _ftpStreamJson[url]){
      if(_ftpStreamJson[url]['blob']){       
        res = _ftpStreamJson[url]['blob'];
      }
    }else{ 
      dispatch && getFtpStream64(body,state,dispatch)
    }
  }
  return res
}







export const  getFtpStream64Big = async (body,dispatch,state,openUrl) => {

 
  let url = body["pth"];
  let _ftpStreamJson = state["ftpStreaUrl"] || {};
  if(!_ftpStreamJson[url]){
    _ftpStreamJson[url] = {};
  }
  
  let bdy = body;
  bdy["q"] = "getFtpStream64Big";
  const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  if(td && td["id2newUrl"]){
    let _blob_ = _Util.get_GRAPHQLURL()+"/ftpTempUrlStream/"+td["id2newUrl"]
     window.open(_blob_)  
  }
  
}







export const  getFtpStream64 = async (body,dispatch,openUrl) => {
  let state = _Util.getStore()
  let url = body["pth"];
  let _ftpStreamJson = state["ftpStreamJson"] || {};
  if(!_ftpStreamJson[url]){
    _ftpStreamJson[url] = {};
  }
  if(_ftpStreamJson[url] && _ftpStreamJson[url]['done']){    
    if(openUrl){
      window.open(_ftpStreamJson[url]['blob'])
    }
  }else{
    let bdy = body;
    bdy["q"] = "getFtpStream64";
    const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
    const td = await res;
    let data = td
    if(td && td["data"]){
      data = td["data"];
    }   
    if(data && data["b64"]){
      let _blob_ = getBlob(data.b64,data.type)
      _ftpStreamJson[url]['blob']=_blob_;
      _ftpStreamJson[url]['done']=true;
      _ftpStreamJson[url]['type']=data.type;
      /*
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'ftpStreamJson',value:_ftpStreamJson}
      })
      */
      _Util.updStore('ftpStreamJson',_ftpStreamJson);
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      }) 
      if(openUrl){
        window.open(_blob_)
      }      
    }
  }
}




export const  getFtpStreamSrt = async (body,dispatch,state,openUrl) => { 
  let url = body["pth"];
  let _ftpStreamJson = state["srtStreamJson"] || {};
  let bdy = body;
  bdy["q"] = "getFtpStream64";
  const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  let data = td
  
  if(td && td["data"]){
    data = td["data"];
  }
  if(data && data["b64"]){
   
    let _blob_ = getBlob(data.b64,data.type)
    if(!_ftpStreamJson[url]){
      _ftpStreamJson[url] = {}
    }
    _ftpStreamJson[url]['blob']=_blob_;
    _ftpStreamJson[url]['done']=true;
    _ftpStreamJson[url]['b64']=data.b64;    
    _Util.updPlayerStore('srtStreamJson',_ftpStreamJson);
    let bbb = _Util.Base64Decode(data.b64);     
    if(bbb.indexOf("ó")<0){
      bbb = _Util.Base64.decode(data.b64);   
    }
    let label = url.split("/").pop();    
    SrtCachingFile(bbb,label,dispatch);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observePlayer',value:_Util.gen12CodeId()}
    }) 
    if(openUrl){
      window.open(_blob_)
    }      
  }  
}





  




export const  getFtpStreamVideo64 = async (body,dispatch) => {  
  let bdy = body;
  let _tid = _Util.gen12CodeId();  
  let TT = {   
    Id:_tid,
    text:"Cargando el video ..... "
  }
  OpenToast(dispatch,TT)
  bdy["q"] = "ftpStreamVideoFiles";
  const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  if(td && td.data && td.data["id"]){
    _loadHLSdataByUrl(td.data["id"], dispatch,_tid)
  }else{
    CloseToast(dispatch,{id:_tid})
    OpenToast(dispatch,{ text:"El video no esta listo para reproducion" })
   // 
  }  
}


export const  getFtpStreamList = async (body,dispatch) => {  
  let bdy = body;
  bdy["q"] = "ftpStreamVideoNextList";
  const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  if(td && td.data){
    let nextlistS = Object.keys(td.data).sort(function(a, b) {
      if(a < b) { return -1; }
      if(a > b) { return 1; }      
      return 0;
    })
    _Util.updPlayerStore("nextlist",nextlistS);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observePlayer',value:_Util.gen12CodeId()}
    })
  }
}


export const  getFtpStreamStatus = async (body,dispatch) => {  
  let bdy = body;
  bdy["q"] = "ftpStreamFileStatus";
  const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  if(td && td.data){
    let state = _Util.getStore()
    let streamStatus = state["streamStatus"] || {};
    Object.keys(td.data).length>0 && Object.keys(td.data).map(fR=>{
      streamStatus[fR] = 1;
    })
    _Util.updStore("streamStatus",streamStatus);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }
}

export const  getFtpConvertStatus = async (body,dispatch) => {  
  let bdy = body;
  bdy["q"] = "ftpStreamFileStatus";
  const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  if(td && td.data){
    bdy["list"].map(_cnv=>{
      let _pth = _cnv["pth"];
      if(td.data[_pth]){
        let state = _Util.getStore()
        let convertConatinerVideos = state["convertConatinerVideos"];
        if(convertConatinerVideos[_pth]){
          let inTv = state["convertVideosInterval"];       
          let streamStatus = state["streamStatus"];
          streamStatus[_pth] = true;
          delete convertConatinerVideos[_pth];
          clearInterval(inTv[_pth]);
          _Util.updStore("convertConatinerVideos",convertConatinerVideos);
          _Util.updStore("streamStatus",streamStatus);
        }
      }
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }
}



export const  encodeVideoFiles = async (body,dispatch,state,updKV) => {  
  let bdy = body;
  bdy["q"] = "encodeVideoFiles";
  const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  const td = await res; 
  let toast = {
    list: state["listToat"],
    text:"El video se esta convirtiendo esto puede durar unos minutos"
  }
  
  OpenToast(dispatch,toast)
}



export const  refreshFTP = async () => {  
  let bdy = {};
  bdy["q"] = "refresFTPFiles";
  const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
}




export const _loadHLSdataByUrl = (id, dispatch,_tid) => {  
  _Util.updPlayerStore("loadedVideo",false);
  _Util.updPlayerStore("hls",null);
  _Util.updPlayerStore("currentTime",0);
  _Util.updPlayerStore("W2Seek",false);
  _Util.updPlayerStore("dragging",false);
  _Util.updPlayerStore("duration",0);
  _Util.updPlayerStore("volume",1);
  _Util.updPlayerStore("mute",false);
  _Util.updPlayerStore("UrlHlm",null)
  _Util.updPlayerStore("timelineUpdated",false)     
  _Util.updPlayerStore("bookmarkPositionID",null)
  _Util.updPlayerStore("bookmarkPositionTimeline",null)
  _Util.updPlayerStore("mediaId",null)  
  let url = window.HrmConfig["url"]+"/Stream28/"+id+".hlm";
  window.urlHLm  = url;
  //updKV("_url",url);
  _Util.updPlayerStore("_url",url)
  // loadHLSdata(url,dispatch,updKV,keys);
  let store = _Util.getStore() || {};
  store["route_history"].push({pathname:`/player`,search:`?v=${id}` }); 
  loadMediadata(url,dispatch, null , _tid);
}





/*

1590460056963-1590460061311

4348


1590460212104-1590460212406

*/


export var nextlist = []

export const ClearNextlist = () => {  
  nextlist = []
}


export const getFtpStreamNextVideo = async (body,dispatch,updKV) => { 
  let bdy = body;  
  bdy["q"] = "ftpStreamVideoFiles";
  const res = _Util.fetchFtp(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  if(td && td.data && td.data["id"]){
    let pth = bdy["pth"]
    nextlist.push(pth);
  }
}




export const getMovies = async (body,dispatch,k) => {    
    //console.log(window.performance)
    //console.log(window.performance.memory)
    let bdy = body;
    let _state = _Util.getStore();
    const res = _Util.fetchStream_movie_data(_Util.get_GRAPHQLURL(),bdy)
    const td = await res;
    if(td && td.data){
      let lis = _state[k] || {};
      let dd = Object.assign({},lis,td.data);
      let h = {}
      
      Object.keys(dd).map((_itm,_inD)=>{
        let _lg = dd[_itm];
        let query = bdy["search"];
        if(query){
          ["title","synopsis"].map(_qKey=>{
            if(query && _qKey && _lg[_qKey] && _lg[_qKey].toString().toLowerCase().indexOf(query.toString().toLowerCase())>=0){  
              h[_itm]=_lg;
            }
          });
        }else{
          h[_itm]=_lg;
        }
      })
      
      _Util.updStore(k,h);
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
    }
}



export const getMoviesById = async (body,dispatch,k) => {    
  //console.log(window.performance)
  //console.log(window.performance.memory)
  let bdy = body;

  let _ID = bdy.params.id
  const res = _Util.fetchStream_movie_data(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  let _state = _Util.getStore();
  let _infoData = _state["infoData"];
  if(_infoData){
    console.log("gettingData");
    console.log("request",bdy);
    console.log("response",td);
  }
  if(_ID && td && td.data){
    let isImgBlob = _state["imageBlob"];
    let _dVID = td.data[_ID]
    _dVID["id"] = _ID;
    if(isImgBlob){
      let defRes = "_665x375";  
      let imK2Show = "storyArt"
      let _ext = _state["isWebp"]?"webp":"jpg";
      let _boxarts = _dVID && _dVID[imK2Show] && _dVID[imK2Show][defRes] && _dVID[imK2Show][defRes][_ext] && _dVID[imK2Show][defRes][_ext]["url"]
      let _src;
      if(_boxarts && _Util.isURL(_boxarts)){
        _src = "url?url="+_boxarts;
        getThumbnail(_src,dispatch);
      }
    }
    _Util.updStore(k,_dVID);
    //setTimeout(()=>{},100);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
    
  }
}



export const getMoviesHero = async (body,dispatch,k) => {    
  //console.log(window.performance)
  //console.log(window.performance.memory)
  let bdy = body;

  
  const res = _Util.fetchStream_movie_data(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  
  if(td && td.data){
    let _state = _Util.getStore();
    let isImgBlob = _state["imageBlob"];
    let _ID = _Util.ObjectKeys(td.data)[0];
    let _dVID = td.data[_ID]
    _dVID["id"] = _ID;
    if(isImgBlob){
      let defRes = "_665x375";  
      let imK2Show = "storyArt"
      let _ext = _state["isWebp"]?"webp":"jpg";
      let _boxarts = _dVID && _dVID[imK2Show] && _dVID[imK2Show][defRes] && _dVID[imK2Show][defRes][_ext] && _dVID[imK2Show][defRes][_ext]["url"]
      let _src;
      if(_boxarts && _Util.isURL(_boxarts)){
        _src = "url?url="+_boxarts;
        getThumbnail(_src,dispatch);
      }
    }
    _ID && _Util.updStore(k,_dVID);
    //setTimeout(()=>{},100);
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
    
  }
}





export const getStoryArtById = async (body,dispatch,k) => {    
  //console.log(window.performance)
  //console.log(window.performance.memory)
  let _state = _Util.getStore() || {};
  let bdy = body;
  let _dVID = _state[k] || {};

  let _ID = bdy.params && bdy.params.id
  if(_ID && !_dVID[_ID]){
    const res = _Util.fetchStream_movie_data(_Util.get_GRAPHQLURL(),bdy)
    const td = await res;  
    if(td && td.data){
      let itm = td.data[_ID];
      _dVID[_ID] = itm;
      let defRes = "_665x375";  
      let imK2Show = "storyArt"
      let _ext = _state["isWebp"]?"webp":"jpg";
      let _boxarts = itm && itm[imK2Show] && itm[imK2Show][defRes] && itm[imK2Show][defRes][_ext] && itm[imK2Show][defRes][_ext]["url"]
      let _src;
      if(_boxarts && _Util.isURL(_boxarts)){
        _src = "url?url="+_boxarts;
        getThumbnail(_src,dispatch);
      }
      _Util.updStore(k,_dVID);
      //setTimeout(()=>{},100);
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
    };
  }
}





export const addVideo = async (body,dispatch,k) => {    
  //console.log(window.performance)
  //console.log(window.performance.memory)
  let bdy = body;
  let _ID = bdy.form.id
  const res = _Util.fetchStream_movie_data(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  if(_ID && td && td.data){
    
  }
}



export { OpenModal, CloseModal }