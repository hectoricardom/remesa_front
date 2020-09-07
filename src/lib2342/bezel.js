

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CloseBezel} from './lib/common'
import Icons from './Icons/Icons'





const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeCommonChanges);
  const bezel=  useSelector(state => state.listBezel);   
  let list = bezel;
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseBezel(dispatch,{id:Id, list:list});
  }

  return { observeChanges, list, close }
}


const BezelActions = () => {
  const {  observeChanges, close, list } = useObserveChanges();
  var _list = Object.keys(list);
  return (
    <>       
    {
      _list.map((dg)=>{
        var dlg = list[dg];
        if(dlg){
          var disp = dlg.visible?'block':'none';
          let _styleNm = _styleBezel(dg)
          return(              
            <div key={dg} onClick={close} className={`VideoBezel_${dg}`} style={{display:disp,position: 'absolute',width:'100px',height:'100px',zIndex: 350}}>
              <div style={{position: 'relative',width:'100%',height:'100%'}}>
                <div style={{position: 'absolute',top:'50%',left:'50%',marginLeft:'-18px',marginTop:'-18px'}}>
                  <Icons name={dlg.icon} color={'#fff'} size={36}/>   
                </div> 
              </div> 
              <style>{_styleNm}</style>      
            </div>
          )
        }
      })
    }
    </>
  )
 
}

export default BezelActions;


const _styleBezel = (dlg) => {  
  return `


.VideoBezel_${dlg} {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 72px;
  height: 72px;
  z-index: 19;
  margin-left: -36px;
  margin-top: -46px;
  background: rgba(0,0,0,.5);
  border-radius: 100px;
  border: 5px solid var(--heliumPlayer__color_white_);
  box-shadow: 0 0 50px var(--heliumPlayer__color_white_), inset 0 0 50px var(--heliumPlayer__color_white_);
  -moz-animation: bezeloader .75s linear 1 normal forwards;
  -webkit-animation: bezeloader .75s linear 1 normal forwards;
  animation: bezeloader .75s linear 1 normal forwards;
  pointer-events: none;
}


@-webkit-keyframes gogoloader {
  0% {
    -webkit-transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}


@-webkit-keyframes bezeloader {
  0% {
    -webkit-transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.5);
    opacity: 0;
  }
}



`
}