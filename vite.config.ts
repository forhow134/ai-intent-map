import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://vqpitlgugsazcvrjuoqs.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxcGl0bGd1Z3NhemN2cmp1b3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MzI3MzksImV4cCI6MjA5MDEwODczOX0.9eGt2AHrAbaiqVxTVcVmDefc5qt1QEs7XDe_MPg7MsM'),
  },
})
