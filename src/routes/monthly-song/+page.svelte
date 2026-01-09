<script>
  import { signIn } from "@auth/sveltekit/client";

  const { data, form } = $props();

  const authed = $derived(!!data?.authed);
  const month = $derived(data?.month);
  const submissions = $derived(data?.submissions ?? []);
  const myEmail = $derived(data?.session?.user?.email ?? null);

  const leaderboard = $derived(
    [...submissions].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0)).slice(0, 10)
  );

  function hasVoted(s) {
    return !!myEmail && Array.isArray(s?.voterEmails) && s.voterEmails.includes(myEmail);
  }
</script>

<main class="page">
  {#if authed}
    <!-- HERO (only visible when authed) -->
    <section class="card hero">
      <div class="kicker">MONATLICHER SONG</div>

      <h1 class="title">{month?.title ?? "Monatlicher Song"}</h1>
      <p class="artist">{month?.artist ?? ""}</p>

      <p class="desc">
        {month?.description ?? ""}
      </p>

      <a class="cta" href="/monthly-song/create">Jetzt teilnehmen</a>
    </section>
  {/if}

  <!-- LOCKED AREA (blur when not authed) -->
  <div class="locked-wrap">
    <section class={`grid ${!authed ? "blurred" : ""}`}>
      <!-- LEFT: submissions -->
      <section class="card">
        <div class="headRow">
          <h2 class="h2">Alle Teilnahmen</h2>
          <span class="pill">{submissions.length}</span>
        </div>

        {#if form?.error}
          <p class="error">{form.error}</p>
        {/if}

        {#if submissions.length === 0}
          <p class="muted">
            Noch keine Teilnahme eingegangen. Sei die erste Person, die mitmacht!
          </p>
        {:else}
          <div class="rows">
            {#each submissions as s (s._id)}
              <article class="itemRow">
                <div class="left">
                  <div class="name">{s.username ?? "Teilnehmer"}</div>

                  <div class="meta">
                    Instrument: {s.instrument ?? "—"}
                    <span class="dot">•</span>
                    Votes: {s.votes ?? 0}
                  </div>

                  {#if s.message}
                    <div class="msg">{s.message}</div>
                  {/if}
                </div>

                <div class="right">
                  <a
                    class="videoBtn"
                    href={s.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Video
                  </a>

                  <form method="POST">
                    <input type="hidden" name="submissionId" value={s._id} />
                    <button
                      type="submit"
                      class={`voteBtn ${hasVoted(s) ? "voted" : ""}`}
                      formaction="?/vote"
                      disabled={!authed || (!!myEmail && s.userEmail === myEmail)}
                      aria-label="Vote"
                    >
                      {hasVoted(s) ? "Voted" : "Vote"}
                    </button>
                  </form>
                </div>
              </article>
            {/each}
          </div>
        {/if}
      </section>

      <!-- RIGHT: leaderboard -->
      <aside class="card leaderboard">
        <div class="headRow">
          <h2 class="h2">Leaderboard</h2>
          <span class="pill">Top {Math.min(leaderboard.length, 10)}</span>
        </div>

        {#if leaderboard.length === 0}
          <p class="muted">Noch keine Daten.</p>
        {:else}
          <ol class="board">
            {#each leaderboard as x, i (x._id)}
              <li class="boardRow">
                <span class="rank">#{i + 1}</span>
                <span class="user">{x.username ?? "Teilnehmer"}</span>
                <span class="votes">{x.votes ?? 0}</span>
              </li>
            {/each}
          </ol>
        {/if}
      </aside>
    </section>

    {#if !authed}
      <div class="overlay">
        <h2>Willst du am monatlichen Song teilnehmen?</h2>
        <p>Melde dich mit Google an, um Songs einzureichen und abzustimmen.</p>
        <button class="login-btn" type="button" onclick={() => signIn("google")}>
          Mit Google anmelden
        </button>
      </div>
    {/if}
  </div>
</main>

<style>
  /* page */
  .page {
    min-height: calc(100vh - 80px);
    padding: 34px 40px 70px;
    background: #c8bbff;
  }

  /* shared card */
  .card {
    background: rgba(10, 10, 14, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 28px;
    padding: 28px 32px;
    color: #fff;
    box-shadow: 0 22px 55px rgba(0, 0, 0, 0.45);
  }

  /* hero */
  .hero {
    margin-bottom: 14px;
  }

  .kicker {
    letter-spacing: 0.18em;
    opacity: 0.65;
    font-size: 0.85rem;
  }

  .title {
    font-size: 3.1rem;
    line-height: 1.05;
    margin: 12px 0 6px;
    font-weight: 900;
  }

  .artist {
    font-size: 1.15rem;
    opacity: 0.9;
    margin: 0 0 12px;
  }

  .desc {
    font-size: 1.05rem;
    opacity: 0.9;
    max-width: 1000px;
    margin: 0 0 16px;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 28px;
    border-radius: 999px;
    background: #fff;
    color: #000;
    font-weight: 900;
    text-decoration: none;
    width: fit-content;
  }

  /* locked area (your blur style) */
  .locked-wrap {
    position: relative;
    border-radius: 28px;
    overflow: hidden;
  }

  .blurred {
    filter: blur(7px);
    opacity: 0.75;
    pointer-events: none;
    user-select: none;
  }

  .overlay {
    position: fixed;
    inset: 80px 0 0 0;
    display: grid;
    place-content: center;
    gap: 20px;
    padding: 36px;
    text-align: center;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);
    color: #fff;
    z-index: 10;
  }

  .overlay h2 {
    margin: 0;
    font-size: 3rem;
    font-weight: 800;
  }

  .overlay p {
    max-width: 420px;
    margin: 0 auto 12px;
    opacity: 0.9;
    line-height: 1.5;
    font-size: 1.2rem;
  }

  /* login button */
  .login-btn {
    margin-top: 6px;
    padding: 16px 30px;
    border-radius: 999px;
    font-weight: 900;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #a28dfe, #c2b2ff);
    color: #000;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
    font-size: 1.2rem;
  }

  .login-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 35px rgba(162, 141, 254, 0.45);
  }

  /* grid */
  .grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 14px;
    align-items: start;
  }

  .leaderboard {
    position: sticky;
    top: 14px;
  }

  /* section headings */
  .headRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .h2 {
    margin: 0;
    font-size: 1.45rem;
    font-weight: 900;
  }

  .pill {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.10);
    padding: 8px 14px;
    border-radius: 999px;
    font-weight: 900;
    opacity: 0.95;
  }

  /* rows */
  .rows {
    display: grid;
    gap: 12px;
  }

  .itemRow {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 18px;
    padding: 16px 16px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.035);
  }

  .left {
    min-width: 0;
  }

  .name {
    font-weight: 900;
    font-size: 1.15rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    opacity: 0.75;
    font-size: 0.95rem;
    margin-top: 6px;
  }

  .dot {
    margin: 0 10px;
    opacity: 0.6;
  }

  .msg {
    margin-top: 10px;
    opacity: 0.9;
    font-size: 0.95rem;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .videoBtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    text-decoration: none;
    font-weight: 900;
  }

  .voteBtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-weight: 900;
    cursor: pointer;
  }

  .voteBtn.voted {
    background: linear-gradient(135deg, #facc15, #f59e0b);
    color: #000;
    border-color: rgba(0, 0, 0, 0.2);
  }

  .voteBtn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* leaderboard list */
  .board {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
  }

  .boardRow {
    display: grid;
    grid-template-columns: 64px 1fr 56px;
    align-items: center;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.035);
    padding: 14px 14px;
  }

  .rank {
    opacity: 0.7;
    font-weight: 900;
  }

  .user {
    font-weight: 900;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .votes {
    text-align: right;
    font-weight: 900;
    opacity: 0.95;
  }

  /* misc */
  .muted {
    opacity: 0.8;
    margin: 0;
    font-size: 1.05rem;
  }

  .error {
    color: #fecaca;
    font-weight: 900;
    margin: 10px 0 0;
  }

  @media (max-width: 1100px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .leaderboard {
      position: static;
    }
    .page {
      padding: 26px 16px 60px;
    }
    .title {
      font-size: 2.4rem;
    }
  }
</style>
