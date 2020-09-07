import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'

import Icons from './Icons';

import {Icon2} from './Icons';
/*
import LOGIN from './login';
import PROFILE from './Profile';
*/

import ScrollPosition from './scroll-decorator';

import { OpenModal } from '../actions/common'
import './_styles.css';

const useObserveChanges = () => {
  let _state = _Util.getStore();
  const observeChanges =  useSelector(state => state.observeChanges);
 
  const dispatch = useDispatch();

  const updKV= (k,v) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:k,value:v}
    })  
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:"observeChanges",value:_Util.gen12CodeId()}
    })  
  }


  const OpenProfile = (i, _ID) => {
    
    let userProfile = _state["userProfile"];
    ///let COMP2RENDER = userProfile && userProfile["isActive"]?PROFILE:LOGIN; 
    let _item = userProfile && userProfile["isActive"]?userProfile:i;
    let data = {};
    data['list']=_state.listDialog;
    data['zIndex']=150;
    data['observeResize']=true;
    data['props']={title:"", id: _ID, item:_item};
    //data['content'] = COMP2RENDER;
    OpenModal(dispatch,data);
  }



 


  let _dispatch_ = dispatch;
  return {_dispatch_, updKV, OpenProfile, observeChanges}
}



const linkStyle = {
  marginRight: 15
}

const HeaderFlx =() => {


  const {  updKV, _dispatch_, OpenProfile,  observeChanges } = useObserveChanges();
  let _state = _Util.getStore();


  let _classN = styleFlx();

  const [hover, setHover] = useState(null);
  const [hoverNav, setHoverNav] = useState(null);

  
  const [text, setText] = useState("");

  const [prevPath, setPrevPath] = useState("");


  const [headerTransparent, setHeaderTransparent] = useState(true);


  let userProfile = _state["userProfile"];
  let _ftpPath = _state["ftpPath"] || "";
  let fld = _ftpPath.split('@@'); 

  let lastSearch = 0;

 
 
 const keyRouter = "hash"
  


  const handleInput = (e) => {
    let _v = e.target.value;
    if(_v){
      _state["route_history"].push({pathname:`/search`,search:`?q=${_v}` })
    }else{
      if(prevPath){
        _state["route_history"].push(prevPath)
      }else{
      _state["route_history"].push({pathname:'/browse'})
      }
      
    }
    setText(_v);
  }




  const closeSearch = (e) => {
    setHover(false);
    setText("");
    let ii = document.getElementById("_search_input_header_");
    ii.value = "";
    if(prevPath){
      _state["route_history"].push(prevPath)
    }else{
      _state["route_history"].push({pathname:'/browse'})
    }
    window.scrollTo(0,0)
  }



  const changePathSearch = (e) => {
    setHover(false);
    setText("");
    let ii = document.getElementById("_search_input_header_");
    if(ii){
      ii.value = "";
    }
    setHoverNav(false);
  }


  const OpenSearch = (e) => {
    setHover(true);
    
 



    if(!text && window.location[keyRouter].indexOf('/search')<0){
      let prevlocation = {pathname:window.location[keyRouter].split('#')[1],search:window.location.search}
      setPrevPath(prevlocation);
    }
  }



  if(hover && text && _state["route_history"] && _state["route_history"]["location"] && _state["route_history"]["location"]["pathname"] && _state["route_history"]["location"]["pathname"]!=="/search"){
    setHover(false);
    setText("");
    let ii = document.getElementById("_search_input_header_");
    ii.value = "";
  }


let _outerWidth = _state["outerWidth"]
 
let userA = _Util.getBrowser();
  
let isMobile = userA.os === "Android" || userA.os === "iPhone" || _state["outerWidth"]<720 ;


let _infoData = _state["infoData"]

  var _li_List  = _outerWidth ? <>     
            <li className="navigation-tab" onClick={()=>changePathSearch(true)}>
              <NavLink  to={{pathname:"/remesas"}} className="logo" role="slide_item">
                <a className="menu-trigger" role="button" aria-haspopup="true" tabindex="0">{`Enviar Remesa`} </a>
              </NavLink>             
            </li>           
            <li className="navigation-tab"  onClick={()=>changePathSearch(true)}>
              <NavLink  to={{pathname:"/comprar_bitcoin"}} className="logo" role="slide_item">
                <a className="menu-trigger" role="button" aria-haspopup="true" tabindex="0">{`Comprar BitCoin`} </a>
              </NavLink>              
            </li>        
            {/*
            <li className="navigation-tab"  onClick={()=>changePathSearch(true)}>
              <NavLink  to={{pathname:"/browse"}} className="logo" role="slide_item">
                <a style={linkStyle}>Mi lista</a>
              </NavLink>              
            </li>
            */}
  </>:null

let dashboard = !isMobile && userProfile && userProfile["isAdmin"] ? 
<NavLink  to={{pathname:"/dashboard"}} className="logo" role="slide_item">
  <div  className={`_search_icon_`} onClick={()=>changePathSearch(true)}>
    <Icons 
      name={'setting'} 
      color={'#555'} 
      size={24} 
      // tooltip={'delete locations'}
      // extraClass={'delete'}
    />
  </div>
</NavLink> 
:null

let NavStyle = hoverNav?{
  opacity:1,
  transitionDuration:"150ms",
  display:"block"
}:{};



const handleScroll = (e) => {

  if(e>50){
    setHeaderTransparent(false)
  }else{
    setHeaderTransparent(true)
  }

}

const handleBlur = (e) => {
  if(text.length > 0){}else{
    setHover(false);
    setText("");
    let ii = document.getElementById("_search_input_header_");
    ii.value = "";
    window.scrollTo(0,0);
  }
}



let isArrow = fld.length>1;
  return (
    <>
    <style>
      {_classN}
    </style>
    <ScrollPosition  scrollhandler={(e)=>handleScroll(e)}/>
    <div className={``}  is-mobile={`${isMobile}`}>
      <div className={`header_nav_container_  header_floating_  ${headerTransparent?'':"Wht"}`}  >
        <div className={`_dsplFlx  _w100 `}>
          {!isMobile && _outerWidth &&  _outerWidth>900?
          <ul  className={`_dsplFlx`} >
              {_li_List}
          </ul>
          : <li className="navigation-tab menuSlide">
              <span  className="logo" role="slide_item">
                <Icon2 
                  name={'menu'} 
                  color={headerTransparent?'#fff':'#5b5b5b'} 
                  size={24}
                />
              </span>             
          </li>
          }
          <div className="flexSpace"/>  
          <div className={`_right_header_content  _dsplFlx ${hover?"_hover_":""}`} >
         
            <div className={`_searchContent`}>  
            {!isMobile && <>
              <div  className={`_search_icon_`}  onClick={()=>OpenSearch(true)}>
                <Icons 
                  name={'search'} 
                  color={'#fff'} 
                  size={24}
                />
              </div>
              <span>
              {hover?
                <input onChange={(e)=>handleInput(e)} id={`_search_input_header_`} onBlur={(e)=>handleBlur(e)}/>
                :null}
              </span>
              {text.length > 0 && 
              <div  className={`_search_icon_`}  onClick={()=>closeSearch()}>
                <Icons 
                  name={'cancel'} 
                  color={'#fff'} 
                  size={24}
                />
              </div>
              }              
              <div  className={`_search_icon_`} onClick={()=>_Util.updStore("infoData",!_infoData)}>
                  <Icons 
                    name={'alert'} 
                    color={'#fff'} 
                    size={24}
                  />
                </div>
              </>
              }
              {dashboard}
              
            </div>
            </div>
          </div>
        <div className={` hd_black_bckGrnd `} style={headerTransparent?{backgroundColor:"transparent"}:{}}></div>    
      </div>      
    </div>



    </>  
  )
}





export default HeaderFlx


const styleFlx = () => {
  return `




  `
}


