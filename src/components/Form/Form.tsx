import { ChangeEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from './Form.module.css'
import { SearchType } from "../../types"
import { Alert } from "../Alert/Alert"


type FormProps = {
    fetchWheater: (search:SearchType) => Promise<void>
}

export const Form = ({fetchWheater}:FormProps) => {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState<string>('')

    // Manejar cambios en los campos del formulario
    const handleChangue = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(search.city.trim() === '' || search.country.trim() === ''){
            console.log('Todos los campos son obligatorios')
            setAlert('Todos los campos son obligatorios')
            return
        }

        fetchWheater(search)

        setSearch({
            city: '',
            country: ''
        })
    }

  return (
    <form 
        className={styles.form}
        onSubmit={handleSubmit}
    >
        {alert && <Alert>{alert}</Alert>}
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input 
                id="city" 
                type="text" 
                name="city" 
                placeholder="Ciudad" 
                value={search.city}
                onChange={handleChangue}
            />
        </div>
        <div className={styles.field}>
            <label htmlFor="country">País:</label>
            <select 
                name="country" 
                id="country"
                value={search.country}   
                onChange={handleChangue} 
            >
                <option value="">--Seleccione un País--</option>
                {countries.map((country) => (
                    <option
                        key={country.code}
                        value={country.code}
                    >{country.name}
                    </option>
                ))}
            </select>
        </div>
        <input 
            className={styles.submit} 
            type="submit" 
            value='Consultar Clima' 
            />
    </form>
  )
}
