import * as types from '../constants/ActionTypes';
import initialState from './initialState';

export default function (state = initialState.common, action) {
  switch (action.type) {  
    case types.UPD_KEY_VALUE:
        return {
          ...state,
          [action.kv.key]: action.kv.value
        };
     
    default:
      return state;
  }
}


/*
    case types.APPLOADED_SUCCESS:
      return {
        ...state,
        appLoaded: action.appLoaded
      };

    case types.INIT_DATA_SUCCESS:
      return {
        ...state,
        initdata: action.initdata
      };    

    case types.ISMOBILE_SUCCESS:
      return {
        ...state,isMobile: action.isMobile
      };   

    
    case types.SCREEN_SIZE:
      return {
        ...state,
        screen_size: action.screen_size
      };

    
    case types.CURRENTTIME_SUCCESS:
      return {
        ...state,
        currentTime: action.currentTime
      };

    case types.DURATION_SUCCESS:
      return {
        ...state,
        duration: action.duration
      };

    case types.VOLUME_SUCCESS:
      return {
        ...state,
        volume: action.volume
      };

      
    case types.ISMUTE_SUCCESS:
      return {
        ...state,
        isMute: action.isMute
      };

    case types.PLAYING_SUCCESS:
      return {
        ...state,
        playing: action.playing
      };

    case types.HOVER_SUCCESS:
      return {
        ...state,
        hover: action.hover
      };
     
    case types.THUMBNAILBLOB:
      return {
        ...state,
        thumbnailBlob: action.thumbnailBlob
      };

    case types.THUMBNAILJSON:
      return {
        ...state,
        thumbnailJson: action.thumbnailJson
      };
    case types.IMAGE_LIST_SUCCESS:
      return {
        ...state,
        imageList: action.imageList
      };
    

    case types.CURRENT_PATH:
      return {
        ...state,
        path: action.path
      };
    case types.FORMS_SUCCESS:
      return {
        ...state,
        forms: action.forms
      };

    case types.FORMS_OBSERVES:
      return {
        ...state,
        formObserve: action.formObserve
      };
    case types.DETAILS_SUCCESS:
      return {
        ...state,
        details: action.details
      };
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        search: action.search
      };

    */  