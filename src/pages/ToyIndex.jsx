import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Loader } from "../cmps/common/Loader"
import { loadToys } from "../store/actions/toy.actions"
import { showErrorMsg } from "../services/event-bus.service"
import { ToyList } from "../cmps/toy/ToyList"


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

    if (isLoading) return <Loader />

    return (
        <section className='toy-index'>
            {!isLoading && <ToyList
                toys={toys}
            />
            }
        </section>
    )
}