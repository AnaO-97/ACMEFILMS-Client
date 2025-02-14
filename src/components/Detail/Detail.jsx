import style from './Detail.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFilm, addFilmFavorites } from '../../redux/actions'

function Detail(){
    const dispatch = useDispatch()

    const { idFilm } = useParams()
    const [ startIcon, setStartIcon ] = useState([])
    // let startIcon = []

    const [ film, setFilm ] = useState({})
    const navigate = useNavigate()

    const isUser = useSelector(( state )=> state.user)
    const allFilms = useSelector(( state )=> state.fullFilmData)
    const allFavorites = useSelector(( state )=> state.favoritesFilms)
    
    const createStartScore= (max) =>{
        for (let index = 0; index < max; index++) {                 
            setStartIcon(prevIcons => [
                ...prevIcons, 
                <box-icon key={index} type='solid' name='star' color='#d6c8c8'></box-icon>
            ])
        }
    }

    const goToHome= ()=>{
        navigate("/home")
    }

    const goToEdit= ()=>{
        navigate(`/editFilm/${idFilm}`)
    }

    const deleteFilmById= ()=>{
        dispatch(deleteFilm(idFilm))
        navigate("/home")
    }

    const addFavorites = (idFilm)=>{
        dispatch(addFilmFavorites(idFilm))
    }

    useEffect(()=>{
        const [ auxi ] = allFilms.filter((film)=>film.id === idFilm)    
        setFilm(auxi)
    },[idFilm])

    useEffect(()=>{
        createStartScore(film.score)
    },[film])

    return(
        <div className={style.detailContainer}>
            <div className={style.headInformation}>
                {isUser.userType === "admin"
                    ?<h4>{idFilm}</h4>
                    :null
                }
                <div className={style.title}>
                    {film.title && <h2>{film.title}</h2>}
                    {film.releaseDate && <h3>{film.releaseDate}</h3>}
                </div>
            </div> 

            <div className={style.imgSynopsis}>
                <div className={style.imgContainer}>
                    {film.image &&<img src={film.image} alt={film.title} />}
                    <div className={style.score}>
                        {film.score && startIcon}
                    </div>                    
                </div>
                <div className={style.synopsisAboutFilmBox}>
                    <h2>Sinopsis</h2>                       
                    {film.synopsis &&<p>{film.synopsis}</p>}
                    <div className={style.actors}>
                        {film.actors &&
                            film.actors.map((name, index)=><h3 key={index}>** {name} </h3>)
                        }
                    </div>
                    <div className={style.studio}>
                        {film.filmStudio &&<h3>{film.filmStudio}</h3>}
                    </div>
                    <div className={style.moreInformation}>
                        {film.minimumAge &&<h3>Edad mínima permitida: {film.minimumAge}años</h3>}
                        {film.genre &&<h3>Género:{film.genre}</h3>}
                    </div>
                </div>
                <div className={style.buttonsBox}>
                    <button title='Inicio' onClick={()=>goToHome()}>
                        <box-icon name='home' color='#d6c8c8' ></box-icon>
                    </button>
                    {isUser.userType === "admin"
                        ?<div>
                            <button title='Editar' onClick={()=>goToEdit()}>
                                <box-icon name='edit' color='#d6c8c8'></box-icon>
                            </button>
                            <button title='Eliminar' onClick={()=>deleteFilmById()}>
                                <box-icon name='trash' color='#d6c8c8'></box-icon>
                            </button>
                         </div>
                        :<div>
                            <button onClick={()=>addFavorites(idFilm)}>
                                {
                                    allFavorites.includes(idFilm) &&  <box-icon name='heart' type='solid' color='#ad1717' ></box-icon>
                                }
                                {                                        
                                    allFavorites.includes(idFilm) === false && <box-icon name='heart' color='#d6c8c8'></box-icon>
                                }  
                            </button>
                        </div>
                    }
                </div>
            </div>     
        </div>
    );
}

export default Detail