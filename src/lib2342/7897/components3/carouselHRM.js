import React from 'react';


import * as _Util from '../lib/Util';


import './style.css';


   


const CarouselHRM = (props) => {
   
  
   const [view, setView] = useState(0);


   // console.log(router)
   useEffect(() => {
   if(!initialize){
      setInitialize(true);
      setTimeout(()=>{
         setView(1);
      },250)
      //_getVideosSearch("taxi","videoSearch");
   }
   });



   const {children,activeTab} = props;      
   
   var itemWidth = 100/children.length;      
   var translate3d = itemWidth * activeTab;

   var totalWidth = children.length*100;
   var carousel_element_Style = {
      transform:`translate3d(-${translate3d}%, 0, 0)`,
      WebkitTransform: `translate3d(-${translate3d}%, 0, 0)`,
      MsTransform:`translate3d(-${translate3d}%, 0, 0)`,
      width:totalWidth+'%'
   }
   var carousel_slide_Style = {
      width:itemWidth+'%'
   }     
   return(
      <>
      <div className="" carousel={`true`}>
         <div className="carousel-wrapper">
            <div className="carousel-element grab" style={carousel_element_Style}>
               <
               {
                  children.map((tbs,in3)=>{
                     return (
                     <div className={`carousel-slide ${activeTab===in3?'active':''}`} style={carousel_slide_Style} key={_Util.gen12CodeId()}>                         
                        {tbs}
                     </div> 
                     ) 
                  })
               }
                              
            </div>               
         </div>
      </div>
   
      <style>
         {dep_style}
      </style> 
      </>
   );
   
 }  
 



 export default CarouselHRM