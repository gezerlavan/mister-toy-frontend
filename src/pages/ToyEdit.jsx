import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions"

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()
    
    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(params.toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issued in toy edit:', err)
            navigate('/toy')
            showErrorMsg('Toy not found!')
        }
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            const toyToSave = await saveToy(toyToEdit)
            showSuccessMsg(`Toy saved (id: ${toyToSave._id})`)
            navigate('/toy')
        } catch (err) {
            console.error('Error while saving toy:', err)
            showErrorMsg('Cannot save toy')
        }
    }

    const { name, price } = toyToEdit

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="title">Name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="severity">Price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
            </form>
        </section>
    )
}