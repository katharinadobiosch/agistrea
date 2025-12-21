import HostShell from '@/components/Hosts/HostShell'

export default function HostsLayout({ children }: { children: React.ReactNode }) {
  return <HostShell>{children}</HostShell>
}
