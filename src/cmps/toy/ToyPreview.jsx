import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <Link to={`/toy/${toy._id}`}>
            <article className='toy-preview'>
                <h1>Toy name: {toy.name}</h1>
                <h1>Toy price: ${toy.price}</h1>
                <h1 className={toy.inStock ? 'green' : 'red'}>
                    {toy.inStock ? 'In stock' : 'Not in stock'}
                </h1>
            </article>
        </Link >
    )
}