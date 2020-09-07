

import React, { useEffect, useState } from 'react'
import { withRedux } from '../../store/redux'
import { useSelector, useDispatch } from 'react-redux'


import { withRouter} from 'react-router-dom';

import {  OpenWatchDialog , getMovies, getMoviesById, getMoviesHero} from '../../actions/common'



import * as _Util from '../../store/Util'

import '../_styles.css'

import {Icon2} from '../Icons'

import {MoreInfoButton , NumberButton, ImageButton, ChoiceButton} from '../Buttons'
import InputText from '../InputText';

import PaymentSlideUp from '../paymentSlideUp'

const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const dispatch = useDispatch(); 


  const _openMd = (_id, item) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;    
    data['props']={item:item, minHeight: '1vh'};
    data['content']=<PaymentSlideUp />;
    OpenWatchDialog(dispatch,data);
  }


  return { 
    observeChanges,
    _openMd
  }
}





const useObserveForms = () => {
  const observeForms =  useSelector(state => state.observeForms);
  const dispatch = useDispatch(); 


  const _updFormObs = (q,operation) => {
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeForms',value:_Util.gen12CodeId()}
    })
  }

  return { 
    _updFormObs,
    observeForms
  }
}

  














const BrowseComponent = (props) => {
  const {
    _openMd
  } = useObserveChanges();

  const {
    _updFormObs
  } = useObserveForms();
  


  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()
  _state["keys"] = keys;
  const _formName = 'add_remesa';
  const _form = _Util.getFormStore(_formName) || {};




  const [initialize, setInitialize] = useState(false);

  const [widthScreen, setWidthScreen] = useState(null);

  const [choosePayView, setChoosePayView] = useState(0);
  const [validForm, setIsValidForm] = useState(false);


  
  const searchHash = window.location.search.split('?')[1]?window.location.search.split('?')[1]:null;
  const typeBrowse = window.location.hash.split('/')[1];


  const router = _Util.parseQuery(searchHash);
  
  let outerWidth = _state["outerWidth"];

  let _heroMovies =  _state["heroMovies"];


  const _getDataToInit = () => {
      /*
      let commonfields = ["id","title","boxarts","type"];
      let InitData = {
        "movie2Init":{params:{to:72,from:0, type:"movie"},fields:commonfields,query:"getMovies"},
        "show2Init":{params:{to:72,from:0, type:"show"},fields:commonfields,query:"getMovies"},
        "latest2Init":{params:{to:72,from:0, type:"movie", releaseYear:2020},fields:commonfields,query:"getMovies"},
        "latestShowInit":{params:{to:72,from:0, type:"show", releaseYear:2020},fields:commonfields,query:"getMovies"}
      }

      
      let QryHero = {params:{releaseYear:2020},fields:["id","title","boxarts","storyArt","synopsis"],query:"getHeroVideo"};
      !_heroMovies && _getMoviesHero(QryHero, "heroMovies");

      _Util.ObjectKeys(InitData).map(Qry=>{
        _getVideos(InitData[Qry], Qry);
      })
      */
  }


  const _getVideoInfobyId = (id) => {    
    /*
    let Qry = {
      params:{id:id},
      fields:[
        "title","synopsis","storyArt","type", "releaseYear"
      ],
      query:"getMoviesbyId"
    };
    
    _getVideosById(Qry, "detailVideoByID");
    */

  }





  useEffect(() => {  
    if(widthScreen!==outerWidth){
      setWidthScreen(outerWidth);
    } 
    if(!initialize){
      setInitialize(true);
      setTimeout(()=>window.scrollTo(0,0),350);

      let initF = {
        amount:30,
        currency:"MLC",
        name:"hector",
        cardNumber:"4854589625478804",
        phone:"5023895024",
        email:"hheg@ghdfy.hjd"
      }
      _Util.updFormStore(_formName,initF)
      _updFormObs();
      if(router["title"]){        
        let id = router.title; 
        //_getVideoInfobyId(id);
        setTimeout(()=>{
          _openMd(id)
        },850);
      }else{
        //_getDataToInit();
      }
    }
  });
  




  
  
  
  const _openDialog = (v) => {
    let frm =  _form;
    setChoosePayView(0)
    frm['paymentMethod'] = v
    _Util.updFormStore(_formName,frm)
    _openMd()
    
  }

  const updAmount = (v) => {
    let frm =  _form;
    frm['amount'] = v
    _Util.updFormStore(_formName,frm)
    validateFields()
  }

  const updCurrency = (v) => {
    let frm =  _form;
    frm['currency'] = v
    _Util.updFormStore(_formName,frm);
    _updFormObs();
  }

  


  const handleInput = (v,f) => {
    let frm =  _form;
    frm[f] = v
    _Util.updFormStore(_formName,frm)
    validateFields()
  }


  const vldFlds = {
    name:{reqired:true, minLength:3},
    phone:{reqired:true, phone: true},
    cardNumber:{reqired:true, card:true,},
    email:{reqired:true, email:true},
    amount:{reqired: true, number: true,minValue:30, maxValue:1000}
  };


  const validateFields = (v,f) => {  
    let frm =  _Util.getFormStore(_formName);
    let fld2Prs = ['id','name',"cardNumber","email","phone","amount"];    
    let _2Fs = frm || {};     
    let _2s = {};
    _2Fs && fld2Prs.map(fld=>{
      _2s[fld] = _2Fs[fld];
    })    
    var _Valid = _Util.validations(vldFlds,_2s);    
    if(_Valid.valid){
      setIsValidForm(true)
    }else{
      setIsValidForm(false)
    }
    _updFormObs();
  }


  const PaymentMethod =  _Util.getPaymentMethod()



  var amount = _form["amount"];
  var currency = _form["currency"];

  console.log()
  
    return (
      <>
        <div className={`mainViewHero`} >
          <div className={`loloHero`}> 
            <div className={`formHero _dsplFlx spaceAround`}> 
              <div className={`hdWrp`}> 
                <div className={`titleHero`}>
                  Remesas a cuba  
                </div>
                <div className={`descHero`}>
                  La forma más sencilla y rápida para enviar remesas a Cuba con Bitcoin, Credit Card o QuickPay en MLC o CUC
                </div>
                <div className={`form`}> 
                <div className={`formContainer`} style={{opacity:choosePayView === 0?1:0}}>
                  {choosePayView === 0?
                  <>
                  <div className={`_dsplFlx spaceAround `} style={{padding:'3vh'}}>
                    <ChoiceButton value={currency}  change={(n)=>updCurrency(n)} />
                  </div>
                  <div className={`_dsplFlx spaceAround _flxWrp`}>
                    <div className={`paddField`}>
                      <InputText 
                        icon={`more_vert`} 
                        form={_formName} 
                        field={`name`}  
                        keyCode={27} 
                        placeholder={'nombre'} 
                        background={`#f5f5f5`}
                        color={`#5e35b1`}
                        OnChange={(e)=>handleInput(e,`name`)}
                        validations={vldFlds[`name`]}
                        initvalue={_form["name"]}
                      />
                    </div>
                    <div className={`paddField`}>
                      <InputText 
                        icon={`more_vert`} 
                        form={_formName} 
                        field={`phone`}  
                        keyCode={29} 
                        background={`#f5f5f5`}
                        color={`#5e35b1`}
                        placeholder={'telefono'} 
                        OnChange={(e)=>handleInput(e,`phone`)}
                        validations={vldFlds[`phone`]}
                        initvalue={_form["phone"]}
                      />
                    </div>
                    <div className={`paddField`}>
                      <InputText 
                        icon={`more_vert`} 
                        form={_formName} 
                        field={`email`}  
                        keyCode={39} 
                        background={`#f5f5f5`}
                        color={`#5e35b1`}
                        placeholder={'correo'} 
                        OnChange={(e)=>handleInput(e,`email`)}
                        validations={vldFlds[`email`]}
                        initvalue={_form["email"]}
                      />
                    </div>
                    <div className={`paddField`}>
                      <InputText 
                        icon={`more_vert`} 
                        form={_formName} 
                        field={`cardNumber`}  
                        keyCode={49} 
                        background={`#f5f5f5`}
                        color={`#5e35b1`}
                        placeholder={'tarjeta'} 
                        OnChange={(e)=>handleInput(e,`cardNumber`)}
                        validations={vldFlds[`cardNumber`]}
                        initvalue={_form["cardNumber"]}
                      />
                    </div>
                    </div>
                      <>
                        <div className={'  _dsplFlx spaceAround amount_label2'}>{'Amount'}</div>                        
                        <div className={'  _dsplFlx spaceAround'}>
                          <NumberButton change={(n)=>updAmount(n)}  amount={amount}  color={`#5e35b1`}/>
                        </div>
                      </>
                      <div style={{marginBottom:'65px'}}></div>
                      {/*
                    <div className={'_w100 amountContainer'}>
                      <div  className={'pym81b'}>

                      <div className={'  _dsplFlx spaceAround'}>
                        <div className={''} >
                          {'Amount'}
                          <div className={'  _dsplFlx spaceAround amount_label'}>{amount}</div>
                        </div>
                      </div>
                      <div className={'  _dsplFlx spaceAround'}>

                       
                        <div className="flexSpace minMArg"/>
                          <div className={'__btnAmount__'}  onClick={()=>_minus('end')}>
                            <Icon2 name={'minus'} color={'#1967d2'} size={24}/>
                          </div>
                          <div className="flexSpace minMArg"/>
                          <div className={'__btnAmount__'}  onClick={()=>_plus('end')}>
                            <Icon2 name={'add'} color={'#1967d2'} size={24}/>
                          </div>
                          <div className="flexSpace minMArg"/>
                      </div>
                    </div>
                    </div>
                  */}
                  {validForm ? 
                    <div className={'_w100  _dsplFlx spaceAround'} onClick={()=>setChoosePayView(1)} >
                      <MoreInfoButton title={`Comenzar`} value={amount} theme={"purple"}/>
                    </div>
                    :null}
                    </>
                    :null}
                  </div>
                  <div className={`formContainer`} style={{opacity:choosePayView === 1?1:0}}>
                    {choosePayView === 1?
                    <> 
                      <div className={`_dsplFlx spaceAround _flxWrp`}>
                        {PaymentMethod && _Util.ObjectKeys(PaymentMethod).map(mth=>{                         
                          let itm = PaymentMethod[mth]
                          console.log(itm)
                          let src =  itm['url']
                          return(
                            <div className={`margField`}>
                              <div className={'_w100  _dsplFlx spaceAround'} onClick={()=>_openDialog(mth)} >
                                <ImageButton src={src} title={mth}/>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className={`margField`}>
                          <div className={'_w100  _dsplFlx spaceAround'} onClick={()=>setChoosePayView(0)} >
                            <MoreInfoButton title={`Cancelar`}  theme={"gray"}/>
                          </div>
                        </div>
                    </>
                    :null}
                  </div>

                    
                </div>
              </div>
            </div>
          </div>
          <div className={`formHero_gradient`} />
         
        </div>
      </>
    );
  
}  





export default withRouter(withRedux(BrowseComponent))
