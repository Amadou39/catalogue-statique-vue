<script setup>
defineProps(['categories', 'activeCategory']);
defineEmits(['filter-change']);
</script>

<template>
  <div class="filter-section">
    <div class="filter-wrapper">
      <button
          v-for="category in categories"
          :key="category"
          class="filter-btn"
          :class="{ active: activeCategory === category }"
          @click="$emit('filter-change', category)"
      >
        {{ category }}
      </button>
    </div>
    <div class="filter-line">
      <span class="filter-accent"></span>
    </div>
  </div>
</template>

<style scoped>
.filter-section {
  margin-bottom: 50px;
  text-align: center;
}

.filter-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 1px solid rgba(201, 169, 110, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.filter-btn {
  background: transparent;
  border: none;
  border-right: 1px solid rgba(201, 169, 110, 0.2);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  cursor: pointer;
  padding: 12px 28px;
  color: var(--color-gris);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.filter-btn:last-child {
  border-right: none;
}

.filter-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-noir);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s ease;
  z-index: 0;
}

.filter-btn:hover::before {
  transform: scaleY(0.06);
}

.filter-btn:hover {
  color: var(--color-noir);
}

.filter-btn.active {
  background: var(--color-noir);
  color: var(--color-gold-light);
  font-weight: 600;
}

.filter-line {
  width: 60px;
  height: 1px;
  background: rgba(201, 169, 110, 0.3);
  margin: 16px auto 0;
}
</style>