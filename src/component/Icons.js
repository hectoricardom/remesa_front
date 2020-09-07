import React, { useEffect, useState } from 'react'
import * as _Util from '../store/Util';






export function IconSymbol(props) {
  /*let ssv = _Util.getSvgSymbols();
  if(!ssv && window.HrmConfig){
    let getStaticUrl = window.HrmConfig["url"]+"/getStatic/";
    _Util.fetchSVGSymbols(getStaticUrl);
  }
  */
  //  <svg style={{height: 0, width: 0, display: "block"}} dangerouslySetInnerHTML={{ __html: "ssv" }} />
  return(
    <></>
   
  )
}



// 16 87 99 A6


const HandleMouseEnter = (e, hover, setHover, setTooltip, setDmz, Id) => {
  // let tt2 = e.target;

  if(!hover){

    let tt = document.getElementById(Id);
    
 
    let dmz = tt && tt.getBoundingClientRect();
    setDmz(dmz);

    setHover(true)
    setTimeout(()=>{
      setTooltip(true)
    },350)
  }
}






export function Icon2(props) {
  let _name = props.name;
  let initV = false;
  const [iconId] = useState(_Util.gen12CodeId());

  const [hover,setHover] = useState(initV);
  const [dmz,setDmz] = useState({});

  const _dList = _Util.getSvgSymbols();
  const _d = _dList && _dList[_name];
  const [tooltip,setTooltip] = useState(initV);

  //const  svgPath = _name && IconsList[_name]?IconsList[_name]:null;  
  let sZ = props.size?props.size:24;
  let _color =  props.color?props.color:'#5c5c5c' ;
  let _iconStyle_ =  IconStyles(iconId);

  
  let _tooltip =  props.tooltip?props.tooltip:null;
  
  let _tootlip_style =  dmz && {
    top: dmz.top + dmz.height + 4,
    left: dmz.left
  }

  let kW = `--width_${iconId}_`
  var _sty={
    [kW]:sZ
  }


  return (
        <svg className={`_Icons_${iconId}_`} fill={_color} height={sZ} viewBox="0 0 24 24" width={sZ} >
          <path d={_d?_d:''}/>
        </svg>
    )
}






export default function IconSVG(props) {
  let _name = props.name;
  let initV = false;
  const [iconId] = useState(_Util.gen12CodeId());

  const [hover,setHover] = useState(initV);
  const [dmz,setDmz] = useState({});

  const _dList = _Util.getSvgSymbols();
  const _d = _dList && _dList[_name];
  const [tooltip,setTooltip] = useState(initV);

  //const  svgPath = _name && IconsList[_name]?IconsList[_name]:null;  
  let sZ = props.size?props.size:24;
  let _color =  props.color?props.color:'#5c5c5c' ;
  let _iconStyle_ =  IconStyles(iconId);

  
  let _tooltip =  props.tooltip?props.tooltip:null;
  
  let _tootlip_style =  dmz && {
    top: dmz.top + dmz.height + 4,
    left: dmz.left
  }

  let kW = `--width_${iconId}_`
  var _sty={
    [kW]:sZ
  }


  return (
      <span className={`_XW471s_  ${hover && tooltip?`_show_tooltip_${iconId}_`:''} `} id={`${iconId}`} >
      <style>
        {_iconStyle_}
      </style>
      <div 
      className={` _${iconId}_  ${hover?'_hover_':''}   ${props.ripple?`_WRppl8_${iconId}_`:''} ${props["noStyle"]?"":`_XWc5CgcHaQDbRpl_${iconId}_`}  ${tooltip?`_show_tooltip_${iconId}_`:''}   ${props.extraClass?props.extraClass:''}`} 
        style={_sty}
        onMouseEnter={(e)=> HandleMouseEnter(e,hover, setHover,setTooltip,setDmz,iconId)} 
        onMouseLeave={(e)=>{
         
          setHover(false);
          setTooltip(false)
          
        }
        }
      >
        
        <svg className={`_Icons_${iconId}_`} fill={_color} height={sZ} viewBox="0 0 24 24" width={sZ} >
          <path d={_d?_d:''}/>
          {/*<use filter="" xlinkHref={`#${_name}`}></use> */}
        </svg>
      

      </div>
      <div className={`tooltip`} style={_tootlip_style}>
      {hover && _tooltip && 
        <span>
          {_tooltip}
        </span>
      }
      </div>
      </span>
    )
  
  
}


const IconsList = {}



function IconStyles(iconId) {

return  `


._XW471s_{
  position : relative;
}

._${iconId}_{
  position : relative;
}

._XWc5CgcHaQDbRpl_${iconId}_ {
  height: var(--width_${iconId}_);
  width:  var(--width_${iconId}_);  
  align-items: center;
  border: none;
  display: inline-flex;
  justify-content: center;
  outline: none;
  position: relative;
  z-index: 6;
  cursor: pointer;
  list-style: none;
  margin: 5px 10px 5px;
  outline: none;
}


._WRppl8_${iconId}_._XWc5CgcHaQDbRpl_${iconId}_ {
  opacity: 0.55;
}


._XWc5CgcHaQDbRpl_${iconId}_:not(.pW)::before {
  content: '';
  display: block;
  opacity: 0;
  position: absolute;
  transition-duration: .15s;
  transition-timing-function: cubic-bezier(0.4,0.0,0.2,1);
  z-index: -1;
  bottom: -10px;
  left: -10px;
  right: -10px;
  top: -10px;
  background: none;
  border-radius: 50%;
  box-sizing: border-box;
  transform: scale(0);
  transition-property: transform,opacity;
  bottom: -10px;
  left: -10px;
  right: -10px;
  top: -10px;
}

._XWc5CgcHaQDbRpl_${iconId}_:not(.pW):after {
  content: '';
  height: 200%;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
}

._XWc5CgcHaQDbRpl_${iconId}_._WRppl8_${iconId}_:hover svg {
  opacity: 1;
}

._XWc5CgcHaQDbRpl_${iconId}_._WRppl8_${iconId}_:not(.pW):hover::before {  
  background-color: rgba(32,33,36,0.059);
  border: none;
  box-shadow: none;
  opacity: 1;
  transform: scale(1);
}


._XWc5CgcHaQDbRpl_${iconId}_:not(.pW):after {
  content: '';
  height: 200%;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
}





._XWc5CgcHaQDbRpl_${iconId}_._hover_{   
  opacity: 1;
} 

.view._XWc5CgcHaQDbRpl_${iconId}_._hover_ svg{  
  fill: var(--color-base--hover, #00838f);
} 

.edit._XWc5CgcHaQDbRpl_${iconId}_._hover_ svg{  
  fill: var(--color-base--hover, #1a38e8);
} 

.delete._XWc5CgcHaQDbRpl_${iconId}_._hover_ svg{
  fill: #ea4335;
} 


.gray._XWc5CgcHaQDbRpl_${iconId}_._hover_ svg{
  fill: #6d6d60;
} 

._Icons_${iconId}_ {
  z-index: 4;
}






_${iconId}_  ~ .tooltip{
  -webkit-font-smoothing: antialiased;
  border: none;
  opacity: 0;
  overflow: auto;
  display:none;
  z-index: 47;
  position : absolute;
  max-height:0px;
  -webkit-transition: max-width 1s, opacity 1s, -webkit-transform 750ms;
  transition: max-width 1s, opacity 1s, -webkit-transform 750ms;
  -o-transition: max-width 1s, opacity 1s, -o-transform 750ms;
  -moz-transition: max-width 1s, opacity 1s, transform 750ms, -moz-transform 750ms;
  transition: max-width 1s, opacity 1s, transform 750ms;
}


._show_tooltip_${iconId}_ .tooltip{
  opacity: 1;
  transition-delay: 120ms;
  position: absolute;
  max-height:30px;
  height:30px;
  margin-top: 4px;
  top :5px;  
  display:block;
}

.tooltip span{
  background: rgba(0,0,0,0.63);
  padding: 5px 7px; 
  color: #fff;
  border-radius: 7px;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .69rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  -webkit-transition: opacity 1s, -webkit-transform 750ms;
  transition:  opacity 1s, -webkit-transform 750ms;
  -o-transition:  opacity 1s, -o-transform 750ms;
  -moz-transition: opacity 1s, transform 750ms, -moz-transform 750ms;
  transition:  opacity 1s, transform 750ms;
  transform: scale(0.005);
  opacity:0
}


._show_tooltip_${iconId}_ 
.tooltip span{
  opacity:1;
  transform: scale(1.5);
}





`
}




  /*
  
    formFill: `<g> 
   <path d="M12 1.5h10.5L21 3v7.5h-7.5L12 12V1.5zm4.345 8.002l4.487-4.487-1.26-1.265-3.227 3.227-1.527-1.522-1.26 1.26 2.787 2.787zM2.25 13.5v8.25l1.5-1.5 5.25.002V15l1.5-1.5H2.25zM9 20.25H3.75V15H9v5.25z"></path><path d="M2.25 21.75h8.25L9 20.25H3.75z" fill-opacity=".8"></path><path d="M9 15v5.25l1.5 1.5V13.5z" fill-opacity=".6"></path><path d="M12 13.5v8.25l1.5-1.5 5.25.002V15l1.5-1.5H12zm6.75 6.75H13.5V15h5.25v5.25z"></path><path d="M12 21.75h8.25l-1.5-1.5H13.5z" fill-opacity=".8"></path><path d="M18.75 15v5.25l1.5 1.5V13.5zM12 12h10.5L21 10.5h-7.5z" fill-opacity=".6"></path><path d="M21 3v7.5l1.5 1.5V1.5z" fill-opacity=".8"></path><path d="M2.25 3.75V12l1.5-1.5 5.25.002V5.25l1.5-1.5H2.25zM9 10.5H3.75V5.25H9v5.25z"></path><path d="M2.25 12h8.25L9 10.5H3.75z" fill-opacity=".8"></path><path d="M9 5.25v5.25l1.5 1.5V3.75z" fill-opacity=".6"></path>
  
  </g>`,
  
  
  g_vision:` <g transform="translate(1 3)"> 
  <path d="M4.4 8.8l6.6 4.95v3.85L0 8.8zm6.6 4.95l6.6-4.95H22l-11 8.8z" opacity=".8"></path><path d="M0 8.8L11 0v3.85L4.4 8.8zm11-4.95l6.6 4.95H22L11 0z"></path><circle cx="11" cy="8.8" opacity=".6" r="2.2"></circle></g>`,
  receipt:"M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>
  
  </g>`,
  
  //  camera:`<g><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z",
    
  //  info:`<g><circle cx="12" cy="19" r="2"/><path d="M10 3h4v12h-4z",
  // "addKid":`<g fill-rule="evenodd" clip-rule="evenodd"> <path d="M9 17l3-2.94c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-3-3zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4"/><path d="M20 15v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2"/></g>`,
    
	
    category:"M12 2l-5.5 9h11z"/><circle cx="17.5" cy="17.5" r="4.5"/>"M3 13.5h8v8H3z"/><path fill="none" d="M0 0h24v24H0z",

"timer":"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z",
    
    bubbles:`<g><path fill="none" d="M0 0h24v24H0z"/>  <circle cx="7.2" cy="14.4" r="3.2"/><circle cx="14.8" cy="18" r="2"/><circle cx="15.2" cy="8.8" r="4.8",

	kid:<circle cx="14.5" cy="10.5" r="1.25"/><circle cx="9.5" cy="10.5" r="1.25"/>"M22.94 12.66c.04-.21.06-.43.06-.66s-.02-.45-.06-.66c-.25-1.51-1.36-2.74-2.81-3.17-.53-1.12-1.28-2.1-2.19-2.91C16.36 3.85 14.28 3 12 3s-4.36.85-5.94 2.26c-.92.81-1.67 1.8-2.19 2.91-1.45.43-2.56 1.65-2.81 3.17-.04.21-.06.43-.06.66s.02.45.06.66c.25 1.51 1.36 2.74 2.81 3.17.52 1.11 1.27 2.09 2.17 2.89C7.62 20.14 9.71 21 12 21s4.38-.86 5.97-2.28c.9-.8 1.65-1.79 2.17-2.89 1.44-.43 2.55-1.65 2.8-3.17zM19 14c-.1 0-.19-.02-.29-.03-.2.67-.49 1.29-.86 1.86C16.6 17.74 14.45 19 12 19s-4.6-1.26-5.85-3.17c-.37-.57-.66-1.19-.86-1.86-.1.01-.19.03-.29.03-1.1 0-2-.9-2-2s.9-2 2-2c.1 0 .19.02.29.03.2-.67.49-1.29.86-1.86C7.4 6.26 9.55 5 12 5s4.6 1.26 5.85 3.17c.37.57.66 1.19.86 1.86.1-.01.19-.03.29-.03 1.1 0 2 .9 2 2s-.9 2-2 2zM7.5 14c.76 1.77 2.49 3 4.5 3s3.74-1.23 4.5-3h-9z",
    
  */
  






  /*
  
  <svg id="top-10-badge" viewBox="0 0 28 30">
        <path d="M0,0 L28,0 L28,30 L0,30 L0,0 Z M2,2 L2,28 L26,28 L26,2 L2,2 Z" fill="#FFFFFF"></path>
        <path d="M16.8211527,22.1690594 C17.4133103,22.1690594 17.8777709,21.8857503 18.2145345,21.3197261 C18.5512982,20.7531079 18.719977,19.9572291 18.719977,18.9309018 C18.719977,17.9045745 18.5512982,17.1081018 18.2145345,16.5414836 C17.8777709,15.9754594 17.4133103,15.6921503 16.8211527,15.6921503 C16.2289952,15.6921503 15.7645345,15.9754594 15.427177,16.5414836 C15.0904133,17.1081018 14.9223285,17.9045745 14.9223285,18.9309018 C14.9223285,19.9572291 15.0904133,20.7531079 15.427177,21.3197261 C15.7645345,21.8857503 16.2289952,22.1690594 16.8211527,22.1690594 M16.8211527,24.0708533 C15.9872618,24.0708533 15.2579042,23.8605988 14.6324861,23.4406836 C14.0076618,23.0207685 13.5247891,22.4262352 13.1856497,21.6564897 C12.8465103,20.8867442 12.6766436,19.9786109 12.6766436,18.9309018 C12.6766436,17.8921018 12.8465103,16.9857503 13.1856497,16.2118473 C13.5247891,15.4379442 14.0076618,14.8410352 14.6324861,14.4205261 C15.2579042,14.0006109 15.9872618,13.7903564 16.8211527,13.7903564 C17.6544497,13.7903564 18.3844012,14.0006109 19.0098194,14.4205261 C19.6352376,14.8410352 20.1169224,15.4379442 20.4566558,16.2118473 C20.7952012,16.9857503 20.9656618,17.8921018 20.9656618,18.9309018 C20.9656618,19.9786109 20.7952012,20.8867442 20.4566558,21.6564897 C20.1169224,22.4262352 19.6352376,23.0207685 19.0098194,23.4406836 C18.3844012,23.8605988 17.6544497,24.0708533 16.8211527,24.0708533" fill="#FFFFFF"></path>
        <polygon fill="#FFFFFF" points="8.86676 23.9094206 8.86676 16.6651418 6.88122061 17.1783055 6.88122061 14.9266812 11.0750267 13.8558085 11.0750267 23.9094206"></polygon>
        <path d="M20.0388194,9.42258545 L20.8085648,9.42258545 C21.1886861,9.42258545 21.4642739,9.34834303 21.6353285,9.19926424 C21.806383,9.05077939 21.8919103,8.83993091 21.8919103,8.56731273 C21.8919103,8.30122788 21.806383,8.09572485 21.6353285,7.94961576 C21.4642739,7.80410061 21.1886861,7.73104606 20.8085648,7.73104606 L20.0388194,7.73104606 L20.0388194,9.42258545 Z M18.2332436,12.8341733 L18.2332436,6.22006424 L21.0936558,6.22006424 C21.6323588,6.22006424 22.0974133,6.31806424 22.4906012,6.51465818 C22.8831952,6.71125212 23.1872921,6.98684 23.4028921,7.34142182 C23.6178982,7.69659758 23.7259952,8.10522788 23.7259952,8.56731273 C23.7259952,9.04246424 23.6178982,9.45762788 23.4028921,9.8122097 C23.1872921,10.1667915 22.8831952,10.4429733 22.4906012,10.6389733 C22.0974133,10.8355673 21.6323588,10.9335673 21.0936558,10.9335673 L20.0388194,10.9335673 L20.0388194,12.8341733 L18.2332436,12.8341733 Z" fill="#FFFFFF"></path>
        <path d="M14.0706788,11.3992752 C14.3937818,11.3992752 14.6770909,11.322063 14.9212,11.1664509 C15.1653091,11.0114327 15.3553697,10.792863 15.4913818,10.5107418 C15.6279879,10.2286206 15.695697,9.90136 15.695697,9.52717818 C15.695697,9.1535903 15.6279879,8.82573576 15.4913818,8.54361455 C15.3553697,8.26149333 15.1653091,8.04351758 14.9212,7.88790545 C14.6770909,7.73288727 14.3937818,7.65508121 14.0706788,7.65508121 C13.7475758,7.65508121 13.4642667,7.73288727 13.2201576,7.88790545 C12.9760485,8.04351758 12.7859879,8.26149333 12.6499758,8.54361455 C12.5139636,8.82573576 12.4456606,9.1535903 12.4456606,9.52717818 C12.4456606,9.90136 12.5139636,10.2286206 12.6499758,10.5107418 C12.7859879,10.792863 12.9760485,11.0114327 13.2201576,11.1664509 C13.4642667,11.322063 13.7475758,11.3992752 14.0706788,11.3992752 M14.0706788,12.9957842 C13.5634545,12.9957842 13.0995879,12.9090691 12.6784848,12.7344509 C12.2573818,12.5604267 11.8915152,12.3163176 11.5808848,12.0027176 C11.2708485,11.6891176 11.0314909,11.322063 10.8634061,10.9003661 C10.6953212,10.479263 10.6115758,10.0213358 10.6115758,9.52717818 C10.6115758,9.03302061 10.6953212,8.57568727 10.8634061,8.1539903 C11.0314909,7.73288727 11.2708485,7.36523879 11.5808848,7.05163879 C11.8915152,6.73803879 12.2573818,6.49452364 12.6784848,6.31990545 C13.0995879,6.14588121 13.5634545,6.05857212 14.0706788,6.05857212 C14.577903,6.05857212 15.0417697,6.14588121 15.4628727,6.31990545 C15.8839758,6.49452364 16.2498424,6.73803879 16.5604727,7.05163879 C16.871103,7.36523879 17.1098667,7.73288727 17.2779515,8.1539903 C17.4460364,8.57568727 17.5297818,9.03302061 17.5297818,9.52717818 C17.5297818,10.0213358 17.4460364,10.479263 17.2779515,10.9003661 C17.1098667,11.322063 16.871103,11.6891176 16.5604727,12.0027176 C16.2498424,12.3163176 15.8839758,12.5604267 15.4628727,12.7344509 C15.0417697,12.9090691 14.577903,12.9957842 14.0706788,12.9957842" fill="#FFFFFF"></path>
        <polygon fill="#FFFFFF" points="8.4639503 12.8342327 6.65837455 13.2666206 6.65837455 7.77862061 4.65323515 7.77862061 4.65323515 6.22012364 10.4690897 6.22012364 10.4690897 7.77862061 8.4639503 7.77862061"></polygon>
    </svg>


    <svg id="audio-description" viewBox="0 0 58.07 24">    
      <path fill="currentColor" d="M18.34,10.7v7.62l-4.73,0ZM.5,26.6h8l2.17-3,7.49,0s0,2.08,0,3.06h5.7V2.77H17C16.3,3.79.5,26.6.5,26.6Z" transform="translate(-0.5 -2.62)"></path>
      <path fill="currentColor" d="M30.63,8.91c3.6-.13,6.1,1.8,6.48,4.9.5,4.15-2.43,6.85-6.66,6.56V9.19A.26.26,0,0,1,30.63,8.91ZM25,3V26.56c5.78.11,10.22.32,13.49-1.85a12.2,12.2,0,0,0,5.14-11.36A11.52,11.52,0,0,0,33.38,2.72c-2.76-.23-8.25,0-8.25,0A.66.66,0,0,0,25,3Z" transform="translate(-0.5 -2.62)"></path>
      <path fill="currentColor" d="M43.72,3.43c1.45-.4,1.88,1.2,2.51,2.31a18.73,18.73,0,0,1-1.42,20.6h-.92a1.86,1.86,0,0,1,.42-1.11,21.39,21.39,0,0,0,2.76-10.16A22.54,22.54,0,0,0,43.72,3.43Z" transform="translate(-0.5 -2.62)"></path>
      <path fill="currentColor" d="M48.66,3.43c1.43-.4,1.87,1.2,2.5,2.31a18.83,18.83,0,0,1-1.42,20.6h-.91c-.07-.42.24-.79.41-1.11A21.39,21.39,0,0,0,52,15.07,22.63,22.63,0,0,0,48.66,3.43Z" transform="translate(-0.5 -2.62)"></path>
      <path fill="currentColor" d="M53.57,3.43c1.46-.4,1.9,1.2,2.54,2.31a18.58,18.58,0,0,1-1.44,20.6h-.93c-.07-.42.24-.79.42-1.11A21,21,0,0,0,57,15.07,22.26,22.26,0,0,0,53.57,3.43Z" transform="translate(-0.5 -2.62)"></path>
    </svg>

  */