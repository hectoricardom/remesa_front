

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
  const _formName = 'add_bitcoin';
  const _form = _Util.getFormStore(_formName) || {};




  const [initialize, setInitialize] = useState(false);

  const [widthScreen, setWidthScreen] = useState(null);

  const [choosePayView, setChoosePayView] = useState(0);
  const [validForm, setIsValidForm] = useState(false);


  
  const searchHash = window.location.search.split('?')[1]?window.location.search.split('?')[1]:null;
  const typeBrowse = window.location.hash.split('/')[1];


  const router = _Util.parseQuery(searchHash);
  
  let outerWidth = _state["outerWidth"];


  useEffect(() => {  
    if(widthScreen!==outerWidth){
      setWidthScreen(outerWidth);
    } 
    if(!initialize){
      setInitialize(true);
      setTimeout(()=>window.scrollTo(0,0),350);

      let initF = {
        amount:100,
        name:"hector",
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
    email:{reqired:true, email:true},
    amount:{reqired: true, number: true,minValue:100, maxValue:1000}
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
  var _email = _form["email"];


  
  const clearD = (v,f) => {
    setChoosePayView(0);
    _Util.updFormStore(_formName,{});
    setIsValidForm(false);
  }




    return (
      <>
      <style>
        {`

        .palette{
            --base-color: rgb(255, 111, 0);
            --base-color-gradient: 255, 111, 0;
        }

        `}
      </style>
        <div className={`mainViewHero palette`} >
          <div className={`loloHero`}> 
            <div className={`formHero _dsplFlx spaceAround`}> 
              <div className={`hdWrp`}> 
                <div className={`titleHero`}>
                  Comprar Bitcoin
                </div>
                <div className={`descHero`}>
                  La forma más sencilla y rápida para comprar Bitcoin desde Cuba.
                </div>
                <div className={`form`}> 
                <div className={`formContainer`} style={{opacity:choosePayView === 0?1:0}}>
                  {choosePayView === 0?
                  <>
                  <div className={`_dsplFlx spaceAround _flxWrp`}>
                    <div className={`paddField`}>
                      <InputText 
                        icon={`more_vert`} 
                        form={_formName} 
                        field={`name`}  
                        keyCode={27} 
                        placeholder={'nombre'} 
                        background={`#f5f5f5`}
                        color={`var(--base-color)`}
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
                        color={`var(--base-color)`}
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
                        color={`var(--base-color)`}
                        placeholder={'correo'} 
                        OnChange={(e)=>handleInput(e,`email`)}
                        validations={vldFlds[`email`]}
                        initvalue={_form["email"]}
                      />
                    </div>
                    </div>
                      <>
                        <div className={'  _dsplFlx spaceAround amount_label2'}>{'Amount'}</div>                        
                        <div className={'  _dsplFlx spaceAround'}>
                          <NumberButton change={(n)=>updAmount(n)}  amount={amount?amount:0}  color={`var(--base-color)`} minValue={100}/>
                        </div>
                      </>
                      <div style={{marginBottom:'65px'}}></div>                      
                  {validForm ? 
                    <div className={'_w100  _dsplFlx spaceAround'}  >
                      <MoreInfoButton title={`Comenzar`} theme={"purple"} clickEvent={()=>setChoosePayView(1)} />
                    </div>
                    :null}
                    </>
                    :null}
                  </div>
                  <div className={`formContainer`} style={{opacity:choosePayView === 1?1:0}}>
                    {choosePayView === 1?
                    <> 
                      <div className={'__title_bitC__ _dsplFlx  spaceAround '}>
                        {'Perfecto en pocos pasos tendra el saldo en su cartera de bitcoin'}
                      </div>
                      <div className={'__minimun__pay__Wrapper__'}>                  
                        <div className={'pym81b bxPyDt'} >
                          <div className={'_dsplFlx spaceAround' }>
                            <div className={'_icon_confirm  flexColor _dsplFlx spaceAround' }>
                              <Icon2   
                                name={"thumb_up_ntflx"} 
                                color={'currentColor'} 
                                size={36}
                              />      
                            </div> 
                          </div> 
                          <div className={'_dsplFlx spaceAround'}  >
                            <div className={'_txt_confirm flexColor' }>
                              <span className={'' }>{`le hemos enviado a `}</span>
                              <span className={'_email_confirm' }>{_email}</span>
                              <span className={'' }>{` los detalles para completar la operacion`}</span>        
                            </div> 
                          </div> 
                        </div>                 
                      </div>
                      <div className={'_w100  _dsplFlx spaceAround'} >
                        <div className={`paddField`}>
                          <MoreInfoButton title={`Cerrar`}  theme={"purple"} icon={'Xclose'}  clickEvent={()=>clearD()}/>
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
