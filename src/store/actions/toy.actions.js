import { toyService } from "../../services/toy.service";
import {
    ADD_TOY,
    ADD_TOY_TO_CART,
    REMOVE_TOY,
    REMOVE_TOY_FROM_CART,
    SET_FILTER_BY,
    SET_IS_LOADING,
    SET_TOYS,
    TOY_UNDO,
    UPDATE_TOY
} from "../reducers/toy.reducer";
import { store } from "../store";

export function getActionRemoveToy(toyId) {
    return {
        type: REMOVE_TOY,
        toyId
    }
}
export function getActionAddToy(toy) {
    return {
        type: ADD_TOY,
        toy
    }
}
export function getActionUpdateToy(toy) {
    return {
        type: UPDATE_TOY,
        toy
    }
}

export async function loadToys(sortBy, pageIdx) {
    const { filterBy } = store.getState().toyModule
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toys = await toyService.query(filterBy, sortBy, pageIdx)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('toy action -> Cannot load toys')
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch(getActionRemoveToy(toyId))
    } catch (err) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function removeToyOptimistic(toyId) {
    store.dispatch(getActionRemoveToy(toyId))
    try {
        await toyService.remove(toyId)
    } catch (err) {
        store.dispatch({ type: TOY_UNDO })
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = await toyService.save(toy)
        store.dispatch(getActionAddToy(toyToSave))
        return toyToSave
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function addToCart(toy) {
    store.dispatch({ type: ADD_TOY_TO_CART, toy })
}

export function removeFromCart(toyId) {
    store.dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
}