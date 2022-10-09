<template>
  <div :class="$style.root">
    <div :class="$style.content">
      <h1>
        <slot name="title"></slot>
      </h1>
      <slot name="content"></slot>
    </div>
    <div
      v-if="$slots.sidebar"
      :class="$style.sidebar">
      <slot name="sidebar"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
$sidebar-width: 24rem;
$sidebar-margin: 3rem;
$content-width: calc(100% - $sidebar-width - $sidebar-margin);

.root {
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  max-width: 100%;
  position: relative;
  width: 100%;
}

.sidebar {
  display: inline-flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: $sidebar-margin;
  position: sticky;
  top: 2rem;
  width: $sidebar-width;
}

.content {
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;
  justify-content: flex-start;
  width: $content-width;
}

@media screen and (max-width: 1200px) {
  $sidebar-width: 22rem;
  $sidebar-margin: 2rem;
  $content-width: calc(100% - $sidebar-width - $sidebar-margin);

  .sidebar {
    margin-left: $sidebar-margin;
    width: $sidebar-width;
  }

  .content {
    gap: 1.5rem;
    width: $content-width;
  }
}

@media screen and (max-width: 992px) {
  .root {
    flex-direction: column;
  }

  .sidebar {
    margin: 0;
    margin-top: 2rem;
    min-width: auto;
    position: static;
    top: 0;
    width: 100%;
  }

  .content {
    gap: 1.25rem;
    width: 100%;
  }
}
</style>
