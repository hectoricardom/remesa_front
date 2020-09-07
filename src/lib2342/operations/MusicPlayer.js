
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import * as _Util from '../../store/Util';
import Icons from '../Icons'

import {  CloseModal, getFtpStream64  } from '../../actions/common'



import '../_styles.css'




const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges); 
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id});
  }

  return { observe, dispatch, close }
}



var ImgTmOut = null;
var vidPlyEvnt = null

const MusicPlayer = (props) => {  
  const {data} = props;  
  const { observe,  close, dispatch } = useObserve();
  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;

  
  const item = _state["item2Stream"];

  const [media, setMedia] = useState(null);
  const [imgDmz, setImgDmz] = useState(null);
  const [indexNext, setIndexNext] = useState(null);
  const [dataType, setDataType] = useState(null);

  let modalID = data.modalID; 
  let _srt_ = item["pth"];  
  let label = item["flName"];  
    
  let _ftpStreamJson = _state["ftpStreamJson"];

  
  if(_srt_ && !media && _ftpStreamJson && _ftpStreamJson[_srt_] && _ftpStreamJson[_srt_]['done']){    
    setMedia(_ftpStreamJson[_srt_]["blob"]);
    var i = new Image(); 
    i.src = _ftpStreamJson[_srt_]["blob"];
    if(_ftpStreamJson[_srt_]["type"].indexOf("audio")>=0){      
      setDataType("audio");
      setTimeout(()=>{
        let vid=`__media_${data.modalID}_`;
        let vidPly = document.getElementById(vid);
        if(vidPly){          
          vidPlyEvnt = true;
          vidPly.addEventListener('ended', (e)=>{
            goNext();
          })
        }
      },750)
    }else{
      setDataType("image");
      ImgTmOut = setTimeout(()=>{
        goNext();
      },5000)     
    }   
    i.onload = function(){
      let imgSz = {}
      imgSz['width']=i.width;
      imgSz['height']=i.height;
      setImgDmz(imgSz)
    }
  }
  
  let factorImg = 1;
  if(imgDmz && imgDmz.height>(window.outerHeight*.75)){
    let fct = Math.ceil(imgDmz.height/(window.outerHeight*.75));
    factorImg = fct;
  }



  const goBack = (props) => { 
    close(modalID)
  }

const goNext = () => { 
  let label = _srt_.split("/").pop();
  let listNextFiles = _state["listNextFiles"];
  listNextFiles && listNextFiles.map((flN,flNId)=>{
    if(flN.flName===label){
      let _q = listNextFiles[flNId+1]      
      if(_q){        
        setIndexNext(flNId+1);
        getFtpStream64(_q,dispatch, false);
        _Util.updStore("item2Stream",_q); 
        setMedia(null); 
        if(ImgTmOut){
          clearTimeout(ImgTmOut);
        }        
        if(vidPlyEvnt){
          let vid=`__media_${data.modalID}_`;
          let vidPly = document.getElementById(vid);
          if(vidPly){
            vidPly.removeEventListener('ended', (e)=>{ })
          }
        }
      }    
    }
  })
}

const goPrev= () => { 
  let label = _srt_.split("/").pop();
  let listNextFiles = _state["listNextFiles"];
  listNextFiles && listNextFiles.map((flN,flNId)=>{
    if(flN.flName===label){      
      let _q = listNextFiles[flNId-1]
      if(_q){
        setIndexNext(flNId-1);
        getFtpStream64(_q,dispatch, false);
        _Util.updStore("item2Stream",_q); 
        setMedia(null); 
        setImgDmz(null);
        if(ImgTmOut){
          clearTimeout(ImgTmOut);
        }
        if(vidPlyEvnt){
          let vid=`__media_${data.modalID}_`;
          let vidPly = document.getElementById(vid);
          if(vidPly){
            vidPly.removeEventListener('ended', (e)=>{ })
          }
        }
      }   
    }
  })
}

  let imgHeight = 480;
  let imgWidth = 960;

  if(imgDmz){
    imgHeight = imgDmz.height/factorImg;
    imgWidth = imgDmz.width/factorImg;
  }


  return (
    <>
      <div {...data.modalID?{"dialog-key-id":data.modalID}:""} className={`music_container`}> 
        <div  id={_state.keys[35]} className={` music_header_ ${true?'active':''}`}> 
          <div className={``}>
            {
            <span onClick={()=>goBack()} className={``}>             
              <div className="_dsplFlx ">
                <Icons name={'arrowBack'} color={'#fff'} size={'2.6em'}/>
                <div className={`aro-row-header _dsplFlx ${"titleView"}`}>
                  <Icons name={dataType === "audio"?'music_note_m':"image_outline"} color={dataType === "audio"?'#ff3d00':"#1a73e8"} size={'1.8em'}/> 
                  <div className="see-all-link musicTitle">{label}</div>
                  <div className="aro-row-chevron icon-akiraCaretRight"></div>
                </div>   
              </div>
            </span>  

            }                      
          </div>
        </div>
        <div className={"_DlgWrp "}>
          {dataType ?
          <div  className={"_dsplFlx _sortHrz"}>            
            <div onClick={()=>goPrev()} className={`arrow_btn`}>  
              <Icons name={"arrow_left"} color={'#dfdfdf'} size={'65px'}/> 
            </div>
            <div className="flexSpace"/>
            {dataType === "audio"?
              <div className={"audio_ply2 "}>               
                  {media?<audio src={media}  id={`__media_${data.modalID}_`} controls autoPlay={true} /> :null}                     
              </div> 
              :
              <>
              {imgDmz && imgDmz.height ?
              <div className={"image_viewer"} style={{marginLeft:( imgWidth)/-2, marginTop: (imgHeight)/-2 }}>              
                {media?<img src={media} alt={data.modalID} id={`__media_${data.modalID}_`} style={{height: imgHeight, width: imgWidth }} /> :null}                     
              </div> 
              :null
              }
            </>
            }
            <div className="flexSpace"/>
            <div onClick={()=>goNext()} className={`arrow_btn`}>  
              <Icons name={"arrow_right"} color={'#dfdfdf'} size={'65px'}/> 
            </div>
          </div>
          :null}
        </div>
      </div>
    </>
  )
}

 
//   <HeliumPlayer/>


export default MusicPlayer



