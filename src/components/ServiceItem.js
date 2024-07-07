import React from 'react'

import {useState, useEffect} from 'react'
import {Link } from 'react-router-dom'
import Footer from "./Footer"
import PageNav from "./PageNav"
import styles from './Serviceitem.module.css'
import ContactForm from './ContactForm'

function ServiceItem({services, serviceName, description, image, par, index}){
    const [i, setIndex ] = useState(index < services.length - 1 ? index + 1  : 0 )
    const [nextService, setNext] = useState (index < services.length - 1 ? services[index + 1].servicesName : services[0].servicesName);


    


function handleNext(i){

    setIndex( i < services.length - 1 && i + 1  )
    setNext(i < services.length - 1 ? services[i + 1].servicesName : services[0].servicesName)
    

}



    return(
        <>
      <section>
        <PageNav/>
      </section>
<section className={styles.sectionOne}>
        

 
     
        <div className={styles.gridColumn}>
      <figure>
      <img src={image}/>
      </figure>
    
      <h4>{description} </h4>
     
      <h2>{serviceName}</h2>
      <p>{par}</p>
      </div>
      
      
   

      <div className={styles.btn}>
        
      <Link   to={`/service/${nextService}`}>
      <button onClick={ () => handleNext(i)}>{ index === services.length - 1 ? 'back to: ' : 'next on: '} <span>{nextService}</span></button>
      </Link>
      </div>
      </section>
      <section>
      <Footer/>
      </section>
    
      </>
    )
}

export default ServiceItem