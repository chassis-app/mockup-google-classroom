import { SubmissionReviewPage } from "@/components/classroom-mock";

export default async function WorkReviewPage({
  params,
}: {
  params: Promise<{ classId: string; workId: string }>;
}) {
  const { classId, workId } = await params;
  return <SubmissionReviewPage classId={classId} workId={workId} />;
}
