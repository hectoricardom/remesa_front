import * as _Util from '../lib/Util'

const GRAPHQLURL = "https://hrmfinance.com";





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




  
export function AddStockTakings(doc, dispatch,state,operations, dID){
    const query= `
    mutation($doc: NewStockTaking!){
      payload:  addStockTaking(stockTaking: $doc) {
         id
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {     
      var payL = res.data.payload;
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };




export function UpdStockTakings(doc, dispatch,state,operations, dID){
    const query= `
    mutation($doc: UpdateStockTaking!){
      payload:  updateStockTaking(stockTaking: $doc) {
          id
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {      
      var payL = res.data.payload;
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };




export function RmvStockTakings(doc, dispatch, state, operations, dID){   
    const query= `
      mutation($doc: UpdateStockTaking!){
        payload:  removeStockTaking(stockTaking: $doc)
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











var SubDepartmentsFields = `
    id,
    name,
    department,
    locations{
      id,
      name
    },
    type,
    account,
    active,
    departmentParentDetail{
  
      name
    } 
`;



export function getSubDepartments(dispatch,state,operations){
    let navigations = state.navigations || {};
    let _filters = {k:"type", v:"inventory"}
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
    let _limit =  navigations[operations]["limit"]?navigations[operations]["limit"]:250;
    let _page =  navigations[operations]["page"]?navigations[operations]["page"]:1;
    var doc = {limit:_limit,page:_page ,sortBy:'name.desc'};
    if(typeof dP === "object"){
      doc = dP?dP:{limit:_limit,page:_page ,sortBy:'name.desc'};
    }

    // if(_query){doc['query'] = `name,upc,id:`+_query};
     // if(true){doc['test'] = true};
     // if(_filters){doc['filter'] = `${_filters.k}:${_filters.v}`};
      
      const query= ` 
      query($doc: FindSubDepartment!){
        payload:  getSubDepartmentsAll(subDepartment: $doc) {
          total,
          limit,
          time2Response,
          page,
          list{
            ${SubDepartmentsFields}
            
          }
        }
      } 
      `;
      let variables={doc};    
      _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
      .then(res => {
        var nav = res.data.payload;
        //console.log('getSubDepartmentsAll',nav)
        if(nav){
          dispatchGetData(nav,dispatch,state,operations);
          /*
          
          payL.map(sd=>{
            console.log(sd)
            if(sd.departmentParentDetail && !sd.departmentParentDetail.name){
             
              // RmvSubDepartments({id:sd.id}, dispatch,state,operations)
            }
          })
          */
        }
      })
      .catch(error => {
        console.log(error); //eslint-disable-line
      });
    };
  
  

    export function RmvSubDepartments(doc, dispatch,state,operations){
        const query= `
          mutation($doc: UpdateSubDepartment!){
            payload:  removeSubDepartment(subDepartment: $doc)
          }  
          `;
        let variables={doc};
        _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
        .then(res => {
          var b = res.data.payload
          if(b){        
           console.log(doc)
          }
        })
        .catch(error => {
          console.log(error); //eslint-disable-line
        });
      };
    
    
    