<script>
  export let data;

  let currentSong = null;
  let lastIndex = -1;
  let isRevealing = false;

  function shuffle() {
    const list = data.songs;
    if (!list || list.length === 0) return;

    let idx;
    do {
      idx = Math.floor(Math.random() * list.length);
    } while (list.length > 1 && currentSong && list[idx]._id === currentSong._id);

    lastIndex = idx;
    currentSong = list[idx];

    isRevealing = false;
    setTimeout(() => {
      isRevealing = true;
    }, 10);
  }

  function closeReveal() {
    isRevealing = false;
  }
</script>


<main class="rand-page">
  <section class="rand-shell">
    <header class="rand-header">
      <h1>Song Randomizer</h1>
      <p>
        Lass Pianly einen zufälligen Song für dich auswählen.
        Perfekt, wenn du nicht weißt, was du als Nächstes spielen sollst.
      </p>
    </header>

    <div class="rand-center">
      <button class="shuffle-btn" on:click={shuffle}>
        <span class="icon">🎶</span>
        <span>{currentSong ? "Nochmal mischen" : "Zufälligen Song wählen"}</span>
      </button>

      <p class="shuffle-hint">
        Beim Shuffle wird einer deiner gespeicherten Songs zufällig ausgewählt
        und stilvoll eingeblendet.
      </p>
    </div>

    {#if currentSong}
      <section class="last-result">
        <h2>Zuletzt gewählter Song</h2>

        <article class="song-card">
          <div class="song-main">
            <div class="song-cover">
              {#if currentSong.image_url}
                <img src={currentSong.image_url} alt={`Cover von ${currentSong.title}`} loading="lazy" />
              {:else}
                <div class="song-cover-fallback">♪</div>
              {/if}
            </div>

            <div class="song-text">
              <p class="label">Zufälliger Song</p>
              <h3>{currentSong.title}</h3>
              <p class="artist">{currentSong.artist}</p>

              <div class="badges">
                {#if currentSong.difficulty}
                  <span class={`pill pill-diff pill-${currentSong.difficulty.toLowerCase()}`}>
                    {currentSong.difficulty}
                  </span>
                {/if}
                {#if currentSong.genre}
                  <span class="pill pill-genre">{currentSong.genre}</span>
                {/if}
                {#if currentSong.duration}
                  <span class="pill pill-duration">{currentSong.duration}</span>
                {/if}
              </div>
            </div>
          </div>

          <div class="song-actions">
            <!-- hier nur Details; Favoriten kannst du später wie auf /songs einbauen -->
            <a href={`/songs/${currentSong.slug}`} class="details-btn">
              Song-Details ansehen
            </a>
          </div>
        </article>
      </section>
    {/if}
  </section>

  {#if isRevealing && currentSong}
    <!-- Shuffle Reveal Overlay -->
    <div class="reveal-overlay" on:click={closeReveal}>
      <div class="reveal-card" on:click|stopPropagation>
        <p class="label">Zufälliger Song</p>
        <h2>{currentSong.title}</h2>
        <p class="artist">{currentSong.artist}</p>

        <div class="badges">
          {#if currentSong.difficulty}
            <span class={`pill pill-diff pill-${currentSong.difficulty.toLowerCase()}`}>
              {currentSong.difficulty}
            </span>
          {/if}
          {#if currentSong.genre}
            <span class="pill pill-genre">{currentSong.genre}</span>
          {/if}
          {#if currentSong.duration}
            <span class="pill pill-duration">{currentSong.duration}</span>
          {/if}
        </div>

        <p class="overlay-note">
          Klicke auf „Song-Details“, um das Tutorial & alle Infos zu sehen.
        </p>

        <div class="overlay-actions">
          <a href={`/songs/${currentSong.slug}`} class="details-btn primary">
            Song-Details öffnen
          </a>
          <button type="button" class="details-btn ghost" on:click={closeReveal}>
            Schließen
          </button>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
.rand-page {
  min-height: calc(100vh - 80px);
  padding: 2.5rem 2rem;
  background: radial-gradient(circle at top, #f5ecff 0%, #c9bbff 40%, #a28dfe 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.rand-shell {
  max-width: 900px;
  width: 100%;
  background: rgba(0, 0, 0, 0.94);
  color: #fefefe;
  border-radius: 1.8rem;
  padding: 1.9rem 1.9rem 2.2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.rand-header h1 {
  font-size: 2rem;
  margin-bottom: 0.2rem;
}

.rand-header p {
  font-size: 0.95rem;
  opacity: 0.9;
}

/* Shuffle Button Center */
.rand-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin-top: 0.3rem;
}

.shuffle-btn {
  padding: 0.8rem 1.9rem;
  border-radius: 999px;
  border: none;
  background: #fefefe;
  color: #111;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.7);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
}

.shuffle-btn .icon {
  font-size: 1.2rem;
}

.shuffle-btn:hover {
  transform: translateY(-1px);
  background: #ffffff;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.8);
}

.shuffle-hint {
  font-size: 0.85rem;
  opacity: 0.8;
}

/* Last result card */
.last-result h2 {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
}

.song-card {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 1.1rem;
  padding: 1rem 1.1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.song-main {
  display: flex;
  gap: 1rem;
}

.song-cover {
  width: 72px;
  height: 72px;
  border-radius: 0.9rem;
  overflow: hidden;
  background: linear-gradient(135deg, #a28dfe, #c2b2ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.song-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-cover-fallback {
  font-size: 2rem;
  font-weight: 700;
  color: #000;
}

.song-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.song-text .label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.7;
}

.song-text h3 {
  font-size: 1.3rem;
  margin: 0;
}

.song-text .artist {
  font-size: 0.95rem;
  color: #e0e7ff;
}

/* Badges */
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.2rem;
}

.pill {
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.pill-genre {
  background: rgba(255, 255, 255, 0.06);
}

.pill-duration {
  background: rgba(0, 0, 0, 0.6);
}

.pill-diff {
  text-transform: capitalize;
}

.pill-beginner {
  background: rgba(52, 211, 153, 0.18);
  border-color: rgba(52, 211, 153, 0.7);
  color: #a7f3d0;
}

.pill-intermediate {
  background: rgba(129, 140, 248, 0.2);
  border-color: rgba(129, 140, 248, 0.8);
  color: #e0e7ff;
}

.pill-advanced {
  background: rgba(248, 113, 113, 0.2);
  border-color: rgba(248, 113, 113, 0.8);
  color: #fecaca;
}

/* Actions */
.song-actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.details-btn {
  padding: 0.45rem 1.2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  color: #111;
  background: #f5f5f5;
  transition: background 0.15s ease, transform 0.1s ease;
}

.details-btn:hover {
  background: #ffffff;
  transform: translateY(-1px);
}

/* Overlay (Shuffle Reveal) */
.reveal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.6);
  backdrop-filter: blur(14px) brightness(0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: overlayFadeIn 0.25s ease-out;
  z-index: 50;
}

.reveal-card {
  background: radial-gradient(circle at top left, #1e293b 0%, #020617 70%);
  border-radius: 1.4rem;
  padding: 1.4rem 1.6rem 1.6rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.9),
              0 0 40px rgba(162, 141, 254, 0.5);
  max-width: 420px;
  width: 90%;
  text-align: left;
  animation: cardRevealIn 0.4s ease-out forwards;
  border: 1px solid rgba(148, 163, 184, 0.5);
}

.reveal-card .label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.75;
}

.reveal-card h2 {
  font-size: 1.7rem;
  margin-top: 0.4rem;
  margin-bottom: 0.1rem;
}

.reveal-card .artist {
  font-size: 1rem;
  color: #e5e7eb;
  margin-bottom: 0.7rem;
}

.overlay-note {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-top: 0.7rem;
}

.overlay-actions {
  margin-top: 0.9rem;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.details-btn.primary {
  background: #a28dfe;
  color: #000;
}

.details-btn.primary:hover {
  background: #b6a6ff;
}

.details-btn.ghost {
  background: transparent;
  color: #f9fafb;
  border: 1px solid rgba(148, 163, 184, 0.7);
}

.details-btn.ghost:hover {
  background: rgba(148, 163, 184, 0.15);
}

/* Animations */
@keyframes overlayFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes cardRevealIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  70% {
    opacity: 1;
    transform: translateY(0) scale(1.02);
  }
  to {
    transform: translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 700px) {
  .rand-page {
    padding: 2rem 1rem;
  }

  .rand-shell {
    padding: 1.6rem 1.3rem 1.9rem;
  }

  .song-main {
    flex-direction: row;
  }
}
</style>
