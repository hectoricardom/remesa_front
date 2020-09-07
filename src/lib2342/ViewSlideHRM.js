import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { CloseModal, getComponentStore } from './../actions/common'

import './_styles.css';


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeComponent);  
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id});
  }

  return { observeChanges, close }
}

  const ViewSlideHRM = () => {
    const {  observeChanges, close } = useObserveChanges();
    const list = getComponentStore()['listViewSlideOption'] || {};
    
    var _list = Object.keys(list);  
    console.log(_list)
    return (
            <>       
            {
              _list.map((dg)=>{
                var dlg = list[dg];
                console.log(dlg)
                if(dlg && dlg.visible){
                  var StyleDlg = {}; 
                  if(dlg.display){
                    StyleDlg = { opacity: 1, visibility: `visible`,zIndex:dlg.zIndex}                   
                  }                 
                  return (
                    <>
                      <div key={dg} className={`ViewSlideHRM ${dlg.display?'show':''}`} id={dg} style={StyleDlg}>
                      {dlg.content?dlg.content:null}
                      </div> 
                    {dlg.display && dlg.overlay?<div className="ViewSlideOverlay" onClick={()=>close(dg)}/>:null }
                    </> 
                  )
                }
                else{return(null)}
              })

            }   
                              
            </>
         )
        
     
  }



export default ViewSlideHRM;

