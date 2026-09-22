'use client';

import { useState } from 'react';

type TimeWindow = { period: string; eyebrow: string; description: string; events: string[]; tone: string };

const timeWindows: TimeWindow[] = [
  { period: '1890–1900', eyebrow: 'Late colonial India', description: 'Reform, famine, public health, education, and Adivasi resistance.', events: ['Indian Councils Act, 1890', 'Indian Famine of 1896–97', 'Birsa Munda’s Ulgulan'], tone: 'archive-card--umber' },
  { period: '1940–1950', eyebrow: 'War, freedom, and a new republic', description: 'Independence, partition, social movements, and constitutional change.', events: ['Quit India Movement', 'Independence and Partition', 'Adoption of the Constitution of India'], tone: 'archive-card--ink' },
  { period: '2010–2020', eyebrow: 'Contemporary India', description: 'Rights, federal change, digital infrastructure, and scientific achievement.', events: ['Mars Orbiter Mission Launch', 'Unified Payments Interface Launch', 'Chandrayaan-2 Launch'], tone: 'archive-card--sage' },
];

const sources = ['National Archives of India', 'Parliament of India', 'India Code', 'Indian Space Research Organisation', 'Reserve Bank of India', 'Census of India', 'Ministry of Culture'];

export default function Home() {
  const [activeWindow, setActiveWindow] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const selected = timeWindows[activeWindow];
  const closeMenu = () => setMenuOpen(false);

  return <main>
    <nav className="site-nav" aria-label="Main navigation">
      <a className="wordmark" href="#top" aria-label="Akhyana home">AKHYANA<span>.</span></a>
      <div className="nav-links"><a href="#approach">Approach</a><a href="#explore">Explore</a><a href="#play">Games</a><a href="#sources">Sources</a></div>
      <a className="nav-cta" href="#explore">Enter Akhyana <span>↗</span></a>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
      {menuOpen && <div id="mobile-menu" className="mobile-menu"><a href="#approach" onClick={closeMenu}>Approach</a><a href="#explore" onClick={closeMenu}>Explore</a><a href="#play" onClick={closeMenu}>Games</a><a href="#sources" onClick={closeMenu}>Sources</a></div>}
    </nav>

    <section id="top" className="hero section-shell">
      <div className="hero-copy"><p className="eyebrow">Indian history, experienced</p><h1>Experience history.<br /><em>Don&apos;t just</em> memorise it.</h1><p className="lede">Akhyana transforms Indian history into interactive learning experiences through stories, visual exploration, challenges, games and evidence-backed knowledge.</p><div className="hero-actions"><a className="button button--dark" href="#explore">Explore Akhyana <span>↓</span></a><a className="text-link" href="#approach">See how it works <span>→</span></a></div></div>
      <div className="hero-art" aria-label="Editorial illustration inspired by an archival historical study"><div className="sun-disc" /><div className="hero-grain" /><div className="archive-label"><span>01 / A closer look</span><strong>Indian Councils<br />Act, 1890</strong><small>Representation, contested</small></div><div className="map-lines"><i /><i /><i /><i /></div><div className="hero-caption">An event is never only a date.<br />It is a place, a choice, and a consequence.</div><div className="hero-index">1890</div></div>
    </section>

    <section className="problem-band"><div className="section-shell problem-grid"><p className="eyebrow eyebrow--light">The problem</p><div><h2>History was never meant to be a list of dates.</h2><p>When history is reduced to recall alone, people, places, context, and consequences disappear. Akhyana is designed to make room for the story around the fact.</p></div></div></section>

    <section id="approach" className="section-shell approach-section"><div className="section-heading"><p className="eyebrow">The Akhyana approach</p><h2>From facts to experience.</h2><p>Move through history with curiosity, context, and evidence at every step.</p></div><div className="approach-grid">{[['01', 'Explore', 'Choose a time window. Discover the events that shaped it.'], ['02', 'Learn', 'Choose an event and follow focused subtopics through factual content and visual storytelling.'], ['03', 'Play', 'Test your knowledge through historical games and challenges.'], ['04', 'Progress', 'Earn XP and badges as you build mastery over time.']].map(([number, title, body]) => <article className="approach-card" key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p><b>→</b></article>)}</div></section>

    <section id="explore" className="explore-section"><div className="section-shell"><div className="section-heading section-heading--wide"><p className="eyebrow">Explore through time</p><h2>Begin with a moment.</h2><p>Three curated windows offer different ways into modern Indian history.</p></div><div className="time-layout"><div className="period-tabs" role="tablist" aria-label="Time windows">{timeWindows.map((window, index) => <button key={window.period} role="tab" aria-selected={activeWindow === index} className={activeWindow === index ? 'is-active' : ''} onClick={() => setActiveWindow(index)}><span>{window.period}</span><small>{window.eyebrow}</small><i>↗</i></button>)}</div><article className={`archive-card ${selected.tone}`} aria-live="polite"><p>{selected.eyebrow}</p><h3>{selected.period}</h3><div className="archival-rule" /><span className="archive-card__note">{selected.description}</span><ul>{selected.events.map((event) => <li key={event}>{event} <b>→</b></li>)}</ul><small>Selected events from the current Akhyana collection</small></article></div></div></section>

    <section className="section-shell learning-section"><div className="learning-copy"><p className="eyebrow">Learning experience</p><h2>Follow the evidence, not just the headline.</h2><p>The Indian Councils Act, 1890 is one example of how Akhyana turns a historical event into an investigation: its setting, institutions, public response, evidence, and lasting significance.</p><div className="lens-list">{['Setting and background', 'People and organisations', 'Chronology', 'Place and region', 'Policies and institutions', 'Public response', 'Evidence and interpretation'].map((lens) => <span key={lens}>{lens}</span>)}</div></div><div className="learning-path" aria-label="Learning hierarchy"><p>How learning unfolds</p>{['Time window', 'Event', 'Subtopic', 'Factual knowledge', '2D historical films', 'Evidence & sources', 'Key takeaway'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 6 && <i>↓</i>}</div>)}</div></section>

    <section className="film-section"><div className="section-shell film-grid"><div className="film-still"><div className="film-frame"><span>AKHYANA / VISUAL STORYTELLING</span><b>Stories<br />in motion</b><i>◌</i></div></div><div><p className="eyebrow eyebrow--light">Visual storytelling</p><h2>See the story, not just the text.</h2><p>Akhyana&apos;s learning design includes short 2D historical film segments: visual explanations that can bring scenes, sequences, and maps into the learning journey.</p><p className="honesty-note">The current repository identifies these films as planned placeholder assets. They are not presented here as finished, playable videos.</p></div></div></section>

    <section id="play" className="section-shell games-section"><div className="section-heading"><p className="eyebrow">Play</p><h2>Knowledge is more memorable when it moves.</h2></div><div className="games-grid"><article className="game-card game-card--search"><div className="game-number">Game / 01</div><h3>Chrono<span>Search</span></h3><p className="game-tagline">Hunt Through History.</p><ul><li>Search for historical terms</li><li>Discover facts as you find them</li><li>Answer knowledge questions</li><li>Earn XP</li></ul><div className="word-grid" aria-hidden="true">A K H Y A<br />N A C H R<br />O N O S E<br />A R C H I</div></article><article className="game-card game-card--ludo"><div className="game-number">Game / 02</div><h3>Ludo:<br /><span>Legends of Civilization</span></h3><p className="game-tagline">Every move has a story.</p><ul><li>Choose a historical topic</li><li>Answer rapid-fire questions</li><li>Let answers influence dice movement</li><li>Face historical duels during token collisions</li><li>Earn progression through play</li></ul><div className="ludo-mark" aria-hidden="true"><i /><i /><i /><i /><b>◆</b></div></article></div></section>

    <section className="progress-section"><div className="section-shell"><div className="progress-heading"><p className="eyebrow eyebrow--light">Progress</p><h2>Make curiosity visible.</h2><span>Demo progression — persistence is not implemented in this website.</span></div><div className="progress-line"><div>Play games</div><i>↓</i><div>Learn topics</div><i>↓</i><div>Earn XP</div><i>↓</i><div>Earn badges</div><i>↓</i><div>Build mastery</div></div><div className="badge-row">{['Chrono Explorer', 'History Hunter', 'Duel Scholar', 'Topic Master'].map((badge, index) => <div className="badge" key={badge}><span>{String(index + 1).padStart(2, '0')}</span><b>{badge}</b></div>)}</div></div></section>

    <section id="sources" className="section-shell sources-section"><p className="eyebrow">Trust & sources</p><h2>History deserves sources.</h2><p>Akhyana is designed around evidence-backed historical learning. The current collection references the following institutions and official records; it does not claim partnerships or endorsements from them.</p><div className="source-list">{sources.map((source) => <span key={source}>{source}</span>)}</div></section>

    <section className="final-cta"><div className="section-shell"><p className="eyebrow eyebrow--light">Akhyana</p><h2>Experience India<br /><em>through time.</em></h2><p>Explore. Learn. Play. Remember.</p><a className="button button--light" href="#explore">Begin exploring <span>↓</span></a></div></section>
    <footer><div className="section-shell"><a className="wordmark" href="#top">AKHYANA<span>.</span></a><p>Interactive Indian history learning.</p><a href="#top">Back to top ↑</a></div></footer>
  </main>;
}
