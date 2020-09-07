
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'


import { loadHLSdataByUrl, updTimebyVideoId } from './../actions/common'


import {Icon2} from './Icons';


import {SectionDivider} from './Buttons';


import  './_styles.css';







const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges); 
  const dispatch = useDispatch();
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

    if(item){
        dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:observeChanges,value:_Util.gen12CodeId()}
        })  
        let bP = item && item["bookmarkPosition"];
        let _bookmarkPositionID = bP && _Util.ObjectKeys(bP)[0];
        let bookmarkPosition = _bookmarkPositionID && bP[_bookmarkPositionID];
        let bookmarkPositionID = bookmarkPosition && bookmarkPosition["id"];
        let bookmarkPositionTimeline = bookmarkPosition && bookmarkPosition["timeline"];
        if(bookmarkPosition){
            _Util.updPlayerStore("bookmarkPositionID",bookmarkPositionID);
            _Util.updPlayerStore("bookmarkPositionTimeline",bookmarkPositionTimeline);
        }
        _Util.updPlayerStore("mediaId",item["id"]);
        _Util.updPlayerStore("timelineUpdated",false);
        _Util.updStore("flixSource",'browse');   
        _Util.updPlayerStore("titleName",item["title"]);
        let _state = _Util.getStore();
        
        setTimeout(()=>{
            _state["route_history"].push({pathname:`/watch`,search:`?v=${item["id"]}` });
            loadHLSdataByUrl(item["id"], dispatch, updKV,bookmarkPositionID, bookmarkPositionTimeline, item["id"]);       
        },800)
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
  }
 
  return { observeChanges,  dispatch, _openPlayer }
}


const EpisodesList = (props) => {
    const {  observeChanges } = useObserveChanges(); 
    let _state = _Util.getStore();
    
    
    let _mlt = null; 

    const [collapse, setcollapse] = useState(false);
    const [seasonIdShow, setSeasonIdShow] = useState(null);
    const [dropDownView, setdropDownView] = useState(false);


    let limit = 9   
    
    let _dVID = _state["detailVideoByID"];

    let _seasonsbyVideoByID = _state["seasonsbyVideoByID"];
    let _seasons = _seasonsbyVideoByID &&_seasonsbyVideoByID["seasonList"];
    

    
    let _Id = _dVID && _dVID["id"];



    const closeTitleDetail = (v) => {
      if(typeof props.closeTitleDetail === "function"){
        props.closeTitleDetail(v);
      }
    }
    
    const changeSeason = (v) => {
        if(v!==seasonIdShow){
            setSeasonIdShow(v)
        }
    }
      



    const toogle = () => { 
        if(collapse){
           let hh = document.querySelector('[data-uia="episode-selector"]');
           let dm = hh && _Util.offset(hh);
           let _scrollTop = dm.top;
           window.scrollTo(0,_scrollTop)
        }       
        setcollapse(!collapse)
    }

   




    
    
    let hasEpisodes = false;
    let currentSeason = null;
    let _lastEpisodeNumber = null
    var _seasonsArray = _seasons && _Util.ObjectKeys(_seasons)
    let _currentEpisodeID
    if(_dVID && _seasonsArray && _seasonsArray.length>0){
        let _type = _dVID && _dVID["type"];
        let _currentEpisode =  null;
        if(_type==="show" && _dVID["currentEpisode"]){
            _currentEpisodeID =  _Util.ObjectKeys(_dVID["currentEpisode"])[0];
            _currentEpisode =  _dVID && _dVID["currentEpisode"] && _dVID["currentEpisode"][_currentEpisodeID]; 
        }
        _lastEpisodeNumber = _currentEpisode && _currentEpisode["episodeId"]?_currentEpisode["episodeId"]: null;
        let _lastseasonId = seasonIdShow?seasonIdShow: _currentEpisode && _currentEpisode["seasonId"]?_currentEpisode["seasonId"]:null;
        if(_lastseasonId){
            currentSeason = _seasons[_lastseasonId];
        }else{
            currentSeason = _seasons[_seasonsArray[0]];
        }
        if(currentSeason && currentSeason["episodeList"]){
            _mlt = _Util.sortObjectsByKey(currentSeason["episodeList"],"episode","desc");
        }
        if(collapse){
            limit = _mlt.length;  
        }
        hasEpisodes = true;
      }

        return (
            <div className={`episodeSelector`}  data-uia="episode-selector" >
                {hasEpisodes?
                <div className="episodeSelector-header">
                    <p className="previewModal--section-header episodeSelector-label">{_Util.translatetext(535)}</p>
                    <div className="episodeSelector-dropdown">
                        <div className="ltr-rqgsqp" onBlur={()=>{
                            setTimeout(()=>setdropDownView(false),200)
                            }
                            }>
                            <button 
                                aria-expanded="false" 
                                aria-haspopup="true" 
                                aria-label="dropdown-menu-trigger-button" 
                                className="dropdown-toggle ltr-111bn9j" 
                                data-uia="dropdown-toggle"
                                onClick={()=>setdropDownView(!dropDownView)}
                            >
                                {currentSeason && currentSeason["name"]}
                            </button>
                            {dropDownView?
                            <ul data-uia="dropdown-menu" role="menu" class="ltr-s8mppn">
                                {_seasonsArray && _seasonsArray.map((sId,inS)=>{
                                    let name = _seasons[sId] && _seasons[sId]["name"];
                                    return <li data-index={`${inS}`} data-uia="dropdown-menu-item" role="menuitem" tabIndex={`${inS}`} onClick={()=>changeSeason(sId)} class="ltr-1hkyftk">{name||""}</li>
                                })}
                                
                            </ul>
                            :null}
                        </div>
                    </div>
                </div>
                :null}
                {hasEpisodes?
                <div className={`episodeSelector-container ${hasEpisodes?"_show":""}`}>
                    <div className="episodeSelector-wrapper">
                        {_mlt && _mlt.map((_epId,_inE)=>{
                            let _eps = currentSeason["episodeList"][_epId];
                            if(_eps && _eps["episode"] && _inE<=limit){
                                return(
                                  <EpisodesItem _epsRef={_eps} closeTitleDetail={closeTitleDetail} _lastEpisodeNumber={_lastEpisodeNumber} />
                                )
                            }else{
                                return null;
                            }
                        })}
                        
                    </div>
                    <SectionDivider  collapse={!collapse} toogle={toogle}/>
                </div>
                :<div className="episodeSelector-header" style={{minHeight:"300px"}}>
                    <p className="previewModal--section-header episodeSelector-label">
                        <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "120px", height: "25px", borderRadius: "13px"}}/>
                    </p>
                    <div className="episodeSelector-dropdown">
                        <div className="ltr-rqgsqp">
                            <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "120px", height: "25px", borderRadius: "13px"}}/>
                        </div>
                    </div>
                </div>
                }
            </div>                             
    )
}




export default  EpisodesList





const EpisodesItem = (props) => {
  const {  dispatch, _openPlayer } = useObserveChanges(); 
  let _state = _Util.getStore();
  const {  _epsRef, _lastEpisodeNumber } = props;

  const _OpenPlayer = (item) => { 
    let pathname = _state["route_history"]["location"]["pathname"];            
    let pU = {pathname:pathname, search: '?title='+_state["detailVideoByID"]["id"]}
    _Util.updStore("prevUrl",pU)
    setTimeout(()=>{
        props.closeTitleDetail(true);
    },600);
    dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'goDark',value:true}
    })
    _openPlayer(item);
  }


  
  let indexEpisode = _epsRef["episode"] || _epsRef["indexEpisode"];
  let titleEpisode = _epsRef["title"] || "";
  let synopsisEpisode = _epsRef["synopsis"] || "";
  let bP = _epsRef["bookmarkPosition"] || null;
  let _bookmarkPositionID = bP && _Util.ObjectKeys(bP)[0];
  let bookmarkPosition = _bookmarkPositionID && bP[_bookmarkPositionID];
 
  let durationEpisode = bookmarkPosition && bookmarkPosition["duration"];
  let timelineEpisode = bookmarkPosition && bookmarkPosition["timeline"];
  let defRes =  "_342x192";
  let imK2Show = "interestingMoment";
  let _ext = _state["isWebp"]?"webp":"jpg";
  let _img = _epsRef[imK2Show] && _epsRef[imK2Show][defRes] && _epsRef[imK2Show][defRes][_ext] && _epsRef[imK2Show][defRes][_ext]["url"]
  
  let _blob = _img || props._blob;
  let _prgs = (timelineEpisode || 0 ) / durationEpisode;
  return(
      <div className={`titleCardList--container episode-item ${_epsRef["id"]===_lastEpisodeNumber?"current":""}`} tabindex="0" aria-label={titleEpisode} data-uia="titleCard--container" role="button">
          <div className="titleCard-title_index">{indexEpisode}</div>
          <div className="titleCard-imageWrapper">
              <div className="ptrack-content">
                  <img src={_blob} alt={titleEpisode}/>
              </div>
              <div className="titleCard-playIcon">
                  <div className="titleCard-playSVG" onClick={()=>_OpenPlayer(_epsRef)}>
                      <Icon2   
                          name={'play'} 
                          color={'#555'} 
                      />
                  </div>
              </div>
              {
                _bookmarkPositionID?
                <div className="titleCard-progress">
                    <div className="progressBar" style={{width:_prgs*100+"%"}}/>
                </div>
                :null
              }
              
          </div>
          <div className="titleCardList--metadataWrapper">
              <div className="titleCardList-title">
                  <span className="titleCard-title_text">{titleEpisode}</span>
                  <span className="duration ellipsized">{durationEpisode?parse2Duration(durationEpisode):""}</span>
              </div>
              <p className="titleCard-synopsis previewModal--small-text">{synopsisEpisode}</p>
          </div>
      </div>
  )

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
  
