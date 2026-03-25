import { StudentAssignmentPage } from "@/components/classroom-mock";

export default async function StudentWorkPage({
  params,
}: {
  params: Promise<{ classId: string; workId: string }>;
}) {
  const { classId, workId } = await params;
  return <StudentAssignmentPage classId={classId} workId={workId} />;
}
