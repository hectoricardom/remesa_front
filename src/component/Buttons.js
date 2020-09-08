
import React from 'react'

import './_styles.css';

import * as _Util from '../store/Util'
import { Icon2 } from './Icons'





export const ChoiceButton = (props) => {
    const {value} = props;

    const handleChange = (_v) => {
        if(typeof props.change === "function"){
            props.change(_v);
        }
    }
   
    return(
        <div className={` _dsplFlx choiceBtn `}>
            <div  className={`_groupBtn left ${value==='MLC'?"active":''} `}  onClick={()=>handleChange('MLC')}>
                <span>{`MLC`}</span>
            </div>
            <div  className={`_groupBtn right ${value==='CUC'?"active":''}`}  onClick={()=>handleChange('CUC')} >
                <span>{`CUC`}</span>
            </div>
        </div>
    )
}





export const NumberButton = (props) => {
    const {color, amount, minValue} = props;


    const handleChange = (e) => {
        if(typeof props.change === "function"){
            let _v = parseInt(e.target.value)
            if(_v>=0 && _v<=2000){
                props.change(_v);
            }
        }
    }


  
    const _minus = () => {
        if(typeof props.change === "function"){
            let _v = amount - 10;
            if(_v>=minValue){
                props.change(_v);
            }
        }
    }
    
    const _plus = () => {   
        if(typeof props.change === "function"){
            let _v = amount + 10;
            props.change(_v);
            if(_v>2000){
                props.change(2000);
            }else{
                props.change(_v);
            }
        }
    }

    let _color = color;
    let isvalid = true;
    if(amount>2000 || amount<minValue){
        _color = 'firebrick' 
        isvalid = false;
    }

    return(
        <div className={` _dsplFlx ${isvalid?"":'inValid'}`}>
            <div  className={`_groupBtn left active`}  onClick={_minus}>
                <Icon2 name={`minus`} />
            </div>
            <div className={`inptNumb`} >
                <input type="number" value={amount} onChange={handleChange}/>
            </div>
            <div  className={`_groupBtn right active`}  onClick={_plus} >
                <Icon2 name={`add`} />
            </div>
        </div>
    )
}



export const IconButton = (props) => {
    const {iconName} = props;
    return(
        <button className="color-supplementary size-medium ltr-ssvoiv" data-uia="thumbsDown-button" type="button">
            <div className="medium ltr-sjgnss" role="presentation">
                <Icon2   
                    name={iconName} 
                    color={'currentColor'} 
                />
            </div>
        </button>
    )
}



export const SectionDivider = (props) => {
    const {collapse} = props;
    const toogle = () => {
        if(typeof props.toogle === "function"){
          props.toogle();
        }
    }
    return(
        <div className={`section-divider ${collapse?"collapsed":""}`} >
            <button aria-label="expand section" className="color-supplementary size-small section-expandButton ltr-ssvoiv" data-uia="section-expand" type="button"  onClick={()=>toogle()}>
                <div className="small ltr-sjgnss" role="presentation">
                    <Icon2   
                        name={collapse?'key_arrow_down':"key_arrow_up"} 
                        color={'#555'} 
                    />
                </div>
            </button>
        </div>
    )
}




export const ImageButton = (props) => {
    const {src, title} = props;

    const _clickEvent = () => {
      if(typeof props.clickEvent === "function"){
        props.clickEvent();
      }
    }

    let _src = src || ``
    
    return(
        <a tabindex="0" className="primary-button playLink isToolkit" >
            <button className="color-primary hasLabel hasIcon ltr-h73cpj mW265" tabindex="-1" type="button" onClick={()=>_clickEvent()}>
                <div className="ltr-1e4713l">
                    <div className="medium ltr-sar853" role="presentation">
                        <img  class="icon-product lazy-img js-only" alt={title} src={_src}/>
                    </div>
                </div>
                <div className="ltr-1i33xgl" style={{width: "0.8rem"}}></div>
                <span className="ltr-14hip7q">{""}</span>
            </button>
        </a>
    )
}



export const PlayButton = (props) => {
    const {bookmarkPosition} = props;

    const _clickEvent = () => {
      if(typeof props.clickEvent === "function"){
        props.clickEvent();
      }
    }


    return(
        <a tabindex="0" className="primary-button playLink isToolkit" >
            <button className="color-primary hasLabel hasIcon ltr-h73cpj" tabindex="-1" type="button" onClick={()=>_clickEvent()}>
                <div className="ltr-1e4713l">
                    <div className="medium ltr-sar853" role="presentation">
                        <Icon2   
                            name={'play'} 
                            color={'currentColor'} 
                        />
                    </div>
                </div>
                <div className="ltr-1i33xgl" style={{width: "0.8rem"}}></div>
                <span className="ltr-14hip7q">{bookmarkPosition && bookmarkPosition["timeline"]>0?_Util.translatetext(522):_Util.translatetext(521)}</span>
            </button>
        </a>
    )
}




export const MoreInfoButton = (props) => {
    const {title, theme, icon} = props;

    const _clickEvent = () => {
      if(typeof props.clickEvent === "function"){
        props.clickEvent();
      }
    }

    var thCls = theme==="purple"?'color-purple-4':theme==="gray"?'color-secondary ':'color-primary';

 // color-secondary 

    let _icon = icon || 'add'
    return(
        <a tabindex="0" className="primary-button playLink isToolkit" >
            <button className={`${thCls} hasLabel hasIcon ltr-h73cpj`} tabindex="-1" type="button" onClick={()=>_clickEvent()}>
                <div className="ltr-1e4713l">
                    <div className="medium ltr-sar853" role="presentation">
                        <Icon2   
                            name={_icon} 
                            color={'currentColor'} 
                        />
                    </div>
                </div>
                <div className="ltr-1i33xgl" style={{width: "0.8rem"}}></div>
                <span className="ltr-14hip7q">{title}</span>
            </button>
        </a>
    )
}





export const TitleProgress = (props) => {
    const {bookmarkPosition} = props;  
    if(bookmarkPosition && bookmarkPosition["timeline"]){
        let timeline = parse2Minutes(bookmarkPosition["timeline"]);       
        return(
            <div className="previewModal-title-progress">
                {timeline?
                <div className="progress ">
                    <span className="progress-bar">
                        <span role="presentation" className="progress-completed" style={{width: (bookmarkPosition.timeline / bookmarkPosition.duration )*100 +"%"}}></span>
                    </span>
                    <span className="summary">{timeline}&nbsp;de&nbsp;{parse2Minutes(bookmarkPosition["duration"])}min</span>
                </div>
                :null}
            </div>
        )
    }else{
        return null
    }
}





const parse2Minutes = (s) =>{
    return Math.floor(s/60);
}
   




export const IconButtonLoading = (props) => {
    return(
        <div  className="loadingIconBtn"  role="presentation">                
            <div  className="loadingTitle pulsate ratio-16x9" style={{width: "100%", height: "100%", borderRadius: "50%", padding: "2rem"}}/>
        </div>
    )
}


export const PlayButtonLoading = (props) => {

    return(
        <button className="color-primary hasLabel hasIcon loadingBtn" tabindex="-1" type="button">
            <div  className="loadingTitle pulsate ratio-16x9" style={{width: "12.5rem", height: "3.4rem"}}/> 
        </button>       
    )
}