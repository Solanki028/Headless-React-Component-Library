import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../../components/tabs/tabs";

const meta = {
    title: "Components/Tabs",
    component: Tabs,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTabs: Story = {
    render: () => (
        <Tabs defaultValue="account" style={{ width: 400, fontFamily: "sans-serif" }}>
            <Tabs.List style={{ display: "flex", borderBottom: "1px solid #ccc", gap: 10, paddingBottom: 10 }}>
                <Tabs.Trigger
                    value="account"
                    style={{ padding: "8px 16px", cursor: "pointer", border: "none", background: "transparent" }}
                >
                    Account
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="password"
                    style={{ padding: "8px 16px", cursor: "pointer", border: "none", background: "transparent" }}
                >
                    Password
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="settings"
                    style={{ padding: "8px 16px", cursor: "pointer", border: "none", background: "transparent" }}
                >
                    Settings
                </Tabs.Trigger>
            </Tabs.List>
            <div style={{ padding: "20px 0" }}>
                <Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
                <Tabs.Content value="password">Change your password here.</Tabs.Content>
                <Tabs.Content value="settings">Manage your settings here.</Tabs.Content>
            </div>
        </Tabs>
    ),
};

export const ControlledTabs: Story = {
    render: function Render() {
        const [tab, setTab] = React.useState("password");
        return (
            <div style={{ width: 400, fontFamily: "sans-serif" }}>
                <div style={{ marginBottom: 20 }}>
                    <button onClick={() => setTab("account")}>Force Account</button>
                    <span style={{ marginLeft: 10 }}>Current: {tab}</span>
                </div>
                <Tabs value={tab} onValueChange={setTab}>
                    <Tabs.List style={{ display: "flex", borderBottom: "1px solid #ccc", gap: 10, paddingBottom: 10 }}>
                        <Tabs.Trigger
                            value="account"
                            style={{ padding: "8px 16px", cursor: "pointer", border: "none", background: "transparent" }}
                        >
                            Account
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="password"
                            style={{ padding: "8px 16px", cursor: "pointer", border: "none", background: "transparent" }}
                        >
                            Password
                        </Tabs.Trigger>
                    </Tabs.List>
                    <div style={{ padding: "20px 0" }}>
                        <Tabs.Content value="account">Account settings panel</Tabs.Content>
                        <Tabs.Content value="password">Password settings panel</Tabs.Content>
                    </div>
                </Tabs>
            </div>
        );
    },
};

export const VerticalTabs: Story = {
    render: () => (
        <Tabs defaultValue="tab1" orientation="vertical" style={{ display: "flex", width: 400, gap: 20, fontFamily: "sans-serif" }}>
            <Tabs.List style={{ display: "flex", flexDirection: "column", borderRight: "1px solid #ccc", gap: 10, paddingRight: 10 }}>
                <Tabs.Trigger
                    value="tab1"
                    style={{ padding: "8px 16px", textAlign: "left", cursor: "pointer", border: "none", background: "transparent" }}
                >
                    First Tab
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="tab2"
                    style={{ padding: "8px 16px", textAlign: "left", cursor: "pointer", border: "none", background: "transparent" }}
                >
                    Second Tab
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="tab3"
                    style={{ padding: "8px 16px", textAlign: "left", cursor: "pointer", border: "none", background: "transparent" }}
                >
                    Third Tab
                </Tabs.Trigger>
            </Tabs.List>
            <div style={{ flex: 1 }}>
                <Tabs.Content value="tab1">Content for the first tab.</Tabs.Content>
                <Tabs.Content value="tab2">Content for the second tab.</Tabs.Content>
                <Tabs.Content value="tab3">Content for the third tab.</Tabs.Content>
            </div>
        </Tabs>
    ),
};

export const ManualActivationTabs: Story = {
    render: () => (
        <Tabs defaultValue="1" activationMode="manual" style={{ width: 400, fontFamily: "sans-serif" }}>
            <p style={{ fontSize: "12px", color: "gray" }}>Use Arrow keys to focus, Space/Enter to activate.</p>
            <Tabs.List style={{ display: "flex", borderBottom: "1px solid #ccc", gap: 10, paddingBottom: 10 }}>
                <Tabs.Trigger
                    value="1"
                    style={{ padding: "8px 16px", cursor: "pointer", border: "none", background: "transparent" }}
                >
                    Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="2"
                    style={{ padding: "8px 16px", cursor: "pointer", border: "none", background: "transparent" }}
                >
                    Tab 2
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="3"
                    style={{ padding: "8px 16px", cursor: "pointer", border: "none", background: "transparent" }}
                >
                    Tab 3
                </Tabs.Trigger>
            </Tabs.List>
            <div style={{ padding: "20px 0" }}>
                <Tabs.Content value="1">Tab 1 Content</Tabs.Content>
                <Tabs.Content value="2">Tab 2 Content</Tabs.Content>
                <Tabs.Content value="3">Tab 3 Content</Tabs.Content>
            </div>
        </Tabs>
    ),
};
