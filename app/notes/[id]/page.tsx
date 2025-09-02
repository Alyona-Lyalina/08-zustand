import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface NoteDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) {
    notFound();
  }

  const title = note.title;
  const description =
    (note.content && note.content.slice(0, 120)) || "Note details in NoteHub.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-black-xi.vercel.app/notes/${note.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub preview image",
        },
      ],
    },
  };
} 


export default async function NoteDetailsPage({ params }: NoteDetailProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
