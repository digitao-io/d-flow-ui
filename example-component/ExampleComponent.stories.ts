import type { Meta, StoryObj } from "@storybook/vue3";
import { ExampleComponent } from ".";

const meta: Meta<typeof ExampleComponent> = {
  title: "ExampleComponent",
  component: ExampleComponent,
  render: (args) => ({
    components: { ExampleComponent },
    setup() {
      return args;
    },
    template: `
      <div>
        <example-component
          :message="message"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof ExampleComponent>;

export const Default: Story = {
  args: {
    message: "hello world",
  },
};
