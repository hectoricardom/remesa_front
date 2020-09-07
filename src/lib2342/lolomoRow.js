import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {getThumbnail} from '../actions/common'


import Icons from './Icons'
import WithScroll from './scroll-decorator'

import CarouselHRM from './slidesHRM';

import TitleCardHRM from './bobItem2'

import LoadingLowRow from './loadingSlider'





const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const observeImage =  useSelector(state => state.observeImage);
  const _state=  useSelector(state => state);    

  const dispatch = useDispatch();

  const _getThumbnail = (url) => {
    getThumbnail(url,_state,dispatch);
  }
  
  return { observeChanges, _getThumbnail, _state }
}



const LolomoRow = (props) => {



  const {  
    _state
  } = useObserveChanges();


  const seeDetails = () => {
    props.updTitleView();

  }
  

  const {
    keyCode,
    title,
    data,
    hoverEffect,
    isVisile,
    slideHeight,
    nonSlide
  } = props;

  const [initialize, setInitialize] = useState(false);

  const [view, setView] = useState(0);


  useEffect(() => {
    if(!initialize){
      setInitialize(true);
      setTimeout(()=>{
        setView(1);
      },250)
     
    }
  });
  





let _list = _Util.ObjectKeys(data);

const goTitleDetails = (d) => { 
  if(typeof props.goTitleDetails === "function"){
    props.goTitleDetails(d)
  }
} 
/*
if(isVisile){
  console.log(keyCode)
}
**/
  return(
    <>
      {isVisile?  
      <div className={`lolomoRow lolomoRow_title_card`} >   
        
        <div className={`_sectionWrp_ ${view && 'visible'}`}> 
          <h2 className="rowHeader">
            <a className="rowTitle" aria-label="tendencias">
              <div className="row-header-title">{title}</div>             
              <div className="aro-row-header">
                <div className="see-all-link">Explorar todos</div>
                <div className="aro-row-chevron icon-akiraCaretRight"></div>
              </div>
            </a>
          </h2>
          
          <div className={`rowContainer  ${view && 'visible'}`} id={`${keyCode}_rowContainer`}>
            <div className={'_dsplFlx rowContent'}>
            
             <CarouselHRM  keyCode={keyCode} hoverEffect={hoverEffect} nonSlide={nonSlide}>
              {
              _list &&  _list.map(ts=>{ 
                  let mv   = data[ts];                  
                  return <TitleCardHRM ts={ts+1} key={_Util.gen12CodeId()}  _item={mv} updTitleView={()=>goTitleDetails(ts)}  />
                })
              }
              </CarouselHRM>
             
            </div>
          </div>
          
        </div>
         
      </div>
      :
         <LoadingLowRow height={slideHeight}/>
         }
    </>
  )


}





export default LolomoRow



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