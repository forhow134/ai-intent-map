export default function Footer() {
  return (
    <footer className="text-center py-6 px-4 border-t border-white/5 mt-8">
      <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
        <span>V1 — Survey-based estimates</span>
        <span>|</span>
        <a href="#" className="hover:text-slate-300 transition-colors">GitHub</a>
        <span>|</span>
        <span>Built with Verdent</span>
        <span>|</span>
        <span>No user data collected</span>
      </div>
    </footer>
  )
}
