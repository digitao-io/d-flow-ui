<script setup lang="ts">
export interface MainMenuConfig {
  name: string;
  label: string;
  url: string;
}

export interface SideMenuProps {
  userName: string;
  menuItems: MainMenuConfig[];
  currentMenuItem: string;
}

const props = defineProps<SideMenuProps>();
</script>

<template>
  <header class="side-menu">
    <section class="side-menu_title-section">
      <slot name="title">
        <div class="side-menu_default-title">
          d-flow<br>
          Backstage
        </div>
      </slot>
    </section>

    <section class="side-menu_welcome-section">
      Welcome, <span class="side-menu_user-name">{{ props.userName }}</span>!
    </section>

    <nav class="side-menu_menu-section">
      <ul class="side-menu_nav-list">
        <li
          v-for="menuItem in props.menuItems"
          :key="menuItem.name"
          class="side-menu_nav-item"
        >
          <a
            v-if="menuItem.name !== props.currentMenuItem"
            :href="menuItem.url"
          >
            {{ menuItem.label }}
          </a>
          <span v-else>
            {{ menuItem.label }}
          </span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.side-menu {
  padding: var(--gap-8) var(--gap-6);
  width: max-content;

  color: var(--color-fg-l);
  background-color: var(--color-bg-d);
}

.side-menu_default-title {
  font-size: var(--font-size-6);
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-compact);
}

.side-menu_welcome-section {
  margin-top: var(--gap-8);
}

.side-menu_user-name {
  font-weight: bold;
}

.side-menu_menu-section {
  margin-top: var(--gap-8);
}

.side-menu_nav-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
