import { WorkDetailPage } from "@/components/student-classroom";

export default async function LocalizedClassworkDetailPage({
  params,
}: {
  params: Promise<{ classId: string; workId: string }>;
}) {
  const { classId, workId } = await params;
  return <WorkDetailPage classId={classId} workId={workId} source="classwork" />;
}
