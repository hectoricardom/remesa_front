

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../store/redux'
import { useSelector, useDispatch } from 'react-redux'

import { SearchVideos, VideoFiles , getTitleDetailandSimilar} from  '../../actions/videos'


import { withRouter , NavLink} from 'react-router-dom';
import { OpenModal, getThumbnail} from '../../actions/common'

import { updTimebyVideoId, loadHLSdataByUrl } from '../lib/common'



import * as _Util from '../../store/Util'

import Icons from '../Icons'
import '../_styles_2.css'


import LolomoRow from '../lolomoRow'

import EpisodeItem from '../episodeItem'

import DROPBTN from '../dropBtn';



/*

import * as netfJs from '../lib/netfl.json'



import * as netfJs2 from '../lib/netfl_2.json'








import * as netfJs2 from '../lib/netfl_2.json'
import * as netfJs3 from '../lib/netfl_3.json'
import * as netfJs4 from '../lib/netfl_4.json'




import '../symbols.svg'



import Icons from '../components/Icons'
import Layout from '../components/MyLayout';
import Link from 'next/link'


import DeleteDialogDepartments from '../components/department/deleteDialogDepartments'
import deleteDialogLocations from '../components/department/deleteDialogLocations'
import AddLocations from '../components/department/addLocations'
import BTN from '../components/btns_confirm';
import Link from 'next/link'


import DialogPlayer from '../operations/dialogPlayer'
import InputText from '../InputText';
import BTNH from  '../btns_confirm';

import LazyImage from  '../lazyImage';
import HeaderFlx from '../Header_2';
import DialogHRM from '../DialogHRM';



*/


import DialogVideoFile from '../operations/dialogVideoFile'

import AddVideo from '../operations/AddVideo'




import {IconSymbol} from '../Icons';



import CarouselHRM from '../slidesHRM';




const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const observeImage =  useSelector(state => state.observeImage);
  
  const keys =  useSelector(state => state.keys);
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();
  

  let fileVideoSearch = useSelector(state => state.fileVideoSearch);

  let videoSearch = useSelector(state => state.videoSearch);


  
  
  
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

  
  const updForms= (form,field,v) => {
    let _forms = forms;
    if(!_forms[form]){
      _forms[form] = {};
    }
    _forms[form][field] = v;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })   
  }




  const _getVideosSearch = (q,operation) => {
    SearchVideos(q, dispatch,  operation);
  }

  const _getVideoFiles = (q,operation) => {
    VideoFiles(q, dispatch,  operation);
  }

  const _getVideosById= (id,operation) => {
    getTitleDetailandSimilar(id, dispatch);
  }


  

 const OpenOptions = (items, _ID) => {

  let data = {};
  data['zIndex']=150; 
  data['height']=items.metadata.height<480?(items.metadata.height)*1+80:480;
  data['width']=(items.metadata.width)*1+80; 
  data['props']={title:"Options", id: _ID, item:items};
  data['content'] = DialogVideoFile; 
  //console.log(data)
  OpenModal(dispatch,data);
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
    loadHLSdataByUrl(item["netflixId"], dispatch, updKV);
    //_state["route_history"].push({pathname:`/player`,search:`?v=${item["id"]}` });
}

  const _addVideo = (items, _ID) => {
    let data = {};
    data['zIndex']=150;
    data['observeResize']=true;
    data['props']={title:"", id: _ID, items:items};
    data['content'] = AddVideo; 
    //console.log(data)
    OpenModal(dispatch,data);
  }

  const _getThumbnail = (url) => {
    getThumbnail(url,dispatch);
  }



  return { 
    observeImage,
    observeChanges,
    _openPlayer,
    forms, 
    updForms, 
    dispatch,
    keys,
    OpenOptions,
    _addVideo,
    fileVideoSearch,
    videoSearch,
    _getVideoFiles,
    _getVideosSearch,
    _getVideosById,
    _getThumbnail
  }
}




  let lastSearch = 0;

  const handleSearch= (e,operationType,_searchProducts) => {
  let _now = (new Date()).getTime();
      lastSearch = _now;
      let _q_ = e;
      setTimeout(()=>{
        if(_now-lastSearch>=0){         
          _searchProducts(_q_, operationType);
        }
      },500)
     return true;
  }
  
  





const TitleDetails = (props) => {
  const { 
    _openPlayer,
    _getVideosById,
    _getThumbnail,
    observeImage,
    observeChanges
  } = useObserveChanges();

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;
  
  const [initialize, setInitialize] = useState(false);

 

  const [view, setView] = useState(0);
  const [bPID, setbPID] = useState(0);
  


  let searchHash = window.location.search.split('?')[1]?window.location.search.split('?')[1]:null;
 
  const router = _Util.parseQuery(searchHash);

  let _ID = router.v;

  let details = _state['detailVideoByID'];

  let _similarList = _state['similarList'];
  if(_similarList && _similarList[_ID]){
    delete _similarList[_ID];
  }


  let deliveryMedia = details && details["delivery"];
  let duration = deliveryMedia && deliveryMedia["duration"];
  let quality = deliveryMedia && deliveryMedia["quality"];
  let bookmarkPosition = details && details["bookmarkPosition"];
  let bookmarkPositionID = bookmarkPosition  && bookmarkPosition["id"];
  let bookmarkPositionPercent = 0;
  if(bookmarkPositionID && bookmarkPosition["duration"]>0){
    bookmarkPositionPercent = (bookmarkPosition["timeline"] / bookmarkPosition["duration"])*100;
    // duration = bookmarkPosition && bookmarkPosition["duration"];
  }

 

  
  useEffect(() => {
    if(!initialize){
      setInitialize(true);
      setTimeout(()=>{
        setView(1);        
        _getVideosById(_ID);
      },250)
      //_getVideosSearch("taxi","videoSearch");
    }
    
    if(details && !bookmarkPositionID && bPID!==bookmarkPositionID){
      _updbookmarkPosition(bookmarkPositionID);
      setbPID(bookmarkPositionID)
    }
  });
  

  const _updbookmarkPosition = (d) => {
    
    let NewBmP = {};
    NewBmP["started"] = false;
    NewBmP["completed"] = false;
    NewBmP["timeline"] = 0;
    NewBmP["duration"] = 0;
    if(_ID){
      if(d){
        NewBmP["id"] = d;
      }
      else{
        NewBmP["id"] = "5y345674";
      }
      NewBmP["videoId"] = _ID;
      updTimebyVideoId(NewBmP);
    }
  }


let outerWidth = _state["outerWidth"];

let tabs = _Util.getTabs(outerWidth);

let  __similarListGruop = _Util.groupByTabs(_similarList,tabs)


let item = details && details["id"]===_ID?details:null ;


const openPlayer = () => {
  _openPlayer(item);
}

let _title =item && item["title"]?item["title"]:"";
let _boxarts = item && item["boxarts"]?item["boxarts"]:"";
let _src = item && "";
if(item && _boxarts.toString().indexOf("jpg")<=0){
  _src = _boxarts;
}




var _thumbnailJson = _state['thumbnailJsonBlob'] && _state['thumbnailJsonBlob'][_src];
let _blob = _thumbnailJson ? _thumbnailJson['blob'] : "";
if(!_blob){
  _getThumbnail(_src);
}



let _TYPES = item && item["type"];
let isPlayable = _TYPES==="movie" || _TYPES==="episode" ?true:false;

const genresList = _Util.getGenres();



let _genres = item && item['genres'] && item['genres'].length>0 && parseGenres(genresList,item['genres']); 


const goTitleDetails = (d) => {
  _getVideosById(d);
  props.history.push({pathname:`/title`,search:`?v=${d}` });
  window.scrollTo(0,0);
}

const [viewContent, setViewContent] = useState(0);


  let yy = {
    backgroundImage: `url(${_blob})`, 
    zIndex: 2, 
    opacity: 1, 
    transitionDuration: '750ms'
  }



  /*

  const [seasonIndex, setSeasonIndex] = useState(false);
  const [label, setLabel] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploadID] = useState(_Util.gen12CodeId());
  let inputFileStyle ={opacity:`0`,height:`100%`,width:`100%`}  ;  


*/


  const [seasonId, setSeasonID] = useState(null);

  
  let seasonsList = item && item["seasons"] && item["seasons"];
  let seasonsListInit = seasonsList && seasonsList[0] && seasonsList[0]["id"];
  let seasonsListObj = seasonsList && _Util.convertArray2Obj(seasonsList);


  if(seasonId){
    seasonsListInit = seasonId;
  }


  /*

  lastEpisode {
    episodeId,
    episodeNumber,        
    seasonId
  }

  */


  let lastEpisode =  item && item["lastEpisode"] ;
  let lastSeasonIDWatched  = lastEpisode && lastEpisode["seasonId"];
  let lastEpisodeID  = lastEpisode && lastEpisode["episodeId"];
  let lastSeasonWatched =  lastSeasonIDWatched && seasonsListObj[lastSeasonIDWatched]

 

 


  let episodesList = seasonsListObj && seasonsListObj[seasonsListInit] && seasonsListObj[seasonsListInit]["episodes"]?seasonsListObj[seasonsListInit]["episodes"]:[]
 
  let episodesListObj = episodesList && _Util.convertArray2Obj(episodesList);


  let lastEpisodeWatched =  lastEpisode && lastEpisodeID && episodesListObj && episodesListObj[lastEpisodeID]

  let lastEpisodeVideo =  lastEpisode && lastEpisode["episodeId"] && episodesListObj && episodesListObj[lastEpisode["episodeId"]] && episodesListObj && episodesListObj[lastEpisode["episodeId"]]["videoRefDetails"];
  
  
  let EpisodeBookmarkPosition =  lastEpisodeVideo && lastEpisodeVideo["bookmarkPosition"];

  
  let EpisodeBookmarkPositionID = EpisodeBookmarkPosition  && EpisodeBookmarkPosition["id"] && EpisodeBookmarkPosition["id"];



  
  const updSeason = (d) => {
    setSeasonID(d);
  }


    return (
      <>
      <IconSymbol/>   
    
      <div className={`mainView`}>
      <div id="70118402" className="jawBoneContainer slider-hover-trigger-layer">
        <div className={`background  ${viewContent!==0?"dim":""}`}>
          <div className="jawBoneBackground image-rotator">
            <span>
              <div className="ptrack-content">
                <div className="image-rotator-image " style={yy}>
                       
                </div>
              </div>
            </span>
          </div>
          {/*
          
            <div style={{height: 0, width: 0, display: _blob?"none":"block"}}>
        <LazyImage src={`${_src}`}/>  
      </div>
      
          <div className="nfp nf-player-container notranslate inactive NFPlayer VideoMerchPlayer VideoMerchPlayer--visible VideoMerchPlayer--in-jaw" tabindex="-1">
            <div className="VideoContainer" aria-hidden="true" role="presentation" data-uia="player" data-videoid="81038744">
              <div style="position: relative; width: 100%; height: 100%; overflow: hidden;">
                <div id="81038744" style="position: relative; width: 100%; height: 100%; overflow: hidden;">
                  <video src="blob:https://www.netflix.com/2713e3e6-55c6-4657-b8c6-3e35f568c5be" style=""></video>
                  <div className="player-timedtext" style="position: absolute; left: 0px; top: 15px; right: 0px; bottom: 15px; display: block; direction: ltr;">
                    <div className="player-timedtext-text-container" style="display: block; white-space: nowrap; text-align: center; position: absolute; left: 39.0879%; bottom: 10%;">
                      <span style="font-size:15px;line-height:normal;font-weight:normal;color:#ffffff;text-shadow:#000000 0px 0px 7px;font-family:Netflix Sans,Helvetica Nueue,Helvetica,Arial,sans-serif;font-weight:bolder">(ALARM BEEPING)</span></div>
                                           
                  </div>
                </div>
              </div>
            </div>
            <div className="PlayerControlsNeo__layout PlayerControlsNeo__layout--inactive">
              <div className="PlayerControlsNeo__all-controls">
                <div className="PlayerControlsNeo__gradient-top"></div>
                <div className="PlayerControlsNeo__gradient-bottom"></div>
                <div className="PlayerControlsNeo__core-controls">
                  <div data-uia="nfplayer-bottom-controls" className="PlayerControlsNeo__bottom-controls PlayerControlsNeo__bottom-controls--faded">
                      <div className="PlayerControlsNeo__progress-control-row PlayerControlsNeo__progress-control-row--row-standard">
                        <div className="PlayerControlsNeo__progress-container"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          */}
            <div className="vignette"></div>
            <div className="nav-shadow"></div>
          </div>

          <div className="jawBone">
            <div className="_dsplFlx">
              <h1>
                <a className="jawbone-title-link active">
                <div className="title has-jawbone-nav-transition">
                    <h1 className={"_h1_title"}>{_title}</h1>
                  </div>                
                </a>
              </h1>
              <div className="viewContainer"  tabindex="-1" style={{"opacity": viewContent === 1?1:0}}>                 
                {viewContent === 1 &&                                
                <DROPBTN
                  icon={`more_vert`} 
                  keyCode={16}
                  form={'_season2Watch_'} 
                  field={`seasons`}
                  list={seasonsList} 
                  title={'Temporadas'} 
                  theme={'dark'}
                  OnSelect={(e)=>updSeason(e)}
                  initvalue={seasonsListInit}
                />
              }
              </div>
            </div>
            {item && 
            <div className="jawBoneCommon">
              <div className="jawBonePanes">
                <div className="jawBonePane" id="pane-Overview" tabindex="-1" style={{"opacity": 1, transitionDuration: "300ms"}}>
                  <div className="ptrack-container"><div>
                  <div className="viewContainer"  tabindex="-1" style={{"opacity": viewContent === 0?1:0}}>
                  {viewContent === 0 && 
                  
                  <div className="overview">
                    <div className="ptrack-content" >
                      <div className="jawbone-overview-info has-jawbone-nav-transition">
                        <div className="meta video-meta ">
                          {false && <span className="match-score-wrapper no-rating">
                            <div className="show-match-score rating-inner">
                              <div className="meta-thumb-container thumb-down">
                                <svg className="svg-icon svg-icon-thumb-down-filled thumb thumb-down-filled" focusable="true">
                                  <use filter="" xlinkHref="#thumb-down-filled"></use>
                                </svg>
                              </div>
                              <div className="meta-thumb-container thumb-up">
                                <svg className="svg-icon svg-icon-thumb-up-filled thumb thumb-up-filled" focusable="true">
                                  <use filter="" xlinkHref="#thumb-up-filled"></use>
                                </svg>
                              </div>
                            </div>
                            
                          </span>
                          }
                          <div className="show-match-score rating-inner">
                            <span className="match-score">{item["year"]}</span>
                          </div>
                          <span className="year">{""}</span>
                          {quality?
                          <span className="maturity-rating ">
                              <span className="maturity-number">{quality?quality:""}</span>
                          </span>
                          :null
                          }
                          {  item  &&  isPlayable && duration  ?
                            <span className="duration">{ parse2Duration(duration)}</span>
                            : 
                            <span className="summary">{seasonsList.length && seasonsList.length>0 ? seasonsList.length===1 ?`1 Temporada`:`${seasonsList.length} Temporada`:""}</span>   
                          }
                        </div>
                        <div className="video-title"></div>
                        {bookmarkPositionID &&  bookmarkPosition["duration"]>0 ?
                        <div className="watched">
                          <div className="progress ">
                            <span className="progress-bar">
                              <span role="presentation" className="progress-completed" style={{"width": bookmarkPositionPercent + "%"}}></span>
                            </span>
                              <span className="summary">{parse2Minutes(bookmarkPosition["timeline"])}&nbsp;de&nbsp;{parse2Minutes(bookmarkPosition["duration"])}min</span>
                          </div>                         
                        </div>
                        :null
                        }
                         {lastSeasonWatched && lastEpisodeWatched ?
                          <div className="watched">
                            {EpisodeBookmarkPositionID ?
                            <div className="progress ">
                              <span className="progress-bar">
                                <span role="presentation" className="progress-completed" style={{"width": (EpisodeBookmarkPosition["timeline"]/EpisodeBookmarkPosition["duration"])*100 + "%"}}></span>
                              </span>
                              <span className="summary">{parse2Minutes(EpisodeBookmarkPosition["timeline"])}&nbsp;de&nbsp;{parse2Minutes(EpisodeBookmarkPosition["duration"])}min</span>
                            </div>
                            :null}
                            <div class="episodeTitle">
                              <span>
                                <b>T{lastSeasonWatched["number"]}:E{lastEpisode["episodeNumber"]}</b>
                                {lastEpisodeVideo?`"${lastEpisodeVideo["title"]}"`:""}
                              </span>                              
                            </div>
                          </div>
                          :null
                          }
                        
                        <div className="synopsis">{item["synopsis"] }</div>
                        <div className="jawbone-actions">
                          { deliveryMedia["mediaID"] && duration ?
                          <a trackid="14277281" data-uia="play-button" role="link" aria-label="Reanudar" className=" playLink">
                            <span tabindex="-1" className="nf-icon-button nf-flat-button nf-flat-button-primary nf-flat-button-uppercase" data-uia="" onClick={()=>openPlayer()}>
                              <span className="nf-flat-button-icon nf-flat-button-icon-play"></span>
                              <span className="nf-flat-button-text">{bookmarkPositionID && bookmarkPosition["timeline"]>0?"REANUDAR":"REPRODUCIR"}</span>
                            </span>
                          </a> : null
                          }
                          
                          <div className="ptrack-content" >
                            <a tabindex="0" className="nf-icon-button nf-flat-button mylist-button nf-flat-button-uppercase" aria-label="Agregar a Mi lista" role="link" data-uia="myListButton">
                              <span className="nf-flat-button-icon nf-flat-button-icon-mylist-add"></span><span className="nf-flat-button-text">Mi lista</span>
                            </a>
                          </div>
                          <span className="thumbs-container">
                            <div className="thumbs-component thumbs thumbs-horizontal animated unrated" data-uia="thumbs-container">
                              <div className="nf-svg-button-wrapper thumb-container thumb-up-container " data-uia="">
                                <a role="link" data-rating="1" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar abajo">
                                  <Icons 
                                    name={'thumb_up_outline'} 
                                    color={"#555"} 
                                    size={24}
                                  />
                                </a>
                              </div>
                              <div className="nf-svg-button-wrapper thumb-container thumb-down-container " data-uia="">
                                <a role="link" data-rating="1" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar abajo">
                                  <Icons 
                                    name={'thumb_down_outline'} 
                                    color={"#555"} 
                                    size={24}
                                  />
                                </a>
                              </div>
                            </div>
                          </span>
                        </div>
                        <div className="meta-lists">
                          {/*<p className="cast inline-list" label="Protagonistas:">
                            <span className="list-label">Protagonistas:</span>
                            <span className="list-items">
                              <a href="/browse/person/165023">Ryan Phillippe</a>, <a href="/browse/person/28079">Omar Epps</a>, <a href="/browse/person/30135885">Cynthia Addai-Robinson</a>
                            </span>
                        </p>*/}
                          {_genres &&  _genres["txt"] && _genres["list"].length>0 &&
                          <p className="genres inline-list" label="Géneros:">
                            <span className="list-label">Géneros:</span>
                            <span className="list-items">
                              { _genres["list"].map((gnr,in_gnr)=>{
                                return(
                                  <>
                                  <NavLink key={in_gnr} to={{pathname:`/genre`,search:`?g=${gnr["id"]}`}} >
                                  {gnr["name"]}
                                  </NavLink>
                                  {in_gnr===_genres["list"].length-1?"":", "}
                                  </>
                                )
                              })}
                            </span>
                          </p>
                          }
                          {/*
                          <p className="tags inline-list" label="Este título es:">
                            <span className="list-label">Este título es:</span>
                            <span className="list-items"
                            ><a href="/browse/genre/2975854">Enérgico</a>
                          </span>
                        </p>*/}
                      </div>
                      </div>
                    </div>
                    <div className="jaw-play-hitzone" role="presentation"></div>
                  </div>
                   }
                  </div>
                  <div className="viewContainer"  tabindex="-1" style={{"opacity": viewContent === 1?1:0}}>
                  {viewContent === 1 &&  
                    <div className="overview">
                    <div className="ptrack-content" >
                    
                      <div className="jawbone-overview-info has-jawbone-nav-transition">
                        <div className={`rowContainer  ${view && 'visible'}`} id={`${_state["keys"][73]}_rowContainer`}>
                          <div className={'_dsplFlx rowContent'}>                            
                            <CarouselHRM  keyCode={_state["keys"][73]}>
                            {
                              episodesList &&  episodesList.map(ep=>{ 
                                  let mv = ep.videoRefDetails;                                 
                                                                   
                                  let _title = mv && mv["title"]?mv["title"]:"";
                                  let _artboxs = mv && mv["interestingMoment"]?mv["interestingMoment"]:"";
                                  let _duration = mv && mv["duration"]?mv["duration"]:"";
                                  let _synopsis = mv && mv["synopsis"]?mv["synopsis"]:"";
                                  let _playable = mv && mv["netflixId"]?mv["netflixId"]:"";
                                return (
                                  <EpisodeItem  title={_title} id={mv && mv["id"]} mv={mv} number={ep["number"]} src={_artboxs} duration={_duration} synopsis={_synopsis} playable={_playable} key={_Util.gen12CodeId()}/>
                                )
                                
                              })
                            }
                            </CarouselHRM>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="jaw-play-hitzone" role="presentation"></div>
                  </div>
                  }
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
        {item  &&  !isPlayable &&
        <ul className="menu" role="tablist">
          <li className={`Overview ${viewContent===0?"current":""} `} id="tab-Overview" onClick={()=>setViewContent(0)}>
            <a role="link" tabindex="0">DESCRIPCIÓN GENERAL</a>
            <span></span>
          </li>
          
          <li className={`Overview  MoreLikeThis ${viewContent===1?"current":""}`}  id="tab-MoreLikeThis"  onClick={()=>setViewContent(1)}>
            <a role="link" tabindex="0">EPISODIOS</a>
            <span></span>
          </li>
         
        </ul> 
        }
      </div>
      {false && <div className="global-supplemental-audio-toggle">
        <div className="nf-svg-button-wrapper" data-uia="">
          <a role="link" tabindex="0" className="nf-svg-button simpleround" aria-label="Activar el audio">
            <svg className="svg-icon svg-icon-audio-off" focusable="true"><use filter="" xlinkHref="#audio-off"></use></svg>
          </a>
        </div>
      </div>
      }
    </div>

      <div className={"_similarContent"}>        
        <h1 className="">{'Similares'}</h1>  
        <div className={"_similar_List_"}>
          {__similarListGruop &&  _Util.ObjectKeys(__similarListGruop).map((_grPid,_grPid_ind)=>{
            return(
              <LolomoRow  data={__similarListGruop[_grPid]}  keyCode={_state.keys[_grPid_ind+35]}  hoverEffect={true}  goTitleDetails={(e)=>goTitleDetails(e)} nonSlide={true}  key={_Util.gen12CodeId()}/>
            )
          })}
        
        </div>
      </div>
        <style>
          {dep_style}
        </style> 
        </div>
      </>
    );
  
}  




const parse2Minutes = (s) =>{
 return Math.floor(s/60);
}



const parse2Duration = (s) =>{
  let factor = 60;
  if(s/60>300){
    factor = 60000;
  }
  let min = Math.floor(s/factor);
  
  let hour = Math.floor(min/60);
  let re =  `${hour>0?`${hour} h`:""} ${hour>0?(min-(hour*60)):min }min`;
  return re;
 }
 




export default withRouter(withRedux(TitleDetails))



const dep_style = `


.viewContainer {
  opacity: 0;
  -webkit-transition: opacity 150ms linear 350ms;
  -o-transition: opacity 150ms linear 350ms;
  -moz-transition: opacity 150ms linear 350ms;
  transition: opacity 150ms linear 350ms;
  outline: none;
}



._similarContent{
    padding:0px 12px;
    margin: 25px 5px 0; 
}


._similarContent h1 {
  padding: 0px 1px 0 30px;
  font-size: 2.7vw;
  color: #fff;
}


.jawBoneContainer .background.dim {
  opacity: 0.2;
}

`







function parseGenres(g,gA){
  let ff = {txt:'', list:[]}
  gA && gA.map((_g,i5)=>{
    if(g && _g && g[_g] && g[_g]['name']){
      ff['txt'] += (i5>0?", ":"").concat(g[_g]['name']);
      ff['list'].push({id:_g, name:g[_g]['name']});
    }
  })
  return ff;
}



/*



<button class="button-primary medium hasLabel ltr-6gmfhw" type="button">
  <div class="icon ltr-1e4713l">
    <div class="medium ltr-sar853" role="presentation">
      <svg viewBox="0 0 24 24">
        <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
      </svg>
    </div>
  </div>
  <div class="ltr-1i33xgl" style={{"width": "calc(0.72rem)"}}></div>
  <span class="ltr-18i00qw">Reproducir</span>
</button>


<div id="70118402" className="jawBoneContainer slider-hover-trigger-layer">
<div className="background">
<div className="jawBoneBackground image-rotator">
<span>
<div className="ptrack-content" style="background-image: url(&quot;https://occ-0-7-6.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVZaDY8f6sg2kqzaCwbskhIyY5ws6aXW2Y8E94d9hCNkssC2NfXgrq-UEac9k5pUYhick0iBJl3SWlkLDSiz-FWtRn9_.webp?r=338&quot;); z-index: 2; opacity: 1; transition-duration: 750ms;">

</div></div></span></div><div className="nfp nf-player-container notranslate inactive NFPlayer VideoMerchPlayer VideoMerchPlayer--visible VideoMerchPlayer--in-jaw" tabindex="-1"><div className="VideoContainer" aria-hidden="true" role="presentation" data-uia="player" data-videoid="81038744"><div style="position: relative; width: 100%; height: 100%; overflow: hidden;"><div id="81038744" style="position: relative; width: 100%; height: 100%; overflow: hidden;"><video src="blob:https://www.netflix.com/2713e3e6-55c6-4657-b8c6-3e35f568c5be" style=""></video><div className="player-timedtext" style="position: absolute; left: 0px; top: 15px; right: 0px; bottom: 15px; display: block; direction: ltr;"><div className="player-timedtext-text-container" style="display: block; white-space: nowrap; text-align: center; position: absolute; left: 39.0879%; bottom: 10%;"><span style="font-size:15px;line-height:normal;font-weight:normal;color:#ffffff;text-shadow:#000000 0px 0px 7px;font-family:Netflix Sans,Helvetica Nueue,Helvetica,Arial,sans-serif;font-weight:bolder">(ALARM BEEPING)</span></div></div></div></div></div><div className="PlayerControlsNeo__layout PlayerControlsNeo__layout--inactive"><div className="PlayerControlsNeo__all-controls"><div className="PlayerControlsNeo__gradient-top"></div><div className="PlayerControlsNeo__gradient-bottom"></div><div className="PlayerControlsNeo__core-controls"><div data-uia="nfplayer-bottom-controls" className="PlayerControlsNeo__bottom-controls PlayerControlsNeo__bottom-controls--faded"><div className="PlayerControlsNeo__progress-control-row PlayerControlsNeo__progress-control-row--row-standard"><div className="PlayerControlsNeo__progress-container"></div></div></div></div></div></div></div><div className="vignette"></div><div className="nav-shadow"></div></div><div className="jawBone"><h1><a className="jawbone-title-link active" href="/title/70118402"><div className="title has-jawbone-nav-transition"><img alt="Agente Salt" className="logo" src="https://occ-0-7-6.1.nflxso.net/dnm/api/v6/AwfSa8TtJlDHJjLcbE--NI7p5gU/AAAABeJTO0vwW4TuKAqU_rcy6qLXDFVxYsXx0uAYPgpynvIqqotg6dRITMSrM30L8NijfUlLi7SNPG1oOrI_7-BiZw7ePobRWQik1g.webp?r=19c"></div></a></h1><div className="jawBoneCommon"><div className="jawBonePanes"><div className="jawBonePane" id="pane-Overview" tabindex="-1" style="opacity: 1; transition-duration: 300ms;"><div className="ptrack-container"><div><div className="overview"><div className="ptrack-content" data-ui-tracking-context="%7B%22rank%22:0,%22row%22:0,%22video_id%22:70118402,%22track_id%22:14277281,%22appView%22:%22jawboneOverview%22,%22parent_context%22:%7B%22row%22:-1,%22rank%22:-1%7D%7D" data-tracking-uuid="3210ab97-6632-431b-b7e6-fd3208dc9fcb"><div className="jawbone-overview-info has-jawbone-nav-transition"><div className="meta video-meta "><span className="match-score-wrapper no-rating"><div className="show-match-score rating-inner"><div className="meta-thumb-container thumb-down"><svg className="svg-icon svg-icon-thumb-down-filled thumb thumb-down-filled" focusable="true"><use filter="" xlinkHref="#thumb-down-filled"></use></svg></div><div className="meta-thumb-container thumb-up"><svg className="svg-icon svg-icon-thumb-up-filled thumb thumb-up-filled" focusable="true"><use filter="" xlinkHref="#thumb-up-filled"></use></svg></div></div></span><span className="year">2010</span><span className="maturity-rating "><span className="maturity-number">PG-13</span></span><span className="duration">1 h 40&nbsp;min</span></div><div className="video-title"></div><div className="watched"><div className="progress "><span className="progress-bar"><span role="presentation" className="progress-completed" style="width: 17%;"></span></span><span className="summary">17&nbsp;de&nbsp;100m</span></div></div><div className="synopsis">Acusada de traición, una agente de la CIA se da a la fuga para probar su inocencia y limpiar su nombre.</div><div className="jawbone-actions"><a trackid="14277281" data-uia="play-button" role="link" aria-label="Reanudar" className=" playLink" href="/watch/70118402?trackId=14277281&amp;tctx=0%2C0%2Ce5213a48-e859-4fa9-bc5b-a3b30256af3a-427610675%2C%2C"><span tabindex="-1" className="nf-icon-button nf-flat-button nf-flat-button-primary nf-flat-button-uppercase" data-uia=""><span className="nf-flat-button-icon nf-flat-button-icon-play"></span><span className="nf-flat-button-text">REANUDAR</span></span></a><div className="ptrack-content" data-ui-tracking-context="%7B%22lolomo_id%22:%22unknown%22,%22list_id%22:%22unknown%22,%22location%22:%22homeScreen%22,%22rank%22:0,%22request_id%22:%22e5213a48-e859-4fa9-bc5b-a3b30256af3a-427610675%22,%22row%22:0,%22track_id%22:14277281,%22video_id%22:70118402,%22supp_video_id%22:1,%22appView%22:%22addToMyListButton%22,%22usePresentedEvent%22:true,%22parent_context%22:%7B%22row%22:-1,%22rank%22:-1%7D%7D" data-tracking-uuid="f69e350d-93a5-4f7e-b1cb-ac1736cd0d06"><a tabindex="0" className="nf-icon-button nf-flat-button mylist-button nf-flat-button-uppercase" aria-label="Agregar a Mi lista" role="link" data-uia="myListButton"><span className="nf-flat-button-icon nf-flat-button-icon-mylist-add"></span><span className="nf-flat-button-text">Mi lista</span></a></div><span className="thumbs-container"><div className="thumbs-component thumbs thumbs-horizontal animated unrated" data-uia="thumbs-container"><div className="nf-svg-button-wrapper thumb-container thumb-up-container " data-uia=""><a role="link" data-rating="2" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar arriba"><svg data-rating="2" className="svg-icon svg-icon-thumb-up" focusable="true"><use filter="" xlinkHref="#thumb-up"></use></svg></a></div><div className="nf-svg-button-wrapper thumb-container thumb-down-container " data-uia=""><a role="link" data-rating="1" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar abajo"><svg data-rating="1" className="svg-icon svg-icon-thumb-down" focusable="true"><use filter="" xlinkHref="#thumb-down"></use></svg></a></div></div></span></div><div className="meta-lists"></div></div></div><div className="jaw-play-hitzone" role="presentation"></div></div></div></div></div></div></div><ul className="menu" role="tablist"><li className="Overview current" id="tab-Overview"><a role="link" tabindex="0">DESCRIPCIÓN GENERAL</a><span></span></li><li className="MoreLikeThis" id="tab-MoreLikeThis"><a role="link" tabindex="0">MÁS SIMILARES</a><span></span></li><li className="ShowDetails" id="tab-ShowDetails"><a role="link" tabindex="0">DETALLES</a><span></span></li></ul></div><div className="global-supplemental-audio-toggle"><div className="nf-svg-button-wrapper" data-uia=""><a role="link" tabindex="0" className="nf-svg-button simpleround" aria-label="Activar el audio">
<svg className="svg-icon svg-icon-audio-off" focusable="true"><use filter="" xlinkHref="#audio-off"></use></svg></a></div></div></div>

*/