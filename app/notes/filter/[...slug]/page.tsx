import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { FilterTag } from "@/types/note";
import { notFound } from "next/navigation";
import type { Metadata } from "next";


type NotesPageProps = { params: Promise<{ slug?: string[] }> };

const validTags: FilterTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "All",
];

export async function generateMetadata(
  { params }: NotesPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const urlTag = slug?.[0] ?? "All";

  if (!validTags.includes(urlTag as FilterTag)) {
    notFound();
  }

  const title = urlTag === "All" ? "All Notes" : `Notes filtered by: ${urlTag}`;
  const description =
    urlTag === "All"
      ? "Browse all your notes in NoteHub and keep them organized in one place."
      : `Viewing notes filtered by the tag "${urlTag}" in NoteHub. Easily manage and organize your ${urlTag} notes.`;
  const url = `https://08-zustand-black-xi.vercel.app/notes/filter/${urlTag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
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


export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  let tag: FilterTag | undefined;

  if (slug?.length) {
    const urlTag = slug[0];

    if (validTags.includes(urlTag as FilterTag)) tag = urlTag as FilterTag;
    else notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],

    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
        ...(tag && tag !== "All" ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
