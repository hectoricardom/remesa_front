import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../../lib/Util';
import Icons from '../Icons'

import './style.css';



const useObserveChanges = () => {
   const observeChanges =  useSelector(state => state.observeChanges);
   const _state=  useSelector(state => state);    
 
   const dispatch = useDispatch();
   
   return { observeChanges, _state }
}
 

const CarouselHRM = (props) => {
   const { _state, observeChanges } = useObserveChanges();
   const {
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


      const [index, setIndex] = useState(0);
      const [hoverCarousel, sethoverCarousel] = useState(null);

      const [view, setView] = useState({});
      const [dmz, setDmz] = useState(null);

      
      const [initialized, setInitialized] = useState(false);
      const [rowWidth, setRowWidth] = useState(false);


      const [timeInHover, setTimeInHover] = useState({});

      const [widthScreen, setWidthScreen] = useState(null);
   
     


      let elements = React.Children.toArray(props.children)
   
     
      let slidesItems = elements?elements.length:0;

      console.log(slidesItems);
      

      useEffect(() => {
         if(keyCode && !initialized){
            let c = document.getElementById(`${keyCode}_rowContainer`);
            let rW = c.getBoundingClientRect();
            setRowWidth(rW.width);
            console.log(c)
            setInitialized(true)
         }
      });
     

      var itemWidth = (rowWidth / tabs)


      let XTranslate =  itemWidth *(tabs+1)*-1;
      


        
    var totalWidth = elements.length*itemWidth;
      

     var translate3d = itemWidth * tabs * index;


      var carousel_element_Style = {
         display:'flex',
         transform:`translate3d(-${translate3d}px, 0, 0)`,
         WebkitTransform: `translate3d(-${translate3d}px, 0, 0)`,
         MsTransform:`translate3d(-${translate3d}px, 0, 0)`,         
         "--item_slide-width": itemWidth+"px",
         width: totalWidth+'px'
      }
      var carousel_slide_Style = {
         width:`var(--item_slide-width) `
      }   
      

  
   const handleIn = (i3, _idS ) => {
      if(hoverCarousel){
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
         }
      }   
    }

      




      return(
         <div className="" carousel={`true`}>
            <div className="carousel-wrapper">
               <span>
                  <Icon />
               </span>
               <div className="carousel-element grab" style={carousel_element_Style}>
                  {
                    elements.map((elm2Clone,in3)=>{



                        let _isHover = props.hoverEffect && hoverCarousel?parseInt(_Util.ObjectKeys(view)[0])===in3:false;
                      
                        let tbs = elm2Clone && React.cloneElement(elm2Clone, { isHover: _isHover,  index: index});

                        let _idS = `${in3}_sld_${''}`;
                        return (
                           <div className={` slider-item `} 
                              id={_idS}
                              onMouseMove={(e)=>handleIn(in3, _idS)}
                              onMouseEnter={(e)=>handleIn(in3, _idS)} 
                              onMouseOut={(e)=>handleOut(e,in3,_idS)}
                              style={carousel_slide_Style}
                           > 
                           {tbs?tbs:null}
                           </div>                           
                        )
                     })
                  }
                                
               </div>               
            </div>
         </div>
      )
    }
   
 


export default CarouselHRM;



