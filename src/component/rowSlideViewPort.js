import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {getThumbnail, OpenWatchDialog, getStoryArtById, getMoviesById} from '../actions/common'
import SlidesHRM from './slidesHRM'


import LoadingSlider from './loadingSlider'

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);  
  const dispatch = useDispatch();

  const _getThumbnail = (url) => {
    getThumbnail(url,dispatch);
  }


  const _openMd = (dmz, item,_id) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;    
    data['props']={dmz:dmz,item:item}; 
    OpenWatchDialog(dispatch,data);
  }
  

  const _getVideosById= (q,operation) => {
    getMoviesById(q, dispatch, operation);
  }

  const _getstoryArtsById= (q,operation) => {
    getStoryArtById(q, dispatch, operation);
  }


  return { observeChanges,  _openMd,  _getThumbnail, _getVideosById, _getstoryArtsById }
}



var itemData = {
  
}


const RowSlideViewPort = (props) => {
  const {  data,  typeBrowse, _key_, _ID, keyCode, title } = props;
  let keys = _Util.getGlobalsKeys();
  const [initialize, setInitialize] = useState(false); 

  let _idK = `${_ID}_${typeBrowse}_rowSlide_${keyCode}`;


  const scrollhandler = () => {
    let _evnt = _Util.getEventStore();
    let _inD = _key_*1;
    let sc = _evnt["scrollPosition"] || 0;
    let _Elmm =document.getElementById(`data_ui_${keys[93]}`); 
    if(!initialize &&  _Elmm &&  _Elmm.style.position === "static"){ 
      let cmp =document.getElementById(_idK);
      if(cmp){
        let dm =_Util.offset(cmp);
        var _top = dm.top;
        let delay = 0;
        if(_top>=sc && _top<=(sc+window.innerHeight)+(sc>2400?delay:0)){
          setInitialize(true);
          let timeOut = itemData[_idK]["timeOut"];
          if(timeOut){
            clearInterval(timeOut);
            itemData[_idK]["timeOut"] = null;
          }
          let _state = _Util.getStore();
          if(_state[`_${typeBrowse}_rowSlide_`]===_inD && typeof props.updLastIndex === "function"){
            props.updLastIndex();
          }
        }
      }
    }
  }
  
 
  
  
  useEffect(() => {    
    if(!itemData[_idK]){
      itemData[_idK] = {} 
    }   
    let _state = _Util.getStore();
    let maxIndex = _state[`_${typeBrowse}_rowSlide_`] || 0;
    if(maxIndex<_key_){
      _Util.updStore(`_${typeBrowse}_rowSlide_`,_key_)
    }  
    if(!initialize && !itemData[_idK]["timeOut"]){      
      itemData[_idK]={}
      itemData[_idK]["timeOut"] = setInterval(()=>{
        scrollhandler()
        setTimeout(()=>{
          scrollhandler()
        },800)
      },50);
    }
    return function cleanup() {
      let timeOut = itemData[_idK]["timeOut"];
      if(timeOut){
        clearInterval(timeOut);
        itemData[_idK]["timeOut"] = null;
      }
    }
  });
  

  
  return (
    <div  id={_idK} className={` slideBrowserWrapper space2Around`} >
      {title?
      <div className={`title`}>
        {title}
      </div>:null}
      {initialize?
        <SlidesHRM keyCode={keyCode} _key_={_idK}>
        {_Util.ObjectKeys(data).map((_grTGid,_grTGid_ind)=>{
            let _item = data[_grTGid];
            return (
              <RowSlideItemViewPort _item={_item} key={_grTGid_ind} _id={`${_grTGid}_img`} indX={_grTGid_ind} _idK={_idK}/>              
            )
          })
        }
        </SlidesHRM>
       :
       <>
        <LoadingSlider />
       </>
      }
    </div>                                      
  )

}



export default RowSlideViewPort;





const RowSlideItemViewPort = (props) => {
  const {  _openMd, _getVideosById, _getstoryArtsById, _getThumbnail } = useObserveChanges();
  const {  _item,   _idK, _id,  indX } = props;
  let _state = _Util.getStore();
  const _idItem = `_${indX}_${_idK}_`

  const [initialize, setInitialize] = useState(false); 
 
  let defRes = "_665x375";
  defRes = "_342x192";
  let imK2Show = "boxarts";
  let _ext = _state["isWebp"]?"webp":"jpg";
  let _boxarts = _item[imK2Show] && _item[imK2Show][defRes] && _item[imK2Show][defRes][_ext] && _item[imK2Show][defRes][_ext]["url"]

  let isImgBlob = _state["imageBlob"];


  let _src = "";
  let _blob = "";

 
 
  
  if(initialize){
    if(isImgBlob && _boxarts && _Util.isURL(_boxarts)){
      _src = "url?url="+_boxarts;
      var _thumbnailJson = _state['thumbnailJsonBlob'] && _state['thumbnailJsonBlob'][_src];
      let _blobrequested =  _thumbnailJson && _thumbnailJson['requested'];
      _blob = _blobrequested? _thumbnailJson['blob'] : null;
    }else{
      _blob = _boxarts;
    }
  }

  
  const open = (_item) => {
    let cmp =document.getElementById(_idK);
    if(cmp){
      let dm =_Util.offset(cmp);
      let Qry = {
        params:{id:_item.id},
        fields:[
          "title","synopsis","storyArt","type", "releaseYear",
          {
            "name":"currentEpisode",
            query:"getCurrentEpisode",
            fields:[
              "episodeId",             
              "serieId",                
              "seasonId",
              "seasonNumber",
              "episodeNumber",
              "bookmarkPosition"
            ]
          },
          {
            "name":"genreList",
            query:"getGenresByVideo",
            fields:[ 
              "name", 
              "id"
            ]
          },
          {
            "name":"similars",
            query:"getSimilars",
            fields:[ 
              "title","synopsis","boxarts","type", "releaseYear",
            ]
          }
        ],
        query:"getMoviesbyId"
      };
      _getVideosById(Qry, "detailVideoByID");
      _Util.updStore("timeStart",_Util.gTm())
      _openMd(dm,_item)
    }
  }




  const hoverArts = (_item) => {
    let _state_ = _Util.getStore();
    let k = "storyArtsList";
    let _dVID = _state_[k] || {};
    if(isImgBlob && !_dVID[_item.id]){

      let Qry = {
        params:{id:_item.id},
        fields:[
          "storyArt"
        ],
        query:"getMoviesbyId"
      };
      
      _getstoryArtsById(Qry, k);
      _Util.updStore(k,_dVID);
    }
  } 



  const getingBlob = () => {
    let _src_ = "";
    let _blob_ = "";
    if(_boxarts && _Util.isURL(_boxarts)){
      _src_ = "url?url="+_boxarts;
    }
    var _thumbnailJson = _state['thumbnailJsonBlob'] && _state['thumbnailJsonBlob'][_src_];  
    let _blobrequested_ =  _thumbnailJson && _thumbnailJson['requested'];    
    _blob_ = _blobrequested_ ? _thumbnailJson['blob'] : null;      
    if(!_blobrequested_ && _src_){
      _getThumbnail(_src_);
    }
    if(_blobrequested_ && _blob_){
      setInitialize(true);
      let timeOut = itemData[_idItem]["timeOut"];
      if(timeOut){
        clearInterval(timeOut);
        itemData[_idItem]["timeOut"] = null;
      }
    }
  }


  useEffect(() => {    
    if(!itemData[_idItem]){
      itemData[_idItem] = {} 
    }
    
    if( isImgBlob && _item && _item.id && !initialize && !itemData[_idItem]["timeOut"]){      
      itemData[_idItem]={}
      itemData[_idItem]["timeOut"] = setInterval(()=>{
        getingBlob()
        setTimeout(()=>{
          getingBlob()
        },800)
      },50);
    }else{
      setInitialize(true);
    }
    return function cleanup() {
      let timeOut = itemData[_idItem]["timeOut"];
      if(timeOut){
        clearInterval(timeOut);
        itemData[_idItem]["timeOut"] = null;
      }
    }
  });



  
  return (
    <div className={`${initialize?" _bobItem_ _show":"loadingTitle pulsate ratio-16x9 _hbyW"}`} 
      style={initialize?{}:{width:"100%", animationDelay: indX*0.2+"s"}} 
      onClick={()=>open(_item)}
      data-item-id={`_${_idItem}`} 
      onMouseEnter={()=>hoverArts(_item)} 
    >
      <img id={_id} alt={""} src={_blob} style={{opacity:initialize?1:0}} />
    </div>
  )


}