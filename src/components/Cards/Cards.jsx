import style from'./Cards.module.css'
import { useSelector } from 'react-redux'

function Cards(props){
    const {dataFilms} = props;
    {/* const [ inputs, setInputs ] = useState({}); */}

    const isUser = useSelector(( state )=> state.user)


    return(
        <div className={style.allCardsContainer}>
            {dataFilms.length && 
                dataFilms.map((dataFilm)=>(
                    <div className={style.cardContainer} key={dataFilm.id}>
                        <div className={style.buttonsContainer}>
                            {isUser.userType === "admin"
                                ?<h4>{dataFilm.id.split("-")[0]}...</h4>
                                :null
                            }
                            {isUser.userType === "admin"
                                ? <button title='Editar'>
                                    <box-icon name='edit' color='#d6c8c8'></box-icon>
                                  </button>
                                :<button title='Favorito'>
                                    <box-icon name='heart' color='#d6c8c8'></box-icon>
                                    <box-icon name='heart' type='solid' color='#ad1717' ></box-icon>
                                </button>                            
                            }
                        </div>
                        <div className={style.imgContainer}>
                            <img src={dataFilm.image} alt={dataFilms[0].title} />
                        </div>
                        <div className={style.infoContainer}>
                            <h4>{dataFilm.title}</h4>
                            <p>{dataFilm.synopsis}</p>
                        </div>
                    </div>
                ))
            }          
        </div>
    );
}

export default Cards