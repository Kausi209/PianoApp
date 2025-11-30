<script>
  import { page } from '$app/stores';  // ⬅️ WICHTIG!
  import "./style.css";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/PianoLogo.png" />
</svelte:head>

<nav class="navbar">
  <div class="nav-left">
    <a href="/" class="logo">🎵 Pianly</a>
  </div>

  <div class="nav-center">
    <a class={$page.url.pathname === '/' ? 'active' : ''} href="/">Home</a>
    <a class={$page.url.pathname.startsWith('/songs') ? 'active' : ''} href="/songs">Songs</a>
    <a class={$page.url.pathname.startsWith('/randomizer') ? 'active' : ''} href="/randomizer">Randomizer</a>
  </div>

  <div class="nav-right">
    <button class="profile-btn">
      <div class="avatar">P</div>
    </button>
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
  flex: 1;                    /* nimmt den Platz zwischen links & rechts */
  justify-content: center;    /* zentriert die Links */
  gap: 2rem;
}

.nav-center a {
  color: #eaeaea;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  padding-bottom: 3px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border 0.2s ease;
}

.nav-center a:hover {
  color: #a28dfe;
}

.nav-center .active {
  color: #a28dfe;
  border-bottom-color: #a28dfe;
}

/* Avatar rechts */
.profile-btn {
  background: none;
  border: none;
  cursor: pointer;
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
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.avatar:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(162, 141, 254, 0.6);
}

/* Mobile */
@media (max-width: 700px) {
  .navbar {
    padding: 0.6rem 1rem;
  }
  .nav-center {
    gap: 1.2rem;
  }
}


</style>
