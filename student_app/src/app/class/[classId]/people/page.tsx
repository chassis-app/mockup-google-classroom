import { ClassPage } from "@/components/student-classroom";

export default async function PeoplePage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return <ClassPage classId={classId} activeTab="people" />;
}
