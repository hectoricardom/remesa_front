import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions from '../../state/dialogActions';
import * as commonActions from '../../state/commonActions';

import * as Util from '../../state/Util';
import WithScroll from '../scroll-decorator';
import './style.css';



class LazyImage extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,      
    };
  }
  componentDidMount() {  
    this.scrollhandler(0)
  }  

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  

  


  ref = r => {
    this.MS_Elem = r
  }

  scrollhandler(sc){   
    var _th6 = this;   
    const {src } = _th6.props; 
    if(!_th6.state.visible){
      var dm = this.MS_Elem.getBoundingClientRect();
      var _top = dm.top+130;
      if(_top>=sc && _top<=(sc+window.innerHeight)){
        commonActions.getThumbnail(src)
        _th6.setState({visible:true}) 
      }
    }
    
  }


  render() {  
    var _th6 = this;   
    const { 
      thumbnailJsonBlob,
      thumbnailJsonBlobObserve,
      src
     } = _th6.props;
    var _src = _th6.state.visible?commonActions.getThumbnail(src):'';
    return (
            <div ref={this.ref}>
              <WithScroll scrollhandler={this.scrollhandler.bind(this)}/>       
              <img alt={''} src={_src}/>
            </div>
         )
  }
}


function mapStateToPropsDialog(state, ownProps) {
  return {
    thumbnailJsonBlob: state.common.thumbnailJsonBlob,
    thumbnailJsonBlobObserve : state.common.thumbnailJsonBlobObserve,
  };
}

function mapDispatchToPropsDialog(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToPropsDialog, mapDispatchToPropsDialog)(LazyImage);


/*
                    if(dlg.display){
                    StyleDlg = { opacity: 1, visibility: `visible`}
                    StyleOverlay={opacity: 1, visibility: `visible`};
                  }
                  */