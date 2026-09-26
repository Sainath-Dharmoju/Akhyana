/**
 * Year-based Ludo duel question bank.
 *
 * STRICT SEPARATION: this module is independent from the decade-based
 * learning data (src/data/decades.ts). Ludo quiz questions are owned by
 * an exact calendar year (e.g. 1956), never by empire/civilization or
 * decadeId. Learning stays decade-based; the Ludo quiz is year-based.
 */

export type QuestionStage = 'foundation' | 'systems' | 'evidence' | 'mastery';

export interface YearDuelQuestion {
  id: string;
  /** Exact quiz year. The Ludo quiz filters strictly on this field. */
  year: number;
  stage?: QuestionStage;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  theme?: string;
}

/**
 * Seed question bank. Every entry is tagged with one exact year.
 * Add further years by appending questions tagged with that exact year;
 * the game engine requires no changes to pick them up.
 *
 * Questions represent distinct historical knowledge points for their year.
 */
export const YEAR_DUEL_QUESTIONS: YearDuelQuestion[] = [
  // ---------------- 1956 ----------------
  {
    id: 'q1956_001',
    year: 1956,
    prompt: 'Which commission submitted the report that led to the States Reorganisation Act, 1956?',
    choices: ['Fazal Ali Commission', 'Dhar Commission', 'JVP Committee', 'Sarkaria Commission'],
    correctIndex: 0,
    explanation: 'The States Reorganisation Commission headed by Justice Fazal Ali reported in 1955, becoming the 1956 Act.',
    theme: 'states-reorganisation',
  },
  {
    id: 'q1956_002',
    year: 1956,
    prompt: 'Under the States Reorganisation Act, how many states and Union Territories were created on 1 November 1956?',
    choices: ['14 states and 6 UTs', '16 states and 3 UTs', '12 states and 8 UTs', '27 states and 4 UTs'],
    correctIndex: 0,
    explanation: 'The Act replaced the Part A/B/C/D classification with 14 states and 6 Union Territories.',
    theme: 'states-reorganisation',
  },
  {
    id: 'q1956_003',
    year: 1956,
    prompt: 'Which Malayalam-speaking state was formed on 1 November 1956?',
    choices: ['Kerala', 'Madras', 'Mysore', 'Andhra'],
    correctIndex: 0,
    explanation: 'Kerala was created on 1 November 1956 by merging Travancore-Cochin with the Malabar district.',
    theme: 'states-reorganisation',
  },
  {
    id: 'q1956_004',
    year: 1956,
    prompt: 'Andhra Pradesh was formed on 1 November 1956 by merging Andhra State with which region?',
    choices: ['Telangana (Hyderabad State)', 'Rayalaseema', 'Ganjam', 'Marathwada'],
    correctIndex: 0,
    explanation: 'The Telangana region of former Hyderabad State merged with Andhra State to form Andhra Pradesh.',
    theme: 'states-reorganisation',
  },
  {
    id: 'q1956_005',
    year: 1956,
    prompt: 'The enlarged Mysore State formed in 1956 was later renamed what?',
    choices: ['Karnataka', 'Vidarbha', 'Dakshina Kannada', 'Tulu Nadu'],
    correctIndex: 0,
    explanation: 'The enlarged Mysore State of 1956 was renamed Karnataka in 1973.',
    theme: 'states-reorganisation',
  },
  {
    id: 'q1956_006',
    year: 1956,
    prompt: 'Which union territory did Delhi become under the 1956 reorganisation?',
    choices: ['A Union Territory', 'A Part B state', 'A municipality', 'A special capital region'],
    correctIndex: 0,
    explanation: 'Delhi ceased to be a Part C state and became a Union Territory on 1 November 1956.',
    theme: 'states-reorganisation',
  },
  {
    id: 'q1956_007',
    year: 1956,
    prompt: 'PEPSU (Patiala and East Punjab States Union) was merged into which state on 1 November 1956?',
    choices: ['Punjab', 'Himachal Pradesh', 'Haryana', 'Rajasthan'],
    correctIndex: 0,
    explanation: 'PEPSU was merged into Punjab under the States Reorganisation Act, 1956.',
    theme: 'states-reorganisation',
  },
  {
    id: 'q1956_008',
    year: 1956,
    prompt: 'The Life Insurance Corporation of India was created in 1956 by nationalising about how many insurers?',
    choices: ['245', '25', '50', '1,000'],
    correctIndex: 0,
    explanation: 'The LIC Act, 1956 nationalised 245 insurance companies and provident societies; LIC began on 1 September 1956.',
    theme: 'economy',
  },
  {
    id: 'q1956_009',
    year: 1956,
    prompt: 'Which Hindu personal law reform granting daughters equal inheritance was enacted in 1956?',
    choices: ['Hindu Succession Act', 'Hindu Marriage Act', 'Special Marriage Act', 'Dowry Prohibition Act'],
    correctIndex: 0,
    explanation: 'The Hindu Succession Act, 1956 codified intestate succession with equal rights for daughters.',
    theme: 'law',
  },
  {
    id: 'q1956_010',
    year: 1956,
    prompt: 'Which constitutional amendment implemented the States Reorganisation scheme in 1956?',
    choices: ['7th Amendment', '1st Amendment', '42nd Amendment', '24th Amendment'],
    correctIndex: 0,
    explanation: 'The 7th Constitutional Amendment Act, 1956 gave constitutional effect to the state reorganisation.',
    theme: 'law',
  },
  {
    id: 'q1956_011',
    year: 1956,
    prompt: 'Which commission became a statutory body by an Act of November 1956 to fund and coordinate universities?',
    choices: ['University Grants Commission', 'AICTE', 'NCERT', 'CSIR'],
    correctIndex: 0,
    explanation: 'The UGC Act, 1956 made the University Grants Commission a statutory authority.',
    theme: 'education',
  },
  {
    id: 'q1956_012',
    year: 1956,
    prompt: 'Which institute of national importance in medicine was established by an Act of 1956?',
    choices: ['AIIMS New Delhi', 'PGIMER Chandigarh', 'JIPMER Puducherry', 'NIMHANS Bengaluru'],
    correctIndex: 0,
    explanation: 'The All India Institute of Medical Sciences Act, 1956 declared AIIMS an institution of national importance.',
    theme: 'health',
  },
  {
    id: 'q1956_013',
    year: 1956,
    prompt: 'Asia\u2019s first nuclear reactor, which went critical on 4 August 1956 at Trombay, was named what?',
    choices: ['Apsara', 'Cirus', 'Dhruva', 'Purnima'],
    correctIndex: 0,
    explanation: 'Apsara, commissioned under Homi Bhabha at the Atomic Energy Establishment, was Asia\u2019s first nuclear reactor.',
    theme: 'science',
  },
  {
    id: 'q1956_014',
    year: 1956,
    prompt: 'Which three foreign countries partnered India for the Rourkela, Bhilai and Durgapur steel plants in 1956?',
    choices: ['West Germany, USSR and UK', 'USA, France and Japan', 'UK, Canada and Australia', 'USSR, Czechoslovakia and Poland'],
    correctIndex: 0,
    explanation: 'Rourkela was built with West German, Bhilai with Soviet, and Durgapur with British collaboration in 1956.',
    theme: 'industry',
  },
  {
    id: 'q1956_015',
    year: 1956,
    prompt: 'Which economic strategy shaped the Second Five Year Plan launched in 1956?',
    choices: ['The Mahalanobis model of heavy industry', 'The Gandhian village model', 'Export-led growth', 'The Harrod-Domar export model'],
    correctIndex: 0,
    explanation: 'P.C. Mahalanobis\u2019s two-sector model emphasised heavy industry and formed the core of the 1956 plan.',
    theme: 'economy',
  },
  {
    id: 'q1956_016',
    year: 1956,
    prompt: 'B.R. Ambedkar embraced which religion on 14 October 1956 at Nagpur?',
    choices: ['Buddhism', 'Jainism', 'Sikhism', 'Christianity'],
    correctIndex: 0,
    explanation: 'Ambedkar converted to Buddhism (Navayana) in October 1956, weeks before his death on 6 December 1956.',
    theme: 'society',
  },
  {
    id: 'q1956_017',
    year: 1956,
    prompt: 'At which film festival did Satyajit Ray\u2019s Pather Panchali win Best Human Document in 1956?',
    choices: ['Cannes', 'Venice', 'Berlin', 'Karloy Vary'],
    correctIndex: 0,
    explanation: 'Pather Panchali won the Best Human Document award at the 1956 Cannes Film Festival.',
    theme: 'culture',
  },
  {
    id: 'q1956_018',
    year: 1956,
    prompt: 'India won which medal in men\u2019s hockey at the 1956 Melbourne Olympics?',
    choices: ['Gold', 'Silver', 'Bronze', 'No medal'],
    correctIndex: 0,
    explanation: 'India beat Pakistan 1-0 in the final for a sixth consecutive Olympic hockey gold in 1956.',
    theme: 'sports',
  },
  {
    id: 'q1956_019',
    year: 1956,
    prompt: 'The 2,500th birth anniversary of which figure was marked by India with year-long celebrations in 1956?',
    choices: ['Gautama Buddha', 'Mahavira', 'Ashoka', 'Chanakya'],
    correctIndex: 0,
    explanation: 'India celebrated the 2,500th Buddha Jayanti in 1956, which the Dalai Lama attended in November.',
    theme: 'culture',
  },
  {
    id: 'q1956_020',
    year: 1956,
    prompt: 'The Khadi and Village Industries Commission was established as a statutory body by an Act of which year?',
    choices: ['1956', '1952', '1960', '1948'],
    correctIndex: 0,
    explanation: 'The KVIC Act was passed in 1956 and the commission began functioning in 1957.',
    theme: 'economy',
  },

  // ---------------- 1957 ----------------
  {
    id: 'q1957_001',
    year: 1957,
    prompt: 'India\u2019s second general elections were held in which year?',
    choices: ['1957', '1952', '1962', '1955'],
    correctIndex: 0,
    explanation: 'The second Lok Sabha elections took place in March-April 1957.',
    theme: 'politics',
  },
  {
    id: 'q1957_002',
    year: 1957,
    prompt: 'Who became the first elected communist chief minister in India (Kerala, April 1957)?',
    choices: ['E.M.S. Namboodiripad', 'A.K. Gopalan', 'Jyoti Basu', 'P. Sundarayya'],
    correctIndex: 0,
    explanation: 'E.M.S. Namboodiripad led the CPI to victory and headed the first elected communist government in Kerala from 5 April 1957.',
    theme: 'politics',
  },
  {
    id: 'q1957_003',
    year: 1957,
    prompt: 'India introduced decimal coinage on 1 April 1957 with what new unit?',
    choices: ['Naya paisa', 'Anna', 'Pice', 'Rupee-paisa'],
    correctIndex: 0,
    explanation: 'The Indian Coinage Act made 100 naya paise equal one rupee from 1 April 1957.',
    theme: 'economy',
  },
  {
    id: 'q1957_004',
    year: 1957,
    prompt: 'Which committee reported in 1957 recommending three-tier Panchayati Raj?',
    choices: ['Balwant Rai Mehta Committee', 'Ashok Mehta Committee', 'G.V.K. Rao Committee', 'L.M. Singhvi Committee'],
    correctIndex: 0,
    explanation: 'The Balwant Rai Mehta Committee (1957) proposed democratic decentralisation through a three-tier structure.',
    theme: 'governance',
  },
  {
    id: 'q1957_005',
    year: 1957,
    prompt: 'Which space milestone occurred on 4 October 1957, watched closely by Indian scientists?',
    choices: ['Sputnik 1, the first artificial satellite', 'First human in space', 'First Moon probe', 'First space station'],
    correctIndex: 0,
    explanation: 'The USSR launched Sputnik 1 on 4 October 1957, the first artificial satellite.',
    theme: 'science',
  },
  {
    id: 'q1957_006',
    year: 1957,
    prompt: 'The Treaty of Rome, signed 25 March 1957, created which body?',
    choices: ['The European Economic Community', 'The United Nations', 'NATO', 'The British Commonwealth'],
    correctIndex: 0,
    explanation: 'The 1957 Treaty of Rome established the EEC, forerunner of the European Union.',
    theme: 'world',
  },
  {
    id: 'q1957_007',
    year: 1957,
    prompt: 'Which African nation became the first sub-Saharan colony to gain independence, on 6 March 1957?',
    choices: ['Ghana', 'Kenya', 'Nigeria', 'Uganda'],
    correctIndex: 0,
    explanation: 'Ghana, under Kwame Nkrumah, became independent from Britain on 6 March 1957.',
    theme: 'world',
  },
  {
    id: 'q1957_008',
    year: 1957,
    prompt: 'Which 1957 film was India\u2019s first submission to reach the Academy Awards Best Foreign Language Film shortlist?',
    choices: ['Mother India', 'Pather Panchali', 'Do Aankhen Barah Haath', 'Pyasa'],
    correctIndex: 0,
    explanation: 'Mehboob Khan\u2019s Mother India (1957), starring Nargis, was nominated for the Oscar in 1958.',
    theme: 'culture',
  },
  {
    id: 'q1957_009',
    year: 1957,
    prompt: 'Which Satyajit Ray film won the Golden Lion at Venice in 1957?',
    choices: ['Aparajito', 'Pather Panchali', 'The World of Apu', 'Jalsaghar'],
    correctIndex: 0,
    explanation: 'Aparajito (1956) won the Golden Lion at the 1957 Venice Film Festival.',
    theme: 'culture',
  },
  {
    id: 'q1957_010',
    year: 1957,
    prompt: 'Which pandemic, named for its first observed region, spread worldwide beginning in 1957?',
    choices: ['Asian flu (H2N2)', 'Spanish flu', 'Hong Kong flu', 'Swine flu'],
    correctIndex: 0,
    explanation: 'The 1957-58 Asian flu (H2N2) pandemic caused roughly a million deaths worldwide.',
    theme: 'health',
  },
  {
    id: 'q1957_011',
    year: 1957,
    prompt: 'Malaya (later Malaysia) gained independence from Britain on which date in 1957?',
    choices: ['31 August 1957', '15 August 1957', '26 January 1957', '2 June 1957'],
    correctIndex: 0,
    explanation: 'The Federation of Malaya became independent on 31 August 1957.',
    theme: 'world',
  },
  {
    id: 'q1957_012',
    year: 1957,
    prompt: 'The Khadi and Village Industries Commission began functioning as a statutory body in which year?',
    choices: ['1957', '1956', '1960', '1953'],
    correctIndex: 0,
    explanation: 'The KVIC Act passed in 1956 and the commission began operating in 1957.',
    theme: 'economy',
  },
  {
    id: 'q1957_013',
    year: 1957,
    prompt: 'Which V. Shantaram film won the Silver Bear (Best Director) at the 1957 Berlin Film Festival?',
    choices: ['Do Aankhen Barah Haath', 'Jhanak Jhanak Payal Baje', 'Navrang', 'Dr. Kotnis Ki Amar Kahani'],
    correctIndex: 0,
    explanation: 'Do Aankhen Barah Haath won the Silver Bear for Best Director at Berlin in 1957.',
    theme: 'culture',
  },
  {
    id: 'q1957_014',
    year: 1957,
    prompt: 'In the 1957 general elections, how many seats did the Lok Sabha contest?',
    choices: ['494', '543', '489', '520'],
    correctIndex: 0,
    explanation: 'The second Lok Sabha (1957) had 494 elected seats.',
    theme: 'politics',
  },
  {
    id: 'q1957_015',
    year: 1957,
    prompt: 'Which Chinese infrastructure project completed through Aksai Chang in 1957 later affected India-China relations?',
    choices: ['The Xinjiang-Tibet road', 'The Three Gorges dam', 'The Qinghai railway', 'The Karakoram highway'],
    correctIndex: 0,
    explanation: 'China completed the Xinjiang-Tibet highway through Aksai Chin in 1957, a key point in later border disputes.',
    theme: 'politics',
  },

  // ---------------- Other supported years (seed) ----------------
  {
    id: 'q1950_001',
    year: 1950,
    prompt: 'The Constitution of India came into force on which date?',
    choices: ['26 January 1950', '15 August 1947', '26 November 1949', '2 October 1950'],
    correctIndex: 0,
    explanation: 'The Constitution took effect on 26 January 1950, now celebrated as Republic Day.',
    theme: 'constitution',
  },
  {
    id: 'q1950_002',
    year: 1950,
    prompt: 'Who became the first President of India in 1950?',
    choices: ['Rajendra Prasad', 'Jawaharlal Nehru', 'S. Radhakrishnan', 'V.V. Giri'],
    correctIndex: 0,
    explanation: 'Dr. Rajendra Prasad was elected the first President of India in January 1950.',
    theme: 'politics',
  },
  {
    id: 'q1950_003',
    year: 1950,
    prompt: 'The Election Commission of India was established on 25 January 1950 under whom?',
    choices: ['Sukumar Sen', 'T.N. Seshan', 'K.V.K. Sundaram', 'B.B. Lyngdoh'],
    correctIndex: 0,
    explanation: 'The ECI was set up on 25 January 1950; Sukumar Sen became its first Chief Election Commissioner.',
    theme: 'governance',
  },
  {
    id: 'q1950_004',
    year: 1950,
    prompt: 'Which body was set up on 15 March 1950 to plan India\u2019s economic development?',
    choices: ['The Planning Commission', 'NITI Aayog', 'The Finance Commission', 'The National Development Council'],
    correctIndex: 0,
    explanation: 'The Planning Commission was established in March 1950 with Nehru as chairman.',
    theme: 'economy',
  },
  {
    id: 'q1950_005',
    year: 1950,
    prompt: 'Sardar Vallabhbhai Patel, India\u2019s first Deputy Prime Minister, died on which date in 1950?',
    choices: ['15 December 1950', '26 January 1950', '30 January 1950', '2 October 1950'],
    correctIndex: 0,
    explanation: 'Sardar Patel died on 15 December 1950 in Mumbai.',
    theme: 'politics',
  },
  {
    id: 'q1950_006',
    year: 1950,
    prompt: 'Which war began on 25 June 1950, in which India later chaired the UNCIP mediation efforts?',
    choices: ['The Korean War', 'The Vietnam War', 'The Sino-Japanese War', 'The Afghan War'],
    correctIndex: 0,
    explanation: 'North Korea invaded South Korea in June 1950; India later chaired the UN commission on Korea.',
    theme: 'world',
  },
  {
    id: 'q1951_001',
    year: 1951,
    prompt: 'The First Five Year Plan was launched in which year?',
    choices: ['1951', '1950', '1956', '1947'],
    correctIndex: 0,
    explanation: 'The First Five Year Plan began on 1 April 1951, prioritising agriculture.',
    theme: 'economy',
  },
  {
    id: 'q1951_002',
    year: 1951,
    prompt: 'Which was the first Indian Institute of Technology, founded in 1951?',
    choices: ['IIT Kharagpur', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur'],
    correctIndex: 0,
    explanation: 'IIT Kharagpur was the first IIT, established in 1951 in West Bengal.',
    theme: 'education',
  },
  {
    id: 'q1951_003',
    year: 1951,
    prompt: 'Which was the first city to host the Asian Games, in March 1951?',
    choices: ['New Delhi', 'Tokyo', 'Manila', 'Bangkok'],
    correctIndex: 0,
    explanation: 'The first Asian Games were held in New Delhi in March 1951.',
    theme: 'sports',
  },
  {
    id: 'q1951_004',
    year: 1951,
    prompt: 'The Seventeen Point Agreement, signed in May 1951, concerned which region?',
    choices: ['Tibet', 'Kashmir', 'Goa', 'Sikkim'],
    correctIndex: 0,
    explanation: 'China and Tibet signed the Seventeen Point Agreement in May 1951.',
    theme: 'world',
  },
  {
    id: 'q1952_001',
    year: 1952,
    prompt: 'India\u2019s first general elections, held between October 1951 and February 1952, produced which Lok Sabha?',
    choices: ['The first Lok Sabha', 'The second Lok Sabha', 'The Constituent Assembly', 'The Rajya Sabha'],
    correctIndex: 0,
    explanation: 'The 1951-52 elections formed the first Lok Sabha under universal adult franchise.',
    theme: 'politics',
  },
  {
    id: 'q1952_002',
    year: 1952,
    prompt: 'Which country launched the world\u2019s first national family planning programme in 1952?',
    choices: ['India', 'Sweden', 'Japan', 'USA'],
    correctIndex: 0,
    explanation: 'India launched the world\u2019s first official national family planning programme in 1952.',
    theme: 'health',
  },
  {
    id: 'q1952_003',
    year: 1952,
    prompt: 'Potti Sriramulu died on 15 December 1952 after fasting for which cause?',
    choices: ['A separate Andhra state', 'A separate Kerala state', 'Hindi as official language', 'Goa\u2019s liberation'],
    correctIndex: 0,
    explanation: 'His death after a 58-day fast triggered the creation of Andhra State in 1953.',
    theme: 'states-reorganisation',
  },
  {
    id: 'q1953_001',
    year: 1953,
    prompt: 'Who reached the summit of Mount Everest on 29 May 1953?',
    choices: ['Edmund Hillary and Tenzing Norgay', 'George Mallory and Andrew Irvine', 'Tenzing Norgay alone', 'Maurice Wilson'],
    correctIndex: 0,
    explanation: 'Hillary and Tenzing summited Everest on 29 May 1953.',
    theme: 'exploration',
  },
  {
    id: 'q1953_002',
    year: 1953,
    prompt: 'Which was the first Indian state created on a linguistic basis, on 1 October 1953?',
    choices: ['Andhra State', 'Kerala', 'Tamil Nadu', 'Karnataka'],
    correctIndex: 0,
    explanation: 'Andhra State was carved out of Madras in October 1953 after Potti Sriramulu\u2019s fast.',
    theme: 'states-reorganisation',
  },
  {
    id: 'q1953_003',
    year: 1953,
    prompt: 'Which scientists published the double-helix structure of DNA in April 1953?',
    choices: ['Watson and Crick', 'Mendel and Darwin', 'Rosalind Franklin alone', 'Pasteur and Koch'],
    correctIndex: 0,
    explanation: 'James Watson and Francis Crick published the DNA double helix in Nature in April 1953.',
    theme: 'science',
  },
  {
    id: 'q1953_004',
    year: 1953,
    prompt: 'The Korean War armistice was signed on which date in 1953?',
    choices: ['27 July 1953', '25 June 1953', '1 May 1953', '11 November 1953'],
    correctIndex: 0,
    explanation: 'The armistice ending the Korean War was signed on 27 July 1953.',
    theme: 'world',
  },
  {
    id: 'q1954_001',
    year: 1954,
    prompt: 'The Panchsheel Agreement between India and China was signed on which date in 1954?',
    choices: ['29 April 1954', '26 January 1954', '15 August 1954', '2 October 1954'],
    correctIndex: 0,
    explanation: 'Nehru and Zhou Enlai signed the Panchsheel Agreement on 29 April 1954.',
    theme: 'diplomacy',
  },
  {
    id: 'q1954_002',
    year: 1954,
    prompt: 'Who were the first recipients of the Bharat Ratna, instituted in January 1954?',
    choices: ['Rajagopalachari, Radhakrishnan and C.V. Raman', 'Nehru, Patel and Bhandari', 'Prasad, Nehru and Gandhi', 'Bhabha, Raman and Bose'],
    correctIndex: 0,
    explanation: 'C. Rajagopalachari, S. Radhakrishnan and C.V. Raman received the first Bharat Ratna in 1954.',
    theme: 'awards',
  },
  {
    id: 'q1954_003',
    year: 1954,
    prompt: 'The Battle of Dien Bien Phu, which ended French rule in Indochina, concluded in May of which year?',
    choices: ['1954', '1953', '1956', '1950'],
    correctIndex: 0,
    explanation: 'Viet Minh forces defeated France at Dien Bien Phu in May 1954.',
    theme: 'world',
  },
  {
    id: 'q1955_001',
    year: 1955,
    prompt: 'The Bandung Conference of Afro-Asian nations was held in April 1955 in which country?',
    choices: ['Indonesia', 'India', 'Burma', 'Ceylon'],
    correctIndex: 0,
    explanation: 'The Bandung Conference took place in Bandung, Indonesia, 18-24 April 1955; Nehru was a key participant.',
    theme: 'diplomacy',
  },
  {
    id: 'q1955_002',
    year: 1955,
    prompt: 'The State Bank of India was created on 1 July 1955 from which predecessor?',
    choices: ['Imperial Bank of India', 'Bank of Hindustan', 'Reserve Bank of India', 'Allahabad Bank'],
    correctIndex: 0,
    explanation: 'The State Bank of India Act, 1955 nationalised the Imperial Bank to form SBI.',
    theme: 'economy',
  },
  {
    id: 'q1955_003',
    year: 1955,
    prompt: 'The Hindu Marriage Act, the first of the Hindu Code Bills, was enacted in which year?',
    choices: ['1955', '1956', '1952', '1960'],
    correctIndex: 0,
    explanation: 'The Hindu Marriage Act was passed in May 1955; other code acts followed in 1956.',
    theme: 'law',
  },
  {
    id: 'q1955_004',
    year: 1955,
    prompt: 'Which scientist, who developed the theory of relativity, died in April 1955?',
    choices: ['Albert Einstein', 'Isaac Newton', 'Niels Bohr', 'Max Planck'],
    correctIndex: 0,
    explanation: 'Albert Einstein died on 18 April 1955.',
    theme: 'science',
  },
  {
    id: 'q1958_001',
    year: 1958,
    prompt: 'Mihir Sen became the first Indian to swim which channel in September 1958?',
    choices: ['The English Channel', 'The Palk Strait', 'The Gibraltar Strait', 'The Bering Strait'],
    correctIndex: 0,
    explanation: 'Mihir Sen crossed the English Channel on 27 September 1958.',
    theme: 'sports',
  },
  {
    id: 'q1958_002',
    year: 1958,
    prompt: 'Which space agency was created by an Act signed on 29 July 1958?',
    choices: ['NASA', 'ISRO', 'ESA', 'Roscosmos'],
    correctIndex: 0,
    explanation: 'The U.S. National Aeronautics and Space Act created NASA in July 1958.',
    theme: 'science',
  },
  {
    id: 'q1958_003',
    year: 1958,
    prompt: 'India\u2019s Defence Research and Development Organisation (DRDO) was formed in which year?',
    choices: ['1958', '1956', '1962', '1950'],
    correctIndex: 0,
    explanation: 'DRDO was established in August 1958 by merging the Technical Development Establishment and the Directorate of Technical Development.',
    theme: 'defence',
  },
  {
    id: 'q1959_001',
    year: 1959,
    prompt: 'The first elected communist government in Kerala was dismissed under President\u2019s rule in which year?',
    choices: ['1959', '1957', '1961', '1965'],
    correctIndex: 0,
    explanation: 'The Namboodiripad government was dismissed on 31 July 1959 under Article 356.',
    theme: 'politics',
  },
  {
    id: 'q1959_002',
    year: 1959,
    prompt: 'Which event, beginning 10 March 1959, caused the Dalai Lama to flee to India?',
    choices: ['The Tibetan uprising in Lhasa', 'The Korean War', 'The Sino-Indian War', 'The Bangladesh liberation war'],
    correctIndex: 0,
    explanation: 'The 1959 Tibetan uprising led the Dalai Lama to seek asylum in India in April 1959.',
    theme: 'politics',
  },
  {
    id: 'q1959_003',
    year: 1959,
    prompt: 'Which island group was the site of the first Indian Antarctica? (choose the correct 1959 event)',
    choices: ['The Antarctic Treaty was signed on 1 December 1959', 'India joined the UN', 'India hosted the Olympics', 'The SAARC charter was signed'],
    correctIndex: 0,
    explanation: 'The Antarctic Treaty was signed in Washington on 1 December 1959.',
    theme: 'world',
  },
];

/** All distinct years that currently have questions in the bank, sorted ascending. */
export function getYearsWithQuestions(): number[] {
  return Array.from(new Set(YEAR_DUEL_QUESTIONS.map((q) => q.year))).sort((a, b) => a - b);
}

/** Exact-year filter. Never falls back to another year. */
export function getQuestionsForYear(year: number): YearDuelQuestion[] {
  return YEAR_DUEL_QUESTIONS.filter((q) => q.year === year);
}

export function hasYearQuestions(year: number): boolean {
  return YEAR_DUEL_QUESTIONS.some((q) => q.year === year);
}

/**
 * Shuffle a question's answer choices for presentation using Fisher-Yates.
 * The canonical stored question is never mutated: a copy is returned with
 * recalculated correctIndex. Call on every display so the correct option's
 * position is never predictable.
 */
export function shuffleYearQuestionChoices(question: YearDuelQuestion): YearDuelQuestion {
  const paired = question.choices.map((choice, index) => ({
    choice,
    isCorrect: index === question.correctIndex,
  }));
  for (let i = paired.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = paired[i];
    paired[i] = paired[j];
    paired[j] = tmp;
  }
  return {
    ...question,
    choices: paired.map((item) => item.choice),
    correctIndex: paired.findIndex((item) => item.isCorrect),
  };
}

/**
 * Initial-phase selection: filter by exact year, remove used IDs, pick a
 * random unused question. Returns undefined when the pool is exhausted
 * (no silent fallback to other years or decade/empire data).
 */
export function pickYearDuelQuestion(
  year: number,
  usedQuestionIds: string[],
): YearDuelQuestion | undefined {
  const pool = getQuestionsForYear(year).filter((q) => !usedQuestionIds.includes(q.id));
  if (pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Retry-phase selection: only questions currently in incorrectQuestionIds
 * are eligible. No new questions are introduced during retry.
 */
export function pickRetryDuelQuestion(
  year: number,
  incorrectQuestionIds: string[],
): YearDuelQuestion | undefined {
  const pool = getQuestionsForYear(year).filter((q) => incorrectQuestionIds.includes(q.id));
  if (pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
}
