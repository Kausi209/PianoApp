<script>
  import "./style.css";
  import { page } from "$app/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";

  const { data, children } = $props();

  // Session von Auth.js
  const user = $derived(data?.session?.user);

  // Profil aus DB (username)
  const profile = $derived(data?.profile);

  // Was oben rechts angezeigt wird
  const displayName = $derived(
    profile?.username || user?.name || user?.email || ""
  );
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
    <a href="/" class="nav-link" class:active={$page.url.pathname === "/"}>Home</a>

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
<!-- Account rechts -->
<div class="nav-right">
  {#if user}
    <div class="account">
      {#if user.image}
        <img class="avatar-img" src={user.image} alt="Avatar" />
      {:else}
        <div class="avatar">
          {displayName?.[0]?.toUpperCase() ?? "?"}
        </div>
      {/if}

      <div class="account-meta">
        <div class="account-name">{displayName}</div>
        <div class="account-email">{user.email}</div>
      </div>

      <button
        type="button"
        class="logout-btn"
        on:click={() => signOut()}
      >
        Ausloggen
      </button>
    </div>
  {:else}
    <button
      type="button"
      class="login-btn"
      on:click={() => signIn("google")}
    >
      Mit Google anmelden
    </button>
  {/if}
</div>



</nav>

<div class="container mt-3">
  {@render children()}
</div>

<style>
  .navbar {
    width: 100%;
    background: #000;
    border-bottom: 2px solid #a28dfe;
    padding: 0.7rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-left,
  .nav-center,
  .nav-right {
    display: flex;
    align-items: center;
  }

  .logo {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
  }

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

  /* Account rechts */
  .account-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 0.9rem;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
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

  .avatar-img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .account-btn:hover .avatar,
  .account-btn:hover .avatar-img {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(162, 141, 254, 0.6);
  }

  /* Monthly Song Special Link */
  .nav-link.nav-monthly {
    color: #facc15;
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
    height: 32px;
    width: auto;
    display: block;
  }
  /* ===== Navbar Account (rechts) ===== */

.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 260px;
}

.login-btn {
  border: 0;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 800;
  background: #fff;
  color: #000;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.18);
}

.account {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a28dfe, #c2b2ff);
  color: #000;
  font-weight: 900;
  display: grid;
  place-items: center;
}

.avatar-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.account-meta {
  display: grid;
  gap: 2px;
  line-height: 1.1;
  min-width: 0;
}

.account-name {
  font-weight: 800;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

.account-email {
  font-size: 0.8rem;
  opacity: 0.75;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

.logout-btn {
  border: 0;
  cursor: pointer;
  padding: 9px 12px;
  border-radius: 999px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.14);
  transition: transform 0.15s ease, background 0.15s ease;
}

.logout-btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.12);
}

@media (max-width: 700px) {
  .account-email {
    display: none;
  }
  .account-name {
    max-width: 110px;
  }
}


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
