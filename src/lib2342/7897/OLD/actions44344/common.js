import * as _Util from '../lib/Util'



const OpenModal = (dispatch, data) => {

    let list = data.list;
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

    setTimeout(()=>{
     setTimeout(()=>{
        let cmp = document.getElementById(Id);
        cmp = document.querySelector(`[dialog-key-id='${Id}']`);
        let dmz = cmp && cmp.getBoundingClientRect();
        if(data['prevent_relocate']){
          list[Id]['height']=data['height'];   
          list[Id]['width']=data['width'];   
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'listDialog',value:list}
          })
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
          })
        }
        else if(dmz && dmz.width){
          list[Id]['height']=dmz.height;   
          list[Id]['width']=dmz.width;   
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'listDialog',value:list}
          })
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
          })
        }
      },7)
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
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'listDialog',value:list}
      })
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
      })
    },175)
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'listDialog',value:list}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
    })
  
}



const CloseModal = (dispatch, data) => {
  let list = data.list;  
  let Id = data['id'];
  if(list[Id]){
    list[Id]['display']=false;
    setTimeout(()=>{
      delete list[Id];
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'listDialog',value:list}
      })
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
      })
    },275)
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'listDialog',value:list}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
    })
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
                  console.log(data);                  
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
        let progress = Math.round(event.loaded / event.total * 100);
        console.log(progress)
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








export { OpenModal, CloseModal, }