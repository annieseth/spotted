import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const WeatherItem = ({title, value, unit,}) => {
    return(
        <View style={styles.weatherItem}>
            <Text style={styles.weatherItemTitle}>{title}</Text>
            <Text style={styles.weatherItemTitle}>{value}{unit}</Text>
        </View>
    )
}

const DateTime = ({current, lat, lon,}) => {
    const [date, setDate] = useState('')

    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
                
            setDate(days[day] + ', ' + date+ ' ' + months[month - 1]) 
        }, 5000);
    }, [])
    return (
        <View style={styles.container}>  
           <View>
               
               {/* <View>
                   <Text style={styles.subheading}>{date}</Text>
               </View> */}
               <View>
                   <Text style={styles.subheading}>Current Weather</Text>
               </View>
               <View style={styles.weatherItemContainer}>
                    
                    <WeatherItem title="Temperature        " value={current? current.temp : ""} unit=" F"/>
                    <WeatherItem title="Feels Like        " value={current? current.feels_like : ""} unit=" F"/>
                </View>
           </View>
           {/* <View style={styles.rightAlign}>
               <Text style={styles.latlong}>{lat}N {lon}E</Text>
           </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        justifyContent:'space-between',
        alignContent: 'center',
        padding: 10
    },
    subheading: {
        fontSize: 22,
        // fontWeight: '300'
    },
    // rightAlign: {
    //     textAlign:'right',
    //     marginTop: 20
    // },
    // latlong:{
    //     fontSize:16,
    //     fontWeight: '700'
    // },
    weatherItemContainer: {
        backgroundColor: "#b0acac",
        borderRadius: 10,
        padding: 10,
        // marginTop: 5,
        alignItems: 'center',
    }, 
    weatherItem: {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherItemTitle: {
        // color:'#eee',
        // fontSize: 14,
    }
})

export default DateTime