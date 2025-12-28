<script>
  const { form } = $props();
</script>

<main class="form-page">
  <section class="form-card">
    <h1>Teilnahme am Monthly Song</h1>
    <p class="subtitle">
      Lade dein Video als YouTube-Link hoch. Name/Email kommen automatisch aus deinem Account.
    </p>

    {#if form?.success}
      <p class="success">
        Vielen Dank! Dein Beitrag wurde gespeichert.
      </p>
    {/if}

    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}

    <form method="POST" class="participation-form">
      <div class="form-grid">
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

        <label>
          Instrument *
          <select name="instrument" required>
            <option value="" selected={!(form?.values?.instrument)}>Bitte wählen…</option>
            <option value="acoustic" selected={form?.values?.instrument === "acoustic"}>Akustisches Klavier</option>
            <option value="digital" selected={form?.values?.instrument === "digital"}>Digital Piano</option>
            <option value="keyboard" selected={form?.values?.instrument === "keyboard"}>Keyboard</option>
            <option value="other" selected={form?.values?.instrument === "other"}>Andere</option>
          </select>
        </label>

        <label>
          Bemerkungen (optional)
          <textarea
            name="message"
            rows="3"
            placeholder="Optional: ein paar Worte zu deiner Aufnahme…"
          >{form?.values?.message || ""}</textarea>
        </label>

        <label class="full checkbox">
          <input
            type="checkbox"
            name="confirm"
            value="yes"
            checked={form?.values?.confirm === "yes"}
            required
          />
          <span>
            Ich bestätige, dass dieses Video von mir gespielt wurde und über den Link abrufbar ist.
          </span>
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
textarea,
select {
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

.checkbox {
  flex-direction: row;
  align-items: flex-start;
  gap: 0.6rem;
  padding-top: 0.2rem;
}

.checkbox input {
  margin-top: 0.2rem;
  width: 18px;
  height: 18px;
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
