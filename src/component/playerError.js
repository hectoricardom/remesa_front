
import React, { useEffect, useState } from 'react'

import * as _Util from '../store/Util'
import { useSelector, useDispatch } from 'react-redux'



const useObserveChanges = () => {
  const goDark = useSelector(state => state.goDark);
  const dispatch = useDispatch();
  if(goDark){
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'goDark',value:false}
    }) 
    window.scrollTo(0,0)
  }
  return {  goDark }
}



const PlError = (props) => {
  const {  goDark } = useObserveChanges();
  
  let keys = _Util.getGlobalsKeys()
  let ID_ = keys[81]

  
  return(    
    <div   className={`_${ID_} mainView _playerError_ `} >
      <div>              
          <h3 className="title"><span>Error al reproducir</span></h3>
          <h4 className="title--desc"><span></span></h4>              
      </div>
      <div className="loginWh_Container">        
        <div className={`loginWh_--message-fieldset  visible`}>

        <h4 className="loginWh_--details-header">
          <span className="loginWh_--details-question">debe estar logeado para tener aceso al video</span>
          <span className="loginWh_--details-question-optional"></span>
        </h4>
         
        </div>
      </div> 
      <style>{AddLocations_styles}</style>   
      <style>
            {`._${ID_}{
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






export default PlError




const AddLocations_styles = `








._playerError_{
  /*
  border-top: 2px solid var(--heliumPlayer__color_fire);  
  border-bottom:  1px solid var(--heliumPlayer__color_shadow); 
  border-left:  1px solid var(--heliumPlayer__color_shadow); 
  border-right:  1px solid var(--heliumPlayer__color_shadow); 
  border-bottom-left-radius: 7px; 
  border-bottom-right-radius: 7px; 
  */
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
    margin: 6.2em auto 0.4em;
}

._playerError_ .title{
  color: var(--heliumPlayer__color_light_9);
  font-size:  1.8em;   
  text-align: left;
  margin: 0.4em 1em;
}

._playerError_ .title--desc{
  color: var(--heliumPlayer__color_light_4);
  font-size:  1.4em; 
  text-align: left;
  margin: 0.3em 0.7em;
}











.loginWh_Container{
  padding: 1.6em;
  max-width: 50vw;
  /*
  max-height: 22em;
  overflow-y: auto ;
  */
}



.loginWh_--fieldset {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 0 0 1rem;
  text-align: left;
}

.loginWh_--fieldset {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}

.loginWh_--checkbox-container {
  width: 2em;
  height: 2em;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  margin: 0 1em 0 0;
}

.loginWh_--label-container {
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
  -webkit-box-flex: 1;
  -webkit-flex: 1 0;
  -moz-box-flex: 1;
  -ms-flex: 1 0;
  flex: 1 0;
}
input[type=checkbox], input[type=radio] {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
}

.loginWh_--checkbox-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}




.loginWh_--checkbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  background: var(--heliumPlayer__color_blck_);
  border: 1px solid var(--heliumPlayer__color_dark_9_7);
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 1.6em;
}


.loginWh_--checkbox-label {
  font-size: 1.2em;
  font-weight: 700;
  cursor: pointer;
}

.loginWh_--checkbox-label-definition {
  color: var(--heliumPlayer__color_light_4);
  font-size: 0.9em;
  display: block;
  font-weight: 400;
}




.loginWh_--message-fieldset {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  max-height: 0;
  opacity: 0;
  -webkit-transition: max-height 250ms ease-out,opacity 250ms ease-out;
  -o-transition: max-height 250ms ease-out,opacity 250ms ease-out;
  -moz-transition: max-height 250ms ease-out,opacity 250ms ease-out;
  transition: max-height 250ms ease-out,opacity 250ms ease-out;
}


.loginWh_--details-header {
  font-weight: 400;
  padding: 0;
  margin: 2rem 0 .5rem 0;
}

.loginWh_--textarea {
  background-color:var(--heliumPlayer__color_blck_);
  color: var(--heliumPlayer__color_white_);
  resize: none;
  border: 1px solid var(--heliumPlayer__color_dark_9_7);
  width: 50%;
}





.loginWh_--submit-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: var(--heliumPlayer__color_white_);
  background-color: var(--heliumPlayer__color_fire); 

  border: 1px solid transparent;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  margin: 1.5rem 0 0 0;
  padding: .75rem;
}


.loginWh_--submit-button--disabled{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: transparent;
  background-color: transparent; 
  border: 1px solid transparent;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  margin: 1.5rem 0 1.5rem 0;
  padding: .75rem;
}


.loginWh_--details-question, .loginWh_--details-question-optional {
  display: inline-block;
}

.loginWh_--details-question-optional {
  padding-left: .5rem;
  color:  var(--heliumPlayer__color_light_4); 
}




.loginWh_--message-fieldset.visible {
  max-height: 20rem;
  opacity: 1;
}


.loginWh_--fieldset.visible .loginWh_--checkbox:before {
  color: var(--heliumPlayer__color_fire); 
  content: '✔';
}

/*
.loginWh_--checkbox-input:checked+.loginWh_--checkbox:before
*/




.loginWh_Container input{
  background-color: var(--heliumPlayer__color_dark_14);
  padding: .5rem;
  color:  var(--heliumPlayer__color_light_4); 
  border: none;
  border-bottom: 1px solid  var(--heliumPlayer__color_light_4); 
  outline: none;
  min-width: 75%;
  font-size: 0.96em;
  text-align: left;

}

.loginWh_Container .label--input {
  color: var(--heliumPlayer__color_light_2);
  font-size: 1.1em;
  text-align: left;
  margin: 0.3em 0.7em;
}


.upload--Wrapper{
  display: flex;
  position: relative;
}

.upload--Container{
  min-height: 20px;
  margin: 0.3em 0.7em;
}

.upload--Container span{
  position: absolute;
  padding: 15px;
}

.upload--Container input{
  position: absolute;
  opacity:0;
  height:100%;
  width:100%;
  
}

.file_Done{  
  position: relative;
  min-width: 24px;
  height: 30px;
  margin: 0.99em 0.7em 0;
}

.file_Done svg{
  fill: var(--heliumPlayer__color_fire);
}



.header_subtitle{
  display: flex;
}

.header_subtitle .icons_btn{
  padding: 1.199em  0 0 0.7em;
}

.header_subtitle .syncTime_seconds{ 
  padding: 1.45em 0 0 0.7em;
  font: 300 0.95em/1.05em Roboto,sans-serif;
}





@media screen and (min-width: 1200px){
  .loginWh_--fieldset {    
    margin: 0 0 16px;
  }
  
  .loginWh_--checkbox-container {
    width: 28px;
    height: 28px;    
    margin: 0 16px 0 0;
  }
  
  .loginWh_--checkbox-label {
    font-size: 22px;
  }  
  .loginWh_--checkbox-label-definition {
    font-size: 17px;
  }
  .loginWh_--checkbox {    
    font-size: 30.5px;
  }
  



  ._playerError_ .title{
    font-size: 32px;
  }
  ._playerError_ .title--desc{
    font-size: 16px;
  }

  .loginWh_--details-header {    
    margin: 32px 0 .8px 0;
  }
  
  .loginWh_--submit-button {
    
    margin: 22px 0 0 0;
    padding: 11px;
  }


  .loginWh_Container
  .labelActive
  {
    background-color: var(--heliumPlayer__color_dark_14);
  }






}



`

