import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import {Icon2} from './Icons'


const useObserveChanges = () => {
   const observeChanges =  useSelector(state => state.observeComponent);  
   const dispatch = useDispatch()
   return { observeChanges,dispatch }
 }
 



const CarouselHRM = (props) => {   
   const {  observeChanges } = useObserveChanges();
   
   let _state = _Util.getStore()
   const {  outerWidth } = _state;

   const {  keyCode,  _key_ } = props;      

   let tabs = _Util.getTabs(outerWidth);
 
   const [hoverCarousel, sethoverCarousel] = useState(true);
   const [initialized, setInitialized] = useState(false);
   const [obs, setObs] = useState(0);



   const [view, setView] = useState({});
   
   const [index, setIndex] = useState(0);
   
   const [rowWidth, setRowWidth] = useState(false);


   const [timeInHover, setTimeInHover] = useState({});

   const [widthScreen, setWidthScreen] = useState(null);

  


   let elements = React.Children.toArray(props.children)

   
   let slidesItems = elements?elements.length:0;

   

   useEffect(() => {
      if(keyCode){
         if(!rowWidth || widthScreen!==outerWidth){
            let c = document.getElementById(_key_);
            let rW =_Util.offset(c);
            if(rW){
               setRowWidth(rW.width);
               setWidthScreen(outerWidth);
            }
         }
      }
   });
      
   
   var itemWidth = (rowWidth / tabs)      
   
   
   var totalWidth = elements.length*itemWidth;
   

   



   let end = (tabs * index) + tabs;

   var translate3d = itemWidth * tabs * index;
   var total = slidesItems;
   let _diff = 0;
   if(end>slidesItems){          
      let diff = total - end;        
      _diff = diff;
      translate3d =  itemWidth *(total-tabs);
   }

   var carousel_element_Style = {
      display:'flex',
      transform:`translate3d(-${translate3d}px, 0, 0)`,
      WebkitTransform: `translate3d(-${translate3d}px, 0, 0)`,
      MsTransform:`translate3d(-${translate3d}px, 0, 0)`,         
      "--item_slide-width": itemWidth+"px",
      width: totalWidth+'px'
   }



      

  
   const handleIn = (i3, _idS ) => {      
      if(hoverCarousel){
         let _view = view;         
         if(!_view[i3]){
            _view[i3] = true;
            setView(_view);
            setObs(_Util.gen12CodeId());
         }
      }
          
    }
  
    const handleOut = (e,i3,_idS ) => {     
      if(hoverCarousel){
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
    }

      



   const handlePrev = () => {
      setIndex(index-1)
   }

   const handleNext = () => {
      setIndex(index+1)
   }
   
   let _prevBtn = false;
   let _nextBtn = false;

   if(props.nonSlide){

   }
   else{   
      _prevBtn = hoverCarousel?props.loop ? true: index>0 ? true:false:false;
      _nextBtn = hoverCarousel?props.loop ? true: end<=slidesItems ? true:false:false;
   }

    
      return(
      <div className={`_sliderH`}>

         {_prevBtn && 
         <div  className={`left_bx  nav-slide-btn handle`}>       
               <div  onClick={()=>handlePrev()}
                  className={`left-arrow  nav-slide-btn`}
               >  
                  <Icon2   
                     name={'arrow_left'} 
                     color={'#555'}
                  />
               </div>
            </div>
            }
         <div className="" carousel={`true`}>
             
            <div className="carousel-wrapper">
             
               <div className="carousel-element grab" style={carousel_element_Style}>
                  {
                    elements.map((elm2Clone,in3)=>{

                        var carousel_slide_Style = effectSlideItem(props.hoverEffect,hoverCarousel,in3,itemWidth,initialized,view, tabs, _diff, index,elements.length)   
                           

                        let _isHover = props.hoverEffect && hoverCarousel?parseInt(_Util.ObjectKeys(view)[0])===in3:false;
                        let _props_ = { 
                           isHover: _isHover,
                           keyCode:keyCode
                        }


                        let tbs = elm2Clone && React.cloneElement(elm2Clone, _props_);
                   
                        let _index = index*tabs;
                        let _start = _index>tabs?_index-tabs:0;                        
                        let _end  = _index+(tabs*2)+(_index>0?2:1);
                        _end = _end>total?total:_end;
                        let _idS = `${in3}_sld_${keyCode}`;
                        let isVisible = false;
                        if(in3>=_start && in3<=_end){
                           isVisible = true;
                        }
                       
                        return (
                           <div
                              key={_idS}
                              className={` slider-item `} 
                              id={_idS}
                              onMouseMove={(e)=>handleIn(in3, _idS)}
                              onMouseEnter={(e)=>handleIn(in3, _idS)} 
                              onMouseOut={(e)=>handleOut(e,in3,_idS)}
                              style={carousel_slide_Style}
                           > 
                              {isVisible?tbs?tbs:<div/>:<div/>}
                           </div>                           
                        )
                     })
                  }
                                
               </div>
            </div>          
         </div>
         {_nextBtn &&  
          <div  className={`right_bx  nav-slide-btn handle`}>         
               <div onClick={()=>handleNext()}  className={`right-arrow `}>
                  <Icon2   
                     name={'arrow_right'} 
                     color={'#555'}
                  />
               </div> 
               </div>
               }
         </div>
      )
    }
   
 


export default CarouselHRM;




const effectSlideItem = (hoverEffect,hoverCarousel,in3,itemWidth,initialized,view, tabs, _diff, index,Elength) => {

   var carousel_slide_Style = { }     
   if(hoverEffect){
      carousel_slide_Style = {
         transitionDuration: '500ms',
         transitionDelay: '100ms'
      }
   }
   if(hoverEffect &&  hoverCarousel &&  _Util.ObjectKeys(view).length>0){                           
      let indX = parseInt(_Util.ObjectKeys(view)[0]);
        
      let _yy = 0;
      let _2translate = 0;
      let Z4 = false;
      let _w =  itemWidth;                                     
       
      let _xindX = 0;                           
      if(Elength>=tabs){
         _xindX = _diff!==0?indX-_diff: indX;
      }                          
      if(_xindX===(index*tabs)+(tabs-1)){
         _yy = (_w/2)*-1;
      }
      if(_xindX===(index*tabs)){
         _yy = (_w/2);
      }
      
      if(indX===in3){
         _2translate = 0+(_yy);
         Z4 = true;
      }
      if(indX>in3){
         _2translate =   (_w/2)*-1+_yy;
      }
      if(indX<in3){
         _2translate = (_w/2)*1+_yy;
      }
      carousel_slide_Style = {
         width:itemWidth+'%',
         zIndex:Z4?4:null,
         transform: `translate3d(${_2translate}px, 0px, 0px)`,
         transitionDuration: '500ms',
         transitionDelay: '0ms'
      }

   }                
   return carousel_slide_Style;
}