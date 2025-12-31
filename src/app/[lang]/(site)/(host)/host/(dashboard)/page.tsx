import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ lang: 'en' | 'gr' }>
}

export default async function HostIndexPage({ params }: Props) {
  const { lang } = await params
  redirect(`/${lang}/host/dashboard`)
}
