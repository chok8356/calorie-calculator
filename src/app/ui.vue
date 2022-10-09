<template>
  <div class="app">
    <aside class="aside scrollbar">
      <RouterLink
        v-for="(route, index) in routes"
        :key="index"
        class="asideItem"
        :title="route.meta?.title"
        :to="route.path">
        <component :is="route.meta?.icon"></component>
      </RouterLink>

      <ToggleDarkMode
        class="asideItem asideItemSmall spacer"
        title="Toggle dark mode">
        <IconEclipseAlt />
      </ToggleDarkMode>

      <a
        class="asideItem asideItemSmall"
        href="https://github.com/chok8356"
        target="_blank"
        title="Github">
        <IconGithub></IconGithub>
      </a>
    </aside>
    <main class="main">
      <Routing />
    </main>
  </div>
</template>

<script setup lang="ts">
import { routes, Routing } from '../pages';
import { ToggleDarkMode } from '@/features/toggle-dark-mode';
import { IconEclipseAlt, IconGithub } from '@/shared/ui/icons';
</script>

<style lang="scss">
@import './index.scss';

$padding: 2rem;
$aside-item-size: 4rem;

$aside-scroll-padding: 0.75rem;
$aside-width: 4rem + $aside-scroll-padding;

.app {
  display: block;
  height: auto;
  margin: 0 auto;
  max-width: calc(1200px + #{$padding * 2});
  min-height: 100vh;
  padding: $padding;
  width: 100vw;
}

.main {
  padding-left: calc($aside-width - $aside-scroll-padding + 3rem);
  width: 100%;
}

.aside {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: calc(100vh - #{$padding * 2});
  justify-content: flex-start;
  left: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  top: auto;
  width: $aside-width;
  z-index: 1;

  &Item {
    align-items: center;
    background-color: var(--color-grey-10);
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    color: var(--color-grey-50);
    cursor: pointer;
    display: inline-flex;
    font-size: 2rem;
    height: auto;
    justify-content: center;
    padding: 1rem;
    -webkit-user-drag: none;
    user-select: none;
    width: auto;

    &:hover {
      background-color: var(--color-grey-15);
      color: var(--color-grey-65);
    }

    &.active,
    &.active:hover {
      background-color: var(--color-grey-0);
      color: var(--color-primary-50);
    }

    &Small {
      background-color: transparent !important;
      box-shadow: none;
      padding: 0.5rem 1rem;
    }

    &.spacer {
      margin-top: auto;
    }
  }
}

@media screen and (max-width: 1200px) {
  .main {
    padding-left: calc($aside-width - $aside-scroll-padding + 2rem);
  }
}

@media screen and (max-width: 768px) {
  .app {
    padding: 1rem;
  }

  .main {
    padding-bottom: calc($aside-width + 2rem);
    padding-left: 0;
    width: 100%;
  }

  .aside {
    align-items: center;
    background-color: var(--color-grey-0);
    bottom: 0;
    box-shadow: var(--shadow-aside);
    flex-flow: row wrap;
    height: $aside-width;
    justify-content: center;
    left: 0;
    min-height: auto;
    position: fixed;
    width: 100%;
    z-index: 1;

    &Item {
      font-size: 1.75rem;
      padding: 0.5rem;

      &.spacer {
        margin-left: 1rem;
        margin-top: 0;
      }
    }
  }
}
</style>
