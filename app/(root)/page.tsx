import SearchForm from '@/components/SearchForm'
import StartupCard from '@/components/StartupCard'

const variable = new Date();

export default async function page({searchParams}:{
  searchParams : Promise<{query?: string}>
}) {

  const query = (await searchParams).query

  const posts = [{
    _createdAt: variable,
    views: 50,
    author: {_id:1, name:"Abdul Momin Khan"},
    _id:1,
    description:"THis is a description",
    image:"https://imgs.search.brave.com/1TCJ5LKcZ2zFGkefsV-j4rkqe4qouJKr-wxLdyk0dLU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ2/ODAyNTAwNi9waG90/by9tYW4taW4tYS1i/dXNpbmVzcy1tZWV0/aW5nLXVzaW5nLWFu/LWludGVyYWN0aXZl/LXNjcmVlbi13aGls/ZS1naXZpbmctYS1w/cmVzZW50YXRpb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTU3ZjFpOUZaZjNh/ZHRfV1c1WFFNRlNl/UnVJREJFQlFnUDlP/ODhSQk9BalU9",
    category:"Robots",
    title: "we robots"
  }]

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



    </>
  )
}
