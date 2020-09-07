import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../lib/Util'
import IconSVG from './Icons'

import RippleHRM from './RippleHRM'

import ResizeParentObserve from './resizeParentObserve'



const TabIndicator = (setWidthList) => {

  var els = document.querySelectorAll('[data-item]'); 
  var listTabH = [],sumTH = 0;
  for(var ss =0;ss<els.length;ss++){
    var hh =els[ss].getBoundingClientRect().width;
    if(hh<200){
      listTabH.push({l:sumTH,w:hh});
      sumTH+=hh; 
    }     
  }
  setWidthList(listTabH);

}


const UpdateIndex = (i, setIndex, setWidthList, props) => {
  setIndex(i);
  TabIndicator(setWidthList);
  if(typeof props.UpdateIndex === "function" ){
    props.UpdateIndex(i);
  }


}



/*

 <Link to={{ pathname: `/${pth}`,search:`?tb=${tbI}` }} className={activeClass} key={`${tbI}---${i}`}>                                  
              </Link>   

              
*/

const TabsHRM = (props) => {
  
  const { index, setIndex } = useState();
  const { widthList, setWidthList } = useState();

  var indcatorSize = widthList?widthList[index]:null;
  var tabIndicator = {width: `0px`, left: `0px`};
  if(indcatorSize){
    tabIndicator = {width: `${indcatorSize.w}px`, left: `${indcatorSize.l}px`}
  }   
  return (
    <div className="c-tabs-nav " data-active-item="1" data-default-key="0" data-c-tabs-nav="" data-ca-category="device-tray">
      <div className="center_Tab_Nav_Items" role="tablist">
        <ResizeParentObserve sizehandler={()=>TabIndicator(setWidthList)}/>
        { data.map((tbI,i)=>{   
            var color = 'var(--tab--nav-Color--)';
            var activeClass = 'center_Tab_Nav_Item';
            if(index===i){
              color = 'var(--color-base--hover)';
              activeClass = 'center_Tab_Nav_Item is-active';
            }     
            var tlr =`/${pth}`;                                   
            return(   
                <div className={activeClass} key={`${tbI}---${i}`}>
                  <div  data-item={i} className="presentation" onClick={()=>UpdateIndex(i, setIndex,setWidthList, props)} key={i}>
                    <RippleHRM/>     
                    <a className="center_Tab_Nav_Link" role="tab"  data-tab-index={i}>                        
                      {_Util.translateTxt(tbI)}
                    </a>
                  </div>
                </div>
            )
          })
        }                         
      </div>
      <span id="header-tabs-nav__indicator" className="c-tabs-nav__indicator" style={tabIndicator}></span>
    </div> 
  )
}

export default TabsHRM








const txt_styles = `

.fieldPadding{
  padding: 15px 6px 7px;
}

._separateBtn{
  margin-left: 16px;
}

.V639qd.J9Nfi .R6Lfte {
  letter-spacing: .00625em;
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
}


.oEOLpc .R6Lfte {
  padding-bottom: 0;
}
.tOrNgd {
  padding: 22px 24px 18px 24px;
}

.x1LMef {
  color: rgba(0,0,0,0.54);
  font: 400 1rem/1.5rem Roboto,Arial,sans-serif;
  line-height: 24px;
}



.dialogsdfa{
background-color: #fff; 
padding: 25px;
min-height:65px;  
}
.dialogsdfa p{
margin: 5px;
color: firebrick; 
}

.V639qd.J9Nfi {
border-radius: 8px;
min-width: 280px;
}






.A9Uzve {
  max-width: 100vw;
  overflow: visible;
  position: absolute;
  width: 320px;
}
.g3VIld {
  -webkit-box-align: stretch;
  box-align: stretch;
  align-items: stretch;
  display: flex;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  flex-direction: column;
  transition: transform .225s cubic-bezier(0.0,0.0,0.2,1);
  position: relative;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24);
  max-width: 24em;
  outline: 1px solid transparent;
  overflow: hidden;
}


.XfpsVe {
flex-wrap: wrap-reverse;
}

.V639qd .XfpsVe {
  padding: 24px 16px 16px 16px;
}

.XfpsVe {
  display: flex;
  flex-shrink: 0;
  box-pack: end;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding: 24px 24px 16px 24px;
}


.VfPpkd-LgbsSe .VfPpkd-Jh9lGc::before, .VfPpkd-LgbsSe .VfPpkd-Jh9lGc::after {
top: calc(50% - 100%);
left: calc(50% - 100%);
width: 200%;
height: 200%;
}

`