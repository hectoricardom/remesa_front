import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

/*
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

*/













const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  listBezel: {},  
  operations:null,
  data: {},  
  forms: {},
  observeChanges:0,
  observeImage:0
}






const reducer = (state = initialState, action) => {
  switch (action.type) {    
    case "UPD_KEY_VALUE":
      return {
          ...state,
          [action.kv.key]: action.kv.value
      };
    default:
      return state
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

