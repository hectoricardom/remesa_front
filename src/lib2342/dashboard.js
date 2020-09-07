

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../store/redux'
import { useSelector, useDispatch } from 'react-redux'

import { SearchVideos, VideoFiles, getUsers, UpdUser, } from '../../actions/videos'
import { OpenModal, getUploadConatiner, clearUploadConatiner, VideoFileUpload } from '../../actions/common'



import * as _Util from '../../store/Util'
import Icons from '../Icons'

import { withRouter} from 'react-router-dom';


import UploadComp from './upload'



import DeleteUser from '../operations/deleteUser'
import DialogVideoFile from '../operations/dialogVideoFile'
import DialogVideoUpload from '../operations/dialogVideoUpload'
import AddVideo from '../operations/AddVideo'

import AddUser from '../operations/AddUser'
import AddUserIPAllowed from '../operations/AddUserIPS'


import DeleteVideo from '../operations/deleteVideo'


import InputText from '../InputText';
import BTNH from  '../btns_confirm';

//import DropBtn from '../dropBtn';

import CheckBox from '../CheckBoxSlide'



import {IconSymbol} from '../Icons';
import TabsHRM from '../tabsHRM'



import '../_styles.css'

// import MenuSlideSide from '../components/MenuSlideSide';

const operationType = 'departments'
let _options = [
  {label: 'upload', icon:'analytics', visible:true },
  {label: 'movies', icon:'analytics', visible:true },
  {label: 'video files', icon:'analytics', visible:true },
  {label: 'edition', icon:'analytics', visible:true }

]

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

  const _updUser = (doc) => {
    UpdUser(doc);
  }

  const _getVideosSearch = (q,operation) => {
    let params = {query:q}
    SearchVideos(params, dispatch,  operation);
  }

  const _getVideoFiles = (q,operation) => {
    VideoFiles(q, dispatch,  operation);

  }

  const _getUsersSearch = (q,operation) => {
    //VideoFiles(q, dispatch,  operation);
  }
  
  const _getUsers = (q,operation) => {
    getUsers(dispatch);
  }
  
  const _openPlayer = (item) => {
    let bookmarkPositionID = item && item["bookmarkPosition"]  && item["bookmarkPosition"]["id"];
   // loadHLSdataByUrl(item["netflixId"], dispatch, updKV,_state["keys"],bookmarkPositionID);
  //  _state["route_history"].push({pathname:`/player`,search:`?v=${item["id"]}` });
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
  data['height']=items.metadata.height<480?(items.metadata.height)*1+80:480;
  data['width']=(items.metadata.width)*1+80; 
  data['props']={title:"Options", id: _ID, item:items};
  data['content'] = DialogVideoFile; 
  //console.log(data)
  OpenModal(dispatch,data);
}



  const OpenPlayer = (items, _ID) => {

  }


  const _addVideo = (items, _ID) => {
    let data = {};
    data['zIndex']=150;
    data['observeResize']=true;
    // data['props']={title:"", id: _ID, items:items};
    data['content'] = AddVideo; 
    //console.log(data)
    OpenModal(dispatch,data);
  }


  const _addUser = (items, _ID) => {
    let data = {};
    data['zIndex']=150;
    data['observeResize']=true;
    data['props']={title:"", id: _ID, items:items};
    data['content'] = AddUser; 
    //console.log(data)
    OpenModal(dispatch,data);
  }
  

  const _addUserIPAllowed = (items, _ID) => {
    let data = {};
    data['zIndex']=150;
    data['observeResize']=true;
    data['props']={title:"", id: _ID, items:items};
    data['content'] = AddUserIPAllowed; 
    //console.log(data)
    OpenModal(dispatch,data);
  }


  const _rmvUser = (items, _ID) => {

    let data = {};
    data['zIndex']=150; 
    data['observeResize']=true;   
    data['props']={title:"Borrar Usuario", id: _ID, item:items};
    data['content'] = DeleteUser; 
    //console.log(data)
    OpenModal(dispatch,data);
  }
  



  const _rmvVideo = (items, _ID) => {

    let data = {};
    data['zIndex']=150; 
    data['observeResize']=true;   
    data['props']={title:"", id: _ID, item:items};
    data['content'] = DeleteVideo; 
    //console.log(data)
    OpenModal(dispatch,data);
  }

  return { 
    observeChanges, 
    _getUsersSearch, 
    forms, 
    updForms, 
    OpenUploadVideo,
    updKV,
    OpenPlayer,
    OpenOptions,
    _addVideo,
    _getVideoFiles,
    _addUser,
    _addUserIPAllowed,
    _getVideosSearch,
    _getUsers,
    _openPlayer,
    _updUser,
    _rmvUser,
    _rmvVideo
  }
}



const handleEdit = () => {


}


const dragOverHandler = () => {


}

const dropHandler = () => {


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
    _addUser,
    _addVideo,
    _getVideosSearch,
    _getUsers,
    _addUserIPAllowed,
    _updUser,
    _rmvVideo,
    _rmvUser
  } = useObserveChanges();

  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;



  const [initialize, setInitialize] = useState(false);

  const [uploadList, setUploadList] = useState(true);

  const [view, setView] = useState(0);
  const [tabIndex, setTabIndex] = useState(0); 


  

  const goDashboardView = (d) => {   
    props.history.push({pathname:`/dashboard-view`,search:`?v=${d}` });
    window.scrollTo(0,0)
 }


 const gotofiles = (d) => {   
  props.history.push({pathname:`/video_files`,search:`` });
  window.scrollTo(0,0)
}





const OnChangeCheckBox = (q, id) => {
  let nw = {id:id,active:q};
  _updUser(nw);
}







  // console.log(router)
  useEffect(() => {    
    if(!initialize){
      setInitialize(true);
      setTimeout(()=>{
        setView(1);
        _getUsers()
      },250)
      //_getVideosSearch("taxi","videoSearch");
    }
  });
  


let _uploadConatiner = getUploadConatiner();
let _uploadConatinerVideos = _uploadConatiner && _uploadConatiner["videosUpload"];

let uploading = _Util.ObjectKeys(_uploadConatinerVideos).length;
let uploadingfilesNumber = 0;
let uploadingfilesDone = 0;


_Util.ObjectKeys(getUploadConatiner()["videosUpload"]).map(d=>{  
  let _dd = _uploadConatinerVideos[d];
  if(_dd.done){
    uploadingfilesDone += 1;
  }else{
    if(_dd.progress<100 && _dd.progress>0){
      uploadingfilesNumber += 1;
    }
  } 
})




const handelClearUploadConatiner = () => {
  clearUploadConatiner({});
}

const abortUploadConatiner = (xhr) => {
  xhr.abort();
}

const sendUploadConatiner = (upl) => {
  VideoFileUpload(upl["url"],{},upl["file"]);
}




  const _tabs = ['videos','files', 'users'];
    return (
      <>
       <IconSymbol/>





        <div className={`mainView whiteTheme`}>
            <div className={`_wrpView2_ ${view && 'visible'}`}>




          {uploading ? 

            <div  className={`uploadProgressContainer ${uploading?"active":"active"}`} sty>
              <div  className={`wrp_upl`}>
                <div class="a-Cd-nm">
                  <div class="af">
                    <div class="af-uo">
                      <span class="af-V">{uploadingfilesNumber>0?`Subiendo ${uploadingfilesNumber} elemento${uploadingfilesNumber>1?"s":""}`:""} {uploadingfilesDone>0?`Se ha subido ${uploadingfilesDone} elemento`:""}</span>
                    </div>
                    <div class="af-Yi-j">
                      <div class="af-Yi">
                        <div class="h-sb-Ic h-R-d a-c-d"  onClick={()=>setUploadList(!uploadList)}> 
                          <Icons name={uploadList ?"key_arrow_up":'key_arrow_down'} ripple={true} />
                        </div>
                        <span>
                        {uploadingfilesNumber===0?
                          <div class="h-sb-Ic h-R-d a-c-d" onClick={()=>handelClearUploadConatiner()}>
                            <Icons name={'cancel'} ripple={true} />
                          </div>
                          :null}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {uploadList ? 
                <div class="a-Cd-oa">
                  {_Util.ObjectKeys(_uploadConatinerVideos).map((uplID,indUpl)=>{
                    let upl = _uploadConatinerVideos[uplID];
                    let progress = upl["progress"];
                    let isDone = upl["done"];
                    let cancelled = upl["cancelled"];
                    
                    let PercProgress = progress / 0.55;
                    let radius = 10;                    
                   
                    let perimeter = Math.round(Math.PI * radius * 2);
                    
                    let progstyle={
                      strokeDasharray:  [(progress/100)*perimeter,  perimeter],
                      strokeLinecap:"round"
                    }


                    return (
                        <div class="a-Cd-Ea-oa" style={{"--PercProgress":PercProgress+"deg"}}>
                          <div class="Ea-j z-Ea-Vd-ac Ea-Lj" role="group" tabindex={indUpl}>
                            <div class="Ea-oa Ea-G">
                              <div class="z-Ea-Qd">
                                <div class="z-Ea-r-dd" aria-hidden="true">
                                  <span class="z-Ea-r z-Ea-tf-r">                              
                                    {uplID}
                                  </span>
                                  <span class="z-Ea-r z-Ea-gj-r"> </span>
                                  {false && 
                                  <div class="z-Ea-ac">
                                    <div class="a-c-d">
                                      <div class="a-d-c">
                                        <Icons name={'cancel'} />
                                      </div>
                                    </div>
                                  </div> 
                                  }                           
                                </div>
                              
                                <div class="h-sb-Ic h-R-d a-c-d W-d" data-tooltip="Cancelar subida" aria-label="Cancelar subida: 49 MB/3 GB (1%)"  style={{"user-select":" none"}}>
                                  
                                
                                  {/*                                  
                                  <div class="a-d-c d-tf-c z-Ea-pd-c">
                                    <svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" focusable="false">
                                      <path class="a-s-fa-Ha-pa" fill="#000000" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10S17.5,2,12,2z M17,15.6L15.6,17L12,13.4L8.4,17L7,15.6l3.6-3.6   L7,8.4L8.4,7l3.6,3.6L15.6,7L17,8.4L13.4,12L17,15.6z"></path>
                                    </svg>
                                  </div>
                                 
                                */}
                                  <div class="a-f-n d-za a-f-wr-Wq" data-progress="1" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="1">
                                    {!isDone? 
                                      <>
                                       {cancelled ?
                                       <>
                                       <div class="abortUpl" onClick={()=>sendUploadConatiner(upl)}>
                                          <Icons name={'reload'} />
                                       </div>
                                       <div class="progressUpl" >
                                         <Icons name={'cancel5'} />
                                       </div>
                                       </>
                                       :
                                      <>
                                      <div class="abortUpl" onClick={()=>abortUploadConatiner(upl["xhr"])}>
                                          <Icons name={'cancel'} />
                                      </div>
                                      <div class="progressUpl" >
                                        <svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" focusable="false" style={{transform: "rotate(-90deg)",  transformOrigin: "center"}}>
                                            <circle class="circle-chart__circle" stroke="#4285f4" strokeWidth="4" fill="none" cx="12" cy="12" r="10"   style={progstyle} />
                                        </svg> 
                                      </div>
                                      </>
                                      }
                                      </>
                                      :
                                      <div class="doneSucces">
                                          <Icons name={'success'} />
                                      </div>
                                    }
                                    {/* 
                                    <svg>
                                      <circle cx="10" cy="10" r="10" fill="#ccc"></circle>
                                    </svg>
                                    <svg style={{transform: "rotate(-90deg)"}}>
                                      <circle cx="10" cy="10" r="10" fill="#4285f4"  style={progstyle}></circle>
                                    </svg>
                                    
                                    <div class="f-Jb">
                                     
                                      <div class="f-xa na">
                                        <div class="f-G">
                                          <svg>
                                            <circle cx="10" cy="10" r="10" fill="#4285f4"></circle>
                                          </svg>
                                        </div>
                                      </div>
                                     
                                      <div class="f-xa">
                                        <div class="f-G">
                                          <svg>
                                            <circle cx="10" cy="10" r="10" fill="#4285f4"></circle>
                                          </svg>
                                        </div>
                                        <div class="f-G ya">
                                          <svg><circle cx="10" cy="10" r="10" fill="#4285f4"></circle></svg>
                                        </div>
                                      </div>
                                     
                                    </div>
                                     
                                    <div class="f-Pn">
                                      <svg><circle class="a-s-fa-Ha-pa" cx="10" cy="10" r="7" fill="#FFFFFF"></circle></svg>
                                    </div>
                                    */}
                                  </div>
                                  {/*   
                                  <span class="z-Ea-f-r d-W-ga">
                                    <div>49 MB/3 GB (1%)</div>
                                  </span>
                                  
                                  */}
                              
                                </div>
                              
                              </div>
                            </div>
                          </div>
                        </div>
                    )
                  })}
                  
                </div>
                :null}
              </div>
            </div>
            :null
            }
            {view && 
            <div>             
             <div className={`_addMrgBtn`} style={{margin:'20px'}}>
             <TabsHRM data={_tabs}  UpdateIndex={(i)=>setTabIndex(i)}  pth={'inventory'} indexTab={tabIndex}/>
             <div className={`_wrpView2_ wdt100  ${tabIndex===0 && 'visible'}`}  style={{margin:'20px', width:"90%"}}>
              {tabIndex=== 0 ? 
              <div className={'_desktopV  '} >
               
              <div className={'_dsplFlx _desktopV '} style={{margin:'20px'}}>
                <div className="flexSpace"/>  
                  <div style={{marginRight:'30px'}}> 
                    <div className={`_addMrgBtn`} style={{marginBottom:'20px'}}>
                      <div className={'_dsplFlx  '}>                   
                        <div className="flexSpace"/>  
                        <span onClick={()=>_addVideo()}>
                          <BTNH theme={`light_blue`} title={'Agregar Video'}/>
                        </span>
                      </div>
                    </div>  
                    <div className={`fieldPadding`}>
                      <InputText 
                        icon={`search`} 
                        form={'videoSearch'} 
                        field={`search`}                  
                        placeholder={'Buscar Video'}
                        OnChange={(e)=>handleSearch(e, "videoSearch", _getVideosSearch)} 
                      />
                    </div>
                  </div>
                  <div className="flexSpace"/>  
                </div>
                
                <div className={' htWpr_d8  '}>
                {
                  _state["videoSearch"] && _Util.ObjectKeys(_state["videoSearch"]).map(fV=>{
                    let slc = _state["videoSearch"][fV];     
                    return (
                      <div  className={'_dsplFlx roWTd  showActions '} key={_Util.gen12CodeId()}>
                        <div className={'coLTd flxbsc40 _total2 '}   onClick={()=>goDashboardView(slc["id"])} >
                            <div  className={'locations _link_'}> {slc && slc['title']}</div>
                        </div>
                        <div className="flexSpace"/>  
                        <div className={'coLTd flxbsc10 _total2 '}>
                            <div  className={'locations _link_'}> {slc && slc['type']}</div>
                        </div>
                        <div className="flexSpace"/>  
                        <div className={'_dsplFlx flxbsc30'}>
                          <div className={'_dsplFlx  hide_when_action'}>                         
                            <div className={'coLTd  flxbsc5 _total2 '}>
                                <div  className={'locations _link_'}> {slc && slc['year']}</div>
                            </div>                         
                          </div>
                          <div className={'_actions_Wrp_'}>
                            <div className={'_actions_Btns_ flxbsc30'}>                             
                              <div className={``} onClick={()=>goDashboardView(slc["id"])} >
                                  <Icons 
                                    name={'outline_view'} 
                                    color={'#555'} 
                                    size={24}
                                    //tooltip={'details'}
                                    extraClass={'view'}
                                  />
                              </div>                           
                              <div className={'_spaceMrg_'}/>
                              <div onClick={()=>_rmvVideo(slc)}>
                                <Icons 
                                  name={'outline_delete'} 
                                  color={'#555'} 
                                  size={24} 
                                  //tooltip={'delete locations'}
                                  extraClass={'delete'}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              </div>
              :null
            
            }
          </div>
          <div className={`_wrpView2_ wdt100  ${tabIndex===1 && 'visible'}`}  style={{margin:'20px', width:"90%"}}>
              {tabIndex=== 1? 
                <div className={'_desktopV  '} >
                  <UploadComp/>
                </div>
                 :null
              }
          </div>
          <div className={`_wrpView2_ wdt100  ${tabIndex===2 && 'visible'}`}  style={{margin:'20px', width:"90%"}}>
              {tabIndex=== 2 ? 
                 <div className={'_desktopV  '} >
               
                 <div className={'_dsplFlx _desktopV '} style={{margin:'20px'}}>
                   <div className="flexSpace"/>  
                     <div style={{marginRight:'30px'}}> 
                       <div className={`_addMrgBtn`} style={{marginBottom:'20px'}}>
                         <div className={'_dsplFlx  '}>                   
                           <div className="flexSpace"/>  
                           <span onClick={()=>_addUser()}>
                             <BTNH theme={`light_blue`} title={'Agregar Usuario'}/>
                           </span>
                         </div>
                       </div>  
                      
                     </div>
                     <div className="flexSpace"/>  
                   </div>
                   
                   <div className={' htWpr_d8  '}>
                   {
                    _state && _state["usersList"] && _state["usersList"].map(slc=>{
                       // let slc = videoSearch[fV];
                       return (
                         <>
                          {slc && !slc['isAdmin'] && 
                         <div  className={'_dsplFlx roWTd  showActions '} key={_Util.gen12CodeId()}>
                           <div className={'coLTd flxbsc5 '} onClick={(e)=>{}} >                              
                           </div>
                            <div className="flexSpace"/>
                           <div className={'coLTd flxbsc60 _total2 '} onClick={(e)=>{}} >
                               <div  className={'locations _link_'}> {slc && slc['username']}</div>
                           </div>
                           <div className="flexSpace"/>
                           <div className={'_dsplFlx flxbsc30'}>
                             <div className={'_dsplFlx  hide_when_action'}>                         
                               <div className={'coLTd  flxbsc5 _total2 '}>
                                   <div  className={'locations _link_'}> {slc && slc['isAdmin']}</div>
                               </div>
                               <div className="flexSpace"/>  
                               <div className={'coLTd flxbsc5 _stock'}>
                                 <div  className={'__amount__ __gm2_text_'}> </div> 
                               </div>
                             </div>
                             <div className={'_actions_Wrp_'}>
                            
                               <div className={'_actions_Btns_ flxbsc30'}>                                    
                                 <div onClick={()=>_addUserIPAllowed(slc)}>
                                   <Icons 
                                     name={'setting'} 
                                     color={'#555'} 
                                     size={24}
                                     extraClass={'edit'}
                                   />
                                 </div>
                                 <div className={'_spaceMrg_'}/>
                                 
                                 <div onClick={()=>_rmvUser(slc)}>
                                   <Icons 
                                     name={'outline_delete'} 
                                     color={'#555'} 
                                     size={24} 
                                     //tooltip={'delete locations'}
                                     extraClass={'delete'}
                                   />
                                 </div>
                               </div>
                                
                             </div>
                           </div>
                         </div>
                         }
                         </>
                       )
                     })
                   }
                 </div>
                 </div>
                  :null
              }
          </div>



          </div>
        </div>
        
        }
          </div>
        </div>
        <style>
          {dep_style}
        </style> 
      </>
    );
  
}  


export default withRouter(withRedux(OperationComponent))

//     {videoUploadType==='upload' && !uploadVideoDone && !uploadProgress? null:null}


/*
function parseOptions(_sections){
  let opt = []
  _sections.map(sc=>{   
    let h = {label:sc['name'],icon:'analytics', visible:sc['active'] }
    opt.push(h)
  })
  return opt;
}


function parseSize(s){
  if(s/1024000000>=1){
    return (s/1024000000).toFixed(2)+'Gb';
  }else if(s/1024000>=1){
    return (s/1024000).toFixed(2)+'Mb';
  }else if(s/1024>=1){
    return (s/1024).toFixed(2)+'Kb';
  }else{    
    return (s).toFixed(2)+'bytes';
  }  
}


function totalStock(_sections){
  let _stock = 0;
  _sections.map(sc=>{
    sc.locations.map(slc=>{
      _stock += slc['stockDetails'] && slc['stockDetails']['inStock']?slc['stockDetails']['inStock']:0;      
    })
  })
 return _stock;
}

*/

const dep_style = `


.checkBox_container{
    margin: 7px 0 0 0;
}



.whiteTheme{
  background: #fff;
}

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
  background: #fff;
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




















