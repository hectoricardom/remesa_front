
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import * as _Util from '../../store/Util';
import Icons from '../Icons'

import {  CloseModal,  } from '../../actions/common'



import '../_styles.css'


const operationType = 'music_player'



const useObserve = () => {
  const observe =  useSelector(state => state.observeChanges);
 
  const dispatch = useDispatch()
  const close = (Id) => {
    CloseModal(dispatch,{id:Id});
  }


 


  return { observe,  close }
}

const MusicPlayer = (props) => {  
  const {data} = props;  
  const { observe,  close } = useObserve();
  const item = data.item || {};
  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;


  const [media, setMedia] = useState(null);
  let modalID = data.modalID; 
  let _srt_ = item["pth"];    
  let _ftpStreamJson = _state["ftpStreamJson"];
  let label = _srt_.split("/").pop();



  console.log(props)
  if(_srt_ && !media && _ftpStreamJson && _ftpStreamJson[_srt_] && _ftpStreamJson[_srt_]['done']){    
    setMedia(_ftpStreamJson[_srt_]["blob"]);
  }
  const goBack = (props) => { 
    close(modalID)
  }
  
  console.log(modalID,media)
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
                  <Icons name={'music_note_m'} color={'#ff3d00'} size={'1.8em'}/> 
                  <div className="see-all-link musicTitle">{label}</div>
                  <div className="aro-row-chevron icon-akiraCaretRight"></div>
                </div>   
              </div>
              
            </span>  

            }                      
          </div>
        </div>
        <div  className={"audio_ply "}>   
            {media?<audio src={media} controls autoPlay={true} /> :null}                     
        </div> 
      </div>
    </>
  )
}

 
//   <HeliumPlayer/>


export default MusicPlayer



