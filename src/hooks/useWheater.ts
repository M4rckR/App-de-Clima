import axios from 'axios'
import {z} from 'zod'
// import {object, string, number, InferOutput, parse} from 'valibot'
import { SearchType, Wheater } from '../types'
import { useMemo, useState } from 'react'


// ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
})

export type Weather = z.infer<typeof Weather>


//Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_min: number(),
//     temp_max: number(),
//   }),
// })

// type Weather = InferOutput<typeof WeatherSchema>

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0,
  }
}

export const useWheater = () => {

  const [wheather, setWheather] = useState<Wheater>(initialState)
  const [loading, setLoading] = useState<boolean>(false)
  const [notFound, setNotFound] = useState<boolean>(false)


  const fetchWheater = async(search:SearchType) => {
    const appId = import.meta.env.VITE_API_KEY
    setLoading(true)   
    setWheather(initialState) 
    try {
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
        const {data} = await axios.get(geoUrl)


        //Comprobar si existe 
        if(!data[0]){
          setNotFound(true)
        }
        const lat = data[0].lat
        const lon = data[0].lon
      
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

        const {data: weatherResult} = await axios.get(weatherURL)

        // ZOD
        const result = Weather.safeParse(weatherResult)
        
        if(result.success){
          setWheather(result.data)
        }


        //Valibot
        // const result = parse(WeatherSchema, weatherResult)
        // if(result.name){
        //   console.log(result.name)
        // }

    }catch(error){
      console.log(error)
    } finally {
      setLoading(false)
    }

  } 

  const hasWeatherData = useMemo(() => wheather.name , [wheather])

  return {
    wheather,
    loading,
    fetchWheater,
    hasWeatherData,
    notFound
  }
}
