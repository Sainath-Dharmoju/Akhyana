import { HISTORICAL_SOURCES } from './sources';
import { ArtifactRecord } from './types';

export const ARTIFACTS: ArtifactRecord[] = [
  {
    id: 'art-dancing-girl',
    name: 'The Bronze Dancing Girl',
    civilizationId: 'indus-valley',
    estimatedDate: 'c. 2300 - 1750 BCE',
    material: 'Cast Bronze (Cire-perdue / Lost-wax method)',
    excavationSite: 'HR Area, Mohenjo-daro (Sindh)',
    currentLocation: 'National Museum, New Delhi (Acc. No. 5721/195)',
    historicalStatus: 'Verified Archaeological Discovery',
    description:
      'A world-renowned 10.5 cm bronze figurine depicting a youthful girl in a poised stance with her right hand on her hip and 25 bangles on her left arm.',
    significance:
      'Demonstrates mastery of sophisticated metallurgical bronze casting and naturalistic human sculpting 4,000+ years ago.',
    sources: [HISTORICAL_SOURCES.national_museum_delhi, HISTORICAL_SOURCES.kenoyer_ancient_cities],
    unlocked: true,
  },
  {
    id: 'art-priest-king',
    name: 'The Priest-King Bust',
    civilizationId: 'indus-valley',
    estimatedDate: 'c. 2000 - 1900 BCE',
    material: 'Steatite (Soapstone) with traces of red pigment',
    excavationSite: 'DK-G Area, Mohenjo-daro',
    currentLocation: 'National Museum of Pakistan, Karachi',
    historicalStatus: 'Verified Archaeological Discovery',
    description:
      'A 17.5 cm carved soapstone bust of a bearded dignitary wearing a headband with an armlet and a patterned shawl draped over the left shoulder.',
    significance:
      'Exhibits the trefoil pattern shawl motif and elite civic/spiritual iconography of Harappan society.',
    sources: [HISTORICAL_SOURCES.asi_mohenjodaro, HISTORICAL_SOURCES.kenoyer_ancient_cities],
    unlocked: true,
  },
  {
    id: 'art-pashupati-seal',
    name: 'Pashupati / Proto-Shiva Seal',
    civilizationId: 'indus-valley',
    estimatedDate: 'c. 2350 - 2000 BCE',
    material: 'Carved & Glazed Steatite',
    excavationSite: 'DK-G Area, Block 1, Mohenjo-daro',
    currentLocation: 'National Museum, New Delhi',
    historicalStatus: 'Verified Archaeological Discovery',
    description:
      'A square steatite seal depicting a three-faced yogic seated figure wearing a horned headdress, flanked by an elephant, tiger, rhinoceros, and buffalo with two deer beneath.',
    significance:
      'One of the earliest representations of yogic posture (mulabandhasana) and respect for animal biodiversity.',
    sources: [HISTORICAL_SOURCES.national_museum_delhi, HISTORICAL_SOURCES.asi_mohenjodaro],
    unlocked: true,
  },
  {
    id: 'art-chert-weights',
    name: 'Standardized Cubical Chert Weights',
    civilizationId: 'indus-valley',
    estimatedDate: 'c. 2600 - 1900 BCE',
    material: 'Polished Chert stone',
    excavationSite: 'Lothal, Harappa & Mohenjo-daro',
    currentLocation: 'National Museum, New Delhi & ASI Lothal Museum',
    historicalStatus: 'Verified Archaeological Discovery',
    description:
      'Finely cut cubical stone weights adhering to a strict binary ratio (1, 2, 4, 8, 16, 32, 64) with the base unit equaling approx 0.856 grams, transitioning to decimal ratios for bulk trade.',
    significance:
      'Proves pan-regional commercial regulation, integrity of marketplace transactions, and taxation fairness.',
    sources: [HISTORICAL_SOURCES.kenoyer_ancient_cities, HISTORICAL_SOURCES.asi_lothal],
    unlocked: true,
  },
  {
    id: 'art-lothal-dockyard-model',
    name: 'Lothal Tidal Basin Sluice Gate Model',
    civilizationId: 'indus-valley',
    estimatedDate: 'c. 2400 BCE (Excavated 1955-1962)',
    material: 'Kiln-burnt brick & hydraulic mortar',
    excavationSite: 'Lothal (Gujarat)',
    currentLocation: 'Archaeological Site Museum, Lothal',
    historicalStatus: 'Historical Reconstruction',
    description:
      'Scale physical model of the 214m long brick dockyard with intake lock-gates preventing water drainage during low tides.',
    significance:
      'The earliest known artificial dry dock engineered in maritime human history.',
    sources: [HISTORICAL_SOURCES.asi_lothal],
    unlocked: false,
  },
];

