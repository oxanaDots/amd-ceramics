import React from 'react'
import { create, all } from 'mathjs'
import { useState, useEffect } from 'react';
import Services  from '../components/Services';
import styles from './/Services.module.css'


function formatArea(area) {
  const options = {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  };
  return `${parseFloat(area).toLocaleString('en-GB', options)} `;
}




 export default function TileCalc({showCalc, totalArea, setConvertedAreas, convertedAreas, setShowCalc, setUpdateInput}) {



  
  useEffect( function(){
    if(showCalc){
        document.body.classList.add('calcActive')
    } else{
        document.body.classList.remove('calcActive')

    }

    return function (){
        document.body.classList.remove('calcActive')

    }
}, [showCalc] ) 

  const [walls, setWalls] = useState([
    { id: 1, name: "Wall 1", height: "", width: "" },
    { id: 2, name: "Wall 2", height: "", width: "" },
    { id: 3, name: "Wall 3", height: "", width: "" },
    { id: 4, name: "Wall 4", height: "", width: "" },
  ]);



  const [selection, setSelection] = useState("m");
  const [isOpen, setIsOpen] = useState(false)

  function handleToggle(){
    setIsOpen(isOpen => !isOpen)
  }


function handleCloseCalc(){
setShowCalc(false);
setUpdateInput(totalArea ) 
}


  const handleAttrubuteChange = (id, value, attribute) => {

    
    const regex = /^\d*\.?\d*$/;
    if(regex.test(value)){
      setWalls((walls) => walls.map((wall) => (wall.id === id ? { ...wall, [attribute]: value } : wall))
    );
    }
  };

  const handleSelectionChange = (value) => {
    setSelection(value);
  };


  const handleConvertedAreaChange = (id, area) => {
    const numericArea = parseFloat(area);

        setConvertedAreas(prevAreas => ({
            ...prevAreas,
            [id]: numericArea  
        }));
   
};

  // const totalArea = Object.values(convertedAreas).reduce((acc, area) => acc + (area), 0)

  return (
    <div  className={`calc-cont ${showCalc && "active-calc"}`} >


      <div className='title' onClick={handleToggle}>
   
      <p style={{cursor: "pointer"}} onClick={()=> setShowCalc(false)}>&times;</p>
      </div>
    

      <>
      {  walls.map((wall) => (
      
  

       <ItemToMeasure
          key={wall.id}
          wall={wall}
          selection={selection}
         onAttributeChange={handleAttrubuteChange}
          onSetSelection={handleSelectionChange} 
          onConvertedAreaChange={handleConvertedAreaChange}
          />
      ))}
      <div className="cont">
        <TotalArea
          totalArea={totalArea}
          selection={selection}
          onSetSelection={handleSelectionChange} />
    
      </div>
         <span className={styles.addToServices}> <button onClick={handleCloseCalc}>Add to quote </button> 
         </span> 
      </>

    </div>
  );
}


function ItemToMeasure({
  wall, onAttributeChange, onConvertedAreaChange, selection, onSetSelection,
}) {
  const { id, name, height, width } = wall;
  const [convertedArea, setConvertedArea] = useState('');
  const[loading, setLoading]  = useState(false)


  useEffect(
    function () {
      
      async function getConversion() {
      

          try {
          
            
             let calculatedArea = (height) * (width);  // Make sure 'height' and 'width' are defined and numeric
    
           
             const fromUnit = `${selection}^2`;  // From square meters
    const toUnit = 'meter^2';  
    
    const expression = encodeURIComponent(`(${calculatedArea} ${fromUnit} in ${toUnit})`);
    const url = `https://api.mathjs.org/v4/?expr=${expression}`;

  
            const res = await fetch(url);       
          

            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
        
          
            const data = await res.text();
            const formattedData = formatArea(data)
        
            setLoading(true)
            setConvertedArea(formattedData)
            onConvertedAreaChange(id, data); 

          } catch (error) {
            console.error("Failed to fetch:", error);
          } finally {
            setLoading(false)
          }
    
      }
      getConversion();
    },
    [ height, width, selection]
  );
 
  return (
    <div className="cont">
    
      <h3 className="wall">{name}</h3>
      
        <div className="height">
          <label>Height</label>
      
          <input
            value={height}
            onChange={(e) => onAttributeChange(id,  e.target.value, 'height')} /> 
           
        </div>
    
        <h2>X</h2>
        <div className="width">
          <label>Width</label>
        
          <input
            value={width}
            onChange={(e) => onAttributeChange(id, e.target.value, 'width')} />
            
        </div>
        <div className="unit">
          <label>Unit</label>
          <select
            value={selection}
            onChange={(e) => onSetSelection(e.target.value)}>
              <optgroup>
            <option value="m"> meter</option>
            <option value="cm">cm</option>
            <option value="mm">mm</option>
            <option value="ft">feet</option>
            <option value="in">inches</option>
            </optgroup>
          </select>
        </div>
        <h3>=</h3>
       { loading ? <span>Calculating...</span> : <Total
          height={height}
          width={width}
          selection={selection}
          onSetSelection={onSetSelection} 
          convertedArea={convertedArea}/>}
      
      </div>
    
      
  
  );
}
function Total({ height, width, convertedArea }) {
  return (
    <>
      <div className="total">
    <p>{convertedArea  && height && width ?` ${convertedArea} m²`: 'm²'}</p> 
    
      </div>
    </>
  );
}
function TotalArea({ totalArea }) {

  const formattedTotal = formatArea(totalArea)
const[selection, setSelection]  = useState('m')
  const [covertedData, setConvertedData] = useState(formattedTotal)

  useEffect(function (){
     async function conversion(){
      try {
    const fromUnit = 'meter^2';  // From square meters
    const toUnit = `${selection}^2`;


  
    const expression = encodeURIComponent(`(${totalArea} ${fromUnit} in ${toUnit})`);
    const url = `https://api.mathjs.org/v4/?expr=${expression}`;

    console.log(`Attempting to fetch conversion with URL: ${url}`);
   const res = await fetch(url)
    
   if (!res.ok) {
     throw new Error(`HTTP error! Status: ${res.status}`);
   }

 
   const data = await res.text();
 
   setConvertedData(formatArea(data))
 

  } catch (error) {
    console.error("Failed to fetch:", error);
  }

   }
   
   conversion()
  }, [selection])

  return (
    <div className="totalArea">
      <h2>
        Total Area:  </h2>
        <span>
        <select
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
          >
            <option value="m"> meter</option>
            <option value="cm">cm</option>
            <option value="mm">mm</option>
            <option value="ft">feet</option>
            <option value="in">inches</option>
          </select>
        </span><span style={{display: 'inline'}}>{selection === 'm' ?  formattedTotal : covertedData} {selection}² </span>
    </div>
  );
}


