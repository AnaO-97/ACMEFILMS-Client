import style from'./Cards.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { addFilmFavorites } from '../../redux/actions'
import { useEffect } from 'react'

function Cards(props){    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {dataFilms} = props;
    
    const isUser = useSelector(( state )=> state.user)
    const allFavorites = useSelector(( state )=> state.favoritesFilms)

    const addFavorites = (idFilm)=>{
        dispatch(addFilmFavorites(idFilm))
    }

    const goToEdit= (idFilm)=>{
        navigate(`/editFilm/${idFilm}`)
    }

    return(
        <div className={style.allCardsContainer}>
            {dataFilms.length 
                ? dataFilms.map((dataFilm)=>(                   
                    <div className={style.cardContainer} key={dataFilm.id}>
                        <div className={style.buttonsContainer}>
                            {isUser.userType === "admin"
                                ?<h4>{dataFilm.id.split("-")[0]}...</h4>
                                :null
                            }
                            {isUser.userType === "admin"
                                ? <button title='Editar' onClick={()=>goToEdit(dataFilm.id)}>
                                    <box-icon name='edit' color='#d6c8c8'></box-icon>
                                  </button>
                                :<button title='Favorito' onClick={()=>addFavorites(dataFilm.id)}>
                                    {
                                        allFavorites.includes(dataFilm.id) &&  <box-icon name='heart' type='solid' color='#ad1717' ></box-icon>
                                    }
                                    {                                        
                                        allFavorites.includes(dataFilm.id) === false && <box-icon name='heart' color='#d6c8c8'></box-icon>
                                    }                                                                    
                                </button>                            
                            }
                        </div>
                        <NavLink to = {`/detail/${dataFilm.id}`}>
                            <div className={style.imgContainer}>
                                <img src={dataFilm.image} alt={dataFilms[0].title} />
                            </div>
                            <div className={style.infoContainer}>
                                <h4>{dataFilm.title}</h4>
                                <p>{dataFilm.synopsis}</p>
                            </div>
                        </NavLink> 
                    </div>
                ))
                : <h1>Aun no hay películas</h1>
            }          
        </div>
    );
}

export default Cards