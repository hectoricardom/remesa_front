

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as commonActions from '../state/commonActions';

import * as Util from '../state/Util';
import Watch from './watch';





class HrmPlayer extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
    };
  }
  
  componentDidMount(){    
    this.props.commonActions.setPath('/watch');
  }

  render() {
    console.log(DialogHRM)
    return(
      <div className="">
        <Watch/>   
        <DialogHRM/>            
      </div>
    )
  }
}

function mS2P1(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded    
  };
}

function mD2P1(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

const Wtc3235 = connect(mS2P1, mD2P1)(HrmPlayer);


/*

import Main from './main';
import SearchContainer from './search-container';
import Header from './headers';
import AddForm from './addForm';
import TitleDetails from './title-details';
import LoadingColorSpinner from './Icons/LoadingColorSpinner';
import { withRouter,Switch,Route,NavLink} from 'react-router-dom';



class DashBoard extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
    };
  }
  
  componentDidMount(){    
    this.props.commonActions.setPath('/');
  }

 
  render() {    
    return(
      <Main data={this.props.initdata} img_list={this.props.imageList} />      
    )
  }
}

function st_DsB3235(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded, 
    initdata:state.common.initdata,
    imageList:state.common.imageList,
    
  };
}

function dp_DsB3235(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

const DsB3235 = withRouter(connect(st_DsB3235, dp_DsB3235)(DashBoard));






class Search extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
    };
  }
  
  componentDidMount(){    
    this.props.commonActions.setPath('/search');
  }


  render() {    
    return(
      <SearchContainer data={this.props.search} img_list={this.props.imageList}/>      
    )
  }
}

function st_shQrB76243(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded, 
    search:state.common.search,
    imageList:state.common.imageList,
    
  };
}

function dp_shQrB76243(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

const shQrB76243 = withRouter(connect(st_shQrB76243, dp_shQrB76243)(Search));




class HeaderContainer extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
    };
  }
  
  componentDidMount(){    
    this.props.commonActions.setPath('/');
    this.OnChange = this.OnChange.bind(this)
  }

  OnChange(v){
    if(v.length>1){
      this.props.history.push(`/search?q=${v}`)
      var searchQuery = {id:v,limit:50,page:1,sortBy:'createdAt.desc'};
      this.props.commonActions.searchVideos(searchQuery)
    }
  }

  Close(){
    this.props.commonActions.UpdateForm('querys','search',''); 
  }

  render() {    
    return(
      <Header OnChange={this.OnChange.bind(this)} Close={this.Close.bind(this)}/>    
    )
  }
}

function st_hdr6843(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded, 
    search:state.common.search,
    imageList:state.common.imageList,
    
  };
}

function dp_hdr6843(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

const Hdr6843 = withRouter(connect(st_hdr6843, dp_hdr6843)(HeaderContainer));







class AddFormContainer extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
    };
  }
  
  componentDidMount(){    
    this.props.commonActions.setPath('/add');
    this.OnChange = this.OnChange.bind(this)
  }

  OnChange(v){
    if(v.length>1){
      //this.props.history.push(`/search?q=${v}`)
      var searchQuery = {id:v,limit:50,page:1,sortBy:'createdAt.desc'};
      this.props.commonActions.searchVideos(searchQuery)
    }
  }

  Close(){
    this.props.commonActions.UpdateForm('querys','search',''); 
  }

  render() {    
    const {genre} = this.props;
    return(
      <AddForm genre={genre} img_list={this.props.imageList} />    
    )
  }
}

function st_addfC9784(state, ownProps) {
  return {       
    search:state.common.search,
    imageList:state.common.imageList,
    genre:state.common.genre,

  };
}

function dp_addfC9784(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

const AddfC9784 = withRouter(connect(st_addfC9784, dp_addfC9784)(AddFormContainer));


*/


/*


class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      route_list : [],
      setting:false,
      badUser:false
    };
  }



  componentWillMount(){  
    this.resize = this.resize.bind(this);
    window.addEventListener('resize',this.resize);
    Util.getFingerPrint().then(fps=>{
      window.localStorage.setItem('fpXb',fps);
    })
    console.log('getHlsSDK')
    
  }

  componentWillUnmount(){
    window.removeEventListener('resize',this.resize);
  }

  componentDidMount(){
    this.props.commonActions.LoadData();
  }

  resize(e){
    if(this.props.commonActions){
      this.props.commonActions.ScreenSize(window.outerWidth);
    }   
  }

 

  render() {
    if(this.props.appLoaded){
      return (
        <div className="App"> 
        <Hdr6843/>
         <Switch>
            <Route exact path="/" component={DsB3235} />              
            <Route path="/watch" component={Wtc3235} /> 
            <Route path="/title" component={TitleDetails} />
            <Route path="/search" component={shQrB76243} />
            <Route path="/add" component={AddfC9784} />             
          </Switch>
        </div>
      );
    }
    else{
      return (<LoadingColorSpinner/>)
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded    
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));



https://lh3.googleusercontent.com/zCFM0nwF5L0bMNBojS6hlDbVeR6-_QOTH_E91okzw2XGukkFenzuYl1TWMiH9lU3QB41HwGsZdBNSs3DC8PAwlPFMscBXaejHLSisAQ10OFwZBWXUgMW-pRGFPhUnBGAdeXDAf9R_MzVAl-Cadu-Vx_QbMdAar9wr5PN79wD7xGj7FnRx6B29DOHTfSiHGPlfVM6AXV_ayWTW9IMZV2qg9Yptgx8DRJ6wIbfGzHyngFF0T2fXxqfdkkDZzm98muKNM-Mqqwuliva3EAWBsq-ivXAsAk2tl5t_rnGX0HUti_YXkuDcuEDPtuQV6WYZpZTH9OBRVR0vrSuwCn6AQBMmoXS9LuaobLwqKC_IhO6CXhqaDWnY9yxtxxjKS7yyUkCrQLqgOyZqIvnp_ucNAHoA2px9ZrYcAj-q0Jp3dwd2mOdxlQgFfFd86bocj7e3smrh8Z_BCXUNJEsWFC4rosWIKI24thBloy4BU6F5EOYD-h7XUbH66abnzefTO_2DQbml-hJe85AiFCBH1OphzQOmlMgK_d3odaXjr80KhY0Xt2dpSrMPucHL98pEsyDWrGcuQ6ABWhOkhvnFsYSWGBS_rLRQMDSw6FjwP6vjj6Z8o198SK7Jymjz6AJRwd0DMK1f4-wfd5HMExsKH-xOSXPBdZVAZ484jh3qF1oZR0l8U4d3fA8cX4_ZO2PJZLZnM20xLC-Ae3xVV7a1lxN-cSc3yYt=w600-h315-k-no-m22


https://lh3.googleusercontent.com/zCFM0nwF5L0bMNBojS6hlDbVeR6-_QOTH_E91okzw2XGukkFenzuYl1TWMiH9lU3QB41HwGsZdBNSs3DC8PAwlPFMscBXaejHLSisAQ10OFwZBWXUgMW-pRGFPhUnBGAdeXDAf9R_MzVAl-Cadu-Vx_QbMdAar9wr5PN79wD7xGj7FnRx6B29DOHTfSiHGPlfVM6AXV_ayWTW9IMZV2qg9Yptgx8DRJ6wIbfGzHyngFF0T2fXxqfdkkDZzm98muKNM-Mqqwuliva3EAWBsq-ivXAsAk2tl5t_rnGX0HUti_YXkuDcuEDPtuQV6WYZpZTH9OBRVR0vrSuwCn6AQBMmoXS9LuaobLwqKC_IhO6CXhqaDWnY9yxtxxjKS7yyUkCrQLqgOyZqIvnp_ucNAHoA2px9ZrYcAj-q0Jp3dwd2mOdxlQgFfFd86bocj7e3smrh8Z_BCXUNJEsWFC4rosWIKI24thBloy4BU6F5EOYD-h7XUbH66abnzefTO_2DQbml-hJe85AiFCBH1OphzQOmlMgK_d3odaXjr80KhY0Xt2dpSrMPucHL98pEsyDWrGcuQ6ABWhOkhvnFsYSWGBS_rLRQMDSw6FjwP6vjj6Z8o198SK7Jymjz6AJRwd0DMK1f4-wfd5HMExsKH-xOSXPBdZVAZ484jh3qF1oZR0l8U4d3fA8cX4_ZO2PJZLZnM20xLC-Ae3xVV7a1lxN-cSc3yYt=w600-h315-k-no-m37


*/
