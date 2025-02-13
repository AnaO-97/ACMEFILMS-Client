import { useEffect, useState } from 'react'
import style from './Search.module.css'
import { useDispatch, useSelector } from 'react-redux'

function Search(props){       
    const {colorIcons}= props
    const [filter, setFilter] = useState({
        by : "",
        same: ""
    })

    const isUser = useSelector(( state )=> state.user)

    const handleChangeFilter = (event)=>{
        const { name, value } = event.target;
        
        setFilter({
            ...filter,
            [name]: value
        })
    }

    return(
        <div className={style.searchContainer}>
            <div className={style.searchSelectContainer}>
                <div className={style.inputBox}>
                    <input type= "radio" 
                            name ="by"
                            value= "allFilms"                            
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
                            value= "actor"                    
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
                        />
                        <label htmlFor="id">Id de película</label>
                    </div>
                    : null
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

                <button title='Buscar'>
                    <box-icon name='search-alt' color={colorIcons}></box-icon>
                </button>
            </div>
        </div>
    )
}

export default Search