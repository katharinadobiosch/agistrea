export default function EnvTestPage() {
  return (
    <pre className="p-4">
      {JSON.stringify(
        {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
        null,
        2
      )}
    </pre>
  );
}
