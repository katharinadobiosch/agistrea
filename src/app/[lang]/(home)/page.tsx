import Intro from '@/components/Intro'
import InstagramFeed from '@/components/InstagramFeed'

export default function HomePage() {
  return (
    <div id="home" className="w-full pt-[100vh] md:pt-[100vh]">
      <Intro />
      <InstagramFeed username="@agistrea" limit={5} />
    </div>
  )
}
