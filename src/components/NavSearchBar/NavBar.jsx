import Search from './Search'
import style from './NavBar.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar(props){
    const navigate = useNavigate()
        
    const {colorIcons, pathname}= props
    const margin= '2.6vh'
    const sizeIcon= '2em'

    const isUser = useSelector(( state )=> state.user)

    const goToHome  = () => navigate("/newFilm")
    const goToLogin = () => navigate("/")

    return(
        <div>
            <div className={style.navBarContainer}>
                {pathname!=="/newFilm" 
                    ? isUser.userType === "admin"
                        ? <button className={`${style.buttonBox} ${style.btnNewFilm}` } onClick={()=>goToHome()}>
                            <h4>Nueva Película</h4>
                            <box-icon name='add-to-queue' style={{ fontSize: sizeIcon, marginBottom: margin }} color={colorIcons}></box-icon>
                          </button>
                        : null
                    :null    
                }

                <button className={`${style.buttonBox} ${style.btnLogin}` }
                        onClick={()=>goToLogin()}
                >
                    <box-icon name='log-out' style={{ fontSize: sizeIcon, marginBottom: margin }} color={colorIcons}></box-icon>
                    <h4>Cerrar sesión</h4>
                </button>   
            </div>

            {pathname!=="/newFilm" 
                ?<div className={style.searchContainer}>
                    <Search colorIcons= {colorIcons}/>     
                </div>
                :null
            }
        </div>
    )
}

export default NavBar