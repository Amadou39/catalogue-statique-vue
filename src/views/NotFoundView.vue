<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <p class="error-code">404</p>
      <div class="error-line"></div>
      <h1 class="error-title">Page introuvable</h1>
      <p class="error-desc">
        Cette page n'existe pas ou a été déplacée.<br>
        Retournez à la collection pour continuer à explorer.
      </p>
      <div class="error-actions">
        <RouterLink to="/" class="btn-home">← Retour à la boutique</RouterLink>
        <RouterLink to="/about" class="btn-about">Notre histoire</RouterLink>
      </div>
    </div>
    <div class="not-found-deco">
      <div class="deco-ring deco-ring-1"></div>
      <div class="deco-ring deco-ring-2"></div>
      <div class="deco-ring deco-ring-3"></div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.not-found-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 60px 40px;
  animation: fadeInUp 0.6s ease both;
}

.not-found-content {
  text-align: center; position: relative; z-index: 1;
}

.error-code {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(8em, 20vw, 14em);
  font-weight: 700; line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(201, 169, 110, 0.3);
  letter-spacing: -4px;
  margin-bottom: -20px;
  animation: fadeInUp 0.6s ease 0.1s both;
}

.error-line {
  width: 60px; height: 2px;
  background: var(--color-gold);
  margin: 0 auto 30px;
  animation: fadeInUp 0.6s ease 0.2s both;
}

.error-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8em, 4vw, 3em);
  font-weight: 300; font-style: italic;
  color: var(--color-noir);
  margin-bottom: 20px;
  animation: fadeInUp 0.6s ease 0.3s both;
}

.error-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.9em; color: var(--color-gris);
  line-height: 1.8; margin-bottom: 40px;
  animation: fadeInUp 0.6s ease 0.4s both;
}

.error-actions {
  display: flex; gap: 16px; justify-content: center; align-items: center;
  animation: fadeInUp 0.6s ease 0.5s both;
}

.btn-home {
  display: inline-block; text-decoration: none;
  background: var(--color-noir); color: var(--color-gold-light);
  padding: 14px 32px; font-family: 'Inter', sans-serif;
  font-size: 0.78em; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
  border-radius: 1px; transition: all 0.35s;
}
.btn-home:hover {
  background: var(--color-gold); color: #fff;
  transform: translateY(-2px); box-shadow: 0 10px 24px rgba(201,169,110,0.3);
}

.btn-about {
  font-family: 'Inter', sans-serif; font-size: 0.78em; color: var(--color-gris);
  text-decoration: none; letter-spacing: 1px; text-transform: uppercase;
  padding: 14px 16px; transition: color 0.3s;
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
}
.btn-about:hover { color: var(--color-gold); border-bottom-color: var(--color-gold); }

/* Déco cercles animés */
.not-found-deco { position: absolute; inset: 0; pointer-events: none; }
.deco-ring {
  position: absolute; border-radius: 50%;
  border: 1px solid rgba(201, 169, 110, 0.08);
}
.deco-ring-1 {
  width: 600px; height: 600px;
  left: 50%; top: 50%; transform: translate(-50%, -50%);
  animation: ringPulse 4s ease infinite;
}
.deco-ring-2 {
  width: 900px; height: 900px;
  left: 50%; top: 50%; transform: translate(-50%, -50%);
  animation: ringPulse 4s ease 1s infinite;
}
.deco-ring-3 {
  width: 1200px; height: 1200px;
  left: 50%; top: 50%; transform: translate(-50%, -50%);
  animation: ringPulse 4s ease 2s infinite;
}
@keyframes ringPulse {
  0%, 100% { opacity: 0.5; } 50% { opacity: 0.1; }
}

@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
