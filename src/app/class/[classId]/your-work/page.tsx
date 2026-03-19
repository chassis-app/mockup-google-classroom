import { ClassPage } from "@/components/classroom-mock";

export default async function YourWorkPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return <ClassPage classId={classId} activeTab="your-work" />;
}
