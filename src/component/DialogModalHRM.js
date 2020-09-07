
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CloseWatchDialog, getComponentStore, getThumbnail, loadHLSdataByUrl, getMoviesById, updTimebyVideoId } from '../actions/common'

import './_styles.css';

import * as _Util from '../store/Util'
import { Icon2 } from './Icons'
import MoreLikeThis from './MoreLikeThis';
import EpisodesList from './Episodes';

import {TitleProgress, PlayButton, IconButton, IconButtonLoading, PlayButtonLoading } from './Buttons';



var dataH = {}



const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeComponent);  
  const dispatch = useDispatch()
  const close = (Id) => {
    dataH[Id]["isTitleDetail"] = false; 
    CloseWatchDialog(dispatch,{id:Id});
  }

  const _getVideosById= (q,operation) => {
    getMoviesById(q, dispatch, operation);
  }
  
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
        let bookmarkPosition
        if(item && item["type"]==="movie"){
            let bP = item && item["currentEpisode"];
            let _bookmarkPositionID = bP && _Util.ObjectKeys(bP)[0];
            let ctVideo = _bookmarkPositionID && bP[_bookmarkPositionID];
            bookmarkPosition = ctVideo && ctVideo["bookmarkPosition"];
        }else{
            let bP = item && item["bookmarkPosition"];
            let _bookmarkPositionID = bP && _Util.ObjectKeys(bP)[0];
            bookmarkPosition = _bookmarkPositionID && bP[_bookmarkPositionID];
        }
        let bookmarkPositionID;
        let bookmarkPositionTimeline;
        if(bookmarkPosition){
            bookmarkPositionID = bookmarkPosition && bookmarkPosition["id"];
            bookmarkPositionTimeline = bookmarkPosition && bookmarkPosition["timeline"];
            //_Util.updPlayerStore("bookmarkPositionID",bookmarkPositionID);
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




  return { observeChanges, close, dispatch, _getVideosById, _openPlayer }
}







const DialogModalHRM = () => {
  const {  observeChanges} = useObserveChanges();
  const list = getComponentStore()['listWathDialog'] || {};
  var _list = Object.keys(list); 
  return (
            <>       
            {
              _list.map((dg)=>{               
                var dlg = list[dg];                
                if(dlg && dlg.visible){                
                    return (                      
                        <DialogModalDetails 
                            dlg={dlg}
                            dg={dg}
                            //updTitleDetail={(v)=>updTitleDetail(v)}
                        />
                    ) 
                }
                else{
                    return null
                }
              })
            }          
            </>
         )
}

export default DialogModalHRM;















const DialogModalDetails = (props) => {
    const {  observeChanges, close, dispatch, _getVideosById, _openPlayer } = useObserveChanges();
    
    const {  dg, dlg } = props;
    let keys = _Util.getGlobalsKeys()
    let _state = _Util.getStore();
  
    const [initialize, setInitialize] = useState(false);  
    
    const [obs, setObs] = useState(0);  
    

    const [initImg, setinitImg] = useState(false);  

    const [seasonList, setSeasonList] = useState(false);  
    
  
   
    let data = dlg.data
    
    let item =  _state["detailVideoByID"] || data.item;

    if(item && item["type"] && item["type"]==="show" && !seasonList){
        setSeasonList(true)
        let Qry = {
            params:{id:item.id},
            fields:[
                "id",
              {
                "name":"seasonList",
                query:"getSeasons",
                fields:[ 
                  "name", 
                  "id", 
                  "shortName",
                  {
                    "name":"episodeList",
                    query:"getEpisodes",
                    fields:[ 
                      "title", 
                      "id", 
                      "episode", 
                      "season", 
                      "synopsis",
                      "seasonParent",
                      "videoAncestor",
                      "interestingMoment",
                      {
                        "name":"bookmarkPosition",
                        query:"getBookmarkPosition",
                        fields:[ 
                            "completed",
                            "duration",
                            "started",
                            "timeline"
                        ]
                      }
                    ]
                  }
                ]
              }
            ],
            query:"getMoviesbyId"
        };
        _getVideosById(Qry, "seasonsbyVideoByID");
    }
  


    let searchHash = window.location.hash.split('?')[1]?window.location.hash.split('?')[1]:null;
 
  
    const router = _Util.parseQuery(searchHash);
    let _idRoute = router.title;

    let {top,left} = data.dmz || {};    
    let isTd = dataH && dataH[dg] && dataH[dg]["lastScroll"];   

    let _top = top;
    if(dlg.action==="showing" && isTd){
        _top = top-dataH[dg]["lastScroll"];
    }
    
    
    let _style = { 
        width:0,      
        transform: `translateX(${left}px) translateY(${_top}px) scaleX(0.4) scaleY(0.4) translateZ(0px)`,   
        transition: "opacity 150ms ease, transform 150ms ease, -webkit-transform 150ms ease",                    
        top: 0, 
        left: 0, 
        opacity: 0,
        boxShadow: "rgba(0, 0, 0, 0.75) 0px 3px 10px"
    } 
    if(true){
        _style["width"] = "calc(98vmin - 17px)";
        _style["transform"] = "translateX(calc(50vw - (850px / 2))) translateY(calc( 2em)) scaleX(1) scaleY(1) translateZ(0px)"; 
        _style["boxShadow"] = "rgba(0, 0, 0, 0.75) 0px 3px 10px";
        _style["transition"] = "opacity 450ms ease, transform 450ms ease, -webkit-transform 450ms ease";
        _style["marginBottom"] = "2em";
        _style["minWidth"] = "850px";
        _style["zIndex"] = dlg.zIndex || 180;
        _style["opacity"] = 1;
        _style["top"] = 0;
        _style["left"] = 0;
        _style["boxShadow"] = "rgba(0, 0, 0, 0.75) 0px 3px 10px";
   
    }
  
let _kid = `${keys[74]}_${dg}_d`;
    
if(!dataH[dg]){
    dataH[dg] = {}
}




const closeTitleDetail = (preventRedirect) => {
    let _Elmm =document.getElementById(`data_ui_${keys[93]}`);         
    let _scrollTop =  dataH[dg]["lastScroll"];
    close(dg,false);
    dataH[dg]["isTitleDetail"] = false;
    let timeOut = dataH[dg]["timeOut"];
    if(timeOut){
        clearInterval(timeOut);
        dataH[dg]["timeOut"] = null;
    }
    
    if(preventRedirect){
        _Elmm.style.position = "static";              
        window.scrollTo(0,_scrollTop);
        _Elmm.style.top = null;
        setTimeout(()=>{
            _Util.updStore("detailVideoByID",null)
            _Util.updStore("seasonsbyVideoByID",null)
            _Util.updStore("similarList",null)
        },240);
    }
    else if(_state["route_history"]){ 
        let rd = _state["prevUrl"] || {pathname:'/browse'};
        _state["route_history"].push(rd);
        setTimeout(()=>{  
            _Elmm.style.position = "static";              
            window.scrollTo(0,_scrollTop);
            _Elmm.style.top = null;
            _Util.updStore("detailVideoByID",null)
            _Util.updStore("seasonsbyVideoByID",null)
            _Util.updStore("similarList",null)

        },240);
    }
    
}



const updTitleDetail = (v) => {
    if(typeof props.updTitleDetail === "function"){
        props.updTitleDetail(v)
    }
}




let _isTitleDetail = dlg.isTitleDetail;

/// let imgboxart =  "https://occ-0-7-6.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABV7rdDHkexqFptxAsXRGfePv-KqqUNzlgvwHfH0k5MEsrP3sSVbiQvu5GC7jmHGbNSBhu8ObQEUDkgb0jcpc68p39NlfO3MFywJ__GDtJDneNGqg9tglOpniy78hVKELeWAnGcwU-ZfMYnK6JgVSnsw3FcZKuaWexxo2bU8stFpWkC3PVxJvNr7n.jpg?r=054"


let _idM  = _state["detailVideoByID"] && _state["detailVideoByID"]["id"]?_state["detailVideoByID"]["id"]:item && item["title"]?item["title"]:router && router["title"]?router["title"]:null;


let  _dVID2 = _state["detailVideoByID"];



let _dVID = _idM && _state["storyArtsList"] && _state["storyArtsList"][_idM]?_state["storyArtsList"][_idM]:_dVID2;

let isImgBlob = _state["imageBlob"];
let _src = null;

let defRes = "_665x375";  
let imK2Show = "storyArt"
let _ext = _state["isWebp"]?"webp":"jpg";
let _boxarts = _dVID && _dVID[imK2Show] && _dVID[imK2Show][defRes] && _dVID[imK2Show][defRes][_ext] && _dVID[imK2Show][defRes][_ext]["url"]


let _blob = null;
if(isImgBlob && _boxarts && _Util.isURL(_boxarts)){
    _src = "url?url="+_boxarts;
    var _thumbnailJson = _state['thumbnailJsonBlob'] && _state['thumbnailJsonBlob'][_src];
    let _blobrequested_ =  _thumbnailJson && _thumbnailJson['requested'];    
    _blob = _blobrequested_ ? _thumbnailJson['blob'] : null;   
}
else{
    _blob = _boxarts;
}



if(!initImg && !_blob){
    let _blobrequested_ =  _thumbnailJson && _thumbnailJson['requested'];
    if(isImgBlob && !_blobrequested_ && _src){
        getThumbnail(_src,dispatch);
    }
    setinitImg(true)
    setTimeout(()=>{
        setObs(_Util.gen12CodeId())
    },250)
}






const closeOutside = (v) => { 
    let _evt = _Util.getEventStore();    
    let lastClick =  _evt["click"];
    let _Elmm =document.getElementById(_kid+"dialog"); 
    let timeOut = dataH[dg]["timeOut"];
    if(lastClick && lastClick["target"] &&  _Elmm ){
        let toElement =  lastClick["target"];
        if(timeOut &&  toElement.tagName && _Elmm && _Elmm.contains(toElement)){            
        }else{
            closeTitleDetail();
            clearInterval(timeOut);
            dataH[dg]["timeOut"] = null;
        }
    }
}

let _idK =  dg;  

useEffect(() => {
    if(!initialize){
        let _Elmm =document.getElementById(`data_ui_${keys[93]}`);                        
        _Elmm.style.position = "fixed";    
        let _evt = _Util.getEventStore();                    
        let _scrollTop =  _evt["scrollPosition"];                
        //dataH[dg]["lastScroll"] =  _scrollTop; 
        _Elmm.style.top = _scrollTop*-1+"px"; 
        _Elmm.style.width = "100%"; 
        window.scrollTo(0,0);
        dataH[dg]["lastScroll"] = _scrollTop;
        setInitialize(true);
        updTitleDetail(true)        
        let _id2 = _idRoute || item.id;
        if(_id2 && _state["route_history"]){
            let pathname = _state["route_history"]["location"]["pathname"];            
            _state["route_history"].push({pathname:pathname, search: '?title='+_id2})
            let pU = {pathname:pathname};
            _Util.updStore("prevUrl",pU);
        }
    }
    _Util.updEventStore("click",null);
    if(!dataH[_idK]){
        dataH[_idK] = {}; 
    }
    if(isImgBlob){
        setTimeout(()=>{
            if(!dataH[_idK]["loaded"] && !dataH[_idK]["timeOut"]){
                dataH[_idK]["loaded"] = true;
                dataH[_idK]["timeOut"] = setInterval(()=>{
                    closeOutside();
                },125);
            }
        },800)
    }
    else{
        setInitialize(true);
    }
});



let _type = _state["detailVideoByID"] && _state["detailVideoByID"]["type"];

let episodeLast = null;

let _currentEpisode =  null;
let reduceL = null
if(_type==="show" && _dVID["currentEpisode"]){
    let _currentEpisodeID =  _dVID && _dVID["currentEpisode"] && _Util.ObjectKeys(_dVID["currentEpisode"])[0];
    _currentEpisode =  _dVID && _dVID["currentEpisode"] && _dVID["currentEpisode"][_currentEpisodeID];
    if(_currentEpisode){
        let _seasonsbyVideoByID = _state["seasonsbyVideoByID"];
        let _seasons = _seasonsbyVideoByID && _seasonsbyVideoByID["seasonList"];
        let _currentSeason =  _seasons && _seasons[_currentEpisode["seasonId"]];
        let _currentEpisodeDetail =  _currentSeason && _currentSeason["episodeList"] && _currentSeason["episodeList"][_currentEpisode["episodeId"]];
        reduceL = {
            n: `T${_currentEpisode["seasonNumber"]}:E${_currentEpisode["episodeNumber"] || 1}`,
            t:  _currentEpisodeDetail && _currentEpisodeDetail["title"]?_currentEpisodeDetail["title"]:""
        }
    }
}









    return (                      
        <div id={_kid} className={`focus-trap-wrapper previewModal--wrapper detail-modal`} tabindex="-1">
            <div tabIndex="-1" style={{opacity: 0.857}}>
                <div className="previewModal--backDrop" tabindex="-1" data-uia="previewModal--backDrop"  onClick={()=>closeOutside()}></div>
            </div>
            <div id={_kid+"dialog"} role="dialog" aria-modal="true" tabindex="-1" 
                className={`previewModal--container  detail-modal` }                 
                style={_style}>
                <DetailsImages _blob={_blob} dg={dg} closeTitleDetail={closeTitleDetail} episodeLast={episodeLast}  /> 
                <div className="previewModal-close" data-uia="previewModal-closebtn"  onClick={()=>closeTitleDetail()}>
                    <Icon2 name={'Xclose'} color={'currentColor'} />
                </div>
                <div className="previewModal--info" style={{opacity: 1}}>
                    <DetailsMetadata  dg={dg} reduceL={reduceL}/>
                    <div className="detail-modal-container">
                        {_type==="show"?<EpisodesList _blob={_blob} dg={dg} closeTitleDetail={closeTitleDetail}/>:null}                        
                        <MoreLikeThis _blob={_blob} dg={dg}/>
                        {/*<TrailersAndMore />*/}
                        <AboutDetails />
                    </div>
                </div>
            </div>
        </div>     
   
    )
} 









const DetailsImages = (props) => {

    const {  observeChanges, _openPlayer, dispatch } = useObserveChanges();
    let _state = _Util.getStore();
    const {_blob, episodeLast} = props

    let _dVID = _state["detailVideoByID"];
    
    let _type = _dVID && _dVID["type"];
    let _currentEpisode =  null;
    let _bookmarkPosition = null;
    let _currentEpisodeID;
    if(_type==="show" && _dVID["currentEpisode"]){
        _currentEpisodeID =  _dVID && _dVID["currentEpisode"] && _Util.ObjectKeys(_dVID["currentEpisode"])[0];
        let _ctEpisode =  _dVID && _dVID["currentEpisode"] && _dVID["currentEpisode"][_currentEpisodeID]; 
        if(_ctEpisode){
            _bookmarkPosition = _ctEpisode && _ctEpisode["bookmarkPosition"];       
            let _seasonsbyVideoByID = _state["seasonsbyVideoByID"];
            let _seasons = _seasonsbyVideoByID &&_seasonsbyVideoByID["seasonList"];
            let _currentSeason =  _seasons && _seasons[_ctEpisode["seasonId"]];
            _currentEpisode =  _currentSeason && _currentSeason["episodeList"] && _currentSeason["episodeList"][_ctEpisode["episodeId"]]; 
        }
    }
    else if(_dVID &&  _dVID["currentEpisode"]){
        _currentEpisodeID =  _dVID["currentEpisode"] && _Util.ObjectKeys(_dVID["currentEpisode"])[0];
        let _ctEpisode =  _dVID["currentEpisode"] && _dVID["currentEpisode"][_currentEpisodeID]; 
        _bookmarkPosition = _ctEpisode && _ctEpisode["bookmarkPosition"];    
    }
   
    if(episodeLast){
       // _bookmarkPosition = episodeLast["bookmarkPosition"];
    }
    
    
    const _OpenPlayer = () => { 
        let pathname = _state["route_history"]["location"]["pathname"];            
        let pU = {pathname:pathname, search: '?title='+_dVID.id}
        _Util.updStore("prevUrl",pU);
        setTimeout(()=>{
            if(typeof props.closeTitleDetail === "function"){
                props.closeTitleDetail(true);
            }
        },600)
        dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'goDark',value:true}
        })
        if(_type!=="movie"){
            _openPlayer(_currentEpisode);
        }else{
            _openPlayer(_dVID);
        }
        
    }


    return (
        <div className={`previewModal--player_container  detail-modal show`} data-uia="previewModal--player_container">
            <div className="videoMerchPlayer--boxart-wrapper" style={{position: "static"}}>                       
                <img className={`previewModal--boxart ${_blob ?"show":""}`} src={_blob} style={{opacity: _blob?1:0}} alt=""/>
            </div>                                    
            <div>
                <div className="previewModal--player-titleTreatmentWrapper" style={{opacity: _dVID &&_dVID["id"] ?1:1}}>
                    {_dVID &&_dVID["id"] ?
                    <div className={`previewModal--player-titleTreatment-left previewModal--player-titleTreatment  detail-modal `}>                        
                        <TitleProgress  bookmarkPosition={_bookmarkPosition} />
                        <div className="buttonControls--container" data-uia="mini-modal-controls">
                            <PlayButton clickEvent={_OpenPlayer} bookmarkPosition={_bookmarkPosition} />
                            <IconButton iconName={'plus'} />
                            <IconButton iconName={'thumb_up_ntflx'} />
                            <IconButton iconName={'thumb_down_ntflx'} />
                        </div>
                    </div>
                    :
                    <div className={`previewModal--player-titleTreatment-left previewModal--player-titleTreatment  detail-modal `}>                        
                        <TitleProgress  bookmarkPosition={_bookmarkPosition} />
                        <div className="buttonControls--container" data-uia="mini-modal-controls">
                            <PlayButtonLoading/>
                            <IconButtonLoading />
                            <IconButtonLoading  />
                            <IconButtonLoading  />                            
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
 
}







const _parseGenreData = (gnr) => {
    let data = [];
    let commonPath = "/browse/genre/"
    gnr && _Util.ObjectKeys(gnr).map(gId=>{
        data.push({name:gnr[gId]["name"],path:commonPath+gId})
    })
    return data;
}

const DetailsMetadata = (props) => {
    const {  observeChanges, close, dispatch } = useObserveChanges();
    let _state = _Util.getStore();
   
    const {   reduceL } = props;
    let _dVID = _state["detailVideoByID"];
    let _year = _dVID && _dVID["releaseYear"]?_dVID["releaseYear"]:2020;

    let _type = _dVID && _dVID["type"];
    let _duration = _dVID && _state["detailVideoByID"] && _state["detailVideoByID"]["duration"];
    
    let _synopsis = _dVID && _dVID["synopsis"]?_dVID["synopsis"]:"";
    
    let _genreList = _dVID && _dVID["genreList"]?_dVID["genreList"]:null;
    
    let _genreData = _parseGenreData(_genreList) ;
    
     
    let dataAbout = [        
        {
            data:[
                {name:"Ashley Bornancin",path:"/browse/person/40172204"},
                {name:"Carter Hastings",path:"/browse/person/30202216"}
            ],
            titleId:531
        },
        {
            data:_genreData,
            titleId:532
        },
        {
            data:[
                {name:"Conmovedor",path:"/browse/genre/100045"}
            ],
            titleId:533
        }

     ]


    return (
        <div className={`previewModal--detailsMetadata detail-modal ${true?"_show":""} `} data-uia="previewModal--detailsMetadata">
            <div className={` previewModal--detailsMetadata-left  `}>
                <div className="previewModal--detailsMetadata-info">                    
                    <div data-uia="videoMetadata--container" className="videoMetadata--container">
                        {_type?
                        <div className="videoMetadata--second-line">
                            <div className="year">{_year}</div>
                            <a>          
                                <span className="maturity-rating "><span className="maturity-number">TV-Y</span></span>
                            </a>
                            {_type==="movie"?<span className="duration">{_duration}</span>:null}
                        </div>
                        :
                        <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "120px", height: "25px", borderRadius: "13px"}}/>
                        }
                    </div>
                </div>
                
                
                {reduceL?
                <div class="previewModal-episodeDetails">
                    <b>{reduceL.n}</b> {`"${reduceL.t}"`}
                </div>
                :null}
                <p className="preview-modal-synopsis previewModal--text" data-uia="preview-modal-synopsis">
                {_type?`${_synopsis}`:
                    <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "90%", height: "25px", borderRadius: "13px"}}/>
                }
                </p>
            </div>
            <div className="previewModal--detailsMetadata-right">
                { _type? dataAbout && dataAbout.map(dAb=>{
                    return(
                        <AboutDetailsTags data={dAb.data} titleId={dAb.titleId} />   
                    )
                }):
                <>
                <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "90%", height: "25px", borderRadius: "13px", margin:"20px 0"}}/>
                <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "90%", height: "25px", borderRadius: "13px", marginBottom:"20px 0"}}/>
                </>
               
            }
            </div>
        </div>
    )
 
}





  






const AboutDetails = (props) => {
    const {  observeChanges, close, dispatch } = useObserveChanges();
    
    let _state = _Util.getStore();
    let  _dVID = _state["detailVideoByID"];

    let  _title = _dVID && _dVID["title"];
    let _genreList = _dVID && _dVID["genreList"]?_dVID["genreList"]:null;
    
    let _genreData = _parseGenreData(_genreList);
    

    let dataAbout = [        
        {
            data:[
                {name:"Nubia Barreto",path:"/browse/person/60156459"}
            ],
            titleId:537
        },
        {
            data:[
                {name:"Ana María Estupiñán",path:"/browse/person/30206886"},
                {name:"Carlos Torres",path:"/browse/person/30207431"},
                {name:"Yuri Vargas",path:"/browse/person/60005847"},
                {name:"Jim Muñoz",path:"/browse/person/60046108"},
                {name:"Alina Lozano",path:"/browse/person/30143349"},
                {name:"Valeria Gálviz",path:"/browse/person/40083349"},
                {name:"Mario Duarte",path:"/browse/person/30191244"},
                {name:"Juan Millán",path:"/browse/person/60156699"}
            ],
            titleId:531
        },
        {
            data:_genreData,
            titleId:532
        },
        {
            data:[
                {name:"Emotivo",path:"/browse/genre/26056"},
                {name:"Romántico",path:"/browse/genre/26057"}
            ],
            titleId:533
        }

     ]




    return (
        <div className="ptrack-container">
            <div className="ptrack-content" >
                <div className={`about-wrapper  ${_dVID &&_dVID["id"] ?"_show":""}`}>
                    <div className="about-header">
                        <p className="previewModal--section-header">{`${_Util.translatetext(536)} ${_title || ""}`}</p>
                    </div>
                    <div className="about-container" data-uia="about-container">                        
                        {dataAbout && dataAbout.map(dAb=>{
                            return(
                                <AboutDetailsTags data={dAb.data} titleId={dAb.titleId} />   
                            )
                        })}                  
                        <div className="maturity-rating-wrapper">
                            <span className="title">{`${_Util.translatetext(538)}: `}</span>
                            <span className="maturity-rating ">
                                <a href="https://help.netflix.com/support/2064" className="maturity-number">TV-MA</a>
                                <p className="specificRatingReason">lenguaje inapropiado</p>
                                <p className="maturityDescription">Recomendada para público adulto. No apta para menores de 17 años.</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                                            
    )
 
}





const AboutDetailsTags = (props) => {
    const {data,titleId} = props;
    return(
        <div className="previewModal--tags" data-uia="previewModal--tags">
            <span className="previewModal--tags-label"> {`${_Util.translatetext(titleId)}  `}</span>
            {data && data.map((itm,_index)=>{
                return(
                    <span className="tag-item" data-uia="tag-item">
                        <a href={`${itm["path"]}`}>{`${itm["name"]}${_index<data.length?", ":""}`}</a>
                    </span>
                )
            })}
        </div>
    )
}

