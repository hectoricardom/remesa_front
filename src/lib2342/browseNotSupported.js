
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as _Util from '../store/Util'
// import Icons from '../components/Icons'

import {  CloseModal , getFtpStream64Big } from '../actions/common'
import {  login  } from '../actions/videos'
import InputText from './InputText'



const formName = "login_"






const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges);
  const dialog=  useSelector(state => state.listDialog); 
  let _state =  useSelector(state => state);
  let list = dialog;
  const dispatch = useDispatch()

  const modal = useSelector(state => state.listDialog);
  const close = (Id) => {
    CloseModal(dispatch,{id:Id, list:list});
  }




  const clearForms= (form,v) => {
    if(!v){
      v={};
    }
    let _forms = _state.forms;
    if(!_forms[form]){
      _forms[form] = {};
    }
    _forms[form] = v;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })   
  }

 

  const _Login =  (doc,modalID) => {
    login(doc,dispatch);
    //CloseModal(dispatch,{id:modalID, list:list});
    //clearForms(formName);
  }


  const _LoginSucces =  (modalID) => {
    CloseModal(dispatch,{id:modalID, list:list});
    clearForms(formName);
  }

  const _getFtpStream64Big = (q) => {
    getFtpStream64Big(q,dispatch, _state)
  }





  const updForms= (form,field,v) => {
    let _forms = _state.forms;
    if(!_forms[form]){
      _forms[form] = {};
    }
    _forms[form][field] = v;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })   
  }
  

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

  
  let _dispatch_ = dispatch;




  return { _state, updKV, _dispatch_ ,observe,  close, updForms, _getFtpStream64Big}
}










const BNSupported = (props) => { 

  const {data} = props;  
  const { observe,  close, _state, updKV, updForms, _getFtpStream64Big} = useObserve();
  

  let browse = _Util.getBrowser()
  
  let modalID = "8790y5273tj502od"

  const getBinaryFile = (fV) => {
    let is64 = browse.is64bit?"-64":"-32";
    let vys = {pth:"programs/"+fV+is64+".exe",ext:"exe"}
    _getFtpStream64Big(vys,false,true);
  }

 

 
  console.log(browse)
 
  return(    
    <div  {...modalID?{"dialog-key-id":modalID}:""} className={`_${modalID}  browse_not_supported `} style={{minWidth:'100%', height: "100%"}}>
      <div>              
          <h3 className="title"><span>Navegador no sopportado</span></h3>
          <h4 className="title--desc"><span>puede descargar una de estas versiones.</span></h4>              
      </div>
      <div className=" _dsplFlx download_browser">  
        <div className="flexSpace"/>  
        <div className="item_browser" onClick={()=>getBinaryFile("chrome")}>
          <img src={_Util.get_GRAPHQLURL()+"/getStatic/chrome.png"} alt="chrome" />
          <div className="label">
            descargar Chrome
          </div>
        </div>
        <div className="flexSpace"/>
        <div className="item_browser"  onClick={()=>getBinaryFile("firefox")}>
          <img src={_Util.get_GRAPHQLURL()+"/getStatic/firefox.png"} alt="chrome" />
          <div className="label">
            descargar Firefox
          </div>
        </div>
        <div className="flexSpace"/>
        <div className="item_browser"  onClick={()=>getBinaryFile("opera")}>
          <img src={_Util.get_GRAPHQLURL()+"/getStatic/opera.png"} alt="chrome" />
          <div className="label">
            descargar Opera
          </div>
        </div>
        <div className="flexSpace"/>
      </div> 
      <style>{AddLocations_styles}</style>   
      <style>
            {`._${modalID}{
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
            }`
            }
      </style>                  
    </div>
  )

}






export default BNSupported




const AddLocations_styles = `








.browse_not_supported{
  border: none;
  border-top: 2px solid var(--heliumPlayer__color_fire);  
  /*
  border-bottom:  1px solid var(--heliumPlayer__color_shadow); 
  border-left:  1px solid var(--heliumPlayer__color_shadow); 
  border-right:  1px solid var(--heliumPlayer__color_shadow); 
  */
  border-bottom-left-radius: 7px; 
  border-bottom-right-radius: 7px; 
  background-color: var(--heliumPlayer__color_dark_14); 
  overflow: hidden;
    min-height: 15rem;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 50vw;
}

.browse_not_supported .title{
  color: var(--heliumPlayer__color_light_9);
  font-size:  1.8em;   
  text-align: left;
  margin: 1.94em 1em 1.4em 3em;
}

.browse_not_supported .title--desc{
  color: var(--heliumPlayer__color_light_4);
  font-size:  1.4em; 
  text-align: left;
  margin: 0.3em 0.7em 0.3em 2.7em;
}

.browse_not_supported 
.download_browser{
  margin: 1.94em 0;
  
}


.browse_not_supported 
.download_browser
.item_browser{
  /*
  border-bottom:  1px solid var(--heliumPlayer__color_shadow); 
  border-left:  1px solid var(--heliumPlayer__color_shadow); 
  border-right:  1px solid var(--heliumPlayer__color_shadow); 
  */
  width: 20vw; 
  max-width: 220px;   
  max-height: 420px;  
  cursor: pointer; 
}


.browse_not_supported 
.download_browser
.item_browser
img{  
  width: 20vw; 
  height: 20vw; 
  margin: 5vw auto 0; 
  max-width: 220px;   
  max-height: 220px;  
}


.browse_not_supported 
.download_browser
.item_browser
.label{  
  color: var(--heliumPlayer__color_light_4);
  font-size: 0.94em;
  text-align: center;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  line-height: 1.2;
}



`

