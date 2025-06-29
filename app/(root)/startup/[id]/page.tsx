// app/startup/[id]/page.tsx

import { formatData } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_UD_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupCardType } from '@/components/StartupCard';

const md = markdownit();

export const experimental_ppr = true;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;


  // This helps in parallel  fetchig this will return both the results in the array
  const [post, editorPlaylists] = await Promise.all([
    client.fetch(STARTUP_BY_UD_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug:'editor-best'})

  ])
  const editorPosts = editorPlaylists?.select ?? [];

  if (!post) return notFound();

  const parseContent = md.render(post?.pitch || '');

  const views = await client.withConfig({ useCdn: false })
  .fetch(`*[_type == "startup" && _id == $id][0].views`, { id });

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatData(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>

        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post?.author?._id}`}
              className="flex gap-2 items-center justify-between mb-3"
            >
              <Image
                src={post?.author?.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  {post?.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post?.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>

          {parseContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parseContent }}
            />
          ) : (
            <p className="no-result"> No details Provided</p>
          )}
        </div>

        <hr className="divider" />

        {editorPosts?.length >0 &&(
          <div className="max-w-4xl mx-auto">
            <p className='text-30-semibold'> Editor Picks</p>

            <ul className='mt-7 card_grid-sm'>
              {editorPosts.map((post: StartupCardType, index: number)=>{
                return <StartupCard key={index} post={post}/>
              })}
            </ul>
          </div>
        )}
        



        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
          <View id = {id} views={views}/>
        </Suspense>
      </section>
    </>
  );
}
