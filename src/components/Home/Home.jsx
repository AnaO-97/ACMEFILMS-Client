import { useEffect } from 'react'
import Cards from '../Cards/Cards'
import { allFilms } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

function Home(){
    const dispatch = useDispatch()

    const filmsDB = useSelector(( state )=> state.copyFilmData)

    useEffect(()=>{
        dispatch(allFilms())        
    },[])

    return(
        <div>
            <Cards dataFilms={filmsDB}/>
        </div>
    )
}

export default Home