import { toyService } from "../../services/toy.service";
import { SET_IS_LOADING, SET_TOYS } from "../reducers/toy.reducer";
import { store } from "../store";


export function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query()
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys')
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}