import { useEffect, useState } from "react"
import { Loader } from "../cmps/common/Loader"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const [msg, setMsg] = useState(toyService.getEmptyMsg())
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await toyService.addToyMsg(toy._id, msg.txt)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg(toyService.getEmptyMsg())
        showSuccessMsg('Message saved!')
    }

    if (!toy) return <Loader />

    const { txt } = msg

    return (
        <section className="toy-details">
            <h1>Toy name: {toy.name}</h1>
            <h1>Toy price: ${toy.price}</h1>
            <h1>Labels: {toy.labels.join(' ,')}</h1>
            <h1 className={toy.inStock ? 'green' : 'red'}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </h1>
            <ul>
                {toy.msgs &&
                    toy.msgs.map((msg) => (
                        <li key={msg.id}>
                            By: {msg.by.fullname} - {msg.txt}
                            {/* <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                X
              </button> */}
                        </li>
                    ))}
            </ul>
            <form className="login-form" onSubmit={onSaveMsg}>
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    placeholder="Type message..."
                    onChange={handleMsgChange}
                    required
                    autoFocus
                />
                <button>Send</button>
            </form>
            <button><Link to="/toy">Back</Link></button>
        </section>
    )
}