


//  5029128598  departamento de salud;

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../store/redux'
import { useSelector, useDispatch } from 'react-redux'



import { withRouter} from 'react-router-dom';



import { SearchVideos, VideoFiles , GetVideos2Init, getTitleDetailandSimilar} from  '../../actions/videos'


import {  OpenModal, OpenWatchDialog, getMovies, getMoviesById} from '../../actions/common'



import * as _Util from '../../store/Util';

import '../_styles.css'



// https://ipv4-c027-ord003-ix.1.oca.nflxvideo.net/range/0-99999992819?o=AQNdJhUgjQQr4Xsjo-PGetYAQb0_mQKZPYCH5bKK3P_cK8A_FgYwp7nJn-DzwTgxBxdgLltszRImVCNsaXo_CgtX586etHu2-RRt7zW9tVsGSWUXGNQm6XAg-0unvedF9u2sNvlbbAvMJRslRFqEI2ivVKUG5jk&v=5&e=1596853396&t=QCHo4ZiA3H1iFqQwmjZ7Ut_y9cE





import LolomoRow from '../lolomoRow'


import TitleCardHRM from '../bobItem2'

import RowViewPort from '../rowViewPort'


import DialogPlayer from '../operations/dialogPlayer'
import DialogVideoFile from '../operations/dialogVideoFile'

import AddVideo from '../operations/AddVideo'


import DROPBTN from '../dropBtn';


let lastRequ = 0; 
let lastRequQty = 0; 

// import MenuSlideSide from '../MenuSlideSide';


const gDt = () =>{
  return (new Date().getTime());
}

const operationType = 'departments'
let _options = [
  {label: 'upload', icon:'analytics', visible:true },
  {label: 'movies', icon:'analytics', visible:true },
  {label: 'video files', icon:'analytics', visible:true },
  {label: 'edition', icon:'analytics', visible:true }

]

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const dispatch = useDispatch();
  
  const _getVideosSearch = (q,type,genre) => {
    let params = {query:q, limit:35};
    if(type){
      params["type"] = type;
    }
    if(genre){
      params["genre"] = genre;
    }
    if(q){
      params["query"] = q;
    }
    
    lastRequQty +=1;
    if(gDt()>lastRequ){
      lastRequ = gDt()+60;
      if(gDt()>lastRequ+550){
        lastRequQty = 0;
      }
      if(lastRequQty<25){
        lastRequQty = 0;
        SearchVideos(params, dispatch, "videosbygenre");
      }
    }
    //updForms("_filters_")
    
  }





  const _getVideos = (q,operation) => {
    q["q"] = operation;
    getMovies(q, dispatch, operation);
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


  return { 
    observeChanges,
    _getVideosSearch,
    _getVideos,
    _openMd,
    _getVideosById
  }
}








let dataRw = {}




const BrowseTpeComponent = (props) => {
  const {     
    _getVideosSearch,
    _getVideos,
    _openMd,
    _getVideosById
  } = useObserveChanges();

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;


  const [initialize, setInitialize] = useState(false);
    
  const [genre, setGenre] = useState(null);

  const [type, setType] = useState(null);

  const [search, setSearch] = useState(null);


  const [widthScreen, setWidthScreen] = useState(null);
   
  let searchHash = window.location.hash.split('?')[1]?window.location.hash.split('?')[1]:null;
 
  const router = _Util.parseQuery(searchHash);

  let outerWidth = _state["outerWidth"];

  let tabs = _Util.getTabs(outerWidth);
  
  
  let _IDGn = router.g?router.g:null;
  let _QuerySearch = router.q?router.q:null;
  const typeBrowse = window.location.hash.split('/')[1].split('?')[0];



  const _getVideoInfobyId = (id) => {    
    let Qry = {
      params:{id:id},
      fields:[
        "title","synopsis","storyArt","seasonCount","episodeCount","year","type",
        "releaseYear",
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
    _getVideosById(Qry, "detailVideoByID");
  }




  useEffect(() => {
    
    if(widthScreen!==outerWidth){
      setWidthScreen(outerWidth);
    }

    if(typeBrowse){ 
      let _kM = "";      
      if(typeBrowse==="movie"){
        _kM = "movieList";
      }
      else if(typeBrowse==="serie"){
        _kM = "serieList";
      }
      else if(typeBrowse==="show"){
        _kM = "showList";
      }
      else if(typeBrowse==="search"){
        _kM = "movieList";
      }
      if(!type || type!==typeBrowse){
        if(typeBrowse!=="search"){
          _Util.updStore(_kM,{});
          _Util.updStore(`_${typeBrowse}_${_kM}_param`,{to:50,from:0});
          let Qry = {params:{to:50,from:0, type: typeBrowse },fields:["title","boxarts",{name:"delivery",query:"getdelivery",fields:["hasHD","quality"]}],query:"getMovies"};
          if(router["title"]){
            setTimeout(() => {
              _getVideos(Qry, _kM);
            }, 450);
          }else{
            _getVideos(Qry, _kM);
          }
          window.scrollTo(0,0);
        }
        setType(typeBrowse);
        dataRw[typeBrowse] = {};    
        dataRw[typeBrowse]["index"] = 6;
        _Util.rmvStore(`_${typeBrowse}_row_`); 
        window.scrollTo(0,0);
      }
      
      if(genre!==_IDGn){
        setGenre(_IDGn);
      }
      
      
      if(typeBrowse==="search" && search!==_QuerySearch){
        _Util.updStore(_kM,{});
        _Util.updStore(`_${typeBrowse}_${_kM}_param`,{to:72,from:0});
        let Qry = {params:{to:72,from:0, search:_QuerySearch},fields:["title","boxarts"],query:"getMovies"};
        if(router["title"]){
          setTimeout(() => {
            _getVideos(Qry, _kM);
          }, 450);
        }else{
          _getVideos(Qry, _kM);
          window.scrollTo(0,0);
        }
        setSearch(_QuerySearch);
      }
     

      
    }
    

    if(!initialize){
      setInitialize(true);      
      if(router["title"]){
        let id = router.title;
        _getVideoInfobyId(id);
        _openMd(id)
      }
    }
  });
  



  let _videosByGenre = _state["series"];
  if(typeBrowse==="movie"){
    _videosByGenre = _state["movieList"];
  }
  else if(typeBrowse==="show"){
    _videosByGenre = _state["showList"];
  }
  else if(typeBrowse==="search"){
    _videosByGenre = _state["movieList"];
  }

  
let  _videosByGenreTabs = _Util.groupByTabs(_videosByGenre,tabs)


let _genresList = parseGenresList(_state.genres,{}); 

const searchPathGenre = (g) => {
  _getVideosSearch("", typeBrowse, g);
  props.history.push({pathname:`/`+typeBrowse,search:`?g=${g}` });
}


const updLastIndex = (kk) => {
  let _kM = "movieList"  
  if(typeBrowse==="movie"){
    _kM = "movieList";
  }
  else if(typeBrowse==="serie"){
    _kM = "serieList";
  }
  else if(typeBrowse==="show"){
    _kM = "showList";
  }
  else if(typeBrowse==="search"){
    _kM = "movieList";
  }
  let _lr = _Util.getStore(); 
  let prms = _lr[`_${typeBrowse}_${_kM}_param`];
  let from =   prms["to"]+1;
  let to =   (prms["to"]-prms["from"])+from;
  prms["from"] = from;
  prms["to"] = to;
  if(search && typeBrowse==="search"){
    prms["search"] = search;
  }
  prms["type"] = typeBrowse;
  _Util.updStore(`_${typeBrowse}_${_kM}_param`,{to:to,from:from});
  let Qry = {params:prms,fields:["title","boxarts"],query:"getMovies"};
  _getVideos(Qry, _kM);
}




 const typeList = {
  "movie":525,
  "search":" ",
  "show":526  
 }

let title2Show = _videosByGenreTabs && typeList[typeBrowse] || "";


    return (
      <>    
      <div className={`mainView`} >
        <div className={"_similarContent"}>        
        <div className={`_dsplFlx`}>
        {typeBrowse === "search" ? 
          <h3 className="">{`${_Util.translatetext(530)} "${_QuerySearch}"`}</h3>  :
          <h1 className="titleGenre">{_Util.translatetext(title2Show)}</h1>
          }
          {false && typeBrowse !== "search" && 
          <div style={{position:'relative',margin: `21px 0 0 15px`}} onClick={()=>{}} >
            <DROPBTN
              icon={`more_vert`} 
              keyCode={10}
              form={'_filters_'} 
              field={`genres`}
              list={_genresList} 
              title={'generos'} 
              theme={'dark'}
              OnSelect={(e)=>searchPathGenre(e)}
              initvalue={_IDGn}
            />
          </div>
          }
        </div>
        <div className={`lolomo`}> 
        {_videosByGenreTabs &&   _Util.ObjectKeys(_videosByGenreTabs).map((_grTGid,_grTGid_ind)=>{
            return(
              <RowViewPort  data={_videosByGenreTabs[_grTGid]} typeBrowse={typeBrowse} _key_={_grTGid_ind} _ID={_grTGid} updLastIndex={(e)=>updLastIndex(e)}/>
            )
        })}
        </div>
        </div>
        </div>
        <style>
          {dep_style}
        </style> 
        
      </>
    );
  
}  












export default withRouter(withRedux(BrowseTpeComponent))





function parseGenresList(g,vS){
  let ff = []
  g && _Util.ObjectKeys(g).map((_g,i5)=>{
    //if(g[_g]['name'].toLowerCase().indexOf(vS.toLowerCase())>=0){}
    ff.push({id:_g, name:g[_g]['name']});
    
  })
  return ff;
}









  


/*



*/














/*

 <svg className="svg-icon svg-icon-mylist-add" focusable="true"><use filter="" xlinkHref="#mylist-add"></use></svg>




                      {false && 
                        <div className={`bob-card-adult-video-merch`}>   
                         <div className={`bob-overlay ${!true?"bob-overlay-hidden":""}`}>
                              {blob &&
                              <div role="presentation" className="bob-play-hitzone"></div>
                              }
                              {blob &&
                              <a className="bob-jaw-hitzone" href="/title/70025372"></a>
                              }
                              {blob &&
                              <div className="bob-overview-wrapper">
                              <div className="bob-overview">
                                <div className="bob-buttons-wrapper" data-uia="mini-modal-controls">
                                  <a tabindex="0" data-uia="play-button" role="link" aria-label="Reproducir" className="bob-play-button playLink" >
                                    <span className="play-button">
                                      <svg className="svg-icon svg-icon-play-with-ring" focusable="true">
                                        <use filter="" xlinkHref="#play-with-ring"></use>
                                      </svg>
                                    </span>
                                  </a>
                                </div>
                                <div className="bob-title">La Hermandad de la Espada</div>
                                  <div className="bob-overview-resume-title-wrapper"></div>
                                  
                                  <div className="bob-metadata-wrapper">
                                    <div className="meta video-meta video-meta--bob-overview">
                                      {false && 
                                      <span className="match-score-wrapper no-rating">
                                        <div className="show-match-score rating-inner">
                                          <div className="meta-thumb-container thumb-down">
                                            <svg className="svg-icon svg-icon-thumb-down-filled thumb thumb-down-filled" focusable="true"><use filter="" xlinkHref="#thumb-down-filled"></use></svg>
                                          </div>
                                          <div className="meta-thumb-container thumb-up">
                                            <svg className="svg-icon svg-icon-thumb-up-filled thumb thumb-up-filled" focusable="true"><use filter="" xlinkHref="#thumb-up-filled"></use></svg>
                                          </div>
                                        </div>
                                      </span>
                                      }
                                      <span className="maturity-rating ">
                                        <span className="maturity-number">TV-14</span>
                                      </span>
                                      <span className="duration">1 h 45&nbsp;min</span>
                                    </div>
                                  </div>
                                  <div className="bob-overview-evidence-wrapper">
                                  <div className="evidence-tags">
                                    <div className="evidence-list">
                                      <div className="evidence-item">
                                        <span className="evidence-text">Emocionante</span>
                                      </div>
                                      <div className="evidence-item">
                                        <span className="evidence-separator"></span>
                                        <span className="evidence-text">Fantasía</span>
                                      </div>
                                      <div className="evidence-item">
                                        <span className="evidence-separator"></span>
                                        <span className="evidence-text">Comedia de acción</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bob-content-warning-wrapper"></div>
                              </div>
                            </div>
                            }
                          </div>
                        </div>
                        }
                        {false && 
                        <div className={`card_overlay`}>
                          <LazyImage src={item["boxarts"]}/>
                        </div>
                        }




 bob-card bob-card-adult-video-merch style="transform: scale(0.99999); visibility: visible; width: 195%; height: 195%; top: -47.5%; left: -47.5%; transition-duration: 500ms;"

<div className="bob-container">
  <span>
    <div className="bob-card bob-card-adult-video-merch" >
      <div>
        <div>
          <img className="bob-title-art" src="https://occ-0-7-6.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUju1ns7OuQJRm1Mmiud4hJMFFT0Iq9ceB08MCPFPvraxgTaXxstNSvkJtAKV4DCgBarmJzKs94Itdk07-9SvNj8kVCM.webp?r=b3b"/>
        </div>
        <div className="bob-video-merch-player-wrapper" role="presentation" aria-hidden="true">
          <div className="nfp nf-player-container notranslate inactive NFPlayer VideoMerchPlayer VideoMerchPlayer--visible" tabindex="-1">
            <div className="VideoContainer VideoContainer--use-video-width" aria-hidden="true" role="presentation" data-uia="player" data-videoid="81030203">
              <div style="position: relative; width: 100%; height: 100%; overflow: hidden;"><div id="81030203" style="position: relative; width: 100%; height: 100%; overflow: hidden;">
                <video src="blob:https://www.netflix.com/4a30edd6-8f51-4025-92b8-d3d91921cf11"></video>
                <div className="player-timedtext" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; display: block; direction: ltr;">
                <div className="player-timedtext-text-container" style="display: block; white-space: nowrap; text-align: center; position: absolute; left: 11.5385%; bottom: 10%;">
                  <span style="font-size:39px;line-height:normal;font-weight:normal;color:#ffffff;text-shadow:#000000 0px 0px 7px;font-family:Netflix Sans,Helvetica Nueue,Helvetica,Arial,sans-serif;font-weight:bolder">- HER NAME IS DIANE HANSEN,</span>
                </div>
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
    </div>
    
  
*/






/*
<div className="nfp nf-player-container notranslate inactive NFPlayer VideoMerchPlayer VideoMerchPlayer--visible" tabindex="-1">
    <div className="VideoContainer VideoContainer--use-video-width" aria-hidden="true" role="presentation" data-uia="player" data-videoid="81030203">
      <div style="position: relative; width: 100%; height: 100%; overflow: hidden;">
        <div id="81030203" style="position: relative; width: 100%; height: 100%; overflow: hidden;">
          <video src="blob:https://www.netflix.com/4a30edd6-8f51-4025-92b8-d3d91921cf11"></video>
          <div className="player-timedtext" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; display: block; direction: ltr;">
            <div className="player-timedtext-text-container" style="display: block; white-space: nowrap; text-align: center; position: absolute; left: 11.5385%; bottom: 10%;">
              <span style="font-size:39px;line-height:normal;font-weight:normal;color:#ffffff;text-shadow:#000000 0px 0px 7px;font-family:Netflix Sans,Helvetica Nueue,Helvetica,Arial,sans-serif;font-weight:bolder">- HER NAME IS DIANE HANSEN,</span>
            </div>
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
*/



/*


  <div className="bob-overlay bob-overlay-hidden"><div className="bob-play-hitzone"></div><a aria-label="Person of Interest" className="bob-jaw-hitzone" href="/title/70197042"></a><div className="bob-overview-wrapper"><div className="bob-overview"><div className="bob-buttons-wrapper" data-uia="mini-modal-controls"><a tabindex="0" data-uia="play-button" role="link" aria-label="Siguiente episodio" className="bob-play-button playLink" href="/watch/80063338?trackId=14170286&amp;tctx=2%2C2%2Ccf422082-fb29-4368-b32b-feee6fd883f3-152708355%2C9a647316-5bdd-4537-8bbb-8a8050f5ff70_40924618X3XX1587669551488%2C9a647316-5bdd-4537-8bbb-8a8050f5ff70_ROOT"><span className="play-button"><svg className="svg-icon svg-icon-play-with-ring" focusable="true"><use filter="" xlink:href="#play-with-ring"></use></svg></span></a></div><div className="bob-title">Person of Interest</div><div className="bob-overview-resume-title-wrapper"><div className="watched-title watched-title--bob-overview watched-title--no-wrap"><span><b>T4:E15</b> "Q&amp;A"</span></div></div><div className="bob-content-warning-wrapper"></div></div></div><div className="bob-actions-wrapper"><span className="ActionButtons"><div className="global-supplemental-audio-toggle"><div className="nf-svg-button-wrapper" data-uia=""><a role="link" tabindex="0" className="nf-svg-button simpleround" aria-label="Activar el audio"><svg className="svg-icon svg-icon-audio-off" focusable="true"><use filter="" xlink:href="#audio-off"></use></svg></a></div></div><div className="thumbs-component thumbs thumbs-vertical animated unrated" data-uia="thumbs-container"><div className="nf-svg-button-wrapper thumb-container thumb-up-container " data-uia=""><a role="link" data-rating="2" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar arriba"><svg data-rating="2" className="svg-icon svg-icon-thumb-up" focusable="true"><use filter="" xlink:href="#thumb-up"></use></svg></a></div><div className="nf-svg-button-wrapper thumb-container thumb-down-container " data-uia=""><a role="link" data-rating="1" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar abajo"><svg data-rating="1" className="svg-icon svg-icon-thumb-down" focusable="true"><use filter="" xlink:href="#thumb-down"></use></svg></a></div></div><div className="ptrack-content" data-ui-tracking-context="%7B%22lolomo_id%22:%229a647316-5bdd-4537-8bbb-8a8050f5ff70_ROOT%22,%22list_id%22:%229a647316-5bdd-4537-8bbb-8a8050f5ff70_40924618X3XX1587669551488%22,%22location%22:%22homeScreen%22,%22rank%22:2,%22request_id%22:%22cf422082-fb29-4368-b32b-feee6fd883f3-152708355%22,%22row%22:2,%22track_id%22:14170286,%22video_id%22:70197042,%22supp_video_id%22:1,%22appView%22:%22addToMyListButton%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="abccacf1-5de9-4e98-b015-65a6550bc174"><div className="nf-svg-button-wrapper mylist-button" data-uia="myListButton"><a role="link" tabindex="0" className="nf-svg-button simpleround"><svg className="svg-icon svg-icon-mylist-add" focusable="true"><use filter="" xlink:href="#mylist-add"></use></svg></a><span className="nf-svg-button-tooltip" role="status" aria-live="assertive">Agregar a Mi lista</span></div></div></span></div><div className="bob-chevron-wrapper"><div className="bob-jawbone-chevron"><svg className="svg-icon svg-icon-chevron-down" focusable="true"><use filter="" xlink:href="#chevron-down"></use></svg></div></div></div> </div><div className="bob-title-art-container" style="opacity: 0; transition-duration: 750ms; transition-timing-function: linear; display: none;"><img alt="" src="https://occ-0-7-6.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXQRFDZAdAA3AYLmKWuicuwb1LtahbNKC769NbdjXaXS4_ZRs5kK1UX8H50O_PVm1-UXxSq2Yty4dGIOfQMgRvRGKNs.webp?r=b3b" className="bob-title-art"></div></div></span></div>


*/


/*

<div className="bob-overlay">
  <div role="presentation" className="bob-play-hitzone"></div>
  <a className="bob-jaw-hitzone" href="/title/70025372"></a>
  <div className="bob-overview-wrapper">
  <div className="bob-overview">
    <div className="bob-buttons-wrapper" data-uia="mini-modal-controls">
      <a tabindex="0" data-uia="play-button" role="link" aria-label="Reproducir" className="bob-play-button playLink" >
        <span className="play-button">
          <svg className="svg-icon svg-icon-play-with-ring" focusable="true">
            <use filter="" xlink:href="#play-with-ring"></use>
          </svg>
        </span>
      </a>
    </div>
    <div className="bob-title">La Hermandad de la Espada</div>
      <div className="bob-overview-resume-title-wrapper"></div>
      <div className="bob-metadata-wrapper">
        <div className="meta video-meta video-meta--bob-overview">
          <span className="match-score-wrapper no-rating">
            <div className="show-match-score rating-inner">
              <div className="meta-thumb-container thumb-down">
                <svg className="svg-icon svg-icon-thumb-down-filled thumb thumb-down-filled" focusable="true"><use filter="" xlink:href="#thumb-down-filled"></use></svg>
              </div>
              <div className="meta-thumb-container thumb-up">
                <svg className="svg-icon svg-icon-thumb-up-filled thumb thumb-up-filled" focusable="true"><use filter="" xlink:href="#thumb-up-filled"></use></svg>
              </div>
            </div>
          </span>
          <span className="maturity-rating ">
            <span className="maturity-number">TV-14</span>
          </span>
          <span className="duration">1 h 45&nbsp;min</span>
        </div>
      </div>
      <div className="bob-overview-evidence-wrapper">
      <div className="evidence-tags">
        <div className="evidence-list">
          <div className="evidence-item">
            <span className="evidence-text">Emocionante</span>
          </div>
          <div className="evidence-item">
            <span className="evidence-separator"></span>
            <span className="evidence-text">Fantasía</span>
          </div>
          <div className="evidence-item">
            <span className="evidence-separator"></span>
            <span className="evidence-text">Comedia de acción</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bob-content-warning-wrapper"></div>
  </div>
  </div>
  <div className="bob-actions-wrapper"><span className="ActionButtons"><div className="thumbs-component thumbs thumbs-vertical animated unrated" data-uia="thumbs-container"><div className="nf-svg-button-wrapper thumb-container thumb-up-container " data-uia=""><a role="link" data-rating="2" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar arriba"><svg data-rating="2" className="svg-icon svg-icon-thumb-up" focusable="true"><use filter="" xlink:href="#thumb-up"></use></svg></a></div><div className="nf-svg-button-wrapper thumb-container thumb-down-container " data-uia=""><a role="link" data-rating="1" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar abajo"><svg data-rating="1" className="svg-icon svg-icon-thumb-down" focusable="true"><use filter="" xlink:href="#thumb-down"></use></svg></a></div></div><div className="ptrack-content" data-ui-tracking-context="%7B%22lolomo_id%22:%224b40ca94-1280-4d79-9535-f4c4e88f8918_ROOT%22,%22list_id%22:%224b40ca94-1280-4d79-9535-f4c4e88f8918_16683494X29X60022980X1587684198261%22,%22location%22:%22browseTitles%22,%22rank%22:3,%22request_id%22:%223dc673da-15c4-486e-990d-76c510185f26-1352355%22,%22row%22:30,%22track_id%22:250324846,%22video_id%22:70025372,%22supp_video_id%22:1,%22appView%22:%22addToMyListButton%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="3d4ffb7b-9e7c-469d-b3a0-b9c235129ac1"><div className="nf-svg-button-wrapper mylist-button" data-uia="myListButton"><a role="link" tabindex="0" className="nf-svg-button simpleround"><svg className="svg-icon svg-icon-mylist-add" focusable="true"><use filter="" xlink:href="#mylist-add"></use></svg></a><span className="nf-svg-button-tooltip" role="status" aria-live="assertive">Agregar a Mi lista</span></div></div></span></div><div className="bob-chevron-wrapper"><div className="bob-jawbone-chevron"><svg className="svg-icon svg-icon-chevron-down" focusable="true"><use filter="" xlink:href="#chevron-down"></use></svg></div></div></div>



<div className="bob-background image-rotator"><span><div className="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%224b40ca94-1280-4d79-9535-f4c4e88f8918_16683494X29X60022980X1587684198261%22,%22location%22:%22browseTitles%22,%22rank%22:3,%22request_id%22:%223dc673da-15c4-486e-990d-76c510185f26-1352355%22,%22row%22:30,%22track_id%22:250324846,%22video_id%22:70025372,%22image_key%22:%22StoryArt%7Ced9b22f0-e0c0-11e8-a863-1204ac6e63e2%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%224b40ca94-1280-4d79-9535-f4c4e88f8918_ROOT%22,%22appView%22:%22storyArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="a5495d70-9bea-43a5-b860-c86937b333a3"><div className="image-rotator-image " style="background-image: url(&quot;https://occ-0-7-6.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABe0rhiL1u6m_Kvhe7LRF3qJ8ch47kLjAWfxwaY2eGmel4adgzL141tiB5TnHWEmc5cm9FUZrhC9VVsWZurDMl3ETknJX.webp?r=3e9&quot;); z-index: 2; opacity: 1; transition-duration: 750ms;"></div></div></span></div>

<div className="bob-background image-rotator"><span><div className="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%224b40ca94-1280-4d79-9535-f4c4e88f8918_16683494X29X60022980X1587684198261%22,%22location%22:%22browseTitles%22,%22rank%22:3,%22request_id%22:%223dc673da-15c4-486e-990d-76c510185f26-1352355%22,%22row%22:30,%22track_id%22:250324846,%22video_id%22:70025372,%22image_key%22:%22StoryArt%7Ced9b22f0-e0c0-11e8-a863-1204ac6e63e2%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%224b40ca94-1280-4d79-9535-f4c4e88f8918_ROOT%22,%22appView%22:%22storyArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="a5495d70-9bea-43a5-b860-c86937b333a3"><div className="image-rotator-image " style="background-image: url(&quot;https://occ-0-7-6.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABe0rhiL1u6m_Kvhe7LRF3qJ8ch47kLjAWfxwaY2eGmel4adgzL141tiB5TnHWEmc5cm9FUZrhC9VVsWZurDMl3ETknJX.webp?r=3e9&quot;); z-index: 2; opacity: 1; transition-duration: 750ms;"></div></div></span></div>




<div className="bob-overlay bob-overlay-hidden"><div className="bob-play-hitzone"></div><a aria-label="El hoyo" className="bob-jaw-hitzone" href="/title/81128579"></a><div className="bob-overview-wrapper"><div className="bob-overview"><div className="bob-buttons-wrapper" data-uia="mini-modal-controls"><a tabindex="0" role="link" aria-label="Reproducir - comenzar con el audio descriptivo activado" data-uia="play-button-a11y" className="visually-hidden ad-playlink" href="/watch/81128579?trackId=253835296&amp;tctx=24%2C1%2C3dc673da-15c4-486e-990d-76c510185f26-1352355%2C4b40ca94-1280-4d79-9535-f4c4e88f8918_16683488X28X8933X1587684198261%2C4b40ca94-1280-4d79-9535-f4c4e88f8918_ROOT&amp;ad=true"><span className="visually-hidden">&nbsp;</span></a><a tabindex="0" data-uia="play-button" role="link" aria-label="Reproducir" className="bob-play-button playLink" href="/watch/81128579?trackId=253835296&amp;tctx=24%2C1%2C3dc673da-15c4-486e-990d-76c510185f26-1352355%2C4b40ca94-1280-4d79-9535-f4c4e88f8918_16683488X28X8933X1587684198261%2C4b40ca94-1280-4d79-9535-f4c4e88f8918_ROOT"><span className="play-button"><svg className="svg-icon svg-icon-play-with-ring" focusable="true"><use filter="" xlink:href="#play-with-ring"></use></svg></span></a></div><div className="bob-title">El hoyo</div><div className="bob-overview-resume-title-wrapper"></div><div className="bob-metadata-wrapper"><div className="meta video-meta video-meta--bob-overview"><span className="match-score-wrapper"><div className="show-match-score rating-inner"><div className="meta-thumb-container thumb-down"><svg className="svg-icon svg-icon-thumb-down-filled thumb thumb-down-filled" focusable="true"><use filter="" xlink:href="#thumb-down-filled"></use></svg></div><div className="meta-thumb-container thumb-up"><svg className="svg-icon svg-icon-thumb-up-filled thumb thumb-up-filled" focusable="true"><use filter="" xlink:href="#thumb-up-filled"></use></svg></div><span className="match-score">85&nbsp;% para ti</span></div></span><span className="maturity-rating "><span className="maturity-number">TV-MA</span></span><span className="duration">1 h 34&nbsp;min</span></div></div><div className="bob-overview-evidence-wrapper"><div className="evidence-tags"><div className="evidence-list"><div className="evidence-item"><span className="evidence-text">Inquietante</span></div><div className="evidence-item"><span className="evidence-separator"></span><span className="evidence-text">Violento</span></div><div className="evidence-item"><span className="evidence-separator"></span><span className="evidence-text">Psicológico</span></div></div></div></div><div className="bob-content-warning-wrapper"></div></div></div><div className="bob-actions-wrapper"><span className="ActionButtons"><div className="global-supplemental-audio-toggle"><div className="nf-svg-button-wrapper" data-uia=""><a role="link" tabindex="0" className="nf-svg-button simpleround" aria-label="Activar el audio"><svg className="svg-icon svg-icon-audio-off" focusable="true"><use filter="" xlink:href="#audio-off"></use></svg></a></div></div><div className="thumbs-component thumbs thumbs-vertical animated unrated" data-uia="thumbs-container"><div className="nf-svg-button-wrapper thumb-container thumb-up-container " data-uia=""><a role="link" data-rating="2" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar arriba"><svg data-rating="2" className="svg-icon svg-icon-thumb-up" focusable="true"><use filter="" xlink:href="#thumb-up"></use></svg></a></div><div className="nf-svg-button-wrapper thumb-container thumb-down-container " data-uia=""><a role="link" data-rating="1" tabindex="0" className="nf-svg-button simpleround" aria-label="Calificación pulgar abajo"><svg data-rating="1" className="svg-icon svg-icon-thumb-down" focusable="true"><use filter="" xlink:href="#thumb-down"></use></svg></a></div></div><div className="ptrack-content" data-ui-tracking-context="%7B%22lolomo_id%22:%224b40ca94-1280-4d79-9535-f4c4e88f8918_ROOT%22,%22list_id%22:%224b40ca94-1280-4d79-9535-f4c4e88f8918_16683488X28X8933X1587684198261%22,%22location%22:%22browseTitles%22,%22rank%22:1,%22request_id%22:%223dc673da-15c4-486e-990d-76c510185f26-1352355%22,%22row%22:24,%22track_id%22:253835296,%22video_id%22:81128579,%22supp_video_id%22:1,%22appView%22:%22addToMyListButton%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="3d5d2afa-3eee-4358-8aa1-8a38f75f5294"><div className="nf-svg-button-wrapper mylist-button" data-uia="myListButton"><a role="link" tabindex="0" className="nf-svg-button simpleround"><svg className="svg-icon svg-icon-mylist-add" focusable="true"><use filter="" xlink:href="#mylist-add"></use></svg></a><span className="nf-svg-button-tooltip" role="status" aria-live="assertive">Agregar a Mi lista</span></div></div></span></div><div className="bob-chevron-wrapper"><div className="bob-jawbone-chevron"><svg className="svg-icon svg-icon-chevron-down" focusable="true"><use filter="" xlink:href="#chevron-down"></use></svg></div></div></div>














//     {videoUploadType==='upload' && !uploadVideoDone && !uploadProgress? null:null}






                          <svg className="" focusable="true" style={{height: "24px", width: "24px", display: "block"}}>
                            <use xlinkHref="#episodes"></use>
                          </svg>

*/



