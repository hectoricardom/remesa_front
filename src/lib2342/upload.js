

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../store/redux'

import { useSelector, useDispatch } from 'react-redux'

import { SearchVideos, VideoFiles } from '../../actions/videos'
import { loadHLSdataByUrl  } from '../lib/common'

import * as _Util from '../../store/Util'
import Icons from '../Icons'


import { withRouter} from 'react-router-dom';

import { OpenModal } from '../../actions/common'




import DialogVideoFile from '../operations/dialogVideoFile'



import DialogVideoUpload from '../operations/dialogVideoUpload'

import DeleteVideoFile from '../operations/deleteVideoFile'



import InputText from '../InputText';

import BTNHRM from '../btns_confirm';

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();



  const updKV= (k,v) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:k,value:v}
    })  
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:"observeChanges",value:_Util.gen12CodeId()}
    })  
  }

  

  
  const updForms= (form,field,v) => {
    let _forms = forms;
    if(!_forms[form]){
      _forms[form] = {};
    }
    _forms[form][field] = v;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })   
  }

  const _getVideosSearch = (q,operation) => {
    SearchVideos(q, dispatch,  operation);
  }

  const _getVideoFiles = (q,operation) => {
    VideoFiles(q, dispatch,  operation);
  }

  

const OpenUploadVideo = (i, _ID) => {
  let data = {};
  data['zIndex']=150;
  data['observeResize']=true;
  data['props']={title:"", id: _ID, item:i};
  data['content'] = DialogVideoUpload; 
  //console.log(data)
  OpenModal(dispatch,data);
}


const OpenOptions = (items, _ID) => {

  let data = {};
  data['zIndex']=150; 
  data['observeResize']=true;   
  data['props']={title:"Options", id: _ID, item:items};
  data['content'] = DialogVideoFile; 
  //console.log(data)
  OpenModal(dispatch,data);
}



const RmvOptions = (items, _ID) => {

  let data = {};
  data['zIndex']=150; 
  data['observeResize']=true;   
  data['props']={title:"Borrar Archivo", id: _ID, item:items};
  data['content'] = DeleteVideoFile; 
  //console.log(data)
  OpenModal(dispatch,data);
}



  const _openPlayer = (item) => {
    let bookmarkPositionID = item && item["bookmarkPosition"]  && item["bookmarkPosition"]["id"];
    loadHLSdataByUrl(item["id"], dispatch, updKV,null,bookmarkPositionID);
    //_state["route_history"].push({pathname:`/player`,search:`?v=${item["id"]}` });
}



  return { 
    observeChanges, 
    forms, 
    updForms, 
    updKV,
    RmvOptions,
    OpenUploadVideo,
    OpenOptions,
    _openPlayer,
    _getVideoFiles,
    _getVideosSearch
  }
}






  let lastSearch = 0;

  const handleSearch= (e,operationType,_searchProducts) => {
  let _now = (new Date()).getTime();
      lastSearch = _now;
      let _q_ = e;
      setTimeout(()=>{
        if(_now-lastSearch>=0){         
          _searchProducts(_q_, operationType);
        }
      },500)
     return true;
  }
  
  


  


const OperationComponent = (props) => {
  const {
    observeChanges,
    OpenUploadVideo,
    OpenOptions,
    RmvOptions,
    _getVideoFiles,
    _getVideosSearch,
    _openPlayer
  } = useObserveChanges();



  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;


  
  let fileVideoSearch = _state["fileVideoSearch"];

  const [initialize, setInitialize] = useState(false);  

  const [view, setView] = useState(0);

  
 
  // console.log(router)
  useEffect(() => {
    if(!initialize){
      setInitialize(true);
      _getVideosSearch("taxi","videoSearch");
      setTimeout(()=>{
        setView(1);
      },500)
    }
  });
 
  

    return (
      <>
    
       <div className={` whiteTheme`}>
        <div className={`_dsplFlx _operationsWrp_`}>
          <div  className={` _wrpSld_ `}>
            <div className={` ${view===1 && 'visible'}`}>
            {view=== 1 && 
              <div>
                <div className={'_dsplFlx _desktopV '} >
                  <div className="flexSpace"/>  
                  <div className={' wrpActionFiles '} > 
                    <div className={'_dsplFlx  '}  style={{margin:'20px', width:"90%"}}>
                      <span onClick={()=>OpenUploadVideo()}>
                        <BTNHRM theme={`light_blue`} title={'Subir Archivo Video'}/>
                      </span>                      
                    </div>
                    <div className={`fieldPadding`}>
                      <InputText 
                        icon={`search`} 
                        form={'fileVideoSearch'} 
                        field={`search_file`}                  
                        placeholder={`buscar archivo video`}
                        OnChange={(e)=>handleSearch(e, "fileVideoSearch", _getVideoFiles)} 
                      />
                    </div> 
                  </div>
                  <div className="flexSpace"/>  
                </div>
                
                <div className={' htWpr_d8  '}>
                {
                  fileVideoSearch && _Util.ObjectKeys(fileVideoSearch).map(fV=>{
                    let slc = fileVideoSearch[fV];
                    /// console.log(slc)
                    return (
                      <div  className={'_dsplFlx roWTd  showActions '} key={_Util.gen12CodeId()}>
                         <div className={'coLTd flxbsc20 _ellipsis _total2 '}  >
                            <div  className={'locations _link_ '}> {slc && slc['id'] && slc['id']}</div>
                        </div>
                        <div className={'coLTd flxbsc40 _ellipsis _total2 '} onClick={(e)=>_openPlayer(slc)} >
                            <div  className={'locations _link_ '}> {slc && slc['originalFile'] && slc['originalFile']['name']}</div>
                        </div>
                        <div className="flexSpace"/>  
                        <div className={'coLTd flxbsc10 _total2 '}>
                            <div  className={'locations _link_'}> {slc && slc['originalFile'] && slc['originalFile']['type']}</div>
                        </div>
                        <div className="flexSpace"/>  
                        <div className={'_dsplFlx flxbsc30'}>
                            <div onClick={()=>OpenOptions(slc,fV)}>
                                  <Icons 
                                    name={'setting'} 
                                    color={'#555'} 
                                    size={24}  
                                    //tooltip={'configuracion'}
                                    extraClass={`view`}
                                  />
                                </div>
                              <div className={'_spaceMrg_'}/>
                              <div onClick={()=>RmvOptions(slc,fV)}>
                                <Icons 
                                  name={'outline_delete'} 
                                  color={'#555'} 
                                  size={24} 
                                  // tooltip={'delete'}
                                  extraClass={'delete'}
                                />
                              </div>
                            </div>
                      </div>
                    )
                  })
                }
              </div>
              </div>
            }
            </div>
          </div>
        </div>
        </div>
        <style>
          {dep_style}
        </style> 
      </>
    );
  
}  


export default withRouter(withRedux(OperationComponent))


const dep_style = `



._dsplFlx{
  display:flex;
}

.flexSpace{
  flex-basis: 0.000000001px;
  flex: 1 1;
}


._wrpView_{
  opacity: 0;
  -webkit-transition: opacity .16s ease;
  transition: opacity .16s ease;
  transition-delay: 0s; 
  max-height: 0px;
}


.wrpActionFiles{
  margin: 15px 45px 15px 0 ;
}

.wrpActionFiles .btnActionFiles{
  margin-bottom: 25px;  
}


._wrpSld_{
  width: 95%;
}


.htWpr_d8{
  width: 75%;
  margin: 15px auto;
}

._upload_video_{
  padding: 0;
  position: relative;
  border: 1px dashed  #7d7d7d;
  border-radius: 13px;
  width: 95%;
  margin: 0 2%;
}

.upload__Link{
  opacity: 0;
  -webkit-transition: opacity .16s ease;
  /*, fade-in .6s ease-out forwards, enter-text .6s forwards;*/
  transition: opacity .16s ease;
  transition-delay: 0s; 
  max-height: 0px;
  padding: 0;
}


._upload_video_ input{
  opacity: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 35;
  top: 0;
  left: 0;
}

._upload_video_ svg{
  fill:  #7d7d7d;
}
._upload_video_ span{
  font-family: Dosis,sans-serif;
  font: 500 15px/19px "Roboto","Arial","Open Sans",sans-serif;
  color:  #7d7d7d;
}



 ._wrpView_.visible { 
  opacity: 1;
  max-height: 500px;
  transition-delay: 0.61s; 
  -webkit-transition: opacity .46s ease;
  /*, fade-in .6s ease-out forwards, enter-text .6s forwards;*/
  transition: opacity .6s ease;
  padding: 152px 0;
}





.roWTd{
  background-color: var(--gm-hairlinebutton-state-color,transparent);
  border:none;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  transition:background-color 15ms linear;
  height: 48px;
  margin: 2px;  
}

.roWTd:hover{
  background-color: var(--gm-hairlinebutton-state-color,rgba(0,0,0,0.042));
}



.coLTd{
  text-align: left;  
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .875rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  margin: 7px 7px 2px;
}

.flxbsc5{
  flex-basis: 5%;
  justify-content: flex-end;
}
.flxbsc10{
  flex-basis: 10%;
  justify-content: flex-end;
}

.flxbsc20{
  flex-basis: 20%;
  justify-content: flex-end;
}

.flxbsc30{
  flex-basis: 30%;
  justify-content: flex-end;
}
.flxbsc40{
  flex-basis: 40%;
  justify-content: flex-end;
}

.flxbsc60{
  flex-basis: 60%;
  justify-content: flex-end;
}

.flxbsc80{
  flex-basis: 80%;
  justify-content: flex-end;
}


.synopsis_wrp{
  max-width: 55%;
}


.synopsis{
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}




._actions_Wrp_{   
  display: none;
}

._actions_Wrp_
._actions_Btns_{
   --animation_param: .1s ease;
    opacity: 0;
    width: 100px;
    display: flex;
    -webkit-transition: opacity .1s ease;
    transition: opacity .1s ease;   
}

._actions_Wrp_
._actions_Btns_{
  padding: 6px 0 0 6px;
}

.showActions:hover
._actions_Wrp_{   
  display: flex;
}



.showActions:hover
._actions_Wrp_
._actions_Btns_{
  opacity: 1;
}

.showActions:hover
.hide_when_action{   
  display: none;
}

.coLTd,
._link_{
  color: #515151;
  color: #3c3c3c;
  font: 600 14px/17px Roboto,sans-serif;
}






`




















