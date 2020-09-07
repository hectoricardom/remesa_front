

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../lib/redux'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import { getVideosById, VideoFiles, UpdVideos, AddGenre2Video, RmvGenre2Video } from '../../actions/videos'
import { OpenModal, makeFileRequest } from '../../actions/common'

import * as _Util from '../../lib/Util'
import Icons from '../../components/Icons'
import Layout from '../../components/MyLayout';

import DialogPlayer from  '../../components/operations/dialogPlayer';

import DImageUpload from  '../../components/operations/dialogImageUpload';


import BTNH from  '../../components/btns_confirm';


import LazyImage from '../../components/lazyImage';


import InputText from '../../components/InputText';

import DropBtn from '../../components/dropBtn';


import DialogHRM from '../../components/DialogHRM';
import Link from 'next/link'

import MenuSlideSide from '../../components/MenuSlideSide';

const formName = "video2Upd";

const operationType = 'videos'

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  let _state =  useSelector(state => state);
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();
  const fetchDetails =  useSelector(state => state.fetchDetails);
  const modal = useSelector(state => state.listDialog);
  let details = _state['detailVideoByID'];


  /*
  let details  = null, _prods = null;
  if(_Util.isJson(_detailLocationByID)){
    let parsedDetail = JSON.parse(_detailLocationByID);
    details  = parsedDetail['details'];
    _prods = parsedDetail['productsOnLocation'];
  }
*/
  
  const updFormsField= (form,field,v) => {
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



  const updForms= (form,v) => {
    let _forms = forms;
    _forms[form] = v;    
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'forms',value:_forms}
    })   
  }

  const _getVideosById= (id,operation) => {
    getVideosById(id, dispatch, _state);
  }

  
  const _updVideos= (doc) => {
    UpdVideos(doc, dispatch, _state);
  }

  


  const OpenPlayer = (items, _ID) => {

    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['observeResize']=true;    
    data['height']=items.metadata.height<480?(items.metadata.height)*1+80:480;
    data['width']=(items.metadata.width)*1+80; 
    data['props']={title:"", id: _ID, items:items};
    data['content'] = DialogPlayer; 
    //console.log(data)
    OpenModal(dispatch,data);
  }


  const OpenUpload = (i, _ID) => {
    let data = {};
    data['list']=modal;
    data['zIndex']=150;
    data['observeResize']=true;
    data['props']={title:"", id: _ID, item:i};
    data['content'] = DImageUpload; 
    //console.log(data)
    OpenModal(dispatch,data);
  }



  const _getVideoFiles = (q,operation) => {
    VideoFiles(q, dispatch, _state, operation);
  }




  return { 
    observeChanges, 
    details, 
    forms, 
    fetchDetails,
    _state,    
    updForms, 
    _getVideosById,
    OpenPlayer,
    _getVideoFiles,
    OpenUpload,
    _updVideos
  }
}



const handleEdit = () => {


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



const updVideo = (idV,idF, func) => {
    let upd = {id:idV, code:idF}
    func(upd)
}


const publicVideo = (idV,idF, func) => {
  let upd = {id:idV, public:idF}
  func(upd)
}


const linkWboxarts  = (idV,idF,k, func) => {
  let upd = {id:idV, [k]:idF}
  func(upd)
}

const updEditView = (v,setV,updForms,item) => {
  setV(!v)
  updForms(formName,item)
}


const updSave= (forms,setV,updForms, func) => {
  setV(false);
  let fld2Prs = ['id','title','synopsis','year'] ;
  
  let _2Fs = forms[formName] || {};  
  let _2s = {};
  _2Fs && fld2Prs.map(fld=>{
    _2s[fld] = _2Fs[fld];
  })
  console.log(_2s);
  func(_2s);
  updForms(formName,{})
}


const updGenre = (id,v,g) => {
  let ex = g.filter(a=>a==v);
  if(ex && ex[0]){
    RmvGenre2Video({id:id,genre:v})
  }else{
    AddGenre2Video({id:id,genre:v})
  }
}








const VideoViewDetail = (props) => {
  const { 
    fetchDetails, details,
     observeChanges,    
     OpenPlayer,  
     updForms,
     forms,
     OpenUpload,
     _getVideosById,
    _getVideoFiles,
    _updVideos,
    _state
  } = useObserveChanges();

  const router = useRouter()
  const [initialize, setInitialize] = useState(false);

  const [editView, setEditView] = useState(false);



  const [view, setView] = useState(0);
  let _options = [
    {label: 'details', icon:'analytics', visible:true },
    {label: 'images', icon:'photo_outline', visible:true },
    {label: 'video files', icon:'video', visible:true }
  
  ]
  
  let _ID = router.query.id;
  // console.log(router)
  useEffect(() => {
    if(!initialize){
      setInitialize(true);
      _getVideosById(_ID);
    }
    if(item && item["id"] !==_ID){
      _getVideosById(_ID);
    }

  });

  let uploadID = _state.keys[71]


  let item = details;

  let IMg = item && item['boxarts']; 

  
  var _thumbnailJson = _state['thumbnailJsonBlob'] && _state['thumbnailJsonBlob'][IMg] && _state['thumbnailJsonBlob'][IMg]['blob'];


  let fileVideoSearch = _state['fileVideoSearch']

 


  let _genres = item && item['genres'] && item['genres'].length>0 && parseGenres(_state.genres,item['genres']); 
  let _genresList = parseGenresList(_state.genres); 






    return (
      <>
      <style>
        {dep_style}
      </style>
      <style>
        {dep_style22}
      </style>
      <Layout />

     


            {item && item.id && 
            <>
            
            <div  className={`_dsplFlx _mrg15 _VideoDetail _desktopV  ${!editView && _thumbnailJson?"boxartsW":""}`}>  

            {!editView &&
              <div className={'boxarts  _total2 '}>   
                <LazyImage src={IMg}/> 
              </div>  
              }     
              <div className={'payment_details  _total2 '}>   
                {!editView?
                <h1>{item['title']}</h1> :  
                <InputText
                  form={formName} 
                  field={`title`}                  
                  placeholder={'Titulo'}
                  OnChange={(e)=>{}} 
                />
              }
              </div>
              <div className="flexSpace"/>  
              <div className={'_stock_Location_'}>
                <div className={`fieldPadding`} onClick={(e)=>{
                  editView?updSave(forms,setEditView,updForms,_updVideos):updEditView(editView,setEditView,updForms,item);
                  }} >
                  <Icons 
                    name={editView?"outline_save":'outline_edit'} 
                    color={'#555'} 
                    size={24} 
                    tooltip={editView?"Guardar":`Editar`}
                    extraClass={'edit'}
                  />               
                </div>
                <span onClick={()=>{}}>
                  <BTNH theme={`light_blue`} title={'Publicar'}/>
                </span> 

              </div>
              
              
            </div> 
           
            

            <div  className={`area_wrpp  _dsplFlx`}>
                {!editView? 
                      <div className={`_VideoDetail`}>
                          <p>{`genres`}</p>
                          <div  className={'__amount__ __gm2_text_'}>  {_genres &&  _genres['txt']}</div> 
                      </div>:  
                       <div style={{position:'relative',marginTop: `10px`}} onClick={()=>{}}  className={`fieldPadding`}>
                        <DropBtn 
                          theme={`light_blue`} 
                          title={'generos'}
                          list={_genresList}
                          form={formName}
                          keyCode={10}
                          field={"genres"}
                          OnSelect={(e)=>updGenre(item['id'],e,item['genres'])}
                        />
                      </div>
                    }

              <div className="flexSpace"/> 
              {!editView? 
                <div className={`_VideoDetail `}>
                    <p>{`Año`}</p>
                    <div  className={'__amount__ __gm2_text_'}>  {item['year']}</div> 
                  
                </div>:  
                <div className={`_VideoDetail `}>
                <InputText
                  form={formName} 
                  field={`year`}                  
                  placeholder={'Año'}
                  validations={{required:true, number:true, minValue:1900, maxValue:2100}} 
                  OnChange={(e)=>{}} 
                />
              </div>
              }

            </div>
            </>
            } 
          {fetchDetails && !item &&

            <Link href="/departments" as={`/departments`}>
            <a>{'this item is no longer exist'}</a>
            </Link>

            }

            {false && !fetchDetails && 

            <div>
              <span>
              {'Loading .... '}
              </span>
            </div>

            }

            {item && 
        <div className={`_dsplFlx _operationsWrp_`}>
          <MenuSlideSide options={_options} updFiltersTab={(e)=>setView(e)} />
            <div  className={` _wrpSld_ `}>
              <div className={` _wrpView_ wdt100 ${view===0 && 'visible'}`} >    
                <div className={'_desktopV  '} >
                  <div  className={`area_wrpp `}>                  
                  </div>
                  <div  className={`area_wrpp `}>
                    <div className={` _VideoDetail`}>
                    {!editView? 
                      <div className={` `}>
                          <p>{`synopsis`}</p>
                          <div  className={'__amount__ __gm2_text_'}>  {item['synopsis']}</div> 
                      </div>:  
                      <div className={` `}>
                        <InputText
                          form={formName} 
                          field={`synopsis`}                  
                          placeholder={'synopsis'}
                          OnChange={(e)=>{}} 
                        />
                      </div>
                    }
                    </div>
                  </div>
               </div>
            </div>
            <div className={` _wrpView_ wdt100  ${view===1 && 'visible'}`} >    
               {view===1 && 
                  <div className={'_desktopV  '} >
                    <div className={'_dsplFlx  '} >  
                      <div className="flexSpace"/>  
                      <span onClick={()=>{OpenUpload(item)}}>
                        <BTNH theme={`light_blue`} title={'Upload Image'}/>
                      </span> 
                    </div>
                    <div  className={'_dsplFlx _flxWrp '} >
                      {
                        item && item['images']  && item['images'].map(im=>{
                        return (
                          <div className={'imagesView '}>   
                            <LazyImage src={im}/> 
                            <div className={'_actions_Wrp_'}>
                              <div className={'_actions_Btns_ flxbsc30'}>
                                  <div onClick={()=>linkWboxarts(item['id'],im,"boxarts", _updVideos)}>
                                    <Icons 
                                      name={'add_photo_outline'} 
                                      color={'#555'} 
                                      size={24}  
                                      tooltip={`assosiar con boxarts`}
                                      extraClass={`edit`}
                                    />
                                  </div>
                                <div className={'_spaceMrg_'}/>
                                <div  onClick={()=>linkWboxarts(item['id'],im,"poster", _updVideos)}>
                                  <Icons 
                                    name={'add_photo_outline'} 
                                    color={'#555'} 
                                    size={24} 
                                    tooltip={`assosiar con poster`}
                                    extraClass={'edit'}
                                    />
                                </div>
                                <div onClick={()=>{}}>
                                  <Icons 
                                    name={'outline_delete'} 
                                    color={'#555'} 
                                    size={24}  
                                    tooltip={'Borrar Imagen'}
                                    extraClass={`delete`}
                                  />
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
            <div className={`_wrpView_ wdt100  ${view===2 && 'visible'}`}>
            {view=== 2 && 
              <div className={'_desktopV  '} >
                <div className={'_dsplFlx  '} >
                  <div className="flexSpace"/>  
                  <div className={`fieldPadding`}>
                      <InputText 
                        icon={`search`} 
                        form={'fileVideoSearch'} 
                        field={`search`}                  
                        placeholder={_Util.translatetext(80)}
                        OnChange={(e)=>handleSearch(e, "fileVideoSearch", _getVideoFiles)} 
                      />
                    </div>
                </div>
                
                <div className={' htWpr_d8  '}>
                {
                  fileVideoSearch && _Util.ObjectKeys(fileVideoSearch).map(fV=>{
                    let slc = fileVideoSearch[fV];
                    /// console.log(slc)
                    let _linkVideo = item["netflixId"]===slc['id'];


                    return (
                      <div  className={`_dsplFlx roWTd  showActions ${_linkVideo?"isRefWVd":""}`} key={_Util.gen12CodeId()}>
                        <div className={'coLTd flxbsc20 _dsplFlx _svg'} onClick={(e)=>{}} >
                          { _linkVideo?                            
                            <Icons 
                              name={'link'} 
                              color={'#555'} 
                              size={24}  
                              tooltip={`este video esta asociado con ${item["title"]}`}
                            />
                            :
                            <div  className={`locations  marg10 _link_ `}> {slc && slc['id'] }</div>
                          }
                        </div>
                        <div className={'coLTd flxbsc40 _total2 '} onClick={(e)=>{}} >
                            <div  className={'locations marg10 _link_ y2nowrap'}> {slc && slc['originalFile'] && slc['originalFile']['name']}</div>
                        </div>
                        <div className="flexSpace"/>  
                        <div className={'coLTd flxbsc10 _total2 '}>
                            <div  className={'locations marg10 _link_'}> {slc && slc['originalFile'] && slc['originalFile']['type']}</div>
                        </div>
                        <div className="flexSpace"/>  
                        <div className={'_dsplFlx flxbsc20'}>
                          <div className={'_dsplFlx  hide_when_action'}>                         
                            <div className={'coLTd  flxbsc5 _total2 '}>
                                <div  className={'locations marg10 _link_'}> {slc && slc['originalFile'] &&  parseSize(slc['originalFile']['size'])}</div>
                            </div>
                            <div className="flexSpace"/>  
                            <div className={'coLTd flxbsc5 _stock'}>
                              <div  className={'__amount__ __gm2_text_'}>  {slc && slc['processing']}</div> 
                            </div>
                          </div>
                          <div className={'_actions_Wrp_'}>
                            <div className={'_actions_Btns_ flxbsc30'}>
                                <div onClick={()=>OpenPlayer(slc,fV)}>
                                  <Icons 
                                    name={'play'} 
                                    color={'#555'} 
                                    size={24}  
                                    tooltip={'Reproducir'}
                                    extraClass={`delete`}
                                  />
                                </div>
                              <div className={'_spaceMrg_'}/>
                              {!_linkVideo && 
                              <div  onClick={()=>updVideo(item['id'],fV, _updVideos)}>
                                <Icons 
                                  name={'arrows_compare'} 
                                  color={'#555'} 
                                  size={24} 
                                  tooltip={`assosiar con ${item['title']}`}
                                  extraClass={'edit'}
                                  />
                              </div>
                              }
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
          </div>
        </div>
        }
        <DialogHRM />  
      </>
    );
  
}  


export default withRedux(VideoViewDetail)






function parseGenresList(g){
  let ff = []
  g && _Util.ObjectKeys(g).map((_g,i5)=>{
      ff.push({id:_g, name:g[_g]['name']});
  })
  return ff;
}


function parseGenres(g,gA){
  let ff = {txt:'', list:[]}
  gA.map((_g,i5)=>{
    if(g && _g && g[_g] && g[_g]['name']){
      ff['txt'] += (i5>0?", ":"").concat(g[_g]['name']);
      ff['list'].push({id:_g, name:g[_g]['name']});
    }
  })
  return ff;
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





const dep_style = `







._dsplFlx{
  display:flex;
}

.flexSpace{
  flex-basis: 0.000000001px;
  flex: 1 1;
}


.isRefWVd ._svg svg{
  fill:  var(--color-base--hover, #1a38e8);
}

.isRefWVd {
  font-weight: 600;
}


.wdt100{
  width: 100%;   
}

._wrpView_{
  opacity: 0;
  -webkit-transition: opacity .16s ease;
  transition: opacity .16s ease;
  transition-delay: 0s; 
  max-height: 0px;
}

._wrpView_.visible { 
  opacity: 1;
  max-height: 500px;
  transition-delay: 0.61s; 
  -webkit-transition: opacity .46s ease;
  /*, fade-in .6s ease-out forwards, enter-text .6s forwards;*/
  transition: opacity .6s ease;
  position: absolute;
}

.marg10{
  margin-top: 8px;
}

.__gm2_text_{
  color: #3c3c3c;
  font: 600 15px/17px Roboto,sans-serif;
}


.y2nowrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


._wrpSld_{
  width: 95%;
  position: relative;
}


.htWpr_d8{
  width: 75%;
  margin: 15px auto;
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
  max-width: 5%;
  flex-basis: 5%;
}
.flxbsc10{
  max-width: 10%;
  flex-basis: 10%;
}

.flxbsc20{
  max-width: 20%;
  flex-basis: 20%;
}

.flxbsc30{
  max-width: 30%;
  flex-basis: 30%;
}
.flxbsc40{
  max-width: 40%;
  flex-basis: 40%;
}

.flxbsc60{
  max-width: 60%;
  flex-basis: 60%;
}

.flxbsc80{
  max-width: 80%;
  flex-basis: 80%;
}


.flxEnd{
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


.imagesView{
  margin: 10px 7px;
  position: relative;
}



.imagesView img{
  width: 210px;
  height: 302px;
}

._VideoDetail.boxartsW{
  height: 322px;
}


.boxarts img{
  width: 210px;
  height: 302px;
}



._flxWrp{
  flex-wrap: wrap;
}


.imagesView:hover
._actions_Wrp_{   
  display: flex;
  position: absolute;
  bottom: 5px;
  width: 100%;
  background: rgba(0,0,0,0.65);
}


.imagesView:hover
._actions_Wrp_
._actions_Btns_{
  opacity: 1;
}



.imagesView .delete svg,
.imagesView .edit svg{
  fill: #fff;
} 


`




























const dep_style22 = `

._dsplFlx{
  display:flex;
}

.flexSpace{
  flex-basis: 0.000000001px;
  flex: 1 1;
}


.AddDepartment 
._form_group_body_{
  width: 360px;
  margin: 15px auto;
}


.AddDepartment 
._form_group_field_{
  margin: 15px;
}



._departmen_Wrp_Itm_{
  padding: 15px 9px;
}



._departmen_Wrp_Itm_{
  margin: 15px 10px 10px;
  box-shadow: 0 3px 5px 0 rgba(60,64,67,.302), 0 1px 6px 1px rgba(60,64,67,0);
  background: #fff;
  border-radius: 10px;
}


._departmen_Wrp_Itm_ 
._topContainer_ {
  padding: 1px 0px 9px;
}

._departmen_Wrp_Itm_ 
._bottomContainer_ {
  padding: 9px 0px 2px;
}




._departmen_Wrp_Itm_
._topContainer_
._labelName_{
  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-size: .925rem;
  letter-spacing: .2px;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--color-base--hover);
  color: #1a38e8;

  margin-top: 8px;
}




._departmen_section_{
  margin: 2px 7px 5px 20px;
}




._departmen_section_
._labelName_{
  margin: 7px 7px 2px 0;
  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-size: .875rem;
  letter-spacing: .2px;
  font-weight: 500;
  text-transform: capitalize;
  color: rgba(0,0,0,0.86);

}

._departmen_section_
._InStock_checkBox_ {
   margin: 2px 7px 2px 0;
}

.payment_details p.__locations__{
  text-align: left;  
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .875rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  margin: 17px 7px 2px;
}


._departmentDetails
._sections
{
  min-width: 450px;
}

._departmentDetails
._sections
._sectionsItem{
  width: 100%;
}


._departmentDetails
._sections
._sectionsItem
.locations{
  text-align: left;  
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: .875rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  margin: 7px 7px 2px;
}


._departmentDetails
._sections
._sectionsItem
._mrg15 .payment_details .__amount__ {
  margin-left: 9px;
}

._departmentDetails
._sections
._sectionsItem
._mrg15 .payment_details._stock{
  margin-top: 5px;
}



._departmentDetails
._sections
._sectionsItem
._mrg15 .payment_details._stock
.__gm2_text_
{
  margin-top: 3px;
}


._VideoDetail{   
  height: 45px;
}



._VideoDetail
._actions_Location_{   
  display: none;
}

._VideoDetail
._actions_Location_
._actions_Btns_{
   --animation_param: .1s ease;
    opacity: 0;
    width: 100px;
    display: flex;
    -webkit-transition: opacity .1s ease;
    transition: opacity .1s ease;   
}









._VideoDetail
._stock_Location_{
  display: flex;
}



._VideoDetail
._stock_Location_
._stock{
  opacity: 1;
  width: 100px;
  display: flex;
  -webkit-transition: opacity .1s ease;
  transition: opacity .1s ease;  
}


._VideoDetail.tobcosaj
._stock_Location_
._stock{
  --animation_param: .31s ease;
  opacity: 0;
  margin-top: 0px;
  -webkit-transition-delay: 0.16s;
  transition-delay: 0.16s;  
}




._addLoc{
    margin: 5px 0;
}



/*
        DETAILS

*/


._label__category__ {
  color: #6d6d60;
  font: 500 14px/17px Roboto,sans-serif;
}

._label__category__ {
  font: 500 12px/14px Roboto,sans-serif;
  padding: 0 0 8px;
  color: var(--printcolor-error-text);
}



._desktopV{
  max-width:1200px;
  margin: 15px auto;
  width:100%;
}


._locations_dept_{
  margin: 15px 15px 15px 30px;
  width: 100%;
}




.payment_details._stock .__amount__ {
  text-align: right;
  min-width: 40px; 
}






.locationWrp{
  margin: 15px 15px 15px 30px;
  width: calc(100% - 180px);
}



._total2._sectionsItem{
  width: calc(100% - 20px);
}














._location_
._stock{   
  display: flex;
}


._location_.showActions:hover
._stock{   
  display: none;
}




 

._location_
._actions_Location_{   
  display: none;
}

._location_
._actions_Location_
._actions_Btns_{
   --animation_param: .1s ease;
    opacity: 0;
    width: 160px;
    display: flex;
    -webkit-transition: opacity .1s ease;
    transition: opacity .1s ease;   
}

._location_
._actions_Location_
._actions_Btns_{
  padding: 6px 0 0 6px;
}




._location_.showActions:hover
._actions_Location_{   
  display: flex;
}











._location_.showActions:hover
._actions_Location_
._actions_Btns_{  
  --animation_param: .31s ease;
  opacity: 1;  
  -webkit-transition-delay: 0.16s;
  transition-delay: 0.16s;
}


._location_{
  background-color: var(--gm-hairlinebutton-state-color,transparent);
  border:none;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  transition:background-color 15ms linear;
  height: 48px;
  margin: 2px;  
}

._location_:hover{
  background-color: var(--gm-hairlinebutton-state-color,rgba(0,0,0,0.042));
}

._location_
.locations{
  padding: 15px 0 0 17px;
}



._location_
.payment_details._stock p {
  margin : 0 7px 0 0;
  padding: 15px 0 0 17px;
}

._location_
.payment_details._stock .__amount__ {
  text-align: right;
  min-width: 40px;
  padding: 15px 0 0 7px;
}



._location_
.payment_details._stock{  
  min-width: 160px;
} 


._VideoDetail
{

}


._VideoDetail
h1{
  margin: 5px ;
  font-family: Roboto,Arial,sans-serif;
  
}

._VideoDetail
._stock_Location_{
  margin: 5px ;
}


._VideoDetail ._stock_Location_ ._stock{
    width: 180px;
}


._VideoDetail ._stock_Location_ ._stock p{
  margin: 8px 0 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
  text-transform: capitalize;
}

._VideoDetail ._stock_Location_ ._stock .__amount__{
  margin: 4px 0 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: .0107142857em;
}


._VideoDetail ._stock_Location_ ._stock .__amount__{
  text-align: right;
  min-width: 80px;
}


._VideoDetail p{   
  margin: 4px 9px 9px 0;
  color: #6d6d60;
  font: 500 14px/17px Roboto,sans-serif;
  
}




._VideoDetail ._deptName{   
  margin: 4px 0 0;
  color: #3c3c3c;
  font: 600 15px/17px Roboto,sans-serif;
  padding: 0 0 18px 7px;
}



._upprC{
  text-transform: uppercase;
}


.area_wrpp{
  max-width:960px;
  margin: 7px auto;
}





._locationsArea_ p{   
  margin: 4px 9px 9px 0;
  color: #6d6d60;
  font: 500 14px/17px Roboto,sans-serif;
  text-align: right;
}




._locationsArea_ ._deptName{   
  margin: 4px 0 0;
  color: #3c3c3c;
  font: 600 15px/17px Roboto,sans-serif;
  padding: 0 0 18px 7px;
  text-align: right;
}


._location_ ._idsProd{
  padding: 15px 0 0 17px;
  min-width: 160px;
}



._total2._sectionsItem {
  max-width: 780px;
  margin: 10px auto;
}


._total2._sectionsItem {
  max-width: 780px;
  margin: 10px auto;
}

._total2._sectionsItem 
._location_ .payment_details._stock{
  min-width: 60px;
}

._locations_dept_ ._location_ .payment_details._total2  {
  position: relative;
  max-width: 57%;
}

._locations_dept_ ._location_ .locations {
 
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}





`




















