import React from 'react'

import {useState} from 'react'
import Footer from "../components/Footer"
import PageNav from "../components/PageNav"
import TileCalc from "../components/TileCalc"
import styles from '../components/Services.module.css'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import Quote from '../components/Quote'




function Services({services}){

    const [showCalc, setShowCalc] = useState (false)

    return(
<div >
    <PageNav/>
  <section className={styles.sectionOne}>
    <div className={styles.textCont}>
  <h2>What We Offer</h2>
  <p>Contact us today for a consultation and let us tile the way to your dream space!</p>
  </div>
    <div className={styles.servicesCont}>
      
{services.map((item) => <div className={styles.services}>
    <Link smooth='true' to={`/service/${item.servicesName}`}>
<span>
    <img src={item.iconPath}/>
    <h3>{item.servicesName}</h3>
</span>
</Link>

</div>)}
    </div>
  </section>
 <section id='quote'>
 <Quote  services={services} showCalc={showCalc} setShowCalc={setShowCalc}/>
 </section>
  <Footer/>
</div>
    )
}

export default Services