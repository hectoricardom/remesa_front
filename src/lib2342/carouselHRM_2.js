import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import Icons from './Icons'
import {getThumbnail} from '../actions/common'

import BTN_f from './btns_confirm'

import WithScroll from './scroll-decorator'



const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const _state=  useSelector(state => state);    

  const dispatch = useDispatch();
  
  return { observeChanges, _state }
}


const _gT = () => {
   return (new Date()).getTime();
}


const CarouselHRM = (props) => {
  const { _state, observeChanges } = useObserveChanges();
  const {
    keys,
    outerWidth   

  } = _state;

  const {      
      keyCode
   } = props;      
   
   

   let tabs = 6;
   if(outerWidth>=1400){
      tabs = 6;
   }
   else if(outerWidth>=1100){
      tabs = 5;
   }
   else if(outerWidth>=800){
      tabs = 4;
   }
   else if(outerWidth>=500){
      tabs = 3;
   }else{
      tabs = 2;
   }

   const [initialized, setInitialized] = useState(false);

   let elements = React.Children.toArray(props.children)

  
   let slidesItems = elements?elements.length:0;
   
   //console.log(elements)

   const [index, setIndex] = useState(0);

   const [view, setView] = useState({});
   const [dmz, setDmz] = useState(null);

   const [animating, setAnimating] = useState(null);
   const [animatingValue, setAnimatingValue] = useState(0);

   const [action, setAction] = useState(0);
   const [obs, setObs] = useState(0);

   const [timeInHover, setTimeInHover] = useState({});
   const [widthScreen, setWidthScreen] = useState(null);

   const [hoverCarousel, sethoverCarousel] = useState(null);

   let _index = index?index-1:0;



   if(!props.loop){
    
   }


   let range2Render2 = []

   
   var itemWidth = (100 / tabs)


   let translate3d = null;

   let XTranslate =  itemWidth *(tabs+1)*-1;

   if(props.loop){
      let total = slidesItems - 1;

      let start = initialized?_index-(tabs):0
      let end = initialized?_index+(tabs*2):(tabs*2)+1;

      for(var i = start;i<end;i++){
         let index2Rnd = null;
         if(i>total){
            index2Rnd = i - total;
         }
         else if(i<0){
            index2Rnd = total+i;
         }
         else {
            index2Rnd = i
         }
         range2Render2.push(index2Rnd);
      }
      
      // console.log(range2Render2)
      

      let XTranslateAnimating = (itemWidth* (tabs+1)*-1) +  (animating?animatingValue*1:0) 
     
      let _3XTranslate= animating?XTranslateAnimating:XTranslate;

      translate3d = initialized?`translate3d(${_3XTranslate}%, 0, 0)`:null;


   }else{


      let total = slidesItems - 1;

      //console.log({dd, action});
     
      let _start = 0;
      
      let _end  = _index+(tabs*2)+(_index>0?2:1);
      if(action===1){
         //console.log(_index,(tabs+1),_index-(tabs));
         if(_index-tabs>=0){
            _start = _index-(tabs+1);
         }else{
            _start = _index-(tabs+1);
         }
         _end = _end>total?total:_end;

         // let diff = total-(_index+tabs);  if(diff<tabs){};
        // console.log(_index,_start, _end);
         
      }
      if(action===2){

         let diff = total-_index;
         let start = _index>tabs?_index-tabs:0;
         _end = _end>total?total:_end;
         _start = start;
         if(diff<tabs){
            _start = total-(tabs*2);
         }
      }
      
      for(var i2 = _start;i2<=_end;i2++){
         let index2Rnd = i2;
         range2Render2.push(index2Rnd);   
      }

      
     
      let _3XTranslate= null;
      
     
      
      if(animating){
         if(action===1){
            console.log(_index,tabs,_index-tabs)
            if(_index-(tabs*2)>=0){
               let XTranslateAnimating = _index<tabs ? animatingValue*(_index>0?2:1) : XTranslate +  (animating?animatingValue*1:0);
               _3XTranslate= XTranslateAnimating;
            }else{
               _3XTranslate= index>0?-20:100;
            }

            
         }else if(action===2){
            let diff = slidesItems-(_index+tabs);
            let dd = diff>tabs?0:diff;
            let _2a = (((1/tabs)*dd)*-100);
            let dsdds = _2a -100;
            //console.log("animatingValue",diff, _2a,dsdds)
            let XTranslateAnimating = dd?dsdds: _index<tabs ? animatingValue*(_index>0?2:1) : XTranslate +  (animating?animatingValue*1:0);
            _3XTranslate= XTranslateAnimating;
         }         
      }else{
         if(action===1){
            if(_index-tabs>=0){
               _3XTranslate= index>0?XTranslate:null;
            }else{
               _3XTranslate= index>0?-100:null;
            }
           
         }else if(action===2){
            _3XTranslate= index<=tabs?-100:index>0?XTranslate:null;
         } 
      }

    
      translate3d = _3XTranslate?`translate3d(${_3XTranslate}%, 0, 0)`:null;
     
   //   console.log(index,_3XTranslate )
   }


     //   console.log(index,_3XTranslate )


   var carousel_element_Style = {
      transform:translate3d,
      WebkitTransform: translate3d,
      MsTransform:translate3d,
      "--item_slide-width": itemWidth+"%"
      //width:totalWidth+'%'
   }
   
   
      let _keyCode = keyCode?keyCode:68;


   let _ID_ =  `_${keys[_keyCode]}_`;

   let _iDCarousel = `${_ID_}_${'Carousel'}`;



   const handleInCarosel = ( ) => {
      sethoverCarousel(true);
    }
  
    const handleOutCarosel = (e ) => {
      let _Elmm =document.getElementById(_iDCarousel); 
      var toElement = e.toElement || e.relatedTarget || e.target;
      if(toElement && _Elmm && _Elmm.contains(toElement)){}else{
         sethoverCarousel(false);
      }   
    }

   






  
   const handleIn = (i3, _idS ) => {
      let _view = view;
      if(!dmz || !widthScreen || widthScreen!==outerWidth){
         let _Elmm = document.getElementById(_idS);
         let dm =  _Elmm && _Elmm.getBoundingClientRect().width;
         if(dm){           
            setDmz(dm);
            setWidthScreen(outerWidth);
         }
      }     
      
      if(!_view[i3]){
         _view[i3] = true;
         setView(_view);
         setObs(_Util.gen12CodeId());
      }
          
    }
  
    const handleOut = (e,i3,_idS ) => {
      let _Elmm =document.getElementById(_idS); 
      var toElement = e.toElement || e.relatedTarget || e.target;
  
      
      if(toElement && _Elmm && _Elmm.contains(toElement)){}else{
         let _view = view;
         let _timeInHover_ = timeInHover;   
         delete _view[i3];
         delete _timeInHover_[i3];            
         setTimeInHover(_timeInHover_);
         setView(_view);
         setObs(_Util.gen12CodeId());
      }   
    }




   
   const handlePrev = () => {
      if(initialized){
         if(!animating){
            setView({});
            let NewIndex = index-tabs;
            if(props.loop){
               setAnimatingValue(100)
               setAnimating(true); setAction(1);
               //setPrevIndex(index);
            
            }else{
               if(index>=0){
                  if(NewIndex<0){
                     let tA = 100/tabs * (index-NewIndex);
                     setAnimatingValue(tA)
                     setAnimating(true);
                  }else{
                     setAnimatingValue(100)
                     setAnimating(true);
                  }
                  setAction(1);
                  //setPrevIndex(index);
               }
            }
            setTimeout(()=>{
               setAnimating(null);
               if(props.loop){
                  if(NewIndex<0){
                     NewIndex = slidesItems+NewIndex;
                  }
                  setIndex(NewIndex); 
               }else{
                
                  if(NewIndex>=0){
                     setIndex(NewIndex); 
                  }
               }
               
            },750)  
         }
      }
   }

   const handleNext = () => {
      if(!initialized){
         setInitialized(true);
      }
      if(!animating){
         setView({});
         let NewIndex = index+tabs;
         let total = slidesItems -1 ;
         if(props.loop){
            setAnimatingValue(-100)
            setAnimating(true); setAction(1);
           
         }else{
            if((index+(tabs*2))>total){
               let tA = 100/tabs * (total - NewIndex);
               let _tt = tA*-1;
               setAnimatingValue(_tt)
               setAnimating(true);
            }else{
               setAnimatingValue(-100)
               setAnimating(true);
            }
         }
         setAction(2)
         setTimeout(()=>{
            setAnimating(null);
            if(props.loop){
               if(NewIndex>total){
                  NewIndex = NewIndex - total;
               }
               setIndex(NewIndex); 
            }else{

               if(NewIndex<total){
                  setIndex(NewIndex);
               }else  if(NewIndex===total){
                  setIndex(total);
               }
               else if(NewIndex>total){
                  setIndex((total - NewIndex)+index);
               }
            }      
         },750)   
      }
        
    
   }

   let _prevBtn = hoverCarousel?props.loop ? true: _index>0 ? true:false:false;
   let _nextBtn = hoverCarousel?props.loop ? true: _index+tabs<slidesItems-1 ? true:false:false;
   // console.log("***************************")
   let inStr = null;
  
     
   range2Render2.map((in3,ii3)=>{      
      if(in3===_index){
         inStr = ii3;
      }
   })
   let y = {};
   range2Render2.map((in3,ii3)=>{      
      let pointZero = initialized?ii3-inStr:ii3-inStr;
      y[in3]=pointZero;
   })
   return(
      <>    
         <div className="slider" 
            id={_iDCarousel}
            onMouseMove={(e)=>handleInCarosel(e)}
            onMouseEnter={(e)=>handleInCarosel(e)} 
            onMouseOut={(e)=>handleOutCarosel(e)}
         >
            {_prevBtn && 
            <span class="handle handlePrev active" tabindex="0" role="button" aria-label="Ver títulos anteriores"  onClick={()=>handlePrev()}>
               <b class="indicator-icon icon-leftCaret"></b>
            </span>
            }
            <div className={`sliderMask showPeek`}>
               <div className={`sliderContent ${animating && 'animating'}`} style={carousel_element_Style}>
                  {
                     range2Render2.map((in3,ii3)=>{                        
                        let elm2Clone  = elements[in3];
                        let isInRange = ii3>=inStr && ii3<=(inStr+tabs)+(_index>0? 1:0);                        
                        let pointZero = ii3-inStr;
                                               
                        /*
                        console.log({in3,ii3,index})
                        if(props.loop){
                           let inStr = in3===index && ii3;
                           isInRange = ii3>=inStr && ii3<(inStr+tabs);
                           indexRange = ii3-inStr;
                        }else{

                           isInRange = in3-index>=0 && in3-index<=(tabs+1);
                           indexRange = in3-index;
                        }
                        */
                           let _isHover = props.hoverEffect && hoverCarousel?parseInt(_Util.ObjectKeys(view)[0])===in3:false;


                           let tbs = elm2Clone && React.cloneElement(elm2Clone, { isHover: _isHover,  index: index, index2Show: in3});
                           if(tbs){
                              
                              var carousel_slide_Style = {
                                 width:itemWidth+'%',
                                 transitionDuration: '500ms',
                                 transitionDelay: '100ms'
                              }     
                             
                              if(props.hoverEffect &&  hoverCarousel &&  _Util.ObjectKeys(view).length>0){
                                 let indX = parseInt(_Util.ObjectKeys(view)[0]);                               
                                 let _yy = 0;
                                 let _2translate = 0;
                                 let Z4 = false;
                                 let _w =  dmz;
                                 // console.log(y); 
                                 // console.log(indX,y[indX],y[in3],_w,y[indX]>y[in3]);             
                                 if(!initialized){
                                  
                                    if(y[indX]===0){
                                       _yy = (_w/2);
                                    }
                                    if(y[indX]===inStr+(tabs-1)){
                                       _yy = (_w/2)*-1;
                                    }
                                 }      
                                else {
                                  //  console.log('!initialized',y[indX],inStr+(tabs-2))
                                    if(y[indX]===1){
                                       _yy = (_w/2);
                                    }
                                    if(y[indX]===inStr){
                                       _yy = (_w/2)*-1;
                                    }
                                }


                                 if(indX===in3){
                                    _2translate = 0+(_yy);
                                    Z4 = true;
                                 }
                                 if(y[indX]>y[in3]){
                                    _2translate =   (_w/2)*-1+_yy;
                                 }
                                 if(y[indX]<y[in3]){
                                    _2translate = (_w/2)*1+_yy;
                                 }
                              
                                // console.log(indX, indexRange, in3, ii3);  
                                 //console.log(_w,_2translate,_yy);   

                                 carousel_slide_Style = {
                                    width:itemWidth+'%',
                                    zIndex:Z4?4:null,
                                    transform: `translate3d(${_2translate}px, 0px, 0px)`,
                                    transitionDuration: '500ms',
                                    transitionDelay: '0ms'
                                 }

                              }

                            let _idS = `${_ID_}_${pointZero}_${in3}`;
                           return (
                              <div className={` slider-item ${isInRange?`-${pointZero}`:""}`}     
                              id={_idS}
                               onMouseMove={(e)=>handleIn(in3, _idS)}
                               onMouseEnter={(e)=>handleIn(in3, _idS)} 
                               onMouseOut={(e)=>handleOut(e,in3,_idS)}
                                style={carousel_slide_Style}
                              > 
                              {tbs}
                              </div>
                           )
                        }else{
                           return null
                        }
                       
                     })
                  }     
               </div>  
            </div>   
            {_nextBtn && 
            <span class="handle handleNext active" tabindex="0" role="button" aria-label="Ver más títulos" onClick={()=>handleNext()}>
               <b class="indicator-icon icon-rightCaret"></b>
            </span>     
            }     
         </div>
      
   
      <style>
         {dep_style}
      </style> 
      </>
  )
}

export default CarouselHRM





/*


 id={_ID_}
                                //onMouseMove={(e)=>handleIn(e,in3)} 
                                //onMouseOut={(e)=>handleOutn(e,in3)}

                                 //className={` slider-item ${extr?`slider-item-${in3-index}`:""} ${_active?`_pop2Up_`:""}`}                              
                                 //index-tab={`${in3}`} 
                                 //style={carousel_slide_Style} 
                                 key={_Util.gen12CodeId()}

*/



const dep_style = `
   .efect{
      -webkit-transform: translate3d(-116.66666666666667%, 0px, 0px);
      -ms-transform: translate3d(-116.66666666666667%, 0px, 0px);
      transform: translate3d(-116.66666666666667%, 0px, 0px);
   }


   .rowContainer .rowContent .slider {
      z-index: 2;
   }

  

   .slider {
      position: relative;
      margin: 0;
      padding: 0 4%;
      -ms-touch-action: pan-y;
      touch-action: pan-y;
   }

   .slider .sliderMask.showPeek {
      overflow-x: visible;
   }

   .slider .sliderMask.showPeek {
      width: calc( 100vw - 8vw);
   }
   
   .slider .sliderMask {
         padding-bottom: 1px;
   }

   .slider .sliderMask .sliderContent {
      white-space: nowrap;
   }













   .slider .handle {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 20;
      width: 4%;
      text-align: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -moz-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      color: #fff;
  }



  .slider .handle.handlePrev .indicator-icon {
   -webkit-transform-origin: 55% 50%;
   -moz-transform-origin: 55% 50%;
   -ms-transform-origin: 55% 50%;
   -o-transform-origin: 55% 50%;
   transform-origin: 55% 50%;
}



.slider .handle > .indicator-icon {
      display: none;
      height: auto;
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      -ms-grid-row-align: center;
      align-self: center;
      font-size: 2.5vw;
      -webkit-transition: -webkit-transform 100ms ease-out 0s;
      transition: -webkit-transform 100ms ease-out 0s;
      -o-transition: -o-transform 100ms ease-out 0s;
      -moz-transition: transform 100ms ease-out 0s, -moz-transform 100ms ease-out 0s;
      transition: transform 100ms ease-out 0s;
      transition: transform 100ms ease-out 0s, -webkit-transform 100ms ease-out 0s, -moz-transform 100ms ease-out 0s, -o-transform 100ms ease-out 0s;
}




 
   .rowContainer .rowContent .slider .handle {
         background: rgba(20, 20, 20, 0.5);
   }


   .slider .handle.handleNext {
         right: 0;
   }
  
   .slider .handle.handlePrev {
      left: 0;
   }



   .rowContainer .rowContent .slider:hover .handle.active:hover {
      background: rgba(20, 20, 20, 0.7);
   }



    
    
    .rowContainer .rowContent {
      padding: 0;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
  }
    
    
    
    
    


  .slider .sliderMask.showPeek {
      overflow-x: visible;
   }



   .slider .sliderMask .sliderContent.animating {
      -webkit-transition: -webkit-transform 750ms ease 0s;
      transition: -webkit-transform 750ms ease 0s;
      -o-transition: -o-transform 750ms ease 0s;
      -moz-transition: transform 750ms ease 0s, -moz-transform 750ms ease 0s;
      transition: transform 750ms ease- 0s;
      transition: transform 750ms ease 0s, -webkit-transform 750ms ease 0s, -moz-transform 750ms ease 0s, -o-transform 750ms ease 0s;
      pointer-events: none;
   }









    
 


 
   @media screen and (min-width: 1500px){
      .slider {
         padding: 0 60px;
      }
      .slider .handle > .indicator-icon {
            font-size: 2em;
      }
   }



   .slider .sliderMask .sliderContent {
      white-space: nowrap;
  }



   .boxart-size-16x9 {
      width: 100%;
      height: 0;
      position: relative;
      overflow: hidden;
      padding: 28.125% 0;
  }

`