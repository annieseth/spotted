import React, { useEffect, useState } from "react";

import { Image } from "react-native";

import BlueDonke from '../images/ads/BlueDonkeyAd.jpg'
import recCenter from '../images/ads/CRC.jpg'

import dining from '../images/ads/android/GTDining.jpg'
import housing from '../images/ads/android/Uhouse.jpg'

const images = [BlueDonke,dining, recCenter, housing];


export default function AndroidSwapper({styleNeeded}) {

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