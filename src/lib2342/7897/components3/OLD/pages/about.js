import Layout from '../components/MyLayout.js'
import { withRedux } from '../lib/redux'

import { useSelector, useDispatch } from 'react-redux'
import * as _Util from '../lib/Util'
import DialogHRM from '../components/DialogHRM'
import {OpenModal} from '../actions'


const useModal = () => {
  const modal = useSelector(state => state.listDialog);
  const observeChanges = useSelector(state => state.observeChanges);
  const dispatch = useDispatch();
  const OpenModalHRM = () => {       
    let data = {};
    data['list']=modal;
    data['display']=true;
    data['zIndex']=150;
    data['height']='115px';
    data['content'] = Hcetdkjds; 
    OpenModal(dispatch,data);
  }
  return { modal, OpenModalHRM }
}



function About() {
  const { OpenModalHRM, modal } = useModal();
  return (
    <>
      <Layout>
        <p>This is the about page</p>
        <button onClick={OpenModalHRM}>OpenModal</button>
      </Layout>
      <DialogHRM />
    </>
  )
}


export default withRedux(About)



function Hcetdkjds() {
  return (
    <>
      <div className={'dialogsdfa'}>
        <p>This is the about page</p>       
      </div>
      <style jsx>{`
        .dialogsdfa{
          background-color: #fff; 
          padding: 25px;
          min-height:65px;  
        }
        .dialogsdfa p{
          margin: 5px;
          color: firebrick; 
        }

      `}</style>
    </>
  )
}