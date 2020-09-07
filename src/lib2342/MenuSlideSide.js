import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../store/Util'
import Icons from './Icons'



const HandlenavTabIndex = (i,setEditingSection,props) => {
  setEditingSection(i);
  if(typeof props.updFiltersTab === "function"){      
    props.updFiltersTab(i)
  }
}


const HandleSettingTabIndex = () => {
  
}



let settingsBottom = []


const MenuSlideSide = (props) => {
  
  var _Id = "rty453";
  const [ collapsed, setCollapsed ] = useState(true);
  const [ section, setSection ] = useState(0);
  const [ navtabIndex ] = useState(false);
  

  let dashboardList = [];

  const {options} = props;
/*
  let options = [
    {label:'list',icon:'analytics', visible:true },
    {label:'add',icon:'dashboard', visible:true},
    {label:'sub department',icon:'filter', visible:true },
  ]

*/

  return (
    <div className="container_left_menu var_left" ytcp-navigation-drawer={`${true}`} matterhorn={`${true}`} collapsed-nav={`${collapsed}`} content-section={`${_Id?'editing':'dashboard'}`} >
                
    <nav className="ytcp-navigation-drawer">
    <div className="nav_goBack">
    {_Id?
      <span   className={`-navigation_drawer_button_ ${collapsed?'rotateArrow':''}`} onClick={()=>setCollapsed(!collapsed)}> 
        <Icons name={'arrowBack'} color={'#1967d2'} size={24}/>                                
      </span>
    :null
    }
    </div>
    
    <div className={`top-section_edit sync-on-transition  ytcp-navigation-drawer`}>
    {_Id? <div id="main-menu" className=" ytcp-navigation-drawer">
      {options.map((op,in_6)=>{
        if(op.visible){
          return(
            <div track-click="" 
              className="-navigation_drawer_items" 
              role="none" 
              key={`menu-item-${in_6}`}  
              is-active={`${section===in_6}`}  
              onClick={()=>HandlenavTabIndex(in_6,setSection,props)}
              >
              <span  className="menu-item-link  ytcp-navigation-drawer" id={`menu-item-${in_6}`}>                          
                <div role="button" tabIndex="-1" className="-navigation_drawer_button_">
                  <div id="contentIcon" className="content-icon  paper-icon-item">                          
                    <Icons name={op.icon} color={'#1967d2'} size={24}  tooltip={props.tooltip?collapsed?op.label:false:false}/>                                
                  </div>
                  <div className="nav-item-text">
                    {op.label}
                  </div>
                </div>                       
                </span>
            </div>
          )
        }else{
          return null;
        }
        
      })}
        
      </div>
      :null}
    </div>

    <div className={`top-section sync-on-transition  ytcp-navigation-drawer`}>
    {<div id="main-menu" className=" ytcp-navigation-drawer">
      {dashboardList.map((op,in_6)=>{
        if(op.visible){
          let path2 = {pathname: '/search'} || op.href;
          return(
            <div track-click="" className="-navigation_drawer_items" role="none" key={`menu-item-${in_6}`}  is-active={`${navtabIndex===in_6}`}  
            onClick={()=>HandleSettingTabIndex()}>
              <span   className="menu-item-link  ytcp-navigation-drawer" id={`menu-item-${in_6}`}>                          
                <div role="button" tabIndex="-1" className="-navigation_drawer_button_">
                  <div id="contentIcon" className="content-icon  paper-icon-item">                          
                    <Icons name={op.icon} color={'#1967d2'} size={24} tooltip={'op.label'}/>                                
                  </div>
                  <div className="nav-item-text">
                    {op.label}
                  </div>
                </div>                       
                </span>
            </div>
          )
        }else{
          return null;
        }
        
      })}
        
      </div>
      }
    </div>
    
    <div  className="bottom_section" >
     {/*<hr clclassNameass="divider"/> */} 
      <div id="main-menu" className=" ytcp-navigation-drawer">
      {false &&  settingsBottom.map((op,in_6)=>{
        if(op.visible){
          return(
            <div track-click="" className="-navigation_drawer_items" role="none" key={`menu-item-${in_6}`}  onClick={this.HandleSettingTabIndex.bind(this,in_6,op.label)}>
              <a className="menu-item-link  ytcp-navigation-drawer" id={`menu-item-${in_6}`}>                          
                <div role="button" tabindex="-1" className="-navigation_drawer_button_">
                  <div id="contentIcon" className="content-icon  paper-icon-item">                          
                    <Icons name={op.icon} color={'#1967d2'} size={24}/>                                
                  </div>
                  <div className="nav-item-text">
                    {op.label}
                  </div>
                </div>                       
                </a>
            </div>
          )
        }else{
          return null;
        }                      
      })}                      
      </div>
    </div>
    </nav>
    <style>
      {txt_styles}
    </style>
  </div>  
  ) 
}

export default MenuSlideSide




const txt_styles = `


.container_left_menu  nav {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-right: 1px solid var(--ytcp-black-1);
  overflow: hidden;
 /*height: 100vh;*/
}


.container_left_menu ul{
  display: block;  
  list-style-type: none;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}



.menu-item-link {
  display: block;
  outline: none;
  padding: 1px 1px;
  text-decoration: none; 
  margin-left: 2px;
  border-left: 5px solid transparent;
  width: calc(100% - 7px);
}

.-navigation_drawer_button_ {
  white-space: var(--ytcp-font-yt-title1_-_white-space);
  overflow: visible;
  text-overflow: var(--ytcp-font-yt-title1_-_text-overflow);
  font-family: 'YT Sans', 'Roboto', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  color: var(--ytcp-black-secondary);
  padding: 0 24px 0 16px;
  cursor: pointer;
  min-height: 48px;
  --paper-item-selected-weight: normal;
  display: flex;  
  outline: none;

}


.-navigation_drawer_button_ svg{
  transform: rotate(0deg);
  -webkit-transition: transform .6s ease;
  /*, fade-in .6s ease-out forwards, enter-text .6s forwards;*/
  transition: transform .6s ease;
}


.container_left_menu{
  /* position: fixed; */
}


.-navigation_drawer_items{
  list-style-type: none;
}





.content-icon svg{
  fill: var(--ytcp-black-55) ;
}



.container_body2 {
 overflow: auto;
  display: flex;
  flex: 1;
  position: relative;
}


.container_left_menu{ 
  margin: 5px 0 0;
  
  background-color: var(--ytcp-white-primary);
  width: var(--navigation-drawer-expanded-width);
  transition: var(--navigation-drawer-expand-transition), var(--theme-transition);  
}




[collapsed-nav="true"].container_left_menu {
  width: var(--navigation-drawer-collapsed-width);
  transition: var(--navigation-drawer-collapse-transition);
  --collapsed-nav-width_body: var(--navigation-drawer-expanded-width);
}



.container_body {
  --body-expanded-width: 280px;
  width: calc(100% - var(--body-expanded-width));
  margin-left: var(--body-expanded-width);
  
  /*
  overflow-X: hidden;
  overflow-y: scroll;
  max-height: 98vh;
  */
  
 }


 .container_body::-webkit-scrollbar {
  width: 8px;
}

.container_body::-webkit-scrollbar-thumb {
  background: #888; 
  height: 56px;
}



.all-pages {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 0;
  z-index: 0;
}


.-navigation_drawer_button_ .content-icon{
  padding: 8px 0 0; 
}



.nav-item-text {
  transition: var(--menu-labels-expand-transition);
}



.nav-item-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 8px 0 0 30px;
}


.nav-item-text {
  text-transform: capitalize;
  color: var(--ytcp-black-55);
}


[collapsed-nav="true"] .nav-item-text{
  opacity: 0;
  transition: var(--menu-labels-collapse-transition);
}


.nav-item-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-item-text {
  transition: var(--menu-labels-expand-transition);
}




[is-active="true"] .menu-item-link{
  border-left: 5px solid var(--color-base--hover,#1a73e8);
  width: calc(100% - 7px);
}


[is-active="true"] .menu-item-link svg{
  fill: var(--color-base--hover,#1a73e8);  
}

[is-active="true"] .nav-item-text{
  color: var(--color-base--hover,#1a73e8);  
}


.top-section, .top-section_edit{
  opacity: 0;
  transition-delay: 0.61s; 
  -webkit-transition: opacity .6s ease;
  /*, fade-in .6s ease-out forwards, enter-text .6s forwards;*/
  transition: opacity .6s ease;
  max-height: 0px;
}



.top-section::-webkit-scrollbar {
  width: 8px;
}

.top-section::-webkit-scrollbar-thumb {
  background: #888; 
  height: 56px;
}

.top-section_edit::-webkit-scrollbar {
  width: 8px;
}

.top-section_edit::-webkit-scrollbar-thumb {
  background: #888; 
  height: 56px;
}

/*

.top-section::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

.top-section::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
*/


.nav_goBack{
  opacity: 0;
  transition-delay: 0.61s; 
  -webkit-transition: opacity .6s ease;
  transition: opacity .6s ease;
  max-height: 0px;
}

.nav_goBack .-navigation_drawer_button_ svg{
  fill: var(--ytcp-black-55);
}

[content-section="editing"] .top-section_edit{
  opacity: 1;
  transition-delay: 0.61s; 
  -webkit-transition: opacity .6s ease;
  /*, fade-in .6s ease-out forwards, enter-text .6s forwards;*/
  transition: opacity .6s ease;
  max-height: 500px;
}






[content-section="dashboard"] .top-section {
  opacity: 1;
  -webkit-transition-delay: 0.61s;
  transition-delay: 0.61s;
  -webkit-transition: opacity .6s ease;
  transition: opacity .6s ease;
  max-height: 500px;
}










[content-section="editing"] .nav_goBack{
  opacity: 1;
  transition-delay: 0.61s; 
  -webkit-transition: opacity .6s ease;
  /*, fade-in .6s ease-out forwards, enter-text .6s forwards;*/
  transition: opacity .6s ease;
  max-height: 500px;  
  padding-top: 20px;
}






.top-section, .top-section_edit {
  padding: 5px 0 0;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1 1 auto;
}



.bottom_section {
  overflow: hidden;
  flex: 0 0 auto;
  padding-bottom: 8px;
}


.divider {
  width: 100%;
  margin: 0;
  margin-bottom: 8px;
  border: 0;
  border-bottom: 1px solid var(--ytcp-black-1);
}



.bottom_section ul{
  display: block;  
  list-style-type: none;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}




.var_left{
  --ytcp-white-primary:rgb(255,255,255);
  --ytcp-black-1:rgba(0,0,0,0.12);
  --ytcp-black-32:rgba(0,0,0,0.32);
  --ytcp-black-55:rgba(0,0,0,0.55);
  --menu-labels-expand-transition: opacity 300ms cubic-bezier(0.0, 0.0, 0.2, 1) 117ms;  
  --menu-labels-collapse-transition: opacity 300ms cubic-bezier(0.0, 0.0, 0.2, 1) 167ms;
  --navigation-drawer-collapse-transition: width 250ms cubic-bezier(0.0, 0.0, 0.2, 1) 167ms;
  --transition-make-default-button-hide: 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
  --navigation-drawer-expand-transition: width 250ms cubic-bezier(0.0, 0.0, 0.2, 1) 117ms;
  --navigation-drawer-expanded-width: 180px;
  --navigation-drawer-collapsed-width: var(--collapsed-nav-width, 72px);
  --theme-transition: background-color 250ms linear;
}




.-navigation_drawer_button_.rotateArrow svg{
  transform: rotate(180deg);
}



._operationsWrp_ 
.nav-item-text {
  margin-top: 6px;
  font-family: 'YT Sans', 'Roboto', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  padding: 8px 0 0 3px;
}


`