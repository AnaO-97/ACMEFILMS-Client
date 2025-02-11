import { useState } from 'react'
import style from './form.module.css'

function Form(props){
    const {type} = props
    const colorIcons = "#f1e3e3"

    const [userData,setUserData] = useState({
        fullName : "",
        email    : "",
        password : ""        
    })

    const handleChange = (event)=>{
        const property = event.target.name
        const value    = event.target.value

        setUserData({
            ...userData,
            [property]:value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    return(
        <div className={style.formContainer}>
            {/* const [ inputs, setInputs ] = useState({}); */}
            <h2>{type.toUpperCase()}</h2>
            
            <form onSubmit={handleSubmit}>                
                <div className={style.containerGeneral}>
                    <div className={style.inputBox}>
                        <box-icon name='user-circle' type='solid' color={colorIcons} ></box-icon>
                        <input type         = "text" 
                                name         = "fullName"                     
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {userData.fullName}  
                        />
                        <label htmlFor="fullName">Nombre:</label>
                    </div>

                    <div className={style.inputBox}>
                        <box-icon type='solid' name='envelope' color={colorIcons}></box-icon>
                        <input type         = "text" 
                                name         = "email"                     
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {userData.email}  
                        />
                        <label htmlFor="email">Correo:</label>
                    </div>

                    <div className={style.inputBox}>
                        <box-icon type='solid' name='lock' color={colorIcons}></box-icon>
                        <input type      = "password" 
                            name         = "password"
                            autoComplete = "off"
                            onChange     = {handleChange}
                            value        = {userData.password}
                        />
                        <label htmlFor="password">Contraseña:</label>
                    </div>                                        
                </div>
                
                <button type = 'submit'>Enviar</button>
            </form> 
        </div>
    );
}

export default Form