import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && (
    !defined($search) || 
    lower(title) match $search || 
    category match $search || 
    author->name match $search
  )] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author->{
      _id,
      name,
      image,
      bio
    },
    views,
    description,
    category,
    image
  }
`);




export const STARTUP_BY_UD_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0]{
    _id,
    title,
    slug,
    _createdAt,
    author->{
      _id,
      name,
      username,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
`);


export const STARTUP_VIEWS_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  views}`)


// here problem was with _id do this carefully otherwise problem will occur 
export const Author_BY_GITHUB_ID_QUERY = defineQuery(`*[_type=="author" && _id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio}`)