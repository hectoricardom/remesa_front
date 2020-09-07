
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import { withRedux } from '../store/redux';



import { Switch, Route ,withRouter} from 'react-router-dom';


import { UpdateRdx } from '../actions/common';

import DialogHRM from './DialogHRM';
import ViewSlideHRM from './SlideOptionHRM';

import {Icon2} from './Icons';
import Browse from './pages/browse';
import BrowseGenre from './pages/browse_genre';



import PlayerHRM from './pages/player';
import PlayerError from './playerError';

import Header from './Header_2';



import Toast from './Toast';

import DialogModal22 from './dialogModal22';


import  './_styles.css';





const _styleWatch = (idWatch) => {  
  return `

  ._${idWatch}{
    --heliumPlayer__color_fire :#e50914;
    --heliumPlayer__color_fire_2 :#bf1315;
    --heliumPlayer__color_shadow: #454545;
    --heliumPlayer__color_dark_2: #2e2e2e; 
    --heliumPlayer__color_dark_9_7: #979797; 
    --heliumPlayer__color_dark_14: #141414;
    --heliumPlayer__color_light_9: #d9d9d9;
    --heliumPlayer__color_light_2: #a2a2a2;
    --heliumPlayer__color_light_4: #b4b4b4;
    --heliumPlayer__color_light_5: #d5d5d5;
    --heliumPlayer__color_light_6: #f6f6f6;
    --heliumPlayer__color_white_: #ffffff;
    --heliumPlayer__color_blck_: #000000;
    --heliumPlayer__bckcolor_blck_opacity_:rgba(10,10,10,.695);
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



  if(!rdxOK){
    UpdateRdx(dispatch, getState )
  }
 
  return {  updKV,    goDark }
}








const Browser= (props)=>{
 
 

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
      //updKV("route_history",props.history);
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
        },350)
      })
     
    }
  });



let userProfile = _state["userProfile"] ;



let isActive =  userProfile && userProfile["isActive"]
isActive = true


let userA = _Util.getBrowser();
  
let isMobile = userA.os === "Android" || userA.os === "iPhone" || _state["outerWidth"]<550 ;


let appLoaded = true || _state["appLoaded"];
    return (
      <> 
      {!isMobile?<Header /> :null}
      <div  id={keys[90]} is-mobile={`${isMobile}`} >
        {isready && 
          <div className={!isMobile?'_app_body_content_':""}>    
          {appLoaded?       
            <Switch> 
              {!isMobile?
              <div id={`data_ui_${keys[93]}`} style={{position:"static"}}>              
                <Route path="/browse" component={Browse} /> 
                <Route path="/search" component={BrowseGenre} />    
                <Route path="/genre" component={BrowseGenre} />
                <Route path="/movie" component={BrowseGenre} /> 
                <Route path="/show" component={BrowseGenre} />
                <Route path="/watch" component={isActive?PlayerHRM:PlayerError} />
              </div>:
              <div  className={`_dsplFlx spaceAround`}  style={{margin:"105px 0 0"}}>
                <div>
                  {`The mobile version will be available soon`}
                </div>
              </div>            
            }
            </Switch>
            :null}
          </div>
          }        
          <style>{classN}</style>
        </div>
        <BackDrop />
        {isready && !isMobile?
          <Footer />
        :null}
        <DialogHRM/>
        <Toast/>
        <ViewSlideHRM/>
        <DialogModal22/>
      </>
    )
  
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
            return <FooterSocialLink socialLink={scId} />
        })}
      </div>
      <ul className="member-footer-links">     
        {linkLabelList && linkLabelList.map(lbId=>{
            return <FooterLink textId={lbId} />
        })}
      </ul>
      <div className="member-footer-copyright" >
        <span>  {_Util.translatetext(510)}   </span>
        <span className="member-footer-copyright-instance">{'@hrm'}</span>
        <p>{"hectoricardom@gmail.com"}</p>
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
    <a className="social-link"  target="_blank" aria-label={socialLink["name"]}>
        <Icon2   
          name={socialLink["iconName"]} 
          color={socialLink["iconColor"]} 
          size={36}
        />
    </a>
  )
}








