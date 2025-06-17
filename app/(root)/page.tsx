import SearchForm from '@/components/SearchForm'
import StartupCard from '@/components/StartupCard'
import { client } from '@/sanity/lib/client';
import { STARTUP_QUERY } from '@/sanity/lib/queries';
import { StartupCardType } from '@/components/StartupCard';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';


export default async function page({searchParams}:{
  searchParams : Promise<{query?: string}>
}) {

  const query = (await searchParams).query

  // const posts = await client.fetch(STARTUP_QUERY);

  const {data: posts } = await sanityFetch({query: STARTUP_QUERY})
  return (
    <>
    <section className='pink_container'>
      <h1 className='heading'>
        Pitch Your Startup, <br/>
        connect with Entrepeneurs
      </h1>

    <p className='sub-heading !max-w-3xl'>
      Submit Ideas, Vote on Pitches and get Noticed in Virtual
    </p>
    
    <SearchForm query={query}/>
    </section>

    <div className="section_container">
      <p className='text-30-semibold'>
        {query ?  `Search results for the ${query}`: "All Startups"}
      </p>


      <ul className='mt-7 card_grid'>
        {posts?.length > 0 ?(
          posts.map((post:StartupCardType, index:number)=>(<StartupCard key={post?._id} post={post}/>))
        ):(
          <p className='no-results'>No startup found</p>
        )}
      </ul>
    </div>

        <SanityLive/>

    </>
  )
}
