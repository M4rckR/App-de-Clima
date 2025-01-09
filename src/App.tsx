import styles from './App.module.css'
import { Alert } from './components/Alert/Alert'
import { Form } from './components/Form/Form'
import { Spiner } from './components/spinners/Spiner'
import { WeatherDetail } from './components/WeatherDetail/WeatherDetail'
import { useWheater } from './hooks/useWheater'



export const App = () => {

  const {fetchWheater, wheather, hasWeatherData, loading,notFound} = useWheater()

  // console.log(import.meta.env)

  return (
    <>
      <h1 className={styles.title}>Aplicacion de clima</h1>
      <div className={styles.container}>
        <Form 
          fetchWheater={fetchWheater}
        />
        {loading && <Spiner />}
        {hasWeatherData &&
          <WeatherDetail
            weather={wheather}
          />
        }
        {notFound && <Alert>Ciudad no encontrada</Alert>}

      </div>
    </>
  )
}
