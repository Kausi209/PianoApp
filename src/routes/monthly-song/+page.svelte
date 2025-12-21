<script>
  // Svelte 5 props
  import { signIn } from "@auth/sveltekit/client";
  const { data } = $props();

  const authed = $derived(data.authed);
  const month = $derived(data.month);
  const submissions = $derived(data.submissions ?? []);
</script>

{#if authed}
<main class="monthly-page">
  <!-- HERO SECTION -->
  <section class="monthly-hero">
    <p class="month-label">Monatlicher Song</p>

    <h1>
      Dieser Monat: <span>{month.title}</span>
    </h1>

    <p class="hero-artist">von {month.artist}</p>

    <p class="hero-desc">{month.description}</p>

    <!-- IMPORTANT: Send to participate page -->
    <a href="/monthly-song/create" class="cta-btn">
      Jetzt teilnehmen
    </a>
  </section>

  <!-- SUBMISSIONS SECTION -->
   
  <section class="submissions-section">
    <h2>Teilnahmen dieses Monats</h2>

    {#if submissions.length === 0}
      <p class="empty">
        Noch keine Teilnahme eingegangen. Sei die erste Person, die mitmacht!
      </p>
    {:else}
      <div class="submissions-table">
        <div class="submissions-header">
          <span>Name</span>
          <span>E-Mail</span>
          <span>YouTube</span>
          <span>Status</span>
          <span>Datum</span>
        </div>

        {#each submissions as sub}
          <article class="submission-row">
            <div class="cell name">{sub.name}</div>
            <div class="cell email">{sub.email}</div>

            <div class="cell youtube">
              <a href={sub.youtubeUrl} target="_blank">
                Video ansehen
              </a>
            </div>

            <div class="cell status">
              <span class={`status-pill status-${sub.status || "pending"}`}>
                {sub.status || "pending"}
              </span>
            </div>

            <div class="cell date">
              {#if sub.createdAt}
                {new Date(sub.createdAt).toLocaleDateString()}
              {:else}
                -
              {/if}
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>
  
</main>
{:else}

  <div class="locked-wrap">
    <div class="blurred">
      <!-- Fake Monthly Song UI -->
      <div class="monthly-skeleton">
        <div class="sk-hero"></div>
        <div class="sk-cta"></div>
        <div class="sk-list">
          {#each Array(4) as _}
            <div class="sk-item"></div>
          {/each}
        </div>
      </div>
    </div>

    <div class="overlay">
      <h2>Willst du beim Monthly Song mitmachen?</h2>
      <p>Logge dich mit Google ein, um Teilnahmen zu sehen und selbst mitzumachen.</p>

      <button class="login-btn" type="button" onclick={() => signIn("google")}>
        Mit Google anmelden
      </button>
    </div>
  </div>

{/if}

<style>
.monthly-page {
  min-height: calc(100vh - 80px);
  padding: 2.5rem 2rem 3rem;
  background: radial-gradient(circle at top, #f5ecff 0%, #c9bbff 40%, #a28dfe 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Hero */
.monthly-hero {
  max-width: 900px;
  width: 100%;
  background: rgba(0, 0, 0, 0.94);
  color: #fefefe;
  border-radius: 1.8rem;
  padding: 1.8rem 1.9rem 1.9rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);
}

.month-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  opacity: 0.7;
  margin-bottom: 0.3rem;
}

.monthly-hero h1 {
  font-size: 2rem;
  margin-bottom: 0.2rem;
}

.monthly-hero h1 span {
  color: #facc15; /* bisschen goldig für special */
}

.hero-artist {
  font-size: 1rem;
  color: #e0e7ff;
  margin-bottom: 0.6rem;
}

.hero-desc {
  font-size: 0.95rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.cta-btn {
  padding: 0.7rem 1.6rem;
  border-radius: 999px;
  border: none;
  background: #fefefe;
  color: #111;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.7);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
}

.cta-btn:hover {
  transform: translateY(-1px);
  background: #ffffff;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.8);
}

/* Form */
.form-section {
  max-width: 900px;
  width: 100%;
  background: rgba(15, 23, 42, 0.96);
  color: #f9fafb;
  border-radius: 1.5rem;
  padding: 1.6rem 1.7rem 1.9rem;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.8);
}

.form-section h2 {
  margin-bottom: 0.8rem;
}

.success {
  color: #bbf7d0;
  font-size: 0.9rem;
  margin-bottom: 0.7rem;
}

.error {
  color: #fecaca;
  font-size: 0.9rem;
  margin-bottom: 0.7rem;
}

.participation-form {
  margin-top: 0.4rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 1.2rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
}

label.full {
  grid-column: 1 / -1;
}

input,
textarea {
  border-radius: 0.6rem;
  border: 1px solid #4b5563;
  padding: 0.5rem 0.7rem;
  background: #020617;
  color: #f9fafb;
  font-size: 0.9rem;
}

textarea {
  resize: vertical;
}

.submit-btn {
  margin-top: 1rem;
  padding: 0.6rem 1.6rem;
  border-radius: 999px;
  border: none;
  background: #a28dfe;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.7);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.85);
}

/* Submissions */
.submissions-section {
  max-width: 900px;
  width: 100%;
  background: rgba(0, 0, 0, 0.94);
  color: #f9fafb;
  border-radius: 1.5rem;
  padding: 1.6rem 1.7rem 1.9rem;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.85);
}

.submissions-section h2 {
  margin-bottom: 0.8rem;
}

.empty {
  font-size: 0.9rem;
  opacity: 0.9;
}

.submissions-table {
  margin-top: 0.6rem;
}

.submissions-header,
.submission-row {
  display: grid;
  grid-template-columns: 1.3fr 1.5fr 1fr 0.8fr 0.9fr;
  gap: 0.4rem;
  align-items: center;
}

.submissions-header {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.7;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.4);
}

.submission-row {
  padding: 0.5rem 0 0.5rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.8);
  font-size: 0.9rem;
}

.cell.email {
  word-break: break-all;
  font-size: 0.85rem;
}

.cell.youtube a {
  color: #a5b4fc;
  text-decoration: none;
  font-size: 0.85rem;
}

.cell.youtube a:hover {
  text-decoration: underline;
}

/* Status pill */
.status-pill {
  padding: 0.18rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: capitalize;
}

.status-pending {
  background: rgba(250, 204, 21, 0.25);
  color: #facc15;
}

.status-reviewed {
  background: rgba(59, 130, 246, 0.25);
  color: #93c5fd;
}

.status-top50 {
  background: rgba(52, 211, 153, 0.25);
  color: #6ee7b7;
}

/* Responsive */
@media (max-width: 800px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .submissions-header {
    display: none;
  }

  .submission-row {
    grid-template-columns: 1.4fr 1.2fr;
    grid-template-areas:
      "name status"
      "email email"
      "youtube date";
    row-gap: 0.3rem;
  }

  .cell.name {
    grid-area: name;
    font-weight: 600;
  }
  .cell.status {
    grid-area: status;
    justify-self: flex-end;
  }
  .cell.email {
    grid-area: email;
  }
  .cell.youtube {
    grid-area: youtube;
  }
  .cell.date {
    grid-area: date;
    font-size: 0.8rem;
    opacity: 0.8;
  }
}

@media (max-width: 600px) {
  .monthly-page {
    padding: 2rem 1rem 2.5rem;
  }

  .monthly-hero,
  .form-section,
  .submissions-section {
    padding: 1.4rem 1.3rem 1.6rem;
  }
}
/* ===== LOGIN LOCK / BLUR WALL ===== */

.locked-wrap {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
}

/* Verblasster Hintergrund */
.blurred {
  filter: blur(12px);
  transform: scale(1.03);
  pointer-events: none;
  user-select: none;
}

/* Overlay oben drüber */
.overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 14px;
  text-align: center;
  padding: 32px;
  background: rgba(5, 5, 8, 0.6);
  backdrop-filter: blur(6px);
  color: #fff;
}

.overlay h2 {
  font-size: 1.9rem;
  font-weight: 700;
  margin: 0;
}

.overlay p {
  max-width: 420px;
  margin: 0 auto 12px;
  opacity: 0.9;
  line-height: 1.5;
}

/* Login Button */
.login-btn {
  margin-top: 6px;
  align-self: center;
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  background: linear-gradient(135deg, #a28dfe, #c2b2ff);
  color: #000;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(162, 141, 254, 0.45);
}

/* ===== SKELETONS (FAKE CONTENT) ===== */

/* Titel Balken */
.sk-title {
  height: 28px;
  width: 260px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.14);
  margin-bottom: 10px;
}

/* Subtitle Balken */
.sk-sub {
  height: 18px;
  width: 420px;
  max-width: 90%;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
}

/* ===== RANDOMIZER SKELETON ===== */

.randomizer-skeleton {
  padding: 42px;
  border-radius: 28px;
  background: rgba(0, 0, 0, 0.75);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  display: grid;
  gap: 22px;
  justify-items: center;
}

.sk-card {
  width: 360px;
  height: 200px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
}

.sk-btn {
  width: 160px;
  height: 42px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

/* ===== MONTHLY SONG SKELETON ===== */

.monthly-skeleton {
  padding: 36px;
  border-radius: 28px;
  background: rgba(0, 0, 0, 0.75);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.sk-hero {
  height: 180px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.12);
  margin-bottom: 26px;
}

.sk-cta {
  height: 46px;
  width: 220px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  margin-bottom: 30px;
}

.sk-list {
  display: grid;
  gap: 16px;
}

.sk-item {
  height: 56px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
}

/* ===== MOBILE ===== */

@media (max-width: 640px) {
  .overlay h2 {
    font-size: 1.6rem;
  }

  .randomizer-skeleton {
    padding: 28px;
  }

  .sk-card {
    width: 100%;
  }
}

</style>
