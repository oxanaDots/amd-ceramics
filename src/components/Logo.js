import React from 'react'

import {Link} from 'react-router-dom'
import styles from './PageNav.module.css'
function Logo(){
    return(
     <Link to='/'>
      <div className={styles.logo}>
        <img  className='logo' src='/images/AMD-02.svg'/>
        </div>
     </Link>
    )
  }

  export default Logo