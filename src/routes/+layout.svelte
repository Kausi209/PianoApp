<script>
  import "./style.css";
  import { page } from "$app/stores";

  const { children, data } = $props(); // Svelte 5 Runes: keine export let
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/PianoLogo.png" />
</svelte:head>

<nav class="navbar">
  <!-- Logo links -->
  <div class="nav-left">
    <a href="/" class="logo">
  <img src="/PianlyLogo.png" alt="Pianly Logo" class="logo-img" />
</a>

  </div>

  <!-- Links zentriert -->
  <div class="nav-center">
    <a href="/" class="nav-link" class:active={$page.url.pathname === "/"}>
      Home
    </a>

    <a
      href="/songs"
      class="nav-link"
      class:active={$page.url.pathname.startsWith("/songs")}
    >
      Songs
    </a>

    <a
      href="/randomizer"
      class="nav-link"
      class:active={$page.url.pathname.startsWith("/randomizer")}
    >
      Randomizer
    </a>

    <a
      href="/monthly-song"
      class="nav-link nav-monthly"
      class:active={$page.url.pathname.startsWith("/monthly-song")}
    >
      Monthly Song
    </a>
  </div>

  <!-- Account rechts -->
  <div class="nav-right">
    {#if data?.user}
      <!-- Eingeloggt: Profil-Link -->
      <a href="/profile" class="account-btn">
        <div class="avatar">
          {(data.user.name?.[0] ?? data.user.email[0]).toUpperCase()}
        </div>
      </a>
    {:else}
      <!-- Nicht eingeloggt: Login -->
      <a href="/auth/login" class="account-btn">
        <div class="avatar">?</div>
        <span class="account-text">Login</span>
      </a>
    {/if}
  </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>

<style>
  /* ==== NAVBAR SIMPLE CLEAN ==== */

  .navbar {
    width: 100%;
    background: #000;
    border-bottom: 2px solid #a28dfe;
    padding: 0.7rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* 3 Bereiche */
  .nav-left,
  .nav-center,
  .nav-right {
    display: flex;
    align-items: center;
  }

  /* Logo links */
  .logo {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
  }

  /* Links in der Mitte */
  .nav-center {
    flex: 1;
    justify-content: center;
    gap: 1.8rem;
  }

  .nav-link {
    color: #eaeaea;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    padding-bottom: 3px;
    border-bottom: 2px solid transparent;
    transition:
      color 0.2s ease,
      border 0.2s ease;
  }

  .nav-link:hover {
    color: #a28dfe;
  }

  .nav-link.active {
    color: #a28dfe;
    border-bottom-color: #a28dfe;
  }

  /* Avatar rechts */
  .account-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 0.9rem;
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a28dfe, #c2b2ff);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-weight: 700;
    font-size: 0.95rem;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .account-btn:hover .avatar {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(162, 141, 254, 0.6);
  }

  /* Monthly Song Special Link */
.nav-link.nav-monthly {
  color: #facc15; /* Gold */
}

.nav-link.nav-monthly:hover {
  color: #fbbf24;
}

.nav-link.nav-monthly.active {
  color: #facc15;
  border-bottom-color: #facc15;
  text-shadow: 0 0 10px rgba(250, 204, 21, 0.7);
}

.logo-img {
  height: 32px; /* adjust height here */
  width: auto;
  display: block;
}



  /* Mobile */
  @media (max-width: 700px) {
    .navbar {
      padding: 0.6rem 1rem;
    }
    .nav-center {
      gap: 1rem;
    }
    .nav-link {
      font-size: 0.9rem;
    }
    .account-text {
      display: none;
    }
  }
</style>
