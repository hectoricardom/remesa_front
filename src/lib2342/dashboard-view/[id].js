

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../../store/redux'
import { useSelector, useDispatch } from 'react-redux'

import { 
  getVideosById, 
  VideoFiles, 
  UpdVideos,
  AddGenre2Video, 
  RmvGenre2Video,   
  SearchVideos,
  RmvSeason,  
  rmvEpisode2Season,
  addEpisode2Season 
} from '../../../actions/videos'


import { OpenModal } from '../../../actions/common'

import * as _Util from '../../../store/Util'
import Icons from '../../Icons'




import DialogPlayer from  '../../operations/dialogPlayer';

import DImageUpload from  '../../operations/dialogImageUpload';

import AddSeason from  '../../operations/AddSeason';


import AddEpisode from  '../../operations/AddEpisode';


import BTNH from  '../../btns_confirm';


import LazyImage from '../../lazyImage';


import InputText from '../../InputText';


import InputAutocomplete from '../../InputAutocomplete';








import MenuSlideSide from '../../MenuSlideSide';



import '../../_styles.css'

const formName = "video2Upd";

const operationType = 'videos'


let lastRequ = 0; 
let lastRequQty = 0; 

// import MenuSlideSide from '../MenuSlideSide';


const gDt = () =>{
  return (new Date().getTime());
}





const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
 
  const forms =  useSelector(state => state.forms);
  const dispatch = useDispatch();
  const fetchDetails =  useSelector(state => state.fetchDetails);

  let _state = _Util.getStore();
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
    getVideosById(id, dispatch);
  }

  
  const _updVideos= (doc) => {
    UpdVideos(doc, dispatch);
  }

  const _rmvSeason= (doc) => {    
    RmvSeason(doc, dispatch,  details["id"] )
  }

  



  /*

  const _getVideosSearch = (q,type,genre) => {
    let params = {query:q, limit:35};
    if(type){
      params["type"] = type;
    }
    if(genre){
      params["genre"] = genre;
    }
    if(q){
      params["query"] = q;
    }
    
    lastRequQty +=1;
    if(gDt()>lastRequ){
      lastRequ = gDt()+60;
      if(gDt()>lastRequ+550){
        lastRequQty = 0;
      }
      if(lastRequQty<25){
        lastRequQty = 0;
        console.log('SearchVideos',q,type,genre)
        SearchVideos(params, dispatch, _state, "videosbygenre");
      }
    }
    //updForms("_filters_")
    
  }
*/

  const OpenPlayer = (items, _ID) => {

    let data = {};
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
    data['zIndex']=150;
    data['observeResize']=true;
    data['props']={title:"", id: _ID, item:i};
    data['content'] = DImageUpload; 
    //console.log(data)
    OpenModal(dispatch,data);
  }

  
  const OpenAddSeason = (i, _ID) => {
    let data = {};
    data['zIndex']=150;
    data['observeResize']=true;
    data['props']={title:"", id: _ID, item:i};
    data['content'] = AddSeason;
    //console.log(data)
    OpenModal(dispatch,data);
  }




  const _getVideoFiles = (q,operation) => {
    VideoFiles(q, dispatch, operation);
  }


  const _searchVideosbyType = (q,type) => {
    let params = {query:q, limit:35};
    if(type){
      params["type"] = type;
    }
    if(q){
      params["query"] = q;
    }
    
    SearchVideos(params, dispatch, "episodes2Associate");
  }
  
 

  const _addEpisode2Season = (doc) => {
    addEpisode2Season(doc, dispatch);
    _getVideosById(details["id"])
  }
  

  const _rmvEpisode2Season = (doc) => {
    rmvEpisode2Season(doc, dispatch);
    _getVideosById(details["id"])
  }
  

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

  
  

  
  const _addVideo = (items, _ID) => {
    let data = {};
    data['zIndex']=150;
    data['observeResize']=true;
    data['props']={title:"", id: _ID, item:items};
    data['content'] = AddEpisode; 
    //console.log(data)
    OpenModal(dispatch,data);
  }




  return { 
    observeChanges, 
    details, 
    forms, 
    fetchDetails,
    _state, 
    _rmvSeason,
    _addVideo,
    updKV,
    _rmvEpisode2Season,  
    _addEpisode2Season,
    _searchVideosbyType, 
    updForms, 
    _getVideosById,
    OpenPlayer,
    _getVideoFiles,
    OpenUpload,
    OpenAddSeason,
    _updVideos
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
  func(_2s);
  updForms(formName,{})
}


const updGenre = (id,v,g) => {
 
  let _v = v;
  if(v && v["id"]){
    _v = v["id"];
  }
 
  let ex =  g && g.filter(a=>a==_v);
  if(ex && ex[0]){
    RmvGenre2Video({id:id,genre:_v})
  }else{
    AddGenre2Video({id:id,genre:_v})
  }
}








const VideoViewDetail = (props) => {
  const { 
    fetchDetails, details,
    observeChanges,    
    OpenPlayer,  
    updForms,
    forms,
    updKV,
    OpenUpload,
    OpenAddSeason,
    _getVideosById,
    _getVideoFiles,
    _updVideos,
    _state
  } = useObserveChanges();

  
  let searchHash = window.location.search.split('?')[1]?window.location.search.split('?')[1]:null;

 
  const router = _Util.parseQuery(searchHash);

  let _ID = router.v;

  

  const [initialize, setInitialize] = useState(false);

  const [editView, setEditView] = useState(false);



  let item = details;

  let IMg = item && item['boxarts']; 

  
  let _TYPES = item && item['type']; 

 
  let isPlayable = _TYPES==="movie" || _TYPES==="episode" ?true:false;

  let isEditable = _TYPES!=="episode" ?true:false;

  

  const [view, setView] = useState(0);
  let _options = [
    {label: 'details', icon:'analytics', visible:true },
    {label: 'images', icon:'photo_outline', visible:true },
    {label: 'video files', icon:'video', visible:isPlayable },
    {label: 'episodios', icon:'playList', visible:!isPlayable }
  ]
  

  useEffect(() => {
    if(props.history && !_state["route_history"]){
      updKV("route_history",props.history);
    }
    if(!initialize){
      setInitialize(true);
      _getVideosById(_ID);
    }
    if(item && item["id"] !==_ID){
      _getVideosById(_ID);
    }

  });


  var _thumbnailJson = _state['thumbnailJsonBlob'] && _state['thumbnailJsonBlob'][IMg] && _state['thumbnailJsonBlob'][IMg]['blob'];


  let fileVideoSearch = _state['fileVideoSearch']

 
  const [genreSearch, setGenreSearch] = useState("");
  const [episodeView, setEpisodeView] = useState(null);

  


  let _genres = item && item['genres'] && item['genres'].length>0 && parseGenres(_state.genres,item['genres']); 

  let _genresList = parseGenresList(_state.genres,genreSearch); 
/*
  var _thumbnailJson = _state['thumbnailJsonBlob'];
  let _blobIMg = _thumbnailJson && _thumbnailJson[IMg] && _thumbnailJson[IMg]['blob']? _thumbnailJson[IMg]['blob'] : ""; 
  if(!_blobIMg){
    _getThumbnail(IMg);
  }
*/



    return (
      <>
      <style>
        {dep_style}
      </style>
     
      <div className={`mainView whiteTheme`}>  


            {item && item.id  &&  item.id===_ID  && 
            <>
            
            <div  className={`_dsplFlx _mrg15 _VideoDetail _desktopV  ${!editView && _thumbnailJson?"boxartsW":""}`}>  

            {!editView && isEditable &&
              <div className={'boxarts  _total2 '}>
               <LazyImage src={IMg}/>
              </div>  
              }  
              {true &&  
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
              }  
              {!editView &&  
              <div className={`_mrgVType_`}>
                <div className={`_VideoType`}>
                  <div  className={'_bck'}/>
                  <div  className={'_text_'}>  {item['type']}</div> 
                </div>
              </div>
              }
              <div className="flexSpace"/>  
              <div className={'_stock_Location_'}>
                <div className={``} onClick={(e)=>{
                  editView?updSave(forms,setEditView,updForms,_updVideos):updEditView(editView,setEditView,updForms,item);
                  }} >
                  <Icons 
                    name={editView?"outline_save":'outline_edit'} 
                    color={'#555'} 
                    size={24} 
                    tooltip={editView?"Guardar":`Editar`}
                    extraClass={'edit'}
                    ripple={true}
                  />               
                </div>
                <span onClick={()=>{}}>
                  <BTNH theme={`light_blue`} title={'Publicar'}/>
                </span> 

              </div>
              
              
            </div> 
           
            
            { isEditable &&
            <div  className={`area_wrpp  _dsplFlx`}>
                {!editView? 
                      <div className={`_VideoDetail`}>
                          <p>{`genres`}</p>
                          <div  className={'__amount__ __gm2_text_'}>  {_genres &&  _genres['txt']}</div> 
                      </div>:  
                       <div style={{position:'relative',marginTop: `10px`}} onClick={()=>{}}  className={`fieldPadding`}>
                        <InputAutocomplete
                          icon={`more_vert`} 
                          keyCode={10}
                          form={'453457-345jtg-h97'} 
                          field={`genres`}
                          data={_genresList} 
                          placeholder={'generos'} 
                          OnChange={(e)=>setGenreSearch(e)}
                          OnSelect={(e)=>updGenre(item['id'],e,item['genres'])}
                        
                        />

                      </div>
                    }

              <div className="flexSpace"/> 
              <div className={'_spaceMrgH15_'}/>
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
            }
            </>
            } 
        
            {false && !fetchDetails && 

            <div>
              <span>
              {'Loading .... '}
              </span>
            </div>

            }
            <div  className={`_mrgV_`}>
              <div className={`_separator_`} ></div>
            </div>
            <div style={{marginLeft: '25px'}}>
              <span onClick={()=>_getVideosById(item["id"])}>
                <BTNH theme={`light_blue`} title={'Refrescar'}/>
              </span>
            </div>
          


            {item && item.id===_ID  && 



        <div className={`_dsplFlx _operationsWrp_`}>
          <MenuSlideSide options={_options} updFiltersTab={(e)=>setView(e)} />
            <div  className={` _wrpSld_ `}>
              <div className={` _wrpView_ wdt100 ${view===0 && 'visible'}`}  style={{margin:'20px', width:"90%"}}>    
              {view===0 && 
                <div className={'_desktopV  '} >
                  <h3>
                    DETALLES
                  </h3>
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
              }
            </div>
            <div className={` _wrpView_ wdt100  ${view===1 && 'visible'}`}  style={{margin:'20px', width:"90%"}}>    
               {view===1 && 
                  <div className={'_desktopV  '} >
                    <h3>
                      IMAGENES
                    </h3>
                    <div className={'_dsplFlx  '} >  
                      <div className="flexSpace"/>  
                      <span onClick={()=>{OpenUpload(item)}}>
                        <BTNH theme={`light_blue`} title={'Cargar Imagen'}/>
                      </span> 
                    </div>
                    <div  className={'_dsplFlx _flxWrp '} >
                      {
                        item && item['images']  && item['images'].map(im=>{
                        return (
                          <div className={'imagesView '} key={_Util.gen12CodeId()}>   
                           
                            <LazyImage src={im}/> 
                            
                            <div className={'_actions_Wrp_'}>
                              <div className={'_actions_Btns_ flxbsc30'}>
                              {isEditable ?
                                  <div onClick={()=>linkWboxarts(item['id'],im,"boxarts", _updVideos)}>
                                    <Icons 
                                      name={'add_photo_outline'} 
                                      color={'#555'} 
                                      size={24}  
                                     tooltip={`assosiar con boxarts`}
                                      extraClass={`edit`}
                                    />
                                  </div>:
                                  <div onClick={()=>linkWboxarts(item['id'],im,"interestingMoment", _updVideos)}>
                                    <Icons 
                                      name={'add_photo_outline'} 
                                      color={'#555'} 
                                      size={24}  
                                      tooltip={`assosiar con interestingMoment`}
                                      extraClass={`edit`}
                                    />
                                  </div>
                                }                              
                                {isEditable &&
                                <div  onClick={()=>linkWboxarts(item['id'],im,"poster", _updVideos)}>
                                  <Icons 
                                    name={'add_photo_outline'} 
                                    color={'#555'} 
                                    size={24} 
                                    tooltip={`assosiar con poster`}
                                    extraClass={'edit'}
                                    />
                                </div>
                                }
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
            <div className={`_wrpView_ wdt100  ${view===2 && 'visible'}`}  style={{margin:'20px', width:"90%"}}>
            {view=== 2 && 
              <div className={'_desktopV  '} >
                 <h3>
                    MEDIA FILE 
                </h3>
                <div className={'_dsplFlx  '} >
                  <div className="flexSpace"/>  
                  <div className={`fieldPadding`} style={{margin:'20px'}}>
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
                    let _linkVideo = item["netflixId"]===slc['id'];
                    if(slc && slc['id']){
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
                                  {/*
                                  <div onClick={()=>OpenPlayer(slc,fV)}>
                                    <Icons 
                                      name={'play'} 
                                      color={'#555'} 
                                      size={24}  
                                      tooltip={'Reproducir'}
                                      extraClass={`delete`}
                                    />
                                  </div>
                                  */}
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
                    }else{
                      return null
                    }
                  })
                }
              </div>
              </div>
            }
            </div>

            <div className={`_wrpView_ wdt100  ${view===3 && 'visible'}`}  style={{margin:'20px', width:"90%"}}>
            {view=== 3 && 
              <div className={'_desktopV  '} >
                <h3>
                EPISODES
                </h3>
                <div className={'_dsplFlx  '} >  
                  <div className="flexSpace"/>  
                  <span onClick={()=>{OpenAddSeason(item)}}>
                    <BTNH theme={`light_blue`} title={'Agregar Temporada'}/>
                  </span> 
                </div>
                <div className={'  '} >

                  { 
                  item && item['seasons'] && item['seasons'].length>0 &&  item['seasons'].map(d=>{
                  
                    return (
                      <EpisodeViewDetail item={d} episodeView={episodeView} updSeasonAdd={(e)=>setEpisodeView(e)} parent={item} history={props.history}  key={_Util.gen12CodeId()}/>
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
        <div className={`_footer_margin`}>

        </div>
        </div>
      </>
    );
  
}  


export default withRedux(VideoViewDetail)






function parseGenresList(g,vS){
  let ff = []
  g && _Util.ObjectKeys(g).map((_g,i5)=>{
    if(g[_g]['name'].toLowerCase().indexOf(vS.toLowerCase())>=0){
      ff.push({id:_g, name:g[_g]['name']});
    }
  })
  return ff;
}


function parseGenres(g,gA){
  let ff = {txt:'', list:[]}
  gA && gA.map((_g,i5)=>{
    if(g && _g && g[_g] && g[_g]['name']){
      ff['txt'] += (i5>0?", ":"").concat(g[_g]['name']);
      ff['list'].push({id:_g, name:g[_g]['name']});
    }
  })
  return ff;
}



function parseSize(s){
  if(s){
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
  return '';
}











var dep_style2 = `
  

`

const handleupdSeasonAdd = (id,props) => {
    if(typeof props.updSeasonAdd === "function"){
      props.updSeasonAdd(id)
    }
}


const handleAddEp2Season = (id,seasonParent,number, _addEpisode2Season) => {
  let _2s = {}
  _2s['number'] = number;
  _2s['videoRef'] = id;
  _2s['seasonParent'] = seasonParent;
  _addEpisode2Season(_2s);
}


const handleRmvEpisode2Season = (id, _rmvEpisode2Season) => {
  let _2s = {}
  _2s['id'] = id;
  _rmvEpisode2Season(_2s);
}






let lastSearchTypeEpisode = 0;

const handleSearchType = (v,type,func) => {
let _now = (new Date()).getTime();
    lastSearch = _now;
    let _q_ = v;
    setTimeout(()=>{
      if(_now-lastSearchTypeEpisode>=0){         
        func(_q_,type);
      }
    },500)
   return true;
}





const EpisodeViewDetail = (props) => {
 const { 
   _state, 
  OpenAddSeason,
  _searchVideosbyType, 
  _addEpisode2Season, 
  _rmvEpisode2Season,
  _getVideosById,
  _addVideo,
  updKV,
  _rmvSeason
 } = useObserveChanges();


  const { 
    item,
    parent,
    episodeView
  } = props;
  


  let episodeViewActive = episodeView === item['id']; 

/*
  let _episodes2Associate =  _state["episodeAddView"] && parseEpisodeList(_state["episodes2Associate"],);

  let episodes2AssociateList =  _state["episodes2Associate"];

  const [episodeAdd, setEpisodeAdd] = useState(false);

  const [epID, setEpID] = useState(false);
  const [epNumber, setEpNumber] = useState(null);


*/

  const goEpisode = (d) => {
    props.history.push({pathname:`/dashboard-view`,search:`?v=${d}` });
    window.scrollTo(0,0)
  }





    return (
      <div className={`wdt100 marg10 ${episodeViewActive?"_active":""}`} >
      
        <style>
          {dep_style2}
        </style>
        <div className={` whiteTheme`}>
        <div  className={`_dsplFlx roWTd wdt100 showActions`} key={_Util.gen12CodeId()}>
          <div className={'coLTd flxbsc5 _total2 '} onClick={(e)=>{}} >
            <div  className={'locations marg10 _link_ y2nowrap'}> {item && item['number']}</div>
          </div>
          <div className={'coLTd flxbsc40 _total2 '} onClick={(e)=>{}} >
            <div  className={'locations marg10 _link_ y2nowrap'}> {item && item['name']}</div>
          </div> 
          <div className="flexSpace"/>  
          <div className={'_dsplFlx flxbsc20'}>
            <div className={'_dsplFlx  hide_when_action'}>                         
              <div className={'coLTd flxbsc10 _total2 '}>
                <div  className={'locations marg10 _link_'}> {item && item['year']}</div>
              </div>
            </div>
            <div className={'_actions_Wrp_'}>
              <div className={'_actions_Btns_ flxbsc30'}>
                <div onClick={()=>handleupdSeasonAdd(episodeView===item['id']?null:item['id'],props)}>                                 
                    <Icons 
                      name={'playList'} 
                      color={'#555'} 
                      size={24} 
                      // tooltip={`episodios`}
                      extraClass={'view'}
                      />
                  </div>
                  <div className={'_spaceMrg_'}/>
                  {/*
                    <div onClick={()=>{}}>                                 
                    <Icons 
                      name={'outline_edit'} 
                      color={'#555'} 
                      size={24} 
                      //tooltip={`edit`}
                      extraClass={'edit'}
                    />
                  </div>
                  */}
                  <div className={'_spaceMrg_'}/>
                  <div onClick={()=>_rmvSeason({id:item['id']})}>
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
          </div>
        </div>
        <div>
          {episodeView === item['id']  && 
            <div className={' episodeWrp '} >
              <div className={'_dsplFlx  '} >  
                <div className="flexSpace"/>  
                <span onClick={()=>_addVideo(item,item['id'])}>
                  <BTNH theme={`light_blue`} title={'Agregar Episodio'}/>
                </span>                
              </div>
              <div>
                        
              </div>
              <div>
                {
                  item &&  item["episodes"].map(d=>{
                    let videoRefDetails = d && d["videoRefDetails"];
                    return(
                      <div className={'epsAssos _bxSdh '}  key={_Util.gen12CodeId()}>
                        <div >
                          <div  className={'_dsplFlx '}>
                            <div  className={'_nmbEps '}>
                              {d && d["number"]}
                            </div>
                            <div  className={'_lblEps '} onClick={()=>goEpisode(videoRefDetails["id"])}>
                              {videoRefDetails && videoRefDetails["title"]}
                            </div>
                            <div className="flexSpace"/>  
                            <div onClick={()=>{
                                handleRmvEpisode2Season(d["id"], _rmvEpisode2Season);
                                _getVideosById(parent["id"]);
                              }}>
                              <Icons 
                                name={'outline_delete'} 
                                color={'#555'} 
                                size={24} 
                                //tooltip={'delete'}
                                extraClass={'delete'}
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
      </div>
    </div> 
    )
  
}



















function parseEpisodeList(g){
  let ff = []
  g && _Util.ObjectKeys(g).map((_g,i5)=>{
    // if(g[_g]['name'].toLowerCase().indexOf(vS.toLowerCase())>=0){}
      ff.push({id:_g, name:g[_g]['title']});
    
  })
  return ff;
}












const dep_style = `



`







/*


 {_state["episodeAddView"] && 
                  <div>
                    <div className={'_dsplFlx epsAssos '} >
                      <div className="flexSpace"/>  
                      <div className={` _dsplFlx fieldPadding`}>
                        <div className={"addEpisodeBtn"} onClick={()=>{}}>
                            <BTNH theme={`light_blue`} title={'Agregar Episodio'}/>
                        </div> 
                      </div>
                    </div>
                    <div>
                      {
                        epID && episodes2AssociateList &&  _Util.ObjectKeys(episodes2AssociateList).map(_eID=>{    
                          if(epID === _eID ){
                            let epd = episodes2AssociateList[_eID];
                            return(
                              <div className={'epsAssos _bxSdh '}  key={_Util.gen12CodeId()}>
                                <div  >
                                  Asociar el video <span className={`epsLabel`} >{epd["title"]}</span> como <span className={`epsLabel`} >{epNumber}</span> capitulo de la <span  className={`epsLabel`} >{item["name"]} </span> de  <span  className={`epsLabel`} >{parent["title"]}</span>
                                </div>
                                <div  className={'_dsplFlx '}>
                                  <div className="flexSpace"/>  
                                 {epNumber ?  
                                    <div onClick={()=>{
                                      handleAddEp2Season(_eID,item["id"],epNumber, _addEpisode2Season);                                      
                                      handleupdSeasonAdd(null,props);
                                      _getVideosById(parent["id"]);
                                      
                                      }}>
                                      <BTNH theme={`light_blue`} title={'Asociar'}/>
                                    </div> :
                                    null
                                  }
                                </div> 
                              </div>
                            )
                          }else{
                            return null;
                          }
                        
                        })
                      }
                    </div>
                  </div>
                }     

*/


