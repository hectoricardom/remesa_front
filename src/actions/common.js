import * as _Util from '../store/Util'


// import { GRAPHQLURL,GRABBER_URL } from '../constants/Api';
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/auth'


let _getState = null;
let _Distpatch;
let _State_outerWidth;



var fb_config = JSON.parse(_Util.Base64.decode(_Util.fsConfig));


var data = {}
firebase.initializeApp(fb_config);
const db = firebase.firestore();

var providerAuth = new firebase.auth.GoogleAuthProvider();
providerAuth.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const _providerAuth  = providerAuth;






export const Subscribe = ()=>{
  let state = _Util.getStore();
  let ActiveUser = state['ActiveUser'];
  if(ActiveUser){
    var _CollectionFB = `/hhh/${ActiveUser}/params/`;  
    db.collection(_CollectionFB).onSnapshot((querySnapshot) => {    
        querySnapshot.forEach((doc) => {
            var s = doc.data();
            if(!s.isActive){
              cleanTokenandLogout()
            } else if( s.isActive && !s.isActive.active){
              cleanTokenandLogout()
            }else{
              _Util.updStore('user',s);
              // let _fbtoken = window.localStorage.getItem('fbtkClnt');
              _Distpatch({
                type: 'UPD_KEY_VALUE',
                kv:{key:'observePlayer',value:_Util.gen12CodeId()}
              })
            }
        });
    });
  }
}




export function cleanTokenandLogout(){  
  window.localStorage.setItem('hxmTkn',null);  
  _Util.updStore('user',{});
  setTimeout(()=>{
    _Util.updStore('appLoaded',false)
    _Util.updStore('authenticate',false)
    window.location.href = (`${_Util.get_GRAPHQLURL()}`);         
  },60);
}

var dataFb = {};


export function getActiveUserDetail(){  
  let state = _Util.getStore();
  let ActiveUserDetails = state['ActiveUserDetails'];
  return ActiveUserDetails?ActiveUserDetails.toString():'';
}

export const Create = (obj)=>{  
  let state = _Util.getStore();
  let ActiveUser = state['ActiveUser'];
  var _CollectionFB = `/hhh/${ActiveUser}/params/`;  
  db.collection(_CollectionFB).doc(ActiveUser).set(obj).then(doc=> { });      
}



export const Update = (obj)=>{  
  let state = _Util.getStore();
  let ActiveUser = state['ActiveUser'];
  var _CollectionFB = `/hhh/${ActiveUser}/params/`;  
  db.collection(_CollectionFB).doc(ActiveUser).update(obj).then(doc=> { });      
}



export const SubscribeDetailsbyId = (_Id)=>{
  
  var _CollectionFBbyId_ = `/hhh/${_Id}/params/`;
  db.collection(_CollectionFBbyId_).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          var s = doc.data();
          let state = _Util.getStore() 
          let usersFBList = state['usersFBList'] || {}
          usersFBList[_Id] = s;
          _Util.updStore('usersFBList',usersFBList)
          _Distpatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'observeChanges',value:_Util.gen12CodeId()}
          })
      });
  });
}


export const SubscribeDetails = (h)=>{  
    Object.keys(h).map(_Id=>{
      SubscribeDetailsbyId(_Id);   
    })
}



export const UpdateDetails = (id, obj)=>{
  var _CollectionFB = `/hhh/${id}/params/`;  
  db.collection(_CollectionFB).doc(id).update(obj).then(doc=> { });      
}












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








export const LoadData = async (body,dispatch) => {     
    let bdy = body;
    // let _state = _Util.getStore();
    const res = _Util.fetchStream_movie_data(_Util.get_GRAPHQLURL(),bdy)
    const td = await res;
    
    if(td && td.data){
      let _id = Object.keys(td.data)[0];
      if(td.data[_id].isAdmin){
        _Util.updStore('userProfile',td.data[_id])
        _Util.updStore('isAdmin',true)
        _Util.updStore('authenticate',true)
        LoadUsersActive(dispatch);
      }
      else{
        _Util.updStore('ActiveUser',_id);
        _Util.updStore('authenticate',true)
        SubscribeDetailsbyId(_id);
      }
      _Util.updStore('appLoaded',true)
    }else{
      _Util.updStore('appLoaded',true)
      _Util.updStore('authenticate',false)
    }
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
}


 const LoadUsersActive = async (dispatch) => { 
  let bdy = {
    fields:[
      "id","email"
    ],
    query:"usersList"
  };
  const res = _Util.fetchStream_movie_data(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  if(td && td.data){
    _Util.updStore('userList',td.data)
    SubscribeDetails(td.data); 
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }
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








export const OpenModal = (dispatch, data) => {

  
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



export const CloseModal = (dispatch, data) => {
    
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
  let keys = _Util.getGlobalsKeys()
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

  if(data['content']){
    list[Id]['content']=data['content']
  }
  
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







export const OpenBezel = (dispatch, data) => {

  let list = data.list || {};
  let Id = _Util.gen12CodeId();
  if(!list[Id]){
    list[Id]={};
  }
  list[Id]['visible']=true;
  let _dataProps = {};
  if(data['icon']){
    list[Id]['icon']=data['icon'];
  }  
  list[Id]['data']=_dataProps;
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'listBezel',value:list}
  })
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
  })
  setTimeout(()=>{
    list[Id]['visible']=false;
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'listBezel',value:list}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
    })
  },875);
  setTimeout(()=>{
    delete list[Id];
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'listBezel',value:list}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
    })
  },4875) 
}




export const CloseBezel = (dispatch, data) => {
  let list = data.list;  
  let Id = data['id'];
  if(list[Id]){
    delete list[Id];
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'listBezel',value:list}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
    })
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





export const upgradeBookmarkPosition = async (body) => {    
  let bdy = body;
  const res = _Util.fetchStream_movie_data(_Util.get_GRAPHQLURL(),bdy)
  const td = await res;
  if(td && td.data){
    
  };
  
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









export const loadHLSdataByUrl = (id, dispatch, updKV, state,bookmarkPositionID,bookmarkPositionTimeline, mediaId) => {
  updKV("loadedVideo",false);
  updKV("hls",null);
  updKV("currentTime",0);
  updKV("W2Seek",false);
  updKV("dragging",false);
  updKV("duration",0);
  updKV("UrlHlm",null)
  updKV("timelineUpdated",false)     
  updKV("bookmarkPositionID",bookmarkPositionID)
  updKV("bookmarkPositionTimeline",bookmarkPositionTimeline)
  updKV("mediaId",mediaId) ;
  let _state = _Util.getStore();
  var _watchpath = {pathname:`/watch`,search:`?v=${id}` };
  //_state["route_history"].push(_watchpath);  
 setTimeout(()=>{     
  //getVideoHLMById(id,dispatch,state);  
  loadMediadata("url",dispatch, _watchpath );    
 },20)
}




export const loadMediadata = (url, dispatch,pathRoute) => {

  
  let Hls = window.Hls;  

  let keys = _Util.getGlobalsKeys()
  let IdVideo = keys[95];
  let id_v = `${IdVideo}_video`;
  let _player = document.getElementById(id_v);
  let _urlM3U8 = "https://5b44cf20b0388.streamlock.net:8443/vod/smil:bbb.smil/playlist.m3u8";
  
  if( Hls && _player){
    let hls = new Hls();
    window._hlsHRM = hls;
    hls.loadSource(_urlM3U8);
    hls.attachMedia(_player);
    
    var playPromise = _player.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {                    
        _Util.updPlayerStore("requestNext",false);
        _Util.updPlayerStore("duration",_player.duration);
        _Util.updPlayerStore("isplaying",true);
      })
      .catch(error => {
      //console.log(error)
      });
    }
  
    hls.on(Hls.Events.MANIFEST_PARSED, function() {            
      //_player.play();
    });

    hls.on(Hls.Events.ERROR, (e,data) => {
     //console.log({e}) 
     //console.log({data}) 
    });
    hls.on(Hls.Events.FRAG_LOADED, function(e,data) {
    // console.log({e}) 
    //  console.log({data}) 
    });
    //updKV('audio_list',hls.audioTrackController.tracks);
    //updKV('subtitle_list',hls.subtitleTrackController.tracks);
  
  }

}












export function makeFileRequest(url,parmas, file,formName,videoRef){ 
  let formData = new FormData(),
  xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  //for (let i = 0; i < files.length; i++) {}
  formData.append("file", file, file.name);
  

  xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if(_Util.isJson(xhr.response)){
              var data = JSON.parse(xhr.response)
              if(data && data.id){               
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

  xhr.upload.onprogress = (event) => {
      //let progress = Math.round(event.loaded / event.total * 100);
      //dispatch(UpdKeyValue({key:'uploadProgress',value:progress}));
      //this.props.commonStore.UploadList[file.name][`progress`] = progress;
      //this.props.commonStore.UploadProgress()
    
  };

  xhr.open('POST', url, true);     
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("autorization", "e7d278c5-d443-aa4c-a001-8ebd9bbb9073");
  xhr.send(formData);
  //this.props.commonStore.UploadList[file.name][`xhr`] = xhr; 

}









export function SrtCaching(url, id, dispatch) {
  const state = _Util.getPlayerStore();
  var _subtitles = state.subtitle;
  _subtitles[id] = {}
  var xhr = new XMLHttpRequest();    
        xhr.open( "GET",url , true );
        xhr.responseType = "text";
        xhr.onload = function( e ) {
          if (xhr.status === 200) {
            _subtitles[id]['srt']=srt2Json(this.responseText);  
            _Util.updPlayerStore("subtitle",_subtitles)
            _Util.updPlayerStore("subtitleId",id)
            dispatch({
              type: 'UPD_KEY_VALUE',
              kv:{key:'observePlayer',value:_Util.gen12CodeId()}
            })          
          }             
        };  
  xhr.send();
}  



export function updSecSyncTime(sec,dispatch) {
_Util.updPlayerStore("subtitleSyncTime",sec)  
}







export function updTimebyVideoId(doc){
  let _now = (new Date()).getTime();    
  var _url = _Util.get_GRAPHQLURL(); 
  const query= `
  mutation($doc: UpdateBookmarkPosition!){
    payload:  updateBookmarkPosition(bookmark: $doc) {
      id,
      started,
      completed,
      timeline,
      duration,
      videoId      
    }
  }  
  `;
  let variables={doc};
  _url && _Util.fetchGraphQL(_url,{query,variables}) 
  .then(res => {
     //var b = res.data
    // let dur = (new Date()).getTime() - _now;            
    // let bytePerMls =  Math.floor((14/dur)*1000) ;
    // window.bandWidthPerSecond = bytePerMls*10;
     //console.log(b)           
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};












export  function srt2Json(srt) {
  //srt = srt.replace(/[^a-zA-Z0-9]/g, '');
  //console.log(srt)
  ///console.log(unescape( encodeURIComponent( srt )));
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
          else if(f.indexOf('->')>3){
            nObjSrt.start = time2number(f.split('->')[0]);
            nObjSrt.end = time2number(f.split('->')[1]);
            nObjSrt.startSt = (f.split('->')[0]);
            nObjSrt.endSt = (f.split('->')[1]);
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




function getThumbnail2(url,dispatch) {    
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
            _Util.updPlayerStore("thumbnailJsonValid",true);
            const state = _Util.getPlayerStore();
            var _thumbnailJson = state['thumbnailJson'] || {};
            _Util.ObjectKeys(this.response.data).map(rtt=>{
              _thumbnailJson[rtt]=this.response.data[rtt];
            })
            _Util.updPlayerStore("thumbnailJson",_thumbnailJson)  
            _Util.updPlayerStore("thumbnailJsonUrl",url.split('?')[0])               
            var yIndex = state['thumbnailJsonIndex'] || {};
            if(yIndex){
              yIndex[0]=true;                
              _Util.updPlayerStore("thumbnailJsonIndex",yIndex)   
            } 
            dispatch({
              type: 'UPD_KEY_VALUE',
              kv:{key:'observePlayer',value:_Util.gen12CodeId()}
            })
          }
        }
      };
    xhr.send(); 
}







export function getThumbnailbyTime(d, dispatch){
    const state = _Util.getPlayerStore();
    const {thumbnailJson, thumbnailBlob, thumbnailJsonUrl, thumbnailJsonValid, progressThumbnail} = state; 
    let _thumbnailJsonValid = thumbnailJsonValid || true;
    var blb = thumbnailBlob || {};
    if(_thumbnailJsonValid && thumbnailJson && thumbnailJson[d] && !blb[d]){
      blb[d]=getBlob(thumbnailJson[d]);
      _Util.updPlayerStore("thumbnailBlob",blb)   
    }
    if(_thumbnailJsonValid && thumbnailJson && !thumbnailJson[d]){
      let Nindex = Math.floor(d/10)
      var _url = `${thumbnailJsonUrl}?init=${Nindex}`;        
      var yIndex = state['thumbnailJsonIndex'] || {};
      if(yIndex && !yIndex[Nindex]){
        if(progressThumbnail){
          getThumbnail(_url,dispatch,state);  
        }      
        yIndex[Nindex]=true;          
        _Util.updPlayerStore("thumbnailJsonIndex",yIndex)
        dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:'observePlayer',value:_Util.gen12CodeId()}
        })
      }
    }
    return blb[d];    
}




export function SrtCachingFile(url,id, dispatch) {
  const state = _Util.getPlayerStore()
  let srt = url.replace(/: /gi,":");
  srt = srt.replace(/(\r\n|\n|\r)/gm,"&*^");
    var _subtitles = state.subtitle || {};
    _subtitles[id] = {}
    _subtitles[id]['srt']=srt2Json(srt);       
    _Util.updPlayerStore("subtitle",_subtitles)
    _Util.updPlayerStore("subtitleId",id)
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observePlayer',value:_Util.gen12CodeId()}
    })
}








