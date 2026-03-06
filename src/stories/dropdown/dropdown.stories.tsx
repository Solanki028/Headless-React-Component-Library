import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "../../components/dropdown/dropdown";

const meta = {
    title: "Components/Dropdown",
    component: Dropdown,
    parameters: {
        layout: "centered",
    },
    args: { children: null },
    tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
    args: { children: null },
    render: () => (
        <div style={{ minHeight: "300px" }}>
            <Dropdown>
                <Dropdown.Trigger style={{ padding: "8px 16px", cursor: "pointer" }}>
                    Options
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item onClick={() => console.log("Account clicked")}>
                        Account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => console.log("Settings clicked")}>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => console.log("Logout clicked")}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </div>
    ),
};

export const AccessibilityUsage: Story = {
    render: () => (
        <div style={{ minHeight: "300px" }}>
            <p style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
                Use Arrow keys to navigate, Space/Enter to select, and Typeahead (type "C" for Cherry).
            </p>
            <Dropdown>
                <Dropdown.Trigger style={{ padding: "8px 16px", cursor: "pointer" }}>
                    Select Fruit
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item>Apple</Dropdown.Item>
                    <Dropdown.Item>Banana</Dropdown.Item>
                    <Dropdown.Item>Blueberry</Dropdown.Item>
                    <Dropdown.Item>Cherry</Dropdown.Item>
                    <Dropdown.Item>Cranberry</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </div>
    ),
};

export const EdgeCases: Story = {
    render: () => (
        <div style={{ minHeight: "300px", display: "flex", gap: "20px" }}>
            <Dropdown>
                <Dropdown.Trigger style={{ padding: "8px 16px", cursor: "pointer" }}>
                    Empty List
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <div style={{ padding: "8px", color: "#999" }}>No items available</div>
                </Dropdown.Content>
            </Dropdown>

            <Dropdown>
                <Dropdown.Trigger style={{ padding: "8px 16px", cursor: "pointer" }}>
                    Many Items (Scroll)
                </Dropdown.Trigger>
                <Dropdown.Content style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <Dropdown.Item key={i}>Item {i + 1}</Dropdown.Item>
                    ))}
                </Dropdown.Content>
            </Dropdown>
        </div>
    ),
};
