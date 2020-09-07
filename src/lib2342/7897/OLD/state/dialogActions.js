import * as types from '../constants/ActionTypes';


export function UpdKeyValue(res) {
    return {
      type: types.UPD_KEY_VALUE_DIALOGS,
      kv : res
    };
  }



export function OpenDialog(options){  
    return function (dispatch, getState) { 
        const state = getState().dialog;    
        const {id,zIndex,content,height,width,heightFormat} = options;
        var _list = state.dialogs;
        if(!_list[id]){
          _list[id]={};
        }
        if(height){
          _list[id]['height']=height;
        }
        if(heightFormat){
          _list[id]['heightFormat']=heightFormat;
        }        
        if(width){
          _list[id]['width']=width;
        }
        if(zIndex){
          _list[id]['zIndex']=zIndex;
        }
        if(content){
          _list[id]['content']=content;
        }
        if(!_list[id]['display']){
          _list[id]['display']=false;
        }        
        _list[id]['visible']=true;        
        dispatch(UpdKeyValue({key:'dialogs',value:_list})); 
        dispatch(retrieveDialogObserve());
        setTimeout(()=>{
          _list[id]['display']=true;
          dispatch(UpdKeyValue({key:'dialogs',value:_list})); 
          dispatch(retrieveDialogObserve());
        },5)
    };
  }
  

  export function CloseDialog(options){  
    return function (dispatch, getState) { 
        const state = getState().dialog;    
        const {id} = options;
        var _list = state.dialogs;
        if(_list[id]){            
            _list[id]['display']=false;
            dispatch(UpdKeyValue({key:'dialogs',value:_list})); 
          dispatch(retrieveDialogObserve());
          setTimeout(()=>{
            _list[id]['visible']=false;
            dispatch(UpdKeyValue({key:'dialogs',value:_list})); 
            dispatch(retrieveDialogObserve());
          },5)
        }        
    };
  }
  


  export function OpenView(options){  
    return function (dispatch, getState) { 
        const state = getState().dialog;    
        const {id,zIndex,content} = options;
        var _list = state.views;
        if(!_list[id]){
            _list[id]={};
            _list[id]['zIndex']=zIndex;
            _list[id]['content']=content;
            _list[id]['visible']=true;
            _list[id]['display']=false;
        }
        _list[id]['zIndex']=zIndex;
        _list[id]['content']=content;
        _list[id]['visible']=true;
        _list[id]['display']=false;
        dispatch(UpdKeyValue({key:'views',value:_list})); 
        dispatch(retrieveDialogObserve());
        setTimeout(()=>{
          _list[id]['display']=true;
          dispatch(UpdKeyValue({key:'views',value:_list})); 
          dispatch(retrieveDialogObserve());
        },5)
    };
  }
  

  export function CloseView(options){  
    return function (dispatch, getState) { 
        const state = getState().dialog;    
        const {id} = options;
        var _list = state.views;
        if(_list[id]){            
          _list[id]['display']=false;
          dispatch(UpdKeyValue({key:'views',value:_list})); 
          dispatch(retrieveDialogObserve());
          setTimeout(()=>{
            _list[id]['visible']=false;
            dispatch(UpdKeyValue({key:'views',value:_list})); 
            dispatch(retrieveDialogObserve());
          },5)
        }        
    };
  }



  export function OpenSlideOption(options){  
    return function (dispatch, getState) { 
        const state = getState().dialog;    
        const {id,zIndex,height,content} = options;
        var _list = state.options_slide;
        if(!_list[id]){
            _list[id]={};
            _list[id]['zIndex']=zIndex;
            _list[id]['content']=content;
            _list[id]['height']=height;
            _list[id]['visible']=true;
            _list[id]['display']=false;
        }
        _list[id]['zIndex']=zIndex;
        _list[id]['content']=content;
        _list[id]['visible']=true;
        _list[id]['display']=false;
        dispatch(UpdKeyValue({key:'options_slide',value:_list})); 
        dispatch(retrieveDialogObserve());
        setTimeout(()=>{
          _list[id]['display']=true;
          dispatch(UpdKeyValue({key:'options_slide',value:_list})); 
          dispatch(retrieveDialogObserve());
        },5)
    };
  }
  

  export function CloseSlideOption(options){  
    return function (dispatch, getState) { 
        const state = getState().dialog;    
        const {id} = options;
        var _list = state.options_slide;
        if(_list[id]){            
          _list[id]['display']=false;
          dispatch(UpdKeyValue({key:'options_slide',value:_list})); 
          dispatch(retrieveDialogObserve());
          setTimeout(()=>{
            _list[id]['visible']=false;
            dispatch(UpdKeyValue({key:'options_slide',value:_list})); 
            dispatch(retrieveDialogObserve());
          },250)
        }        
    };
  }




  export function retrieveDialogObserve() {
    return function (dispatch, getState) {
      const state = getState().dialog;
      var foBs =  state.dialogObserve + 1;
      dispatch(UpdKeyValue({key:'dialogObserve',value:foBs})); 
     } 
  }