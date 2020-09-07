

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../store/redux'
import { useSelector, useDispatch } from 'react-redux'


import { withRouter} from 'react-router-dom';

import {  OpenWatchDialog , getMovies, getMoviesById, getMoviesHero} from '../../actions/common'



import * as _Util from '../../store/Util'

import '../_styles.css'

import RowViewPort from '../rowViewPort'


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
      let commonfields = ["id","title","boxarts","type"];
      let InitData = {
        "movie2Init":{params:{to:72,from:0, type:"movie"},fields:commonfields,query:"getMovies"},
        "show2Init":{params:{to:72,from:0, type:"show"},fields:commonfields,query:"getMovies"},
        "latest2Init":{params:{to:72,from:0, type:"movie", releaseYear:2020},fields:commonfields,query:"getMovies"},
        "latestShowInit":{params:{to:72,from:0, type:"show", releaseYear:2020},fields:commonfields,query:"getMovies"}
      }

      let QryHero = {params:{releaseYear:2020},fields:["id","title","boxarts","storyArt","synopsis"],query:"getHeroVideo"};
      !_heroMovies && _getMoviesHero(QryHero, "heroMovies");

      _Util.ObjectKeys(InitData).map(Qry=>{
        _getVideos(InitData[Qry], Qry);
      })
  }


  const _getVideoInfobyId = (id) => {    
    let Qry = {
      params:{id:id},
      fields:[
        "title","synopsis","storyArt","type", "releaseYear"
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
      setTimeout(()=>window.scrollTo(0,0),350);
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
  

  let _latestMovies = _state["userList"];
    return (
      <>
        <div className={`main2View browseList`} >        
          <div className={`lolomo`}>
            <RowViewPort  
              data={_latestMovies} 
              keyCode={_state.keys[66]}  
              typeBrowse={typeBrowse} 
              title={_Util.translatetext(525)}
              _key_={7} 
              _ID={7}
            />
          </div>
        </div>
      </>
    );
  
}  





export default withRouter(withRedux(BrowseComponent))
