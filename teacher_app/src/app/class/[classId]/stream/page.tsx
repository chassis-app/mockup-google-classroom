import { ClassPage } from "@/components/classroom-mock";

export default async function StreamPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return <ClassPage classId={classId} activeTab="stream" />;
}
