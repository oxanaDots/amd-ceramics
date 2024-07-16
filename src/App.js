import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './App.css';
import HomePage from './pages/HomePage';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import ServiceItem from './components/ServiceItem';
import TileCalc from './components/TileCalc';
import { FormProvider } from './context/FormContext';




// Define your data and services objects
const services = [
    {
        servicesName: 'Tile Installation',
        serviceDesc: 'Laying new tiles on floors, walls, backsplashes, or other surfaces',
        paragraph: 'Tile installation is a skilled craft that enhances the aesthetic and functional aspects of spaces in homes and commercial buildings...',
        iconPath: "https://img.icons8.com/external-others-pike-picture/50/000000/external-device-tiler-work-equipment-others-pike-picture-2.png",
        imagePath: '/images/tiler-working-renovation-apartment.jpg'
    },
    {
        servicesName: 'Tile Design and Layout',
        serviceDesc: 'Assisting in choosing tile patterns, colors, and designs, as well as planning the layout',
        paragraph: 'Tile layout and design services offer specialized expertise in crafting visually appealing and functional spaces through the strategic placement and selection of tiles...',
        iconPath: 'https://img.icons8.com/external-others-pike-picture/200/external-equipment-tiler-work-equipment-others-pike-picture-15.png',
        imagePath: '/images/top-view-boards-mdf-material.jpg'
    },
    {
        servicesName: 'Grouting',
        serviceDesc: 'Filling the spaces between tiles with grout and sealing it',
        paragraph: 'Grouting is a critical step in the tile installation process, serving both aesthetic and functional purposes. It involves filling the spaces between tiles with grout, a dense fluid which is typically a mixture of water, cement, and sometimes sand...',
        iconPath: 'https://img.icons8.com/external-solidglyph-m-oki-orlando/200/external-grout-construction-solid-solidglyph-m-oki-orlando.png',
        imagePath: '/images/construction-worker-using-plastering-trowel.jpg'
    },
    {
        servicesName: 'Waterproofing',
        serviceDesc: 'Applying waterproofing measures in wet areas like bathrooms and kitchens before tile installation',
        paragraph: 'Waterproofing in the context of tiling services is a critical process that ensures the longevity and durability of tile installations, particularly in areas prone to moisture exposure such as bathrooms, kitchens, and outdoor spaces...',
        iconPath: 'https://img.icons8.com/external-others-pike-picture/200/external-device-tiler-work-equipment-others-pike-picture-2.png',
        imagePath: '/images/microperforated-sheet-background-still-life.jpg'
    },
    {
        servicesName: 'Tile Removal',
        serviceDesc: 'Removing old tiles safely without damaging the underlying surfaces',
        paragraph: 'Tile removal is a crucial service in the renovation and remodeling sector, essential for updating old or damaged tilework in homes and commercial spaces. This process involves the careful extraction of existing tiles from floors, walls, or other surfaces without causing extensive damage to the underlying substrates...',
        iconPath: 'https://img.icons8.com/external-others-pike-picture/200/external-equipment-tiler-work-equipment-others-pike-picture-15.png',
        imagePath: '/images/close-up-construction-safety-goggles-blurred-background.jpg'
    },
    {
        servicesName: 'Tile Cutting and Fitting',
        serviceDesc: 'Custom cutting tiles to fit around obstacles and in tight corners',
        paragraph: 'Tile cutting and fitting is a meticulous aspect of the tiling process that involves resizing and shaping tiles to perfectly fit the designated space, ensuring a professional finish...',
        iconPath: 'https://img.icons8.com/external-others-pike-picture/200/external-device-tiler-work-equipment-others-pike-picture-2.png',
        imagePath: '/images/tiler-working-renovation-apartment-(1).jpg'
    }
];

const data = [
    {
        roomName: 'Bathroom',
        roomNameDetails: 'Bathroom Details',
        images: [
            'images/elegant-bathtub-with-bath-elements.jpg',
            'images/bathtub-decoration-bathroom.jpg',
            'images/2148899483.jpg'
        ],
        imagesDetails: [
            'images/luxury-bathroom-authentic-interior-design.jpg',
            'images/modern-bathroom-authentic-interior-design.jpg',
            'images/modern-bathroom-authentic-interior-design.jpg'
        ],
        details: {
            heading: 'Amazon',
            subHeading: '2 months',
            par: `A homeowner undertakes a bathroom renovation, opting for a mosaic tiling project. The design features vibrant blue and white ceramic tiles, artistically arranged to create a calming, ocean-inspired theme, enhancing the room's aesthetic and increasing the home's overall value.`
        }
    },
    {
        roomName: 'Kitchen',
        roomNameDetails: 'Kitchen Details',
        images: [
            'images/bathtub-decoration-bathroom.jpg',
            'images/elegant-bathtub-with-bath-elements.jpg',
            'images/2148899483.jpg'
        ],
        imagesDetails: [
            'images/modern-bathroom-authentic-interior-design.jpg',
            'images/luxury-bathroom-authentic-interior-design.jpg',
            'images/modern-bathroom-authentic-interior-design.jpg'
        ],
        details: {
            heading: 'North Star',
            subHeading: '6 months',
            par: `A homeowner undertakes a bathroom renovation, opting for a mosaic tiling project. The design features vibrant blue and white ceramic tiles, artistically arranged to create a calming, ocean-inspired theme, enhancing the room's aesthetic and increasing the home's overall value.`
        }
    },
    {
        roomName: 'Shower',
        roomNameDetails: 'Shower Details',
        images: [
            'images/2148899483.jpg',
            'images/elegant-bathtub-with-bath-elements.jpg',
            'images/bathtub-decoration-bathroom.jpg'
        ],
        imagesDetails: [
            'images/luxury-bathroom-authentic-interior-design.jpg',
            'images/modern-bathroom-authentic-interior-design.jpg',
            'images/modern-bathroom-authentic-interior-design.jpg'
        ],
        details: {
            heading: 'Google',
            subHeading: '8 months',
            par: `A homeowner undertakes a bathroom renovation, opting for a mosaic tiling project. The design features vibrant blue and white ceramic tiles, artistically arranged to create a calming, ocean-inspired theme, enhancing the room's aesthetic and increasing the home's overall value.`
        }
    }
];

function App() {
   

    return (
        <FormProvider>
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <HomePage
                        data={data}/>
                    }
                />
                <Route path='/gallery' element={<Portfolio data={data} />} />
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path='/tile-ccalculator' element={<TileCalc/>}/>
                <Route
                    path='/contact'
                    element={
                        <Contact/>
                    }
                />
                <Route
                    path='/services'
                    element={<Services services={services} />}
                />
                {services.map((service, index) => (
                    <Route
                        key={index}
                        path={`/service/${service.servicesName}`}
                        element={<ServiceItem
                            serviceName={service.servicesName}
                            description={service.serviceDesc}
                            image={service.imagePath}
                            index={index}
                            par={service.paragraph}
                            services={services}
                        />}
                    />
                ))}
            </Routes>
        </BrowserRouter>
        </FormProvider>
    );
}

export default App;
