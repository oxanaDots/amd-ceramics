import React from "react";
import classNames from 'classnames';
import contactStyles from '../pages/Contact.module.css'
import { useFormContext } from "../context/FormContext";



    
 function ContactForm({ formId}){
  const { state, handleChange, handleSubmit, formRefs } = useFormContext()


    
    return (
        <form id="myForm" ref={formRefs[formId]}  className={contactStyles.form} action="#"  onSubmit={(e)=> handleSubmit(formId, e)}>
        {state[formId].isSubmitted && <h2 className={contactStyles.submittedMsg}>Thank you for your message!</h2>}

            {!state[formId].isSubmitted ? <fieldset>
       
              <label htmlFor={`${formId}_nameInput`}>Name</label>
         <input name="_nameInput" value={state[formId].nameInput} onChange={handleChange(formId)('nameInput')} type="text"/>
         <span className={`${state.errors[formId].nameInput ? contactStyles.show : contactStyles.error}`}><p >{state.errors[formId].nameInput}</p></span>
       
         <label htmlFor={`${formId}_emailInput`}>Email address</label>
         <input name="_emailInput"  value={state[formId].emailInput} onChange={handleChange(formId)('emailInput')} type="text"/>
         <span className={`${state.errors[formId].emailInput? contactStyles.show : contactStyles.error}`}><p >{state.errors[formId].emailInput}</p></span>
        
         <label htmlFor={`${formId}_phoneNumberInput`}>Phone Number</label>
         <input name="_phoneNumberInput" value={state[formId].phoneNumberInput} onChange={handleChange(formId)('phoneNumberInput')} type="text"/>
        <span className={`${state.errors[formId].phoneNumberInput? contactStyles.show : contactStyles.error}`}><p > {state.errors[formId].phoneNumberInput}</p></span>

        <label htmlFor={`${formId}_message`}>Message</label>
       <textarea name="message" value={state[formId].message} onChange={handleChange(formId)('message')}></textarea>
       <span className={`${state.errors[formId].message? contactStyles.show : contactStyles.error}`}><p > {state.errors[formId].message}</p></span>

       <button className={contactStyles.submitBtn} type="submit" name="btnSubmit" >Submit Form</button>

         </fieldset> : null}

        </form>
    )
 }

 export default ContactForm