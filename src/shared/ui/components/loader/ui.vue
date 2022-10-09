<template>
  <div :class="$style.loader"></div>
</template>

<style lang="scss" module>
.loader {
  animation: rotation 0.75s linear infinite;
  border: 1px solid;
  border-color: var(--color-grey-0) transparent;
  border-radius: 50%;
  height: 1em;
  width: 1em;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
