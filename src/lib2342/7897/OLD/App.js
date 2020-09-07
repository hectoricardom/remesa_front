

import React, { Component } from 'react';
//import { Provider } from 'react-redux';
//import store from './state/store';
import Home from './component/init';
import {getBrowser,getHlsSDK,genId} from './state/Util';

import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      route_list : [],
      setting:false,
      browserSupported:true,
      badUser:false,
      classId:genId()
    };
  }

  componentDidMount(){  

  }

  componentWillMount(){   
    var brw = getBrowser().browser;
    if(brw===`Internet Explorer`){
      this.setState({browserSupported:false});
    }
    getHlsSDK();
  }

 


  render() {
    if(this.state.browserSupported){
      return (
        <div className={this.state.classId}>
          <style>
            {`.${this.state.classId}{
              --heliumPlayer__color_fire :#e50914;
              --heliumPlayer__color_fire_2 :#bf1315;
              --heliumPlayer__color_shadow: #454545;
              --heliumPlayer__color_dark_2: #2e2e2e; 
              --heliumPlayer__color_dark_9_7: #979797; 
              --heliumPlayer__color_dark_14: #141414;
              --heliumPlayer__color_light_9: #d9d9d9;
              --heliumPlayer__color_light_2: #a2a2a2;
              --heliumPlayer__color_light_4: #b4b4b4;
              --heliumPlayer__color_light_5: #d5d5d5;
              --heliumPlayer__color_light_6: #f6f6f6;
              --heliumPlayer__color_white_: #ffffff;
              --heliumPlayer__color_blck_: #000000;
            }`
            }
          </style>
            <Home/>
        </div>
      );
    }else{
      return (
        <div>
          Browser not Supported. 
        </div>
      );
    }
    
  }
}

export default App;

//<Provider store={store}> </Provider>