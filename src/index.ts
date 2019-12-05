import { loader } from 'webpack'

const stringify = function(airports: Airport[]) {
  return `module.exports = ${JSON.stringify(airports)}`
}

const unwrap = function(details: string[]) {
  return details.map(detail => {
    if (/".*"/.test(detail)) return detail.slice(1, -1)
    if (detail === 'N' || detail === '\\N') return undefined
    return detail
  })
}

export type Airport = {
  // Airport ID 	Unique OpenFlights identifier for this airport.
  id: number;
  // Name 	Name of airport. May or may not contain the City name.
  name: string;
  // City 	Main city served by airport. May be spelled differently from Name.
  city: string;
  // Country 	Country or territory where airport is located. See countries.dat to cross-reference to ISO 3166-1 codes.
  country: string;
  // ICAO 	4-letter ICAO code.
  icao: string;
  // IATA 	3-letter IATA code. Null if not assigned/unknown.
  iata?: string;
  // Latitude 	Decimal degrees, usually to six significant digits. Negative is South, positive is North.
  latitude?: number;
  // Longitude 	Decimal degrees, usually to six significant digits. Negative is West, positive is East.
  longitude?: number;
  // Altitude 	In feet.
  altitude?: number;
  // Timezone 	Hours offset from UTC. Fractional hours are expressed as decimals, eg. India is 5.5.
  timezone?: number;
  // DST 	Daylight savings time. One of E (Europe), A (US/Canada), S (South America), O (Australia), Z (New Zealand), N (None) or U (Unknown). See also: Help: Time
  dst?: 'E' | 'A' | 'S' | 'O' | 'Z' | 'N' | 'U';
  // Tz database time zone 	Timezone in "tz" (Olson) format, eg. "America/Los_Angeles".
  tz?: string;
  // Type 	Type of the airport. Value "airport" for air terminals, "station" for train stations, "port" for ferry terminals and "unknown" if not known. In airports.csv, only type=airport is included.
  type?: 'airport' | 'station' | 'port' | 'unknown';
  // Source 	Source of this data. "OurAirports" for data sourced from OurAirports, "Legacy" for old data not matched to OurAirports (mostly DAFIF), "User" for unverified user contributions. In airports.csv, only source=OurAirports is included.
  source?: 'OurAirports' | 'Legacy' | 'User';
}

const loader: loader.Loader = function(contents) {
  this.cacheable && this.cacheable(true)
  this.addDependency(this.resourcePath)

  const airports: Airport[] = []

  const rawAirports =
    typeof contents === 'string' ? contents : contents.toString()

  rawAirports.split('\n').forEach(airport => {
    const tuple = unwrap(airport.split(','))
    airports.push({
      id: Number(tuple[0]),
      name: tuple[1] || '',
      city: tuple[2] || '',
      country: tuple[3] || '',
      iata: tuple[4] || undefined,
      icao: tuple[5] || '',
      latitude: Number(tuple[6]) || undefined,
      longitude: Number(tuple[7]) || undefined,
      altitude: Number(tuple[7]) || undefined,
      timezone: Number(tuple[7]) || undefined,
      dst: (tuple[7] as Airport['dst']) || undefined,
      tz: tuple[7] || undefined,
      type: (tuple[7] as Airport['type']) || undefined,
      source: (tuple[7] as Airport['source']) || undefined,
    })
  })

  //   console.log(airports.slice(0, 5))

  return stringify(airports)
}

module.exports = loader

module.exports.raw = true
