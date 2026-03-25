import { AssignmentComposerPage } from "@/components/classroom-mock";

export default async function NewAssignmentPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return <AssignmentComposerPage classId={classId} />;
}
