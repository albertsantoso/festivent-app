import CategorySection from "../../Components/CategorySection"
import FeedEventsSection from "../../Components/FeedEventsSection"
import Jumbotron from "../../Components/Jumbotron"

export default function Home() {
    return (
        <>
            <div className="Home">
                <header className="jumbotron">
                    <Jumbotron />
                </header>
                <main className="mb-28">
                    <section className="home-category mb-[60px]">
                        <CategorySection />
                    </section>
                    <section className="home-events">
                        <FeedEventsSection />
                    </section>
                </main>
            </div>
        </>
    )
}