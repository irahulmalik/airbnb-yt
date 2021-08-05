import Head from 'next/head'
import Banner from '../components/Banner';
import Footer from '../components/footer';
import Header from '../components/header';
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import Smallcards from '../components/smallcards';
export default function Home( {exploreData, CardsData}) {
  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
    {/* Header */}
    <Header />
    {/* Banner */}
    <Banner />
     {/* <h1>Let's Build AirBnb</h1> */}
     <main className="max-w-7xl mx-auto px-8 sm:px-16">
       <section className="pt-6">
        <h2 className="text-4xl font-semibold pb-5">Close Nearby</h2>
        {/* pull some data  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4">

          {exploreData?.map(({img, location, distance}) => (
            <Smallcards 
            key={img}
            img={img} 
            distance={distance} 
            location={location}
            />
          ))}
        </div>
       </section>

       <section>
         <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
         <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">

          {CardsData?.map(({img, title}) => (
              <MediumCard key={img}
              img={img}
              title={title} />

          ))}
         </div>
        
       </section>

       <section>
         <LargeCard img="https://links.papareact.com/4cj"
         title="The Greatest Outdoors"
         description="Wishlist curated by Airbnb"
         buttonText="Get Inspired" />
       </section>
     </main>
     <footer>
       <Footer />
     </footer>
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
    );
  
  const CardsData = await fetch("https://links.papareact.com/zp1").then(
    (res) => res.json()
    );
  return { 
    props: {
    exploreData,
    CardsData,
    }
  }
}
