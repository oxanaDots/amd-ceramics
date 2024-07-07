import React from "react";
import classNames from 'classnames';
import contactStyles from '../pages/Contact.module.css'



    
 function ContactForm({ nameInput, form,  phoneNumberInput, handleSubmit, emailInput, message, errors, isSubmitted, handleChange}){


    
    return (
        <form id="myForm" ref={form}  className={contactStyles.form} action="#"  onSubmit={handleSubmit}>
        {isSubmitted && <h2 className={contactStyles.submittedMsg}>Thank you for your message!</h2>}

            {!isSubmitted ? <fieldset>
       
         <label  htmlFor='name'>Full name*</label>
         <input name="name" value={nameInput} onChange={handleChange('nameInput')} type="text"/>
         <span className={`${errors.nameInput? contactStyles.show : contactStyles.error}`}><p >{errors.nameInput}</p></span>
       
         <label  htmlFor='email'>Email address*</label>
         <input name="email"  value={emailInput} onChange={handleChange('emailInput')} type="text"/>
         <span className={`${errors.emailInput? contactStyles.show : contactStyles.error}`}><p >{errors.emailInput}</p></span>
        
         <label  htmlFor='number'>Contact number*</label>
         <input name="number" value={phoneNumberInput} onChange={handleChange('phoneNumberInput')} type="text"/>
        <span className={`${errors.phoneNumberInput? contactStyles.show : contactStyles.error}`}><p > {errors.phoneNumberInput}</p></span>

         <label htmlFor='message'> Message*</label>
       <textarea name="message" value={message} onChange={handleChange('message')}></textarea>
       <span className={`${errors.message? contactStyles.show : contactStyles.error}`}><p > {errors.message}</p></span>

       <button className={contactStyles.submitBtn} type="submit" name="btnSubmit" >Submit Form</button>

         </fieldset> : null}

        </form>
    )
 }

 export default ContactForm