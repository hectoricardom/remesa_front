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














var DepartmentsFields = `
    id, 
    name,  
    description,
    store
    
`;



export function getDepartments(dispatch,state,operations){
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




      console.log(doc)
      const query= ` 
      query($doc: FindDepartment!){
        payload:  getDepartmentsAll(department: $doc) {
          total,
          limit,
          time2Response,
          page,
          list{
            ${DepartmentsFields},
            sections{
              id,
              name,
              type,
              account,
              active              
            }            
          }
        }
      } 
      `;
      let variables={doc};    
      _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
      .then(res => {
        console.log(operations,res.data)        
        let nav = res.data.payload;
        if(nav){
          dispatchGetData(nav,dispatch,state,operations)
        }
      })
      .catch(error => {
        console.log(error); //eslint-disable-line
      });
    };
  


 
  
    export function AddDepartments(doc,dispatch,state,operations){
        const query= `
        mutation($doc: NewDepartment!){
          payload:  addDepartment(department: $doc) {
              ${DepartmentsFields}
          }
        }  
        `;
        let variables={doc};
        _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
        .then(res => {     
          var payL = res.data.payload;
          if(payL){
            AddUpdAction(payL,dispatch,state,operations)
          }
        })
        .catch(error => {
          console.log(error); //eslint-disable-line
        });
      };
    
    
    

    
    export function UpdDepartments(doc,dispatch,state,operations){
        const query= `
        mutation($doc: UpdateDepartment!){
          payload:  updateDepartment(department: $doc) {
              ${DepartmentsFields}
          }
        }  
        `;
        let variables={doc};
        _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
        .then(res => {      
          var payL = res.data.payload;
          if(payL){
            AddUpdAction(payL,dispatch,state,operations)
          }
        })
        .catch(error => {
          console.log(error); //eslint-disable-line
        });
      };
    
    
    




function AddUpdAction(payL,dispatch,state,operations){
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





function RmvAction(id,dispatch,state,operations){
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




export function getDepartmentsById(id,dispatch,state){
    var doc = {id:id};
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'fetchDetails',value:false}
    }) 
    const query= ` 
    query($doc: FindbyIdDepartment!){
      payload:  getDepartmentsbyId(department: $doc) {
          ${DepartmentsFields}
          ,sections{
            id,
            name,
            type,
            account,
            active,
            locations{
              id,
              name,
              area,
              stockDetails{
                inStock,
                items{
                  id,
                  name,                   
                  qty,
                }
              }
            }
          } 
          
      }
    }  
    `;
    let variables={doc};    

    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {  
      console.log(res); //eslint-disable-line
      var payL = res.data.payload;
      if(payL){
        dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:'detailDepartmentByID',value:payL}
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



  
export function RmvDepartments(doc,dispatch,state,operations){
    const query= `
      mutation($doc: UpdateDepartment!){
        payload:  removeDepartment(department: $doc)
      }  
      `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload;
      if(b){     
        let dd = state['detailDepartmentByID'];
        if(dd['id']===doc.id){
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'detailDepartmentByID',value:null}
          }) 
        }
        RmvAction(doc.id, dispatch, state, operations); 
        
      }
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
};








export function getDepartmentsByName(name,dispatch,state,operations){
    if(!name){
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'departmentsByName',value:{}}
      })  
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeChanges',value:_Util.gen12CodeId()}
      })
    }
    var doc = {limit:7,page:1 ,sortBy:'name.desc'};
    if(name){doc['query'] = `name:`+name};
    let _test = true
    if(_test){doc['test'] = true}; 
    // console.log(doc)
    const query= `
    query($doc: FindDepartment!){
      payload:  getDepartmentsAll(department: $doc) {
        total,
        limit,
        time2Response,
        page,
        list{
          ${DepartmentsFields},
          sections{
            id,
            name,
            type,
            account,
            active,
            locations{
              id,
              name
            }
          }
          
        }
      }
    } 
    `;
    let variables={doc};    
    name &&  _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
        var payL = res.data.payload.list;
        console.log('getDepartmentsByName',res.data);
        if(payL){
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'departmentsByName',value:_Util.convertArray2Obj(payL)}
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


  






  
  
  export function UpdSubDepartments(doc,dispatch,state,operations){
      const query= `
      mutation($doc: UpdateSubDepartment!){
        payload:  updateSubDepartment(subDepartment: $doc) {
            id
        }
      }  
      `;
      let variables={doc};
      _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
      .then(res => {      
        
      })
      .catch(error => {
        console.log(error); //eslint-disable-line
      });
    };
  
  
  
  