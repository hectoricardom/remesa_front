import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import RippleHRM from '../RippleHRM';
import ResizeParentObserve from '../resizeParentObserve';
import { Link } from 'react-router-dom';
import './style.css';

import * as Util from '../../state/Util';

class TabsHRM extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible:false,
      widthList:[],
      screen_size:0,
      index:0
    };
  }



  componentWillMount(){  
    
    this.UpdateIndex = this.UpdateIndex.bind(this);
    this.TabIndicator = this.TabIndicator.bind(this);
  }

  componentDidMount(){ 
    var _th = this; 
    setTimeout(()=>{
      _th.setState({index:_th.props.initValue});
      this.TabIndicator();
    },25);
  }

  TabIndicator(){
    var els = document.querySelectorAll('[data-item]'); 
    var listTabH = [],sumTH = 0;
    for(var ss =0;ss<els.length;ss++){
      var hh =els[ss].getBoundingClientRect().width;
      if(hh<200){
        listTabH.push({l:sumTH,w:hh});
        sumTH+=hh; 
      }     
    }
    this.setState({widthList:listTabH});
  }


  UpdateIndex(i){
    this.setState({index:i});
    this.TabIndicator();
    if(typeof this.props.UpdateIndex === "function" ){
      this.props.UpdateIndex(i);
      if(window.outerWidth<=600){
        //Util.scrollgsap(160);
      }    
    }
  }



  ref = r => {
    this.SM = r
  }

  ref_tab = r => {
    this.tabs = r
  }

  render() {
      const {screen_size, pth, query, data} = this.props;
      if(screen_size!==this.state.screen_size){
        this.TabIndicator();
        this.setState({screen_size:screen_size});
      }      
      let hashLocation = window.location && window.location.hash;
      let hashLocationQuery = hashLocation && hashLocation.split('?')[1]? hashLocation.split('?')[1]:'';
      var s = Util.parseQuery(hashLocationQuery);      
      let ifQuery = hashLocationQuery?true:false;      
      var indcatorSize = this.state.widthList?this.state.widthList[this.state.index]:null;
      var tabIndicator = {width: `0px`, left: `0px`};
      if(indcatorSize){
        tabIndicator = {width: `${indcatorSize.w}px`, left: `${indcatorSize.l}px`}
      }      
      return (          
            <div className="c-tabs-nav " data-active-item="1" data-default-key="0" data-c-tabs-nav="" data-ca-category="device-tray">
              <div className="center_Tab_Nav_Items" role="tablist">
                <ResizeParentObserve sizehandler={this.TabIndicator.bind(this)}/>
                { data.map((tbI,i)=>{   
                  var color = 'var(--tab--nav-Color--)';
                  var activeClass = 'center_Tab_Nav_Item';
                  if(this.state.index===i){
                    color = 'var(--color-base--hover)';
                    activeClass = 'center_Tab_Nav_Item is-active';
                  }     

                    var tlr =`/${pth}`;  
                    

                    let _qry2 = ``
                    if(ifQuery){
                      _qry2 = `?`;
                      s[query] = tbI;
                      Object.keys(s).map((_k,_i)=>{
                        if(_i>0){
                          _qry2 += `&`
                        }
                        _qry2 += `${_k}=${s[_k]}`
                      })
                    }
                    else{
                      _qry2 = `?tb=${tbI}`;
                    }
                    return(   
                      <Link to={{ pathname: tlr,search:`${_qry2}` }} className={activeClass} key={`${tbI}---${i}`}>                                  
                        <div  data-item={i} className="presentation" onClick={()=>this.UpdateIndex(i)} key={i}>
                        <RippleHRM/>     
                          <a className="center_Tab_Nav_Link" role="tab"  data-tab-index={i}>                        
                            {Util.translateTxt(tbI)}
                          </a>
                        </div>
                      </Link>     

                      )
                  })
                }                         
              </div>
              <span id="header-tabs-nav__indicator" className="c-tabs-nav__indicator" style={tabIndicator}></span>
            </div>  

        );
     
  }  
}


function mapStateToProps2t2(state, ownProps) {
  return {       
    screen_size: state.common.screen_size,
  };
}
function mapDispatchToPropst2(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps2t2,mapDispatchToPropst2)(TabsHRM);