

import PageNav from "../components/PageNav"
import {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'; 
import { HashLink } from "react-router-hash-link";
import homeStyles from './Homepage.module.css'
import Question from './Question'
import Footer from '../components/Footer'
import ContactForm from ".//../components/ContactForm";


const logos =[
    {
        companyName: "Amazon",
        path: "https://img.icons8.com/color/300/amazon-music--v3.png"
    },

    {
        companyName: "Air BnB",
        path: "https://img.icons8.com/color/300/airbnb.png"
    },
    {
        companyName: "Google",
        path: "https://img.icons8.com/color/300/google-groups--v2.png"
    },
    {
        companyName: "Nikon",
        path: "https://img.icons8.com/color/300/nikon.png"
    },
    {
        companyName: "Google",
        path: "https://img.icons8.com/color/240/zigbee.png"

    }
]

const questions =
[
    {
        question: 'Is there a charge for surveys or receiving a bathroom renovation quote?',
        answer: 'Absolutely not. All surveys and bathroom renovation quotes are provided completely free of charge and without any obligation. We believe in offering transparent and upfront services to assist you in making an informed decision with ease.'
    },

    {
        question: 'How long does a typical bathroom installation project take?',
        answer: 'A standard bathroom installation project usually takes between 10 and 12 working days. This timeframe allows us to ensure meticulous attention to detail and high-quality workmanship, while also respecting your schedule and convenience.'
    },

    {
        question: 'Are your bathroom installations covered by a warranty?',
        answer: 'Indeed, we stand firmly behind the quality of our craftsmanship. Each bathroom installation we undertake is backed by a 24-month craftsmanship warranty. This warranty is our commitment to you, ensuring that our work meets the highest standards of quality and durability.'
    },

    {
        question: 'Do you have insurance coverage for your bathroom installation services?',
        answer: 'Yes, we prioritize the safety and assurance of our clients in all our services. Our company is fully insured, holding a £10 million public liability insurance. This ensures that both our clients and our work are comprehensively protected throughout the installation process.'
    }

]

function HomePage({data, nameInput, form, phoneNumberInput, handleSubmit, emailInput, message, errors, isSubmitted, handleChange}){

    const companyLogos = logos;

    const textRef = useRef(null)
    const heroRef = useRef(null)
    const paragraphRef = useRef(null)
    const descTextRef = useRef(null)
    const aboutUsRef = useRef(null)
   
    const [isSmallScreen, setSmallScreen] = useState(window.innerWidth <= 950)
 
    useEffect(()=>{
        function handleResize (){
            setSmallScreen(window.innerWidth <= 950)
        }
        window.addEventListener('resize', handleResize)
        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    })
    const landscapeImage = data[1].imagesDetails[0];


    useEffect(() =>{
      const timer = setTimeout(() => {
      
          textRef.current.classList.add('active');
          heroRef.current.classList.add('active');
          paragraphRef.current.classList.add('active');
          descTextRef.current.classList.add('active')
          aboutUsRef.current.classList.add('active')
   
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [])

    const scrollWithOffset = (el) => {
       
        const yOffset = -window.innerHeight / 2.5 + el.getBoundingClientRect().height / 2.5;
        console.log(yOffset)
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        console.log(el.getBoundingClientRect().height)
        window.scrollTo({ top: y, behavior: 'smooth' });
      };

    return(

       <div className={homeStyles.cont}>
        
<header className={homeStyles.header}>

<PageNav/>
      <div className='hero-cont' ref={heroRef}>
      
  <div className='hero' >
    <div className='text-cont' ref={textRef}>
  <h1>Welcome to <span style={{color: '#47484a', opacity: '0.8'}}>AMD Ceramics</span></h1>
  </div>
    <p  ref={paragraphRef}>London based tiling company, dedicated to our craft</p>
    <h4>Call us on <strong>07486783475</strong></h4>
    <div className="about-us" ref={aboutUsRef}>
   <HashLink to="aboutUs" smooth='true'> <h3>About us</h3></HashLink>
    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M1 12H18M19 12L12 5M19 12L12 19" stroke="#474748" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
 
 </div>
        <img ref={descTextRef} src="images/Single-illustr.png"/>
    </div>



   

   {/* <p>At AMD Ceramics, we specialize in expert tiling solutions that breathe new life into your home or office. Whether you're revamping your kitchen, bathroom, or adding a touch of elegance to your entryway, our professional tilers are equipped to handle all your needs.</p> */}
      </div>

      </header>
     <section className={homeStyles.flexCol}>
        <div className={homeStyles.textCont}>
      <h1>Our Clients</h1>
      <p>We have been working for one of the most prestigious clients in the construction industry </p>
<div className={homeStyles.logosCont}>
{companyLogos.map(logo => <img  className={homeStyles.logo} key={logo.companyName} src={logo.path}/>)}
</div>
      </div>
     </section>
     <section className={homeStyles.gallerySection}>

   
      {isSmallScreen ? (
        <div className={homeStyles.galleryCont}>
          {data.map((item, index) => (
            <img key={index} src={item.images[0]} alt={`Image ${index + 1}`} />
          ))}
        </div>
      ) : (
        data.map((item, index) => (
          <img key={index} src={item.images[0]} alt={`Image ${index + 1}`} />
        ))
      )}


<figure className={homeStyles.figureImg}>
<img src={landscapeImage}/>
</figure>
<HashLink to='gallery#top' smooth='true'><h3>Explore our gallery</h3></HashLink>
<div className={homeStyles.pastProjects}>
    <h2>Past Projects</h2>
    <div className={homeStyles.pastProjectsText}>
        {data.map((item, index) => 
        <>
        <span>
         <h4>0{index + 1} </h4>
        <HashLink smooth='true' scroll={el => scrollWithOffset(el)} to={`gallery#${item.details.heading}`}> <p>{item.details.heading}</p></HashLink>
         </span>

        </>
        )}
    </div>
</div>
     </section>

     <section className={homeStyles.sectionTwo}>
        <div className={homeStyles.textCol}>
       <h2>
      Transform any room with high-quality tiling that reflects your style and meets your functional needs.
       </h2>
       <p>
       Unsure of your requirements or where to begin? Use our <strong>Tile Calculator</strong> to easily determine the total area you need to tile and get an approximate quote for our services.
       </p>

       <HashLink smooth='true' to="/services#quote" >
                      <button>Get a Quote</button>
                 </HashLink>

     

        <div className={homeStyles.imageCont}>
        <img src="images/Single-illustr.png"/>

        </div>
    
        </div>
       
     </section>

     <section id="Q%26A" className={homeStyles.sectionThree}> 
<h2>Common Queries</h2>
     <div className={homeStyles.qCont}>
       <Question questions={questions}/>
     </div>
     </section>
     <section className={homeStyles.contactForm}>
        <h2>Contact Us</h2>
     <ContactForm  homeStyles={homeStyles} handleChange={handleChange} nameInput={nameInput} phoneNumberInput={phoneNumberInput}
             emailInput={emailInput} message={message} handleSubmit={handleSubmit} isSubmitted={isSubmitted} errors={errors} form ={form}
         />
       </section>     
     <Footer/>
      </div>

     
    )
  }

  export default HomePage