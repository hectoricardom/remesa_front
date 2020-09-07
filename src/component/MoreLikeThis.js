
import React, { useState } from 'react';
import * as _Util from '../store/Util';

import {SectionDivider} from './Buttons';


import  './_styles.css';




const MoreLikeThis = (props) => {
  let _state = _Util.getStore();

  const [collapse, setcollapse] = useState(true);
  let _collapseHeight = {}    
  if(collapse){
      _collapseHeight = {maxHeight: "65em"}
  }


  let _dVID = _state["detailVideoByID"];

  let _similar = _dVID && _dVID["similars"]; 
  let _mlt = _Util.sortObjectsByKey(_similar,"releaseYear","asc");

  let _type = _dVID && _dVID["type"];
  let _ext = _state["isWebp"]?"webp":"jpg";
  const toogle = (props) => { 
      if(!collapse){
         let hh = document.querySelector('[data-uia="moreLikeThis--container"]');
         let dm = hh && _Util.offset(hh);
         let _scrollTop = dm.top || 0;
         window.scrollTo(0,_scrollTop-30);
      }       
      setcollapse(!collapse)
  }


  




  return (
      <div className="ptrack-container">
          <div className="ptrack-content" >
            {_type?
              <div className={`moreLikeThis--wrapper ${_type?"_show":""}`}  data-uia="moreLikeThis--container">
                    <p className="previewModal--section-header moreLikeThis--header">{_Util.translatetext(534)}</p>
                    <div className={`section-container ${collapse?"collapsed":""}`} data-uia="section-container" style={_collapseHeight}>
                        <div className="moreLikeThis--container">
                            {_mlt && _mlt.map(_it=>{
                              let item = _similar[_it];
                                return(
                                    <MoreLikeThisItem  item={item} _blob={props._blob} key={_Util.gen6CodeId()} _ext={_ext}/>
                                )
                            })}
                        </div>
                    </div>
                    <SectionDivider  collapse={collapse} toogle={toogle}/>
              </div>
              :
              <div className="moreLikeThis--wrapper _show" style={{minHeight:"300px"}}>
                <p className="previewModal--section-header moreLikeThis--header">
                    <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "120px", height: "25px", borderRadius: "13px"}}/>
                </p>
                <div className={`section-container collapsed`} data-uia="section-container" style={_collapseHeight}>
                      <div className="moreLikeThis--container">
                        <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "90%", height: "125px", borderRadius: "13px"}}/>
                        <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "90%", height: "125px", borderRadius: "13px"}}/>
                        <div  className="loadingTitle pulsate ratio-16x9 ldgMtd" style={{width: "90%", height: "125px", borderRadius: "13px"}}/>
                      </div>
                  </div>
            </div>
            }
          </div>
      </div>
                                          
  )

}



export default  MoreLikeThis




const MoreLikeThisItem = (props) => {
  
  const {  item, _ext } = props;
 
  
  let _title = item.title || "";
  let _matchScore = null;
  let _maturityNumber = item["maturityNumber"] || "";
  let _year = item["releaseYear"] || 2020;
  let _synopsis = item["synopsis"] || "";
  
  let defRes = "_665x375";
  defRes = "_342x192";
  let imK2Show = "boxarts";
  let _boxarts = item[imK2Show] && item[imK2Show][defRes] && item[imK2Show][defRes][_ext] && item[imK2Show][defRes][_ext]["url"];


  

  return (
      <div className="titleCard--container more-like-this-item" tabindex="0" aria-label={_title} data-uia="titleCard--container" role="button">
          <div className="titleCard-imageWrapper has-duration">
              <div className="ptrack-content">
                  <img src={_boxarts} alt={_title}/>
              </div>
          </div>
          <div className="titleCard--metadataWrapper">
              <div data-uia="videoMetadata--container" className="videoMetadata--container titlecard-videoMetadata videoMetadata--two-lines">
                  {_matchScore?
                  <div className="videoMetadata--first-line">
                      <span className="match-score-wrapper">
                          <div className="show-match-score rating-inner">
                              <span className="match-score">{_matchScore}</span>
                          </div>
                      </span>
                  </div>
                  :null}
                  <div className="videoMetadata--second-line">
                      <div className="year">{_year}</div>
                      {_maturityNumber?
                      <span className="maturity-rating ">
                          <span className="maturity-number">{_maturityNumber}</span>
                      </span>
                      :null}
                  </div>
              </div>
              <p className="titleCard-synopsis previewModal--small-text">{_synopsis}</p>
          </div>
      </div>
  )

}
