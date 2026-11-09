<script setup lang="ts">
import { withBase } from 'vitepress'

</script>

<template>
  <div class="NotFound">
    <p class="code">404</p>
    <h1 class="title">PAGE NOT FOUND</h1>
    <div class="divider" />
    This page could not be found.<br>
    This site is still very empty, so this page may have been moved or is still in progress.<br>
    If it should exist, please consider <a href="https://github.com/Bopl-Battle-Modding-Community/docs">contributing your knowledge</a> and help this site grow. 

    <div class="action">
      <a
        class="link"
        href="/"
        aria-label="go to home"
      >
        Go home
      </a>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .NotFound {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition:
  
    border-color 0.25s,
    color 0.25s;
}

a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  transition-duration: 0.2s;
}

a:hover {
  color: var(--vp-c-brand-2);
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>