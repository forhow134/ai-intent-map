import { useState, useMemo } from 'react'

const COUNTRIES = [
  { code: 'USA', name: 'United States' }, { code: 'CAN', name: 'Canada' },
  { code: 'GBR', name: 'United Kingdom' }, { code: 'DEU', name: 'Germany' },
  { code: 'FRA', name: 'France' }, { code: 'ITA', name: 'Italy' },
  { code: 'ESP', name: 'Spain' }, { code: 'JPN', name: 'Japan' },
  { code: 'KOR', name: 'South Korea' }, { code: 'CHN', name: 'China' },
  { code: 'IND', name: 'India' }, { code: 'BRA', name: 'Brazil' },
  { code: 'RUS', name: 'Russia' }, { code: 'AUS', name: 'Australia' },
  { code: 'NZL', name: 'New Zealand' }, { code: 'SGP', name: 'Singapore' },
  { code: 'ARE', name: 'UAE' }, { code: 'HKG', name: 'Hong Kong' },
  { code: 'NGA', name: 'Nigeria' }, { code: 'KEN', name: 'Kenya' },
  { code: 'EGY', name: 'Egypt' }, { code: 'NLD', name: 'Netherlands' },
  { code: 'CHE', name: 'Switzerland' }, { code: 'ISL', name: 'Iceland' },
  { code: 'IRL', name: 'Ireland' }, { code: 'PAK', name: 'Pakistan' },
  { code: 'VNM', name: 'Vietnam' }, { code: 'IDN', name: 'Indonesia' },
  { code: 'PHL', name: 'Philippines' }, { code: 'POL', name: 'Poland' },
  { code: 'UKR', name: 'Ukraine' }, { code: 'CZE', name: 'Czech Republic' },
  { code: 'ARG', name: 'Argentina' }, { code: 'CHL', name: 'Chile' },
  { code: 'COL', name: 'Colombia' }, { code: 'MEX', name: 'Mexico' },
  { code: 'ZAF', name: 'South Africa' }, { code: 'THA', name: 'Thailand' },
  { code: 'TWN', name: 'Taiwan' }, { code: 'ISR', name: 'Israel' },
  { code: 'SWE', name: 'Sweden' }, { code: 'FIN', name: 'Finland' },
  { code: 'DNK', name: 'Denmark' }, { code: 'NOR', name: 'Norway' },
]

interface Props {
  value: string
  onChange: (code: string) => void
}

export default function CountrySelect({ value, onChange }: Props) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    if (!search) return COUNTRIES
    const q = search.toLowerCase()
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
  }, [search])

  const selectedName = COUNTRIES.find(c => c.code === value)?.name

  return (
    <div className="relative px-2">
      <label className="block text-sm text-slate-400 mb-2">Your Country</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-left text-sm
          hover:border-white/20 transition-colors"
      >
        <span className={selectedName ? 'text-white' : 'text-slate-500'}>
          {selectedName || 'Select your country...'}
        </span>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-10 max-h-60 overflow-hidden">
          <div className="p-3 border-b border-white/5">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="w-full px-3 py-2 bg-white/5 rounded text-sm text-white placeholder-slate-500 outline-none"
            />
          </div>
          <div className="overflow-y-auto max-h-48">
            {filtered.map(c => (
              <button
                key={c.code}
                onClick={() => { onChange(c.code); setOpen(false); setSearch('') }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors ${
                  value === c.code ? 'text-cyan-400' : 'text-slate-300'
                }`}
              >
                {c.name}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-4 text-sm text-slate-500 text-center">No match</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
