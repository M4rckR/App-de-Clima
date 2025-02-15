import { Weather } from "../../hooks/useWheater"
import { formatTemperature } from "../../utils"
import styles from './WeatherDetail.module.css'	

type WheaterDetailProps = {
    weather: Weather
}


export const WeatherDetail = ({weather}:WheaterDetailProps) => {
  return (
    <div className={styles.container}>
        <h2>Clima de: {weather.name}</h2>
        <p className={styles.current}> {formatTemperature(weather.main.temp).toFixed(0)}&deg;C</p>


        <div className={styles.temperatures}>
            <p>Min: 
                <span>{formatTemperature(weather.main.temp_min).toFixed(0)}&deg;C</span>
            </p>
            <p>Max: 
                <span>{formatTemperature(weather.main.temp_max).toFixed(0)}&deg;C</span>
            </p>
        </div>
    </div>
  )
}
