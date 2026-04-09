import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default async function ClassworkDetailRedirectPage({
  params,
}: {
  params: Promise<{ classId: string; workId: string }>;
}) {
  const { classId, workId } = await params;
  redirect(`/${defaultLocale}/class/${classId}/classwork/${workId}`);
}
