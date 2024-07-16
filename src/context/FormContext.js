import { createContext, useContext, useReducer, useRef } from "react";
import emailjs from '@emailjs/browser';



function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.formId]: {
                    ...state[action.formId],
                    [action.field]: action.value,
                },
            };

        case 'SET_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.formId]: {
                        ...state.errors[action.formId],
                        [action.field]: action.errorMessage,
                    },
                },
            };

        case 'CLEAR_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.formId]: {
                        ...state.errors[action.formId],
                        [action.field]: '',
                    },
                },
            };

        case 'RESET_FORM':
            return {
                ...initialState, // Resetting all fields to the initial state
            };

        case 'IS_SUBMITTED':
            return {
                ...state,
                [action.formId]: {
                    ...state[action.formId],
                    isSubmitted: true,
                },
            };

        default:
            return state;
    }
}

const initialState = {
    contactForm1: {
        nameInput: '',
        emailInput: '',
        phoneNumberInput: '',
        message: '',
        isSubmitted: false,
    },
    contactForm2: {
        nameInput: '',
        emailInput: '',
        phoneNumberInput: '',
        message: '',
        isSubmitted: false,
    },
    errors: {
        contactForm1: {
            nameInput: '',
            emailInput: '',
            phoneNumberInput: '',
            message: '',
        },
        contactForm2: {
            nameInput: '',
            emailInput: '',
            phoneNumberInput: '',
            message: '',
        },
    },
};
 

const FormContext = createContext()


const FormProvider = ({ children }) => {
    const formRefs = {
        contactForm1: useRef(null),
        contactForm2: useRef(null),
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    async function handleSubmit(formId, e) {
        e.preventDefault();

        const { nameInput, emailInput, phoneNumberInput, message } = state[formId];



        if (!nameInput || !emailInput || !phoneNumberInput || !message) {
            // Dispatch an error for each field to ensure clarity
            if (!nameInput) dispatch({ type: 'SET_ERROR', formId, field: 'nameInput', errorMessage: 'Name is required.' });
            if (!emailInput) dispatch({ type: 'SET_ERROR', formId, field: 'emailInput', errorMessage: 'Email is required.' });
            if (!phoneNumberInput) dispatch({ type: 'SET_ERROR', formId, field: 'phoneNumberInput', errorMessage: 'Phone number is required.' });
            if (!message) dispatch({ type: 'SET_ERROR', formId, field: 'message', errorMessage: 'Message is required.' });

            return; // Exit early if there are errors
        }

        // Clear all errors if every field is filled
        dispatch({ type: 'CLEAR_ERROR', formId, field: 'nameInput' });
        dispatch({ type: 'CLEAR_ERROR', formId, field: 'emailInput' });
        dispatch({ type: 'CLEAR_ERROR', formId, field: 'phoneNumberInput' });
        dispatch({ type: 'CLEAR_ERROR', formId, field: 'message' });

        // Assuming your emailjs implementation here
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        try {
            const result = await emailjs.sendForm(serviceId, templateId, formRefs[formId].current, publicKey);
            console.log('SUCCESS!', result);
            dispatch({ type: 'IS_SUBMITTED', formId });
        } catch (error) {
            console.log('FAILED...', error.text);
        }
    }

    function handleChange(formId) {
        return function (field) {
            return function (e) {
                const value = e.target.value;
                dispatch({ type: 'SET_FIELD', formId, field, value });

                // Optionally validate on change
                let error = '';
                switch (field) {
                    case 'nameInput':
                        error = validateFullName(value);
                        break;
                    case 'emailInput':
                        error = validateEmail(value);
                        break;
                    case 'phoneNumberInput':
                        error = validateContactNumber(value);
                        break;
                    case 'message':
                        error = validateMessage(value);
                        break;
                    default:
                        break;
                }

                if (error) {
                    dispatch({ type: 'SET_ERROR', formId, field, errorMessage: error });
                } else {
                    dispatch({ type: 'CLEAR_ERROR', formId, field });
                }
            };
        };
    }

    function validateFullName(nameInput) {
        const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
        return regex.test(nameInput) ? null : 'Please enter your full first and last name.';
    }

    function validateEmail(emailInput) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(emailInput) ? null : 'Please enter a valid email address.';
    }

    function validateContactNumber(phoneNumberInput) {
        const regex = /^[0-9]{11}$/;
        return regex.test(phoneNumberInput) ? null : 'Please enter a valid contact number';
    }

    function validateMessage(message) {
        return message.length >= 10 ? null : 'Message must be at least 10 characters long.';
    }


    return (
        <FormContext.Provider value={{ state, dispatch, handleSubmit, handleChange, formRefs }}>
            {children}
        </FormContext.Provider>
    );
};


function useFormContext(){


    const context = useContext(FormContext)

    if(context === undefined) throw new Error ('FormContext was used outside of FormProvider')
return context
}

export{ FormProvider, useFormContext}