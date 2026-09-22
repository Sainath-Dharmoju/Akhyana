import { TimePeriod } from './types';

/** Timeline navigation is deliberately independent of civilizations. New periods add data here. */
export const TIME_PERIODS: TimePeriod[] = [
  {
    id: 'indus-valley-period',
    title: 'Indus Valley Period',
    shortDescription: 'Urban development, water systems, craft, and exchange across the northwestern subcontinent.',
    dateDisplay: 'c. 2600-1900 BCE',
    datePrecision: 'range',
    order: 1,
    topicIds: ['ivc-urban-planning', 'ivc-water-systems', 'ivc-trade-commerce', 'ivc-crafts-seals'],
    status: 'active',
  },
  {
    id: 'early-historic-india', title: 'Early Historic India', shortDescription: 'A future collection of early historic developments.', dateDisplay: 'Collection forthcoming', datePrecision: 'range', order: 2, topicIds: [], status: 'coming_soon',
  },
  {
    id: 'medieval-india', title: 'Medieval India', shortDescription: 'A future collection of regional kingdoms, cultures, and networks.', dateDisplay: 'Collection forthcoming', datePrecision: 'range', order: 3, topicIds: [], status: 'coming_soon',
  },
  {
    id: 'early-modern-india', title: 'Early Modern India', shortDescription: 'A future collection of early modern histories.', dateDisplay: 'Collection forthcoming', datePrecision: 'range', order: 4, topicIds: [], status: 'coming_soon',
  },
  {
    id: 'modern-india', title: 'Modern India', shortDescription: 'A future collection of modern history.', dateDisplay: 'Collection forthcoming', datePrecision: 'range', order: 5, topicIds: [], status: 'coming_soon',
  },
];
