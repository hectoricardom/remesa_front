import React, { useState, useEffect } from 'react'
import * as _Util from '../lib/Util'
import IconSVG from './Icons'


var lastClick = {};

var parent = { };
var listening = { };


import { useSelector, useDispatch } from 'react-redux'



const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const rippleRdx =  useSelector(state => state.ripple);   
  const dispatch = useDispatch();
  
  const ripple = rippleRdx?rippleRdx:{};
  const updRipple = (rpl) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'ripple',value:rpl}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeChanges',value:_Util.gen12CodeId()}
    })
  }

  return { observeChanges, ripple, updRipple }
}





const HandleDownClick = (e,rippleWrpID,rippleList,setRippleList, setObserveRipple) => {
  
  let _now = (new Date()).getTime();
  if(!lastClick[rippleWrpID] || _now > lastClick[rippleWrpID]){
    lastClick[rippleWrpID] = _now + 120;
    console.log('HandleDownClick')

   
    //var _th_ = this;
    //let RplParent = _th_._Ripple.parentNode; 
    let Elm = document.getElementById(rippleWrpID);
    let RplParent = Elm && Elm.parentNode;
    
    let xPos = e.pageX - RplParent.offsetLeft;
    let yPos = e.pageY - RplParent.offsetTop;
    var _Id = _Util.gen12CodeId();
    var _rippleList = rippleList;
    _rippleList[_Id]={xPos:xPos,yPos:yPos,visible:true}
    setRippleList(_rippleList);
    setObserveRipple(_Util.gen12CodeId());
    setTimeout(function(){      
      let containerWidth = e.target.offsetWidth;
      let containerHeight = e.target.offsetHeight;
      let biggest = (containerWidth > containerHeight) ? containerWidth : containerHeight;      
      biggest = biggest * 1.4;
      _rippleList[_Id]={classS:'rippleHRM_close2', amount:biggest ,w:containerWidth,h:containerHeight,xPos:xPos,yPos:yPos,visible:true}
      setRippleList(_rippleList);
      setObserveRipple(_Util.gen12CodeId());
      setTimeout(function(){
        _rippleList[_Id]={visible:false,amount:0};
        setRippleList(_rippleList);
        setObserveRipple(_Util.gen12CodeId());
        setTimeout(function(){
          delete _rippleList[_Id];
          setRippleList(_rippleList);
          setObserveRipple(_Util.gen12CodeId());
        }, 15000);
      }, 1000);
    }, 30);
  }
}




const RippleHRM = (props) => {
  var _th = this;

  const { observeChanges, ripple, updRipple } = useObserveChanges();
  const [ rippleWrpID ] = useState(_Util.gen12CodeId());
  const [ rippleList, setRippleList ] = useState({});
  const [ observeRipple, setObserveRipple ] = useState(_Util.gen12CodeId());
  const { color, opacity } = props;   

  var _color = color || 'rgba(0,0,0,.5)';
  var _opacity = opacity || 0.5;

  let style = {
    "--mdc-ripple-fg-size": `91px`,
    "--mdc-ripple-fg-scale": 1.82476,
    "--mdc-ripple-fg-translate-start": `69px, -25.5px`,
    "--mdc-ripple-fg-translate-end": `30.4219px, -27.5px`    
  }

  
  useEffect(() => {
    let _ripple = ripple;
    if(!_ripple[rippleWrpID]){
      _ripple[rippleWrpID] = {};
    }
    let _parent = _ripple[rippleWrpID]['parent'];
    if(!_parent){
      setTimeout(()=>{
        if(!_parent){
          let Elm = document.getElementById(rippleWrpID);
          let parentElm = Elm && Elm.parentNode;
          if(parentElm){
            _ripple[rippleWrpID]['parent']= parentElm;
            updRipple(_ripple);
            console.log(parentElm)
            parentElm.addEventListener('mousedown', (e)=>HandleDownClick(e,rippleWrpID,rippleList,setRippleList, setObserveRipple)); 
          }
        }
      },1200)
    }
  });
  return (
    <>
    <div  id={`${rippleWrpID}`}  className={'rippleHRM'}>
    {Object.keys(rippleList).map(rplId=>{
      var rpl = rippleList[rplId];
      if(rpl.visible){
        var _Style={
          backgroundColor: _color,
          opacity: _opacity,
          left : rpl.xPos + 'px',
          top : rpl.yPos + 'px',
          width : rpl.amount*2 + 'px',
          height : rpl.amount*2 + 'px'     
        }
        return (
          <span className={`rippleHRM_effect ${rpl.classS}`} style={_Style} key={rplId}/>
        )
      }else{
        return null;
      }
    })              
  }
  </div>
  <style>
    {txt_styles}
  </style>
  </>
 )
}

export default RippleHRM





const txt_styles = `

.rippleHRM {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  z-index: 1;
}

.rippleHRM_effect {
  width: 10px;
  height: 10px;
  background: #ffffff;
  opacity:0.2;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index:0;
  transition: all 3s ease;
}


.rippleHRM_close {
  animation: _ripple3 1.5s normal forwards cubic-bezier(0,0,0,1);
}

.rippleHRM_close2::before {
  animation: mdc-ripple-fg-radius-in 1.5s normal forwards cubic-bezier(0,0,0,1);
}


@keyframes _ripple3 {
  0%{
    transform:scale(1);
  }
  100%{
    transform:scale(5);
    opacity:0;
  }
}




@keyframes mdc-ripple-fg-radius-in{
  0%{
    animation-timing-function:cubic-bezier(0.4,0,0.2,1);
    transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)
  }
  to{
    transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))
  }
}
  
  
@keyframes mdc-ripple-fg-opacity-in{
  0%{animation-timing-function:linear;opacity:0}
  to{opacity:var(--mdc-ripple-fg-opacity,0)}
}
  
@keyframes mdc-ripple-fg-opacity-out{
  0%{animation-timing-function:linear;
    opacity:var(--mdc-ripple-fg-opacity,0)
  }
  to{opacity:0}
}

`



/*


VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf pAbZk VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe


VfPpkd-ksKsXd-mWpk3d-OWXEXe-Tv8l5d-lJfZMc
VfPpkd-ksKsXd-mWpk3d





html{height:100%;overflow:hidden}
body{
  height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;color:rgba(0,0,0,0.87);
  font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;margin:0;text-size-adjust:100%
}
textarea{font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif}
a{text-decoration:none;color:#2962ff}
img{border:none}*{-webkit-tap-highlight-color:transparent}
#apps-debug-tracers{display:none}html{overflow:visible}
body{overflow:visible;overflow-y:scroll}



@keyframes mdc-ripple-fg-radius-in{
  0%{
    animation-timing-function:cubic-bezier(0.4,0,0.2,1);
    transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)
  }
  to{
    transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))
  }
}


@keyframes mdc-ripple-fg-opacity-in{
  0%{animation-timing-function:linear;opacity:0}
  to{opacity:var(--mdc-ripple-fg-opacity,0)}
}
  
@keyframes mdc-ripple-fg-opacity-out{
  0%{animation-timing-function:linear;
    opacity:var(--mdc-ripple-fg-opacity,0)
  }
  to{opacity:0}
}






.VfPpkd-LgbsSe{
  -webkit-font-smoothing:antialiased;font-family:Roboto,sans-serif;font-family:var(--mdc-typography-button-font-family,var(--mdc-typography-font-family,Roboto,sans-serif));font-size:.875rem;font-size:var(--mdc-typography-button-font-size,0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height,2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight,500);letter-spacing:.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing,0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration,none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform,uppercase);padding:0 8px 0 8px;position:relative;display:-webkit-inline-box;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;-webkit-user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px}.VfPpkd-LgbsSe .VfPpkd-BFbNVe-bF1uUb{width:100%;height:100%;top:0;left:0}.VfPpkd-LgbsSe::-moz-focus-inner{padding:0;border:0}.VfPpkd-LgbsSe:active{outline:none}.VfPpkd-LgbsSe:hover{cursor:pointer}.VfPpkd-LgbsSe:disabled{cursor:default;pointer-events:none}.VfPpkd-LgbsSe .VfPpkd-Jh9lGc{border-radius:4px}.VfPpkd-LgbsSe:not(:disabled),.VfPpkd-LgbsSe:disabled{background-color:transparent}



.VfPpkd-LgbsSe .VfPpkd-kBDsod{
  margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .VfPpkd-LgbsSe .VfPpkd-kBDsod,.VfPpkd-LgbsSe .VfPpkd-kBDsod[dir=rtl]{margin-left:8px;margin-right:0}.VfPpkd-LgbsSe .VfPpkd-RLmnJb{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.VfPpkd-LgbsSe:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary,#6200ee)}.VfPpkd-LgbsSe:disabled{color:rgba(0,0,0,0.38)}.VfPpkd-vQzf8d+.VfPpkd-kBDsod{margin-left:8px;margin-right:0}[dir=rtl] .VfPpkd-vQzf8d+.VfPpkd-kBDsod,.VfPpkd-vQzf8d+.VfPpkd-kBDsod[dir=rtl]{margin-left:0;margin-right:8px}svg.VfPpkd-kBDsod{fill:currentColor}.VfPpkd-LgbsSe-OWXEXe-MV7yeb .VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-k8QpJ .VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-INsAgc .VfPpkd-kBDsod{margin-left:-4px;margin-right:8px}[dir=rtl] .VfPpkd-LgbsSe-OWXEXe-MV7yeb .VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-MV7yeb .VfPpkd-kBDsod[dir=rtl],[dir=rtl] .VfPpkd-LgbsSe-OWXEXe-k8QpJ .VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-k8QpJ .VfPpkd-kBDsod[dir=rtl],[dir=rtl] .VfPpkd-LgbsSe-OWXEXe-INsAgc .VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-INsAgc .VfPpkd-kBDsod[dir=rtl],.VfPpkd-LgbsSe-OWXEXe-MV7yeb .VfPpkd-vQzf8d+.VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-k8QpJ .VfPpkd-vQzf8d+.VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-INsAgc .VfPpkd-vQzf8d+.VfPpkd-kBDsod{margin-left:8px;margin-right:-4px}[dir=rtl] .VfPpkd-LgbsSe-OWXEXe-MV7yeb .VfPpkd-vQzf8d+.VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-MV7yeb .VfPpkd-vQzf8d+.VfPpkd-kBDsod[dir=rtl],[dir=rtl] .VfPpkd-LgbsSe-OWXEXe-k8QpJ .VfPpkd-vQzf8d+.VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-k8QpJ .VfPpkd-vQzf8d+.VfPpkd-kBDsod[dir=rtl],[dir=rtl] .VfPpkd-LgbsSe-OWXEXe-INsAgc .VfPpkd-vQzf8d+.VfPpkd-kBDsod,.VfPpkd-LgbsSe-OWXEXe-INsAgc .VfPpkd-vQzf8d+.VfPpkd-kBDsod[dir=rtl]{margin-left:-4px;margin-right:8px}.VfPpkd-LgbsSe-OWXEXe-MV7yeb,.VfPpkd-LgbsSe-OWXEXe-k8QpJ{padding:0 16px 0 16px}.VfPpkd-LgbsSe-OWXEXe-MV7yeb:not(:disabled),.VfPpkd-LgbsSe-OWXEXe-k8QpJ:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}.VfPpkd-LgbsSe-OWXEXe-MV7yeb:not(:disabled),.VfPpkd-LgbsSe-OWXEXe-k8QpJ:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary,#fff)}.VfPpkd-LgbsSe-OWXEXe-MV7yeb:disabled,.VfPpkd-LgbsSe-OWXEXe-k8QpJ:disabled{background-color:rgba(0,0,0,0.12)}.VfPpkd-LgbsSe-OWXEXe-MV7yeb:disabled,.VfPpkd-LgbsSe-OWXEXe-k8QpJ:disabled{color:rgba(0,0,0,0.38)}.VfPpkd-LgbsSe-OWXEXe-MV7yeb{box-shadow:0 3px 1px -2px rgba(0,0,0,0.2),0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12);transition:box-shadow 280ms cubic-bezier(0.4,0,0.2,1)}.VfPpkd-LgbsSe-OWXEXe-MV7yeb:hover,.VfPpkd-LgbsSe-OWXEXe-MV7yeb:focus{box-shadow:0 2px 4px -1px rgba(0,0,0,0.2),0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12)}.VfPpkd-LgbsSe-OWXEXe-MV7yeb:active{box-shadow:0 5px 5px -3px rgba(0,0,0,0.2),0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12)}.VfPpkd-LgbsSe-OWXEXe-MV7yeb:disabled{box-shadow:0 0 0 0 rgba(0,0,0,0.2),0 0 0 0 rgba(0,0,0,0.14),0 0 0 0 rgba(0,0,0,0.12)}.VfPpkd-LgbsSe-OWXEXe-INsAgc{padding:0 15px 0 15px;border-width:1px;border-style:solid}
  
  
  .VfPpkd-LgbsSe-OWXEXe-INsAgc .VfPpkd-Jh9lGc{top:-1px;left:-1px;border:1px solid transparent}
  
  
  .VfPpkd-LgbsSe-OWXEXe-INsAgc:not(:disabled),
  .VfPpkd-LgbsSe-OWXEXe-INsAgc:disabled{
    border-color:rgba(0,0,0,0.12)
  }
  
  .VfPpkd-LgbsSe-OWXEXe-dgl2Hf{
    margin-top:6px;margin-bottom:6px
  }

  .VfPpkd-LgbsSe{
    --mdc-ripple-fg-size:0;
    --mdc-ripple-left:0;
    --mdc-ripple-top:0;
    --mdc-ripple-fg-scale:1;
    --mdc-ripple-fg-translate-end:0;
    --mdc-ripple-fg-translate-start:0;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    will-change:transform,opacity
  }
  
  
  
  
  .VfPpkd-LgbsSe .VfPpkd-Jh9lGc::before,
  .VfPpkd-LgbsSe .VfPpkd-Jh9lGc::after{
    position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""
  }
  
  .VfPpkd-LgbsSe .VfPpkd-Jh9lGc::before{
    transition:opacity 15ms linear,background-color 15ms linear;z-index:1
  }

  .VfPpkd-LgbsSe.VfPpkd-ksKsZd-mWPk3d .VfPpkd-Jh9lGc::before{
    transform:scale(var(--mdc-ripple-fg-scale,1))
  }
  
  .VfPpkd-LgbsSe.VfPpkd-ksKsZd-mWPk3d .VfPpkd-Jh9lGc::after{
    top:0;left:0;transform:scale(0);transform-origin:center center
  }

  .VfPpkd-LgbsSe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-ZNMTqd .VfPpkd-Jh9lGc::after{
    top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)
  }
  
  .VfPpkd-LgbsSe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc .VfPpkd-Jh9lGc::after{
    animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
  }
  
  .VfPpkd-LgbsSe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-OmS1vf .VfPpkd-Jh9lGc::after{
    animation:mdc-ripple-fg-opacity-out 150ms;
    transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))
  }
  
  .VfPpkd-LgbsSe .VfPpkd-Jh9lGc::before,
  .VfPpkd-LgbsSe .VfPpkd-Jh9lGc::after{
    top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%
  }

  .VfPpkd-LgbsSe.VfPpkd-ksKsZd-mWPk3d .VfPpkd-Jh9lGc::after{    
    width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)
  }

  .VfPpkd-LgbsSe .VfPpkd-Jh9lGc::before,.VfPpkd-LgbsSe .VfPpkd-Jh9lGc::after{
    background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)
  }
  .VfPpkd-LgbsSe:hover .VfPpkd-Jh9lGc::before{
    opacity:.04
  }
  .VfPpkd-LgbsSe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe .VfPpkd-Jh9lGc::before,
  .VfPpkd-LgbsSe:not(.VfPpkd-ksKsZd-mWPk3d):focus .VfPpkd-Jh9lGc::before{
    transition-duration:75ms;opacity:.12
  }

  .VfPpkd-LgbsSe:not(.VfPpkd-ksKsZd-mWPk3d) .VfPpkd-Jh9lGc::after{
    transition:opacity 150ms linear
  }
  .VfPpkd-LgbsSe:not(.VfPpkd-ksKsZd-mWPk3d):active .VfPpkd-Jh9lGc::after{
    transition-duration:75ms;opacity:.12
  }
  .VfPpkd-LgbsSe.VfPpkd-ksKsZd-mWPk3d{
    --mdc-ripple-fg-opacity:.12;
  }
  .VfPpkd-LgbsSe .VfPpkd-Jh9lGc{
    position:absolute;box-sizing:content-box;width:100%;height:100%;overflow:hidden
  }
  .VfPpkd-LgbsSe:not(.VfPpkd-LgbsSe-OWXEXe-INsAgc) .VfPpkd-Jh9lGc{
    top:0;left:0
  }


.VfPpkd-LgbsSe-OWXEXe-MV7yeb .VfPpkd-Jh9lGc::before,
.VfPpkd-LgbsSe-OWXEXe-MV7yeb .VfPpkd-Jh9lGc::after,
.VfPpkd-LgbsSe-OWXEXe-k8QpJ .VfPpkd-Jh9lGc::before,
.VfPpkd-LgbsSe-OWXEXe-k8QpJ .VfPpkd-Jh9lGc::after{
  background-color:#fff;background-color:var(--mdc-theme-on-primary,#fff)
}

.VfPpkd-LgbsSe-OWXEXe-MV7yeb:hover .VfPpkd-Jh9lGc::before,
.VfPpkd-LgbsSe-OWXEXe-k8QpJ:hover .VfPpkd-Jh9lGc::before{
  opacity:.08
}
    
.VfPpkd-LgbsSe-OWXEXe-MV7yeb.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe .VfPpkd-Jh9lGc::before,
.VfPpkd-LgbsSe-OWXEXe-MV7yeb:not(.VfPpkd-ksKsZd-mWPk3d):focus .VfPpkd-Jh9lGc::before,
.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe .VfPpkd-Jh9lGc::before,
.VfPpkd-LgbsSe-OWXEXe-k8QpJ:not(.VfPpkd-ksKsZd-mWPk3d):focus .VfPpkd-Jh9lGc::before{
  transition-duration:75ms;opacity:.24
}

.VfPpkd-LgbsSe-OWXEXe-MV7yeb:not(.VfPpkd-ksKsZd-mWPk3d) .VfPpkd-Jh9lGc::after,
.VfPpkd-LgbsSe-OWXEXe-k8QpJ:not(.VfPpkd-ksKsZd-mWPk3d) .VfPpkd-Jh9lGc::after{
  transition:opacity 150ms linear
}
.VfPpkd-LgbsSe-OWXEXe-MV7yeb:not(.VfPpkd-ksKsZd-mWPk3d):active .VfPpkd-Jh9lGc::after,
.VfPpkd-LgbsSe-OWXEXe-k8QpJ:not(.VfPpkd-ksKsZd-mWPk3d):active .VfPpkd-Jh9lGc::after{
  transition-duration:75ms;opacity:.24
}
.VfPpkd-LgbsSe-OWXEXe-MV7yeb.VfPpkd-ksKsZd-mWPk3d,
.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.24}
.VfPpkd-LgbsSe{
  height:36px
}







@keyframes mdc-ripple-fg-radius-in{
  0%{
    animation-timing-function:cubic-bezier(0.4,0,0.2,1);
    transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)
  }
  to{
    transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))
  }
}


@keyframes mdc-ripple-fg-opacity-in{
  0%{animation-timing-function:linear;opacity:0}
  to{opacity:var(--mdc-ripple-fg-opacity,0)}
}
  
@keyframes mdc-ripple-fg-opacity-out{
  0%{animation-timing-function:linear;
    opacity:var(--mdc-ripple-fg-opacity,0)
  }
  to{opacity:0}
}





























































.VfPpkd-ksKsZd-XxIAqe{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}


.VfPpkd-ksKsZd-XxIAqe::before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}
.VfPpkd-ksKsZd-XxIAqe::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}
.VfPpkd-ksKsZd-XxIAqe::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}
.VfPpkd-ksKsZd-XxIAqe.VfPpkd-ksKsZd-mWPk3d::before{transform:scale(var(--mdc-ripple-fg-scale,1))}
.VfPpkd-ksKsZd-XxIAqe.VfPpkd-ksKsZd-mWPk3d::after{top:0;left:0;transform:scale(0);transform-origin:center center}
.VfPpkd-ksKsZd-XxIAqe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-ZNMTqd::after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}


.VfPpkd-ksKsZd-XxIAqe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc::after{
  animation: mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
.VfPpkd-ksKsZd-XxIAqe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-OmS1vf::after{
  animation:mdc-ripple-fg-opacity-out 150ms;
  transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))
}
.VfPpkd-ksKsZd-XxIAqe::before{
  background-color:#000
}
.VfPpkd-ksKsZd-XxIAqe::after{background-color:#000}
.VfPpkd-ksKsZd-XxIAqe:hover::before{opacity:.04}
.VfPpkd-ksKsZd-XxIAqe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe::before{transition-duration:75ms;opacity:.12}
.VfPpkd-ksKsZd-XxIAqe:not(.VfPpkd-ksKsZd-mWPk3d):focus::before{transition-duration:75ms;opacity:.12}
.VfPpkd-ksKsZd-XxIAqe:not(.VfPpkd-ksKsZd-mWPk3d)::after{transition:opacity 150ms linear}
.VfPpkd-ksKsZd-XxIAqe:not(.VfPpkd-ksKsZd-mWPk3d):active::after{transition-duration:75ms;opacity:.12}
.VfPpkd-ksKsZd-XxIAqe.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.12}
.VfPpkd-ksKsZd-XxIAqe::before{
  top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%
}
.VfPpkd-ksKsZd-XxIAqe::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.VfPpkd-ksKsZd-XxIAqe.VfPpkd-ksKsZd-mWPk3d::after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.VfPpkd-ksKsZd-XxIAqe[data-mdc-ripple-is-unbounded]{overflow:visible}.VfPpkd-ksKsZd-XxIAqe[data-mdc-ripple-is-unbounded]::before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.VfPpkd-ksKsZd-XxIAqe[data-mdc-ripple-is-unbounded]::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.VfPpkd-ksKsZd-XxIAqe[data-mdc-ripple-is-unbounded].VfPpkd-ksKsZd-mWPk3d::before{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.VfPpkd-ksKsZd-XxIAqe[data-mdc-ripple-is-unbounded].VfPpkd-ksKsZd-mWPk3d::after{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.VfPpkd-dgl2Hf-ppHlrf-sM5MNb{display:inline}











.VfPpkd-Bz112c-LgbsSe{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;-webkit-user-select:none;width:48px;height:48px;padding:12px}

.VfPpkd-Bz112c-LgbsSe svg,.VfPpkd-Bz112c-LgbsSe img{width:24px;height:24px}.VfPpkd-Bz112c-LgbsSe:disabled{color:rgba(0,0,0,0.38);color:var(--mdc-theme-text-disabled-on-light,rgba(0,0,0,0.38));cursor:default;pointer-events:none}.VfPpkd-Bz112c-kBDsod{display:inline-block}.VfPpkd-Bz112c-kBDsod.VfPpkd-Bz112c-kBDsod-OWXEXe-IT5dJd,.VfPpkd-Bz112c-LgbsSe-OWXEXe-IT5dJd .VfPpkd-Bz112c-kBDsod{display:none}.VfPpkd-Bz112c-LgbsSe-OWXEXe-IT5dJd .VfPpkd-Bz112c-kBDsod.VfPpkd-Bz112c-kBDsod-OWXEXe-IT5dJd{display:inline-block}.VfPpkd-Bz112c-LgbsSe{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.VfPpkd-Bz112c-LgbsSe::before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.VfPpkd-Bz112c-LgbsSe::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.VfPpkd-Bz112c-LgbsSe::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.VfPpkd-Bz112c-LgbsSe.VfPpkd-ksKsZd-mWPk3d::before{transform:scale(var(--mdc-ripple-fg-scale,1))}.VfPpkd-Bz112c-LgbsSe.VfPpkd-ksKsZd-mWPk3d::after{transform:scale(0);transform-origin:center center}.VfPpkd-Bz112c-LgbsSe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-ZNMTqd::after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}

















.VfPpkd-Bz112c-LgbsSe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.VfPpkd-Bz112c-LgbsSe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-OmS1vf::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.VfPpkd-Bz112c-LgbsSe::before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.VfPpkd-Bz112c-LgbsSe::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.VfPpkd-Bz112c-LgbsSe.VfPpkd-ksKsZd-mWPk3d::before{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.VfPpkd-Bz112c-LgbsSe.VfPpkd-ksKsZd-mWPk3d::after{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.VfPpkd-Bz112c-LgbsSe::before{background-color:#000}.VfPpkd-Bz112c-LgbsSe::after{background-color:#000}.VfPpkd-Bz112c-LgbsSe:hover::before{opacity:.04}.VfPpkd-Bz112c-LgbsSe.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe::before{transition-duration:75ms;opacity:.12}.VfPpkd-Bz112c-LgbsSe:not(.VfPpkd-ksKsZd-mWPk3d):focus::before{transition-duration:75ms;opacity:.12}.VfPpkd-Bz112c-LgbsSe:not(.VfPpkd-ksKsZd-mWPk3d)::after{transition:opacity 150ms linear}.VfPpkd-Bz112c-LgbsSe:not(.VfPpkd-ksKsZd-mWPk3d):active::after{transition-duration:75ms;opacity:.12}.VfPpkd-Bz112c-LgbsSe.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.12}.nCP5yc{font-family:"Google Sans",Roboto,Arial,sans-serif;font-size:.875rem;font-weight:500;letter-spacing:.0107142857em;text-transform:none;transition:border 280ms cubic-bezier(0.4,0,0.2,1),box-shadow 280ms cubic-bezier(0.4,0,0.2,1);box-shadow:none}.nCP5yc .VfPpkd-Jh9lGc{height:100%;position:absolute;overflow:hidden;width:100%;z-index:0}.nCP5yc .VfPpkd-vQzf8d,.nCP5yc .VfPpkd-kBDsod{position:relative}.nCP5yc:not(:disabled){background-color:#1a73e8;background-color:var(--gm-fillbutton-container-color,#1a73e8);color:#fff;color:var(--gm-fillbutton-ink-color,#fff)}.nCP5yc:disabled{background-color:rgba(60,64,67,0.12);background-color:var(--gm-fillbutton-disabled-container-color,rgba(60,64,67,0.12));color:rgba(60,64,67,0.38);color:var(--gm-fillbutton-disabled-ink-color,rgba(60,64,67,0.38))}.nCP5yc .VfPpkd-Jh9lGc::before,.nCP5yc .VfPpkd-Jh9lGc::after{background-color:#202124;background-color:var(--gm-fillbutton-state-color,#202124)}.nCP5yc:hover .VfPpkd-Jh9lGc::before{opacity:.16}.nCP5yc.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe .VfPpkd-Jh9lGc::before,.nCP5yc:not(.VfPpkd-ksKsZd-mWPk3d):focus .VfPpkd-Jh9lGc::before{transition-duration:75ms;opacity:.24}.nCP5yc:not(.VfPpkd-ksKsZd-mWPk3d) .VfPpkd-Jh9lGc::after{transition:opacity 150ms linear}.nCP5yc:not(.VfPpkd-ksKsZd-mWPk3d):active .VfPpkd-Jh9lGc::after{transition-duration:75ms;opacity:.2}.nCP5yc.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.2}.nCP5yc .VfPpkd-BFbNVe-bF1uUb{opacity:0}.nCP5yc:hover,.nCP5yc:focus{box-shadow:0 1px 2px 0 rgba(60,64,67,0.3),0 1px 3px 1px rgba(60,64,67,0.15);box-shadow:0 1px 2px 0 var(--gm-fillbutton-keyshadow-color,rgba(60,64,67,0.3)),0 1px 3px 1px var(--gm-fillbutton-ambientshadow-color,rgba(60,64,67,0.15))}.nCP5yc:hover .VfPpkd-BFbNVe-bF1uUb,.nCP5yc:focus .VfPpkd-BFbNVe-bF1uUb{opacity:0}.nCP5yc:active{box-shadow:0 1px 2px 0 rgba(60,64,67,0.3),0 2px 6px 2px rgba(60,64,67,0.15);box-shadow:0 1px 2px 0 var(--gm-fillbutton-keyshadow-color,rgba(60,64,67,0.3)),0 2px 6px 2px var(--gm-fillbutton-ambientshadow-color,rgba(60,64,67,0.15))}.nCP5yc:active .VfPpkd-BFbNVe-bF1uUb{opacity:0}.Rj2Mlf{font-family:"Google Sans",Roboto,Arial,sans-serif;font-size:.875rem;font-weight:500;letter-spacing:.0107142857em;text-transform:none;transition:border 280ms cubic-bezier(0.4,0,0.2,1),box-shadow 280ms cubic-bezier(0.4,0,0.2,1);box-shadow:none}.Rj2Mlf .VfPpkd-Jh9lGc{height:100%;position:absolute;overflow:hidden;width:100%;z-index:0}.Rj2Mlf .VfPpkd-vQzf8d,.Rj2Mlf .VfPpkd-kBDsod{position:relative}.Rj2Mlf:not(:disabled){color:#1a73e8;color:var(--gm-hairlinebutton-ink-color,#1a73e8);border-color:#dadce0;border-color:var(--gm-hairlinebutton-outline-color,#dadce0)}.Rj2Mlf:disabled{color:rgba(60,64,67,0.38);color:var(--gm-hairlinebutton-disabled-ink-color,rgba(60,64,67,0.38));border-color:rgba(60,64,67,0.12);border-color:var(--gm-hairlinebutton-disabled-outline-color,rgba(60,64,67,0.12))}.Rj2Mlf:hover:not(:disabled),.Rj2Mlf:active:not(:disabled),.Rj2Mlf:not(.VfPpkd-ksKsZd-mWPk3d):focus:not(:disabled),.Rj2Mlf.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe:not(:disabled){color:#174ea6;color:var(--gm-hairlinebutton-ink-color--stateful,#174ea6)}.Rj2Mlf:hover:not(:disabled),.Rj2Mlf:active:not(:disabled){border-color:#dadce0;border-color:var(--gm-hairlinebutton-outline-color,#dadce0)}.Rj2Mlf:focus:not(:disabled){border-color:#174ea6;border-color:var(--gm-hairlinebutton-outline-color--stateful,#174ea6)}.Rj2Mlf .VfPpkd-BFbNVe-bF1uUb{opacity:0}.Rj2Mlf .VfPpkd-Jh9lGc::before,.Rj2Mlf .VfPpkd-Jh9lGc::after{background-color:#1a73e8;background-color:var(--gm-hairlinebutton-state-color,#1a73e8)}.Rj2Mlf:hover .VfPpkd-Jh9lGc::before{opacity:.04}.Rj2Mlf.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe .VfPpkd-Jh9lGc::before,.Rj2Mlf:not(.VfPpkd-ksKsZd-mWPk3d):focus .VfPpkd-Jh9lGc::before{transition-duration:75ms;opacity:.12}.Rj2Mlf:not(.VfPpkd-ksKsZd-mWPk3d) .VfPpkd-Jh9lGc::after{transition:opacity 150ms linear}.Rj2Mlf:not(.VfPpkd-ksKsZd-mWPk3d):active .VfPpkd-Jh9lGc::after{transition-duration:75ms;opacity:.12}.Rj2Mlf.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.12}.b9hyVd{font-family:"Google Sans",Roboto,Arial,sans-serif;font-size:.875rem;font-weight:500;letter-spacing:.0107142857em;text-transform:none;transition:border 280ms cubic-bezier(0.4,0,0.2,1),box-shadow 280ms cubic-bezier(0.4,0,0.2,1);border:0;box-shadow:0 1px 2px 0 rgba(60,64,67,0.3),0 1px 3px 1px rgba(60,64,67,0.15);box-shadow:0 1px 2px 0 var(--gm-protectedbutton-keyshadow-color,rgba(60,64,67,0.3)),0 1px 3px 1px var(--gm-protectedbutton-ambientshadow-color,rgba(60,64,67,0.15))}.b9hyVd .VfPpkd-Jh9lGc{height:100%;position:absolute;overflow:hidden;width:100%;z-index:0}.b9hyVd .VfPpkd-vQzf8d,.b9hyVd .VfPpkd-kBDsod{position:relative}.b9hyVd:not(:disabled){background-color:#fff;background-color:var(--gm-protectedbutton-container-color,#fff);color:#1a73e8;color:var(--gm-protectedbutton-ink-color,#1a73e8)}.b9hyVd:disabled{background-color:rgba(60,64,67,0.12);background-color:var(--gm-protectedbutton-disabled-container-color,rgba(60,64,67,0.12));color:rgba(60,64,67,0.38);color:var(--gm-protectedbutton-disabled-ink-color,rgba(60,64,67,0.38))}.b9hyVd:hover:not(:disabled),.b9hyVd:active:not(:disabled),.b9hyVd:not(.VfPpkd-ksKsZd-mWPk3d):focus:not(:disabled),.b9hyVd.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe:not(:disabled){color:#174ea6;color:var(--gm-protectedbutton-ink-color--stateful,#174ea6)}.b9hyVd .VfPpkd-BFbNVe-bF1uUb{opacity:0}.b9hyVd:hover,.b9hyVd:focus{border:0;box-shadow:0 1px 2px 0 rgba(60,64,67,0.3),0 2px 6px 2px rgba(60,64,67,0.15);box-shadow:0 1px 2px 0 var(--gm-protectedbutton-keyshadow-color,rgba(60,64,67,0.3)),0 2px 6px 2px var(--gm-protectedbutton-ambientshadow-color,rgba(60,64,67,0.15))}.b9hyVd:hover .VfPpkd-BFbNVe-bF1uUb,.b9hyVd:focus .VfPpkd-BFbNVe-bF1uUb{opacity:0}.b9hyVd:active{border:0;box-shadow:0 1px 3px 0 rgba(60,64,67,0.3),0 4px 8px 3px rgba(60,64,67,0.15);box-shadow:0 1px 3px 0 var(--gm-protectedbutton-keyshadow-color,rgba(60,64,67,0.3)),0 4px 8px 3px var(--gm-protectedbutton-ambientshadow-color,rgba(60,64,67,0.15))}.b9hyVd:active .VfPpkd-BFbNVe-bF1uUb{opacity:0}.b9hyVd .VfPpkd-Jh9lGc::before,.b9hyVd .VfPpkd-Jh9lGc::after{background-color:#1a73e8;background-color:var(--gm-protectedbutton-state-color,#1a73e8)}.b9hyVd:hover .VfPpkd-Jh9lGc::before{opacity:.04}.b9hyVd.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe .VfPpkd-Jh9lGc::before,.b9hyVd:not(.VfPpkd-ksKsZd-mWPk3d):focus .VfPpkd-Jh9lGc::before{transition-duration:75ms;opacity:.12}.b9hyVd:not(.VfPpkd-ksKsZd-mWPk3d) .VfPpkd-Jh9lGc::after{transition:opacity 150ms linear}.b9hyVd:not(.VfPpkd-ksKsZd-mWPk3d):active .VfPpkd-Jh9lGc::after{transition-duration:75ms;opacity:.12}.b9hyVd.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.12}.ksBjEc{font-family:"Google Sans",Roboto,Arial,sans-serif;font-size:.875rem;font-weight:500;letter-spacing:.0107142857em;text-transform:none}.ksBjEc .VfPpkd-Jh9lGc{height:100%;position:absolute;overflow:hidden;width:100%;z-index:0}.ksBjEc .VfPpkd-vQzf8d,.ksBjEc .VfPpkd-kBDsod{position:relative}.ksBjEc:not(:disabled){background-color:transparent;color:#1a73e8;color:var(--gm-colortextbutton-ink-color,#1a73e8)}.ksBjEc:disabled{color:rgba(60,64,67,0.38);color:var(--gm-colortextbutton-disabled-ink-color,rgba(60,64,67,0.38))}.ksBjEc:hover:not(:disabled),.ksBjEc:active:not(:disabled),.ksBjEc:not(.VfPpkd-ksKsZd-mWPk3d):focus:not(:disabled),.ksBjEc.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe:not(:disabled){color:#174ea6;color:var(--gm-colortextbutton-ink-color--stateful,#174ea6)}.ksBjEc .VfPpkd-Jh9lGc::before,.ksBjEc .VfPpkd-Jh9lGc::after{background-color:#1a73e8;background-color:var(--gm-colortextbutton-state-color,#1a73e8)}.ksBjEc:hover .VfPpkd-Jh9lGc::before{opacity:.04}.ksBjEc.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe .VfPpkd-Jh9lGc::before,.ksBjEc:not(.VfPpkd-ksKsZd-mWPk3d):focus .VfPpkd-Jh9lGc::before{transition-duration:75ms;opacity:.12}.ksBjEc:not(.VfPpkd-ksKsZd-mWPk3d) .VfPpkd-Jh9lGc::after{transition:opacity 150ms linear}.ksBjEc:not(.VfPpkd-ksKsZd-mWPk3d):active .VfPpkd-Jh9lGc::after{transition-duration:75ms;opacity:.12}.ksBjEc.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.12}.LjDxcd{font-family:"Google Sans",Roboto,Arial,sans-serif;font-size:.875rem;font-weight:500;letter-spacing:.0107142857em;text-transform:none}.LjDxcd .VfPpkd-Jh9lGc{height:100%;position:absolute;overflow:hidden;width:100%;z-index:0}.LjDxcd .VfPpkd-vQzf8d,.LjDxcd .VfPpkd-kBDsod{position:relative}.LjDxcd:not(:disabled){color:#5f6368;color:var(--gm-neutraltextbutton-ink-color,#5f6368)}.LjDxcd:disabled{color:rgba(60,64,67,0.38);color:var(--gm-neutraltextbutton-disabled-ink-color,rgba(60,64,67,0.38))}.LjDxcd:hover:not(:disabled),.LjDxcd:active:not(:disabled),.LjDxcd:not(.VfPpkd-ksKsZd-mWPk3d):focus:not(:disabled),.LjDxcd.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe:not(:disabled){color:#202124;color:var(--gm-neutraltextbutton-ink-color--stateful,#202124)}.LjDxcd .VfPpkd-Jh9lGc::before,.LjDxcd .VfPpkd-Jh9lGc::after{background-color:#5f6368;background-color:var(--gm-neutraltextbutton-state-color,#5f6368)}.LjDxcd:hover .VfPpkd-Jh9lGc::before{opacity:.04}.LjDxcd.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe .VfPpkd-Jh9lGc::before,.LjDxcd:not(.VfPpkd-ksKsZd-mWPk3d):focus .VfPpkd-Jh9lGc::before{transition-duration:75ms;opacity:.12}.LjDxcd:not(.VfPpkd-ksKsZd-mWPk3d) .VfPpkd-Jh9lGc::after{transition:opacity 150ms linear}.LjDxcd:not(.VfPpkd-ksKsZd-mWPk3d):active .VfPpkd-Jh9lGc::after{transition-duration:75ms;opacity:.12}.LjDxcd.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.12}.DuMIQc{padding:0 24px 0 24px}.P62QJc{padding:0 23px 0 23px;border-width:1px}.P62QJc .VfPpkd-Jh9lGc{top:-1px;left:-1px;border:1px solid transparent}.yHy1rc{z-index:0}.yHy1rc::before{z-index:-1}.yHy1rc::after{z-index:-1}.yHy1rc:disabled,.fzRBVc:disabled{color:rgba(60,64,67,0.38);color:var(--gm-iconbutton-disabled-ink-color,rgba(60,64,67,0.38))}.WpHeLc{height:100%;left:0;position:absolute;top:0;width:100%;outline:none}[dir=rtl] .HDnnrf .VfPpkd-kBDsod,.HDnnrf .VfPpkd-kBDsod[dir=rtl],[dir=rtl] .QDwDD,.QDwDD[dir=rtl]{transform:scaleX(-1)}.VfPpkd-BFbNVe-bF1uUb{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4,0,0.2,1);background-color:#fff}.NZp2ef{background-color:#e8eaed}.VfPpkd-rymPhb{-webkit-font-smoothing:antialiased;font-family:Roboto,sans-serif;font-family:var(--mdc-typography-subtitle1-font-family,var(--mdc-typography-font-family,Roboto,sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size,1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height,1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight,400);letter-spacing:.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing,0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration,inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform,inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0,0,0,0.87);color:var(--mdc-theme-text-primary-on-background,rgba(0,0,0,0.87))}.VfPpkd-rymPhb:focus{outline:none}.VfPpkd-rymPhb-ibnC6b{height:48px}.VfPpkd-rymPhb-L8ivfd-fmcmS{color:rgba(0,0,0,0.54);color:var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,0.54))}.VfPpkd-rymPhb-f7MjDc{background-color:transparent;color:rgba(0,0,0,0.38);color:var(--mdc-theme-text-icon-on-background,rgba(0,0,0,0.38))}.VfPpkd-rymPhb-IhFlZd{color:rgba(0,0,0,0.38);color:var(--mdc-theme-text-hint-on-background,rgba(0,0,0,0.38))}.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-b9t22c{opacity:.38;color:#000;color:var(--mdc-theme-on-surface,#000)}.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-fpDzbe-fmcmS,.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-L8ivfd-fmcmS{color:#000;color:var(--mdc-theme-on-surface,#000)}.VfPpkd-rymPhb-OWXEXe-EzIYc{padding-top:4px;padding-bottom:4px;font-size:.812rem}.VfPpkd-rymPhb-ibnC6b{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.VfPpkd-rymPhb-ibnC6b:focus{outline:none}.VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd,.VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b,.VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd .VfPpkd-rymPhb-f7MjDc,.VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b .VfPpkd-rymPhb-f7MjDc{color:#6200ee;color:var(--mdc-theme-primary,#6200ee)}.VfPpkd-rymPhb-f7MjDc{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.VfPpkd-rymPhb-ibnC6b[dir=rtl] .VfPpkd-rymPhb-f7MjDc,[dir=rtl] .VfPpkd-rymPhb-ibnC6b .VfPpkd-rymPhb-f7MjDc{margin-left:32px;margin-right:0}.VfPpkd-rymPhb .VfPpkd-rymPhb-f7MjDc{display:-webkit-inline-box;display:inline-flex}.VfPpkd-rymPhb-IhFlZd{margin-left:auto;margin-right:0}.VfPpkd-rymPhb-IhFlZd:not(.HzV7m-fuEl3d){-webkit-font-smoothing:antialiased;font-family:Roboto,sans-serif;font-family:var(--mdc-typography-caption-font-family,var(--mdc-typography-font-family,Roboto,sans-serif));font-size:.75rem;font-size:var(--mdc-typography-caption-font-size,0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height,1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight,400);letter-spacing:.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing,0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration,inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform,inherit)}.VfPpkd-rymPhb-ibnC6b[dir=rtl] .VfPpkd-rymPhb-IhFlZd,[dir=rtl] .VfPpkd-rymPhb-ibnC6b .VfPpkd-rymPhb-IhFlZd{margin-left:0;margin-right:auto}.VfPpkd-rymPhb-b9t22c{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.VfPpkd-rymPhb-b9t22c[for]{pointer-events:none}.VfPpkd-rymPhb-fpDzbe-fmcmS{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.VfPpkd-rymPhb-fpDzbe-fmcmS::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.VfPpkd-rymPhb-fpDzbe-fmcmS::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-fpDzbe-fmcmS{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-fpDzbe-fmcmS::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-fpDzbe-fmcmS::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.VfPpkd-rymPhb-L8ivfd-fmcmS{-webkit-font-smoothing:antialiased;font-family:Roboto,sans-serif;font-family:var(--mdc-typography-body2-font-family,var(--mdc-typography-font-family,Roboto,sans-serif));font-size:.875rem;font-size:var(--mdc-typography-body2-font-size,0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height,1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight,400);letter-spacing:.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing,0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration,inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform,inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.VfPpkd-rymPhb-L8ivfd-fmcmS::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-L8ivfd-fmcmS{font-size:inherit}.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-ibnC6b{height:40px}.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-f7MjDc{margin-left:0;margin-right:36px;width:20px;height:20px}.VfPpkd-rymPhb-ibnC6b[dir=rtl] .VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-f7MjDc,[dir=rtl] .VfPpkd-rymPhb-ibnC6b .VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-f7MjDc{margin-left:36px;margin-right:0}.VfPpkd-rymPhb-OWXEXe-YLEF4c-rymPhb .VfPpkd-rymPhb-ibnC6b{height:56px}.VfPpkd-rymPhb-OWXEXe-YLEF4c-rymPhb .VfPpkd-rymPhb-f7MjDc{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.VfPpkd-rymPhb-ibnC6b[dir=rtl] .VfPpkd-rymPhb-OWXEXe-YLEF4c-rymPhb .VfPpkd-rymPhb-f7MjDc,[dir=rtl] .VfPpkd-rymPhb-ibnC6b .VfPpkd-rymPhb-OWXEXe-YLEF4c-rymPhb .VfPpkd-rymPhb-f7MjDc{margin-left:16px;margin-right:0}.VfPpkd-rymPhb-OWXEXe-aSi1db-RWgCYc .VfPpkd-rymPhb-b9t22c{align-self:flex-start}




.VfPpkd-rymPhb-OWXEXe-aSi1db-RWgCYc .VfPpkd-rymPhb-ibnC6b{height:72px}.VfPpkd-rymPhb-OWXEXe-aSi1db-RWgCYc.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-ibnC6b,.VfPpkd-rymPhb-OWXEXe-YLEF4c-rymPhb.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-ibnC6b{height:60px}.VfPpkd-rymPhb-OWXEXe-YLEF4c-rymPhb.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-f7MjDc{margin-left:0;margin-right:20px;width:36px;height:36px}.VfPpkd-rymPhb-ibnC6b[dir=rtl] .VfPpkd-rymPhb-OWXEXe-YLEF4c-rymPhb.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-f7MjDc,[dir=rtl] .VfPpkd-rymPhb-ibnC6b .VfPpkd-rymPhb-OWXEXe-YLEF4c-rymPhb.VfPpkd-rymPhb-OWXEXe-EzIYc .VfPpkd-rymPhb-f7MjDc{margin-left:20px;margin-right:0}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b{cursor:pointer}a.VfPpkd-rymPhb-ibnC6b{color:inherit;text-decoration:none}.VfPpkd-rymPhb-clz4Ic{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0,0,0,0.12)}.VfPpkd-rymPhb-clz4Ic-OWXEXe-YbohUe{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.VfPpkd-rymPhb-JNdkSc[dir=rtl] .VfPpkd-rymPhb-clz4Ic-OWXEXe-YbohUe,[dir=rtl] .VfPpkd-rymPhb-JNdkSc .VfPpkd-rymPhb-clz4Ic-OWXEXe-YbohUe{margin-left:0;margin-right:72px}.VfPpkd-rymPhb-JNdkSc .VfPpkd-rymPhb{padding:0}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b.VfPpkd-ksKsZd-mWPk3d::before{transform:scale(var(--mdc-ripple-fg-scale,1))}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b.VfPpkd-ksKsZd-mWPk3d::after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b.VfPpkd-ksKsZd-mWPk3d-OWXEXe-ZNMTqd::after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-OmS1vf::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b.VfPpkd-ksKsZd-mWPk3d::after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b::after{background-color:#000}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b:hover::before{opacity:.04}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b:not(.VfPpkd-ksKsZd-mWPk3d):focus::before{transition-duration:75ms;opacity:.12}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b:not(.VfPpkd-ksKsZd-mWPk3d)::after{transition:opacity 150ms linear}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b:not(.VfPpkd-ksKsZd-mWPk3d):active::after{transition-duration:75ms;opacity:.12}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.12}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b::before{opacity:.12;background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b::after{background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b:hover::before{opacity:.16}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b:not(.VfPpkd-ksKsZd-mWPk3d):focus::before{transition-duration:75ms;opacity:.24}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b:not(.VfPpkd-ksKsZd-mWPk3d)::after{transition:opacity 150ms linear}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b:not(.VfPpkd-ksKsZd-mWPk3d):active::after{transition-duration:75ms;opacity:.24}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-pXU01b.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.24}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd::before{opacity:.08;background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd::after{background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd:hover::before{opacity:.12}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd:not(.VfPpkd-ksKsZd-mWPk3d):focus::before{transition-duration:75ms;opacity:.2}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd:not(.VfPpkd-ksKsZd-mWPk3d)::after{transition:opacity 150ms linear}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd:not(.VfPpkd-ksKsZd-mWPk3d):active::after{transition-duration:75ms;opacity:.2}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>:not(.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me).VfPpkd-rymPhb-ibnC6b-OWXEXe-gk6SMd.VfPpkd-ksKsZd-mWPk3d{--mdc-ripple-fg-opacity:.2}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me.VfPpkd-ksKsZd-mWPk3d::before{transform:scale(var(--mdc-ripple-fg-scale,1))}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me.VfPpkd-ksKsZd-mWPk3d::after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me.VfPpkd-ksKsZd-mWPk3d-OWXEXe-ZNMTqd::after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me.VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-OmS1vf::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me.VfPpkd-ksKsZd-mWPk3d::after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me::after{background-color:#000}:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me.VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe::before,:not(.VfPpkd-rymPhb-OWXEXe-tPcied-hXIJHe)>.VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me:not(.VfPpkd-ksKsZd-mWPk3d):focus::before{transition-duration:75ms;opacity:.12}.r6B9Fd{font-family:Roboto,Arial,sans-serif;font-size:1rem;font-weight:400;letter-spacing:.00625em;line-height:1.5rem;color:#000;color:var(--mdc-theme-on-surface,#000)}.r6B9Fd .VfPpkd-rymPhb-IhFlZd{color:#5f6368}.r6B9Fd .VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-b9t22c,.r6B9Fd .VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-fpDzbe-fmcmS,.r6B9Fd .VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-L8ivfd-fmcmS{color:#3c4043}.r6B9Fd .VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-b9t22c{opacity:.38}.VfPpkd-xl07Ob-XxIAqe{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0,0,0.2,1);box-shadow:0 5px 5px -3px rgba(0,0,0,0.2),0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12);background-color:#fff;background-color:var(--mdc-theme-surface,#fff);color:#000;color:var(--mdc-theme-on-surface,#000);border-radius:4px;transform-origin-left:top left;transform-origin-right:top right}.VfPpkd-xl07Ob-XxIAqe:focus{outline:none}.VfPpkd-xl07Ob-XxIAqe-OWXEXe-FNFY6c{display:inline-block;transform:scale(1);opacity:1}.VfPpkd-xl07Ob-XxIAqe-OWXEXe-oT9UPb-FNFY6c{display:inline-block;transform:scale(0.8);opacity:0}.VfPpkd-xl07Ob-XxIAqe-OWXEXe-oT9UPb-xTMeO{display:inline-block;opacity:0;transition:opacity .075s linear}[dir=rtl] .VfPpkd-xl07Ob-XxIAqe,.VfPpkd-xl07Ob-XxIAqe[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.VfPpkd-xl07Ob-XxIAqe-OWXEXe-oYxtQd{position:relative;overflow:visible}.VfPpkd-xl07Ob-XxIAqe-OWXEXe-qbOKL{position:fixed}.UQ5E0{box-shadow:0 3px 5px -1px rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.14),0 1px 18px 0 rgba(0,0,0,0.12)}.VfPpkd-xl07Ob{min-width:112px}.VfPpkd-xl07Ob .VfPpkd-rymPhb-IhFlZd,.VfPpkd-xl07Ob .VfPpkd-rymPhb-f7MjDc{color:rgba(0,0,0,0.87)}.VfPpkd-xl07Ob .VfPpkd-rymPhb{color:rgba(0,0,0,0.87);position:relative}.VfPpkd-xl07Ob .VfPpkd-rymPhb .VfPpkd-BFbNVe-bF1uUb{width:100%;height:100%;top:0;left:0}.VfPpkd-xl07Ob .VfPpkd-rymPhb-clz4Ic{margin:8px 0}.VfPpkd-xl07Ob .VfPpkd-rymPhb-ibnC6b{-webkit-user-select:none}.VfPpkd-xl07Ob .VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me{cursor:auto}.VfPpkd-xl07Ob a.VfPpkd-rymPhb-ibnC6b .VfPpkd-rymPhb-b9t22c,.VfPpkd-xl07Ob a.VfPpkd-rymPhb-ibnC6b .VfPpkd-rymPhb-f7MjDc{pointer-events:none}.VfPpkd-qPzbhe-JNdkSc{padding:0;fill:currentColor}.VfPpkd-qPzbhe-JNdkSc .VfPpkd-rymPhb-ibnC6b{padding-left:56px;padding-right:16px}[dir=rtl] .VfPpkd-qPzbhe-JNdkSc .VfPpkd-rymPhb-ibnC6b,.VfPpkd-qPzbhe-JNdkSc .VfPpkd-rymPhb-ibnC6b[dir=rtl]{padding-left:16px;padding-right:56px}.VfPpkd-qPzbhe-JNdkSc .VfPpkd-qPzbhe-JNdkSc-Bz112c{left:16px;right:initial;display:none;position:absolute;top:50%;transform:translateY(-50%)}[dir=rtl] .VfPpkd-qPzbhe-JNdkSc .VfPpkd-qPzbhe-JNdkSc-Bz112c,.VfPpkd-qPzbhe-JNdkSc .VfPpkd-qPzbhe-JNdkSc-Bz112c[dir=rtl]{left:initial;right:16px}.VfPpkd-xl07Ob-ibnC6b-OWXEXe-gk6SMd .VfPpkd-qPzbhe-JNdkSc-Bz112c{display:inline}.q6oraf{box-shadow:0 3px 5px -1px rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.14),0 1px 18px 0 rgba(0,0,0,0.12)}.q6oraf .VfPpkd-rymPhb{font-family:Roboto,Arial,sans-serif;font-size:1rem;font-weight:400;letter-spacing:.00625em;line-height:1.5rem;color:#000;color:var(--mdc-theme-on-surface,#000)}.q6oraf .VfPpkd-rymPhb .VfPpkd-rymPhb-IhFlZd{color:#5f6368}.q6oraf .VfPpkd-rymPhb .VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-b9t22c,.q6oraf .VfPpkd-rymPhb .VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-fpDzbe-fmcmS,.q6oraf .VfPpkd-rymPhb .VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-L8ivfd-fmcmS{color:#3c4043}.q6oraf .VfPpkd-rymPhb .VfPpkd-rymPhb-ibnC6b-OWXEXe-OWB6Me .VfPpkd-rymPhb-b9t22c{opacity:.38}.kFwPee{height:100%}.ydMMEb{width:100%}.SSPGKf{display:block;overflow-y:hidden;z-index:1}.eejsDc{overflow-y:auto;-webkit-overflow-scrolling:touch}.MCcOAc{bottom:0;left:0;position:absolute;right:0;top:0;overflow:hidden;z-index:1}.MCcOAc>.pGxpHc{flex-shrink:0;box-flex:0;flex-grow:0}.IqBfM>.HLlAHb{align-items:center;display:flex;height:60px;position:absolute;right:16px;top:0;z-index:9999}.VUoKZ{display:none;position:absolute;top:0;left:0;right:0;height:3px;z-index:1001}.TRHLAc{position:absolute;top:0;left:0;width:25%;height:100%;background:#68e;transform:scaleX(0);transform-origin:0 0}.mIM26c .VUoKZ{display:block}.mIM26c .TRHLAc{animation:boqChromeapiPageProgressAnimation 1s infinite;animation-timing-function:cubic-bezier(0.4,0.0,1,1);animation-delay:.1s}



.ghyPEc .VUoKZ{position:fixed}@keyframes boqChromeapiPageProgressAnimation{0%{transform:scaleX(0)}50%{transform:scaleX(5)}to{transform:scaleX(5) translateX(100%)}}.Pa0fR a{color:#174ea6;letter-spacing:.03125rem}.Pa0fR a:focus,.Pa0fR a:hover{cursor:pointer;outline:none;text-decoration:underline}@media (forced-colors:active){.Pa0fR a{color:#1a73e8}}@media screen and (-ms-high-contrast:active){.Pa0fR a{color:#1a73e8}}.Jncg3b{font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:1.375rem;font-weight:400;letter-spacing:0;line-height:1.75rem}@media (max-width:54.5rem){.xd8kN{padding:2.5rem 0 0}.Jncg3b{font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:1.75rem;font-weight:400;letter-spacing:0;line-height:2.25rem}}.D9s3Oe,.FgXx3e{margin:16px 0}.nkfxXb{letter-spacing:.00625em;font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:1rem;font-weight:500;line-height:1.5rem}.RSqfmf{letter-spacing:.01428571em;font-family:Roboto,Arial,sans-serif;font-size:.875rem;font-weight:400;line-height:1.25rem}.qI0mnb{border-collapse:separate;border-spacing:2px;margin-top:8px;width:70%}.LS0sge .ylsU8c{display:none}.kjuqlc{height:12px}.XQ0tYd{font-size:10px;padding:0 2px}.J61Jbd{width:20%}.V9PNQc{font-weight:bold}.gmFWS{display:inline;height:20px;margin-right:4px;max-width:100%;vertical-align:bottom;width:20px}.VYrgGf{margin-top:10px}.xwihpc{font-weight:bold}.qI0mnb{color:#5f6368;letter-spacing:.025em;font-family:Roboto,Arial,sans-serif;font-size:.75rem;font-weight:400;line-height:1rem}.veTCKd{letter-spacing:.00625em;font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:1rem;font-weight:500;line-height:1.5rem}@media (max-width:415px){.qI0mnb{width:100%}}.NNfSWd{width:100%}@media (min-width:300px){.NNfSWd{height:157px}}@media (min-width:320px){.NNfSWd{height:170px}}@media (min-width:360px){.NNfSWd{height:195px}}@media (min-width:400px){.NNfSWd{height:220px}}@media (min-width:480px){.NNfSWd{height:270px}}@media (min-width:550px){.NNfSWd{height:313px}}@media (min-width:700px){.NNfSWd{height:407px}}@media (min-width:850px){.NNfSWd{height:501px}}@media (min-width:1000px){.NNfSWd{height:544px}}@media (min-width:1144px){.NNfSWd{height:634px}}.P94Uyb{display:flex}.pAbZk{margin:0 8px}.pAbZk:first-child{margin-left:0}.pAbZk.yspM1e{display:none}.fNVeW{padding:1rem 0}.wP1a4c{padding-bottom:1rem}.eLuyR{color:#5f6368;display:flex;flex-direction:row;margin:0 0 10px 20px}.jZHZ0d{height:3px;margin:8px 10px 0 20px;width:32px}.BSTMsb{min-width:320px}.zLfVef{-webkit-box-orient:horizontal;box-orient:horizontal;flex-direction:row;-webkit-box-align:center;box-align:center;align-items:center;box-pack:center;-webkit-box-pack:center;justify-content:center;display:flex;min-height:150px}.oIrc1{display:block;margin:32px 0;position:relative}.oIrc1+.oIrc1::before{background:#dadce0;content:'';display:block;height:1px;left:0;position:absolute;top:-16px;width:100%}.zMXRRc{bottom:0;left:0;position:absolute;right:0;top:0;z-index:2}.nbVTuf{-webkit-box-orient:horizontal;box-orient:horizontal;flex-direction:row;-webkit-box-align:start;box-align:start;align-items:flex-start;box-pack:start;-webkit-box-pack:start;justify-content:flex-start;display:flex;width:100%}.OlzzNb{flex:0 0 auto;border-radius:4px;height:92px;margin-left:16px;overflow:hidden;width:92px}.BKFycf{flex:1 1 auto}.X9s8db{color:#1967d2;letter-spacing:.01428571em;font-family:Roboto,Arial,sans-serif;font-size:.875rem;font-weight:400;line-height:1.25rem}.oIrc1:hover .X9s8db{text-decoration:underline}.pV4Vtb{font-size:14px;margin-bottom:8px;min-height:16px}.aaHIye{height:16px;margin-right:8px;vertical-align:-2px}.wVclb{color:#3c4043;letter-spacing:.025em;font-family:Roboto,Arial,sans-serif;font-size:.75rem;font-weight:400;line-height:1rem;margin:4px 0}.XE8Cy{border:1px solid #dadce0;border-radius:18px;color:#174ea6;display:flex;fill:#174ea6;font-size:14px;height:36px;padding:0 8px;text-align:center}.WfG1e{height:20px;margin:auto 0;width:20px}.CiRsRe{margin:auto}.NMm5M{fill:currentColor;flex-shrink:0}html[dir="rtl"] .hhikbc{transform:scaleX(-1)}.EmVfjc{display:inline-block;position:relative;width:28px;height:28px}.Cg7hO{position:absolute;width:0;height:0;overflow:hidden}.xu46lf{width:100%;height:100%}.EmVfjc.qs41qe .xu46lf{animation:spinner-container-rotate 1568ms linear infinite}.ir3uv{position:absolute;width:100%;height:100%;opacity:0}.uWlRce{border-color:#4285f4}.GFoASc{border-color:#db4437}.WpeOqd{border-color:#f4b400}.rHV3jf{border-color:#0f9d58}.EmVfjc.qs41qe .ir3uv.uWlRce{animation:spinner-fill-unfill-rotate 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both,spinner-blue-fade-in-out 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both}.EmVfjc.qs41qe .ir3uv.GFoASc{animation:spinner-fill-unfill-rotate 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both,spinner-red-fade-in-out 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both}.EmVfjc.qs41qe .ir3uv.WpeOqd{animation:spinner-fill-unfill-rotate 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both,spinner-yellow-fade-in-out 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both}.EmVfjc.qs41qe .ir3uv.rHV3jf{animation:spinner-fill-unfill-rotate 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both,spinner-green-fade-in-out 5332ms cubic-bezier(0.4,0.0,0.2,1) infinite both}.HBnAAc{position:absolute;box-sizing:border-box;top:0;left:45%;width:10%;height:100%;overflow:hidden;border-color:inherit}.HBnAAc .X6jHbb{width:1000%;left:-450%}.xq3j6{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden;border-color:inherit}.xq3j6 .X6jHbb{width:200%}.X6jHbb{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box;height:100%;border-width:3px;border-style:solid;border-color:inherit;border-bottom-color:transparent;border-radius:50%;animation:none}.xq3j6.ERcjC .X6jHbb{border-right-color:transparent;transform:rotate(129deg)}.xq3j6.dj3yTd .X6jHbb{left:-100%;border-left-color:transparent;transform:rotate(-129deg)}.EmVfjc.qs41qe .xq3j6.ERcjC .X6jHbb{animation:spinner-left-spin 1333ms cubic-bezier(0.4,0.0,0.2,1) infinite both}.EmVfjc.qs41qe .xq3j6.dj3yTd .X6jHbb{animation:spinner-right-spin 1333ms cubic-bezier(0.4,0.0,0.2,1) infinite both}.EmVfjc.sf4e6b .xu46lf{animation:spinner-container-rotate 1568ms linear infinite,spinner-fade-out 400ms cubic-bezier(0.4,0.0,0.2,1)}@keyframes spinner-container-rotate{to{transform:rotate(360deg)}}@keyframes spinner-fill-unfill-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}to{transform:rotate(1080deg)}}@keyframes spinner-blue-fade-in-out{0%{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes spinner-red-fade-in-out{0%{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}}@keyframes spinner-yellow-fade-in-out{0%{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}}@keyframes spinner-green-fade-in-out{0%{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes spinner-left-spin{0%{transform:rotate(130deg)}50%{transform:rotate(-5deg)}to{transform:rotate(130deg)}}@keyframes spinner-right-spin{0%{transform:rotate(-130deg)}50%{transform:rotate(5deg)}to{transform:rotate(-130deg)}}@keyframes spinner-fade-out{0%{opacity:.99}to{opacity:0}}.ysfX7e{position:relative}.I5Zqqd{max-height:500px;overflow:auto}.SAGQRd{letter-spacing:.01428571em;font-family:Roboto,Arial,sans-serif;font-size:.875rem;font-weight:400;line-height:1.25rem;border-radius:4px;border-top:none;box-sizing:border-box;overflow-x:auto;text-decoration:inherit;text-overflow:ellipsis;min-width:100%;-webkit-overflow-scrolling:touch;border-collapse:collapse;border-spacing:0}.A5V3jc{border-top:1px solid #dadce0;position:relative;margin-right:16px}.XIdrjc .A5V3jc{border:none}.qEfTDe .A5V3jc:last-child{border-bottom:1px solid #dadce0}.aiByXc,.uMsnNd{text-align:left;white-space:nowrap}.A5V3jc .aiByXc:first-child,.A5V3jc .uMsnNd:first-child{padding-left:0}.aiByXc{background-color:#fff;color:#5f6368;letter-spacing:.025em;font-family:Roboto,Arial,sans-serif;font-size:.75rem;font-weight:400;line-height:1rem;min-width:100%;padding:12px 16px;position:sticky;top:-2px;z-index:1}.uMsnNd{color:#202124;padding:8px 16px}.HAChlc{text-align:right}.uMsnNd.BL0BWd{display:flex;white-space:normal;align-items:center;min-width:174px}.aiByXc.HAChlc .DdCLrb{margin-left:auto}.Ceukx{display:flex;align-items:center}.DEnX2{display:inline;max-height:20px;min-height:20px;margin-right:8px;max-width:20px;min-width:20px;vertical-align:middle}.YatLgf{padding-left:28px}.WbQsab{background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);display:none;height:100%;right:0;position:absolute;top:0;width:36px}@media (max-width:1200px){.aiByXc{white-space:break-spaces}}@media (max-width:800px){.A5V3jc .aiByXc:last-child,.A5V3jc .uMsnNd:last-child{padding-right:26px}.WbQsab{display:block}}.mQTbyb{max-width:1016px}.M3glYe{color:#5f6368;margin-bottom:1.25rem;letter-spacing:.025em;font-family:Roboto,Arial,sans-serif;font-size:.75rem;font-weight:400;line-height:1rem}.hZYlS{margin:32px}.hZYlS:first-child{margin-left:0}.VOxXkf{margin:32px 0}.l7w6lf{display:flex}.Vl4nhc{margin-right:0}.pwU6hd{display:none}@media (max-width:54.5rem){.mQTbyb,.VOxXkf{margin:0}.l7w6lf{display:block}.hZYlS{margin:0}.l956k{display:none}.pwU6hd{display:block}}@media (max-width:54.5rem){.VxN2Zc{display:none}}.reqYuf{box-pack:center;-webkit-box-pack:center;justify-content:center;display:flex}.reqYuf .SyRAoc,.reqYuf .SyRAoc:visited{letter-spacing:.025em;font-family:Roboto,Arial,sans-serif;font-size:.75rem;font-weight:400;line-height:1rem;color:#5f6368;margin:0 8px;text-decoration:none}.n184zd{display:flex;box-pack:space-evenly;-webkit-box-pack:space-evenly;justify-content:space-evenly}.reqYuf .SyRAoc:focus,.reqYuf .SyRAoc:hover{color:#202124;outline:none;cursor:pointer;text-decoration:underline}.VxN2Zc{letter-spacing:.025em;font-family:Roboto,Arial,sans-serif;font-size:.75rem;font-weight:400;line-height:1rem;bottom:0;color:#5f6368;position:fixed;right:0}.nJnAMd{font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:2rem;font-weight:400;letter-spacing:0;line-height:2.5rem;max-width:44.6875rem}@media (max-width:54.5rem){.nJnAMd{margin:16px 0}}.b3t6we{display:flex;flex-direction:column;height:100%;padding:0 4rem;overflow:auto}.Umm3m{background-color:#fff}.yQOtse{box-pack:center;-webkit-box-pack:center;justify-content:center;display:flex}.nHiRk{box-pack:center;-webkit-box-pack:center;justify-content:center;display:flex;padding:1.5rem}@media (max-width:54.5rem){.b3t6we{margin:0;padding:0 24px}}.zQTmif{height:100%}.MCcOAc{display:flex;flex-direction:column}c-wiz{contain:style}c-wiz>c-data{display:none}c-wiz.rETSD{contain:none}c-wiz.Ubi8Z{contain:layout style}.SSPGKf{position:relative;min-height:100%}.zQTmif{height:auto}.SSPGKf.BIIBbc{height:100%;overflow:hidden}.T4LgNb{min-height:100%;height:auto;position:relative}.T4LgNb.eejsDc{min-height:100%;overflow-y:hidden;-webkit-overflow-scrolling:auto}.VjFXz{height:56px}@media (min-width:600px){.VjFXz{height:64px}}#gb{position:fixed;left:0;right:0}.uirfo #gb{position:relative}.uirfo .VjFXz{height:0}.uirfo .SSPGKf{min-height:calc(100vh - 56px);height:auto}@media (min-width:600px){.uirfo .SSPGKf{min-height:calc(100vh - 64px);height:auto}}.wSkcYd{margin:1.5rem 0}.Hoy7ve{align-items:center;cursor:pointer;display:flex;letter-spacing:.01785714em;font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:.875rem;font-weight:500;line-height:1.25rem;padding:.75rem;padding-left:1.5rem;margin:.75rem 0}.Hoy7ve:hover,.Hoy7ve:focus{background-color:#e8eaed;outline:none}sentinel{}

*/

/*# sourceURL=/_/mss/boq-social-good/_/ss/k=boq-social-good.CoronavirusUi.Sb3Ur8r1dE0.L.B1.O/am=Uw/d=1/ed=1/ct=zgms/rs=AOJrCzvIz-4cUl6_YrcPe_EgPzVBN6OxRw/m=coronavirusview,_b,_tp */



