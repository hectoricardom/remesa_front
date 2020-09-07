import React, { Component } from 'react';
import Icons from '../Icons/Icons'
//import Dialog from '../dialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';


import * as Util from '../../state/Util';


import './style.css';



class UploadVideo extends Component {
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
  var UploadUrl = `http://localhost:7070/UploadVideo`;
   const {active,_Id,label} = this.state;
   var input = document.querySelector('input[type=file]');
   if(input && input.files && input.files[0]){
    var file = input.files[0];
    _th6_.props.commonActions.makeFileRequest(UploadUrl, [], file);

    if(!label){
      var __ext_ = file.name.split('.').pop();
      var __lbl_ = file.name.split(`.${__ext_}`)[0];
      this.setState({fileName:file.name,label:__lbl_});
    }else{
      this.setState({fileName:file.name});
    }
     /*
    var reader = new FileReader();
    reader.addEventListener('load', _th6_.readFile.bind(_th6_));
    reader.readAsText(file);
    */
   
   }
  }

  render() {
    var _th6_ = this;   
    const {active,_Id,fileBlob,fileName,label,url} = this.state;
    const {uploadProgress} = this.props;
    var inputFileStyle ={opacity:`0`,height:`100%`,width:`100%`}
    var labelField = label || '';
    var urlField = url || '';
    return(
      <div className="something--wrong--Dialog" >
            <div>              
              <h3 className="title"><span>Load Video</span></h3>                       
            </div>
            <div className="ReportAProblemDialogContainer">               
                <div className={`upload--Wrapper`}>
                  <div className={`file_Done`}>{fileBlob?<Icons name={'done'} color={'#fff'} size={'1.6em'}/>:null}</div>
                  {uploadProgress}
                  <div className="upload--Container"  onDrop={_th6_.dropHandler.bind(_th6_)} onDragOver={_th6_.dragOverHandler.bind(_th6_)}>          
                    <span>{fileName? fileName:'Browse or Drag n Drop files ...'}</span>
                    <input type={`file`} style={inputFileStyle} id={_Id} onChange={_th6_.fileCheckInput.bind(_th6_)} accept=""/>              
                </div>
                </div>
                <div className={`ReportAProblemDialog--message-fieldset  ${active?'visible':''}`}>              
                  <button  type="submit" aria-label="Enviar informe" className="ReportAProblemDialog--submit-button" onClick={_th6_.confirm.bind(_th6_)}><span>Load Subtitle</span></button>
                </div>
            </div>                
          </div>
    )
  }
}




function mapStateToProps(state, ownProps) {
  return {       
    appLoaded:state.common.appLoaded, 
    uploadProgress: state.common.uploadProgress,
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadVideo);




