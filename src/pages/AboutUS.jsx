import { GoogleMap } from "../cmps/toy/GoogleMap"

export function AboutUs() {
    return (
        <section className="about-us">
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, </p>
            <p>laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <div className="google-map flex justify-center">
                <GoogleMap />
            </div>
        </section>
    )
}