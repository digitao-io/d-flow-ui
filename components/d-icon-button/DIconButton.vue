<template>
  <button
    class="d-icon-button"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.d-icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: tokens.$input-size;
  height: tokens.$input-size;
  @include tokens.typography-text;
  border-radius: 50%;
  border: none;
  background-color: tokens.$color-flavor2l;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }

  &:hover,
  &:active {
      background-color: tokens.$color-flavor2l-t1;
  }
}

</style>
