<script>
  // hier brauchst du aktuell nichts im Script
</script>

<main class="home">
  <section class="hero">
    <div class="hero-text">
      <h1>Willkommen bei <span>Pianly</span></h1>
      <p>
        Deine persönliche Piano-App: Finde passende Songs, lass dir 
        YouTube-Tutorials anzeigen und entdecke neue Stücke mit dem Zufallsmodus.
      </p>

      <div class="hero-actions">
        <a href="/songs" class="btn primary">🎵 Songs entdecken</a>
        <a href="/randomizer" class="btn secondary">🎲 Zufallssong</a>
      </div>

      <p class="hero-subtext">
        Für Anfänger bis Fortgeschrittene – lerne Klavier mit echten Songs,
        nicht nur trockenen Übungen.
      </p>
    </div>

    <div class="hero-card">
      <div class="hero-card-header">
        <span class="pill">Empfohlener Song</span>
        <h2>River Flows In You</h2>
        <p class="card-artist">von Yiruma</p>
      </div>

      <div class="hero-card-body">
        <p><strong>Schwierigkeit:</strong> Beginner – Intermediate</p>
        <p><strong>Style:</strong> Modern Classic</p>
        <p class="card-note">
          „Perfekt, um mit gefühlvollen Melodien und schöner Dynamik zu starten.“
        </p>
      </div>

      <div class="hero-card-footer">
        <a href="/songs" class="btn small">Songliste ansehen</a>
      </div>
    </div>
  </section>

  <section class="features">
    <h2>Warum Pianly?</h2>

    <div class="feature-grid">
      <div class="feature-card">
        <h3>Übersichtliche Songliste</h3>
        <p>
          Alle Songs auf einen Blick mit Titel, Künstler und Schwierigkeitsgrad.
          Du findest schnell das Stück, das zu dir passt.
        </p>
      </div>

      <div class="feature-card">
        <h3>Song-Details & Tutorials</h3>
        <p>
          Zu jedem Song bekommst du Detailinfos und einen direkten 
          YouTube-Link, um dir das Stück am Klavier anzusehen.
        </p>
      </div>

      <div class="feature-card">
        <h3>Randomizer-Modus</h3>
        <p>
          Keine Ahnung, was du spielen sollst? Lass Pianly entscheiden und
          entdecke neue Songs per Zufall.
        </p>
      </div>
    </div>
  </section>
</main>

<style>
/* Gesamtbereich der Startseite */
.home {
  min-height: calc(100vh - 80px); /* ungefähr: Höhe minus Navbar */
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #a28dfe 0%, #c9bbff 40%, #f5ecff 100%);
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;
}

.hero-text {
  max-width: 550px;
  color: #1a102f;
}

.hero-text h1 {
  font-size: 2.7rem;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.hero-text h1 span {
  color: #000;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.hero-text p {
  font-size: 1.05rem;
  margin-bottom: 1.2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.hero-subtext {
  font-size: 0.95rem;
  opacity: 0.9;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  border: none;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.98rem;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.btn.primary {
  background: #000;
  color: #fff;
  box-shadow: 0 8px 18px rgba(0,0,0,0.4);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.5);
}

.btn.secondary {
  background: rgba(255,255,255,0.85);
  color: #1a102f;
  box-shadow: 0 6px 14px rgba(0,0,0,0.2);
}

.btn.secondary:hover {
  background: #fff;
  transform: translateY(-2px);
}

.btn.small {
  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
}

/* Hero Card rechts */
.hero-card {
  background: rgba(0,0,0,0.88);
  color: #ffffff;
  border-radius: 1.5rem;
  padding: 1.6rem 1.8rem;
  max-width: 360px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-card-header h2 {
  margin: 0.4rem 0 0.2rem;
}

.card-artist {
  font-size: 0.95rem;
  opacity: 0.8;
}

.pill {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: #a28dfe;
  color: #000;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.hero-card-body p {
  margin: 0.15rem 0;
  font-size: 0.95rem;
}

.card-note {
  margin-top: 0.4rem;
  font-style: italic;
  opacity: 0.9;
}

.hero-card-footer {
  display: flex;
  justify-content: flex-end;
}

/* Features Section */
.features {
  background: rgba(0, 0, 0, 0.9);
  border-radius: 1.5rem;
  padding: 2rem 1.8rem;
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}

.features h2 {
  text-align: center;
  margin-bottom: 1.8rem;
  font-size: 1.8rem;
  color: #ffffff;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: #a28dfe;
  border-radius: 1.1rem;
  padding: 1.3rem 1.2rem;
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
}

.feature-card h3 {
  margin-bottom: 0.6rem;
  font-size: 1.1rem;
  color: black;
}

.feature-card p {
  font-size: 0.95rem;
  line-height: 1.4;
  color: black;
}

/* Responsive */
@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-card {
    align-self: stretch;
  }

  .home {
    padding: 2.5rem 1.5rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
