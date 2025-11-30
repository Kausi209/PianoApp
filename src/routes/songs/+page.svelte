<script>
  export let data;

  // which tab is active? 'all' or 'favorites'
  let activeTab = 'all';

  // this will automatically update when activeTab or data.songs changes
  $: filteredSongs =
    activeTab === 'favorites'
      ? data.songs.filter((s) => s.favorite)
      : data.songs;
</script>

<main class="songs-page">
  <!-- Page header -->
  <header class="songs-header">
    <h1>Deine Songs</h1>
    <p>Wähle einen Song aus, füge ihn zu deinen Favoriten hinzu oder öffne die Detailseite.</p>
  </header>

  <!-- 🔹 THIS is the "second nav" for this page -->
  <div class="songs-subnav">
    <button
      class="subnav-btn"
      class:active={activeTab === 'all'}
      on:click={() => (activeTab = 'all')}
    >
      Alle Songs
    </button>
    <button
      class="subnav-btn"
      class:active={activeTab === 'favorites'}
      on:click={() => (activeTab = 'favorites')}
    >
      Favoriten
    </button>
  </div>

  <!-- Main list card -->
  <section class="songs-card">
    <div class="songs-card-header">
      <span>#</span>
      <span>Song</span>
      <span>Schwierigkeit</span>
      <span>Dauer</span>
      <span>Aktionen</span>
    </div>

    <div class="songs-list">
      {#each filteredSongs as song, i}
        <article class="song-row">
          <div class="song-cell index">
            {i + 1}
          </div>

          <div class="song-cell main">
            <div class="song-cover">
              {#if song.image_url}
                <img src={song.image_url} alt={`Cover von ${song.title}`} loading="lazy" />
              {:else}
                <div class="song-cover-fallback">♪</div>
              {/if}
            </div>

            <div class="song-text">
              <a class="song-title" href={`/songs/${song.slug}`}>
                {song.title}
              </a>
              <div class="song-meta">
                <span class="song-artist">{song.artist}</span>
                {#if song.genre}
                  <span class="pill pill-genre">{song.genre}</span>
                {/if}
              </div>
            </div>
          </div>

          <div class="song-cell diff">
            {#if song.difficulty}
              <span class={`pill pill-diff pill-${song.difficulty.toLowerCase()}`}>
                {song.difficulty}
              </span>
            {/if}
          </div>

          <div class="song-cell duration">
            {song.duration || "-"}
          </div>

          <div class="song-cell actions">
            <form method="POST" class="fav-form">
              <input type="hidden" name="id" value={song._id} />

              {#if song.favorite}
                <button
                  class="icon-btn favorite active"
                  formaction="?/removeFromFavorites"
                  aria-label="Aus Favoriten entfernen"
                >
                  ★
                </button>
              {:else}
                <button
                  class="icon-btn favorite"
                  formaction="?/addToFavorites"
                  aria-label="Zu Favoriten hinzufügen"
                >
                  ☆
                </button>
              {/if}
            </form>

            <a href={`/songs/${song.slug}`} class="details-btn">
              Details
            </a>
          </div>
        </article>
      {/each}

      {#if filteredSongs.length === 0}
        <div class="empty-state">
          {#if activeTab === 'favorites'}
            <p>Du hast noch keine Favoriten hinzugefügt.</p>
          {:else}
            <p>Keine Songs gefunden.</p>
          {/if}
        </div>
      {/if}
    </div>
  </section>
</main>

<style>
.songs-page {
  min-height: calc(100vh - 80px);
  padding: 2.5rem 2rem;
  background: linear-gradient(135deg, #a28dfe 0%, #c9bbff 40%, #f5ecff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
.songs-header {
  max-width: 900px;
  width: 100%;
  margin-bottom: 1.2rem;
  color: #1a102f;
}

.songs-header h1 {
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}

.songs-header p {
  opacity: 0.9;
}

/* 🔹 Tabs inside the page */
.songs-subnav {
  max-width: 900px;
  width: 100%;
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.subnav-btn {
  padding: 0.35rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
}

.subnav-btn:hover {
  background: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.subnav-btn.active {
  background: #000;
  color: #fff;
  border-color: #000;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.5);
}

/* Hauptkarte (Spotify-like Liste) */
.songs-card {
  max-width: 900px;
  width: 100%;
  background: rgba(0, 0, 0, 0.92);
  color: #f7f7f7;
  border-radius: 1.5rem;
  padding: 1.2rem 1.4rem 1.4rem;
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.5);
}

/* Headerzeile */
.songs-card-header {
  display: grid;
  grid-template-columns: 40px 3fr 1.2fr 0.8fr 1.6fr;
  padding: 0.4rem 0.6rem 0.6rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.7;
}

/* Liste + Zeilen */
.songs-list {
  margin-top: 0.4rem;
}

.song-row {
  display: grid;
  grid-template-columns: 40px 3fr 1.2fr 0.8fr 1.6fr;
  align-items: center;
  padding: 0.45rem 0.6rem;
  border-radius: 0.8rem;
  transition: background 0.15s ease, transform 0.1s ease;
}

.song-row:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-1px);
}

.song-cell {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
}

.song-cell.index {
  font-size: 0.85rem;
  opacity: 0.7;
}

.song-cell.main {
  gap: 0.75rem;
}

/* Cover/Avatar */
.song-cover {
  width: 44px;
  height: 44px;
  border-radius: 0.6rem;
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
  font-size: 1.3rem;
  font-weight: 700;
  color: #000;
}

/* Textbereich */
.song-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.song-title {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

.song-title:hover {
  text-decoration: underline;
}

.song-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.85rem;
  opacity: 0.85;
}

.song-artist {
  color: #d5d5d5;
}

/* Pills */
.pill {
  padding: 0.1rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.pill-genre {
  background: rgba(255, 255, 255, 0.06);
}

.pill-diff {
  justify-self: flex-start;
}

.pill-beginner {
  background: rgba(52, 211, 153, 0.15);
  border-color: rgba(52, 211, 153, 0.6);
  color: #a7f3d0;
}

.pill-intermediate {
  background: rgba(129, 140, 248, 0.18);
  border-color: rgba(129, 140, 248, 0.8);
  color: #e0e7ff;
}

.pill-advanced {
  background: rgba(248, 113, 113, 0.15);
  border-color: rgba(248, 113, 113, 0.7);
  color: #fecaca;
}

/* Duration */
.song-cell.duration {
  font-size: 0.9rem;
  justify-content: flex-start;
  opacity: 0.85;
}

/* Actions */
.song-cell.actions {
  justify-content: flex-end;
  gap: 0.6rem;
}

/* Favoriten-Button (Stern) */
.icon-btn.favorite {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: #e5e5e5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
}

.icon-btn.favorite:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-1px);
}

.icon-btn.favorite.active {
  background: #a28dfe;
  color: #000;
  border-color: #a28dfe;
  box-shadow: 0 0 12px rgba(162, 141, 254, 0.7);
}

/* Details-Button */
.details-btn {
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
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

/* Forms */
.fav-form {
  margin: 0;
}

/* Empty state text */
.empty-state {
  padding: 1rem 0.8rem 0.2rem;
  font-size: 0.9rem;
  opacity: 0.85;
}

/* Responsive */
@media (max-width: 800px) {
  .songs-card-header {
    display: none;
  }

  .song-row {
    grid-template-columns: 28px 3fr 1.2fr auto;
    grid-template-rows: auto auto;
    row-gap: 0.3rem;
  }

  .song-cell.index {
    grid-row: span 2;
  }

  .song-cell.duration {
    display: none;
  }

  .song-cell.actions {
    justify-content: flex-start;
  }
}

@media (max-width: 600px) {
  .songs-page {
    padding: 2rem 1rem;
  }

  .songs-card {
    padding: 1rem 1rem 1.2rem;
  }
}
</style>
