import { ClassSettingsPage } from "@/components/classroom-mock";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return <ClassSettingsPage classId={classId} />;
}
