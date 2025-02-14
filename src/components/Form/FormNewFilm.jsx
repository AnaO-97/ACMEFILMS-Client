import { useState, useEffect } from 'react'
import style from './formNewFilm.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { newFilm, editFilm } from '../../redux/actions'

function FormNewFilm(props){
    const { idFilm } = useParams()

    const {type, colorIcons} = props
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fullFilmData = useSelector((state)=>state.fullFilmData)

    const [filmBefore, setFilmBefore] = useState({})

    const [filmData,setFilmData] = useState({
        title: "",
        image: "",
        synopsis: "",
        genre: "",
        releaseDate: "",
        minimumAge: "",
        filmStudio: "",
        actors: "",
        score: "",
    })

    const handleChange = (event)=>{
        const property = event.target.name
        const value    = event.target.value

        setFilmData({
            ...filmData,
            [property]:value
        })
    }

    const goToHome = () => {
        navigate("/home")
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        filmData.score = Number(filmData.score)
        filmData.actors = filmData.actors.split(",").map(item => item.trim());
        filmData.minimumAge = Number(filmData.minimumAge)       

        if(type === "Editar Película"){
            dispatch(editFilm(filmData, idFilm))
        }
        else{
            dispatch(newFilm(filmData)) 
        }
        
        setFilmData({
            title: "",
            image: "",
            synopsis: "",
            genre: "",
            releaseDate: "",
            minimumAge: "",
            filmStudio: "",
            actors: "",
            score: ""
        })
        navigate("/home")     
    }

    useEffect(()=>{
        setFilmData({            
            title: filmBefore.title,
            image: filmBefore.image,
            synopsis: filmBefore.synopsis,
            genre: filmBefore.genre,
            releaseDate: filmBefore.releaseDate,
            minimumAge: filmBefore.minimumAge,
            filmStudio: filmBefore.filmStudio,
            actors: filmBefore.actors,
            score: filmBefore.score
        })
    },[filmBefore])

    useEffect(()=>{
        if(type === "Editar Película"){
            const [auxi] = fullFilmData.filter((film)=>film.id === idFilm)

            setFilmBefore(auxi);
        }
    },[idFilm])

    return(
        <div className={style.formNewFilmContainer}>
            <h2>{type.toUpperCase()}</h2>
            
            <form onSubmit={handleSubmit}>                
                <div className={style.containerGeneral}>
                    <div className={style.inputBox}>
                        <box-icon name='rename' type='solid' color={colorIcons} ></box-icon>
                        <input type         = "text" 
                                name         = "title"                     
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {filmData.title}  
                                required
                        />
                        <label htmlFor="title">Título:</label>
                    </div>

                    <div className={style.inputBox}>
                        <box-icon name='link-external' type='solid' color={colorIcons} ></box-icon>
                        <input type         = "text" 
                                name         = "image"                     
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {filmData.image}  
                                required
                        />
                        <label htmlFor="image">Imagen-url:</label>
                    </div>

                    <div className={style.inputBox}>
                        <box-icon name='align-left' type='solid' color={colorIcons} ></box-icon>
                        <input type         = "text" 
                                name         = "genre"                     
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {filmData.genre}  
                                required
                        />
                        <label htmlFor="genre">Género:</label>
                    </div>

                    <div className={style.inputBox}>
                        <box-icon name='calendar' type='solid' color={colorIcons} ></box-icon>
                        <input type         = "text" 
                                name         = "releaseDate"                     
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {filmData.releaseDate}  
                                required
                        />
                        <label htmlFor="releaseDate">Lanzamiento (A/M/D):</label>
                    </div>

                    <div className={style.inputBox}>
                        <box-icon name='user-minus' type='solid' color={colorIcons} ></box-icon>
                        <input type         = "text" 
                                name         = "minimumAge"                     
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {filmData.minimumAge}  
                                required
                        />
                        <label htmlFor="minimumAge">Edad mínima de audiencia:</label>
                    </div>

                    <div className={style.inputBox}>
                        <box-icon name='heart-circle' type='solid' color={colorIcons} ></box-icon>
                        <input type         = "text" 
                                name         = "score"                 
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {filmData.score}  
                                required
                        />
                        <label htmlFor="score">Puntución (1-5):</label>
                    </div>

                    <div className={style.inputBox}>
                        <box-icon name='camera-movie' type='solid' color={colorIcons} ></box-icon>
                        <input type         = "text" 
                                name         = "filmStudio"                     
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {filmData.filmStudio}  
                                required
                        />
                        <label htmlFor="filmStudio">Estudio de filmación:</label>
                    </div>                   

                    <div className={style.inputBox}>
                        <box-icon name='sitemap' type='solid' color={colorIcons} ></box-icon>
                        <input type         = "text" 
                                name         = "actors"                     
                                autoComplete = "off"
                                onChange     = {handleChange}
                                value        = {filmData.actors}  
                                required
                        />
                        <label htmlFor="actors">Actores (Separados por coma):</label>
                    </div>

                    <div>
                        <textarea
                                value= {filmData.synopsis}  
                                onChange={handleChange} 
                                placeholder="Escribe una pequeña sinopsis..."
                                name= "synopsis"
                                rows="6"
                                cols="40"
                                required
                                style = {{marginRight: '6.5vw'}}
                        />                        
                    </div>
                </div>
                
                <button className={style.buttonSend} type= 'submit'>
                    <box-icon name='send' color={colorIcons} style={{ fontSize: '0.5em' }} ></box-icon>
                </button>
                <button className={style.buttonHome} onClick={()=>goToHome()}>
                    <box-icon name='home' color={colorIcons} ></box-icon>
                </button>
            </form> 
        </div>
    );
}

export default FormNewFilm