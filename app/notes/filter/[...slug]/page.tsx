import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { FilterTag } from "@/types/note";
import { notFound } from "next/navigation";


type NotesPageProps = { params: Promise<{ slug?: string[] }> };

const validTags: FilterTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "All",
];

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
