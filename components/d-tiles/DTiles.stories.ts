import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DTiles } from ".";

const meta: Meta<typeof DTiles> = {
  title: "Components/DTiles",
  component: DTiles,
  render: (args) => ({
    components: { DTiles },
    setup() {
      const selectedTileKey = ref<string | null>(null);

      function onSelectTile(key: string | null) {
        selectedTileKey.value = key;
      }

      return {
        args,
        selectedTileKey,
        onSelectTile,
      };
    },

    template: `
      <div>
        <d-tiles
          v-bind="args"
          :selected-tile-key="selectedTileKey"
          tile-width="150px"
          tile-height="180px"
          tile-gap="0.5rem"
          @select-tile="onSelectTile"
        >
          <template #tile="{ data }">
            <div>
              <img
                :src="data.thumbnailUrl"
                style="display:block; width:100%;"
              >
              <p style="margin:0; padding:0.25rem; font-size:0.8rem; text-align:center;">
                {{ data.name }}
              </p>
            </div>
          </template>
        </d-tiles>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DTiles>;

export const Default: Story = {
  args: {
    keyExtractor: (tileData) => tileData.id,
    data: [
      { id: "a", thumbnailUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/600`, name: "Foo Picture 1" },
      { id: "b", thumbnailUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/600`, name: "Bar Image 1" },
      { id: "c", thumbnailUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/600`, name: "Baz Photo 1" },
      { id: "d", thumbnailUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/600`, name: "Foo Picture 2" },
      { id: "e", thumbnailUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/600`, name: "Bar Image 2" },
      { id: "f", thumbnailUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/600`, name: "Baz Photo 2" },
    ],
  },
};
