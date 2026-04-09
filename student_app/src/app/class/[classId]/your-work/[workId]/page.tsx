import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default async function YourWorkDetailRedirectPage({
  params,
}: {
  params: Promise<{ classId: string; workId: string }>;
}) {
  const { classId, workId } = await params;
  redirect(`/${defaultLocale}/class/${classId}/your-work/${workId}`);
}
