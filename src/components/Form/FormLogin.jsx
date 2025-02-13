import { useState, useEffect } from 'react'
import style from './form.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions'

function Form(props){
    const {type, colorIcons} = props
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isUser = useSelector(( state )=> state.user)

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

    const goToHome = () => navigate("/home")

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(loginUser(userData))

        if( isUser.fullName !== ""){
            setUserData({
                fullName : "",
                email    : "",
                password : ""
            })
            navigate("/home")
        }
    }

    useEffect(()=>{
        if( isUser.fullName ){
            setUserData({
                fullName : "",
                email    : "",
                password: "",            
            })
            navigate("/home");
        }
    }, [ isUser ])

    return(
        <div className={style.formContainer}>
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
                                required
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
                                required
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
                            required
                        />
                        <label htmlFor="password">Contraseña:</label>
                    </div>                                        
                </div>
                
                <button type= 'submit'>Enviar</button>
                <button onClick={()=>goToHome()}>Inicio</button>
            </form> 
        </div>
    );
}

export default Form