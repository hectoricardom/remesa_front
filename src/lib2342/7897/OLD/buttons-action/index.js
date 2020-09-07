import React, { Component } from 'react';
import Icons from '../Icons/Icons'
//import Dialog from '../dialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';

import UploadVideo from '../upload';

import * as Util from '../../state/Util';


import './style.css';

const problemsTypes = [
  {
  "title":"Problema de etiquetado",
  "desc":"Título o resumen erróneos, o episodios fuera de orden"
},
{
  "title":"Problemas de video",
  "desc":"Imagen borrosa, se corta o no está en buenas condiciones"
},
{
  "title":"Problema de sonido",
  "desc":"Difícil de escuchar, no va con la imagen, el sonido se pierde en algunas partes"
},
{
  "title":"Problemas de subtítulos o subtítulos ocultos",
  "desc":"Faltan, son difíciles de leer, no van con el sonido, tienen faltas de ortografía o malas traducciones"
},
{
  "title":"Problema de almacenamiento en búfer o conexión",
  "desc":"Repetición de almacenamiento en búfer, la reproducción no empieza u otro problema"
}
]


class ButtonActions extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active:false,
      time:null,
      hover:false,
      progress_hover:0, 
      progress_thumbnail:'', 
      progress_time:'', 
      subtitleSyncTime:0,
      isSyncTime:false

    };
  }

  componentWillMount() {
    this.PlayButton = this.PlayButton.bind(this);
    this.VolumeButton = this.VolumeButton.bind(this);
    this.FullScreenButton = this.FullScreenButton.bind(this);
    this.handleSomethingWrong = this.handleSomethingWrong.bind(this); 
  }
  componentDidMount(){     
    
  }

  open_actionsOptions(i){    
    //this.setStat e({id2edit:i});
    var formName = `Open_Url_Subtitle`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var _cont = <OpenUrlSubtitle _close={this.close_actionsOptions.bind(this,_id)} file={i} confirm={this.loadSubtitle.bind(this)} confirmFile={this.confirmFile.bind(this)}/>
    //var _cont = <div/>
    var options = {id:_id,zIndex:150,height:'60vh',width:'60vw',content:_cont};
    this.props.dialogActions.OpenDialog(options);
  }

  open_UploadOptions(i){    
    //this.setStat e({id2edit:i});
    var formName = `Open_Upload_Video`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var _cont = <UploadVideo _close={this.close_actionsOptions.bind(this,_id)}/>
    //var _cont = <div/>
    var options = {id:_id,zIndex:150,height:'60vh',width:'60vw',content:_cont};
    this.props.dialogActions.OpenDialog(options);
  }

  open_WentWrong_dialog(i){    
    //this.setStat e({id2edit:i});
    var formName = `Open_Upload_Video`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var _cont = <SomethingWentWrong _close={this.close_actionsOptions.bind(this,_id)} updHeight={this.open_WentWrong_dialog_upd.bind(this,_id)}/>
    //var _cont = <div/>
    var options = {id:_id,zIndex:150,height:'70vh',width:' 55vw',content:_cont};
    this.props.dialogActions.OpenDialog(options);
  }


  open_WentWrong_dialog_upd(_id,h){
    var options = {id:_id,zIndex:150,height:h,width:'70vw'};
    this.props.dialogActions.OpenDialog(options);
  }


  close_actionsOptions(_id){    
    var options = {id:_id};
    this.props.dialogActions.CloseDialog(options);
  }

  loadSubtitle(url, label){
    this.props.commonActions.SrtCaching(url,label);
    this.close_actionsOptions();
  }


  confirmFile(fileBlob,label){
    this.props.commonActions.SrtCachingFile(fileBlob,label);
    this.close_actionsOptions();
  }


  PlayButton(event){  
    if (typeof this.props.PlayButton === 'function') { this.props.PlayButton();}
  }

  VolumeButton(event){  
    if (typeof this.props.VolumeButton === 'function') { this.props.VolumeButton();}
  }

  updVolume = i => {  
    if (typeof this.props.updVolume === 'function') { this.props.updVolume(i);}
  }
  
  FullScreenButton(event){  
    if (typeof this.props.FullScreenButton === 'function') { this.props.FullScreenButton();}
  }

  handleSomethingWrong(){
    this.setState({active:false})  
  }

  barVisible(v){
    if (typeof this.props.barVisible === 'function') { this.props.barVisible(v);}
  }


  somethingWrong(v){
    this.open_WentWrong_dialog();
    if (typeof this.props.PlayButton === 'function') { this.props.PlayButton();}
  }

  sendReport(jb){
    this.dialogRef && this.dialogRef.Close();
    if (typeof this.props.PlayButton === 'function') { this.props.PlayButton();}
  }

  confirm(v){
    this.setState({active:v});
    setTimeout(()=>{
      this.dialogRef && this.dialogRef.resizehandler();
    },120)    
  }

  handleSubtitleId(v){
    this.props.commonActions.UpdsubtitleId(v);
  }

  fw0_5SecSyncTime(){    
    this.props.commonActions.updSecSyncTime(this.props.subtitleSyncTime+0.5);
  }

  rw0_5SecSyncTime(){
    this.props.commonActions.updSecSyncTime(this.props.subtitleSyncTime-0.5);
  }

  clearSyncTime(){
    this.props.commonActions.updSecSyncTime(0);
    this.setState({isSyncTime:false});
  }
  
  enableSyncTime(){
    this.setState({isSyncTime:true});
  }


  setMute =(v)=>{
    var _th6_ = this;    
    if (typeof _th6_.props.setMute === 'function') { _th6_.props.setMute();}
  }



  ref = d => {
    this.dialogRef = d
  }

  render() {
    var _th6_ = this;
    const {isplaying, volume, isMute, audio_list, subtitle_list,subtitleSyncTime, isFullscreen, currentTime, subtitle, subtitleId} = _th6_.props; 
    const {active, isSyncTime} = _th6_.state;
    var Tcurrent = currentTime?Util.buildTimeString_(currentTime,true):'';
    var IconPP = isplaying?"pause":"play";  
    var Fsc = isFullscreen?'fullscreenExit':'fullscreenExit';
    return(
      <div className="btnC" >
        {/*<Dialog ref={this.ref} height={124}>
         
          </Dialog>*/}
        <div  className="ControlBar">
          <div className="scrubber-action--container">       
            <a className="nfp-button-control" onClick={this.PlayButton}>
              <Icons name={IconPP} color={'#fff'} size={'1.6em'}/>
            </a>
            <ProgressVolume confirm={this.handleSomethingWrong} volume={volume} updVolume={this.updVolume.bind(this)} onClick={this.VolumeButton} barVisible={this.barVisible.bind(this)} isMute={isMute}  setMute={this.setMute.bind(this)}/>     
            <div className="PlayerControls--control-element text-control time-remaining--modern PlayerControls--control-element-hidden"><time className="time-remaining__time">{Tcurrent}</time></div>           
            <div className="flexSpace"/>  
            {/*  
            <a className="nfp-button-control" onClick={this.open_UploadOptions.bind(this)}>
              <Icons name={'public'} color={'#fff'} size={'1.6em'}/>
            </a>
            */}
            <TouchablePopupButton confirm={_th6_.handleSomethingWrong} barVisible={_th6_.barVisible.bind(_th6_)} icon={'alert'}> 
                <div className="something--wrong" >
                  <a onClick={_th6_.somethingWrong.bind(_th6_)}> Algo salio mal? Cuentanos.</a>                  
                </div>
            </TouchablePopupButton>
            <TouchablePopupButton confirm={_th6_.handleSomethingWrong} barVisible={_th6_.barVisible.bind(_th6_)} icon={'quality'}> 
                <div className="audio--subtitle--options">
                  <div className="wrapper">
                    {audio_list && audio_list.lenght?
                    <div className="colums">
                      <div  className="title">
                        Audio
                      </div>   
                      {audio_list.map((ad,i)=>{
                        return(
                        <div className="items" key={i}>
                           {ad.name}
                        </div>
                        )
                      })}
                    </div>
                    :null
                    }
                    <div className="colums">
                      <div  className="header_subtitle">
                        <div  className="syncTime_seconds"> {subtitleSyncTime?subtitleSyncTime:null}</div>  
                        <div  className="title">
                          Subtitle
                        </div>
                        {isSyncTime? <a className="icons_btn" onClick={_th6_.rw0_5SecSyncTime.bind(_th6_)}>
                            <Icons name={'arrow_left'} color={'#fff'} size={'0.986em'}/>
                          </a> :null}
                          {isSyncTime? <a className="icons_btn" onClick={_th6_.fw0_5SecSyncTime.bind(_th6_)}>
                            <Icons name={'arrow_right'} color={'#fff'} size={'0.986em'}/>
                          </a> :null}
                          {isSyncTime? <a className="icons_btn" onClick={_th6_.clearSyncTime.bind(_th6_)}>
                            <Icons name={'delete'} color={'#fff'} size={'0.986em'}/>
                          </a>
                          :null}
                          {isSyncTime? null: <a className="icons_btn" onClick={_th6_.enableSyncTime.bind(_th6_)}>
                            <Icons name={'history'} color={'#fff'} size={'0.986em'}/>
                          </a>}
                      </div>  
                      <div className="list_subtitles">
                        <div className={`items ${subtitleId?'':'active'}`} onClick={_th6_.handleSubtitleId.bind(_th6_,null)}>
                          <div className={`marked`}>{!subtitleId?<Icons name={'done'} color={'#fff'} size={'1.6em'}/>:null}</div> <div className={`_label`}>{'Disabled'}</div>
                        </div>
                        {Object.keys(subtitle).map((st,i)=>{
                          return(
                          <div className={`items ${subtitleId===st?'active':''}`} onClick={_th6_.handleSubtitleId.bind(_th6_,st)} key={i}>
                            <div className={`marked`}>{subtitleId===st?<Icons name={'done'} color={'#fff'} size={'1.6em'}/>:null}</div> <div className={`_label`}>{st}</div>
                          </div>
                          )
                        })} 
                        <div className="items"  onClick={_th6_.open_actionsOptions.bind(_th6_,false)}>                        
                          <div className={`marked`}></div> <div className={`_label`}>{'from Url'}</div>    
                        </div>
                        <div className="items" onClick={_th6_.open_actionsOptions.bind(_th6_,true)} >
                          <div className={`marked`}></div> <div className={`_label`}>{'from File'}</div>                       
                        </div>
                      </div>
                    </div>
                  </div>                 
                </div>
            </TouchablePopupButton>
            <a className="nfp-button-control" onClick={_th6_.FullScreenButton}>            
              <Icons name={Fsc} color={'#fff'} size={'1.6em'}/>
            </a>            
          </div>
         </div>        
      </div>  
    )
    
  }
}



function mapStateToProps(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded, 
    currentTime: state.common.currentTime,
    duration: state.common.duration,  
    subtitle: state.common.subtitle,  
    subtitleId: state.common.subtitleId,
    subtitleSyncTime: state.common.subtitleSyncTime,
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ButtonActions);








class TouchablePopupButton extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active:false         
    };
  }

  componentWillMount() {      
    this.handleIn = this.handleIn.bind(this);
    this.handleOut = this.handleOut.bind(this);
  }
  componentDidMount(){     
    
  }

  handleIn(){
    if(!this.state.active){
      if (typeof this.props.barVisible === 'function') { this.props.barVisible(false);}    
      this.setState({active:true})  
    }
  }


  handleOut(){
    if(this.state.active){
      if (typeof this.props.barVisible === 'function') { this.props.barVisible(true);}
      this.setState({active:false})  
    }
  }

  confirm(v){ 
    this.setState({active:v});
    setTimeout(()=>{
      this.dialogRef && this.dialogRef.resizehandler();
    },120)  
  }


  render() {
    var _th6_ = this;
    const {children,style,icon} = _th6_.props; 
    const {active} = this.state;  
    var sty = style?style:{};
    return(
            <div className="touchable ReportAProblemPopupContainer PlayerControls--control-element nfp-popup-control" onClick={_th6_.confirm.bind(_th6_)}   onMouseMove={this.handleIn.bind(_th6_)} onMouseOut={this.handleOut.bind(_th6_)}>
              <a className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerReportAProblem">
                <Icons name={icon} color={'#fff'} size={'1.6em'}/>
              </a>
              <div style={sty} className={`touchable popup-content-wrapper keep-right ${active?'active':''}`}>              
                  {children}        
              </div>
            </div>
    )
  }
}


//conv2V = 'C:/Bento4/bin/ffmpeg -i '+ pth+_id+'_original.'+ie +' -pix_fmt yuv420p -r 23.976 -vcodec libx264 -vf "scale=426:240" -b:v 320k -preset ultrafast -keyint_min 24 -g 48 -x264opts keyint=144:no-scenecut -strict experimental  -threads 4 -af "aresample=async=1:min_hard_comp=0.100000:first_pts=0" -map_metadata -1 -movflags frag_keyframe+empty_moov+default_base_moof+faststart -brand dash:0 -f mp4 ' + pth+_id+'_f_240.'+ie
    













class SomethingWentWrong extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active:false,
      activeTab:{}         
    };
  }

  componentWillMount() {      
    this.handleIn = this.handleIn.bind(this);
    this.handleOut = this.handleOut.bind(this);
  }
  componentDidMount(){     
    
  }

  handleIn(){
    if(!this.state.active){
      if (typeof this.props.barVisible === 'function') { this.props.barVisible(false);}    
      this.setState({active:true})  
    }
  }


  handleOut(){
    if(this.state.active){
      if (typeof this.props.barVisible === 'function') { this.props.barVisible(true);}
      this.setState({active:false})  
    }
  }


  sendReport(jb){
    //this.dialogRef && this.dialogRef.Close();
    if (typeof this.props.PlayButton === 'function') { this.props.PlayButton();}
  }

  confirm(t,i){
    
    var _activeTab = this.state.activeTab;
    if(i){
      _activeTab[t] = i
    }else if(_activeTab[t]){
      delete _activeTab[t]
    }
    if(Object.keys(_activeTab).length>0){
      this.setState({active:true, activeTab:_activeTab})
      if(!this.state.active){
        if (typeof this.props.updHeight === 'function') { this.props.updHeight('90vh');}
      }
    }else{
      this.setState({active:false, activeTab:_activeTab})
      if(this.state.active){
        if (typeof this.props.updHeight === 'function') { this.props.updHeight('70vh');}
      }
    }

    if (typeof this.props.barVisible === 'function') { this.props.barVisible(true);}
    if (typeof this.props.confirm === 'function') { this.props.confirm();}
  }


  render() {
    var _th6_ = this;
    const {children,style,icon} = _th6_.props; 
    const {active} = this.state;  
    var sty = style?style:{};
    return(
      <div className="something--wrong--Dialog" >
        <div>              
            <h3 className="title"><span>¿Qué sucede?</span></h3>
            <h4 className="title--desc"><span>Selecciona todas las opciones que correspondan.</span></h4>              
        </div>
        <div className="ReportAProblemDialogContainer"> 
          {problemsTypes.map((p,innd)=>{
            return(
              <ReportAProblemDialogFieldset title={p.title} desc={p.desc} confirm={this.confirm.bind(this,innd)}/>                  
            )
          })}
          <div className={`ReportAProblemDialog--message-fieldset  ${active?'visible':''}`}>
            <h4 className="ReportAProblemDialog--details-header">
              <span className="ReportAProblemDialog--details-question">¿Más información?</span>
              <span className="ReportAProblemDialog--details-question-optional">(opcional)</span>
            </h4>
            <textarea  className="ReportAProblemDialog--textarea" rows="5" cols="30"></textarea>
            <button  type="submit" aria-label="Enviar informe" className="ReportAProblemDialog--submit-button" onClick={this.sendReport.bind(this)}><span>Enviar informe</span></button>
          </div>
        </div>                
      </div>
    )
  }
}















class ProgressVolume extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open:false,
      active:false,
      time:null,
      hover:false,
      ct:100,
      dms:{},
      startY:0,
      dragging:false,
      progress_hover:0, 
      progress_thumbnail:'', 
      progress_time:'',    
    };
  }

  componentWillMount() {  
    
  }

  componentDidMount(){     
  
  }

  componentWillUnmount(){     
    
  }
  
  handleIn(){
    if(!this.state.active){
      if (typeof this.props.barVisible === 'function') { this.props.barVisible(false);}    
      this.setState({active:true})  
    }
  }


  handleOut(){
    if(this.state.active){
      if (typeof this.props.barVisible === 'function') { this.props.barVisible(true);}
      this.setState({active:false})  
    }
  }

  handleRange(event){   
    var c2ct = event.target.value;
    var ctdrg = c2ct*100;
    if (typeof this.props.updVolume === 'function') { this.props.updVolume(c2ct);}
    this.setState({ct:ctdrg})
  }

  confirm(event){ 
    this.setState({active:false})
    if (typeof this.props.barVisible === 'function') { this.props.barVisible(true);}
    if (typeof this.props.confirm === 'function') { this.props.confirm();}
  }

  mute(event){ 
    if (typeof this.props.setMute === 'function') { this.props.setMute();}
    //this.setState({active:false})
    ///if (typeof this.props.barVisible === 'function') { this.props.barVisible(true);}
    //if (typeof this.props.confirm === 'function') { this.props.confirm();}
  }



  handleProgressBar_Click(){     
    
  }

  ref = v => {
    this.colBar = v
  }

  render() {
    var _th6_ = this;
    const {isMute,volume} = _th6_.props; 
    const {active,ct,dragging} = this.state;      
    var ct2 = dragging? ct: volume*100;
    var icon = isMute?'volume_mute':ct2/100>0.5?'volume_up':ct2/100===0?'volume_mute':'volume_down';
    return(
            <div className="touchable ReportAProblemPopupContainer PlayerControls--control-element nfp-popup-control" onClick={_th6_.confirm.bind(_th6_)} onMouseMove={_th6_.handleIn.bind(_th6_)} onMouseOut={_th6_.handleOut.bind(_th6_)}>
              <a className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerReportAProblem" onClick={_th6_.mute.bind(_th6_)} >
                <Icons name={icon} color={'#fff'} size={'1.6em'}/>
              </a>
              <div className={`touchable popup-content-wrapper keep-right  ${active?'active':''}`} style={{margin:'0 0.5em'}} >              
                <div className="volume--container">
                  <div className="volume--bar" ref={this.ref} onClick={this.handleProgressBar_Click.bind(_th6_)} style={{"--heliumPlayer--max":1,"--heliumPlayer--min":0,"--heliumPlayer--val":ct2/100,"--heliumPlayer--color--range--volume--active":"#e50914","--heliumPlayer--color--range--volume--back":"#7e7e7e"}}>                      
                    <input className="volume--range" type="range" min={0} max={1} step={0.01} onChange={_th6_.handleRange.bind(_th6_)}/>
                  </div>
                </div>        
              </div>
            </div>
    )
  }
  
}






class ReportAProblemDialogFieldset extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active:false         
    };
  }

  componentWillMount() {      
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount(){     
    
  }

  toggle(){       
    var ta= !this.state.active;
    this.setState({active:ta})
    if (typeof this.props.confirm === 'function') { this.props.confirm(ta);}
  }

  render() {
    var _th6_ = this;
    const {title,desc} = _th6_.props; 
    const {active} = this.state;
    return(
      <div className={`ReportAProblemDialog--fieldset  ${active?'visible':''}`} onClick={this.toggle.bind(this)}>
        <div className="ReportAProblemDialog--checkbox-container" >
          <span className="ReportAProblemDialog--checkbox-input"/>
          <span className="ReportAProblemDialog--checkbox"></span>
        </div>
        <div className="ReportAProblemDialog--label-container">
          <label className="ReportAProblemDialog--checkbox-label">
            <span>{title}</span>
            <span className="ReportAProblemDialog--checkbox-label-definition" >{desc}</span>
          </label>
        </div>
      </div>
    )
  }
}















class OpenUrlSubtitle extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active:false,   
      url:'',
      fileBlob:'',
      label:'',
      _Id:Util.genId()  
    };
  }

  componentWillMount() {      
    
  }
  componentDidMount(){     
    
  }
  sendReport(){       
   
  }


  confirm(){      
    const {url, label, fileBlob} = this.state;
    const {file} = this.props;
    if(file){
      if (typeof this.props.confirmFile === 'function') { this.props.confirmFile(fileBlob,label);}    
    }else{
      if (typeof this.props.confirm === 'function') { this.props.confirm(url,label);}
    
    }
   
  }

  labelInput(e){
    const {url,fileBlob} = this.state;
    const {file} = this.props;
    this.setState({label:e.target.value});
    if(!file && Util.urlValidate(url) && e.target.value){
      this.setState({active:true});
    }
    else if(file && fileBlob && e.target.value){
      this.setState({active:true});
    }
    else{
      this.setState({active:false});
    }
  }

  labelInput_Blur(e){    
    const {url,fileBlob} = this.state;
    const {file} = this.props;
    this.setState({label:e.target.value});
    if(!file && Util.urlValidate(url) && e.target.value){
      this.setState({active:true});
    }
    else if(file && fileBlob && e.target.value){
      this.setState({active:true});
    }
    
  }

  UrlCheckInput(e){
    const {label} = this.state;
    this.setState({url:e.target.value});
    if(Util.urlValidate(e.target.value) && label){
      this.setState({active:true});
    }else{
      this.setState({active:false});
    }
  }

  onBlurUrlCheckInput(e){
    const {label} = this.state;
    this.setState({url:e.target.value});
    if(Util.urlValidate(e.target.value) && label){
      this.setState({active:true});
    }
  }



  dropHandler (ev) {
    var _th2 = this;
    var UploadUrl = `http://localhost:8080/UploadVideo`;
    ev.preventDefault();
    if (ev.dataTransfer.items) { 
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          /*this.props.commonStore.UploadList[file.name] = {};
          this.props.commonStore.UploadList[file.name][`metadata`] = file;
          this.props.commonStore.UploadList[file.name][`progress`] = 0;
          this.props.commonStore.UploadList[file.name][`aborted`] = false;          
          _th2.makeFileRequest(UploadUrl, [], file);
          this.props.commonStore.uploadStarted = true;
          this.props.commonStore.UploadProgress()*/
        }
      }
    } else {      
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    } 
  }

  dragOverHandler (ev){    
    ev.preventDefault();
  }


 readFile(event) {    
    const {label} = this.state;
    this.setState({fileBlob:event.target.result});
    if(event.target.result && label){
      this.setState({active:true});
    }else{
      this.setState({active:false});
    }
  }



  fileCheckInput(e){   
  var _th6_ = this;   
   const {active,_Id,label} = this.state;
   var input = document.querySelector('input[type=file]');
   if(input && input.files && input.files[0]){
    var file = input.files[0];
    if(!label){
      var __ext_ = file.name.split('.').pop();
      var __lbl_ = file.name.split(`.${__ext_}`)[0];
      this.setState({fileName:file.name,label:__lbl_});
    }else{
      this.setState({fileName:file.name});
    }
    
    var reader = new FileReader();
    reader.addEventListener('load', _th6_.readFile.bind(_th6_));
    reader.readAsText(file);
   }
  }

  render() {
    var _th6_ = this;   
    const {active,_Id,fileBlob,fileName,label,url} = this.state;
    const {file} = this.props;
    var inputFileStyle ={opacity:`0`,height:`100%`,width:`100%`}
    var labelField = label || '';
    var urlField = url || '';
    return(
      <div className="something--wrong--Dialog" >
            <div>              
              <h3 className="title"><span>Load Subtitle from Url!</span></h3>                       
            </div>
            <div className="ReportAProblemDialogContainer"> 
          <div>
          <h5 className="label--input"><span>Type a Label.</span></h5>     
            <input type="text" onChange={_th6_.labelInput.bind(_th6_)} onBlur={_th6_.labelInput_Blur.bind(_th6_)} value={labelField} />
          </div>
         
          {file?
          <div className={`upload--Wrapper`}>
            <div className={`file_Done`}>{fileBlob?<Icons name={'done'} color={'#fff'} size={'1.6em'}/>:null}</div>
            <div className="upload--Container"  onDrop={_th6_.dropHandler.bind(_th6_)} onDragOver={_th6_.dragOverHandler.bind(_th6_)}>          
              <span>{fileBlob? fileName:'Browse or Drag n Drop files ...'}</span>
              <input type={`file`} style={inputFileStyle} id={_Id} onChange={_th6_.fileCheckInput.bind(_th6_)} accept=".vtt,.srt"/>              
            </div>
          </div>: 
          <div>
            <h5 className="label--input"><span>Type a url</span></h5>           
            <input type="text" onChange={_th6_.UrlCheckInput.bind(_th6_)} onBlur={_th6_.onBlurUrlCheckInput.bind(_th6_)}  value={urlField}/>
          </div>
        }
            <div className={`ReportAProblemDialog--message-fieldset  ${active?'visible':''}`}>              
              <button  type="submit" aria-label="Enviar informe" className="ReportAProblemDialog--submit-button" onClick={_th6_.confirm.bind(_th6_)}><span>Load Subtitle</span></button>
            </div>
            </div>                
          </div>
    )
  }
}





