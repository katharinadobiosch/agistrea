import Intro from '@/components/Intro'
import InstagramFeed from '@/components/InstagramFeed'

export default function HomePage() {
  return (
    <div id="home" className="w-full pt-0 md:pt-[93vh]">
      <Intro />
      <InstagramFeed username="@agistrea" limit={6} />
    </div>
  )
}
