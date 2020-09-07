import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';

import * as Util from '../../state/Util';
import './style.css';


class ProgressBar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open:false,
      time:null,
      hover:false,
      ct:0,
      startX:0,
      dragging:false,
      progress_hover:0, 
      progress_thumbnail:'', 
      progress_time:'',    
    };
  }

  componentWillMount() {  
    this.handleProgressBar_Hover = this.handleProgressBar_Hover.bind(this);
    this.handleProgressBar_Click = this.handleProgressBar_Click.bind(this)
    this.handleOut = this.handleOut.bind(this)
  }
  componentDidMount(){     
    
    
  }

  handleProgressBar_Hover = event => { 
    var _th6_ = this;   
    if(this.state.dragging){
      _th6_.handleDragOver(event);
    }
    const {duration} = _th6_.props; 
    var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
    var Wbar = (event.clientX-dd.left)*100 / dd.width;
    if(Wbar<0){
      Wbar = 0;
    }
    var c2ct = duration*(Wbar/100);    
    var img = _th6_.props.commonActions.getThumbnailbyTime(parseInt(c2ct/10)*10);
    this.setState({hover:true,progress_hover:Wbar, progress_thumbnail:img,progress_time:Util.buildTimeString_(c2ct,true)})
  };

  handleProgressBar_Click = event => {   
    var _th6_ = this;   
    const {duration} = _th6_.props;      
    var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
    var Wbar = (event.clientX-dd.left)*100 / dd.width;
    var c2ct = duration*(Wbar/100);    
    if (typeof this.props.seek2 === 'function') { this.props.seek2(c2ct);}
  }
 

  handleDragStart = event => {  
    var _th6_ = this;
    event.stopPropagation();
    const {currentTime} = _th6_.props; 
    this.setState({dragging:true,ct:currentTime,startX:event.pageX})  
    //PlayButton();    
  };

  handleDragEnd = event => { 
    var _th6_ = this;
    if(event.pageX && this.state.dragging && this.state.startX ){
      const {duration} = _th6_.props;
      var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
      var Wbar = (event.clientX-dd.left)*100 / dd.width;  
      var c2ct = null;
      if(Wbar>=0 && Wbar<100){
        c2ct = duration*(Wbar/100);
      }    
      
      var diif = event.pageX-this.state.startX; 
      if( diif>25 || diif<-25){
        if (typeof this.props.seek2 === 'function') { this.props.seek2(c2ct);}
        setTimeout(()=>{
          event.stopPropagation();
          this.setState({dragging:false})
        },400)
      }
    }
  };

  handleDragOver = event => { 
    var _th6_ = this;
    const {duration} = _th6_.props;  
    event.stopPropagation(); 
    if(this.state.dragging){      
      var dd = document.getElementsByClassName('track')[0].getBoundingClientRect();
      //document.getElementsByClassName('videoBarButton')[0].style.cursor = 'pointer';    
      var Wbar = (event.clientX-dd.left)*100 / dd.width;  
      var c2ct = null;
      if(Wbar>=0 && Wbar<100){
        event.preventDefault(); 
        c2ct = duration*(Wbar/100); 
        var ctdrg = parseInt(c2ct/10)*10
        this.setState({ct:ctdrg})     
        //_th6_.props.commonActions.setcurrenTime(parseInt(c2ct/10)*10);     
      }  
    }    
  };


  handleOut(){
    
    this.setState({hover:false,progress_hover:0})  
  }

  render() {
    var _th6_ = this;
    const {duration, currentTime, visible} = _th6_.props;
    const {progress_hover, progress_thumbnail, progress_time, hover, ct, dragging} = _th6_.state;   
    var Tduration = duration?Util.buildTimeString_(duration,true):'';
    
    var progress_width = dragging? (ct/duration)*100: (currentTime/duration)*100;    
    
    return(
      <div className="" >
        <div  className={`ControlBar ${visible?'visible':'hidden'}`} onMouseOut={this.handleOut}>
          <div className="scrubber-container">
              <div className="scrubber-bar"  onMouseMove={this.handleProgressBar_Hover} onClick={this.handleProgressBar_Click} onMouseUp={this.handleDragEnd.bind(this)}>
                <div className="track">
                  <div className="buffered" style={{width:`${progress_hover}%`}}></div>
                  <div className="current-progress"  style={{width: `${progress_width}%`}}></div>
                  <div className="play-head"></div>
                </div>
                <div className={`trickplay trickplay-text-and-image ${hover?"trickplay-visible":""}`} 
                style={{left: `calc(${progress_hover}% - 125px)`, width:`250px`}}>
                  <div className="tp-image">
                    <img src={progress_thumbnail} alt=""/>
                  </div>
                  <div className="tp-text">{progress_time}</div>
                </div>
                <div className="scrubber-head" style={{left: `${progress_width}%`}}  onMouseDown={this.handleDragStart.bind(this)} ></div>
              </div>
          </div>
          <div className="PlayerControls--control-element text-control time-remaining--modern PlayerControls--control-element-hidden"><time className="time-remaining__time">{Tduration}</time></div>                                 
        </div>        
      </div>  
    )
    
  }
}


function mapStateToProps(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded, 
    currentTime: state.common.currentTime,
    duration: state.common.duration,   
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);




/*
 {
    <div className="videoBarButton" style={{left:`calc(${progress_width}% - 6px)`}}  draggable="true" onDragStart={handleDragStart} onDrag={handleDragOver} onDragEnd={handleDragEnd}/>  
  }   
*/