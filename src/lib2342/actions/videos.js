import * as _Util from '../store/Util'



import {loadMediadata} from '../component/lib/common'






function dispatchGetData(nav,dispatch,operations){  
  var payL = nav.list;  
  let state = _Util.getStore();
  let navigations = state.navigations || {};
  if(!navigations[operations]){
    navigations[operations] = {};
  }
  navigations[operations]['total'] = nav["total"];
  navigations[operations]['limit'] = nav["limit"];        
  navigations[operations]["navigationLoading"] = false;
  navigations[operations]["loadingFetch"] = false;
  navigations[operations]["requestDone"] = true;  
  _Util.updStore("navigations",navigations) 
  if(payL){     
    let dataObj = _Util.convertArray2Obj(payL);
    _Util.updStore(operations,dataObj) 
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }
}















var VideosFields = `
    id,
    title ,    
    synopsis,
    type,
    year,    
    userRating,
    boxarts,
    poster,
    seasons {
      id,
      number,    
      name
    },
    delivery{
      has3D,
      hasHD,
      hasUltraHD,
      hasHDR,
      hasDolbyVision,
      hasDolbyAtmos,
      has51Audio,
      quality,  
      duration,
      mediaID
    },
`;







var VideosExtendFields = `
    id,
    title ,    
    synopsis,
    type,
    year,    
    userRating,    
    isPlayable,
    boxarts,
    poster,
    netflixId,
    interestingMoment,
    genres,
    images,
    delivery{
      has3D,
      hasHD,
      hasUltraHD,
      hasHDR,
      hasDolbyVision,
      hasDolbyAtmos,
      has51Audio,
      quality,  
      duration,
      mediaID
    },
    thumbs{
      id,
      like{
        user
      },
      unlike{
        user
      },
      videoId,
    },
    bookmarkPosition{
      id,
      started,
      completed,
      timeline,
      duration,   
      videoId,
    },
    lastEpisode {
      episodeId,
      episodeNumber,        
      seasonId
    },
    seasons {
      id,
      number,    
      hiddenEpisodeNumbers,
      name,
      shortName,
      episodes{
        id,        
        number,
        videoRefDetails{
          id,
          title,
          netflixId,
          interestingMoment,
          synopsis,
          bookmarkPosition{
            id,
            started,
            completed,
            timeline,
            duration,   
            videoId,
          },
        }
      },
      code
    }
`;




/*




    
    
    userRating{

    },
    thumbs{

    },
    isPlayable{
      
    },
    boxarts,
    poster,
    interestingMoment,
    genres{
      
    },
    netflixId,
    images,
    seasons {
      
    },   
    episode {
      
    } 

*/

export function getVideos(dispatch,operations, _query){
    var stT = (new Date()).getTime();
    let state = _Util.getStore();

    let navigations = state.navigations || {};
    
    if(!navigations[operations]){
      navigations[operations]={}
    }
      
    if(!navigations[operations]["navigationLoading"]){
      navigations[operations]["navigationLoading"] = true;
      navigations[operations]["loadingFetch"] = true;    
      
      _Util.updStore("navigations",navigations) 
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
    }
    let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:25;
    let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
    var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
    let dP = null;
    if(typeof dP === "object"){
      doc = dP?dP:{limit:_limit,page:_page ,sortBy:'name.desc'};
    }
    if(_query){doc['query'] = `name,upc,id:`+_query};
   
    const query= ` 
    query($doc: FindVideo!){
      payload:  getVideosAll(product: $doc) {
        total,
        limit,
        time2Response,
        page,
        list{
          ${VideosFields}
        }
      }
    } 
    `;
    let variables={doc};    
    _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
    .then(res => {
      let nav = res.data;
      if(nav && nav.payload){
        dispatchGetData(nav.payload,dispatch,operations)
      }
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
};





export function SearchVideos(params, dispatch,operations){
  var stT = (new Date()).getTime();
  let state = _Util.getStore();
  let navigations = state.navigations || {};
 
  if(!navigations[operations]){
    navigations[operations]={}
  }
    
  if(!navigations[operations]["navigationLoading"]){
    navigations[operations]["navigationLoading"] = true;
    navigations[operations]["loadingFetch"] = true;    
    
    _Util.updStore("navigations",navigations) 
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }
  let dP = null;
  let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:25;
  let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
  var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
  if(typeof dP === "object"){
    doc = dP?dP:{limit:_limit,page:_page ,sortBy:'name.desc'};
  }
  if(params["query"]){doc['query'] = `title, description:`+params["query"]};
  if(params["type"]){doc['type'] = params["type"]};
  if(params["genre"]){doc['category'] = params["genre"]};
  if(params["limit"]){doc['limit'] = params["limit"]};
  const query= ` 
  query($doc: FindVideo!){
    payload:  SearchVideos(video: $doc) {
      total,
      limit,
      time2Response,
      page,
      list{
        ${VideosFields}
      }
    }
  } 
  `;
  let variables={doc};    
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {
    let nav = res.data;
    if(nav && nav.payload){
      dispatchGetData(nav.payload,dispatch,operations)
    } 
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};





/*



latestMovies{
        total,
        limit,
        time2Response,
        page,
        list{
          ${VideosFields}
        }
      },
      latestEpisodes{
        total,
        limit,
        time2Response,
        page,
        list{
          ${VideosFields}
        }
      },
      latestShows{
        total,
        limit,
        time2Response,
        page,
        list{
          ${VideosFields}
        }
      }

*/



export function GetVideos2Init(dispatch,operations){
  var stT = (new Date()).getTime();
  let state = _Util.getStore();

  let navigations = state.navigations || {};
 
  if(!navigations[operations]){
    navigations[operations]={}
  }
    
  if(!navigations[operations]["navigationLoading"]){
    navigations[operations]["navigationLoading"] = true;
    navigations[operations]["loadingFetch"] = true;    
    
    _Util.updStore("navigations",navigations) 
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }
  let dP = null;
  let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:25;
  let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
  var doc = {limit:_limit,page:_page ,sortBy:'title.desc'};
  // console.log("getVideos2Init",doc)
  if(typeof dP === "object"){
    doc = dP?dP:{limit:_limit,page:_page ,sortBy:'title.desc'};
  } 
  
  //console.log("getVideos2Init",doc)
  const query= ` 
  query($doc: FindVideo!){
    payload:  getVideos2Init(video: $doc) {
      latestMovies{
        total,
        limit,
        time2Response,
        page,
        list{
          ${VideosFields}
        }
      },
      latestEpisodes{
        total,
        limit,
        time2Response,
        page,
        list{
          ${VideosFields}
        }
      },
      latestShows{
        total,
        limit,
        time2Response,
        page,
        list{
          ${VideosFields}
        }
      }
    }
  } 
  `;
  let variables={doc};    
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {
    
    let nav = res.data;
    //console.log({nav})
    if(nav && nav.payload){
      let latestMovies = nav.payload.latestMovies;
      //console.log({latestMovies})
      latestMovies && dispatchGetData(latestMovies,dispatch,"latestMovies");
      let latestEpisodes = nav.payload.latestEpisodes;
      //console.log({latestEpisodes})
      latestEpisodes && dispatchGetData(latestEpisodes,dispatch,"latestEpisodes");
      let latestShows = nav.payload.latestShows;
      latestShows && dispatchGetData(latestShows,dispatch,"latestShows");
      //console.log({latestShows})

     
    } 
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};











export function getVideosById(id,dispatch){
  var doc = {id:id};  
  _Util.updStore("fetchDetails",false) 
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observeChanges',value:_Util.gen12CodeId()}
  })
  const query= ` 
  query($doc: FindbyIdVideo!){
    payload:  getVideosbyId(video: $doc) {
        ${VideosExtendFields}
    }   
  }  
  `;
  let variables={doc};    
  //console.log("getVideosById header",doc); 
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {  
    //console.log("getVideosById",res); 
    //eslint-disable-line
    var payL = res.data.payload;


    if(payL){      
      _Util.updStore("detailVideoByID",payL) 
      _Util.updStore("fetchDetails",true) 
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
    }
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};





export function getTitleDetailandSimilar(id,dispatch){
  var doc = {id:id};
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'fetchDetails',value:false}
  })  
  const query= ` 
  query($doc: FindbyIdVideo!){
    payload:  getTitleDetailandSimilar(video: $doc) {
      detail{
        ${VideosExtendFields}
        
      },
      similar{
        total,
        limit,
        time2Response,
        page,
        list{
          ${VideosFields}
        }
      }
    }   
  }  
  `;
  let variables={doc};    
  //console.log("getVideosById header",doc); 
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {  
     //console.log("getVideosById",res); 
    //eslint-disable-line
    var payL = res.data && res.data.payload;  
 
    if(payL){
      let details = payL["detail"]          
      _Util.updStore("detailVideoByID",details)   
      _Util.updStore("fetchDetails",true) 
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
      let similar = payL["similar"];
      similar && dispatchGetData(similar,dispatch,"similarList");
    }
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};








    
export function AddVideo(doc, dispatch, operations, dID){
  const query= `
  mutation($doc: NewVideo!){
    payload:  addVideo(video: $doc) {
        id
    }
  }  
  `;
  let variables={doc};
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {         
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};




    
export function AddSeason(doc, dispatch,  operations, dID){
  let parentID = doc.parent;
  const query= `
  mutation($doc: NewSeason!){
    payload:  addSeason(season: $doc) {
        name,
        number,
        year
    }
  }  
  `;
  let variables={doc};
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {
    getVideosById(parentID,dispatch)       
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};










    
export function UpdVideos(doc, dispatch, operations, dID){
  const query= `
  mutation($doc: UpdateVideo!){
    payload:  updateVideo(video: $doc) {
        ${VideosExtendFields}
    }
  }  
  `;
  let variables={doc};
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {      
    var payL = res.data.payload;    
    _Util.updStore("detailVideoByID",payL)    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};







export function AddGenre2Video(doc) {  
    const query= ` 
    mutation($doc: FindbyIdGenre!){
      payload:  addGenre2Video(video: $doc)
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
    .then(res => {      
      
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  
}


export function RmvGenre2Video(doc) { 
    const query= ` 
    mutation($doc: FindbyIdGenre!){
      payload:  removeGenre2Video(video: $doc)
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
    .then(res => {
      if(res && res.data && res.data.payload){
        
      }      
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  
}











export function addEpisode2Season(doc, dispatch, operations, dID){
    const query= ` 
    mutation($doc: NewEpisodes!){
      payload:  addEpisode(episode: $doc){
        id,
      }
    } 
    `;
    let variables={doc};
    _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
    .then(res => { 
      //console.log(res);
      if(res && res.data && res.data.payload){        
        //getVideosById(doc.videoRef,dispatch,state)
      }
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  
}



export function rmvEpisode2Season(doc, dispatch,  operations, dID){
  const query= ` 
  mutation($doc: UpdateEpisodes!){
    payload:  removeEpisode(episode: $doc)
  } 
  `;
  let variables={doc};
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {     
    if(res && res.data && res.data.payload){        
     getVideosById(doc.videoRef,dispatch)
    }
  }).catch(error => {      
    console.log(error); //eslint-disable-line
  });

}












































































export function VideoFiles(_query, dispatch,operations){
  var stT = (new Date()).getTime();
  let state = _Util.getStore();
  let navigations = state.navigations || {};
 
  if(!navigations[operations]){
    navigations[operations]={}
  }
    
  if(!navigations[operations]["navigationLoading"]){
    navigations[operations]["navigationLoading"] = true;
    navigations[operations]["loadingFetch"] = true;
    _Util.updStore(navigations,navigations)    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }

  let dP = null;
  let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:125;
  let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
  var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
  if(typeof dP === "object"){
    doc = dP?dP:{limit:_limit,page:_page ,sortBy:'name.desc'};
  }
  if(_query){doc['query'] = `name:`+_query};
  const query= ` 
  query($doc: FindVideo!){
    payload:  getVideoFiles(video: $doc) {
      id,       
      originalFile{
        type,
        name, 
        size
      },
      processing,
      isAllowResize,
      quality,
      metadata{
        codecString,
        bitrate, 
        coding,
        duration, 
        frameRate, 
        width, 
        height
      }
    }
  } 
  `;
  let variables={doc};    
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {
    //console.log(res)
    let nav = res.data;
    if(nav && nav.payload){ 
      let dataObj = _Util.convertArray2Obj(nav.payload);    
      
      _Util.updStore(operations,dataObj)      
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })  
    } 
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};












export function getVideoHLMById(id,dispatch,state){
  var doc = {id:id};
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'fetchDetails',value:false}
  })  
  const query= ` 
  query($doc: FindbyIdVideo!){
    payload:  getIdPlayableHLS(video: $doc)
  }  
  `;
  let variables={doc};    
  //console.log("getVideosById header",doc); 
  _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
  .then(res => {  
    //console.log("getVideosById",res); 
    //eslint-disable-line
    var payL = res.data.payload;
    if(payL){
      let url = window.HrmConfig["url"]+"/Stream28/"+payL+".hlm";
      window.urlHLm  = url;
      _Util.updStore('_url',url)
      loadMediadata(url,dispatch, {pathname:`/player`,search:`?v=${id}` } );  
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
    }
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};

































export function updVideoFile(doc) {  
  //console.log(doc)
    const query= ` 
    mutation($doc: UpdateVideoFile!){
      payload:  updateVideoFile(param: $doc) {
        id
      }
    }  
    `;
    let variables={doc};    
    //console.log(query, variables)
    _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
    .then(res => {  
      /*
      var payL = res.data.payload;
      let dataObj =  state.products;      
      dataObj[payL.id] = payL; 
      */

     
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };




  export function RmvVideoFile(doc, dispatch, state, operations, qry){   
    const query= `
      mutation($doc: UpdateVideoFile!){
        payload:  removeVideoFile(param: $doc)
      }  
      `;
    let variables={doc};
    _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
    .then(res => {
      VideoFiles(qry, dispatch,state,operations)      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };








































































  





  export function RmvVideo(doc, dispatch, operations, qry){    
      const query= `
        mutation($doc: UpdateVideo!){
          payload:  removeVideo(video: $doc)
        }  
        `;
      let variables={doc};
      _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
      .then(res => {
        SearchVideos({query:qry}, dispatch,operations)
      })
      .catch(error => {
        console.log(error); //eslint-disable-line
      });
    };
  
  

    // RmvVideos({id:"nnfabdqnzixkQJsm"})





    export function RmvSeason(doc, dispatch, videoRef ){   
      const query= `
        mutation($doc: UpdateSeason!){
          season:  removeSeason(season: $doc)
        }  
        `;
      
      let variables={doc};
      _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
      .then(res => {
        getVideosById(videoRef,dispatch)        
      })
      .catch(error => {
        console.log(error); //eslint-disable-line
      });
    };

    



































    export function getUsers(dispatch) {  
      
      let doc = {id:"asdit"}
        const query= ` 
        query($doc: FindbyIdUser!){
          payload:  getUsersList(user: $doc) {
            id,
            username,
            isAdmin, 
            isActive,           
            ips,            
            isAutoPlay
          }
        }  
        `;
        let variables={doc}; 
        _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
        .then(res => {  
          let anonymous = {
            id:_Util.gen12CodeId(),
            username:"anonymous",
            isAdmin:false, 
            isActive:true,       
            isAutoPlay:false
          }
          let pp = res.data && res.data.payload || anonymous;          
          _Util.updStore('usersList',pp)
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'observeChanges',value:_Util.gen12CodeId()}
          })
        })
        .catch(error => {
          console.log(error); //eslint-disable-line
        });
      };
    
    
    
    
      export const  login = async (doc,dispatch, operations, dID) => {
       
        _Util.Auth(_Util.get_GRAPHQLURL(),doc)
        .then(res => {      
          let payload = res && res["data"]; 
          if(payload && payload.authtoken){
            //window.localStorage.setItem('hrm_auth_token_media',payload.authtoken); 
            let Authkey ='hrm_auth_token_media';
            var h = new RegExp('=','g')
            var _token = payload.authtoken.replace(h,'@');
            let _now = (new Date()).getTime();
            var _expire = (new Date(_now + 60000*60*24*365));
            document.cookie = `${Authkey}=${_token}; expires=${_expire}; path=/;g_state = {"i_l":1,"i_p":${_now}}`;  
            window.localStorage.setItem(Authkey,_token);
            let pp = payload; 
            delete pp["authtoken"];            
            _Util.updStore('userProfile',pp)
            _Util.updStore('userLoginError',false)  
            window.location.href = window.location.origin;          
          }
          else{            
            _Util.updStore('userLoginError',true)
          }
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'observeChanges',value:_Util.gen12CodeId()}
          })
        })
        .catch(error => {
          console.log(error); //eslint-disable-line
        });
        
      }

/*

      export function login(doc,dispatch) { 
          const query= ` 
          query($doc: NewUser!){
            payload:  login(user: $doc) {
              id,
              username,
              isAdmin,
              isActive,
              authtoken
            }
          }  
          `;
          let variables={doc}; 
          console.log({query,variables})
          _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
          .then(res => {  
            let payload = res.data && res.data.payload;
            if(payload && payload.authtoken){
                window.localStorage.setItem('hrm_auth_token_media',payload.authtoken);
              
              let pp = payload; 
              delete pp["authtoken"];
              dispatch({
                type: 'UPD_KEY_VALUE',
                kv:{key:"userLoginError",value:false}
              })
              dispatch({
                type: 'UPD_KEY_VALUE',
                kv:{key:"userProfile",value:pp}
              })
              dispatch({
                type: 'UPD_KEY_VALUE',
                kv:{key:'observeChanges',value:_Util.gen12CodeId()}
              })
            }else{
              dispatch({
                type: 'UPD_KEY_VALUE',
                kv:{key:"userLoginError",value:true}
              })
              dispatch({
                type: 'UPD_KEY_VALUE',
                kv:{key:'observeChanges',value:_Util.gen12CodeId()}
              })
            }
          })
          .catch(error => {
            console.log(error); //eslint-disable-line
          });
        };

*/


        export function AddUser(doc, dispatch) { 
            const query= ` 
            mutation($doc: NewUser!){
              payload:  addUser(user: $doc) {
                username
              }
            }  
            `;
            let variables={doc}; 
            _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
            .then(res => {  
              getUsers(dispatch)
            })
            .catch(error => {
              console.log(error); //eslint-disable-line
            });
          };
  



          export function UpdUser(doc,dispatch) {            
              const query= ` 
              mutation($doc: UpdateUser!){
                payload:  updateUser(user: $doc) {
                  id,
                  username,
                  isAdmin,
                  isActive
                }
              }  
              `;
              let variables={doc};    
              _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
              .then(res => { 
                setTimeout(()=>{                 
                  getUsers(dispatch)
                },350)                
              })
              .catch(error => {
                console.log(error); //eslint-disable-line
              });
            };





          export function RmvUser(doc,dispatch) {            
              const query= ` 
              mutation($doc: UpdateUser!){
                payload:  removeUser(user: $doc)
              }  
              `;
              let variables={doc};    
              _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
              .then(res => {  
                getUsers(dispatch)
              })
              .catch(error => {
                console.log(error); //eslint-disable-line
              });
            };






  export function LoadUSerData(doc,dispatch) {

    const query= ` 
      query($doc: FindbyIdUser!){
        payload:  getUsersbyId(user: $doc) {
          id,
          username,
          isAdmin,
          isActive
        }
      }  
      `;
    let variables={doc};    
    _Util.fetchGraphQL(_Util.get_GRAPHQLURL(),{query,variables}) 
    .then(res => {
      let anonymous = {
        id:_Util.gen12CodeId(),
        username:"anonymous",
        isAdmin:false, 
        isActive:true,       
        isAutoPlay:false
      }
      let pp = res && res.data && res.data.payload || anonymous;     
      if(pp){
        _Util.updStore('userProfile',pp)
        _Util.updStore('appLoaded',true)
        dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:'observeChanges',value:_Util.gen12CodeId()}
        })
      }
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });        
  }
    

