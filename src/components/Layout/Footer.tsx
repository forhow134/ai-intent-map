export default function Footer() {
  return (
    <footer className="text-center py-6 px-8 border-t border-white/5 mt-8">
      <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
        <span>V2 with real data and community reports</span>
        <span>|</span>
        <a href="https://ourworldindata.org/artificial-intelligence" target="_blank" rel="noopener" className="hover:text-slate-300 transition-colors">OWID</a>
        <span>|</span>
        <a href="https://oecd.ai/en/data" target="_blank" rel="noopener" className="hover:text-slate-300 transition-colors">OECD.AI</a>
        <span>|</span>
        <a href="https://hai.stanford.edu/ai-index" target="_blank" rel="noopener" className="hover:text-slate-300 transition-colors">Stanford AI Index</a>
        <span>|</span>
        <span>Built with Verdent</span>
      </div>
    </footer>
  )
}
