import type { IntentGroup, RegionIntentData } from '../types'

interface RegionProfile {
  weights: Record<IntentGroup, number>
  volume: number
}

const profiles: Record<string, RegionProfile> = {
  tech_hub: { weights: { coding: 35, creative: 15, research: 20, business: 15, learning: 15 }, volume: 90 },
  balanced: { weights: { coding: 20, creative: 20, research: 20, business: 20, learning: 20 }, volume: 50 },
  creative_leaning: { weights: { coding: 15, creative: 35, research: 15, business: 20, learning: 15 }, volume: 60 },
  research_heavy: { weights: { coding: 20, creative: 10, research: 35, business: 15, learning: 20 }, volume: 70 },
  business_focused: { weights: { coding: 15, creative: 15, research: 15, business: 35, learning: 20 }, volume: 55 },
  learning_dominant: { weights: { coding: 15, creative: 10, research: 15, business: 10, learning: 50 }, volume: 40 },
  dev_emerging: { weights: { coding: 30, creative: 10, research: 15, business: 15, learning: 30 }, volume: 65 },
}

const countryToProfile: Record<string, string> = {
  '840': 'tech_hub', '124': 'tech_hub', '826': 'tech_hub',
  '276': 'research_heavy', '392': 'research_heavy', '410': 'research_heavy', '756': 'research_heavy',
  '250': 'creative_leaning', '380': 'creative_leaning', '724': 'creative_leaning', '528': 'creative_leaning',
  '156': 'dev_emerging', '356': 'dev_emerging', '076': 'dev_emerging', '643': 'dev_emerging',
  '036': 'tech_hub', '554': 'tech_hub', '352': 'tech_hub', '372': 'tech_hub',
  '702': 'business_focused', '784': 'business_focused', '344': 'business_focused',
  '566': 'learning_dominant', '404': 'learning_dominant', '818': 'learning_dominant',
  '586': 'dev_emerging', '704': 'dev_emerging', '360': 'dev_emerging', '608': 'dev_emerging',
  '616': 'dev_emerging', '804': 'dev_emerging', '203': 'dev_emerging',
  '032': 'balanced', '152': 'balanced', '170': 'balanced', '484': 'balanced',
  '710': 'balanced', '764': 'balanced', '158': 'tech_hub',
  '376': 'tech_hub', '752': 'tech_hub', '246': 'tech_hub', '208': 'tech_hub', '578': 'tech_hub',
}

const countryNames: Record<string, string> = {
  '840': 'United States', '124': 'Canada', '826': 'United Kingdom',
  '276': 'Germany', '250': 'France', '380': 'Italy', '724': 'Spain',
  '392': 'Japan', '410': 'South Korea', '156': 'China', '356': 'India',
  '076': 'Brazil', '643': 'Russia', '036': 'Australia', '554': 'New Zealand',
  '702': 'Singapore', '784': 'UAE', '344': 'Hong Kong',
  '566': 'Nigeria', '404': 'Kenya', '818': 'Egypt',
  '528': 'Netherlands', '756': 'Switzerland', '352': 'Iceland', '372': 'Ireland',
  '586': 'Pakistan', '704': 'Vietnam', '360': 'Indonesia', '608': 'Philippines',
  '616': 'Poland', '804': 'Ukraine', '203': 'Czech Republic',
  '032': 'Argentina', '152': 'Chile', '170': 'Colombia', '484': 'Mexico',
  '710': 'South Africa', '764': 'Thailand', '158': 'Taiwan',
  '376': 'Israel', '752': 'Sweden', '246': 'Finland', '208': 'Denmark', '578': 'Norway',
}

function isoFromNumeric(id: string): string {
  const map: Record<string, string> = {
    '840': 'USA', '124': 'CAN', '826': 'GBR', '276': 'DEU', '250': 'FRA',
    '380': 'ITA', '724': 'ESP', '392': 'JPN', '410': 'KOR', '156': 'CHN',
    '356': 'IND', '076': 'BRA', '643': 'RUS', '036': 'AUS', '554': 'NZL',
    '702': 'SGP', '784': 'ARE', '344': 'HKG', '566': 'NGA', '404': 'KEN',
    '818': 'EGY', '528': 'NLD', '756': 'CHE', '352': 'ISL', '372': 'IRL',
    '586': 'PAK', '704': 'VNM', '360': 'IDN', '608': 'PHL',
    '616': 'POL', '804': 'UKR', '203': 'CZE', '032': 'ARG', '152': 'CHL',
    '170': 'COL', '484': 'MEX', '710': 'ZAF', '764': 'THA', '158': 'TWN',
    '376': 'ISR', '752': 'SWE', '246': 'FIN', '208': 'DNK', '578': 'NOR',
  }
  return map[id] || id
}

function addNoise(weights: Record<IntentGroup, number>, seed: number): Record<IntentGroup, number> {
  const keys = Object.keys(weights) as IntentGroup[]
  const noised = { ...weights }
  let rng = seed
  for (const k of keys) {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff
    const noise = ((rng % 11) - 5)
    noised[k] = Math.max(5, noised[k] + noise)
  }
  const total = Object.values(noised).reduce((a, b) => a + b, 0)
  for (const k of keys) {
    noised[k] = Math.round((noised[k] / total) * 100)
  }
  return noised
}

export function generateSyntheticData(): RegionIntentData[] {
  const data: RegionIntentData[] = []

  for (const [numericId, profileKey] of Object.entries(countryToProfile)) {
    const profile = profiles[profileKey]
    const dist = addNoise(profile.weights, parseInt(numericId))
    const topIntent = (Object.entries(dist) as [IntentGroup, number][])
      .sort((a, b) => b[1] - a[1])[0][0]

    data.push({
      countryCode: isoFromNumeric(numericId),
      countryName: countryNames[numericId] || numericId,
      numericId,
      distribution: dist,
      topIntent,
      volume: profile.volume + ((parseInt(numericId) * 7) % 20 - 10),
    })
  }

  return data
}
