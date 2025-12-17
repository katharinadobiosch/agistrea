import HostShell from '@/components/hosts/HostShell'

export default function HostsLayout({ children }: { children: React.ReactNode }) {
  return <HostShell>{children}</HostShell>
}
