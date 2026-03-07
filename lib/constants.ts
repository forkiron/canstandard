import type {
  GlobeCountryMarker,
  MapCameraState,
  ProvinceDatum,
  SchoolDatum,
} from './types';

export const MAP_STYLE_URL = 'https://demotiles.maplibre.org/style.json';

export const CANADA_TARGET: GlobeCountryMarker = {
  id: 'country-ca',
  countryCode: 'CA',
  label: 'Canada',
  latitude: 56.1304,
  longitude: -106.3468,
  color: '#ffffff',
  size: 0.018,
};

export const DEFAULT_COUNTRY_MARKERS: GlobeCountryMarker[] = [
  CANADA_TARGET,
  {
    id: 'country-us',
    countryCode: 'US',
    label: 'United States',
    latitude: 39.8283,
    longitude: -98.5795,
    color: '#e9eef6',
    size: 0.012,
  },
  {
    id: 'country-gb',
    countryCode: 'GB',
    label: 'United Kingdom',
    latitude: 55.3781,
    longitude: -3.436,
    color: '#dde4ee',
    size: 0.011,
  },
];

export const CANADA_MAP_CAMERA: MapCameraState = {
  longitude: -96,
  latitude: 58,
  zoom: 2.65,
  pitch: 25,
  bearing: -6,
};

export const PROVINCES: ProvinceDatum[] = [
  { slug: 'bc', name: 'British Columbia', latitude: 53.7267, longitude: -127.6476, intensity: 0.78 },
  { slug: 'ab', name: 'Alberta', latitude: 53.9333, longitude: -116.5765, intensity: 0.72 },
  { slug: 'sk', name: 'Saskatchewan', latitude: 52.9399, longitude: -106.4509, intensity: 0.62 },
  { slug: 'mb', name: 'Manitoba', latitude: 53.7609, longitude: -98.8139, intensity: 0.64 },
  { slug: 'on', name: 'Ontario', latitude: 50.0007, longitude: -85.3232, intensity: 0.9 },
  { slug: 'qc', name: 'Quebec', latitude: 52.9399, longitude: -73.5491, intensity: 0.85 },
  { slug: 'ns', name: 'Nova Scotia', latitude: 44.682, longitude: -63.7443, intensity: 0.55 },
];

export const SCHOOLS: SchoolDatum[] = [
  {
    id: 'school-toronto-west',
    name: 'Toronto West Collegiate',
    city: 'Toronto',
    provinceSlug: 'on',
    latitude: 43.6532,
    longitude: -79.3832,
  },
  {
    id: 'school-vancouver-central',
    name: 'Vancouver Central Secondary',
    city: 'Vancouver',
    provinceSlug: 'bc',
    latitude: 49.2827,
    longitude: -123.1207,
  },
  {
    id: 'school-calgary-north',
    name: 'Calgary North High',
    city: 'Calgary',
    provinceSlug: 'ab',
    latitude: 51.0447,
    longitude: -114.0719,
  },
  {
    id: 'school-montreal-est',
    name: 'Montreal Est Academique',
    city: 'Montreal',
    provinceSlug: 'qc',
    latitude: 45.5017,
    longitude: -73.5673,
  },
];
