<script>
  // Song kommt von der Page rein
  export let song;

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

  $: youtubeId = getYoutubeId(song?.youtube_url);

  function mapDifficulty(diff) {
    if (!diff) return "";
    const lower = diff.toLowerCase();
    if (lower === "intermediate") return "medium";
    if (lower === "advanced") return "hard";
    return lower;
  }
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
              <span class={`pill pill-diff pill-${mapDifficulty(song.difficulty)}`}>
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
              <button class="fav-btn active" formaction="?/removeFromFavorites">
                ★ In Favoriten
              </button>
            {:else}
              <button class="fav-btn" formaction="?/addToFavorites">
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
    opacity: 0.7;
  }

  .song-text-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .label {
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: 0.75rem;
    opacity: 0.7;
    margin: 0;
  }

  h1 {
    font-size: 2.4rem;
    margin: 0;
    line-height: 1.1;
  }

  .artist {
    margin: 0;
    font-size: 1.05rem;
    opacity: 0.85;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.2rem;
  }

  .pill {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    font-size: 0.85rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .pill-diff.pill-beginner {
    background: rgba(67, 230, 157, 0.12);
    border-color: rgba(67, 230, 157, 0.35);
    color: #43e69d;
  }

  .pill-diff.pill-medium {
    background: rgba(255, 200, 80, 0.12);
    border-color: rgba(255, 200, 80, 0.35);
    color: #ffc850;
  }

  .pill-diff.pill-hard {
    background: rgba(255, 90, 90, 0.12);
    border-color: rgba(255, 90, 90, 0.35);
    color: #ff5a5a;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.4rem;
    margin-top: 0.4rem;
  }

  .meta-label {
    display: block;
    font-size: 0.75rem;
    opacity: 0.65;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 0.35rem;
  }

  .meta-value {
    font-size: 1.05rem;
  }

  .fav-form {
    margin-top: 0.8rem;
  }

  .fav-btn {
    padding: 0.7rem 1.15rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    background: rgba(162, 141, 254, 0.22);
    color: #f2efff;
    font-weight: 600;
    box-shadow: 0 0 0 rgba(162, 141, 254, 0);
    transition: 0.2s ease;
  }

  .fav-btn:hover {
    background: rgba(162, 141, 254, 0.33);
  }

  .fav-btn.active {
    background: rgba(162, 141, 254, 0.55);
    box-shadow: 0 0 18px rgba(162, 141, 254, 0.35);
  }

  .song-detail-body {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 2rem;
    align-items: start;
  }

  .song-description h2,
  .song-video h2 {
    margin: 0 0 0.6rem 0;
    font-size: 1.25rem;
  }

  .song-description p {
    margin: 0;
    line-height: 1.55;
    opacity: 0.9;
  }

  .video-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 1.2rem;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .video-wrapper iframe {
    width: 100%;
    height: 100%;
    display: block;
  }

  .youtube-link {
    display: inline-block;
    margin-top: 0.75rem;
    color: #a28dfe;
    text-decoration: none;
  }

  .youtube-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 900px) {
    .song-main-info {
      flex-direction: column;
      align-items: flex-start;
    }

    .song-detail-body {
      grid-template-columns: 1fr;
    }

    h1 {
      font-size: 2rem;
    }
  }
</style>
