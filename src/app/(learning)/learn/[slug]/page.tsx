import { notFound } from "next/navigation";
import { getChapterById, chapters } from "@/lib/learning/chapters";
import { ChapterLesson } from "@/components/learning/ChapterLesson";

export function generateStaticParams() {
  return chapters.map((ch) => ({ slug: ch.id }));
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapterById(slug);

  if (!chapter) {
    notFound();
  }

  return <ChapterLesson chapter={chapter} />;
}
