import React from 'react'
import SearchForm from '@/components/SearchForm'


export default async function page({searchParams}:{
  searchParams : Promise<{query?: string}>
}) {

  const query = (await searchParams).query
  return (
    <>
    <section className='pink_container'>
    <h1 className='heading'>
      Pitch Your Startup, <br/>
      connect with Entrepeneurs
    </h1>

    <p className='sub-heading !max-w-3xl'>
      Submit Ideas, Vote on Pitches , and get Noticed in Virtual
    </p>

    <SearchForm query={query}/>
    </section>
    </>
  )
}
