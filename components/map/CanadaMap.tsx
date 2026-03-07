'use client';

import { useMemo, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import Map from 'react-map-gl/maplibre';
import {
  CANADA_MAP_CAMERA,
  MAP_STYLE_URL,
  PROVINCES,
  SCHOOLS,
} from '../../lib/constants';
import type { MapCameraState, ProvinceDatum, SchoolDatum } from '../../lib/types';

interface CanadaMapProps {
  provinces?: ProvinceDatum[];
  schools?: SchoolDatum[];
  onProvinceSelect?: (slug: string) => void;
  onSchoolSelect?: (id: string) => void;
}

export function CanadaMap({
  provinces = PROVINCES,
  schools = SCHOOLS,
  onProvinceSelect,
  onSchoolSelect,
}: CanadaMapProps) {
  const [viewState, setViewState] = useState<MapCameraState>(CANADA_MAP_CAMERA);

  const layers = useMemo(() => {
    const provinceHeat = new HeatmapLayer<ProvinceDatum>({
      id: 'province-heat',
      data: provinces,
      getPosition: (d) => [d.longitude, d.latitude],
      getWeight: (d) => d.intensity,
      radiusPixels: 50,
      opacity: 0.5,
    });

    const provinceNodes = new ScatterplotLayer<ProvinceDatum>({
      id: 'province-nodes',
      data: provinces,
      getPosition: (d) => [d.longitude, d.latitude],
      getRadius: (d) => 65000 + d.intensity * 40000,
      radiusUnits: 'meters',
      getFillColor: [148, 197, 255, 120],
      stroked: true,
      lineWidthMinPixels: 1,
      getLineColor: [191, 219, 254, 220],
      pickable: true,
      onClick: (info) => {
        if (info.object) onProvinceSelect?.(info.object.slug);
      },
    });

    const schoolPoints = new ScatterplotLayer<SchoolDatum>({
      id: 'school-points',
      data: schools,
      getPosition: (d) => [d.longitude, d.latitude],
      getRadius: 18000,
      radiusUnits: 'meters',
      getFillColor: [252, 211, 77, 210],
      getLineColor: [255, 255, 255, 210],
      stroked: true,
      lineWidthMinPixels: 1,
      pickable: true,
      onClick: (info) => {
        if (info.object) onSchoolSelect?.(info.object.id);
      },
    });

    return [provinceHeat, provinceNodes, schoolPoints];
  }, [provinces, schools, onProvinceSelect, onSchoolSelect]);

  return (
    <div className="relative h-[70vh] overflow-hidden rounded-2xl border border-slate-800">
      <DeckGL
        layers={layers}
        controller
        viewState={viewState}
        onViewStateChange={({ viewState: nextViewState }) =>
          setViewState(nextViewState as MapCameraState)
        }
      >
        <Map mapStyle={MAP_STYLE_URL} reuseMaps attributionControl={false} />
      </DeckGL>

      <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-slate-950/80 px-3 py-2 text-xs text-slate-200">
        Province heat intensity + school points (placeholder data)
      </div>
    </div>
  );
}
