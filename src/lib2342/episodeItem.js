import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {getThumbnail} from '../actions/common'
import {loadHLSdataByUrl, updTimebyVideoId } from './lib/common'

import Icons from './Icons'
import WithScroll from './scroll-decorator'
import LazyImage from './lazyImage'

import './_styles.css'

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  
  const updKV= (k,v) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:k,value:v}
    })  
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:observeChanges,value:_Util.gen12CodeId()}
    })  
  }


  const _openPlayer = (item) => {
    let bookmarkPosition = item && item["bookmarkPosition"]
    let bookmarkPositionID = bookmarkPosition && bookmarkPosition["id"];
    let bookmarkPositionTimeline = bookmarkPosition && bookmarkPosition["timeline"];
    _Util.updPlayerStore("bookmarkPositionID",bookmarkPositionID);
    _Util.updPlayerStore("bookmarkPositionTimeline",bookmarkPositionTimeline);
    _Util.updPlayerStore("mediaId",item["id"]);
    _Util.updPlayerStore("timelineUpdated",false);
    _Util.updStore("flixSource",'browse');     
    loadHLSdataByUrl(item["netflixId"], dispatch, updKV,bookmarkPositionID, bookmarkPositionTimeline, item["id"]);
    //_state["route_history"].push({pathname:`/player`,search:`?v=${item["id"]}` });
    if(!bookmarkPositionID){
      let NewBmP = {};
      NewBmP["started"] = true;
      NewBmP["completed"] = false;
      NewBmP["timeline"] = 0;
      NewBmP["duration"] = 0;
      if(item["id"]){
          NewBmP["id"] = _Util.gen12CodeId();
          NewBmP["videoId"] = item["id"];
          updTimebyVideoId(NewBmP);
      }
    }
  }



  const dispatch = useDispatch();  
  const _getThumbnail = (url) => {
    getThumbnail(url,dispatch);
  }
  

  
  
  return { observeChanges, _getThumbnail,  _openPlayer }
}



const TitleCardHRM = (props) => {


  const {
    title,
    src,
    duration,
    synopsis,
    number,
    playable,
    id,
    mv
  } = props;

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;


let item = mv?mv:{}

  const {
    _getThumbnail,
    _openPlayer
  } = useObserveChanges();


  


  let _url = `${src}?size=665x374` 
 let bookmarkPosition = item && item["bookmarkPosition"]  && item["bookmarkPosition"];
 let bookmarkPositionPercent = 0;
 if(bookmarkPosition && bookmarkPosition["duration"]>0){
   bookmarkPositionPercent = (bookmarkPosition["timeline"] / bookmarkPosition["duration"])*100;
 }


  var _thumbnailJson = _state['thumbnailJsonBlob'] && _state['thumbnailJsonBlob'][_url];
  let _blob = _thumbnailJson ? _thumbnailJson['blob'] : "";
  let _styleIm = {}
  if(!_blob){
    _getThumbnail(_url);
  }else{
    _styleIm = {backgroundImage: `url(${_blob})`}
  }
  return(
    <>          
      <div className={`episodeLockup`}>
        <div className={`episodeArt video-artwork`} style={_styleIm}>          
          <div className="numberVignette"></div>
          <div className="episodeNumber no2Progress">
            <span aria-hidden="true">{number}</span>
          </div>
          {bookmarkPosition && bookmarkPosition["id"] && bookmarkPosition["timeline"]>0 ?
          <div class="progress ">
            <span class="progress-bar">
              <span role="presentation" class="progress-completed" style={{width: bookmarkPositionPercent+"%"}}></span>
            </span>
          </div>
          :null
          }
          {playable ?
          <div className={`episodePlay slider-refocus playLink`} onClick={()=>_openPlayer(item)}>
            <div class="playRing">
              <div class="play">
                <Icons 
                  name={'play'} 
                  color={'#555'} 
                  size={24}
                  /// tooltip={'play'}
                  noStyle={true}
                />
              </div>
            </div>
          </div>
          :
          null}
        </div>
        <div className="episodeTitle">
          <p className="ellipsized">{title}</p>
          { bookmarkPosition ?<span className="duration">{ parse2Duration(bookmarkPosition["duration"]*1000)}</span> : null}
        </div>      

        <div className="episodeSynopsis">
          {synopsis}
        </div> 
      </div>
      <style>
        {txt_styles}
      </style>
  </>
  )


}






export default TitleCardHRM





const parse2Minutes = (s) =>{
  return Math.floor(s/60);
 }
 
 
 
 const parse2Duration = (s) =>{
   let min = Math.floor(s/60000);
   let hour = Math.floor(min/60);
   let re =  `${hour>0?`${hour} h`:""} ${hour>0?(min-(hour*60)):min }min`;
   return re;
  }
  


const txt_styles = `









@media screen and (max-width: 1399px) and (min-width: 1100px){
  .episodeLockup .episodePlay:hover, .episodeLockup .episodePlay:focus {
    /*--play_icon_scale: scale(1.5);*/
  }
  
}


@media screen and (max-width: 1099px) and (min-width: 800px){
  .episodeLockup .episodePlay:hover, .episodeLockup .episodePlay:focus 
  {
    /*--play_icon_scale: scale(1.75);*/
  }
  
}


`