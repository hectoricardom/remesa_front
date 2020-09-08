
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import { withRedux } from '../store/redux';

import { Switch, Route ,withRouter} from 'react-router-dom';

import LoadingColorSpinner from './LoadingColorSpinner';

import { UpdateRdx, LoadData } from '../actions/common';

import DialogHRM from './DialogHRM';

import {Icon2} from './Icons';


import Remesas from './pages/remesas';

import BuyBitCoin from './pages/bitcoin';

/*
import BrowseGenre from './pages/browse_genre';



import PlayerHRM from './pages/player';
import PlayerError from './playerError';

*/
import Header from './Header';
import Login from './login';
import Details from './pages/details';


import DialogModal from './SlideModalHRM';


import  './_styles.css';





const _styleWatch = (idWatch) => {  
  return `
  ._${idWatch}{
    --heliumPlayer__bckcolor_blck_opacity_:rgba(10,10,10,.695);
    --hxrymz_color_base_hover: #ff7817;
    --hxrymz_color_base_label: #c6c6c6;
    --hxrymz_panel_background_color: #242424;
    --hxrymz_color_base_detail_label: #c6c6c6;
    --hxrymz_color_base_detail_dark_label: #e5e5e5;
    --hxrymz_color_base_detail_gray_label: #2a2a2a;
    --hxrymz_app_background_color: #263238;
  }

  `
}






const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const _state =  {};  
  const rdxOK = useSelector(state => state.rdxOK);
  const goDark = useSelector(state => state.goDark);
  
  const dispatch = useDispatch();
  const updKV= (k,v) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:k,value:v}
    })  
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:observeChanges,value:_Util.gen12CodeId()}
    })  
  }

  const getState= () => {
    return _state;
  }

  const _LoadData= (q) => {
    LoadData(q,dispatch);
  }
  

  if(!rdxOK){
    UpdateRdx(dispatch, getState )
  }
 


  return {  updKV,  _LoadData,  goDark }
}








const Browser= (props)=>{
 
  const {  updKV, _LoadData } = useObserveChanges();

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()  
  let idWatch = "";
  let classN = ""

 const [initialize, setInitialize] = useState(false);  
 const [isready, setIsready] = useState(false);  


  useEffect(() => {
    let _store = _Util.getStore();    
    if(props.history && !_store["route_history"]){
      _Util.updStore('route_history',props.history);
      updKV("route_history",props.history);
      if(props.location && props.location.pathname ===  "/"){
        props.history.push({pathname:"/remesas"})
        window.scrollTo(0,0)
      }
    }
    if(!initialize){
      window.scrollTo(0,0)
      setInitialize(true);      
      _Util.initConfig().then(d=>{
        setTimeout(()=>{
          _Util.getBrowser();         
          idWatch = keys[99];
          classN = _styleWatch(idWatch)
          setIsready(true)
          _Util.updStore('imageBlob',false);          
          window.scrollTo(0,0)
          let Qry = {
            fields:[
              "id","email","isAdmin"
            ],
            query:"findbyIdCda"
          };
          //_LoadData(Qry, "userProfile");
        },350)
      })
    }
  });



let userProfile = _state["userProfile"] ;



let authenticate = true ;



let userA = _Util.getBrowser();
  
let isMobile = userA.os === "Android" || userA.os === "iPhone" || _state["outerWidth"]<550 ;


let appLoaded = true || _state["appLoaded"];
  if(appLoaded){
    return (
      <> 
      {authenticate?
      <div  id={keys[90]} is-mobile={`${isMobile}`} >
          <Header />
          <div className={!isMobile?'_app_body_content_':""}>  
            <div id={`data_ui_${keys[93]}`} style={{position:"static"}}>
              <>
              <Switch> 
                <div>        
                  <Route path="/remesas" component={Remesas} /> 
                  <Route path="/comprar_bitcoin" component={BuyBitCoin} />
                </div>
              </Switch>
              <div  className={`mainViewInfo`} >

              </div>
              <Footer />
              </>
            </div>
          </div>   
          <style>{classN}</style>
        </div>
        :null}
        {!authenticate?
          <Login />
        :null}
        {authenticate?
        <>
          <BackDrop />
          <DialogHRM/>
          <DialogModal/>
        </>
        :null}
      </>
    )
  }
  else{
    return (
      <div className={`_dsplFlx spaceAround loadingContainer`}>
        <LoadingColorSpinner stroke={'#fff'} height={120} width={120}/>
      </div>
    )
  }
  
} 


export default  withRouter(withRedux(Browser))







const BackDrop= ()=>{
  const {  goDark } = useObserveChanges();
  const _goDark = goDark?1:0;
  return(
    <div className="backDrop"  tabIndex="-1" style={{opacity: _goDark, zIndex:_goDark?5000:-1}}>
      <div className="previewModal--backDrop" tabindex="-1" data-uia="previewModal--backDrop" style={{display: _goDark?"block":"none"}}></div>
    </div>
  )
}











const Footer= ()=>{


  let linkLabelList = [501,502,503,504,505,506,507,508,509];

  let linkSocialList = [
    {
      name:"facebook",
      iconName:"facebook_logo", 
      iconColor:"#9d9d9d" 
    },
    {
      name:"instagram",
      iconName:"instagram_logo", 
      iconColor:"#9d9d9d" 
    },
    {
      name:"twitter",
      iconName:"twitter_logo", 
      iconColor:"#9d9d9d" 
    },
    {
      name:"youtube",
      iconName:"youtube_logo", 
      iconColor:"#9d9d9d" 
    }
  ]



  return(
    <div role="contentinfo" className="member-footer">
      <div className="social-links">
        {linkSocialList && linkSocialList.map(scId=>{
            return <FooterSocialLink socialLink={scId} key={_Util.gen12CodeId()} />
        })}
      </div>
      <div className="member-footer-copyright" >
        <span className="member-footer-copyright-instance">{'@hrm'}</span>
        <p>{"hxrymz@gmail.com"}</p>
      </div>
    </div>
  ) 

}




const FooterLink= (props)=>{
  const {textId} = props;
  return(
    <li className="member-footer-link-wrapper">
      <a className="member-footer-link" >
        <span className="member-footer-link-content">{_Util.translatetext(textId)}</span>
      </a>
    </li>
  )
}


const FooterSocialLink= (props)=>{
  const {socialLink} = props;
  return(
    <span className="social-link"  ariaLabel={socialLink["name"]}>
        <Icon2   
          name={socialLink["iconName"]} 
          color={socialLink["iconColor"]} 
          size={36}
        />
    </span>
  )
}








