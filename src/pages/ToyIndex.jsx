import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Loader } from "../cmps/common/Loader"
import { loadToys, removeToyOptimistic } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { ToyList } from "../cmps/toy/ToyList"
import { Link } from "react-router-dom"

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.flag.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [])

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

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    if (isLoading) return <Loader />

    return (
        <section className='toy-index'>
            <button><Link to="/toy/edit">Add Toy</Link></button>
            {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
        </section>
    )
}