
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {
    OpenWatchDialog,
    getMoviesById,
    loadHLSdataByUrl, updTimebyVideoId
} from '../actions/common'
  

import {MoreInfoButton, PlayButton } from './Buttons';

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
 
    const {  _getVideosById, _openMd,  _dispatch_, _openPlayer } = useObserveChanges();
  
    const {  item } = props;
  
    let _state = _Util.getStore();
    const [initialize, setInitialize] = useState(false); 
    const minimized = false;
    useEffect(() => {
        if(!initialize){
            setInitialize(true);
        }
    });
  
    let _item = item;
    let _type = _item && _item["type"];

    const open = () => {
        let _ID =  _item.id;
        let Qry = {
            params:{id:_ID},
            fields:[ 
                "title","synopsis","storyArt","seasonCount","episodeCount","year","type", "releaseYear",
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
                            <div className="info-wrapper-fade" style={{opacity: 1, transitionDuration: "600ms", transitionDelay: "200ms"}}>
                                <div className="synopsis-fade-container">
                                    <div className="synopsis"> {heroSynopsis} </div>
                                </div>
                            </div>
                        </div>
                        <div className="hrm_hero-links button-layer forward-leaning">                           
                            <PlayButton clickEvent={_OpenPlayer} bookmarkPosition={_bookmarkPosition} />
                            <MoreInfoButton clickEvent={open}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


export default Hero;