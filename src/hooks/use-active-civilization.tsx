import React, { createContext, useContext, useMemo, useState } from 'react';

import { CIVILIZATIONS } from '@/data/civilizations';

type ActiveCivilizationContextValue = {
  activeCivilizationId: string;
  setActiveCivilizationId: (id: string) => void;
  activePeriodId: string;
  setActivePeriodId: (id: string) => void;
  activeTopicId: string | null;
  setActiveTopicId: (id: string | null) => void;
  activeDecadeId: string;
  setActiveDecadeId: (id: string) => void;
  activeEventId: string | null;
  setActiveEventId: (id: string | null) => void;
};

const ActiveCivilizationContext = createContext<ActiveCivilizationContextValue | null>(null);

export function ActiveCivilizationProvider({ children }: { children: React.ReactNode }) {
  const defaultId = CIVILIZATIONS.find((civilization) => civilization.featured)?.id ?? CIVILIZATIONS[0]?.id ?? '';
  const [activeCivilizationId, setActiveCivilizationId] = useState(defaultId);
  const [activePeriodId, setActivePeriodId] = useState('indus-valley-period');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [activeDecadeId, setActiveDecadeId] = useState('1980s');
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const value = useMemo(() => ({ activeCivilizationId, setActiveCivilizationId, activePeriodId, setActivePeriodId, activeTopicId, setActiveTopicId, activeDecadeId, setActiveDecadeId, activeEventId, setActiveEventId }), [activeCivilizationId, activePeriodId, activeTopicId, activeDecadeId, activeEventId]);

  return <ActiveCivilizationContext.Provider value={value}>{children}</ActiveCivilizationContext.Provider>;
}

export function useActiveCivilization() {
  const context = useContext(ActiveCivilizationContext);
  if (!context) throw new Error('useActiveCivilization must be used within ActiveCivilizationProvider');
  return context;
}

/** In-session selection for the timeline-first learning flow. It deliberately has no persistence. */
export function useHistoricalJourney() {
  return useActiveCivilization();
}
