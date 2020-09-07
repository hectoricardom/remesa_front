import React, { useEffect, useState } from 'react'
import * as _Util from '../store/Util';





const LoadingLowRow = (props) => {
  
  let tabs = _Util.getTabs(window.outerWidth);

  let W = 100/tabs;

  return (
    <div className="rowContentLoading" style={{width:"100%"}}>
      <div className="slider" style={{height:props.height-10 || 310}}>
        <div className="smallTitleCard loadingTitle" style={{width:`${W}%`}}>
          <div className="ratio-16x9 pulsate" style={{animationDelay: "0s"}}></div>
        </div>
        <div className="smallTitleCard loadingTitle" style={{width:`${W}%`}}>
          <div className="ratio-16x9 pulsate" style={{animationDelay: "0.2s"}}></div>
        </div>
        <div className="smallTitleCard loadingTitle" style={{width:`${W}%`}}>
          <div className="ratio-16x9 pulsate" style={{animationDelay: "0.4s"}}></div>
        </div>
        <div className="smallTitleCard loadingTitle" style={{width:`${W}%`}}>
          <div className="ratio-16x9 pulsate" style={{animationDelay: "0.6s"}}></div>
        </div>
        <div className="smallTitleCard loadingTitle" style={{width:`${W}%`}}>
          <div className="ratio-16x9 pulsate" style={{animationDelay: "0.8s"}}></div>
        </div>
        <div className="smallTitleCard loadingTitle" style={{width:`${W}%`}}>
          <div className="ratio-16x9 pulsate" style={{animationDelay: "1s"}}></div>
        </div>
        <div className="smallTitleCard loadingTitle" style={{width:`${W}%`}}>
          <div className="ratio-16x9 pulsate" style={{animationDelay: "1.2s"}}></div>
        </div>
      </div>
    </div>
                                          
  )

}

export default LoadingLowRow;