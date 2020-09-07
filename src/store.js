import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as _Util from './lib/Util'

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}


export function initializeClassName(){
  let maskClassName = {};
  let classes = [
    'N3Hzgf','rFrNMe','jjwyfe',
    'u3bW4e','CDELXb','Wic03c',
    'aCsJod','oJeWuf','Xb9hP',
    'aXBtI','whsOnd','zHQkBf',
    'AxOyFc','AxOyFc','snByac',
    'i9lrp','cXrdqd','Y2Zypf',
    'OabDMe', 'mIZh1c',"btn_base",
    "hover_base","blue_white",
    "light_blue","INVALID","fire_brick",
    "focus_active", "ripple_in", "ripple_out"   
  ]

  classes.map(cl=>{
    maskClassName[cl] = `_${_Util.gen12CodeId()}_`;
  }) 
  return maskClassName
  
} 




export function initializeKeys(){
  let Kr = {}
  let ks = Array.from(Array(100).keys());
  ks.map(_k=>{
    Kr[_k] = `_${_Util.gen12CodeId()}_`;
  })
  return Kr;
}



var _genres= {
  3063:{name:"Anime"},
  1492:{name:"Ciencia ficción y fantasía"},
  31574:{name:"Clásicas"},
  6548:{name:"Comedias"},
  11559:{name:"Comedias de stand&nbsp;up"},
  7627:{name:"De culto"},
  4370:{name:"Deportes"},
  108663:{name:"Diablitos y calaveras"},
  2243108:{name:"Documentales"},
  5763:{name:"Dramas"},
  26835:{name:"Fe y espiritualidad"},
  7077:{name:"Independientes"},
  783:{name:"Infantiles y familiares"},
  78367:{name:"Internacional"},
  5977:{name:"LGBTQ"},
  52852:{name:"Música y musicales"},
  8883:{name:"Romances"},
  5824:{name:"Sobre crímenes"},
  8711:{name:"Terror"},
  8933:{name:"Thrillers"},
  11714:{name:"Dramas de TV"},
  83059:{name:"Series y programas de TV de terror"},
  1372:{name:"Ciencia ficción y fantasía para TV"},
  1819174:{name:"Programas de TV basados en libros"},
  67644:{name:"TV mexicana"},
  67708:{name:"TV latinoamericana"},
  920:{name:"Películas basadas en la vida real"},
  1096:{name:"Películas biográficas"},
  9889:{name:"Películas basadas en libros"},
  1255:{name:"Dramas románticos"},   
  26146:{name:"TV sobre crimen"},
  10741:{name:"Música latina"},
  2192320:{name:"Programas basados en cómics"},
  52847:{name:"Comedias familiares"},    
  65437:{name:"Películas de Disney"},    
  43040:{name:"Comedias de acción"},  
  11881:{name:"Animación para adultos"},
  1365:{name:"Acción y aventuras"},
  43048:{name:"Thrillers de acción"},
  9584:{name:"Acción y aventuras criminales"},
  31851:{name:"Películas de gánsteres"},
  89811:{name:"Thrillers de TV"},
};





function initializeGenres(){
  return _genres;
}






const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  observeChanges:'Init01',
  listDialog: {},
  navigations: {},
  operations:null,
  data: {},
  // wnW: window,
  keys:initializeKeys(),
  maskClassName:initializeClassName(),
  forms: {},
  genres:initializeGenres()
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      }
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      }
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      }
    case "UPD_KEY_VALUE":
      return {
          ...state,
          [action.kv.key]: action.kv.value
      };
    default:
      return state
  }
}





/*



{"Gastos":{"updated":{"0":1529253099255},"index":[0],"path":["data/Gastos_0000.json"]},"Ingresos":{"updated":{"0":1529523397218},"index":[0],"path":["data/Ingresos_0000.json"]},"ChangesObserver":{"updated":{"0":1529886301800},"index":[0],"path":["data/ChangesObserver_0000.json"]},"User":{"updated":{"0":1530486235309},"index":[0],"path":["data/User_0000.json"]},"Logins":{"updated":{"0":1530486235310},"index":[0],"path":["data/Logins_0000.json"]},"ListRoles":{"updated":{"0":1530834251178},"index":[0],"path":["data/ListRoles_0000.json"]},"Groups":{"updated":{"0":1530834251178},"index":[0],"path":["data/Groups_0000.json"]},"Kids":{"updated":{"0":1530834251179},"index":[0],"path":["data/Kids_0000.json"]},"Assistances":{"updated":{"0":1531784176030},"index":[0],"path":["data/Assistances_0000.json"]},"ingresos":{"updated":{"0":1532478898195},"index":[0],"path":["data/ingresos_0000.json"]},"Code":{"updated":{"0":1548913900615},"index":[0],"path":["data/Code_0000.json"]},"Attendances":{"updated":{"0":1560494428962},"index":[0],"path":["data/Attendances_0000.json"]},"Clients":{"updated":{"0":1584655936895},"index":[0],"path":["data/Clients_0000.json"]},"Loans":{"updated":{"0":1584655936896},"index":[0],"path":["data/Loans_0000.json"]},"LoanPayments":{"updated":{"0":1584655936897},"index":[0],"path":["data/LoanPayments_0000.json"]},"Places":{"updated":{"0":1584902278537},"index":[0],"path":["data/Places_0000.json"]},"PlacesQuery":{"updated":{"0":1584902278538},"index":[0],"path":["data/PlacesQuery_0000.json"]},"AuthCredentials":{"updated":{"0":1585327138004},"index":[0],"path":["data/AuthCredentials_0000.json"]},"Products":{"updated":{"0":1585406903506},"index":[0],"path":["data/Products_0000.json"]},"Locations":{"updated":{"0":1585406903506},"index":[0],"path":["data/Locations_0000.json"]},"StockTakings":{"updated":{"0":1585692572058},"index":[0],"path":["data/StockTakings_0000.json"]},"UPC_Products":{"updated":{"0":1585855085495},"index":[0],"path":["data/UPC_Products_0000.json"]},"Departments":{"updated":{"0":1585963815962},"index":[0],"path":["data/Departments_0000.json"]},"SubDepartments":{"updated":{"0":1586106985330},"index":[0],"path":["data/SubDepartments_0000.json"]},"OrdersTrack":{"updated":{"0":1592073593775},"index":[0],"path":["data/OrdersTrack_0000.json"]},"Remesas":{"updated":{"0":1597522614552},"index":[0],"path":["data/Remesas_0000.json"]},"Videos":{"updated":{"0":1598128898697},"index":[0],"path":["data/Videos_0000.json"]},"Seasons":{"updated":{"0":1598128898698},"index":[0],"path":["data/Seasons_0000.json"]},"Episodes":{"updated":{"0":1598128898698:"1":0},"index":[0,1],"path":["data/Episodes_0000.json","data/Episodes_0001.json"]}


*/