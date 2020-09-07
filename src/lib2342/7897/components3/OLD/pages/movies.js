

import React, { useEffect, useState } from 'react'
import { withRedux } from '../lib/redux'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import { SearchVideos, VideoFiles } from '../actions/videos'
import { OpenModal, makeFileRequest } from '../actions/common'

import * as _Util from '../lib/Util'
import Icons from '../components/Icons'
import Layout from '../components/MyLayout';
import Link from 'next/link'


/*

import DeleteDialogDepartments from '../components/department/deleteDialogDepartments'
import deleteDialogLocations from '../components/department/deleteDialogLocations'
import AddLocations from '../components/department/addLocations'
import BTN from '../components/btns_confirm';
import Link from 'next/link'
*/

import DialogPlayer from '../components/operations/dialogPlayer'
import DialogVideoFile from '../components/operations/dialogVideoFile'




import InputText from '../components/InputText';



import DialogHRM from '../components/DialogHRM';


import MenuSlideSide from '../components/MenuSlideSide';

const operationType = 'departments'
let _options = [
  {label: 'upload', icon:'analytics', visible:true },
  {label: 'movies', icon:'analytics', visible:true },
  {label: 'video files', icon:'analytics', visible:true },
  {label: 'edition', icon:'analytics', visible:true }

]

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  let _state =  useSelector(state => state);
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();
  const fetchDetails =  useSelector(state => state.fetchDetails);
  
  const modal = useSelector(state => state.listDialog);
  //let details  = _state['detailDepartmentByID'];

  let fileVideoSearch = useSelector(state => state.fileVideoSearch);

  let videoSearch = useSelector(state => state.videoSearch);

  

  
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
    SearchVideos(q, dispatch, _state, operation);
  }

  const _getVideoFiles = (q,operation) => {
    VideoFiles(q, dispatch, _state, operation);
  }

  


  const _getDepartmentsById = (id) => {
    getDepartmentsById(id, dispatch, _state);
  }


/*
  const OpenDeleteModalHRM = (i) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={item:i};
    data['content'] = DeleteDialogDepartments; 
    //console.log(data)
    OpenModal(dispatch,data);
  }


  const OpenDeleteLocation = (i, _ID) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={item:i, dID: _ID};
    data['content'] = deleteDialogLocations; 
    //console.log(data)
    OpenModal(dispatch,data);
  }

  const OpenAddLocation = (i, n, _ID) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={title:"Add Location", departmentID:i, departmentName:n, dID: _ID};
    data['content'] = AddLocations; 
    //console.log(data)
    OpenModal(dispatch,data);
  }


  const OpenEditLocation = (i, n, _ID,items) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['height']='195px';
    data['width']='320px'; 
    data['props']={title:"Update Location", departmentID:i, departmentName:n, dID: _ID, items:items};
    data['content'] = AddLocations; 
    //console.log(data)
    OpenModal(dispatch,data);
  }

*/
const OpenOptions = (items, _ID) => {

  let data = {};
  data['list']=modal;
  data['zIndex']=150; 
  data['height']=items.metadata.height<480?(items.metadata.height)*1+80:480;
  data['width']=(items.metadata.width)*1+80; 
  data['props']={title:"Options", id: _ID, item:items};
  data['content'] = DialogVideoFile; 
  //console.log(data)
  OpenModal(dispatch,data);
}



  const OpenPlayer = (items, _ID) => {

    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['prevent_relocate']=true;    
    data['height']=items.metadata.height<480?(items.metadata.height)*1+80:480;
    data['width']=(items.metadata.width)*1+80; 
    data['props']={title:"", id: _ID, items:items};
    data['content'] = DialogPlayer; 
    //console.log(data)
    OpenModal(dispatch,data);
  }


  return { 
    observeChanges, 
    // details, 
    forms, 
    updForms, 

    /*
    fetchDetails,
    _getProducts, 
    _getDepartmentsById, 
    OpenDeleteLocation, 
    OpenDeleteModalHRM,
    OpenAddLocation,
    OpenEditLocation,
    OpenEditDepartment
    */
    OpenPlayer,
    OpenOptions,

    fileVideoSearch,
    videoSearch,
    _getVideoFiles,
    _getVideosSearch
  }
}



const handleEdit = () => {


}


const dragOverHandler = () => {


}

const dropHandler = () => {


}

const setView = () => {


}

const fileCheckInput = (e, uploadID, label, setLabel, fileName, setFileName) => {
  
  var formName = "_upload_video"; 
  var UploadUrl = `http://localhost:7070/UploadVideo`;
  // const {active,_Id,label} = this.state;

  var input = document.getElementById(uploadID);
   
   if(input && input.files && input.files[0]){
    var file = input.files[0];

    makeFileRequest(UploadUrl, [], file,formName);

    if(!label){
      var __ext_ = file.name.split('.').pop();
      var __lbl_ = file.name.split(`.${__ext_}`)[0];
      // this.setState({fileName:file.name,label:__lbl_});
      setLabel(__lbl_);
      setFileName(file.name);
    }else{
      setFileName(file.name);
      // this.setState({fileName:file.name});
    }
     /*
    var reader = new FileReader();
    reader.addEventListener('load', _th6_.readFile.bind(_th6_));
    reader.readAsText(file);
    */
   
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
    // fetchDetails, details, observeChanges,
    _getDepartmentsById, 
    
    OpenOptions,
    OpenPlayer,
    fileVideoSearch,
    _getVideoFiles,
    _getVideosSearch,
    videoSearch
  } = useObserveChanges();


  const router = useRouter()
  const [initialize, setInitialize] = useState(false);

  const [label, setLabel] = useState(null);
  const [fileName, setFileName] = useState(null);

  const [view, setView] = useState(0);

  const [uploadID] = useState(_Util.gen12CodeId());

  let _ID = router.query.id;

  let inputFileStyle ={opacity:`0`,height:`100%`,width:`100%`}  ;  


  // console.log(router)
  useEffect(() => {
    if(!initialize){
      setInitialize(true);
      setTimeout(()=>{
        setView(1);
      },250)
      //_getVideosSearch("taxi","videoSearch");
    }
  });
  console.log(videoSearch)
  
    return (
      <>
      <Layout /> 
            <div className={`_wrpView_ ${view && 'visible'}`}>
            {view && 
            <div>
              <div className={'_dsplFlx _desktopV '} >
                <div className="flexSpace"/>  
                <div className={`fieldPadding`}>
                    <InputText 
                      icon={`search`} 
                      form={'videoSearch'} 
                      field={`search`}                  
                      placeholder={_Util.translatetext(80)}
                      OnChange={(e)=>handleSearch(e, "videoSearch", _getVideosSearch)} 
                    />
                  </div>
                </div>
                
                <div className={' htWpr_d8  '}>
                {
                  videoSearch && _Util.ObjectKeys(videoSearch).map(fV=>{
                    let slc = videoSearch[fV];
                    console.log(slc)
     
                    return (
                      <div  className={'_dsplFlx roWTd  showActions '} key={_Util.gen12CodeId()}>
                        <div className={'coLTd flxbsc40 _total2 '} onClick={(e)=>{/*OpenPlayer(slc,fV)*/}} >
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
                            <div className="flexSpace"/>  
                            <div className={'coLTd flxbsc5 _stock'}>
                              <div  className={'__amount__ __gm2_text_'}>  {slc && slc['boxarts']}</div> 
                            </div>
                          </div>
                          <div className={'_actions_Wrp_'}>
                            <div className={'_actions_Btns_ flxbsc30'}>
                              <Link href="/movies/[id]" as={`/movies/${slc.id}`}>
                                <div className={``} >
                                  <Icons 
                                    name={'outline_view'} 
                                    color={'#555'} 
                                    size={24}
                                    tooltip={'details'}
                                    extraClass={'view'}
                                  />
                                </div>
                              </Link>                                
                              <div className={'_spaceMrg_'}/>
                              <div  onClick={()=>{}}>
                                <Icons 
                                  name={'arrows_compare'} 
                                  color={'#555'} 
                                  size={24} 
                                  tooltip={`transfer product`}
                                  extraClass={'edit'}
                                  />
                              </div>
                              <div className={'_spaceMrg_'}/>
                              <div onClick={()=>{}}>
                                <Icons 
                                  name={'outline_delete'} 
                                  color={'#555'} 
                                  size={24} tooltip={'delete locations'}
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
            }
          </div>
        <DialogHRM /> 
        <style>
          {dep_style}
        </style> 
      </>
    );
  
}  


export default withRedux(OperationComponent)

//     {videoUploadType==='upload' && !uploadVideoDone && !uploadProgress? null:null}



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






`




















