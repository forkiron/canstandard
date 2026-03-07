import type { EducationCountryMetric } from '../../lib/types';

const HEAT_STOPS = ['#7f0000', '#ff7a00', '#ffd400', '#10c83b'];
const NO_DATA_HEAT_COLOR = '#2a2a2a';

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function interpolateChannel(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  return {
    r: Number.parseInt(clean.slice(0, 2), 16),
    g: Number.parseInt(clean.slice(2, 4), 16),
    b: Number.parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function interpolateHexColor(start: string, end: string, t: number) {
  const s = hexToRgb(start);
  const e = hexToRgb(end);
  return rgbToHex(
    interpolateChannel(s.r, e.r, t),
    interpolateChannel(s.g, e.g, t),
    interpolateChannel(s.b, e.b, t)
  );
}

function scaleFromMinMax(value: number | null, min: number, max: number) {
  if (value == null || !Number.isFinite(value)) return null;
  if (max <= min) return 0.5;
  return clamp01((value - min) / (max - min));
}

function heatColorFromScale(t: number | null) {
  if (t == null) return NO_DATA_HEAT_COLOR;
  const clamped = clamp01(t);
  if (clamped <= 1 / 3) {
    return interpolateHexColor(HEAT_STOPS[0], HEAT_STOPS[1], clamped * 3);
  }
  if (clamped <= 2 / 3) {
    return interpolateHexColor(HEAT_STOPS[1], HEAT_STOPS[2], (clamped - 1 / 3) * 3);
  }
  return interpolateHexColor(HEAT_STOPS[2], HEAT_STOPS[3], (clamped - 2 / 3) * 3);
}

export function getHeatDomain(records: EducationCountryMetric[]) {
  const heatValues = records
    .map((record) => record.heatScore)
    .filter((value): value is number => value != null && Number.isFinite(value));
  return {
    minHeat: heatValues.length ? Math.min(...heatValues) : 0,
    maxHeat: heatValues.length ? Math.max(...heatValues) : 100,
  };
}

export function heatColorFromValue(value: number | null, minHeat: number, maxHeat: number) {
  const t = scaleFromMinMax(value, minHeat, maxHeat);
  return heatColorFromScale(t);
}

