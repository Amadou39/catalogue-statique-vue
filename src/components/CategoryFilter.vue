<script setup>
defineProps(['categories', 'activeCategory']);
defineEmits(['filter-change']);
</script>

<template>
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
</template>

<style scoped>
.filter-wrapper {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
}

.filter-btn {
  background: none;
  border: none;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  padding-bottom: 5px;
  color: #888;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.filter-btn:hover {
  color: #333;
}

.filter-btn.active {
  color: #000;
  font-weight: bold;
  border-bottom: 2px solid #000;
}
</style>