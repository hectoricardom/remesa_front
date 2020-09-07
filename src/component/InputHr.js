import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
// import Icons from './Icons';
import { CloseModal} from '../actions/common'
import Icons from './Icons'


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const forms =  useSelector(state => state.forms); 
  const navigations =  useSelector(state => state.navigations);  

  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id});
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
  }




  return { observeChanges,  close,  forms, updForms, navigations }
}






const handleChange = (e, setTextValue, props, UpdateForm, setValid, inputId) => {
  let _v = e.target.value?e.target.value:'';
  
  //setTextValue(v);
  setTimeout(()=>{
      validateField(_v, setTextValue, props, UpdateForm, setValid, inputId);
  },20);
  
  return
}

const handleFocus = (e,setFocus ) => {
  setFocus(true);
}

const handleKeyUp = (e,props) => {
  if(typeof props.submitKeyEnter  === "function" &&  e.keyCode===13){
    props.submitKeyEnter();
  }
}

const handleBlur = (e, setFocus, v,props, updForms) => {
  const { form , field } = props; 
  updForms(form,field,v);
  setFocus(false);
}

const handleClearText = () => {

}

const updateInput = (v,Id) => {
  let InputCmp = document.getElementById(`${Id}_input`);
  if(InputCmp){
    InputCmp.value = v;
  }
}



const validateField = (v, setTextValue, props, UpdateForm, setValid, inputId ) => {

  const { form , validations,  placeholder, field } = props; 
  var valid = {v:true,m:''};  
  if(validations){
    if(v){   
      if(validations['minLength']){
        if(v.toString().length<validations['minLength']){
          valid={v:false,m:`Minimum ${validations['minLength']} characters required`};
        }        
      } 
      if(validations['maxLength']){
        if(v.toString().length>validations['maxLength']){
          valid={v:false,m:`Maximum characters are ${validations['maxLength']}`};
        }       
      } 
      if(validations['email']){
        let isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
        if(!isEmail){
          valid={v:false,m:'email not valid'};
        }
      }
      if(validations['ssn']){  
        let isSSN = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(v)
        if(!isSSN){
          valid={v:false,m:'ssn not valid'};
        }
      }
      if(validations['phone']){
        if(!isNaN(v)){ 
          v = parseFloat(v.toString());
          let isPhone = /^[\dX]{3}-?[\dX]{3}-?[\dX]{4}$/.test(v)
          if(!isPhone){
            valid={v:false,m:'phone not valid'};
          }
        }else{
          valid={v:false,m:'phone not valid'}
        }
      }
      if(validations['date']){
        let isDOB = /^(\d{2})(\/)(\d{2})(\/)(\d{4})$/.test(v)
        if(!isDOB){
          valid={v:false,m:'date not valid'};
        }
      }
      if(validations['ip']){
        let isDOB = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v)
        if(!isDOB){
          valid={v:false,m:'invalid IP address'};
        }
      }
      if(validations['number']){      
        if(!isNaN(v)){
          v = parseFloat(v.toString());
          if(validations['minValue']){
            if(v<validations['minValue']){
                valid={v:false,m:`value must be at least ${validations['minValue']}`};
            }        
          }
          if(validations['maxValue']){
              if(v>validations['maxValue']){
                valid={v:false,m:'value greater than maximum allowed'}
              }        
          }
        }  
        else{
          valid={v:false,m:'number not valid'};
        }
      } 
      if(validations['uppercase']){
        v = v.toString().toUpperCase();
      }
      if(validations['lowercase']){  
        v = v.toString().toLowerCase();
        //valid={v:false,m:'number not valid'};
      }
    }else{  
      if(validations['required']){
        valid={v:false,m:`${placeholder} required`};
      }
    }
  }

  updateInput(v,inputId)
  setTextValue(v)
  setValid(valid); 
  if (typeof props.OnChange === 'function') { 
    props.OnChange(v);       
  } 
}



const InputText = (props) => {
  // const { count, increment, decrement, reset } = useCounter();
 
  const { forms, navigations, observeChanges,  updForms} = useObserveChanges();
 
  const _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  const _className = _state["maskClassName"]

  
  const {placeholder , index, keyCode, initvalue} = props ;


  const [textValue, setTextValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [initialize, setInitialize] = useState(false);
  const [valid, setValid] = useState({v:true});
  const [init, setInit] = useState(null);
  let _keyCode = keyCode?keyCode:_Util.genNumber();
  const inputId = keys && keys[_keyCode]?keys[_keyCode]:_Util.gen12CodeId();
  
  let placeholderText = placeholder?placeholder:'label'

  const [passwordShow, setPasswordShow] = useState(false);
 
 
  var _initValue = initvalue;
  useEffect((e) => {
     
   
   
    if(!_initValue){ 
      if(props.initvalue){
        setTimeout(()=>{
          let txt = _initValue?_initValue:'';
          // validateField(txt, setTextValue, props, updForms, setValid );
          setInitialize(true);
        },75)
      }else{
        setInitialize(true);
      }
    }

    if(_initValue!==init ){
      setInit(_initValue);
      updateInput(_initValue,inputId)
      if(!_initValue){
        let txt = _initValue?_initValue:'';
        setTimeout(()=>{
          validateField(txt, setTextValue, props, updForms, setValid);
        },80);
      }else if(!init){
        let txt = _initValue?_initValue:'';
        setTimeout(()=>{
          validateField(txt, setTextValue, props, updForms, setValid);
        },80);
      }
    }



    /*
    
    function handleStatusChange(status) { }

    return function cleanup() {
      // 
    };

    */
    


  });

  

 
  var labelStyle = {

  }

  let isNonEmpty=false;
  
  var Text2Show = textValue?textValue:"";

  var isText = Text2Show?Text2Show.length:0;
  if(isText>0){
    isNonEmpty=true; 
  } 

  let isInValid = false;
  if(!valid.v){
    isInValid = true;
    valid.m?placeholderText = valid.m:placeholderText = placeholderText+' required' ;
  }

  let labelActive = `._${inputId}_.${_className.N3Hzgf} .${_className.AxOyFc}.labelActive{ -webkit-transform: scale(.75) translateY(-39px); transform: scale(.75) translateY(-39px);} `;
  var labelStyle = {
    color:isInValid?'firebrick':focus?"#1a38e8":'#80868b'   
  }
  var boxStyle = {
    border:isInValid?'2px solid firebrick':focus?"2px solid #1a38e8":'1px solid #dadce0'   
  }

  let  IsLabelActive = focus?true:isNonEmpty?true:isInValid?true:false;
  var inpuType = 'text';
  if(props['validations']){
    if(props['validations']['number']){
      inpuType = 'number';
    }
    if(props['validations']['email']){
        inpuType = 'email';
    }  
    if(props['validations']['password']){
      if(!passwordShow){
        inpuType = 'password';
      }
    } 
  }
  // focus

  let dynamicVALUE = !focus?{"value":Text2Show}:{};

  return (
    <input 
      type={inpuType}
      // autocomplete="username" 
      // spellcheck="false" 
      id={`${inputId}_input`}
      tabIndex={index}
      // ariaLabel="Correo electrónico o teléfono" 
      // name="identifier" 
      // autocapitalize="none" 
      // id="identifierId" 
      dir="ltr" 
      // data-initial-dir="ltr" 
      // data-initial-value=""
      //value={textValue} 
      {...dynamicVALUE}
      onChange={(e)=>handleChange(e,setTextValue,props,updForms,setValid, inputId )} 
      onFocus={(e)=>handleFocus(e,setFocus)}        
      onKeyUp={(e)=>handleKeyUp(e,props)} 
      onBlur={(e)=>handleBlur(e,setFocus,textValue,props,updForms)}    
    />
  )
}






export default InputText



