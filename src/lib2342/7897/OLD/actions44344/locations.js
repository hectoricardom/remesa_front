import * as _Util from '../lib/Util'

const GRAPHQLURL = "https://hrmfinance.com";

import {getDepartmentsById} from './departments'





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


















var LocationsFields = `
      id, 
      name,
      area,
      type,
      department,
      departmentDetail{
        name,
        departmentParentDetail{
          id,
          name
        }
      },
      stockDetails{
        inStock,
        items{
          id,
          name,
          price,
          qty,
          createdAt,
          stockDetails{
            inStock,
            movements{
              id,
              name,
              area,
              qty,
            }
          }
        }
      }

`;



export function getLocations(dispatch,state,operations){
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
  let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:150;
  let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
  var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
  if(typeof dP === "object"){
    doc = dP?dP:{limit:_limit,page:_page ,sortBy:'name.desc'};
  }




      const query= ` 
      query($doc: FindLocation!){
        payload:  getLocationsAll(location: $doc) {
          total,
          limit,
          time2Response,
          page,
          list{
            ${LocationsFields}
                     
          }
        }
      } 
      `;
      let variables={doc};    
      _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
      .then(res => {
        // console.log(operations,res.data)        
        let nav = res.data.payload;
        if(nav){
          dispatchGetData(nav,dispatch,state,operations)
        }
      })
      .catch(error => {
        console.log(error); //eslint-disable-line
      });
    };
  


 
  
    export function AddLocations(doc,dispatch,state,operations, dID){
        const query= `
        mutation($doc: NewLocation!){
          payload:  addLocation(location: $doc) {
              ${LocationsFields}
          }
        }  
        `;
        let variables={doc};
        _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
        .then(res => {     
          //console.log('AddLocations',res);
          var payL = res.data.payload;
         
          if(payL){
            if(dID){
              getDepartmentsById(dID,dispatch,state,'departments' );
            }
            //AddUpdAction(payL,dispatch,state,operations)
          }
        })
        .catch(error => {
          console.log(error); //eslint-disable-line
        });
      };
    
    
    

    
    export function UpdLocations(doc, dispatch, state, operations, dID){
        const query= `
        mutation($doc: UpdateLocation!){
          payload:  updateLocation(location: $doc) {
              ${LocationsFields}
          }
        }  
        `;
        let variables={doc};
        _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
        .then(res => {      
          var payL = res.data.payload;
          if(payL){
            if(dID){
              getDepartmentsById(dID,dispatch,state,'departments' );
            }
            // AddUpdAction(payL,dispatch,state,operations)
          }
        })
        .catch(error => {
          console.log(error); //eslint-disable-line
        });
      };
    
    
    





function RmvAction(id, dispatch, state, operations, dID){
  let dataObj =  state[operations];      
  delete dataObj[id];  
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:operations,value:dataObj}
  })  
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observeChanges',value:_Util.gen12CodeId()}
  })
}








function AddUpdAction(payL,dispatch,state,operations, dID){
  let dataObj =  state[operations];      
  dataObj[payL.id] = payL; 
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:operations,value:dataObj}
  })  
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'observeChanges',value:_Util.gen12CodeId()}
  })

}





export function getLocationsById(id,dispatch,state){
    var doc = {id:id};
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'fetchDetails',value:false}
    })  
    const query= ` 
    query($doc: FindbyIdLocation!){
      payload:  getLocationsbyId(location: $doc) {
          ${LocationsFields}
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

        let _detailLocationByID = {};
        let _prodsArr = payL && payL['stockDetails'] && payL['stockDetails']['items']?payL['stockDetails']['items']:[];
        let _prods = selectUnique(_prodsArr);
        _detailLocationByID['details'] = payL;
        _detailLocationByID['productsOnLocation'] = _prods;
        


        dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:'detailLocationByID',value:JSON.stringify(_detailLocationByID)}
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








function selectUnique(a) {
  let obj = {};
  let res = {};
  a.map(i=>{
   
    if(!obj[i.id]){
      obj[i.id] = i;
    }
    else{
     
      if(obj[i.id]['qty']<0 && i['qty']<0){
        obj[i.id]['qty'] -= i['qty'];
      }else{
        obj[i.id]['qty'] += i['qty'];
      }
    }
    //console.log(i.id, obj[i.id]['qty'], i['qty'])
    
    /*
    if(obj[i.id]){
      if(obj[i.id]['qty']>0){
        res[i.id] = i;
      }else{
        delete res[i.id];
      }
    }
     */
  })
  //console.log(obj)
  Object.keys(obj).map(id=>{
    if(obj[id]){
      if(obj[id]['qty']>0){
        res[id] = obj[id];
      }
    }
  })

  return res;
}


  
export function RmvLocations(doc, dispatch, state, operations, dID){
    const query= `
      mutation($doc: UpdateLocation!){
        payload:  removeLocation(location: $doc)
      }  
      `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload;
      if(b){
        if(dID){
          getDepartmentsById(dID,dispatch,state,'departments' );
        }
        //RmvAction(doc.id, dispatch, state, operations);
      }
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
};






