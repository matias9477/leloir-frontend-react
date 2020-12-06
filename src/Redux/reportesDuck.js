import axios from 'axios'

let urlRanking = '/report/ranking-determinaciones'

let initialData = {
    fetching: false,
    ranking: [],
}


let GET_RANKING = 'GET_RANKING';
let GET_RANKING_SUCCESS = 'GET_RANKING_SUCCESS';
let GET_RANKING_ERROR = 'GET_RANKING_ERROR';

export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_RANKING:
            return {...state, fetching: true}
        case GET_RANKING_ERROR:
            return {...state, fetching: false, error: action.payload}
        case GET_RANKING_SUCCESS:
            return {...state, fetching: false, ranking: action.payload}
        default:
            return state
    }
}

export let getRankingAction = () => ( dispatch ) =>{
    dispatch({
        type: GET_RANKING
    })
    return axios.get(`${urlRanking}`)
    .then( res => {
        dispatch({
            type: GET_RANKING_SUCCESS,
            payload: Object.values(res.data).flat(),
        })
    }).catch(err=>{
        dispatch({
            type: GET_RANKING_ERROR,
            payload: err.message
        })
    })
}