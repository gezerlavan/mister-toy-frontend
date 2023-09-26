import heroImgUrl from '../../public/img/HERO_IMG.jpg'

export function HomePage() {
    return (
        <section className="home-page">
            <img src={heroImgUrl} alt="" />
        </section >
    )
}