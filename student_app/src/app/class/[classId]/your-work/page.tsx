import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default async function YourWorkRedirectPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  redirect(`/${defaultLocale}/class/${classId}/your-work`);
}
