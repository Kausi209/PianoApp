<script>
  export let data;

  const song = data.song;

  // extract YouTube video id from song.youtube_url
  function getYoutubeId(url) {
    if (!url) return null;

    try {
      const u = new URL(url);
      if (u.hostname === "youtu.be") {
        return u.pathname.slice(1);
      }
      if (u.searchParams.get("v")) {
        return u.searchParams.get("v");
      }
    } catch (e) {
      // fallback: simple split
      const parts = url.split("v=");
      if (parts[1]) return parts[1].split("&")[0];
    }
    return null;
  }

  const youtubeId = getYoutubeId(song.youtube_url);
</script>

<main class="song-detail-page">
  <section class="song-detail-card">
    <div class="song-detail-header">
      <a href="/songs" class="back-link">← Zurück zur Übersicht</a>

      <div class="song-main-info">
        <div class="song-cover-big">
          {#if song.image_url}
            <img src={song.image_url} alt={`Cover von ${song.title}`} loading="lazy" />
          {:else}
            <div class="song-cover-fallback">♪</div>
          {/if}
        </div>

        <div class="song-text-block">
          <p class="label">Song</p>
          <h1>{song.title}</h1>
          <p class="artist">{song.artist}</p>

          <div class="badges">
            {#if song.difficulty}
              <span class={`pill pill-diff pill-${song.difficulty.toLowerCase()}`}>
                {song.difficulty}
              </span>
            {/if}
            {#if song.genre}
              <span class="pill pill-genre">{song.genre}</span>
            {/if}
            {#if song.duration}
              <span class="pill pill-duration">{song.duration}</span>
            {/if}
          </div>

          <div class="meta-grid">
            <div>
              <span class="meta-label">Dauer</span>
              <span class="meta-value">{song.duration || "Unbekannt"}</span>
            </div>
            <div>
              <span class="meta-label">Schwierigkeit</span>
              <span class="meta-value">{song.difficulty || "-"}</span>
            </div>
            <div>
              <span class="meta-label">Genre</span>
              <span class="meta-value">{song.genre || "-"}</span>
            </div>
          </div>

          <form method="POST" class="fav-form">
            <input type="hidden" name="id" value={song._id} />

            {#if song.favorite}
              <button
                class="fav-btn active"
                formaction="?/removeFromFavorites"
              >
                ★ In Favoriten
              </button>
            {:else}
              <button
                class="fav-btn"
                formaction="?/addToFavorites"
              >
                ☆ Zu Favoriten
              </button>
            {/if}
          </form>
        </div>
      </div>
    </div>

    <div class="song-detail-body">
      <div class="song-description">
        <h2>Beschreibung</h2>
        <p>{song.description || "Für diesen Song wurde noch keine Beschreibung hinzugefügt."}</p>
      </div>

      <div class="song-video">
        <h2>Tutorial ansehen</h2>

        {#if youtubeId}
          <div class="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={`YouTube Tutorial zu ${song.title}`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <a href={song.youtube_url} target="_blank" rel="noreferrer" class="youtube-link">
            Auf YouTube öffnen
          </a>
        {:else}
          <p>Kein gültiger YouTube-Link hinterlegt.</p>
        {/if}
      </div>
    </div>
  </section>
</main>

<style>
.song-detail-page {
  min-height: calc(100vh - 80px);
  padding: 2.5rem 2rem;
  background: radial-gradient(circle at top left, #f5ecff 0%, #c9bbff 40%, #a28dfe 100%);
  display: flex;
  justify-content: center;
}

.song-detail-card {
  max-width: 1000px;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  color: #f9f9f9;
  border-radius: 1.8rem;
  padding: 1.8rem 1.9rem 2.1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

/* Header */
.song-detail-header {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.back-link {
  font-size: 0.9rem;
  color: #e5e5ff;
  text-decoration: none;
  opacity: 0.9;
  margin-bottom: 0.2rem;
}

.back-link:hover {
  text-decoration: underline;
}

.song-main-info {
  display: flex;
  gap: 1.8rem;
  align-items: center;
}

.song-cover-big {
  width: 180px;
  height: 180px;
  border-radius: 1.2rem;
  overflow: hidden;
  background: linear-gradient(135deg, #a28dfe, #c2b2ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.song-cover-big img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-cover-fallback {
  font-size: 3rem;
  font-weight: 700;
  color: #000;
}

.song-text-block {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.song-text-block .label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  opacity: 0.7;
}

.song-text-block h1 {
  font-size: 2.2rem;
  margin: 0;
}

.song-text-block .artist {
  font-size: 1.1rem;
  color: #e0e0ff;
  opacity: 0.95;
}

/* Badges */
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  padding: 0.18rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.pill-genre {
  background: rgba(255, 255, 255, 0.05);
}

.pill-duration {
  background: rgba(0, 0, 0, 0.5);
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

/* Meta grid */
.meta-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  margin-top: 0.4rem;
}

.meta-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
}

.meta-value {
  font-size: 0.95rem;
}

/* Favorite button */
.fav-form {
  margin-top: 0.7rem;
}

.fav-btn {
  padding: 0.45rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: #f5f5f5;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
}

.fav-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.fav-btn.active {
  background: #a28dfe;
  color: #000;
  border-color: #a28dfe;
  box-shadow: 0 0 16px rgba(162, 141, 254, 0.8);
}

/* Body */
.song-detail-body {
  display: grid;
  grid-template-columns: 1.2fr 1.5fr;
  gap: 1.8rem;
  align-items: flex-start;
}

.song-description h2,
.song-video h2 {
  font-size: 1.25rem;
  margin-bottom: 0.4rem;
}

.song-description p {
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.95;
}

/* Video */
.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  border-radius: 1.1rem;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.7);
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.youtube-link {
  display: inline-block;
  margin-top: 0.6rem;
  font-size: 0.9rem;
  color: #a28dfe;
  text-decoration: none;
}

.youtube-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 900px) {
  .song-detail-card {
    padding: 1.5rem 1.4rem 1.8rem;
  }

  .song-main-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .song-cover-big {
    width: 150px;
    height: 150px;
  }

  .song-detail-body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .song-detail-page {
    padding: 2rem 1rem;
  }

  .song-detail-card {
    padding: 1.3rem 1.1rem 1.6rem;
  }

  .song-text-block h1 {
    font-size: 1.8rem;
  }
}
</style>
