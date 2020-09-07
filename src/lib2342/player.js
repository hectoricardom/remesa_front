



import React from 'react'
import { withRedux } from '../../store/redux'
import '../_styles.css'

import HeliumPlayer from '../heliumPlayer/initPlayer'
import { withRouter} from 'react-router-dom';


const Details = (props) => {
  let plySt = {
    position:"fixed", 
    top:0, 
    left:0, 
    width:"100%", 
    height:"100%",
    bottom:0,
    right:0,
    zIndex: 90,
    backgroundColor: '#000000'
  } 

  return (
      <>  
        <div style={plySt}>
         <HeliumPlayer />
        </div>        
      </>
  );
}  


export default withRouter(withRedux(Details))


