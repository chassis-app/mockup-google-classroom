import { AssignmentDetailPage } from "@/components/classroom-mock";

export default async function AssignmentPage({
  params,
}: {
  params: Promise<{ classId: string; workId: string }>;
}) {
  const { classId, workId } = await params;
  return <AssignmentDetailPage classId={classId} workId={workId} />;
}
