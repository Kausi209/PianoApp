<script>
  const { form } = $props();
</script>

<div class="wrap">
  <h1>Wie willst du heißen?</h1>
  <p>Dieser Name wird oben rechts angezeigt.</p>

  {#if form?.error}
    <p class="err">{form.error}</p>
  {/if}

  <form method="POST">
    <input name="username" placeholder="z.B. pianly_max" autocomplete="username" />
    <button>Speichern</button>
  </form>
</div>

<style>
  .wrap {
    max-width: 520px;
    margin: 80px auto;
    padding: 26px;
    border-radius: 18px;
    background: rgba(0,0,0,.75);
    color: #fff;
    box-shadow: 0 20px 60px rgba(0,0,0,.35);
  }
  input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 0;
    margin: 12px 0;
  }
  button {
    width: 100%;
    padding: 12px 14px;
    border-radius: 999px;
    border: 0;
    font-weight: 800;
    cursor: pointer;
    background: #a28dfe;
    color: #000;
  }
  .err { color: #ffb4b4; }
</style>
