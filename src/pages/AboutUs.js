import Footer from "../components/Footer"
import PageNav from "../components/PageNav"
import styles from './AboutUs.module.css'

const aboutUs = [

    {heading: 'About Us',
par: "Welcome to AMD Ceramics, your trusted partner in high-quality tiling solutions. With years of experience and a commitment to excellence, we specialize in transforming spaces with stunning tiles that blend beauty, durability, and functionality."
},

    {heading: 'Who We Are',
    par: "At AMD Ceramics, we are a dedicated team of tile experts passionate about craftsmanship and innovation. Our journey began with a simple mission: to provide superior tiling services that exceed our clients' expectations. Over the years, we have grown into a reputable name in the industry, known for our attention to detail, professionalism, and customer-centric approach.",

},

{heading: " What We Do",
par: "We offer a comprehensive range of tiling services for both residential and commercial projects. Whether you are renovating a kitchen, bathroom, or entire property, our skilled artisans deliver impeccable results. From classic ceramic and porcelain tiles to luxurious marble and contemporary mosaics, we source and install a variety of materials to suit your style and needs."
},
{heading: "Why Choose Us",
details: [
    {
        subHeading: 'Quality Craftsmanship',
        paragraph: "Our team of experienced tilers is committed to delivering the highest standards of workmanship. Every tile is laid with precision and care, ensuring a flawless finish.",
        },
        {
        subHeading: 'Customer Satisfaction',
        paragraph: "Your satisfaction is our priority. We work closely with you from the initial consultation to project completion, ensuring your vision becomes a reality.",
        },
        
        {
            subHeading: 'Innovative Solutions',
            paragraph:  "We stay abreast of the latest trends and technologies in tiling to offer you innovative solutions that enhance the aesthetics and functionality of your space.",
            
            },
            {
                subHeading: 'Reliable Service',
                paragraph:   "We understand the importance of timelines and budgets. Our team is dedicated to providing reliable and efficient service, ensuring your project is completed on time and within budget."
               
                
                }
]
},
,

]

function AboutUs(){
return(
<>
<nav>
<PageNav/>
</nav>
    <section className={styles.aboutSection}>
<div className={styles.aboutCont}>



      <>
      {aboutUs.filter(item => item.heading || item.par ).map(item=> (
        <div className={styles.aboutUsText}>
        <h2>{item.heading}</h2>
     
        <p>{item.par}</p>
       
     <div  className={styles.whyChooseUs}>
        {item.details && item.details.map(details => 
        <div className={styles.textCont}>
       <h4>{details.subHeading}</h4> 
       <p>{details.paragraph}</p>
       </div>
        )}
     </div>
        </div>
      ))}
      </>



</div>
    </section>
    <Footer/>
    </>
)
}

export default AboutUs