import * as _Util from '../lib/Util'



const GRAPHQLURL = "http://localhost:7070";



function dispatchGetData(nav,dispatch,state,operations){  
  var payL = nav.list;
  let navigations = state.navigations || {};
  navigations[operations]['total'] = nav["total"];
  navigations[operations]['limit'] = nav["limit"];        
  navigations[operations]["navigationLoading"] = false;
  navigations[operations]["loadingFetch"] = false;
  navigations[operations]["requestDone"] = true;
  dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'navigations',value:navigations}
  })
  if(payL){     
    let dataObj = _Util.convertArray2Obj(payL);    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:operations,value:dataObj}
    })

    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })   
  }
}


















var VideosFields = `
    title ,    
    synopsis,
    type,
    year,
`;





/*



    delivery{

    },
    bookmarkPosition{

    },
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
export function getVideos(dispatch,state,operations, _query){
    var stT = (new Date()).getTime();
    let navigations = state.navigations || {};
    
    if(!navigations[operations]){
      navigations[operations]={}
    }
      
    if(!navigations[operations]["navigationLoading"]){
      navigations[operations]["navigationLoading"] = true;
      navigations[operations]["loadingFetch"] = true;    
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'navigations',value:navigations}
      })
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
    }
    let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:25;
    let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
    var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
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
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      console.log(res.data)
      let nav = res.data;
      if(nav && nav.payload){
        dispatchGetData(nav.payload,dispatch,state,operations)
      }
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
};







export function SearchVideos(_query, dispatch,state,operations){
  var stT = (new Date()).getTime();
  let navigations = state.navigations || {};
 
  if(!navigations[operations]){
    navigations[operations]={}
  }
    
  if(!navigations[operations]["navigationLoading"]){
    navigations[operations]["navigationLoading"] = true;
    navigations[operations]["loadingFetch"] = true;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'navigations',value:navigations}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }
  let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:25;
  let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
  var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
  if(typeof dP === "object"){
    doc = dP?dP:{limit:_limit,page:_page ,sortBy:'name.desc'};
  }
  if(_query){doc['query'] = `title, description:`+_query};
  console.log(doc)
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
  _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
  .then(res => {
    console.log(res)
    let nav = res.data;
    if(nav && nav.payload){
      dispatchGetData(nav.payload,dispatch,state,operations)
    } 
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};

















export function VideoFiles(_query, dispatch,state,operations){
  var stT = (new Date()).getTime();
  let navigations = state.navigations || {};
 
  if(!navigations[operations]){
    navigations[operations]={}
  }
    
  if(!navigations[operations]["navigationLoading"]){
    navigations[operations]["navigationLoading"] = true;
    navigations[operations]["loadingFetch"] = true;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'navigations',value:navigations}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }
  let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:125;
  let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
  var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
  if(typeof dP === "object"){
    doc = dP?dP:{limit:_limit,page:_page ,sortBy:'name.desc'};
  }
  if(_query){doc['query'] = `name:`+_query};
  console.log(doc)
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
  _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
  .then(res => {
    console.log(res)
    let nav = res.data;
    if(nav && nav.payload){ 
      let dataObj = _Util.convertArray2Obj(nav.payload);    
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:operations,value:dataObj}
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








export function updVideoFile(doc) {  
  console.log(doc)
    const query= ` 
    mutation($doc: UpdateVideoFile!){
      payload:  updateVideoFile(param: $doc) {
        id
      }
    }  
    `;
    let variables={doc};    
    console.log(query, variables)
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {  
      console.log(res)
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















































































export function getVideosByName(dispatch,state,operations, _query){
  var stT = (new Date()).getTime();
  let navigations = state.navigations || {};
  
  if(!navigations[operations]){
    navigations[operations]={}
  }
    
  if(!navigations[operations]["navigationLoading"]){
    navigations[operations]["navigationLoading"] = true;
    navigations[operations]["loadingFetch"] = true;
    navigations[operations]["page"] = 1;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'navigations',value:navigations}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }
  let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:25;
  let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
  var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
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
        ${VideosFields},
        stockDetails{
          inStock,
          movements{
            id,
            name,
            area,
            qty,
            createdAt
          }
        }
      }
    }
  } 
  `;
  let variables={doc};    
  _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
  .then(res => {
    console.log(res.data)
    let nav = res.data.payload;
    if(nav){
      dispatchGetData(nav,dispatch,state,operations)
    }
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};


export function getVideosById(id,dispatch,state){
  var doc = {id:id};
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'fetchDetails',value:false}
  })  
  const query= ` 
  query($doc: FindbyIdVideo!){
    payload:  getVideosbyId(product: $doc) {
        ${VideosFields},
        stockDetails{
          inStock,
          movements{
            id,
            name,
            area,
            qty,
            department,
            departmentDetail{
              name,
              departmentParentDetail{
                id,
                name
              }
            },
            createdAt
          }
        }
    }
  }  
  `;
  let variables={doc};    

  _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
  .then(res => {  
    console.log(res); 
    //eslint-disable-line
    var payL = res.data.payload;


    if(payL){

      let _detailVideoByID = {};
      let _prodsArr = payL && payL['stockDetails'] && payL['stockDetails']['movements']?payL['stockDetails']['movements']:[];
      _detailVideoByID['details'] = payL;
      let key = "createdAt";
      
      let _prodByDept = prodByDept(_prodsArr);
      
        let _list = _prodsArr.sort(function(a, b) {
          if(a[key] < b[key]) { return 1; }
          if(a[key] > b[key]) { return -1; }
          return 0;          
        })
      


      _detailVideoByID['productsMovements'] = _list;
      _detailVideoByID['productsByDepartment'] = _prodByDept;

      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'detailVideoByID',value:JSON.stringify(_detailVideoByID)}
      }) 
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'fetchDetails',value:true}
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




function prodByDept(a){
  let re={}
  a.map(d=>{
    let pDept =d && d.departmentDetail && d.departmentDetail.departmentParentDetail;
    if(pDept && pDept.id){
      if(!re[pDept.id]){
        re[pDept.id] = {}
        re[pDept.id]['list'] = []
        re[pDept.id]['name'] = pDept.name;
      }
      re[pDept.id]['list'].push(d);
    }
  })
  return re;
}


export function AddVideos(id,dispatch,state){



}


export function UpdVideos(id,dispatch,state){



}






var VideosFields22 = `
    id, 
    name,  
    description,      
    unit,
    upc,
    imageUrl,
    categoryID,
    category{
      name
    }
    productType,
    brand,
    department
`;



export function getVideosByCode(dispatch,state,operations, _query){

  var stT = (new Date()).getTime();
  let navigations = state.navigations || {};
  if(!navigations[operations]){
    navigations[operations]={}
  }
  let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:25;
  let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
  var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
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
        ${VideosFields22},
        stockDetails{
          inStock,
          movements{
            id,
            name,
            area,
            qty,
            createdAt
          }
        }
      }
    }
  } 
  `;
  let variables={doc};    
  _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
  .then(res => {
    let nav = res.data.payload;
    if(nav){
      let payL = nav.list
      if(payL){     
        let dataObj = state[operations]?state[operations]:{};  
        payL.map(pr=>{
          if(!dataObj[pr.id]){
            dataObj[pr.id] = pr;
          }
        })
        dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:operations,value:dataObj}
        })
        dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:'observeChanges',value:_Util.gen12CodeId()}
        })   
      }
    }
  })
  .catch(error => {
    console.log(error); //eslint-disable-line
  });
};













  





  export function RmvVideos(doc){   
      const query= `
        mutation($doc: UpdateVideo!){
          payload:  removeVideo(product: $doc)
        }  
        `;
      let variables={doc};
      _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
      .then(res => {
        var b = res.data.payload
        if(b){        
         
        }
      })
      .catch(error => {
        console.log(error); //eslint-disable-line
      });
    };
  
  

    // RmvVideos({id:"nnfabdqnzixkQJsm"})