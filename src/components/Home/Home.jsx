import { useEffect, useState } from 'react'
import Cards from '../Cards/Cards'
import { allFilms } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

function Home(){    
    const [ filmsDB, setFilmsDB ] = useState([])
    const dispatch = useDispatch()

    const filmsDB_aux = useSelector(( state )=> state.copyFilmData)

    useEffect(()=>{
        dispatch(allFilms())
    },[])

    useEffect(()=>{
        setFilmsDB(filmsDB_aux)
    },[filmsDB_aux])

    return(
        <div>
            <Cards dataFilms={filmsDB} />
        </div>
    )
}

export default Home