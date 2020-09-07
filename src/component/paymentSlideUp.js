


import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './_styles.css'

import {Icon2} from './Icons'
import { UpdateDetails, CloseWatchDialog, OpenWatchDialog} from '../actions/common';

import {MoreInfoButton} from './Buttons'
import MenuSlideUpProcessTime from './menuSlideUpProcessTime'

import MenuSlideUpSchedule from './menuSlideUpSchedule'


import { withRouter, NavLink} from 'react-router-dom';

import * as _Util from '../store/Util'


var notificationsWays = {
  "email":false,
  "sms":false,
  "webapp":false,
}




const useObserveChanges = () => {
  const observeChanges =  useSelector(state => state.observeChanges);
  const dispatch = useDispatch(); 


  const _openMd = (_id, item) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;    
    data['props']={item:item};
    data['content']=<MenuSlideUpProcessTime />;
    OpenWatchDialog(dispatch,data);
  }


  const _openMdSchedule = (_id, item) => {
    let data = {};
    data['zIndex']=450;
    data['Id']=_id;
    data['observeResize']=true;
    data['content']=<MenuSlideUpSchedule />;
    OpenWatchDialog(dispatch,data);
  }




  return {
    dispatch,
    _openMd
  }
}








const Details = (props) => {
  

  const {
    _openMd,
    dispatch
  } = useObserveChanges();

  const { modalId, closePop } = props;

  const [view, setView] = useState(1); 
  let _state = _Util.getStore();
  let keys = _Util.getGlobalsKeys()

  let searchHash = window.location.hash.split('?')[1]?window.location.hash.split('?')[1]:null;
 
  const router = _Util.parseQuery(searchHash);
  let _id = router.id?router.id:null;
  // const typeBrowse = window.location.hash.split('/')[1].split('?')[0];

  const goback = (e) => { 
    if(typeof props.closePop === "function"){
      setTimeout(()=>window.scrollTo(0,0),325);
      closePop();
      _Util.updFormStore(_formName,{})
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeForms',value:_Util.gen12CodeId()}
      })
     
    }

  }

  const goConfirmation = (e) => { 
    setView(2)
    window.scrollTo(0,0)
  }
  
  const _formName = 'add_remesa';
  const _form = _Util.getFormStore(_formName) || {};

  
  const PaymentMethod =  _Util.getPaymentMethod()


  let _currency = _form["currency"] || "CUC";
  let _name = _form["name"] || "";
  let _phone = _form["phone"] || "";
  let _email = _form["email"] || "";
  let _tarjeta = _form["cardNumber"] || "";
  let _amount = _form["amount"] || "";
  const _paymentMethod = _form["paymentMethod"] || ""
  const _paymentMethodActive = PaymentMethod[_paymentMethod]

  let topay = _currency=== "CUC"?_amount*1.05: _currency=== "MLC"?_amount*1.4:_amount;

  return (
      <>
        <div className={`paymentView boxCard`}>
          <div className={`slideWrp`}>
            <div className={'option__edit_payments'}>
            <div className="__body__">  
            <div className={`formContainer`} style={{opacity:view === 1?1:0}}>
                  {view === 1?
                  <> 
               <div className={'titlePaymentheader  flexColor _dsplFlx spaceAround' }>
                  {`Verifique su envio`}                 
               </div>

               <div className={'__Label_description__ _dsplFlx'}>
                  {'A nombre de: '}
               </div>
               <div className={'__title_description__ _dsplFlx '}>
                  {_name}
               </div>

               <div className={'__Label_description__ _dsplFlx'}>
                  {'Informacion de Contacto: '}
               </div>
               <div className={'__title_description__ _dsplFlx '}>
                  {_phone}
               </div>
               <div className={'__title_description__ _dsplFlx '}>
                  {_email}
               </div>

               

               <div className={'__minimun__pay__Wrapper__'}>
                  <div className={'__Label_description__ _dsplFlx'}>
                      {'Depositar en: '}
                  </div>
                  <div className={'pym81b bxPyDt'}>
                    <div className={'__pay_amount__ _dsplFlx spaceAround'} >
                      {_currency}
                    </div> 
                    <div className={'__title_body__  flexColor _dsplFlx spaceAround' }>
                        {_tarjeta}              
                    </div>
                    <div className={'__minimun__pay__ _dsplFlx spaceAround'} >
                      {`$${_amount && _amount.toFixed(2)}`}
                    </div>   
                  </div>                  
               </div>

               <div className={'__minimun__pay__Wrapper__'}>
                  <div className={'__Label_description__ _dsplFlx'}>
                      {'Pagar con: '}
                  </div>
                  <div className={'pym81b bxPyDt'}>
                    <div className={'__minimun__pay__ _dsplFlx spaceAround'}  >
                        <img  class="icon-product lazy-img js-only" alt={_paymentMethod} src={_paymentMethodActive&& _paymentMethodActive['url']}/>
                    </div>  
                    <div className={'__pay_amount__  flexColor _dsplFlx spaceAround' }>
                      {`$${topay && topay.toFixed(2)}`}           
                    </div>  
                  </div>                 
               </div>
              
                <div className={'_w100  _dsplFlx spaceAround'} >
                  <div className={`paddField`} >
                    <MoreInfoButton title={`Confirmar`}  theme={"purple"} icon={'send'} clickEvent={()=>goConfirmation()}/>
                  </div>
                </div>
                </>:null}
                </div>


                <div className={`formContainer`} style={{opacity:view === 2?1:0}}>
                  {view === 2?
                  <> 
                  <div className={'__title_description__ _dsplFlx  spaceAround '}>
                    {'Perfecto la remesa esta a un paso de su familia '}
                </div>


                <div className={'__minimun__pay__Wrapper__'}>                  
                  <div className={'pym81b bxPyDt'} >
                    <div className={'_title_confirm  flexColor _dsplFlx spaceAround' }>
                      {'Usted elijio pagar con'}        
                    </div> 
                    <div className={'__minimun__pay__ _dsplFlx spaceAround'}  >
                        <img  class="icon-product lazy-img js-only" alt={_paymentMethod} src={_paymentMethodActive&&  _paymentMethodActive['url']}/>
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
              
                <div className={'_w100  _dsplFlx spaceAround'} onClick={()=>goback()} >
                  <div className={`paddField`}>
                    <MoreInfoButton title={`Volver a remesas`}  theme={"purple"} icon={'home'}/>
                  </div>
                </div>
                </>:null}
                </div>
            </div>
          </div> 
      </div> 
    </div>   
     
    </>
  );
}  


export default withRouter(Details)

