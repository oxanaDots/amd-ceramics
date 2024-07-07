

import {useState} from 'react'
import {NavLink} from 'react-router-dom';
import styles from './PageNav.module.css'


function Footer() {

    const [hoveredLink, setHoveredLink] = useState(null);
    const links = [
        { path: '/', label: 'Home' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/services', label: 'Services' },
        { path: '/contact', label: 'Contact Us' }
    ];


    return(
<footer className={styles.footerSec}>
    

    <div className={styles.footer}>
        <h4>WEBSITE</h4>
    <ul className={styles.links} >
              {links.map((link, index)=> 
               <li>
                <NavLink key={index} className={ hoveredLink ? null : styles.active} style={{transition: 'opacity 0.2s', opacity: hoveredLink && hoveredLink !== link.label ? '0.5' : '1'}}
                onMouseEnter={()=> setHoveredLink(link.label)}
                onMouseLeave={()=> setHoveredLink(null)}
                 to={link.path}>{link.label}</NavLink>
              </li>)}
            </ul>
    </div>
    <div className={styles.footer}>
    <h4>ADDRESS</h4> 

    <p>info@amdceramics.co.uk</p>
    <p> SE19, London, UK</p>
   
   
    </div>
</footer>
    )
}

export default Footer;