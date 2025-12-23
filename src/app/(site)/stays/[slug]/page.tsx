import PublicPropertyPage from '@/components/Property/PublicPropertyPage'

type Props = { params: { slug: string } }

export default async function StayPage({ params }: Props) {
  return <PublicPropertyPage params={params} />
}
