import { redirect } from 'next/navigation'

export default function HostLegacyRedirect({ params }: { params: { path?: string[] } }) {
  const rest = params.path?.join('/') ?? ''
  redirect(`/en/host/${rest}`)
}
