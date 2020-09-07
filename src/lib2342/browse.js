

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../store/redux'
import { useSelector, useDispatch } from 'react-redux'


import { withRouter} from 'react-router-dom';

import {  OpenWatchDialog , getMovies, getMoviesById, getMoviesHero} from '../../actions/common'



import * as _Util from '../../store/Util'

import '../_styles.css'

import RowSlideViewPort from '../rowSlideViewPort'

import HeroComponent from '../HeroCmp'


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const dispatch = useDispatch(); 

  const _openMd = (_id, item) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;    
    data['props']={item:item}; 

    OpenWatchDialog(dispatch,data);
  }
  


  const _getVideosById= (q,operation) => {
    getMoviesById(q, dispatch, operation);
  }

  
  const _getMoviesHero= (q,operation) => {
    getMoviesHero(q, dispatch, operation);
  }



  const _getVideos = (q,operation) => {
    q["q"] = operation;
    getMovies(q, dispatch, operation);
  }


  return { 
    observeChanges,
    _getMoviesHero,
    _getVideos,
    _getVideosById,
    _openMd
  }
}




  














const BrowseComponent = (props) => {
  const {
    _getMoviesHero,
    _getVideos,
    _getVideosById,
    _openMd
  } = useObserveChanges();

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;
 

  const [initialize, setInitialize] = useState(false);

  const [widthScreen, setWidthScreen] = useState(null);
   
  
  const searchHash = window.location.search.split('?')[1]?window.location.search.split('?')[1]:null;
  const typeBrowse = window.location.hash.split('/')[1];


  const router = _Util.parseQuery(searchHash);
  
  let outerWidth = _state["outerWidth"];

  let _heroMovies =  _state["heroMovies"];


  const _getDataToInit = () => {
      let QryHero = {params:{releaseYear:2020},fields:["id","title","boxarts","storyArt","synopsis"],query:"getHeroVideo"};
      !_heroMovies && _getMoviesHero(QryHero, "heroMovies");
      let Qry = {params:{to:72,from:0, type:"movie"},fields:["id","title","boxarts","storyArt","synopsis"],query:"getMovies"};
      _getVideos(Qry, "movie2Init");
      let QryShow = {params:{to:72,from:0, type:"show"},fields:["id","title","boxarts","storyArt","synopsis"],query:"getMovies"};
      _getVideos(QryShow, "show2Init");
      let QryMLatest = {params:{to:72,from:0, type:"movie", releaseYear:2020},fields:["id","title","boxarts","storyArt","synopsis"],query:"getMovies"};
      _getVideos(QryMLatest, "latest2Init");
      let QrySLatest = {params:{to:72,from:0, type:"show", releaseYear:2020},fields:["id","title","boxarts","storyArt","synopsis"],query:"getMovies"};
      _getVideos(QrySLatest, "latestShowInit");
  }

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
    if(!initialize){
      setInitialize(true);
      if(router["title"]){        
        let id = router.title; 
        _getVideoInfobyId(id);
        setTimeout(()=>{
          _openMd(id)
        },850);
      }else{
        _getDataToInit();
      }
    }
  });
  

  let _latestMovies = _state["movie2Init"];
  let _latestShows = _state["show2Init"];   
  let _latest2Init = _state["latest2Init"]; 
  let _latestShowInit = _state["latestShowInit"]; 
  
  
    return (
      <>
        <div className={`main2View`} >
          {_heroMovies ? <HeroComponent  item={_heroMovies}  />:null}
          <div className={`lolomo`}> 

            <RowSlideViewPort  
              data={_latestMovies} 
              keyCode={_state.keys[66]}  
              typeBrowse={typeBrowse} 
              title={_Util.translatetext(525)}
              _key_={7} 
              _ID={7}
            />

            <RowSlideViewPort  
              data={_latestShows} 
              keyCode={_state.keys[68]}  
              typeBrowse={typeBrowse} 
              title={_Util.translatetext(526)}
              _key_={9} 
              _ID={9}
            />

            <RowSlideViewPort  
              data={_latest2Init} 
              keyCode={_state.keys[66]}  
              typeBrowse={typeBrowse} 
              title={_Util.translatetext(527)}
              _key_={71} 
              _ID={71}
            />

            <RowSlideViewPort  
              data={_latestShowInit} 
              keyCode={_state.keys[68]}  
              typeBrowse={typeBrowse} 
              title={_Util.translatetext(528)}
              _key_={91} 
              _ID={91}
            />

          </div>
        </div>
      </>
    );
  
}  





export default withRouter(withRedux(BrowseComponent))





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



     
  const adding = (d) => {  
    let videoList = _state["videoList"];
    var _kM = "Videos";
    Object.keys(videoList).map((_vId,inD)=>{
      let _2s = videoList[_vId];
      if(1 && _2s && inD<500 && inD>=10000){
       
        delete _2s["delivery"];
        delete _2s["promoVideo"];
        delete _2s["queue"];
        delete _2s["runtime"];
        delete _2s["availability"];
        delete _2s["userRating"];
        delete _2s["userRatingRequestId"];
        delete _2s["summary"];
        delete _2s["regularSynopsis"];
        _2s["id"] = _vId;

        let Qry = {form:_2s,fields:["title", "id", "synopsis", "boxarts"],query:"upgradeVideo"};
        
        //_addVideo(Qry, _kM);
      }
     
    })
    
  }



  const addingSeason = (d) => {  
    let videoList = _state["videoList"];
    var _kM = "Episodes";
    let arr = Object.keys(videoList)
    var inD = 0;
    setInterval(()=>{
      let _vId = arr[inD];
      let _2s = _vId && videoList[_vId];
      if(1 && _vId && _2s && inD<2){
        _2s["id"] = _vId;
        let Qry = {
          form:_2s,
          fields:[
            "id", 
        ],query:"upgradeVideo",collection:"Episodes"};
       // _addVideo(Qry, _kM);
      }
      inD +=1;
    },330)
    
  }                     

*/



