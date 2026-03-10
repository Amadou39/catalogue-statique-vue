<template>
  <div class="about-page">

    <!-- Hero -->
    <section class="about-hero">
      <div class="about-hero-content">
        <p class="hero-overline">Notre histoire</p>
        <h1 class="hero-title">
          <em>L'élégance</em><br>
          authentique
        </h1>
      </div>
      <div class="about-hero-deco">
        <div class="deco-line"></div>
        <div class="deco-circle"></div>
      </div>
    </section>

    <!-- Section manifeste -->
    <section class="about-section">
      <div class="section-inner">
        <div class="section-label">01 — Manifeste</div>
        <div class="section-content">
          <h2 class="section-title">Né d'une conviction simple</h2>
          <p class="section-text">
            <strong>Habits & Compagnie</strong> est né d'une conviction simple : les vêtements que nous portons ne devraient pas être jetables. Chaque pièce de notre collection est pensée pour durer, conçue avec des matières choisies pour leur qualité, leur confort et leur impact réduit sur l'environnement.
          </p>
          <p class="section-text">
            Fondée en 2021 à Paris, notre maison de mode urbaine puise son inspiration dans l'élégance du quotidien — ces moments où le style rencontre la liberté de mouvement.
          </p>
        </div>
      </div>
    </section>

    <!-- Valeurs -->
    <section class="values-section">
      <h2 class="values-title">Nos Valeurs</h2>
      <div class="values-grid">
        <div class="value-card" v-for="value in values" :key="value.title">
          <div class="value-icon">{{ value.icon }}</div>
          <h3 class="value-title">{{ value.title }}</h3>
          <p class="value-text">{{ value.text }}</p>
        </div>
      </div>
    </section>

    <!-- Chiffres clés -->
    <section class="stats-section">
      <div class="stat" v-for="s in stats" :key="s.label">
        <span class="stat-number">{{ s.number }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </section>

    <!-- Section engagement -->
    <section class="about-section alt-bg">
      <div class="section-inner">
        <div class="section-label">02 — Engagement</div>
        <div class="section-content">
          <h2 class="section-title">Mode responsable</h2>
          <p class="section-text">
            Nous nous engageons à sourcer nos matières premières auprès de producteurs certifiés, à travailler avec des ateliers respectant des conditions de travail équitables, et à réduire notre empreinte carbone à chaque étape de la production.
          </p>
          <p class="section-text">
            100% de nos emballages sont recyclables. Nous plantons un arbre pour chaque commande passée.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <div class="about-cta">
      <RouterLink to="/" class="btn-discover">Découvrir la collection</RouterLink>
    </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const values = [
  { icon: '◎', title: 'Qualité', text: 'Chaque pièce est sélectionnée pour sa durabilité et son confort. Nous refusons le compromis.' },
  { icon: '◈', title: 'Durabilité', text: 'Des matières éco-sourcées, des emballages 100% recyclables, un impact minimal.' },
  { icon: '◉', title: 'Transparence', text: 'Nous partageons ouvertement nos fournisseurs, nos prix et notre processus de fabrication.' },
  { icon: '◐', title: 'Intemporalité', text: 'Des coupes et des couleurs qui traversent les saisons, loin des tendances éphémères.' },
];

const stats = [
  { number: '2021', label: 'Année de création' },
  { number: '6+', label: 'Pièces dans la collection' },
  { number: '100%', label: 'Emballages recyclables' },
  { number: '1 arbre', label: 'Planté par commande' },
];
</script>

<style scoped>
.about-page {
  animation: fadeInUp 0.5s ease both;
}

/* Hero */
.about-hero {
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: center;
  padding: 100px 80px;
  background: linear-gradient(135deg, var(--color-noir) 0%, #1a1a1a 100%);
  overflow: hidden;
}
.about-hero-content { position: relative; z-index: 1; }
.hero-overline {
  font-family: 'Inter', sans-serif; font-size: 0.72em;
  letter-spacing: 4px; text-transform: uppercase;
  color: var(--color-gold); margin-bottom: 20px;
  animation: fadeInUp 0.6s ease 0.2s both;
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3em, 7vw, 6em);
  font-weight: 300; color: #fff;
  line-height: 1.05; letter-spacing: 1px;
  animation: fadeInUp 0.6s ease 0.3s both;
}
.hero-title em { color: var(--color-gold-light); }

.about-hero-deco {
  position: absolute; right: 80px; top: 50%; transform: translateY(-50%);
  opacity: 0.15;
}
.deco-line {
  width: 200px; height: 1px;
  background: var(--color-gold);
  margin-bottom: 40px;
}
.deco-circle {
  width: 200px; height: 200px; border-radius: 50%;
  border: 1px solid var(--color-gold);
}

/* Sections texte */
.about-section {
  padding: 80px 80px;
}
.about-section.alt-bg {
  background: var(--color-gris-clair);
}
.section-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 200px 1fr; gap: 60px;
  align-items: start;
}
.section-label {
  font-family: 'Inter', sans-serif; font-size: 0.68em;
  letter-spacing: 3px; text-transform: uppercase;
  color: var(--color-gold); padding-top: 6px;
}
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2em; font-weight: 400;
  color: var(--color-noir); margin-bottom: 20px;
}
.section-text {
  font-family: 'Inter', sans-serif; font-size: 0.9em;
  color: #555; line-height: 1.9; margin-bottom: 16px;
}
.section-text strong { color: var(--color-noir); }

/* Valeurs */
.values-section {
  padding: 80px 80px;
  max-width: 1400px; margin: 0 auto;
}
.values-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2em; font-weight: 300; font-style: italic;
  color: var(--color-noir); text-align: center;
  margin-bottom: 50px;
}
.values-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;
}
.value-card {
  padding: 32px 24px;
  border: 1px solid rgba(201,169,110,0.2);
  border-radius: 2px;
  transition: all 0.3s;
}
.value-card:hover {
  border-color: var(--color-gold);
  box-shadow: 0 10px 30px rgba(201,169,110,0.1);
}
.value-icon {
  font-size: 1.8em; color: var(--color-gold);
  margin-bottom: 16px;
}
.value-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2em; font-weight: 600; color: var(--color-noir);
  margin-bottom: 10px;
}
.value-text {
  font-family: 'Inter', sans-serif; font-size: 0.8em;
  color: var(--color-gris); line-height: 1.7;
}

/* Stats */
.stats-section {
  display: flex; justify-content: center;
  gap: 0;
  background: var(--color-noir);
  padding: 60px 40px;
}
.stat {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 20px 30px;
  border-right: 1px solid rgba(201,169,110,0.15);
}
.stat:last-child { border-right: none; }
.stat-number {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5em; font-weight: 700;
  color: var(--color-gold-light);
}
.stat-label {
  font-family: 'Inter', sans-serif; font-size: 0.65em;
  letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.5);
}

/* CTA */
.about-cta {
  text-align: center; padding: 80px 40px;
}
.btn-discover {
  display: inline-block;
  background: var(--color-noir); color: var(--color-gold-light);
  text-decoration: none; padding: 16px 48px;
  font-family: 'Inter', sans-serif; font-size: 0.8em;
  font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
  border-radius: 1px; transition: all 0.35s;
}
.btn-discover:hover {
  background: var(--color-gold); color: #fff;
  transform: translateY(-2px); box-shadow: 0 12px 30px rgba(201,169,110,0.35);
}

@media (max-width: 900px) {
  .about-hero, .about-section { padding: 60px 30px; }
  .section-inner { grid-template-columns: 1fr; gap: 16px; }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-section { flex-wrap: wrap; }
  .stat { flex: 1 1 50%; }
  .about-hero-deco { display: none; }
}
@media (max-width: 480px) {
  .values-grid { grid-template-columns: 1fr; }
  .values-section, .stats-section { padding: 60px 20px; }
}

@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
