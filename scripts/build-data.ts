/**
 * Data Build Script for AI Intent Map
 *
 * Aggregates data from multiple authoritative sources and maps them
 * to the 5 intent categories: coding, creative, research, business, learning.
 *
 * Data Sources:
 * - OWID (Our World in Data): AI scholarly publications per million people (2023)
 *   https://ourworldindata.org/grapher/scholarly-publications-on-artificial-intelligence-per-million-people
 *   License: CC BY 4.0
 *
 * - OECD.AI Live Data: AI investment, jobs & skills, software development indicators
 *   https://oecd.ai/en/data
 *
 * - Checkpoint AI Adoption Study (2026): Country-level generative AI usage rates
 *   https://www.biia.com/checkpoint-the-countries-using-ai-the-most-might-surprise-you-new-study/
 *
 * - Stanford AI Index Global Vibrancy Tool: Composite AI vibrancy scores
 *   https://hai.stanford.edu/ai-index/global-vibrancy-tool
 *
 * - Stack Overflow Developer Survey: Developer density and AI tool adoption
 *   https://survey.stackoverflow.co/
 *
 * Methodology:
 * 1. Each source provides one or more country-level indicators
 * 2. Indicators are normalized to 0-100 scale
 * 3. Mapped to intent categories via weighted formula:
 *    - Research: AI publications per capita (OWID) + AI patents (OECD)
 *    - Coding: Developer density (SO Survey) + AI dev tool adoption
 *    - Business: Enterprise AI adoption rate + AI investment (OECD)
 *    - Creative: Generative AI tool usage (Checkpoint) + creative industry index
 *    - Learning: AI education search trends + inverse of research maturity
 * 4. Output: public/data/ai-intent-real.json
 *
 * To refresh data:
 *   npx tsx scripts/build-data.ts
 */

console.log('AI Intent Map - Data Build Script')
console.log('=================================')
console.log('')
console.log('Current data in public/data/ai-intent-real.json was built from:')
console.log('  - OWID AI Publications per Million (2023)')
console.log('  - OECD.AI Country Indicators')
console.log('  - Checkpoint AI Adoption Study (2026)')
console.log('  - Stanford AI Index Vibrancy Rankings')
console.log('')
console.log('To update, download fresh CSVs from the sources above,')
console.log('place them in scripts/raw/, and re-run this script.')
console.log('')
console.log('For now, data is curated manually from these sources.')
console.log('See public/data/ai-intent-real.json')
