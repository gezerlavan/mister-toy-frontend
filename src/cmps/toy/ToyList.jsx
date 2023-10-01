import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"


export function ToyList({ toys, onRemoveToy, onAddToCart, user }) {
    return (
        <section className="toy-list">
            <ul className="clean-list">
                {toys.map(toy =>
                    <li key={toy._id}>
                        <ToyPreview toy={toy} />
                        <div>
                            <button disabled={!user}><Link to={user ? `/toy/edit/${toy._id}` : ''}>Edit</Link></button>
                            <button disabled={!user} onClick={() => onRemoveToy(toy._id)}>Remove</button>
                            <button disabled={!user} onClick={() => onAddToCart(toy)}>Add to Cart</button>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    )
}