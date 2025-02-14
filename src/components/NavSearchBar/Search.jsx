import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import style from './Search.module.css'
import { filterFilm } from '../../redux/actions'

function Search(props){ 
    const dispatch = useDispatch()   
    const navigate = useNavigate()

    const {colorIcons}= props

    const [filter, setFilter] = useState({
        by : "allFilms",
        same: ""
    })

    const isUser= useSelector(( state )=> state.user)

    const handleChangeFilter= (event)=>{
        const { name, value }= event.target;
        
        setFilter({
            ...filter,
            [name]: value
        })
    }

    const handleFilter= ()=>{ 
        if(filter.by === "id"){
            navigate(`/detail/${filter.same}`)
        }
        else{
            dispatch(filterFilm(filter))
        }
        
        setFilter({
            ...filter,
            same: ""
        })
    }

    // useEffect(()=>{
    //     console.log(filter);
    // },[filter])

    return(
        <div className={style.searchContainer}>
            <div className={style.searchSelectContainer}>
                <div className={style.inputBox}>
                    <input type= "radio" 
                            name ="by"
                            value= "allFilms"
                            checked={filter.by === "allFilms"}
                            onChange = {handleChangeFilter}
                    />
                    <label htmlFor="allFilms">Todas</label>
                </div>
                <div className={style.inputBox}>
                    <input type= "radio" 
                            name ="by"
                            value= "title"                            
                            onChange = {handleChangeFilter}
                    />
                    <label htmlFor="title">Título</label>
                </div>

                <div className={style.inputBox}>
                    <input type= "radio" 
                            name ="by"
                            value= "genre"                            
                            onChange = {handleChangeFilter}
                    />
                    <label htmlFor="genre">Género</label>
                </div>

                <div className={style.inputBox}>
                    <input type= "radio" 
                            name ="by"
                            value= "releaseDate"                            
                            onChange = {handleChangeFilter}
                    />
                    <label htmlFor="releaseDate">Lanzamiento (A/M/D)</label>
                </div>

                <div className={style.inputBox}>
                    <input type= "radio" 
                            name ="by"
                            value= "actors"                    
                            onChange = {handleChangeFilter}
                    />
                    <label htmlFor="actor">Actor</label>
                </div>

                <div className={style.inputBox}>
                    <input type= "radio" 
                            name ="by"
                            value= "score"                            
                            onChange = {handleChangeFilter}
                    />
                    <label htmlFor="score">Puntuación (1-5)</label>
                </div>

                {   (isUser.userType) === "admin"
                    ? <div className={style.inputBox}>
                        <input type= "radio" 
                                name ="by"
                                value= "id"  
                                onChange = {handleChangeFilter}
                        />
                        <label htmlFor="id">Id de película</label>
                      </div>
                    : <div className={style.inputBox}>
                        <input type= "radio" 
                                name ="by"
                                value= "favorites"  
                                onChange = {handleChangeFilter}
                        />
                        <label htmlFor="favorites">Mis favoritas</label>
                      </div>
                }
            </div>

            <div className={style.searchInputContainer}>
                <input type= "text"                                     
                        name    = "same"
                        value   = {filter.same}
                        onChange= {handleChangeFilter}
                        autoComplete = "off"
                        required
                />

                <button title='Buscar' onClick={()=>handleFilter()}>
                    <box-icon name='search-alt' color={colorIcons}></box-icon>
                </button>
            </div>
        </div>
    )
}

export default Search