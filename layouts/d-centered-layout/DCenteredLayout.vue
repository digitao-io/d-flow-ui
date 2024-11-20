<template>
  <div
    class="d-centered-layout"
  >
    <slot name="display_name" />
  </div>
</template>

<style lang="scss" scoped>
.d-centered-layout {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
