import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ path?: string[] }>
}

export default async function HostLegacyRedirect({ params }: Props) {
  const { path } = await params
  const rest = path?.join('/') ?? ''
  redirect(`/en/host/${rest}`)
}
