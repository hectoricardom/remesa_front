

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../store/redux'

import { useSelector, useDispatch } from 'react-redux'

import { SearchVideos, VideoFiles } from '../../actions/videos'
import {  loadHLSdataByUrl  } from '../lib/common'

import * as _Util from '../../store/Util'
import Icons from '../Icons'


import { withRouter} from 'react-router-dom';


import { 
  OpenModal,
  getFtpStream64, getFtpStreamVideo64, 
  refreshFTP, getFTP, getFtpStreamList, 
  getFtpStream64Big, encodeVideoFiles,
  getFtpConvertStatus, 
  ClearNextlist, getFtpStreamStatus 
} from '../../actions/common'




import DialogVideoFile from '../operations/dialogVideoFile'



import DeleteVideoFile from '../operations/deleteVideoFile'

import MusicPlayer from '../operations/MusicPlayer'

import InputText from '../InputText';

import BTNHRM from '../btns_confirm';


let lastencodeRqst = 10

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  // 
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();
  /*
  
  const fetchDetails =  useSelector(state => state.fetchDetails);
  
  const modal = useSelector(state => state.listDialog);
  // let details  = _state['detailDepartmentByID'];

  let fileVideoSearch = useSelector(state => state.fileVideoSearch);

  let videoSearch = useSelector(state => state.videoSearch);

  */

 let _state = _Util.getStore();
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
    SearchVideos(q, dispatch, _state, operation);
  }

  const _getVideoFiles = (q,operation) => {
    VideoFiles(q, dispatch, _state, operation);
  }

  const _getFTPFiles = (q,operation) => {
    getFTP(dispatch, _state, operation);
  } 

  

  const _encodeVideoFiles = (q,operation,openUrl) => {
    
    let _state = _Util.getStore();
    let streamStatus = _state["streamStatus"] || {};
    let _convertConatinerVideos = _state["convertConatinerVideos"] || {};
      
    if(q && q.pth){     
      if(_convertConatinerVideos && _convertConatinerVideos[q.pth]){
      }else{  
        _convertConatinerVideos[q.pth] = true;
        _Util.updStore("convertConatinerVideos",_convertConatinerVideos);
        let convertVideosInterval = _state["convertVideosInterval"] || {};
        convertVideosInterval[q.pth] = setInterval(()=>{
          let NQ = {
            ext:q.ext,
            pth: q.pth
          }  
          let g = {list:[NQ]};
          getFtpConvertStatus(g, dispatch);
        },8000)
        _Util.updStore("convertVideosInterval",convertVideosInterval);
        encodeVideoFiles(q,dispatch, _state, updKV);
        dispatch({
          type: 'UPD_KEY_VALUE',
          kv:{key:'observeChanges',value:_Util.gen12CodeId()}
        }) 
      }
    }
    /*
    if((new Date()).getTime()>lastencodeRqst){
      lastencodeRqst = (new Date()).getTime()+60000;
    }
    */
  }



  const _getFtpStreamList = (nextL) => {

    let g = {list:nextL}
    getFtpStreamList(g,dispatch)
    /*let count =0;
    let intNext = setInterval(()=>{
      if(nextL[count]){
        let NQ = nextL[count];
        getFtpStreamNextVideo(NQ,dispatch);
      }
      count +=1;
    },250)
    
  _Util.updStore("nextlistInterval",intNext); 
    */
  }



  const _getFtpStream = (q,operation,openUrl) => {
    if(operation){
      _Util.updPlayerStore("nextlistCurrent",q.pth);  
      _Util.updStore("flixSource",'ftp');     
      getFtpStreamVideo64(q,dispatch, updKV);
      setTimeout(()=>{
        ClearNextlist();
        let nextL = []
        if(openUrl){
          Object.keys(openUrl).map(fl=>{
              let ext = fl.split('.').pop();
              let isVideoStream = ext?ext.toLowerCase() === "mp4" || ext.toLowerCase() === "mkv":false;   
              if(isVideoStream){
                let NQ = {
                    ext:ext,
                    pth: q.fld +"/"+ fl
                }
                nextL.push(NQ);
              }
          })

          _getFtpStreamList(nextL);
        }
      },250)
      
      



      /* ["srt"].map(sbt=>{
        let fV = q.pth;
        let _srt_  = fV.replace(q.ext,sbt);
        let _srtObj = {pth:_srt_,sbt}
        getFtpStreamSrt(_srtObj,dispatch, _state);
        updKV("srt2List",_srt_);
      })
      */
    }else{
      let isValid = {
        "mp3":1,
        "wma":1,
        "jpg":1,
        "png":1,
        "gif":1,
        "webp":_Util.isSupportWebp(),
      }

      let nQ = {
          ext:q.ext,
          pth: q.pth,
          flName: q.pth.split('/').pop()
      }
      _Util.updStore("item2Stream",nQ);
      getFtpStream64(q,dispatch, false);
      let nextL = []
        if(openUrl){
          Object.keys(openUrl).map(fl=>{
              let ext = fl.split('.').pop();
              let isVideoStream = isValid[ext.toLowerCase()];   
              if(isVideoStream){
                let NQ = {
                    ext:ext,
                    pth: q.fld +"/"+ fl,
                    flName: fl
                }
                nextL.push(NQ);
              }
          })
          _Util.updStore("listNextFiles",nextL);
          //_getFtpStreamList(nextL);
        }
    }
  
  }
  


  const _getFtpStreamStatus = (q,pth) => { 
    let nextL = [];
    q.map(fl=>{
      let ext = fl.split('.').pop();
      let isVideoStream = ext?ext.toLowerCase() === "mp4" || ext.toLowerCase() === "mkv":false;
      if(isVideoStream){
        let NQ = {
            ext:ext,
            pth: pth +"/"+ fl,
            flName: fl
        }
        nextL.push(NQ);
      }
    })
    let g = {list:nextL};
    getFtpStreamStatus(g, dispatch)
  }

  


  const _getFtpStream64Big = (q) => {
    getFtpStream64Big(q,dispatch, _state)
  }
 


const OpenOptions = (items, _ID) => {

  let data = {};
  data['zIndex']=150; 
  data['observeResize']=true;   
  data['props']={title:"Options", id: _ID, item:items};
  data['content'] = DialogVideoFile; 
  OpenModal(dispatch,data);
}



const RmvOptions = (items, _ID) => {

  let data = {};
 
  data['zIndex']=150; 
  data['observeResize']=true;   
  data['props']={title:"Borrar Archivo", id: _ID, item:items};
  data['content'] = DeleteVideoFile; 
  OpenModal(dispatch,data);
}






  const _openMusicPlayer = (items,  type) => {
    let data = {};    
    data['zIndex']=150; 
    data['observeResize']=true;   
    data['props']={title:"", item:items, type:type};
    data['content'] = MusicPlayer;
    OpenModal(dispatch,data);
  }



  const _openPlayer = (item) => {
    let bookmarkPositionID = item && item["bookmarkPosition"]  && item["bookmarkPosition"]["id"];
    loadHLSdataByUrl(item["id"], dispatch, updKV,_state["keys"],bookmarkPositionID);
    _state["route_history"].push({pathname:`/player`,search:`?v=${item["id"]}` });
}











  return { 
    observeChanges,
    forms, 
    updForms, 
    updKV,
    _state,
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
   _getFtpStreamStatus,
   _encodeVideoFiles,
   _getFtpStream64Big,
   _openMusicPlayer,
   _getFTPFiles,
   RmvOptions,
    OpenOptions,
    _openPlayer, 
    _getVideoFiles,
    _getVideosSearch,
    _getFtpStream
  }
}






const dragOverHandler = () => {


}

const getFldItems = () => {


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
    updKV,
    observeChanges,
    _getFtpStream,
    _getFTPFiles,
    _openMusicPlayer,
    _getFtpStream64Big,
    _encodeVideoFiles,
    _getFtpStreamStatus
  } = useObserveChanges();


  const [initialize, setInitialize] = useState(false);  
  const [view, setView] = useState(0);
  const [convertList, setConvertList] = useState(true);




  let _state = _Util.getStore();
  let _ftpData = _state["ftpData"]
  let streamStatus = _state["streamStatus"] || {};  
  let _ftpPath = _state["ftpPath"] || "";
  let fld = _ftpPath.split('@@'); 

  useEffect(() => {
    if(props.history && !_state["route_history"]){
      _Util.updStore('route_history',props.history);
      //updKV("route_history",props.history);
    }
    if(!initialize){
      setInitialize(true);
      _getFTPFiles();
      let ptFtp =window.localStorage.getItem("ftpPath") || "";
      _Util.updStore("ftpPath",ptFtp);
      updKV("observeChanges",_Util.gen12CodeId()); 
      setTimeout(()=>{
        _state = _Util.getStore();
        _ftpData = _state["ftpData"];
        let newD = _Util.fileData(_ftpData);
        let newData = newD && Object.keys(newD);
        let pth = ptFtp.split('@@').join('/');
        _getFtpStreamStatus(newData,pth);
      },650);
      setTimeout(()=>{
        setView(1);
      },20)
    }
  });
 

 
  let _usPrf = _state["userProfile"];
  _ftpData =  _Util.fileData(_ftpData);



  const gotoStreamFile = (fV,ext, _flfData) => {
    let pth = fld.join('/');       
    if(extIcon[ext]["icon"] === "movie_outline"){
      if(validVideoFile[ext]){ 
        let vys = {pth:pth+"/"+fV,ext,fld:pth}
        _getFtpStream(vys,true, _flfData);
        _Util.updPlayerStore("titleName",fV);
       // window.localStorage.setItem("titleName",fV)
      }
    }else{      
      let vys = {pth:pth+"/"+fV,ext,fld:pth}
      if(extIcon[ext]["icon"] === "music_note_m"){
        _getFtpStream(vys,false,_flfData);
        _openMusicPlayer(vys,"audio");        
      }
      else if(extIcon[ext]["icon"] === "image_outline"){
        _getFtpStream(vys,false,_flfData);
        _openMusicPlayer(vys,"image"); 
      }
      else if(extIcon[ext]["icon"] === "zip_file_outline" || extIcon[ext]["icon"] === "m_window"){
        _getFtpStream64Big(vys,false,true);
      }
      else{
        _getFtpStream(vys,false,true);
      }

    }
  }



  const encodeStreamFile = (fV,ext) => {
    let pth = fld.join('/');
    let vys = {pth:pth+"/"+fV,ext} 
    _encodeVideoFiles(vys,false,true);
  }


const _getFtpStreamStatusData = (pth) => {
  setTimeout(()=>{
    _state = _Util.getStore();
    _ftpData = _state["ftpData"];
    let newD = _Util.fileData(_ftpData);
    let newData = newD && Object.keys(newD);
    _getFtpStreamStatus(newData,pth);
  },450)
}



  
const gotoFld = (fldName) => {
  let ind = null;
  fld.map((a,i)=>a===fldName?ind=i:null);
  fld = fld.slice(0,ind+1);
  window.localStorage.setItem("ftpPath",fld.join('@@'));
  _Util.updStore("ftpPath",fld.join('@@'));
  updKV("observeChanges",_Util.gen12CodeId());
  let pth = fld.join('/');      
  window.scrollTo(0,0);
  _getFtpStreamStatusData(pth);
}

const gotoRoot = () => {
  window.localStorage.setItem("ftpPath","");
  _Util.updStore("ftpPath","");
  updKV("observeChanges",_Util.gen12CodeId());  
  _getFtpStreamStatusData("");
}

const gotoFile = (fV,ext,_flfData) => {   
  if(ext===null){  
    fld.push(fV);     
    window.localStorage.setItem("ftpPath",fld.join('@@'));
    _Util.updStore("ftpPath",fld.join('@@'));
    updKV("observeChanges",_Util.gen12CodeId());      
    window.scrollTo(0,0)
    let newData = _flfData[fV] && Object.keys(_flfData[fV]);
    let pth = fld.join('/');
    _getFtpStreamStatus(newData,pth);
  }
  else{
    gotoStreamFile(fV,ext,_flfData);
  }
} 



let _convertConatinerVideos = _state["convertConatinerVideos"] || {};
let converting = _Util.ObjectKeys(_convertConatinerVideos).length;
let convertingfilesNumber = 0;
let convertingfilesDone = 0;


_Util.ObjectKeys(_convertConatinerVideos).map(d=>{ 
  convertingfilesNumber += 1;
})

let userA = _Util.getBrowser();
  
let isMobile = userA.os === "Android" || userA.os === "iPhone" || _state["outerWidth"]<720 ;


  return (
      <>
    {converting?
        <div  className={`uploadProgressContainer ${converting?"active":"active"}`} sty>
          <div  className={`wrp_upl`}>
            <div class="a-Cd-nm">
              <div class="af">
                <div class="af-uo">
                  <span class="af-V">{convertingfilesNumber>0?`convirtiendo ${convertingfilesNumber} video${convertingfilesNumber>1?"s":""}`:""} {convertingfilesDone>0?`Se ha subido ${convertingfilesDone} elemento`:""}</span>
                </div>
                <div class="af-Yi-j">
                  <div class="af-Yi">
                    <div class="h-sb-Ic h-R-d a-c-d"  onClick={()=>setConvertList(!convertList)}> 
                      <Icons name={convertList ?"key_arrow_up":'key_arrow_down'} ripple={true} />
                    </div>
                    <span>
                    {convertingfilesNumber===0?
                      <div class="h-sb-Ic h-R-d a-c-d" onClick={()=>{/*handelClearUploadConatiner()*/}}>
                        <Icons name={'cancel'} ripple={true} />
                      </div>
                      :null}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {convertList ? 
            <div class="a-Cd-oa">
              {_Util.ObjectKeys(_convertConatinerVideos).map((uplID,indUpl)=>{
                let upl = _convertConatinerVideos[uplID];
                let progress = upl["progress"];
                
                
                let PercProgress = progress / 0.55;
               /* let radius = 10;                    
                let isDone = upl["done"];
                let cancelled = upl["cancelled"];
                let perimeter = Math.round(Math.PI * radius * 2);
                
                let progstyle={
                  strokeDasharray:  [(progress/100)*perimeter,  perimeter],
                  strokeLinecap:"round"
                }*/

                let name = uplID.split("/").pop();

                return (
                    <div class="a-Cd-Ea-oa" style={{"--PercProgress":PercProgress+"deg"}}>
                      <div class="Ea-j z-Ea-Vd-ac Ea-Lj" role="group" tabindex={indUpl}>
                        <div class="Ea-oa Ea-G">
                          <div class="z-Ea-Qd">
                            <div class="z-Ea-r-dd" aria-hidden="true">
                              <span class="z-Ea-r z-Ea-tf-r" style={{paddingLeft: `9px`}}>                              
                                {name}
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
       <div is-mobile={`${isMobile}`} className={` mainView ${_state["darkTheme"]?"darkTheme" : "whiteTheme"}`}>
        <div className={`_dsplFlx _operationsWrp_`}>
          <div  className={` _wrpSld_ `}>
            <div className={` ${view===1 && 'visible'}`}>
            {view=== 1 && 
              <div>
                {false ?
                <div className={'_dsplFlx _desktopV '} >
                  <div className="flexSpace"/>
                      <InputText 
                        icon={`search`} 
                        form={'ftp_search'} 
                        field={`search`}                  
                        placeholder={`buscar archivo`}
                       // OnChange={(e)=>handleSearch(e, "fileVideoSearch", _getVideoFiles)} 
                      />
                </div>
                :null
              }
              {!isMobile && _usPrf && _usPrf["isAdmin"] && 
                <div  className={'_dsplFlx  '} style={{margin:'20px auto', width:isMobile?"90%":"60%"}} >
                  <span onClick={()=>refreshFTP()}>
                    <BTNHRM theme={`light_blue`} title={'Actualizar FTP'}/>
                  </span> 
                  <div className="flexSpace"/>
                  <div className={'_dsplFlx  '} >
                    <div className="flexSpace"/>
                    <div  className={' '} onClick={()=>updKV("darkTheme",!_state["darkTheme"])}>
                      <Icons 
                        name={'theme'} 
                        color={"#555"} 
                        size={24}
                      />
                    </div>
                  </div>
                </div>
              }
              {!isMobile && 
                <div  className={' _dsplFlx wrpActionFiles '} style={{margin:'20px auto', width: isMobile?"90%":"60%"}} >
                  <div  className={'_fld_navigation ftp'}>
                    <span className={'_fld_navigation_lbl '} onClick={()=>gotoRoot()}> FTP</span> 
                  </div>

                  {fld && fld.map(_fld=>{
                    if(_fld){
                      return(
                      <div className={'_fld_navigation '}>
                        <div  className={'_next_folder '}>
                          <Icons 
                            name={'arrow_right'} 
                            color={"#555"} 
                            size={24}
                          />
                        </div>
                        <span className={'_fld_navigation_lbl '} onClick={()=>gotoFld(_fld)}> {_fld}</span>
                      </div>
                      )
                    }else{
                      return null;
                    }
                  })
                  }
                 </div> 
                 }
                <div className={' htWpr_d8  '}>
                {
                  _ftpData && _Util.ObjectKeys(_ftpData).map(fV=>{
                    let slc = _ftpData[fV];
                    let iconName ='folder';
                    let IconColor = "#ffb300"
                    let ext =null;
                    if(fV.split('.').length>1 && extIcon[fV.split('.').pop().toLowerCase()]){                       
                      ext = fV.split('.').pop().toLowerCase();
                      iconName = extIcon[ext]["icon"]; 
                      IconColor = extIcon[ext]["color"]; 
                    }


                    let isVisible = fV.indexOf('_dashid.json')>=0;
                    let isVideoStream = ext?ext.toLowerCase() === "mp4" || ext.toLowerCase() === "mkv":false;        
                    let videFl = VideoFileExt[ext];   

                    if(!isVisible ){
                      
                      let filPath = `${fld.join('/')}/${fV}`
                      let isReady2Stream = streamStatus[filPath];
                      let isConverting = _convertConatinerVideos[filPath];
                      let isV =  _usPrf && _usPrf["isAdmin"]?true:isVideoStream && isReady2Stream;
                      if(!videFl || isV){                          
                          return (
                          <div  className={'_dsplFlx roWTd  showActions '} key={_Util.gen12CodeId()} >
                            <div className={'coLTd _ellipsis _total2 iconType'}  onClick={(e)=>gotoFile(fV,ext,_ftpData)} >
                                <Icons 
                                  name={iconName} 
                                  color={IconColor} 
                                  size={24}
                                />
                            </div>
                            <div className={'coLTd flxbsc60 _ellipsis _total2 pointerC'} onClick={(e)=>gotoFile(fV,ext,_ftpData)} >
                                <div  className={'locations _link_ '}> {fV}</div>
                            </div>
                            <div className="flexSpace"/>
                            <div className={'coLTd flxbsc10 _total2 '}>
                              <div  className={'locations _link_'}> {ext}</div>
                            </div>
                            {!isMobile &&  _usPrf && _usPrf["isAdmin"] &&
                            <div className={'_dsplFlx flxbsc20'}>                            
                                <div className={'_spaceMrg_'}/>
                                { isVideoStream ?
                                  <>
                                  {isReady2Stream ?                        
                                    <div  className={'_msg_ _ready'}> listo </div>:
                                    !isConverting ?
                                    <div  className={'_msg_ _error'}> por convertir</div>
                                    :
                                    <div  className={'_msg_ _converting'}> convirtiendo</div>
                                  }
                                  </>
                                  :null
                              }
                                {isVideoStream && !isConverting ?                         
                                <div onClick={()=>encodeStreamFile(fV,ext)}>
                                  <Icons 
                                        name={'setting'} 
                                        color={'#555'} 
                                        size={24}  
                                        //tooltip={'configuracion'}
                                        //extraClass={`view`}
                                  />
                                </div>:null
                              }
                            </div>
                            }
                          </div>
                        )
                      }else{
                          return null
                        }
                    }else{
                      return null
                    }
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







var validVideoFile = {
  "mp4": 1,
  "mkv": 1,
}

var VideoFileExt = {
  "mp4": 1,
  "avi": 1,
  "mkv": 1,
  "m4a": 1,
  "webm": 1,
  "weba": 1,
  "m4s": 1,
}


var extIcon = {
  "webp": {"icon":"image_outline",color:"#1a73e8"},
  "jpg": {"icon":"image_outline",color:"#1a73e8"},
  "jpeg": {"icon":"image_outline",color:"#1a73e8"},
  "png": {"icon":"image_outline",color:"#1a73e8"},
  "gif": {"icon":"image_outline",color:"#1a73e8"},
  "svg": {"icon":"image_outline",color:"#1a73e8"},


  "mp4": {icon:"movie_outline",color:"#e50914"},
  "avi": {icon:"movie_outline",color:"#e50914"},
  "mkv": {icon:"movie_outline",color:"#e50914"},
  "m4a": {icon:"movie_outline",color:"#e50914"},
  "webm": {icon:"movie_outline",color:"#e50914"},
  "weba": {icon:"movie_outline",color:"#e50914"},
  "m4s": {icon:"movie_outline",color:"#e50914"},

  "mp3": {icon:"music_note_m",color:"#ff3d00"},
  "wma": {icon:"music_note_m",color:"#ff3d00"},

  "srt": {icon:"subtitle_outline",color:"#00acc1"},
  "vvt": {icon:"subtitle_outline",color:"#00acc1"},
  "txt": {icon:"subtitle_outline",color:"#00acc1"},



  "pdf": {icon:"pdf_file_outline",color:"#e50914"},
  "xls": {icon:"excel_file_outline",color:"#2e7d32"},
  "xlsx": {icon:"excel_file_outline",color:"#2e7d32"},
  "ppt": {icon:"powerpoint_file_outline",color:"#bf360c"},
  "pptx": {icon:"powerpoint_file_outline",color:"#bf360c"},
  "doc": {icon:"word_file_outline",color:"#1976d2"},
  "docx": {icon:"word_file_outline",color:"#1976d2"},

  "json": {icon:"json_file_outline",color:"#006064"},
  "js": {icon:"js_file_outline",color:"#006064"},

  "folder": {icon:"folder",color:"#ffb300"},


  "zip": {icon:"zip_file_outline",color:"#5d4037"},
  "rar": {icon:"zip_file_outline",color:"#5d4037"},
  "7zip": {icon:"zip_file_outline",color:"#5d4037"},

  "exe": {icon:"m_window",color:"#311b92"},
  "bin": {icon:"m_window",color:"#311b92"},

  "apk": {icon:"apk_file_outline",color:"#00e676"},


  }







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


.iconType{
  min-width: 45px;
}


.pointerC{
  cursor: pointer;
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


.mainView.darkTheme .coLTd,
.mainView.darkTheme ._link_ {
  color: #999999;
  font: 600 16px/19px Roboto,sans-serif;
}


.mainView.darkTheme ._fld_navigation_lbl {
  color: #a3a3a3;
}

.mainView.darkTheme .roWTd {
  border-color: #a3a3a3;
}


.mainView.whiteTheme .roWTd {
  border-color: rgba(0,0,0,0.12);
}


.mainView.whiteTheme .coLTd,
.mainView.whiteTheme ._link_ {
  color: #3c3c3c;
  font: 600 15px/19px Roboto,sans-serif;
}


`




var extList = {
  webp:`video`,
  jpg:`image`,    
  jpeg:`image/jpeg`,
  png:`image/png`,
  gif:`image/gif`,
  ts:`video/MP2T`,
  m3u8:`application/x-mpegURL`,
  mp4:`video/MP4`,
  m4a:`audio/MP4`,
  webm:`video/webm`,
  weba:`audio/webm`,
  m4s:`text/plain`,
  js:`application/javascript; charset=UTF-8`,
  css:'text/css; charset=utf-8',
  mpd:'video/vnd.mpeg.dash.mpd',
  txt:'application/octet-stream',
  json:'application/json',
  srt:`subtitle_outline`,
  vvt:`subtitle_outline`,
  html:`text/html; charset=UTF-8`
} 













  /*
  const gotoFld1 = () => {
    setFld2(null)
    setFld3(null)
    setFld4(null)
    setFld5(null)
    window.localStorage.setItem("ftpPath",fld1);
  }
  const gotoFld2 = () => {
    setFld3(null)
    setFld4(null)
    setFld5(null)
    window.localStorage.setItem("ftpPath",fld1+"/"+fld2);
  }
  const gotoFld3 = () => {
    setFld4(null)
    setFld5(null)
    window.localStorage.setItem("ftpPath",fld1+"/"+fld2+"/"+fld3);
  }
  const gotoFld4 = () => {
    setFld5(null)
    window.localStorage.setItem("ftpPath",fld1+"/"+fld2+"/"+fld3+"/"+fld4);
    _Util.updStore("ftpPath",)
  }

*/
/*
      if(!fld1){
        setFld1(fV);
        window.localStorage.setItem("ftpPath",fV);
      }
      if(fld1 && !fld2){
        setFld2(fV);
        window.localStorage.setItem("ftpPath",fld1+"/"+fV);
      }
      if(fld1 && fld2 && !fld3){
        setFld3(fV);
        window.localStorage.setItem("ftpPath",fld1+"/"+fld2+"/"+fV);
      }
      if(fld1 && fld2 && fld3 && !fld4){
        setFld4(fV);
        window.localStorage.setItem("ftpPath",fld1+"/"+fld2+"/"+fld3+"/"+fV);
      }
      if(fld1 && fld2 && fld3 && fld4 && !fld5){
        setFld5(fV);
        window.localStorage.setItem("ftpPath",fld1+"/"+fld2+"/"+fld3+"/"+fld4+"/"+fV);
      }
      

      DF5545sfdEEEE 
      */    

/*
  if(_ftpData && fld1){
    _ftpData = _state["ftpData"][fld1];
  }

  if(_ftpData && fld1 && fld2){
    _ftpData = _state["ftpData"][fld1][fld2];
  }

  if(_ftpData && fld1 && fld2 && fld3){
    _ftpData = _state["ftpData"][fld1][fld2][fld3];
  }


  if(_ftpData && fld1 && fld2 && fld3 && fld4){
    _ftpData = _state["ftpData"][fld1][fld2][fld3][fld4];
  }


  if(_ftpData && fld1 && fld2 && fld3 && fld4 && fld5){
    _ftpData = _state["ftpData"][fld1][fld2][fld3][fld4][fld5];
  }



if(fld1 && fld2 && fld3 && fld4 && fld5){
      pth = fld1+"/"+fld2+"/"+fld3+"/"+fld4+"/"+fld5; 
    }
    else if(fld1 && fld2 && fld3 && fld4){
      pth = fld1+"/"+fld2+"/"+fld3+"/"+fld4; 
    }
    else if(fld1 && fld2 && fld3){
      pth = fld1+"/"+fld2+"/"+fld3; 
    }
    else if(fld1 && fld2){
      pth = fld1+"/"+fld2; 
    }
    else if(fld1){
      pth = fld1; 
    } 


ghjfghjgfhj
fgjdfghdfghdfg
hhhhhh
gfchfgfhjfgjfghjfghjfghjgf
dafgsdfsfgsd
  */



/*
let funcSet = {setFld5,setFld4,setFld3,setFld2,setFld1}
 
ptFtp && ptFtp.split('/').map((tps,ii2)=>{
  let k2S = "setFld"+((ii2)*1+1);
  funcSet[k2S](tps);
})

sdagfafdghf
sadfsakjd
sadfasdkj
sadfjaosd
jasodjfsa
ikjsado
hectoricardom
dskfasldkjf lasdkjf                       s;dlsa ;; sdhiofs kiosdhfosd sdfiolhdsalogsd dssaasdasdsadasd asdlaksdjalskj     alksjdhap;iosudha oaihjsoasdhiojas aosi oaisidas kj lfgjdsfhl dslfgkjdsfg sdlfkgjbiuri93993993908wy9080948230890298908293902855463546543123RRTRRRRRRRRRRRRRRRRRRRGHGHGGGGGGGKKKKKKkkkkkkkkkGH



mp4decrypt --key 1:9a04f079-9840-4286-ab92-e65be0885f95 --key 2:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed 61170940_agave51389053_71000200_H264_1000_71000504_video.mp4 vv27d.mp4




*/

















