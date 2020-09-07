
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as _Util from '../../store/Util'

import {  CloseModal  } from '../../actions/common'

import './style.css';





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

  const updateModal = (Id) => {
    /*
    let data = {};
    data['list']=modal;
    data['display']=true;   
    UpdateModal(dispatch,{id:Id, list:list});
    */
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
  return { _state, updKV, _dispatch_ ,observe,  close, updateModal }
}









 
const toggle_Fieldset = (active,setActive,props) => { 
  var ta= !active;
  setActive(ta);
  if (typeof props.confirm === 'function') { props.confirm(ta);}
}


const ReportAProblemDialogFieldset = (props) => { 
    const {title,desc} = props; 
    const [active,setActive] = useState(false);
    return(
      <div className={`ReportAProblemDialog--fieldset  ${active?'visible':''}`} onClick={(e)=>toggle_Fieldset(active,setActive,props)}>
        <div className="ReportAProblemDialog--checkbox-container" >
          <span className="ReportAProblemDialog--checkbox-input"/>
          <span className="ReportAProblemDialog--checkbox"></span>
        </div>
        <div className="ReportAProblemDialog--label-container">
          <label className="ReportAProblemDialog--checkbox-label">
            <span>{title}</span>
            <span className="ReportAProblemDialog--checkbox-label-definition" >{desc}</span>
          </label>
        </div>
      </div>
    )
  
}




const sendReport = (i,close, modalID) => { 
  close(modalID)
}


const confirm = (i,t,active,activeTab,updKV,props, updateModal, modalID) => { 
  let _activeTab = activeTab || {};
  
  if(i){
    _activeTab[t] = i
  }else if(_activeTab[t]){
    delete _activeTab[t]
  }  
  if(Object.keys(_activeTab).length>0){
    updKV("activeSWW",true);
    updKV("activeTabSWW",_activeTab);
    // if(!active){  if (typeof props.updHeight === 'function') { props.updHeight('90vh');}   }
  }else{
    updKV("activeSWW",false);
    updKV("activeTabSWW",_activeTab);    
    // if(active){   if (typeof props.updHeight === 'function') { props.updHeight('70vh');}  }
  }
  updKV("barVisible",true);
  updateModal(modalID);
  if (typeof props.confirm === 'function') { props.confirm();}
}

const problemsTypes = [
  {
    "title":_Util.translatetext(547),
    "desc":_Util.translatetext(552)
  },
  {
    "title":_Util.translatetext(548),
    "desc":_Util.translatetext(553)
  },
  {
    "title":_Util.translatetext(549),
    "desc":_Util.translatetext(554)
  },
  {
    "title":_Util.translatetext(550),
    "desc":_Util.translatetext(555)
  },
  {
    "title":_Util.translatetext(551),
    "desc":_Util.translatetext(556)
  }
]


const SomethingWentWrong = (props) => { 

  const {data} = props;  
  const { observe,  close, _state, updKV, updateModal  } = useObserve();
  const item = data.item || {};
  let modalID = data.modalID; 
  let _ID = data.dID;

  const {activeSWW, activeTabSWW} = _state; 
 
  return(    
    <div  {...data.modalID?{"dialog-key-id":data.modalID}:""} className={`_${modalID}  something--wrong--Dialog `} >
      <div>              
          <h3 className="title"><span>{`${_Util.translatetext(545)}`}</span></h3>
          <h4 className="title--desc"><span>{`${_Util.translatetext(546)}`}</span></h4>              
      </div>
      <div className="ReportAProblemDialogContainer"> 
        {problemsTypes.map((p,innd)=>{
          return(
            <ReportAProblemDialogFieldset title={p.title} desc={p.desc} key={innd} confirm={(i)=>confirm(i,innd,activeSWW,activeTabSWW,updKV,props, updateModal, modalID)}/>                  
          )
        })}
        <div className={`ReportAProblemDialog--message-fieldset  ${activeSWW?'visible':''}`}>
          <h4 className="ReportAProblemDialog--details-header">
            <span className="ReportAProblemDialog--details-question">{`${_Util.translatetext(523)}?`}</span>
            <span className="ReportAProblemDialog--details-question-optional">{`(${_Util.translatetext(557)})`}</span>
          </h4>
          <textarea  className="ReportAProblemDialog--textarea" rows="5" cols="30"></textarea>
          <button  type="submit" aria-label="Enviar informe" className="ReportAProblemDialog--submit-button" onClick={(i)=>sendReport(i,close,data.modalID)}><span>{`${_Util.translatetext(558)}`}</span></button>
        </div>
      </div> 
      <style>{AddLocations_styles}</style>   
      <style>
            {`._${modalID}{
              --heliumPlayer__color_fire :#e50914;
              --heliumPlayer__color_fire_2 :#bf1315;
              --heliumPlayer__color_fire :#69f0ae;
              --heliumPlayer__color_fire_2 :#69f0ae;
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






export default SomethingWentWrong




const AddLocations_styles = `








`

