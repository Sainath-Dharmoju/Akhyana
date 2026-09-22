import { HISTORICAL_SOURCES } from './sources';
import { Experience } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-city-planning',
    topicId: 'ivc-urban-planning',
    civilizationId: 'indus-valley',
    title: 'The Grid City: Mohenjo-daro & Harappa',
    mode: 'explore',
    estimatedMinutes: 5,
    difficulty: 'Introductory',
    summary:
      "Walk through the world's earliest planned urban centers built on a cardinal grid with standardized burnt bricks and separated civic zones.",
    learningObjectives: [
      'Understand the 1:2:4 ratio standardized burnt bricks.',
      'Analyze the intentional separation between Citadel and Lower Town.',
      'Evaluate how north-south cardo-decumanus street layouts channeled prevailing winds for natural cooling.',
    ],
    historicalContext:
      'Excavations by the Archaeological Survey of India (Marshall 1931, Wheeler 1946) proved that Harappan settlements followed a strict orthogonal grid plan centuries before Greek Hippodamus or Roman town planners.',
    video: { title: 'How a grid city took shape', durationSeconds: 72, posterLabel: 'A reconstructed 2D story of streets, bricks, and civic planning.', status: 'planned' },
    recapPoints: ['Harappan streets followed an intentional grid.', 'Standard brick ratios appear across distant sites.', 'Excavated cities show distinct civic and residential zones.'],
    sources: [HISTORICAL_SOURCES.asi_mohenjodaro, HISTORICAL_SOURCES.kenoyer_ancient_cities],
    status: 'unlocked',
    xpReward: 120,
    subtopics: [
      {
        stepNumber: 1,
        title: 'The Cardinal Grid Alignment',
        narrative:
          'You arrive at Mohenjo-daro c. 2500 BCE. The main avenues run strictly north-to-south and east-to-west, intersecting at exact 90-degree right angles. Streets are up to 9 meters wide.',
        historicalEvidence:
          'Excavation maps from Marshall & Mackay reveal uniform street widths and corner rounded building walls to facilitate cart turns.',
        choicePrompt: 'Why did Harappan engineers orient main streets precisely with cardinal directions?',
        options: [
          {
            label: 'To harness prevailing winds as natural urban air conditioning',
            historicalConsequence:
              'Correct! Cardinal orientation allowed natural valley breezes to sweep clean the avenues and ventilate courtyard houses.',
            isHistoricallyAccurate: true,
            explanation:
              'Studies by Kenoyer and Possehl confirm the grid layout maximized natural ventilation in arid summer climates.',
          },
          {
            label: 'Strictly for decorative symmetry requested by a monarch',
            historicalConsequence:
              'Inaccurate. No palaces, royal tombs, or monarchical monuments have ever been found in Indus excavations; planning was civic and functional.',
            isHistoricallyAccurate: false,
            explanation:
              'Indus society demonstrates decentralized civic governance rather than autocratic monarchical monuments.',
          },
        ],
      },
      {
        stepNumber: 2,
        title: 'The Standardized 1:2:4 Brick Ratio',
        narrative:
          'Examine the mud-brick and baked-brick masonry. Whether excavated in Harappa (Punjab), Lothal (Gujarat), or Kalibangan (Rajasthan), every brick adheres strictly to the exact ratio of 1:2:4 (7cm height, 14cm width, 28cm length).',
        historicalEvidence:
          'ASI measurements across 1,000+ Harappan sites show standard English-bond interlocking brick ratios of 1:2:4.',
        choicePrompt: 'What does this empire-wide brick standardization demonstrate?',
        options: [
          {
            label: 'Centralized standardization of weights, measures, and municipal codes',
            historicalConsequence:
              'Demonstrates an astonishingly sophisticated regional trade network and universal civic engineering standards across 1 million sq km.',
            isHistoricallyAccurate: true,
            explanation:
              'The 1:2:4 ratio provides optimal structural interlocking without mortar degradation over millennia.',
          },
          {
            label: 'Random coincidence among isolated village potters',
            historicalConsequence:
              'Mathematically impossible across 1,000 km distances without deliberate civic standardization.',
            isHistoricallyAccurate: false,
            explanation:
              'Uniformity across distinct ecological zones proves an active regulatory civic framework.',
          },
        ],
      },
      {
        stepNumber: 3,
        title: 'The Dual Sector: Citadel & Lower Town',
        narrative:
          'Notice the city is divided into two distinct mounds: the fortified western Citadel built on an elevated mud-brick platform, and the sprawling eastern Lower Town with residential courtyards.',
        historicalEvidence:
          'Citadels contained public assembly halls, granaries, and the Great Bath, while the Lower Town housed artisans, merchants, and standard civic quarters.',
      },
    ],
  },
  {
    id: 'exp-water-drainage',
    topicId: 'ivc-water-systems',
    civilizationId: 'indus-valley',
    title: 'The Great Bath & Subterranean Drains',
    mode: 'reconstruct',
    estimatedMinutes: 6,
    difficulty: 'Intermediate',
    summary:
      "Inspect the world's first covered underground municipal drainage network and the waterproofed Great Bath of Mohenjo-daro.",
    learningObjectives: [
      'Examine natural bitumen (gypsum mortar) waterproofing techniques.',
      'Reconstruct house-to-street drainage linkages with inspection traps.',
      "Investigate Dholavira's 16 interconnected rainwater harvesting reservoirs.",
    ],
    historicalContext:
      'No other ancient civilization -- not even Egypt or Mesopotamia -- prioritized municipal sanitation to this degree until the Roman Empire 2,000 years later.',
    video: { title: 'Water beneath the city', durationSeconds: 78, posterLabel: 'A 2D walkthrough of wells, drains, and the Great Bath.', status: 'planned' },
    recapPoints: ['The Great Bath used carefully layered waterproofing.', 'Homes connected to covered street drains.', 'Dholavira developed extensive water-storage systems.'],
    sources: [
      HISTORICAL_SOURCES.asi_mohenjodaro,
      HISTORICAL_SOURCES.asi_dholavira,
      HISTORICAL_SOURCES.unesco_dholavira,
    ],
    status: 'unlocked',
    xpReward: 140,
    subtopics: [
      {
        stepNumber: 1,
        title: 'Waterproofing The Great Bath',
        narrative:
          'At the Citadel of Mohenjo-daro stands a 12m x 7m x 2.4m public bath. To make it watertight, Harappan engineers layered fine baked bricks, gypsum plaster, and a 3cm thick layer of natural bitumen (tar).',
        historicalEvidence:
          "Marshall's 1931 excavation recorded the preserved bitumen lining preventing groundwater seepage.",
        choicePrompt: 'How did Harappans prevent dirty water contamination?',
        options: [
          {
            label: 'Separate incoming fresh well supply from an outlet corbelled drain',
            historicalConsequence:
              'Exact architectural match! Water was filled from an adjacent deep brick well and drained via a massive corbelled vaulted culvert high enough for a person to walk through.',
            isHistoricallyAccurate: true,
            explanation:
              'The corbelled arch outlet channel allowed routine draining and scrub cleaning of the basin floor.',
          },
        ],
      },
      {
        stepNumber: 2,
        title: 'Covered Street Drains & Silt Sump Pits',
        narrative:
          'Every private home had a designated terracotta bathroom floor sloped towards a terracotta chute into the street drain. Street drains were capped with removable limestone slabs for municipal maintenance.',
        historicalEvidence:
          'Excavations at Harappa and Lothal reveal settling sumps (soak pits) every 30 meters where solid silt settled before water flowed into public outlets.',
      },
    ],
  },
  {
    id: 'exp-trade-commerce',
    topicId: 'ivc-trade-commerce',
    civilizationId: 'indus-valley',
    title: 'Lothal Dockyard & The Chert Weight System',
    mode: 'discover',
    estimatedMinutes: 5,
    difficulty: 'Intermediate',
    summary:
      "Uncover the world's oldest tidal dry dock at Lothal and the binary-decimal cubical chert weights used across Arabian Sea trade.",
    learningObjectives: [
      "Examine the tidal lock gate mechanism of Lothal's brick basin.",
      'Decipher the binary chert weight ratio (1, 2, 4, 8, 16, 32, 64) and decimal higher multipliers.',
      'Track trade routes connecting Meluhha (Indus) with Dilmun (Bahrain) and Sumer (Mesopotamia).',
    ],
    historicalContext:
      "S.R. Rao's excavations at Lothal (1955-1962) revealed a 214m x 36m burnt-brick tidal basin connected to the Gulf of Khambhat via the ancient Bhogavo river.",
    video: { title: 'A port at the edge of the tide', durationSeconds: 74, posterLabel: 'A 2D story of Lothal, weights, and long-distance exchange.', status: 'planned' },
    recapPoints: ['Lothal was a major Harappan settlement connected to maritime trade.', 'Standardized weights supported exchange.', 'Archaeological interpretations of the basin continue to be discussed.'],
    sources: [HISTORICAL_SOURCES.asi_lothal, HISTORICAL_SOURCES.kenoyer_ancient_cities, HISTORICAL_SOURCES.possehl_indus_age],
    status: 'unlocked',
    xpReward: 130,
    subtopics: [
      {
        stepNumber: 1,
        title: 'The Tidal Lock Mechanism at Lothal',
        narrative:
          'Ships from the Arabian Sea entered Lothal during high tide through an inlet channel. A wooden sluice gate was lowered at ebb tide to trap water, keeping ships afloat for loading carnelian beads, copper, and cotton.',
        historicalEvidence:
          "S.R. Rao discovered stone anchor stones and seal impressions on clay tags (bullae) in the adjacent 64-block warehouse.",
      },
    ],
  },
  {
    id: 'exp-crafts-seals',
    topicId: 'ivc-crafts-seals',
    civilizationId: 'indus-valley',
    title: 'The Pashupati Seal & Lost-Wax Metallurgy',
    mode: 'story',
    estimatedMinutes: 4,
    difficulty: 'Introductory',
    summary:
      'Investigate the iconic 4.25-inch bronze Dancing Girl cast via the lost-wax technique and the steatite seals bearing the still-undeciphered Indus script.',
    learningObjectives: [
      'Understand the cire-perdue (lost-wax) bronze casting technology.',
      'Analyze the iconography of the Pashupati seal (proto-Shiva yogic figure surrounded by animals).',
      'Examine steatite carving and alkali-glaze hardening processes.',
    ],
    historicalContext:
      'Over 4,000 inscribed steatite seals have been discovered across Harappan sites, serving as authentication badges on maritime cargo.',
    video: { title: 'Objects that still speak', durationSeconds: 68, posterLabel: 'A 2D story of seals, bronze, and skilled Harappan makers.', status: 'planned' },
    recapPoints: ['Lost-wax casting produced the bronze Dancing Girl.', 'Seals are important material evidence from Harappan sites.', 'The Indus script remains undeciphered.'],
    sources: [HISTORICAL_SOURCES.national_museum_delhi, HISTORICAL_SOURCES.kenoyer_ancient_cities],
    status: 'unlocked',
    xpReward: 110,
    subtopics: [
      {
        stepNumber: 1,
        title: 'The Bronze Dancing Girl (c. 2300 BCE)',
        narrative:
          'Cast in bronze at Mohenjo-daro, this 10.5 cm masterpiece depicts a young woman standing in a naturalistic tribhanga-like posture with 25 bangles on her left arm, radiating poise and confidence.',
        historicalEvidence:
          'Archaeologist Mortimer Wheeler remarked: "There is nothing like her in ancient world art down to the Hellenistic age."',
      },
    ],
  },
  {
    id: 'exp-rohini-rs1',
    topicId: 'event-rohini-rs1',
    title: 'Rohini RS-1: A Launch Into Orbit',
    mode: 'discover',
    estimatedMinutes: 4,
    difficulty: 'Introductory',
    summary: 'Trace the 18 July 1980 SLV-3 mission that placed Rohini RS-1 in orbit.',
    learningObjectives: [
      "Identify the mission's date, place, vehicle, and satellite.",
      'Connect the mission to the later development of Indian launch vehicles.',
    ],
    historicalContext: 'ISRO records that SLV-3 launched Rohini RS-1 from Sriharikota on 18 July 1980.',
    video: { title: 'From launch pad to orbit', durationSeconds: 66, posterLabel: 'A reviewed 2D story placeholder for the Rohini RS-1 mission.', status: 'planned' },
    recapPoints: [
      'Rohini RS-1 was launched aboard SLV-3 on 18 July 1980.',
      'The launch took place from Sriharikota.',
      "ISRO links the project's success to later launch-vehicle development.",
    ],
    sources: [{ id: 'isro-rohini-rs1', title: 'Rohini Satellite RS-1', authorOrInstitution: 'Indian Space Research Organisation', yearOrPeriod: '1980', sourceType: 'government_archive', confidence: 'verified', referenceLocation: 'https://www.isro.gov.in/RohiniSatellite_RS_1.html' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'A mission from Sriharikota',
        narrative: 'On 18 July 1980, SLV-3 launched Rohini RS-1 from Sriharikota.',
        historicalEvidence: "ISRO's mission record lists the launch date, vehicle, launch site, and satellite.",
        takeaway: 'Historical events can be explored through specific records of when, where, and how they occurred.',
      },
      {
        stepNumber: 2,
        title: 'What the success opened up',
        narrative: 'ISRO presents the successful SLV-3 project as a foundation for later Indian launch-vehicle programmes.',
        historicalEvidence: "ISRO's SLV history connects this success to later ASLV, PSLV, and GSLV development.",
        takeaway: 'A single mission can be understood as part of a longer technological history.',
      },
    ],
  },
  {
    id: 'exp-world-cup-1983',
    topicId: 'event-india-world-cup-1983',
    title: "India's 1983 World Cup Victory",
    mode: 'story',
    estimatedMinutes: 5,
    difficulty: 'Introductory',
    summary: "Follow the documented final at Lord's, where India defeated West Indies.",
    learningObjectives: [
      'Place the final in time and location.',
      'Use the scorecard and tournament account as evidence.',
      'Consider why an outcome can become historically significant.',
    ],
    historicalContext: "The ICC records that India beat West Indies by 43 runs at Lord's on 25 June 1983.",
    video: { title: 'The 1983 final', durationSeconds: 74, posterLabel: "A reviewed 2D story placeholder for the 1983 Cricket World Cup final.", status: 'planned' },
    recapPoints: [
      "India won the final at Lord's on 25 June 1983.",
      'The final score was India 183, West Indies 140.',
      'Kapil Dev became the first Indian captain to lift the Cricket World Cup.',
    ],
    sources: [{ id: 'icc-world-cup-1983', title: 'On this day: India win the 1983 World Cup', authorOrInstitution: 'International Cricket Council', yearOrPeriod: '1983', sourceType: 'primary', confidence: 'verified', referenceLocation: 'https://www.icc-cricket.com/tournaments/cricketworldcup/news/on-this-day-india-win-the-1983-world-cup' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: "The final at Lord's",
        narrative: "India faced West Indies in the 1983 Cricket World Cup final at Lord's.",
        historicalEvidence: "The ICC tournament account records India's 183 and West Indies' 140 in the final.",
        choicePrompt: 'What does the final score show?',
        options: [
          {
            label: 'India won the final by 43 runs',
            historicalConsequence: "Correct. The ICC records India's 43-run victory.",
            isHistoricallyAccurate: true,
            explanation: 'The scorecard lists India 183 and West Indies 140.',
          },
          {
            label: 'The final ended without a winner',
            historicalConsequence: 'The documented scorecard records a completed India victory.',
            isHistoricallyAccurate: false,
            explanation: 'India defeated West Indies by 43 runs.',
          },
        ],
        takeaway: 'Scorecards are a primary form of evidence for sporting history.',
      },
      {
        stepNumber: 2,
        title: 'A first World Cup title',
        narrative: 'The ICC identifies Kapil Dev as the first Indian captain to lift the Cricket World Cup.',
        historicalEvidence: "Its account describes West Indies as two-time winners entering the final and records India's victory.",
        takeaway: 'The significance of an event can be understood in relation to what came before it.',
      },
    ],
  },

  // -- 1890s -------------------------------------------------------------
  {
    id: 'exp-vivekananda-chicago',
    topicId: 'event-vivekananda-chicago-1893',
    title: 'Swami Vivekananda at Chicago',
    mode: 'story',
    estimatedMinutes: 5,
    difficulty: 'Introductory',
    summary: "Discover Swami Vivekananda's historic speech at the Parliament of the World's Religions.",
    learningObjectives: [
      'Understand the significance of the 1893 Parliament of Religions.',
      'Analyze the core message of universal tolerance in Vedanta.',
    ],
    historicalContext: 'Held in conjunction with the Columbian Exposition in Chicago, the Parliament brought together representatives of global faiths.',
    video: { title: 'Sisters and Brothers of America', durationSeconds: 60, posterLabel: 'A 2D story placeholder for Vivekananda in Chicago.', status: 'planned' },
    recapPoints: [
      "Vivekananda represented Hinduism in Chicago.",
      "He emphasized universal acceptance and tolerance.",
      "The event elevated Indian philosophical thought globally."
    ],
    sources: [{ id: 'src-vivekananda-chicago', title: 'Addresses at The Parliament of Religions', authorOrInstitution: 'Belur Math / Ramakrishna Mission', yearOrPeriod: '1893', sourceType: 'primary', confidence: 'verified', url: 'https://belurmath.org/swami-vivekananda-speeches-at-the-parliament-of-religions-chicago-1893/' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'Sisters and Brothers of America',
        narrative: 'When Swami Vivekananda stepped to the podium on September 11, 1893, his opening words broke convention. Instead of a formal academic greeting, he addressed the crowd as "Sisters and Brothers of America," receiving a two-minute standing ovation.',
        historicalEvidence: 'Archival records of the Parliament detail the unprecedented audience response to his opening remarks.',
        videos: [{ id: 'vid-viv-1', title: 'The Address', durationSeconds: 45, posterLabel: '2D Placeholder: The crowded hall of the Art Institute of Chicago.', status: 'planned' }],
        takeaway: 'A universal approach to humanity can bridge profound cultural divides.',
      },
      {
        stepNumber: 2,
        title: 'The Message of Universal Tolerance',
        narrative: 'In his addresses, he argued against sectarianism and bigotry, quoting the Gita to explain that all religious paths ultimately lead to the same truth.',
        historicalEvidence: 'The transcribed speeches published by the Ramakrishna Mission preserve his philosophical arguments.',
        takeaway: 'Vedantic philosophy provided a framework for religious pluralism.',
      }
    ],
  },
  {
    id: 'exp-epidemic-act',
    topicId: 'event-epidemic-act-1897',
    title: 'The Epidemic Diseases Act, 1897',
    mode: 'discover',
    estimatedMinutes: 5,
    difficulty: 'Intermediate',
    summary: 'Investigate the colonial response to the Bombay plague and its societal fallout.',
    learningObjectives: [
      'Examine the provisions of the Epidemic Diseases Act.',
      'Understand the socio-political reaction to forced quarantines in Pune.',
    ],
    historicalContext: 'The third plague pandemic reached Bombay in 1896, prompting draconian public health measures by the British.',
    video: { title: 'The Plague and the Law', durationSeconds: 70, posterLabel: 'A 2D story placeholder for colonial Bombay and Pune.', status: 'planned' },
    recapPoints: [
      'The Act gave government sweeping powers to inspect and quarantine.',
      'Military enforcement in Pune deeply alienated the local population.',
      'It led to the assassination of W.C. Rand in 1897.'
    ],
    sources: [{ id: 'src-epidemic-act', title: 'The Epidemic Diseases Act, 1897', authorOrInstitution: 'India Code', yearOrPeriod: '1897', sourceType: 'government_archive', confidence: 'verified', url: 'https://www.indiacode.nic.in/handle/123456789/2330' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'Sweeping Powers',
        narrative: 'To combat the rapidly spreading bubonic plague, the colonial government hastily drafted the Epidemic Diseases Act. It allowed authorities to forcibly inspect homes, segregate patients, and destroy infected property.',
        historicalEvidence: 'The Act is preserved in the India Code, showing its brief but highly authoritative legal structure.',
        videos: [{ id: 'vid-epa-1', title: 'Drafting the Act', durationSeconds: 50, posterLabel: '2D Placeholder: Colonial officials drafting legislation.', status: 'planned' }],
        takeaway: 'Public health crises often lead to the rapid expansion of state power.',
      },
      {
        stepNumber: 2,
        title: 'The Pune Assassination',
        narrative: 'Under Commissioner W.C. Rand, British troops violently enforced plague regulations in Pune, violating cultural and religious sensitivities. In retaliation, the Chapekar brothers assassinated Rand on June 22, 1897.',
        historicalEvidence: 'Trial records and contemporary newspaper reports document the severe public backlash and the subsequent assassination.',
        takeaway: 'Insensitive administrative enforcement can trigger violent political resistance.',
      }
    ],
  },
  {
    id: 'exp-birsa-munda',
    topicId: 'event-birsa-munda-1899',
    title: "Birsa Munda's Ulgulan",
    mode: 'discover',
    estimatedMinutes: 6,
    difficulty: 'Intermediate',
    summary: 'Trace the roots of the tribal uprising in Chotanagpur against colonial exploitation.',
    learningObjectives: [
      'Understand the disruption of the Khuntkatti system.',
      'Analyze the leadership of Birsa Munda in mobilizing the tribal population.',
    ],
    historicalContext: 'British land policies allowed outsiders (dikus) to exploit tribal populations, eroding traditional community land ownership.',
    video: { title: 'The Great Tumult', durationSeconds: 75, posterLabel: 'A 2D story placeholder for the Chotanagpur landscape.', status: 'planned' },
    recapPoints: [
      'The Ulgulan was driven by agrarian exploitation and cultural intrusion.',
      'Birsa Munda unified the tribes under a new politico-religious vision.',
      'The rebellion resulted in the protective Chota Nagpur Tenancy Act.'
    ],
    sources: [{ id: 'src-birsa-munda', title: 'Tribal Resistance Movements', authorOrInstitution: 'National Archives of India', yearOrPeriod: '1899', sourceType: 'government_archive', confidence: 'verified' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'Loss of Khuntkatti',
        narrative: 'The traditional Munda system of joint landholding (Khuntkatti) was dismantled by British policies, replacing tribal owners with non-tribal landlords (zamindars) and moneylenders who extracted heavy rents.',
        historicalEvidence: 'Revenue records in the National Archives detail the rapid transfer of land titles away from indigenous communities.',
        videos: [{ id: 'vid-bm-1', title: 'The Dikus Arrive', durationSeconds: 55, posterLabel: '2D Placeholder: Agrarian conflict in 19th-century Jharkhand.', status: 'planned' }],
        takeaway: 'Economic dispossession is often the primary driver of agrarian revolts.',
      },
      {
        stepNumber: 2,
        title: 'The Ulgulan Begins',
        narrative: 'Birsa Munda called for an Ulgulan (Great Tumult) in late 1899, organizing guerilla attacks on police stations, churches, and landlord properties using traditional weapons.',
        historicalEvidence: 'British military dispatches from Ranchi recorded the widespread coordination and scale of the tribal attacks.',
        takeaway: 'Charismatic leadership can unite fragmented groups into a formidable resistance movement.',
      }
    ],
  },

  // -- 1940s -------------------------------------------------------------
  {
    id: 'exp-rin-mutiny',
    topicId: 'event-rin-mutiny-1946',
    title: 'Royal Indian Navy Mutiny',
    mode: 'reconstruct',
    estimatedMinutes: 5,
    difficulty: 'Intermediate',
    summary: 'Examine the naval uprising that shook the foundation of the British Raj.',
    learningObjectives: [
      'Identify the causes of the naval mutiny.',
      'Understand its rapid spread and political impact.',
    ],
    historicalContext: 'Post-WWII India was highly volatile, marked by the INA trials and widespread anti-British sentiment.',
    video: { title: 'Mutiny on the Docks', durationSeconds: 80, posterLabel: 'A 2D story placeholder for ships in Bombay harbor.', status: 'planned' },
    recapPoints: [
      'The strike began on HMIS Talwar over poor food and racist abuse.',
      'It quickly became a mass anti-colonial uprising involving 20,000 sailors.',
      'It demonstrated that the British could no longer control the military.'
    ],
    sources: [{ id: 'src-rin-mutiny', title: 'Mutiny in the Royal Indian Navy', authorOrInstitution: 'National Archives of India / Abhilekh Patal', yearOrPeriod: '1946', sourceType: 'government_archive', confidence: 'verified' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'The Spark on HMIS Talwar',
        narrative: 'On February 18, 1946, ratings on the signals training ship HMIS Talwar went on hunger strike. The immediate trigger was unpalatable food and deeply racist insults from British commanding officers.',
        historicalEvidence: 'Declassified naval inquiry reports confirm the widespread grievances regarding rations and racial discrimination.',
        videos: [{ id: 'vid-rin-1', title: 'The Strike Begins', durationSeconds: 45, posterLabel: '2D Placeholder: Sailors refusing rations on the mess deck.', status: 'planned' }],
        takeaway: 'Institutionalized racism and poor conditions can ignite broader political rebellions.',
      },
      {
        stepNumber: 2,
        title: 'A Subcontinent in Revolt',
        narrative: 'Within 48 hours, the mutiny spread to 78 ships and 20 shore establishments. Ratings raised the flags of the Congress, Muslim League, and Communist Party together, showing unprecedented unity.',
        historicalEvidence: 'Archival photographs show ships in Bombay and Karachi flying combined flags of Indian political parties.',
        takeaway: 'Military uprisings have the power to rapidly accelerate the collapse of colonial authority.',
      }
    ],
  },
  {
    id: 'exp-tebhaga-movement',
    topicId: 'event-tebhaga-movement-1946',
    title: 'Tebhaga Movement',
    mode: 'discover',
    estimatedMinutes: 5,
    difficulty: 'Introductory',
    summary: "Follow the sharecroppers' struggle in Bengal for a fairer share of the harvest.",
    learningObjectives: [
      'Understand the jotedar-bargadar agrarian system.',
      'Analyze the impact of peasant mobilization on land reform.',
    ],
    historicalContext: 'Bengal in 1946 was recovering from a devastating famine, sharpening the conflict between landowners and peasants.',
    video: { title: 'The Cry for Tebhaga', durationSeconds: 65, posterLabel: 'A 2D story placeholder for rural Bengal paddy fields.', status: 'planned' },
    recapPoints: [
      'Sharecroppers demanded a two-thirds share of the harvest.',
      'The movement challenged the oppressive jotedar landlords.',
      'It laid the groundwork for post-independence land reforms.'
    ],
    sources: [{ id: 'src-tebhaga', title: 'Agrarian Struggles in Bengal', authorOrInstitution: 'National Archives of India', yearOrPeriod: '1946', sourceType: 'government_archive', confidence: 'verified' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'The Two-Thirds Demand',
        narrative: 'Sharecroppers (bargadars) traditionally surrendered half their crop to the landlords (jotedars). In late 1946, guided by the Floud Commission report, they demanded \'Tebhaga\'—retaining two-thirds of the harvest for themselves.',
        historicalEvidence: 'The Floud Commission (Land Revenue Commission of Bengal, 1940) officially recommended the two-thirds share.',
        videos: [{ id: 'vid-teb-1', title: 'Harvesting the Demand', durationSeconds: 50, posterLabel: '2D Placeholder: Peasants gathering grain at the threshing floor.', status: 'planned' }],
        takeaway: 'Official government reports can legitimize grassroots demands for economic justice.',
      }
    ],
  },
  {
    id: 'exp-constitution-1949',
    topicId: 'event-constitution-1949',
    title: 'Adoption of the Constitution',
    mode: 'story',
    estimatedMinutes: 6,
    difficulty: 'Intermediate',
    summary: 'Witness the conclusion of the Constituent Assembly and the birth of a Republic.',
    learningObjectives: [
      'Understand the drafting process of the Indian Constitution.',
      'Appreciate the scale of establishing universal adult franchise.',
    ],
    historicalContext: 'Drafted amidst the trauma of Partition, the Constitution sought to unify a deeply diverse and socially stratified subcontinent.',
    video: { title: 'We, the People', durationSeconds: 90, posterLabel: 'A 2D story placeholder for the Constituent Assembly hall.', status: 'planned' },
    recapPoints: [
      'The Assembly debated the draft for nearly three years.',
      'The Constitution established a sovereign, democratic republic.',
      'It formally enshrined fundamental rights and universal franchise.'
    ],
    sources: [{ id: 'src-constituent-assembly', title: 'Constituent Assembly Debates', authorOrInstitution: 'Parliament of India', yearOrPeriod: '1949', sourceType: 'government_archive', confidence: 'verified', url: 'https://loksabha.nic.in/debates/cadebates.aspx' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'The Final Draft',
        narrative: 'On November 26, 1949, Dr. B.R. Ambedkar presented the final draft of the Constitution. In his closing speech, he warned that political democracy must be accompanied by social democracy to survive.',
        historicalEvidence: 'The Constituent Assembly Debates perfectly preserve Ambedkar\'s \"Grammar of Anarchy" speech.',
        videos: [{ id: 'vid-const-1', title: 'Ambedkar\'s Warning', durationSeconds: 65, posterLabel: '2D Placeholder: Dr. Ambedkar addressing the Assembly.', status: 'planned' }],
        takeaway: 'A constitution provides the legal machinery, but social equality requires active societal commitment.',
      }
    ],
  },

  // -- 2010s -------------------------------------------------------------
  {
    id: 'exp-mangalyaan',
    topicId: 'event-mangalyaan-2014',
    title: 'Mangalyaan Enters Mars Orbit',
    mode: 'discover',
    estimatedMinutes: 4,
    difficulty: 'Introductory',
    summary: 'Relive the historic moment ISRO successfully inserted a probe into Martian orbit.',
    learningObjectives: [
      'Understand the technological achievement of the Mars Orbiter Mission.',
      'Recognize the efficiency and cost-effectiveness of ISRO\'s approach.',
    ],
    historicalContext: 'Space exploration was traditionally dominated by the US, Russia, and the ESA. India\'s mission was highly scrutinized for its low budget.',
    video: { title: 'First Attempt Success', durationSeconds: 55, posterLabel: 'A 2D story placeholder for MOM in orbit.', status: 'planned' },
    recapPoints: [
      'India was the first nation to succeed on its first Mars attempt.',
      'The mission cost only $74 million.',
      'It demonstrated highly precise orbital mechanics and engineering.'
    ],
    sources: [{ id: 'src-isro-mom', title: 'Mars Orbiter Mission', authorOrInstitution: 'Indian Space Research Organisation (ISRO)', yearOrPeriod: '2014', sourceType: 'government_archive', confidence: 'verified', url: 'https://www.isro.gov.in/MarsOrbiterMission.html' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'The Slingshot to Mars',
        narrative: 'Because the PSLV rocket lacked the thrust to send the probe directly to Mars, ISRO engineers utilized a series of Earth-bound maneuvers to build momentum before executing a highly precise trans-Martian injection.',
        historicalEvidence: 'ISRO\'s mission telemetry and trajectory logs confirm the use of the Hohmann transfer orbit strategy.',
        videos: [{ id: 'vid-mom-1', title: 'Orbital Slingshot', durationSeconds: 40, posterLabel: '2D Placeholder: Diagram of Earth-bound maneuvers.', status: 'planned' }],
        takeaway: 'Resource constraints can drive innovative engineering solutions.',
      }
    ],
  },
  {
    id: 'exp-gst',
    topicId: 'event-gst-2017',
    title: 'Implementation of GST',
    mode: 'reconstruct',
    estimatedMinutes: 5,
    difficulty: 'Intermediate',
    summary: 'Analyze the rollout of the Goods and Services Tax and its impact on the Indian economy.',
    learningObjectives: [
      'Understand the complexity of pre-2017 indirect taxation.',
      'Evaluate the mechanism and goals of the GST framework.',
    ],
    historicalContext: 'Before GST, moving goods across Indian state borders required paying multiple overlapping taxes, heavily fragmenting the national market.',
    video: { title: 'One Nation, One Tax', durationSeconds: 60, posterLabel: 'A 2D story placeholder for trade networks.', status: 'planned' },
    recapPoints: [
      'GST replaced multiple state and central taxes.',
      'It aimed to create a unified national market.',
      'The transition required immense digital infrastructure (GSTN).'
    ],
    sources: [{ id: 'src-gst-council', title: 'About GST', authorOrInstitution: 'GST Council, Ministry of Finance', yearOrPeriod: '2017', sourceType: 'government_archive', confidence: 'verified', url: 'https://gstcouncil.gov.in/' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'Unifying the Market',
        narrative: 'At midnight on July 1, 2017, the GST was enacted through a special session of Parliament. It subsumed excise duties, VAT, octroi, and service tax into a single multi-tier tax system.',
        historicalEvidence: 'The 101st Amendment of the Constitution of India provides the legal basis for the GST rollout.',
        videos: [{ id: 'vid-gst-1', title: 'Removing Checkposts', durationSeconds: 50, posterLabel: '2D Placeholder: Trucks moving freely across state borders.', status: 'planned' }],
        takeaway: 'Major economic reforms require constitutional amendments and federal consensus.',
      }
    ],
  },
  {
    id: 'exp-section-377',
    topicId: 'event-section-377-2018',
    title: 'Decriminalization of Section 377',
    mode: 'story',
    estimatedMinutes: 6,
    difficulty: 'Advanced',
    summary: 'Read how the Supreme Court struck down a 157-year-old colonial law to protect LGBTQ+ rights.',
    learningObjectives: [
      'Understand the constitutional arguments against Section 377.',
      'Analyze the role of the judiciary in protecting minority rights.',
    ],
    historicalContext: 'Section 377 was introduced by the British in 1861, imposing Victorian morality on the subcontinent and criminalizing the LGBTQ+ community for over a century.',
    video: { title: 'The Arc of Justice', durationSeconds: 85, posterLabel: 'A 2D story placeholder for the Supreme Court ruling.', status: 'planned' },
    recapPoints: [
      'A five-judge Constitution Bench ruled unanimously.',
      'The judgment affirmed that sexual orientation is natural and innate.',
      'It apologized for the historical wrongs committed against the community.'
    ],
    sources: [{ id: 'src-sc-377', title: 'Navtej Singh Johar & Ors. v. Union of India', authorOrInstitution: 'Supreme Court of India', yearOrPeriod: '2018', sourceType: 'government_archive', confidence: 'verified', url: 'https://main.sci.gov.in/supremecourt/2016/14961/14961_2016_Judgement_06-Sep-2018.pdf' }],
    status: 'unlocked',
    xpReward: 0,
    subtopics: [
      {
        stepNumber: 1,
        title: 'Constitutional Morality',
        narrative: 'Chief Justice Dipak Misra declared, "I am what I am, so take me as I am." The Court ruled that constitutional morality must trump social morality, ensuring that fundamental rights are not subjected to majoritarian views.',
        historicalEvidence: 'The 493-page Supreme Court judgment extensively cites the Right to Privacy, Dignity, and Equality (Articles 14, 15, and 21).',
        videos: [{ id: 'vid-377-1', title: 'Reading the Verdict', durationSeconds: 60, posterLabel: '2D Placeholder: Jubilation outside the Supreme Court.', status: 'planned' }],
        takeaway: 'The Constitution exists to protect the rights of minorities against the prejudices of the majority.',
      }
    ],
  },
];
