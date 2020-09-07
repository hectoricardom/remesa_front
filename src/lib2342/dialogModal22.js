



import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CloseWatchDialog, getComponentStore, updComponentStore, getThumbnail, loadHLSdataByUrl, getMoviesById, updTimebyVideoId } from './../actions/common'



import './_style3.css'

import * as _Util from '../store/Util'
import { Icon2 } from './Icons'
import MoreLikeThis from './MoreLikeThis'

import EpisodesList from './Episodes'


var _elmBdy 

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
        let bookmarkPosition = item && item["bookmarkPosition"];
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




  return { observeChanges, close, dispatch, _getVideosById, _openPlayer }
}







const DialogModalHRM = () => {
  const {  observeChanges, close, dispatch } = useObserveChanges();
  const list = getComponentStore()['listWathDialog'] || {};
  const [isTitleDetailView, setisTitleDetailView] = useState(false);
  var _list = Object.keys(list); 
  let keys = _Util.getGlobalsKeys()
  
  const updDialogModalHRM = (ll) => {
    updComponentStore('listWathDialog',ll);
    dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeComponent',value:_Util.gen12CodeId()}
    })
  }



 
  _elmBdy = `data_ui_${keys[93]}`;



  return (
            <>       
            {
              _list.map((dg,indg)=>{               
                var dlg = list[dg];
               
                if(dlg && dlg.visible){
                  var _Style={}
                  var _cldg = cleanbase64(dg);

                  _Style[`--s__${_cldg}_heigth__`]='750px';
                  _Style[`--s__${_cldg}_width__`]='80vw';
                  _Style[`--s__${_cldg}_zIndex__`]=250;
                  _Style[`--overlay__${_cldg}_zIndex__`]=249;    
                  if(dlg.display){ }
                    if(dlg.height){
                      _Style[`--s__${_cldg}_heigth__`]=dlg.height;
                    }
                    if(dlg.width){
                      _Style[`--s__${_cldg}_width__`]=dlg.width; 
                    }
                    if(dlg.zIndex){
                      _Style[`--s__${_cldg}_zIndex__`]=dlg.zIndex;
                      _Style[`--overlay__${_cldg}_zIndex__`]=dlg.zIndex-1;
                    }


                 
                  var ts = {
                    //transform:`translate3d(0, var(--s__${_cldg}_heigth__), 0)`,
                    marginTop:  dlg.height / -2,
                    marginLeft: dlg.width / -2,
                    top:`50%`,
                    left:`50%`,
                    height: dlg.height,
                    width: dlg.width,
                    zIndex: `var(--s__${_cldg}_zIndex__)`
                  };
                  var ovts = {opacity: 1,zIndex: `var(--overlay__${_cldg}_zIndex__)`};
                  let Ach = dlg.content;
                  let cmp2render = null;
                  let data = dlg.data
                  if(dlg.content){
                    cmp2render = React.cloneElement(<Ach/>, {data});
                  }

                  
                let {top,left,width,height} = data.dmz || {};

                  const updTitleDetail = (v) => {                   
                    //let _state = _Util.getStore();
                    let _lt = list;
                    if(!dataH[dg]){
                        dataH[dg] = {};
                    }                    
                    dataH[dg]["isTitleDetail"] = v; 
                    _lt[dg]["isTitleDetail"] = v;  
                    updDialogModalHRM(_lt);
                    if(v){
                        let _Elmm =document.getElementById(`data_ui_${keys[93]}`);                        
                        _Elmm.style.position = "fixed";    
                        let _evt = _Util.getEventStore();                    
                        let _scrollTop =  _evt["scrollPosition"];                
                        //dataH[dg]["lastScroll"] =  _scrollTop; 
                        _Elmm.style.top = _scrollTop*-1+"px"; 
                        _Elmm.style.width = "100%"; 
                        window.scrollTo(0,0)
                    }else{
                        let _Elmm =document.getElementById(`data_ui_${keys[93]}`); 
                        _Elmm.style.position = "static"
                        _Elmm.style.top = null;
                        _Elmm.style.width = null;
                        let _scrollTop =  window.scrollTo(dataH[dg]["lastScroll"]+"px",0)
                        window.scrollTo(0,_scrollTop+"px")
                        
                    }                    
                  }
                
                 
                


                  
                  return (                      
                        <DialogModalDetails 
                            dlg={dlg}
                            dg={dg}
                            updTitleDetail={(v)=>updTitleDetail(v)}

                        />
                   
                    ) 
                }
              })
            }    
             <style >{`
                                
                                .DialogHRM{    
                                    
                                  position: fixed;  /*Stay in place */
                                  z-index: 220; /* Sit on top */
                                  background-color: transparent; /* Black fallback color */
                                  /*background-color: rgba(0,0,0, 0.6); /* Black w/opacity */
                                  overflow: hidden;  
                                  opacity: 0;
                                  top: 50%;
                                  left: 50%;   
                                  visibility: hidden;
                                  max-height: calc(100vh - 48px);
                                  transition: opacity ease-in-out .25s,visibility ease-in-out .25s;               
                                  /*  max-width: 80vw; */
                                  margin-left: -40vw;
                                  transition: opacity .125s cubic-bezier(0.0,0.0,0.2,1), visibility .125s cubic-bezier(0.0,0.0,0.2,1);
                                }
                                
                                
                                .active .DialogHRM{
                                /* transform: translate3d(0, var(--slide-option-heigth-perc--), 0); position: static;*/
                                  opacity: 1;
                                  visibility: visible;   
                                  pointer-events: auto;
                                  transition: opacity .325s cubic-bezier(0.0,0.0,0.2,1), visibility .325s cubic-bezier(0.0,0.0,0.2,1);
                                }
                                
                                .DialogHRMOverlay{
                                  height: 100vh; 
                                  width: 100%;     
                                  opacity: 0;
                                  position: fixed;
                                  z-index: 210; 
                                  left: 0;
                                  bottom: 0;
                                  background-color: rgba(0,0,0,0.82); 
                                  overflow-x: hidden;   
                                  transition: opacity ease-in-out .138s;
                                  transform-origin:  50% 210% 0;
                                }
                                
                                
                                .active .DialogHRM.show{    
                                  opacity: 1;
                                  bottom: 0;    
                                  transition: opacity ease-in-out .58s;
                                }
                                  `}</style>              
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
    
  
   
    _elmBdy = `data_ui_${keys[93]}`;

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
                      "interestingMoment"
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
    var isVideoPreview = false;
    
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
    let isTd = dataH && dataH[dg] && dataH[dg]["isTitleDetail"];                   
    if(isTd){
        let _Elmm =document.getElementById(`data_ui_${keys[93]}`);         
        let _scrollTop =  dataH[dg]["lastScroll"];
        close(dg,false);
        dataH[dg]["isTitleDetail"] = false;
        let timeOut = dataH[dg]["timeOut"];
        if(timeOut){
            clearInterval(timeOut);
            dataH[dg]["timeOut"] = null;
        }
        _Util.updStore("detailVideoByID",null)
        _Util.updStore("seasonsbyVideoByID",null)
        _Util.updStore("similarList",null)
        if(preventRedirect){
            _Elmm.style.position = "static";              
            window.scrollTo(0,_scrollTop);
            _Elmm.style.top = null;
        }
        else if(_state["route_history"]){ 
            let rd = _state["prevUrl"] || {pathname:'/browse'};
            _state["route_history"].push(rd);
            setTimeout(()=>{  
                _Elmm.style.position = "static";              
                window.scrollTo(0,_scrollTop);
                _Elmm.style.top = null;
            },240);
        }
    }else{
        close(dg,false);
        let timeOut = dataH[dg]["timeOut"];
        if(timeOut){
            clearInterval(timeOut);
            dataH[dg]["timeOut"] = null;
        }
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
        let _evt = _Util.getEventStore();    
        let lastScroll =  _evt["scrollPosition"];
        dataH[dg]["lastScroll"] = lastScroll;
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



let _seasons = _dVID && _dVID["seasons"];
let _lastEpisode = _state["detailVideoByID"] && _state["detailVideoByID"]["lastEpisode"];
let _type = _state["detailVideoByID"] && _state["detailVideoByID"]["type"];
let _lastEpisodeNumber = _lastEpisode && _lastEpisode["episodeNumber"];
let _lastseasonId = _lastEpisode && _lastEpisode["seasonId"];
let cS = _lastEpisode && _seasons.filter(ss=>ss.id===_lastseasonId);
let _currentSeason = cS && cS[0];
let episodeLast = null;



if(_type!=="movie" &&  _currentSeason && _currentSeason["episodes"]){
    _currentSeason["episodes"].map(eps=>{
        if(_lastEpisode["episodeId"]===eps["id"]){
            episodeLast = eps["videoRefDetails"];
        }
    });
}
let reduceL = null
if(_currentSeason && _lastEpisodeNumber){
    reduceL = {
        n: `T${_currentSeason["number"]}:E${_lastEpisodeNumber || 1}`,
        t:  episodeLast["title"]
    }
}

let _bookmarkPosition = _state["detailVideoByID"] && _state["detailVideoByID"]["bookmarkPosition"];
if(episodeLast){
    _bookmarkPosition = episodeLast["bookmarkPosition"];
}





const _OpenPlayer = () => { 
    let pathname = _state["route_history"]["location"]["pathname"];            
    let pU = {pathname:pathname, search: '?title='+item.id}
    _Util.updStore("prevUrl",pU);
    setTimeout(()=>{
        closeTitleDetail(true);
    },600)
    
    dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'goDark',value:true}
    })
    if(_type!=="movie"){
        _openPlayer(_state["detailVideoByID"]);
    }else{
        _openPlayer(_dVID2);
    }
    
}



    return (                      
        <div id={_kid} className={`focus-trap-wrapper previewModal--wrapper ${_isTitleDetail?"detail-modal":"mini-modal"}`} tabindex="-1">
            {true?
            <div tabIndex="-1" style={{opacity: 0.857}}>
                <div className="previewModal--backDrop" tabindex="-1" data-uia="previewModal--backDrop"  onClick={()=>closeOutside()}></div>
            </div>
            :null}
            <div id={_kid+"dialog"} role="dialog" aria-modal="true" tabindex="-1" 
                className={`previewModal--container  ${_isTitleDetail?"detail-modal":"mini-modal"}` }                 
                style={_style}
            >
                <div className={`previewModal--player_container  ${_isTitleDetail?"detail-modal":"mini-modal"}`} data-uia="previewModal--player_container">
                    <div className="videoMerchPlayer--boxart-wrapper" style={{position: "static"}}>                       
                        <img className={`previewModal--boxart ${_blob ?"show":""}`} src={_blob} style={{opacity: _blob?1:0}} alt=""/>
                    </div>                                    
                    <div>
                        <div className="previewModal--player-titleTreatmentWrapper" style={{opacity: _isTitleDetail?1:0}}>
                            <div className={`previewModal--player-titleTreatment-left previewModal--player-titleTreatment  ${_isTitleDetail?"detail-modal":"mini-modal"}`}>
                                <img alt="El stand de los besos 2" src="https://occ-0-7-6.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABSWQ4La4vofxpoCI1su5pqf-0BBapcEIBwfWyoRuLo-ZrJwGIJbmSXyKRSGppicsW2rWhMUQqtAvidR3H69fxTx7xvTU68bN23QWWSGkK5JQVCOOXnH_IIYH__aunepQiKQjBELtriW3qRizJDxfkLaen9b9hPZQ5XxNi0zgADNX.webp?r=880" style={{opacity: 0, width: "100%"}}/>
                                {_bookmarkPosition && _bookmarkPosition["timeline"]?
                                <div className="previewModal-title-progress">
                                    <div className="progress ">
                                        <span className="progress-bar">
                                            <span role="presentation" className="progress-completed" style={{width: (_bookmarkPosition.timeline / _bookmarkPosition.duration )*100 +"%"}}></span>
                                        </span>
                                        <span className="summary">{parse2Minutes(_bookmarkPosition["timeline"])}&nbsp;de&nbsp;{parse2Minutes(_bookmarkPosition["duration"])}min</span>
                                    </div>
                                </div>
                                :null}
                                <div className="buttonControls--container" data-uia="mini-modal-controls">
                                    <a domref="[object Object]" tabindex="0" toolkitsize="medium" rownum="3" trackid="15036064" data-uia="play-button" role="link" aria-label="Reproducir" className="primary-button playLink isToolkit" >
                                        <button className="color-primary hasLabel hasIcon ltr-h73cpj" tabindex="-1" type="button" onClick={()=>_OpenPlayer()}>
                                            <div className="ltr-1e4713l">
                                                <div className="medium ltr-sar853" role="presentation">
                                                    <Icon2   
                                                        name={'play'} 
                                                        color={'currentColor'} 
                                                    />
                                                </div>
                                            </div>
                                            <div className="ltr-1i33xgl" style={{width: "0.8rem"}}></div>
                                            <span className="ltr-14hip7q">{_bookmarkPosition && _bookmarkPosition["timeline"]>0?_Util.translatetext(522):_Util.translatetext(521)}</span>
                                        </button>
                                    </a>
                                    <div className="">
                                        <div className="ptrack-content" >
                                            <button aria-label="Agregar a Mi lista" className="color-supplementary size-medium ltr-ssvoiv" data-uia="add-to-my-list" type="button">
                                                <div className="medium ltr-sjgnss" role="presentation">
                                                    <Icon2   
                                                        name={'plus'} 
                                                        color={'currentColor'} 
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <button aria-label="thumbs up" className="color-supplementary size-medium ltr-ssvoiv" data-uia="thumbsUp-button" type="button">
                                        <div className="medium ltr-sjgnss" role="presentation">
                                            <Icon2   
                                                name={'thumb_up_ntflx'} 
                                                color={'currentColor'} 
                                            />
                                        </div>
                                    </button>
                                    <button aria-label="thumbs down" className="color-supplementary size-medium ltr-ssvoiv" data-uia="thumbsDown-button" type="button">
                                        <div className="medium ltr-sjgnss" role="presentation">
                                            <Icon2   
                                                name={'thumb_down_ntflx'} 
                                                color={'currentColor'} 
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className={`previewModal-audioToggle  ${_isTitleDetail?"detail-modal":"mini-modal"}`} style={_isTitleDetail?{ opacity: 0.4, display: "block"}: {opacity: 0, display: "none"}}>
                                <div className="global-supplemental-audio-toggle">
                                    <button aria-label="Activar el audio" className="color-supplementary size-medium ltr-ssvoiv" data-uia="audio-toggle-muted" type="button">
                                        <div className="medium ltr-sjgnss" role="presentation">
                                            <Icon2   
                                                name={'volume_mute_ntflx'} 
                                                color={'currentColor'} 
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="previewModal-close" data-uia="previewModal-closebtn"  onClick={()=>closeTitleDetail()}>
                    <Icon2   
                        name={'Xclose'} 
                        color={'currentColor'} 
                    />
                </div>
                <div className="previewModal--info" style={{opacity: 1}}>
                    {_isTitleDetail?<DetailsMetadata  dg={dg} reduceL={reduceL}/>:<DetailsMetadataMiniModal/>} 
                    {dlg.action==="showing" && dataH[dg]["isTitleDetail"]?
                    <div className="detail-modal-container">
                        <EpisodesList _blob={_blob} dg={dg} closeTitleDetail={closeTitleDetail}/>                        
                        <MoreLikeThis _blob={_blob} dg={dg}/>
                        {/*<TrailersAndMore />*/}
                        <AboutDetails />
                    </div>
                    :null}
                </div>
            </div>
            <div className="previewModal--popup ltr-8c73co">
                <div className="ltr-ohwg9z">
                    <div className="previewModal--tooltip-content"></div>
                </div>
            </div>
        </div>     
   
    )
} 
















const cleanbase64 = id => {
    var cClss = id;
    var h = new RegExp('=','g')
    cClss=cClss.replace(h,'');
    return cClss;
  };
  
  










const DetailsMetadata = (props) => {
    const {  observeChanges, close, dispatch } = useObserveChanges();
    const [isTitleDetailView, setisTitleDetailView] = useState(false);
    const {  dg, dlg, reduceL } = props;
    let keys = _Util.getGlobalsKeys()
    let _state = _Util.getStore();
    const updDialogModalHRM = (ll) => {
      updComponentStore('listWathDialog',ll);
      dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:'observeComponent',value:_Util.gen12CodeId()}
      })
    }
  
    const [initialize, setInitialize] = useState(false);  


    let _dVID = _state["detailVideoByID"];
    let _year = _dVID && _dVID["releaseYear"]?_dVID["releaseYear"]:2020;

    let _type = _dVID && _dVID["type"];
    let _duration = _dVID && _state["detailVideoByID"] && _state["detailVideoByID"]["duration"];
    let isTop10 = false;
    
    let _synopsis = _dVID && _dVID["synopsis"]?_dVID["synopsis"]:"";
    
    return (
        <div className={`previewModal--detailsMetadata detail-modal ${_type?"_show":""} `} data-uia="previewModal--detailsMetadata">
            <div className={` previewModal--detailsMetadata-left  `}>

                <div className="previewModal--detailsMetadata-info">
                    <div data-uia="videoMetadata--container" className="videoMetadata--container">
                        <div className="videoMetadata--second-line">
                            <div className="year">{_year}</div>
                            <a>          
                                <span className="maturity-rating "><span className="maturity-number">TV-Y</span></span>
                            </a>
                            {_type==="movie"?<span className="duration">{_duration}</span>:null}
                        </div>
                    </div>
                </div>
                {reduceL?
                <div class="previewModal-episodeDetails">
                    <b>{reduceL.n}</b> {`"${reduceL.t}"`}
                </div>
                :null}
                {isTop10?
                <div className="supplemental-message">
                    <svg className="svg-icon svg-icon-top-10-badge" focusable="true"><use filter="" xlinkHref="#top-10-badge"></use></svg>N.º 7 en EE.&nbsp;UU. hoy
                </div>
                :null}
                <p className="preview-modal-synopsis previewModal--text" data-uia="preview-modal-synopsis">{_synopsis}</p>
            </div>
            <div className="previewModal--detailsMetadata-right">
                <div className="previewModal--tags" data-uia="previewModal--tags">
                    <span className="previewModal--tags-label">{`${_Util.translatetext(531)}:`}</span>
                    <span className="tag-item" data-uia="tag-item"><a href="/browse/person/40172204">Ashley Bornancin,</a></span>
                    <span className="tag-item" data-uia="tag-item"><a href="/browse/person/30202216">Carter Hastings</a></span>
                </div>
                <div className="previewModal--tags" data-uia="previewModal--tags">
                    <span className="previewModal--tags-label">{`${_Util.translatetext(532)}:`}</span>
                    <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/52847">Comedias familiares,</a></span>
                    <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/9889">Películas basadas en libros,</a>
                    </span><span className="tag-item" data-uia="tag-item"><a href="/browse/genre/783">Películas infantiles y familiares</a></span>
                </div>
                <div className="previewModal--tags" data-uia="previewModal--tags">
                    <span className="previewModal--tags-label">{`${_Util.translatetext(533)}:`}</span>
                    <span className="tag-item" data-uia="tag-item">
                        <a href="/browse/genre/100045">Conmovedor</a>
                    </span>
                </div>
            </div>
        </div>
    )
 
}





  

const DetailsMetadataMiniModal = (props) => {
    const {  observeChanges, close, dispatch } = useObserveChanges();
    const [isTitleDetailView, setisTitleDetailView] = useState(false);
    const {  dg, dlg } = props;
    let keys = _Util.getGlobalsKeys()
    let _state = _Util.getStore();
    const updDialogModalHRM = (ll) => {
      updComponentStore('listWathDialog',ll);
      dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:'observeComponent',value:_Util.gen12CodeId()}
      })
    }
  
 
 const [initialize, setInitialize] = useState(false);  



    return (
        <div className="mini-modal-container">
            <div data-uia="previewModal--info-container" className="previewModal--info-container">
                <div className="previewModal--metadatAndControls mini-modal" data-uia="previewModal--metadatAndControls">
                    <div className="previewModal--metadatAndControls-container">
                        <div className="buttonControls--container mini-modal" data-uia="mini-modal-controls">
                            <a domref="[object Object]" tabindex="0" toolkitsize="medium" listid="2a22a312-8eae-46a9-8e28-20b0da6df367_45107528X3XX1596203174890" ranknum="2" requestid="40c10b5c-7f0d-4a08-971f-34d61ce84035-1182564332" rownum="2" trackid="14170286" data-uia="play-button" role="link" aria-label="Reanudar" className="primary-button playLink isToolkit isRound" href="/watch/81026818?trackId=14170286&amp;tctx=2%2C2%2C40c10b5c-7f0d-4a08-971f-34d61ce84035-1182564332%2C2a22a312-8eae-46a9-8e28-20b0da6df367_45107528X3XX1596203174890%2C%2C">
                                <button className="color-primary size-medium ltr-ssvoiv" tabindex="-1" type="button">
                                    <div className="medium ltr-sjgnss" role="presentation">
                                        <Icon2   
                                            name={'playNtflx'} 
                                            color={'currentColor'} 
                                        />
                                    </div>
                                </button>
                            </a>
                            <div className="">
                                <div className="ptrack-content" >
                                    <button aria-label="Agregar a Mi lista" className="color-supplementary size-medium ltr-ssvoiv" data-uia="add-to-my-list" type="button">
                                        <div className="medium ltr-sjgnss" role="presentation">
                                            <Icon2   
                                                name={'plus'} 
                                                color={'currentColor'} 
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <button aria-label="thumbs up" className="color-supplementary size-medium ltr-ssvoiv" data-uia="thumbsUp-button" type="button">
                                <div className="medium ltr-sjgnss" role="presentation">
                                    <Icon2   
                                        name={'mute'} 
                                        color={'currentColor'} 
                                    />
                                </div>
                            </button>
                            <button aria-label="thumbs down" className="color-supplementary size-medium ltr-ssvoiv" data-uia="thumbsDown-button" type="button">
                                <div className="medium ltr-sjgnss" role="presentation">
                                    <Icon2   
                                        name={'mute'} 
                                        color={'currentColor'} 
                                    />
                                </div>
                            </button>
                            <button aria-label="expand to detail modal" className="color-supplementary size-medium buttonControls--expand-button buttonControls--marginLeft_auto ltr-ssvoiv" data-uia="expand-to-detail-button" type="button">
                                <div className="medium ltr-sjgnss" role="presentation">
                                    <Icon2   
                                        name={'mute'} 
                                        color={'currentColor'} 
                                    />
                                </div>
                            </button> 
                        </div>
                        <div className="previewModal-progress">
                            <div className="progress ">
                                <span className="progress-bar">
                                    <span role="presentation" className="progress-completed" style={{width: "2%"}}>
                                    </span>
                                </span>
                                <span className="summary">3&nbsp;de&nbsp;132&nbsp;min</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
 
}















const TrailersAndMore = (props) => {
    const {  observeChanges, close, dispatch } = useObserveChanges();    
 
    return (
        <div className="ptrack-container">
            <div className="ptrack-content" >
                <div className="trailersAndMore--wrapper">
                    <div className="trailersAndMore--header">
                        <p className="previewModal--section-header">Tráileres y más</p>
                    </div>
                    <div className="trailersAndMore--container" data-uia="trailersAndMore--container">
                        <div className="titleCard--container trailers-and-more-item" tabindex="0" aria-label="Temporada 1 (Tráiler): Amar y vivir" data-uia="titleCard--container" role="button">
                            <div className="titleCard-imageWrapper">
                                <div className="ptrack-content">
                                    <img src="https://occ-0-7-6.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaWpj6myMmxapkNJmih109VXkAOa4ZuZMW1Znz5q5eJiFuf_FRzE5t2pDt1x_8cGsKadcWmeYxmyIjMrlYDHwGSbxYSY6qyG3luvCIL6cHXlagPq.webp?r=fed" alt="Temporada 1 (Tráiler): Amar y vivir"/>
                                </div>
                                <div className="titleCard-playIcon">
                                    <div className="titleCard-playSVG" >
                                        <Icon2   
                                            name={'play'} 
                                            color={'#555'} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="titleCard--metadataWrapper">
                                <div className="titleCard-title">
                                    <span className="titleCard-title_text">Temporada 1 (Tráiler): Amar y vivir</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                                            
    )
 
}





const AboutDetails = (props) => {
    const {  observeChanges, close, dispatch } = useObserveChanges();
    
    let _state = _Util.getStore();
    let  _dVID2 = _state["detailVideoByID"];


    return (
        <div className="ptrack-container">
            <div className="ptrack-content" >
                <div className="about-wrapper">
                    <div className="about-header">
                        <p className="previewModal--section-header">{`${_Util.translatetext(536)} ${_dVID2 && _dVID2["title"] || ""}`}</p>
                    </div>
                    <div className="about-container" data-uia="about-container">
                        <div className="previewModal--tags" data-uia="previewModal--tags">
                            <span className="previewModal--tags-label">{`${_Util.translatetext(537)}: `}</span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/60156459">Nubia Barreto</a></span>
                        </div>
                        <div className="previewModal--tags" data-uia="previewModal--tags">
                            <span className="previewModal--tags-label">{`${_Util.translatetext(531)}: `}</span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/30206886">Ana María Estupiñán,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/30207431">Carlos Torres,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/60005847">Yuri Vargas,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/60046108">Jim Muñoz,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/30162918">Julio Sánchez Cóccaro,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/30143349">Alina Lozano,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/40083349">Valeria Gálviz,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/60156699">Juan Millán,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/60156766">Juan del Río,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/person/30191244">Mario Duarte</a></span>
                        </div>
                        <div className="previewModal--tags" data-uia="previewModal--tags">
                            <span className="previewModal--tags-label"> {`${_Util.translatetext(532)}: `}</span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/26056">Dramas de TV románticos,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/67708">Programas latinoamericanos,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/11714">Dramas de TV,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/1701">Música,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/10741">Música latina</a></span>
                        </div>
                        <div className="previewModal--tags" data-uia="previewModal--tags">
                            <span className="previewModal--tags-label"> {`${_Util.translatetext(533)}: `}</span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/100039">Emotivo,</a></span>
                            <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/100052">Romántico</a></span>
                        </div>
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








const parse2Minutes = (s) =>{
    return Math.floor(s/60);
   }
   

/*





const MiniDialogMetadata = (props) => {
    const {  observeChanges, close, dispatch } = useObserveChanges();
    const [initialize, setInitialize] = useState(false); 


    return (
        <div className="previewModal--detailsMetadata detail-modal" data-uia="previewModal--detailsMetadata">
            <div className="previewModal--detailsMetadata-left">
                <div className="previewModal--detailsMetadata-info">
                    <div data-uia="videoMetadata--container" className="videoMetadata--container">
                        <div className="videoMetadata--first-line">
                            <span className="match-score-wrapper">
                                <div className="show-match-score rating-inner">
                                    <span className="match-score">98&nbsp;% para ti</span>
                                </div>
                            </span>
                        </div>
                        <div className="videoMetadata--second-line">
                            <div className="year">2003</div>
                            <a>
                                <span className="maturity-rating ">
                                    <span className="maturity-number">PG</span>
                                </span>
                            </a>
                            <span className="duration">1 h 28&nbsp;min</span>
                        </div>
                    </div>
                </div>
                <p className="preview-modal-synopsis previewModal--text" data-uia="preview-modal-synopsis">A pedido de la mafia, dos amigos viajan a Australia a entregar $50 000, pero deberán vérselas con un ejemplar de la fauna local con un olfato especial para el dinero.</p>
            </div>
            <div className="previewModal--detailsMetadata-right">
                <div className="previewModal--tags" data-uia="previewModal--tags">
                    <span className="previewModal--tags-label">Elenco:</span>
                    <span className="tag-item" data-uia="tag-item">
                        <a href="/browse/person/69151">Jerry O'Connell,</a>
                    </span>
                    <span className="tag-item" data-uia="tag-item">
                        <a href="/browse/person/20013129">Anthony Anderson,</a>
                    </span>
                    <span className="tag-item" data-uia="tag-item">
                        <a href="/browse/person/20009423">Estella Warren,</a>
                    </span>
                    <span className="tag-more" data-uia="tag-more"><a>más</a></span>
                </div>
                <div className="previewModal--tags" data-uia="previewModal--tags">
                    <span className="previewModal--tags-label">Géneros:</span>
                    <span className="tag-item" data-uia="tag-item">
                        <a href="/browse/genre/52847">Comedias familiares,</a>
                    </span>
                    <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/1365">Acción y aventuras,</a></span>
                    <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/43040">Comedias de acción</a></span>
                </div>
                <div className="previewModal--tags" data-uia="previewModal--tags">
                    <span className="previewModal--tags-label">Este título es:</span>
                    <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/100043">Disparatado,</a></span>
                    <span className="tag-item" data-uia="tag-item"><a href="/browse/genre/100041">Emocionante</a></span>
                </div>
            </div>
        </div>
                                            
    )
 
}


















const hhhh =    `

`

let MLK = []

function hhDsa(){
    hhhh.split("titleCardList--container").map(mlt=>{        
        let itm = mlt.split("</p></div></div>")[0];
        let obj = {}
        obj["img"] = itm.split('src="')[1] && itm.split('src="')[1].split('"')[0];
        obj["title"] = itm.split('alt="')[1] && itm.split('alt="')[1].split('"')[0];
        
        
        
        obj["synopsis"] = itm.split('--small-text">')[1] && itm.split('--small-text">')[1].split('<')[0];
        let durationEp = itm.split('className="duration ellipsized">')[1] && itm.split('className="duration ellipsized">')[1].split('<')[0];
        
        
        obj["indexEpisode"] = itm.split('className="titleCard-title_index">')[1] && itm.split('className="titleCard-title_index">')[1].split('<')[0];
        
        obj["duration"] = durationEp && durationEp.replace('&nbsp;',"").replace('min',"");
        
        MLK.push(obj)

      
    })

 
}



function hhDsa3333(){
    hhhh.split("titleCardList--container").map(mlt=>{        
        let itm = mlt.split("</p></div></div>")[0];
      
        let obj = {}
        obj["img"] = itm.split('src="')[1] && itm.split('src="')[1].split('"')[0];
        obj["title"] = itm.split('alt="')[1] && itm.split('alt="')[1].split('"')[0];
        obj["year"] = itm.split('className="year">')[1] && itm.split('className="year">')[1].split('<')[0];
        obj["match-score"] = itm.split('className="match-score">')[1] && itm.split('className="match-score">')[1].split('&')[0];
        obj["synopsis"] = itm.split('previewModal--small-text">')[1];
        obj["duration"] = itm.split('className="duration ellipsized">')[1] && itm.split('className="duration ellipsized">')[1].split('<')[0];
        obj["maturityNumber"] = itm.split('className="maturity-number">')[1] && itm.split('className="maturity-number">')[1].split('<')[0];
        MLK.push(obj)

      
    })


}


hhDsa()



*/
