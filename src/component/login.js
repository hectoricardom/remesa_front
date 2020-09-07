
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import { withRedux } from '../store/redux';

import { LoadData } from '../actions/common';

import InputText from './InputText';


import LoadingSlider from './LoadingColorSpinner';


import  './style_login.css';





const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const _state =  {};  
  const forms = useSelector(state => state.forms);
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
      kv:{key:"observeChanges",value:_Util.gen12CodeId()}
    })  
  }

  const updForms= (form,field,v) => {
    let _forms = forms;
    if(!_forms[form]){
      _forms[form] = {};
    }
    _forms[form][field] = v;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })   
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    }) 
  }


  const _LoadData= (q) => {
    LoadData(q,dispatch);
  }

 

  return {  updKV,  goDark, forms , updForms, _LoadData}
}








const Browser= (props)=>{
 
  const {  _LoadData, forms, updForms } = useObserveChanges();

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()  
  let idWatch = "";
  let classN = ""

  const [initialize, setInitialize] = useState(false);  
  const [isready, setIsready] = useState(false);  
 
  const [codeData, setCodeData] = useState({code:false});

  const {code, phonecode, errorCode} = codeData




  const [viewport, setviewport] = useState(false);
  



  useEffect(() => {
    if(!initialize){
      setInitialize(true); 
      setTimeout(()=>{
        window.scrollTo(0,0)
        setviewport(true); 
      },650) 
    }
  });


const tryDiferentEmail = (q) => {
  
}

const handlerEmailInput = (q) => {
  
}

const handlerCodeInput = (i) => {
  var _i = i.toUpperCase();
  updForms('Login','code',_i);
  if(_i.length>5){
      handleConfirmToken(_i);
  }
}

const getData = (q) => {
  let Qry = {
    fields:[
      "id","email","isAdmin"
    ],
    query:"findbyIdCda"
  };
  _LoadData(Qry, "userProfile");
}

const handleSentEmail = (q) => {
 
  var email =  forms && forms['Login']?forms['Login']['email']:null;
  console.log(email)
   if(email){
      _Util.fetchPostUrl(`${_Util.get_GRAPHQLURL()}/generateToken?email=${email}`) 
      .then(res => { 
        console.log(res)      
        if(res.status=== 200){
            setCodeData({code:true,phonecode:res.phone,errorCode:null})
            localStorage.setItem('_codeValidation_',(new Date()).getTime());
            localStorage.setItem('_codeValidationPhone_',res.phone);
            localStorage.setItem('_email_',email);
        }else{
            setCodeData({code:false,errorCode:res.status,errorMsg:res.err})   
            localStorage.setItem('_codeValidation_',null);   
            localStorage.setItem('_codeValidationPhone_',null);     
            //this.setState({code:false,errorCode:res.status})
        }        
      }).catch(error => {  
        setCodeData({code:false,errorCode:"",errorMsg:""}) 
      });
   } 
}

const handleConfirmToken = () => {
  var _code =  forms && forms['Login']?forms['Login']['code']:null;
  _Util.fetchPostUrl(`${_Util.get_GRAPHQLURL()}/verifyToken?code=${_code}`)
  .then(res => {   
    if(res && res.token){
      if(res && res.token){
        window.localStorage.setItem('hxmTkn',res.token);
        localStorage.setItem('_codeValidation_',null);
        localStorage.setItem('_codeValidationPhone_',null);  
        getData();
        setCodeData({code:false,errorCode:null,errorMsg:null})
      }else{
        setCodeData({code:true,errorCode:939,errorMsg:res.err})
      }
    }  
  }).catch(error => { 
    
  });
}


let userProfile = _state["userProfile"] ;



let isAdmin =  userProfile && userProfile["isAdmin"]
let authenticate =  _state["authenticate"] ;






let errorMsg = false;

let _email_ = "";


// let _code_ =  forms && forms['Login']?forms['Login']['code']:"";


var titles = {
  "en":`We will send a code`,
  "es":'Le enviaremos un codigo'
} 


let userA = _Util.getBrowser();
  
let isMobile = userA.os === "Android" || userA.os === "iPhone" || _state["outerWidth"]<550 ;


let appLoaded = true || _state["appLoaded"];
var codeTitle = {
  "en":`Enter the 6-digit code sent to your phone number ending in ${phonecode}`,
  "es":`Introdusca el codigo de 6 digitos enviado a su telefono terminado en ${phonecode}`
} 

return (
  <div className={`loadingLoging ${errorCode?'_error':''}`}>
    {initialize?
    <div className="c-tabs-content"  is-in-viewport={`${viewport}`}>
        <div className="left_Section left_SectionTextMedia left_SectionTextMedias lSectionNoPadding center_Tabs_Section" aria-hidden={true} aria-labelledby="" key={'8543845'} role="tabpanel">                                             
          <div className="--auto--margin grid--middle u-grid--override center_Tab_Content_Slide  desktop--6-12 tablet--8-12 mobile--11-12">                                                  
            <div className="grid__item desktop--4-12 tablet--11-12 --auto--margin">
              <div className="left_Section__text cascade-text desktop--10-12 tablet--8-12 mobile--12-12 --auto--margin">
                <h3 className="beta cascade-text__item white-Color-Text"  btn-dt-id={`${_Util.Base64.encode(`datePickbutton${984823}`)}`}>{`${errorCode?errorMsg:code?'Introducir el código de verificación':'Login'}`}</h3>
                <div className="text-normal cascade-text__item  white-backColor">
                    {/*<div className="flexContainerH"  style={{maxWidth: `360px`}}>
                      <div className="flexContainerSldH" style={{transform: `translate3d(${code?'-100%':'0'}, 0px, 0px)`}}>
                        
                      </div>
                    </div> */} 
                          
                        {code?
                          <div className={`OptionContM iscode ${code?'active_':''}`} style={{minWidth: `100%`}}> 
                            <div  className="text-description">{errorCode?errorMsg:codeTitle["es"]}</div>
                            <div className={`email--login`}>            
                                <InputText 
                                  icon={`more_vert`} 
                                  form={'Login'} 
                                  field={`code`}  
                                  keyCode={27} 
                                  placeholder={'Code'} 
                                  OnChange={handlerCodeInput} 
                                  validations={{uppercase:true,reqired:true}}
                                  // initvalue={_code_}
                                />
                            </div>
                            <div className="center--padding--btn-login">
                                <div className="center--Container grayStyle" onClick={handleConfirmToken} style={{"--color-tab--base--hover":'#777'}}>
                                  <div className="hoverDiv orangeFlex "/>
                                  <span className="text2D orangeFlex">{`Verify Code`}</span>              
                                </div>   
                            </div>
                            <div className="center--padding--btn-login">
                                <div className="center--Container grayStyle" onClick={tryDiferentEmail} style={{"--color-tab--base--hover":'#777'}}>
                                  <div className="hoverDiv grayBck "/>
                                  <span className="text2D grayBck">{`Try a diferent Email`}</span>              
                                </div>   
                            </div>
                          </div>
                          :                                                               
                          <div className={`OptionContM islogin ${code?'':'active_'}`} style={{minWidth: `100%`}}> 
                            <div  className="text-description">{errorCode?errorMsg:titles["es"]}</div>
                            <div className={`email--login`}>            
                                <InputText 
                                  icon={`more_vert`} 
                                  form={'Login'} field={`email`} 
                                  email={true} 
                                  keyCode={25} 
                                  placeholder={'Email'} 
                                  OnChange={handlerEmailInput} 
                                  validations={{email:true,reqired:true}}
                                  // initvalue={_email_}
                                />
                            </div>  
                            <div className="center--padding--btn-login">
                                <div className="center--Container grayStyle" onClick={handleSentEmail} style={{"--color-tab--base--hover":'#777'}}>
                                  <div className="hoverDiv orangeFlex "/>
                                  <span className="text2D orangeFlex">{`Login`}</span>              
                                </div>   
                            </div>
                            
                          </div>
                        }                                                                                                    
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    :null}
    {!viewport?
      <div className>
        <LoadingSlider stroke={'#fff'} height={120} width={120}/>
      </div>
    :null}
  </div>
  )
  
} 


export default  withRedux(Browser)








/*
  <div className="_or_singup_"><span>or SingUp with</span> </div>
  <div className="__SingUpWithAmazon__Container">
      <div className="flexSpace"/>
      <NavLink  to={{pathname: 'singupAmazon'}}>
        <img border="0" alt="SingUp with Amazon" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" width="156" height="32" />
      </NavLink>
      <div className="flexSpace"/>
  </div>

  <a onClick={this.LoginWithAmazon.bind(this)}>                                                                       
        <img border="0" alt="SingUp with Amazon" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" width="156" height="32" />
  </a> 
*/