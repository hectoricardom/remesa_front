import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { CloseSlideOption, getComponentStore } from './../actions/common'

import './_styles.css';


const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeComponent);  
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseSlideOption(dispatch,{id:Id});
  }

  return { observeChanges, close }
}

  const SlideOptionHRM = () => {
    const {  observeChanges, close } = useObserveChanges();
    const list = getComponentStore()['listSlideOption'] || {};
    var _list = Object.keys(list); 
    return (
            <>       
            {
              _list.map((dg)=>{
                var dlg = list[dg];
                if(dlg && dlg.visible){
                    var _Style={}
                    _Style[`--s__${dg}_heigth__`]='750px';
                    _Style[`--s__${dg}_zIndex__`]=250;
                    _Style[`--overlay__${dg}_zIndex__`]=249;  
                    let _height = '1750px'  
                    if(dlg.display){
                      
                      if(dlg.height){
                        _Style[`--s__${dg}_heigth__`]=dlg.height;
                      }
                      if(dlg.zIndex){
                        _Style[`--s__${dg}_zIndex__`]=dlg.zIndex;
                        _Style[`--overlay__${dg}_zIndex__`]=dlg.zIndex-1;                      
                      }
                      _height = dlg.height;
                    }           
                    var ts = {
                      transform:`translate3d(0, ${_height}, 0)`,
                      WebkitTransform: `translate3d(0, ${_height}, 0)`,
                      MsTransform:`translate3d(0, ${_height}, 0)`,
                      opacity: 1,
                      zIndex: dlg.zIndex
                    };
                    var ovts = {opacity: 1,zIndex: dlg.zIndex-1};
                    return (
                      <div className={dlg.display?'':''} style={_Style} key={dg}>
                        <div className="SlideOption" style={ts}>
                          {dlg.content?dlg.content:null}
                        </div>
                        {dlg.display?<div className={`SlideOptionOverlay ${dlg.display?'show':''}`}  style={ovts}   onClick={()=>close(dg)} /> :null}        
                      </div>
                    )
                }
                else{return(null)}
              })

            }   
                              
            </>
         )
        
     
  }



export default SlideOptionHRM;

