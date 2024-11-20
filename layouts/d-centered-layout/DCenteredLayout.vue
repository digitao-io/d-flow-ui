<template>
  <div class="d-centered-layout">
    <div class="d-centered-layout__content">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.d-centered-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
