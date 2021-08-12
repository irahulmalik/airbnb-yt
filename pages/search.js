import Header from "../components/header";
import Footer from "../components/footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function search({searchResults}) {
    const router = useRouter();
    const { location, startDate, endDate, noOfGuests } = router.query;
    const formatedStartDate = format(new Date(startDate),"dd MMMM yy");
    const formatedEndDate = format(new Date(endDate),"dd MMMM yy");
    const range = `${formatedStartDate} - ${formatedEndDate}`;
    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ stays - {range} for {noOfGuests} no. of Guests</p>
                    <p className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</p>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <h1 className="button">Cancellation Flexibility</h1>
                        <p className="button">Type of Palace</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More Filters</p>
                    </div>
                
                    <div className="flex flex-col">

                    {searchResults.map(({img,location,title,description, star, price, total}) => (
                        <InfoCard 
                            key={img}
                            img={img}
                            location={location}
                            title={title}
                            description={description}
                            star = {star}
                            price = {price}
                            total= {total}
                        />
                    ))}
                    </div>
                </section>

                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <Map searchResults={searchResults} />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default search

export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz").then(
        res => res.json()
    );

    return {
        props: {
            searchResults,
        }
    };
}
