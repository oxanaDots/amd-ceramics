import React from 'react'

import { useState } from "react"
import styles from './Services.module.css'

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

function Services ({ setServices, s, updateInput, tile}){
const [checkedService, setCheckedService] = useState (null)

function handleService(e){
    setServices(+ e.target.value)

}

    return(
        <div className={styles.checkBox}>
      {services && services.map((item, index)=> 
( <span style={{display: 'flex', alignItems: 'center'}}><label className={styles.label}>{item.servicesName}, {tile}</label>
    <p style={{marginRight: '0.3rem'}}>{updateInput}m²</p>
  <input value={item.price} 
   id={index}
  onChange={handleService} type="checkbox" /></span>) 
  )}
 

</div>
    )
}

export default Services