
import React from 'react';
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";
import styles from './Contact.module.css'
import ContactForm from '../components/ContactForm';
import {Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';




function Contact({nameInput, homeStyles, form, phoneNumberInput, handleSubmit, emailInput, message, errors, isSubmitted, handleChange}){
   

 

    return(
        <div>
            <PageNav/>
            <section className={!isSubmitted ? styles.sectionOne : styles.submitted}>
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
         <ContactForm homeStyles={{}} handleChange={handleChange} nameInput={nameInput} phoneNumberInput={phoneNumberInput}
             emailInput={emailInput} message={message} handleSubmit={handleSubmit} isSubmitted={isSubmitted} errors={errors} form ={form}
         />
          
           
            </section>
            <Footer/>
        </div>
    )
}

export default Contact