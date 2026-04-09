import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default async function StreamRedirectPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  redirect(`/${defaultLocale}/class/${classId}/stream`);
}
