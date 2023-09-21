import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../cmps/common/Loader"
import { loadToys, removeToyOptimistic, setFilter } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { ToyList } from "../cmps/toy/ToyList"
import { Link } from "react-router-dom"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer"
import { ToyFilter } from "../cmps/toy/ToyFilter"
import { ToySort } from "../cmps/toy/ToySort"
import { toyService } from "../services/toy.service"

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.flag.isLoading)
    const [sortBy, setSortBy] = useState(toyService.getDefaultSort())

    useEffect(() => {
        loadToys(sortBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    // function onSetFilter(filterBy) {
    //     dispatch({ type: SET_FILTER_BY, filterBy })
    // }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    if (isLoading) return <Loader />

    return (
        <section className='toy-index'>
            <ToyFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <button><Link to="/toy/edit">Add Toy</Link></button>
            {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
        </section>
    )
}