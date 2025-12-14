import { supabase } from '@/lib/supabase/client'

export default async function TestSupabasePage() {
  const { data, error } = await supabase.from('properties').select('*')

  console.log('DATA:', data)
  console.log('ERROR:', error)

  return (
    <div>
      <h1>Supabase Test</h1>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
