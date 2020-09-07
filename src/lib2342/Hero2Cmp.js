
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {
    OpenWatchDialog,
    getMoviesById,
    loadHLSdataByUrl, updTimebyVideoId
} from '../actions/common'
  

import {TitleProgress, PlayButton, IconButton } from './Buttons';

import './_styles.css'



const useObserveChanges = () => {
    const observeChanges =  useSelector(state => state.observeChanges);
    const goDark = useSelector(state => state.goDark);
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
  
    
    let _dispatch_ = dispatch;



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

    return {  updKV, _dispatch_,  _getVideosById, _openMd, goDark, _openPlayer }
  }
  
  



const Hero= (props)=>{
 
    const {  _getVideosById, _openMd, goDark, _dispatch_, _openPlayer } = useObserveChanges();
  
    const {  item } = props;
  
    let _state = _Util.getStore();
    let keys = _Util.getGlobalsKeys()  
    let idWatch = "";
    let classN = ""
   // const refsd = useRef();
  
    const _goDark = goDark?1:0; 
   const [initialize, setInitialize] = useState(false);  
   const [isready, setIsready] = useState(false);  
   const [minimized, setMinimized] = useState(false);  
  
    useEffect(() => {
      let _store = _Util.getStore();    
      
      if(!initialize){
        setInitialize(true);      
        _Util.initConfig().then(d=>{
          setTimeout(()=>{
            
          },150)
        })
      }
    });
  
    let _item = item;
    let _type = _item && _item["type"];

    const open = () => {
        let _ID =  _item.id;
        let Qry = {
            params:{id:_ID},
            fields:[ "title","synopsis","storyArt","seasonCount","episodeCount","year","type", "releaseYear" ],
            query:"getMoviesbyId"
          };
          
        _getVideosById(Qry, "detailVideoByID");
        _openMd({},_item)        
    }
        
    const _OpenPlayer = () => { 
        let pathname = _state["route_history"]["location"]["pathname"];            
        let pU = {pathname:pathname}
        _Util.updStore("prevUrl",pU);
        _dispatch_({
            type: 'UPD_KEY_VALUE',
            kv:{key:'goDark',value:true}
        })
        if(_type!=="movie"){
            _openPlayer(_item);
        }else{
            _openPlayer(_item);
        }
        
    }

    
    let info_wrapper_Style = {    transform: "translate3d(0px, 0px, 0px)", transitionDuration: "1300ms", transitionDelay: "400ms", opacity: 1 }

    let titleWrapper_Style = {transformOrigin: "left bottom", transform: "scale(1) translate3d(0px, 0px, 0px)", transitionDuration: "1300ms", transitionDelay: "400ms"}


    let defRes = "_665x375";
    let imK2Show = "boxarts"
    imK2Show = "storyArt"
    let _ext = _state["isWebp"]?"webp":"jpg";

    let _boxarts = _item && _item[imK2Show] && _item[imK2Show][defRes] && _item[imK2Show][defRes][_ext] && _item[imK2Show][defRes][_ext]["url"]
    let heroImage =  _boxarts ||  ""
    let heroImageName =  null


    let heroTitle =  _item && _item["title"]?_item["title"]:"";
    let heroSynopsis =  _item && _item["synopsis"]?_item["synopsis"]:"";

    let _bookmarkPosition = _item && _item["bookmarkPosition"];
    let episodeLast = false;
    if(episodeLast){
        // _bookmarkPosition = episodeLast["bookmarkPosition"];
    }


    let isTop10 = _item && _item["isTop10"]
    if(minimized){
        titleWrapper_Style = {transformOrigin: "left bottom", transform: "scale(0.6) translate3d(0px, 49px, 0px)", transitionDuration: "1300ms", transitionDelay: "400ms"}
        info_wrapper_Style = {
            transform: "translate3d(0px, 93px, 0px)", transitionDuration: "1300ms", transitionDelay: "400ms", opacity: 0
        }
        
    }

    return (
    <div className={`hrm_hero-row`}>
        <div className="hrm_hero">
            <div className="hrm_hero-motion">                
                <div className="motion-background-component bottom-layer full-screen">
                    <div className="hero-image-wrapper">
                        <img className="hero static-image image-layer" src={heroImage} alt=""/>
                        <div className="trailer-vignette vignette-layer"></div>
                        <div className="hero-vignette vignette-layer"></div>
                        <div className="embedded-components button-layer"></div>
                    </div>
                    {/*
                    <div className="embedded-components button-layer">
                        <span className="ActionButtons">
                            <div className="global-supplemental-audio-toggle audio-btn button-layer">
                                <button aria-label="Activar el audio" className="color-supplementary size-small ltr-ssvoiv" data-uia="audio-toggle-muted" type="button">
                                    <div className="small ltr-sjgnss" role="presentation">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M9 7.828L6.828 10H4v4h2.828L9 16.172V7.828zM11 21l-5-5H2V8h4l5-5v18zm6-10.414l3.293-3.293 1.414 1.414L18.414 12l3.293 3.293-1.414 1.414L17 13.414l-3.293 3.293-1.414-1.414L15.586 12l-3.293-3.293 1.414-1.414L17 10.586z" fill="currentColor"></path></svg>
                                    </div>
                                </button>
                            </div>
                        </span>
                        <span className="maturity-rating "><span className="maturity-number">TV-PG</span></span>
                    </div>
                    */}
                </div>
            </div>
            <div className="fill-container">
                <div className="info meta-layer">
                    <div className="logo-and-text meta-layer">
                        <div className="titleWrapper" style={titleWrapper_Style}  >
                            <div className="hrm_hero-title">
                                {heroImageName?
                                <img className="title-logo" src={heroImageName}  title={heroTitle} alt={heroTitle}/>
                                :<div className="title-text">{`${heroTitle}`}</div>
                                }
                            </div>
                        </div>
                        <div className="info-wrapper" style={info_wrapper_Style}  >
                            <div className="info-wrapper-fade" style={{opacity: minimized?0:1, transitionDuration: "600ms", transitionDelay: "200ms"}}>
                                <div className="synopsis-fade-container">
                                    <div className="synopsis"> {heroSynopsis} </div>
                                </div>
                            </div>
                        </div>
                        <div className="hrm_hero-links button-layer forward-leaning">                           
                            <PlayButton _OpenPlayer={_OpenPlayer} bookmarkPosition={_bookmarkPosition} />
                            <button className="color-secondary hasLabel hasIcon ltr-h73cpj" data-uia="hrm_hero-more-info" type="button" onClick={()=>open()}>
                                <div className="ltr-1e4713l">
                                    <div className="medium ltr-sar853" role="presentation">
                                        <svg viewBox="0 0 24 24"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8zm-9 6v-7h2v7h-2zm1-8.75a1.21 1.21 0 0 1-.877-.364A1.188 1.188 0 0 1 10.75 8c0-.348.123-.644.372-.886.247-.242.54-.364.878-.364.337 0 .63.122.877.364.248.242.373.538.373.886s-.124.644-.373.886A1.21 1.21 0 0 1 12 9.25z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                                <div className="ltr-1i33xgl" style={{width: "0.8rem"}}></div>
                                <span className="ltr-14hip7q">{_Util.translatetext(523)}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


export default Hero;