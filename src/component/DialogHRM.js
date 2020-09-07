

import React from 'react'
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



const DialogHRM = () => {
  const {  close } = useObserveChanges();
  const list = getComponentStore()['listDialog'] || {};
  
  var _list = Object.keys(list);  
  return (
    <>       
    {
      _list && _list.map(dg=>{               
        var dlg = list[dg];
        if(dlg && dlg.visible){
          var _Style={}
          var _cldg = cleanbase64(dg);
          _Style[`--s__${_cldg}_heigth__`]='750px';
          _Style[`--s__${_cldg}_width__`]='80vw';
          _Style[`--s__${_cldg}_zIndex__`]=250;
          _Style[`--overlay__${_cldg}_zIndex__`]=249;
          if(dlg.height){
            _Style[`--s__${_cldg}_heigth__`]=dlg.height;
          }
          if(dlg.width){
            _Style[`--s__${_cldg}_width__`]=dlg.width; 
          }
          if(dlg.zIndex){
            _Style[`--s__${_cldg}_zIndex__`]=dlg.zIndex;
            _Style[`--overlay__${_cldg}_zIndex__`]=dlg.zIndex-1;
          }
          
          var ts = {
            marginTop:  dlg.height / -2,
            marginLeft: dlg.width / -2,
            top:`50%`,
            left:`50%`,
            height: dlg.height,
            width: dlg.width,
            zIndex: `var(--s__${_cldg}_zIndex__)`
          };
          var overlayStyle = {opacity: 1,zIndex: `var(--overlay__${_cldg}_zIndex__)`};
          let Ach = dlg.content;
          let cmp2render = null;
          let data = dlg.data
          if(dlg.content){
            cmp2render = React.cloneElement(<Ach/>, {data});
          }
          return (
              <div className={dlg.display?'active':''} style={_Style} key={dg} >
                <div className="DialogHRM" style={ts} id={dg}>                         
                  {cmp2render?cmp2render:null}
                </div>
                {dlg.visible?<div className={`DialogHRMOverlay ${dlg.display?'show':''}`}  style={overlayStyle} onClick={()=>close(dg)}/> :null}        
              </div>
            ) 
        }else{
          return null
        }
      })
    }          
    </>
  )
}

export default DialogHRM;



const cleanbase64 = id => {
  var cClss = id;
  var h = new RegExp('=','g')
  cClss=cClss.replace(h,'');
  return cClss;
};


