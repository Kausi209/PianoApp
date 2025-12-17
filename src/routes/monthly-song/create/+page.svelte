<script>
  // falls du später Actions nutzt (Fehlermeldungen etc.)
  const { form } = $props();
</script>

<main class="form-page">
  <section class="form-card">
    <h1>Teilnahme am Monthly Song</h1>
    <p class="subtitle">
      Fülle das Formular aus und verlinke dein YouTube-Video, in dem du den
      aktuellen Monatssong spielst.
    </p>

    {#if form?.success}
      <p class="success">
        Vielen Dank für deine Teilnahme! Dein Beitrag wurde gespeichert.
      </p>
    {/if}

    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}

    <form method="POST" class="participation-form">
      <div class="form-grid">
        <label>
          Name *
          <input
            type="text"
            name="name"
            required
            value={form?.values?.name || ""}
          />
        </label>

        <label>
          E-Mail *
          <input
            type="email"
            name="email"
            required
            value={form?.values?.email || ""}
          />
        </label>

        <label>
          Telefon
          <input
            type="tel"
            name="phone"
            value={form?.values?.phone || ""}
          />
        </label>

        <label>
          Adresse
          <input
            type="text"
            name="address"
            value={form?.values?.address || ""}
          />
        </label>

        <label class="full">
          YouTube-Link zu deinem Piano-Video *
          <input
            type="url"
            name="youtube"
            required
            placeholder="https://www.youtube.com/watch?v=..."
            value={form?.values?.youtubeUrl || ""}
          />
        </label>

        <label class="full">
          Nachricht / Bemerkungen
          <textarea
            name="message"
            rows="3"
            placeholder="Optional: ein paar Worte zu deiner Aufnahme..."
          >{form?.values?.message || ""}</textarea>
        </label>
      </div>

      <button type="submit" class="submit-btn">
        Beitrag einreichen
      </button>
    </form>
  </section>
</main>

<style>
.form-page {
  min-height: calc(100vh - 80px);
  padding: 2.5rem 2rem 3rem;
  background: radial-gradient(circle at top, #f5ecff 0%, #c9bbff 40%, #a28dfe 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.form-card {
  max-width: 900px;
  width: 100%;
  background: rgba(2, 3, 6, 0.96);
  color: #f9fafb;
  border-radius: 1.5rem;
  padding: 1.8rem 1.9rem 2rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.8);
}

.form-card h1 {
  margin-bottom: 0.3rem;
}

.subtitle {
  font-size: 0.95rem;
  opacity: 0.9;
  margin-bottom: 1rem;
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

@media (max-width: 800px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .form-page {
    padding: 2rem 1rem 2.5rem;
  }

  .form-card {
    padding: 1.6rem 1.3rem 1.8rem;
  }
}
</style>
