import React, { useEffect, useState } from "react";

import { Image } from "react-native";

import BlueDonke from '../images/ads/BlueDonkeyAd.jpg'
import recCenter from '../images/ads/CRC.jpg'

import Starbucks from '../images/ads/ios/StarbucksAD.jpg'
import BookStore from '../images/ads/ios/bookstore.jpg'

const images = [recCenter, BookStore, Starbucks, BlueDonke];


export default function AppleSwapper({styleNeeded}) {

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