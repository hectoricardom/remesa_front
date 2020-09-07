import React, { Component } from 'react';
import Icons from '../Icons/Icons'
import './style.css';


export default class BezelActions extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active:false,
      icon:null         
    };
  }

  componentWillMount() {      
    this.Open = this.Open.bind(this);
    this.close = this.close.bind(this);
  }
  

  Open(i){
    this.setState({active:true,icon:i})
    setTimeout(()=>{this.setState({active:false})},900)  
  }

  close(){
    this.setState({active:false})  
  }

  render() {
    var _th6_ = this;
    const {active,icon} = this.state;    
    var disp = active?'block':'none';
    return(      
      <div onClick={_th6_.close} className="VideoBezel" style={{display:disp,position: 'absolute',width:'100px',height:'100px',zIndex: 350}}>
        <div style={{position: 'relative',width:'100%',height:'100%'}}>
          <div style={{position: 'absolute',top:'50%',left:'50%',marginLeft:'-18px',marginTop:'-18px'}}>
            <Icons name={icon} color={'#fff'} size={36}/>   
          </div> 
        </div>       
      </div>  
    )
  }
}
