import * as React from "react";
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
      <Dialog.Trigger style={{ padding: "8px 16px", background: "#3b82f6", color: "white", borderRadius: "6px", border: "none", cursor: "pointer" }}>
        Open Dialog
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Profile Settings</Dialog.Title>
        <p style={{ color: "#4b5563", marginBottom: "1.5rem" }}>Update your profile information here. Changes will be saved automatically.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          <label style={{ fontSize: "14px", fontWeight: 500 }}>Name</label>
          <input type="text" defaultValue="Priyanshu" style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }} />
        </div>

        <Dialog.Close style={{ padding: "8px 16px", background: "#f3f4f6", borderRadius: "6px", border: "none", cursor: "pointer" }}>
          Close
        </Dialog.Close>
      </Dialog.Content>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <p style={{ marginBottom: "10px" }}>State: {open ? "Open" : "Closed"}</p>
        <button onClick={() => setOpen(true)}>Force Open from Outside</button>
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Content>
            <Dialog.Title>Controlled Dialog</Dialog.Title>
            <p>This dialog's state is managed by the parent story.</p>
            <button onClick={() => setOpen(false)}>Close via State</button>
          </Dialog.Content>
        </Dialog>
      </div>
    );
  },
};

export const AccessibilityUsage: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: "16px", maxWidth: "400px", fontSize: "14px", color: "#666" }}>
        <b>WCAG Compliance Checklist:</b><br />
        1. Escape key closes the dialog.<br />
        2. Focus is trapped inside while open.<br />
        3. Focus returns to the trigger on close.<br />
        4. Backdrop click closes the dialog.
      </p>
      <Dialog>
        <Dialog.Trigger style={{ padding: "10px 20px" }}>Test Focus Trap</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Accessibility Test</Dialog.Title>
          <input placeholder="First focusable" style={{ display: "block", marginBottom: "10px" }} />
          <button style={{ display: "block", marginBottom: "10px" }}>Middle Button</button>
          <Dialog.Close>Last focusable (Close)</Dialog.Close>
        </Dialog.Content>
      </Dialog>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "20px" }}>
      <Dialog>
        <Dialog.Trigger>Large Content (Scrollable)</Dialog.Trigger>
        <Dialog.Content style={{ maxHeight: "80vh", overflowY: "auto", width: "500px" }}>
          <Dialog.Title>Terms of Service</Dialog.Title>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} style={{ marginBottom: "15px" }}>
              Clause {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Proin vel dapiubs libero. This confirms that the focus trap works even with
              overflowing content.
            </p>
          ))}
          <Dialog.Close>I Accept</Dialog.Close>
        </Dialog.Content>
      </Dialog>

      <Dialog>
        <Dialog.Trigger>No Title (ARIA warning)</Dialog.Trigger>
        <Dialog.Content>
          <p>This dialog is missing a Dialog.Title. Check console for possible ARIA labelling warnings.</p>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog>
    </div>
  ),
};