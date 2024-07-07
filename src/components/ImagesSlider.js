
import { useState, useEffect} from 'react';
import React from 'react';

export default function ImagesSlider({data}) {



 const [sliderClicked, setSliderClicked] = useState(-1)


 useEffect(function (){
  if(sliderClicked !== -1){
    document.body.classList.add('activeBackground')
  } else{
    document.body.classList.remove('activeBackground')

  }

  return function (){
    document.body.classList.remove('activeBackground')

  }

 }, [sliderClicked])


 console.log(data[0])


return (

  <div className='slider-cont' id='gallery'>
      {data.map((item, index) => (
          <section className={`imgs-cont imgs-cont${index} `}  id={item.details.heading}  key={index}>
      

    {item.details && (
            <div className='details' id={item.details.heading}>
              <h3 className='h3One'>Client: <span>{item.details.heading}</span></h3>
              <h3 className='h3Two'>Project duration: <span>{item.details.subHeading}</span> </h3>
              {/* <p>{item.details.par}</p> */}
            </div>
          )}
         
          <Slider 
         
            id={`main-${index}`}
            isActive={sliderClicked === `main-${index}`}
            onClickedSlider={() => setSliderClicked(`main-${index}`)}
            images={item.images}
      
            children={
              <CloseButton onClick={(e) => {e.stopPropagation(); setSliderClicked(-1)}}/>

            }
            roomName={item.roomNameDetails}
          />

          <Slider 

            id={`details-${index}`}
            isActive={sliderClicked === `details-${index}`}
            onClickedSlider={() => setSliderClicked(`details-${index}`)}
            images={item.imagesDetails}
            imagesDetails={item.imagesDetails}
            children={
           <CloseButton onClick={(e) => {e.stopPropagation(); setSliderClicked(-1)}}/>
            }
            roomName={item.roomName}
          />
    </section>
  
      ))}
  </div>
);

}


function CloseButton({onClick}){
  return(
    <div className='close' onClick={onClick}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="#ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6L18 18" stroke="#ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
  )
}

function Slider ({images ,id,roomName, isActive,  onClickedSlider, children, imagesDetails}){


  const [slider, setSlider] = useState(0)
const [opacity, setOpacity] = useState(1)



  function handleNext() {
 setSlider(prevSlide => {

 const nextSlide = ( prevSlide + 1) % images.length;
if(nextSlide === slider){
      setOpacity(0) 
} return nextSlide;
    })
  }
  


  function handlePrev() {
  if ( slider !== 0) {
    setSlider((slider) => ( slider - 1) % images.length);
  }
  }


  return(
    <div 
   
    className={`main-img-cont ${imagesDetails ?'img-cont-details' : "img-cont"} img-cont${id} ${isActive ? 'active' : 'hovered'}`} onClick={onClickedSlider} 
 
    > 
    <div className='arrange'>
    { images && 
  images.map((image, index) => (

 
    <img  key={index} src={image} style={{ transform: `translateX(${-slider * 100}%)`,
     opacity: opacity, 
      transition: 'opacity 0.5s ease-in-out', 
     }}/>
  ))}



  </div>

<div className={isActive ? 'hidden': 'overlay'}>{isActive ? 

(
<>
{children}

</>
)

: roomName}</div>
{isActive ? 
  <div className='buttons'>
<div className='prev' onClick={() => handlePrev()}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
</svg>
</div>


<div className='next' onClick={() => handleNext()}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polyline  points="9 18 15 12 9 6"></polyline>
</svg>
</div>

</div> : ''

}

    </div>
  )
}


