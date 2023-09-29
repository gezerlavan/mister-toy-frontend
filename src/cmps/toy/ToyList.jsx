import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"


export function ToyList({ toys, onRemoveToy, onAddToCart }) {
    return (
        <section className="toy-list">
            <ul className="clean-list">
                {toys.map(toy =>
                    <li key={toy._id}>
                        <ToyPreview toy={toy} />
                        <div>
                            <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                            <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                            <button onClick={() => onAddToCart(toy)}>Add to Cart</button>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    )
}