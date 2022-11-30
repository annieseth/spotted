import React, { useEffect, useState } from "react";

import { Image } from "react-native";

import BlueDonke from '../images/ads/BlueDonkeyAd.jpg'
import Starbucks from '../images/ads/StarbucksAD.jpg'


const images = [BlueDonke,Starbucks];


export default function ImageSwapper({styleNeeded}) {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(currentIndex === images.length - 1) {
                setCurrentIndex(0);
            } 
            else {
                 setCurrentIndex(currentIndex + 1);
            }
        }, 5000)
        
        return () => clearInterval(intervalId);
    }, [])

    return (
        
        <Image
            style = {styleNeeded}
            source={images[currentIndex]}
        />
    )
}