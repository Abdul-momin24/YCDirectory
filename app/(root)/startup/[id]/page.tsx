// app/startup/[id]/page.tsx

import { client } from '@/sanity/lib/client';
import { STARTUP_BY_UD_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react';

export const experimental_ppr = true;

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const post = await client.fetch(STARTUP_BY_UD_QUERY, { id });

  if (!post) return notFound();

  return (
    <>
      <h1 className="text-3xl">{id}</h1>
    </>
  );
}
