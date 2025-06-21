// app/api/views/route.ts
import { NextResponse } from 'next/server';
import { getWriteClient } from '@/sanity/lib/WriteClient';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const { id, views } = await req.json();
    const writeClient = getWriteClient();

    const updatedDoc = await writeClient.patch(id).inc({views:1}).commit();
    
    revalidatePath("/")
    revalidatePath(`/startup/${id}`)
    
    return NextResponse.json({ success: true, views: updatedDoc.views });

  } catch (err) {
    console.error('Error incrementing views:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
