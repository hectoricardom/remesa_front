import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import Icons from './Icons'




const useObserveChanges = () => {
   const observeChanges =  useSelector(state => state.observeChanges);
   //const _state=  useSelector(state => state);    
 
   const dispatch = useDispatch();
   
   return { observeChanges }
}
 

const CarouselHRM = (props) => {
   const {  observeChanges } = useObserveChanges();

   
  let _state = _Util.getStore()
   const {
      outerWidth
   } = _state;

   const {      
         keyCode
   } = props;      

   let tabs = _Util.getTabs(outerWidth);
 


      const [index, setIndex] = useState(0);
      const [hoverCarousel, sethoverCarousel] = useState(true);

      const [view, setView] = useState({});
      const [dmz, setDmz] = useState(null);

      
      const [initialized, setInitialized] = useState(false);
      const [rowWidth, setRowWidth] = useState(false);


      const [timeInHover, setTimeInHover] = useState({});

      const [widthScreen, setWidthScreen] = useState(null);
   
      const [obs, setObs] = useState(0);



      let elements = React.Children.toArray(props.children)
   
     
      let slidesItems = elements?elements.length:0;

      // console.log(slidesItems);
      

      useEffect(() => {
         if(keyCode){
            if(!rowWidth || widthScreen!==outerWidth){
               let c = document.getElementById(`${keyCode}_rowContainer`);
               let rW = c && c.getBoundingClientRect();
               if(rW){
                  setRowWidth(rW.width);
                  setWidthScreen(outerWidth);
               }
            }
         }
      });
     
      
      var itemWidth = (rowWidth / tabs)      
      let XTranslate =  itemWidth *(tabs+1)*-1;
      


        
      var totalWidth = elements.length*itemWidth;
      

      let end = (tabs * index) + tabs

      // console.log(slidesItems,end)
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
         /*
         if(!dmz || !widthScreen || widthScreen!==outerWidth){
            let _Elmm = document.getElementById(_idS);
            let dm =  _Elmm && _Elmm.getBoundingClientRect().width;
            if(dm){           
               setDmz(dm);
               setWidthScreen(outerWidth);
            }
         }     
         */
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
      //console.log("handlePrev",index,index-1)
      setIndex(index-1)
   }

   const handleNext = () => {
      //console.log("handleNext",index,index+1)
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
      <>
         {_prevBtn && 
         <div  className={`left_bx  nav-slide-btn`}>       
               <div  onClick={()=>handlePrev()}
                  className={`left-arrow  nav-slide-btn`}
               >  
                  <Icons   
                     name={'arrow_left'} 
                     color={'#555'} 
                     size={24} 
                     //tooltip={'delete locations'}
                     //extraClass={'delete'} 
                  />
               </div>
            </div>
            }
         <div className="" carousel={`true`}>
             
            <div className="carousel-wrapper">
             
               <div className="carousel-element grab" style={carousel_element_Style}>
                  {
                    elements.map((elm2Clone,in3)=>{

                     
                     var carousel_slide_Style = { }     
                        
                     if(props.hoverEffect){
                        carousel_slide_Style = {
                           transitionDuration: '500ms',
                           transitionDelay: '100ms'
                        }
                     }
                     if(props.hoverEffect &&  hoverCarousel &&  _Util.ObjectKeys(view).length>0){                           
                        let indX = parseInt(_Util.ObjectKeys(view)[0]);
                          
                        let _yy = 0;
                        let _2translate = 0;
                        let Z4 = false;
                        let _w =  itemWidth;                                     
                        if(false && !initialized){                           
                         
                        }      
                        else {   
                           let _xindX = 0;
                           
                           if(elements.length>=tabs){
                              _xindX = _diff!==0?indX-_diff: indX;
                           }
                           
                          
                           if(_xindX===(index*tabs)+(tabs-1)){
                              _yy = (_w/2)*-1;
                           } 


                           if(_xindX===(index*tabs)){
                              _yy = (_w/2);
                           }
                          
                          
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


                     


                        let _isHover = props.hoverEffect && hoverCarousel?parseInt(_Util.ObjectKeys(view)[0])===in3:false;
                        let _props_ = { 
                           isHover: _isHover,
                          // index: index,
                          // hv:view[in3],
                          // indexItem: in3, 
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
          <div  className={`right_bx  nav-slide-btn`}>         
               <div onClick={()=>handleNext()}  className={`right-arrow `}>
                  <Icons   
                     name={'arrow_right'} 
                     color={'#555'} 
                     size={36} 
                     //tooltip={'delete locations'}
                     //extraClass={'delete'} 
                  />
               </div> 
               </div>
               }  
            <style>
               {hhS}
            </style>
         </>
      )
    }
   
 


export default CarouselHRM;






const hhS = `

[carousel] {
  position: relative;
}


[carousel] .carousel-wrapper2 {
  margin-left: 48px;
  max-width: 250px;
  min-width: 250px;
}



.carousel-wrapper {
  position: relative;
  width: 100%;
  z-index: 5;
/*  overflow: hidden;*/
}



.carousel-element {
  height: inherit;
  position: relative;
  width: 2000%;
  -webkit-transition: -webkit-transform 750ms cubic-bezier(0.25,0.46,0.45,0.94);
  transition: transform 750ms cubic-bezier(0.25,0.46,0.45,0.94);
}

.carousel-element::before, .carousel-element::after {
  content: "";
  display: table;
}

.grab {
  /*cursor: url(../img/openhand.cur) 8 8,move;*/
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}


[carousel] .carousel-slide {
  margin: 0;
}

.carousel-slide {
  float: left;
  height: 100%;
  overflow: hidden;
  width: 5%;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);

}

.carousel-slide {
  opacity: 0; 
  transition-delay: 0.61s; 
  -webkit-transition: opacity .6s ease;
  transition: opacity .6s ease;
}



.carousel-slide.active {
  opacity: 1;
}




@media only screen and (max-width: 500px){    
  .carousel-slide {  
    width: 50%;  
  }

}




.nav-slide-btn {
   will-change: transform;
   width: 0;
   display: -ms-flexbox;
   display: -webkit-flex;
   display: flex;
   -ms-flex-direction: column;
   -webkit-flex-direction: column;
   flex-direction: column;
   -ms-flex-align: center;
   -webkit-align-items: center;
   align-items: center;
   -ms-flex-pack: center;
   -webkit-justify-content: center;
   justify-content: center;
   width:36px;
}



.nav-slide-btn.left_bx,
.nav-slide-btn.right_bx {
   position: absolute;
   top: var(--ytd-horizontal-list-arrow-top, 0);
  
   height: 118px;
   z-index: 200;
   height: 100%;
}

.nav-slide-btn.left_bx{
   left: 20px;
}
.nav-slide-btn.right_bx {
   right: 20px;
}

.nav-slide-btn.right_bx .right-arrow,
.nav-slide-btn.left_bx .left-arrow {
   top: 50%;
   height: 36px;
   width: 36px;
   margin-top: -18px;
}




.nav-slide-btn.right_bx .right-arrow svg, 
.nav-slide-btn.left_bx .left-arrow svg{
   width: 36px;
   height: 36px;
   color: #E50914;
   fill: #E50914;
}


.rowContent .nav-slide-btn.right_bx .right-arrow,
.rowContent .nav-slide-btn.left_bx .left-arrow
{   
   opacity: 0;
   -webkit-transform: scale(0);
   -moz-transform: scale(0);
   -ms-transform: scale(0);
   -o-transform: scale(0);
   transform: scale(0);
   -webkit-transition: -webkit-transform 350ms cubic-bezier(0.86, 0, 0.07, 1), opacity 350ms cubic-bezier(0.86, 0, 0.07, 1);
   transition: -webkit-transform 350ms cubic-bezier(0.86, 0, 0.07, 1), opacity 350ms cubic-bezier(0.86, 0, 0.07, 1);
   -o-transition: -o-transform 350ms cubic-bezier(0.86, 0, 0.07, 1), opacity 350ms cubic-bezier(0.86, 0, 0.07, 1);
   -moz-transition: transform 350ms cubic-bezier(0.86, 0, 0.07, 1), -moz-transform 350ms cubic-bezier(0.86, 0, 0.07, 1), opacity 350ms cubic-bezier(0.86, 0, 0.07, 1);;
   transition: transform 350ms cubic-bezier(0.86, 0, 0.07, 1), opacity 350ms cubic-bezier(0.86, 0, 0.07, 1);;
   transition: transform 350ms cubic-bezier(0.86, 0, 0.07, 1), -webkit-transform 350ms cubic-bezier(0.86, 0, 0.07, 1), -moz-transform 350ms cubic-bezier(0.86, 0, 0.07, 1), -o-transform 350ms cubic-bezier(0.86, 0, 0.07, 1), opacity 350ms cubic-bezier(0.86, 0, 0.07, 1);;


}



.rowContent:hover .nav-slide-btn.right_bx .right-arrow,
.rowContent:hover .nav-slide-btn.left_bx .left-arrow{
   opacity: 1;
   -webkit-transform: scale(3.05);
   -moz-transform: scale(3.05);
   -ms-transform: scale(3.05);
   -o-transform: scale(3.05);
   transform: scale(3.05);
}

`