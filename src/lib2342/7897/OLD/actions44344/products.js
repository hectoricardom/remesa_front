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






















var ProductsFields = `
    id, 
    name,  
    description,      
    unit,
    upc,
    imageUrl,
    price,
    categoryID,
    category{
      name
    }
    productType,
    brand,
    department
`;



export function getProducts(dispatch,state,operations, _query){
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
    query($doc: FindProduct!){
      payload:  getProductsAll(product: $doc) {
        total,
        limit,
        time2Response,
        page,
        list{
          ${ProductsFields},
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



export function getProductsByName(dispatch,state,operations, _query){
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
  query($doc: FindProduct!){
    payload:  getProductsAll(product: $doc) {
      total,
      limit,
      time2Response,
      page,
      list{
        ${ProductsFields},
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


export function getProductsById(id,dispatch,state){
  var doc = {id:id};
  dispatch({
    type: 'UPD_KEY_VALUE',
    kv:{key:'fetchDetails',value:false}
  })  
  const query= ` 
  query($doc: FindbyIdProduct!){
    payload:  getProductsbyId(product: $doc) {
        ${ProductsFields},
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

      let _detailProductByID = {};
      let _prodsArr = payL && payL['stockDetails'] && payL['stockDetails']['movements']?payL['stockDetails']['movements']:[];
      _detailProductByID['details'] = payL;
      let key = "createdAt";
      
      let _prodByDept = prodByDept(_prodsArr);
      
        let _list = _prodsArr.sort(function(a, b) {
          if(a[key] < b[key]) { return 1; }
          if(a[key] > b[key]) { return -1; }
          return 0;          
        })
      


      _detailProductByID['productsMovements'] = _list;
      _detailProductByID['productsByDepartment'] = _prodByDept;

      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'detailProductByID',value:JSON.stringify(_detailProductByID)}
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


export function AddProducts(id,dispatch,state){



}


export function UpdProducts(id,dispatch,state){



}






var ProductsFields22 = `
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



export function getProductsByCode(dispatch,state,operations, _query){

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
  query($doc: FindProduct!){
    payload:  getProductsAll(product: $doc) {
      total,
      limit,
      time2Response,
      page,
      list{
        ${ProductsFields22},
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





export function addProductsbyUPC(id) {  
  console.log(`addProductsbyUPC`)  
    var doc = {id:id};
    const query= ` 
    query($doc: FindbyIdProduct!){
      payload:  addProductsbyUPC(product: $doc) {
          ${ProductsFields}
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





  





  export function RmvProducts(doc){   
      const query= `
        mutation($doc: UpdateProduct!){
          payload:  removeProduct(product: $doc)
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
  
  

    // RmvProducts({id:"nnfabdqnzixkQJsm"})