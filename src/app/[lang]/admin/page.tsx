import { redirect } from 'next/navigation';

export default async function AdminRedirectPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang || 'ar'}/atelier-portal`);
}
