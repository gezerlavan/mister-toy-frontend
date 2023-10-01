import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Loader } from "../cmps/common/Loader"
import { addToCart, loadToys, removeToyOptimistic, setFilter } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { ToyList } from "../cmps/toy/ToyList"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/toy/ToyFilter"
import { toyService } from "../services/toy.service"

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.flag.isLoading)
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const [sortBy, setSortBy] = useState(toyService.getDefaultSort())
    const [pageIdx, setPageIdx] = useState(0)

    useEffect(() => {
        loadToys(sortBy, pageIdx)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy, pageIdx])

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Error while removing toy:', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    function onAddToCart(toy) {
        addToCart(toy)
        showSuccessMsg(`${toy.name} Added to Cart`)
    }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    return (
        <section className="toy-index">
            <ToyFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <div className="add-toy">
                <button disabled={!user}><Link to={user ? '/toy/edit' : ''}>Add Toy</Link></button>
            </div>
            {isLoading && <Loader />}
            {!isLoading && <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onAddToCart={onAddToCart}
                user={user}
            />}
            <div className="pagination">
                <button onClick={() => setPageIdx(pageIdx - 1)} disabled={pageIdx === 0}>Previous</button>
                {pageIdx + 1}
                <button onClick={() => setPageIdx(pageIdx + 1)} disabled={toys.length < 5}>Next</button>
            </div>
        </section>
    )
}