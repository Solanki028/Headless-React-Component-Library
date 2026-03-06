import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "../../components/dialog/dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Profile</Dialog.Title>

        <p>Edit your profile</p>

        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Content>
    </Dialog>
  ),
};