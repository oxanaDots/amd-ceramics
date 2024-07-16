
import React from 'react';
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";
import styles from './Contact.module.css'
import ContactForm from '../components/ContactForm';
import {Link, useFormAction } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { useFormContext } from '../context/FormContext';




function Contact(){
   
    const {isSubmitted} = useFormContext()

 

    return(
        <div>
            <PageNav/>
            <section className={ styles.sectionOne}>
            <div className={styles.textCont}>
                <h2>Contact Us</h2>
                <h3>Got any questions? </h3>
                <p>
                Either fill out the form with your inquiry or check our our 
                <HashLink smooth='true' to="/#Q%26A">
                    <span> Q&A </span>
                </HashLink>
                section. 
                </p>
                <h4 >
                 Looking for a quick estimate? </h4>
                   <HashLink to="/services#quote">
                      <button>Get a Quote</button>
                 </HashLink>
            </div>
         <ContactForm formId='contactForm1'
         />
          
           
            </section>
            <Footer/>
        </div>
    )
}

export default Contact