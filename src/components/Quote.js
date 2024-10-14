import React from 'react'
import styles from '../components/Services.module.css'
import TileCalc from   './TileCalc'
import { useEffect, useState } from 'react'
import Services from '../components/Services'

const tiles = [
    {tile: 'ceramic',
price: 0
},

{tile: 'cement',
price: 70
},

{tile: 'natural stone',
price: 40
},

{tile: 'porcelain',
price: 60
},

{tile: 'glass',
price: 50
},

{tile: 'mosaic',
price: 60
},

{tile: 'terracotta',
price: 20
},

{tile: 'no tile',
price: 0
}

]


const services = [
    {servicesName: 'Tile Installation',
    price: 600,
   serviceDesc: ' Laying new tiles on floors, walls, backsplashes, or other surfaces',
iconPath: "https://img.icons8.com/external-others-pike-picture/200/external-equipment-tiler-work-equipment-others-pike-picture-15.png" 
},

   {servicesName: 'Tile Design and Layout',
   price: 100,
   serviceDesc: 'Assisting in choosing tile patterns, colors, and designs, as well as planning the layout',
   iconPath: "https://img.icons8.com/external-others-pike-picture/200/external-equipment-tiler-work-equipment-others-pike-picture-15.png" 

},

   {servicesName: 'Grouting',
   price: 80,
   serviceDesc: 'Filling the spaces between tiles with grout and sealing it',
   iconPath: 'https://img.icons8.com/external-solidglyph-m-oki-orlando/200/external-grout-construction-solid-solidglyph-m-oki-orlando.png',

},

   {servicesName: 'Waterproofing',
   price: 500,
   serviceDesc: 'Applying waterproofing measures in wet areas like bathrooms and kitchens before tile installation',
   iconPath: "https://img.icons8.com/external-others-pike-picture/200/external-device-tiler-work-equipment-others-pike-picture-2.png"
},

   {servicesName: 'Tile Removal',
   price: 600,
   serviceDesc: 'Removing old tiles safely without damaging the underlying surfaces',
   iconPath: "https://img.icons8.com/external-others-pike-picture/200/external-equipment-tiler-work-equipment-others-pike-picture-15.png" 

},

   {servicesName: 'Tile Cutting and Fitting',
   price: 100,
   serviceDesc: 'Custom cutting tiles to fit around obstacles and in tight corners',
   iconPath: "https://img.icons8.com/external-others-pike-picture/200/external-device-tiler-work-equipment-others-pike-picture-2.png"

},
]

function Quote ({showCalc, setShowCalc}){
    const [convertedAreas, setConvertedAreas] = useState({});

    const [updateInput, setUpdateInput] = useState('')
 const [tilingServices, setServices] = useState(null)
 const [tile, setTiles] = useState('')
 const [error, setError] = useState ('')
 const [tileError, setTileError] = useState ('')

 const [serviceData, setServiceData] = useState(services.map(service => ({
    ...service,
    isSelected: false,
    area: '',
    tile: '',
    
})));




const formatNumber =(value)=>{

  const [integer, decimal] = value.split('.')
  const formattedIntegerPart = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal ? `${formattedIntegerPart}.${decimal}` : formattedIntegerPart;
  }  




const formatString = (value)=> {
  if(typeof value === 'string'){
  const numberString = value.replace (/,/g, '')
  return parseFloat(numberString);
}

return ''

  }



const isSelected = serviceData.map(service => service.isSelected)

  const totalArea = Object.values(convertedAreas).reduce((acc, area) => acc + (area), 0)


  const getTilePriceById = (tileId) => {
    const tile = tiles.find((tile, i) => tile.tile === tileId);
    return tile ? tile.price : 0; 
};

const handleAddService = (index, value, value2) => {


    setError(
        updateInput === '' && isSelected ? '* Enter the size of the area'  : '');   

    setTileError(    tile === '' && isSelected ? '* Select a tile' : '')

    setServiceData(prev =>
        prev.map((service, idx) => 
            idx === index ? {...service, isSelected: !service.isSelected && value !== '' && value2 !== '', area: !service.isSelected  ?  value : '',
        tile: !service.isSelected  ?  service.servicesName === 'Waterproofing' ? 'no tile' : value2 : value2,
        tilePrice: getTilePriceById(value2)
        } : service
        )
    );


    setUpdateInput( updateInput !== '' &&  tile !== ''  ? '' : updateInput)
    setTiles( updateInput !== '' &&  tile !== ''  ? '' : tile )
 
};



const tilePrice = tiles.map((tile) => tile.price) 


const allAreas = serviceData
  .map((service) => {
    if (service.area) {
      const formattedArea = formatString(service.area);
      return (formattedArea * service.price) + (service.tilePrice * formattedArea);
    }
    return 0; // Return 0 for services without an area
  })

  .reduce((acc, amount) => 
   
    acc + amount, 0);
   console.log(allAreas)







const handleUpdateInput = (e) => {

  const rawInput = e.target.value.replace(/,/g, '')
  if (/^\d*\.?\d*$/.test(rawInput)) {
    setUpdateInput( formatNumber(rawInput));
}


};

const sumOfAreas = serviceData
  .map((service) => {
    if (service.area) {
      const formattedArea = formatString(service.area);
      return formattedArea;
    }
    return 0; 
  })
  .reduce((acc, amount) => acc + amount, 0);



    return(

        <section className={styles.sectionTwo}>
        <div className={styles.textContTwo}>
        <h2>Get a Quote</h2>
        {/* <h3>Your ideal living space is just a quote away.</h3> */}
        <p>* reach out to us via email to get a personalized quote</p>
        </div>
      
        <div  className={styles.calc}>
         { showCalc && <TileCalc convertedAreas={convertedAreas} setConvertedAreas={setConvertedAreas} totalArea={totalArea} setUpdateInput={setUpdateInput}  tilingServices={tilingServices} setServices={setServices} showCalc={showCalc} setShowCalc={setShowCalc}/>}
        <div className={`${styles.quote} `}>
       
         <div  id='specificSection' style={{cursor: 'pointer'}} onClick={()=> setShowCalc(true)} className={styles.calculatorCont}>
         <img width="64" height="64" src="https://img.icons8.com/pastel-glyph/64/calculator--v1.png" alt="calculator--v1"/>  
          <p style={{display: 'inline'}}> Use our <strong  
          >Tile Calculator</strong> to determine the total area that requires tiling </p></div>
      
         
          <div className={styles.quoteCont}>
          <div className={`${styles.unitCont} ${styles.unitContOne}`}>
          <label style={{display: 'flex', flexDirection: 'column'}}>1. Area to tile:
          <span className={`${styles.error} ${updateInput === '' && isSelected ? styles.smooth : null} `}>{error}</span>
          </label>
      
      <span style={{display: 'flex', gap: '0.4rem', alignItems: 'center'}}><input onChange={handleUpdateInput} 
      value={updateInput} 
      type="text" 
      inputMode='numeric'
      placeholder='Enter a number'
      /> </span>
      <p className='sqrMetres'>m²</p>
     
          </div>
      


          <div className={`${styles.unitCont} ${styles.unitContTwo}`}>
          <label>3. Required services:</label>
          <div className={styles.checkBox}>
      { serviceData.map((item, index)=> 
( <span className={styles.checkBoxItem}>
      {/* <div className='summaryCont'> */}
    <div  className={styles.labelCont} style={{display:'flex', alignItems:'start', justifyContent: 'space-between', width:'auto'}}>
    <button 
    key={item.index}
    type='button'
      onChange={(e)=> setUpdateInput (e.target.value)}
      onClick={(e) => handleAddService(index, updateInput, tile)} 
      value={ updateInput}  >{item.area && item.tile ? '-': '+'}</button>
   
    <label className={styles.label}>{item.area ? item.servicesName  : item.servicesName  } </label>
      </div>
      <div className= {item.isSelected ?  styles.show : styles.parDiv} > 
    <p > {item.isSelected && item.area + 'm²'}</p>
    <p > {item.area && item.tile}</p>

    <p >{item.area &&   '£' + item.area * item.price} </p>
    </div>
      {/* </div> */}

</span>) 
  )}
 

</div>



          </div>
          <div className={`${styles.unitCont} ${styles.unitContThree}`}>

          <label style={{display: 'flex', flexDirection: 'column'}}>2. Type of tile:
          <span className={`${styles.error} ${tile === '' && isSelected ? styles.smooth : null} `}>{tileError}</span>

          </label>
      <select  onChange={(e)=> setTiles(e.target.value)} value={tile}>
      <option  onChange={(e)=> setTiles(e.target.value)}  hidden></option>

        {tiles.map((item)=> <option  value={item.tile }>{item.tile }</option>)}
      
      </select>
          </div>
      
          </div>
          <div className={styles.totalPrice}>Total price (per {sumOfAreas}m²): £{allAreas} </div>
        </div>
        </div>
        </section>
    )
}

export default Quote