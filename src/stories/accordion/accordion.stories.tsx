import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../../components/accordion/accordion";
import "./accordion-stories.css";

const meta: Meta<typeof Accordion> = {
    title: "Components/Accordion",
    component: Accordion,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const SingleAccordion: Story = {
    render: function Render() {
        return (
            <div className="accordion-wrapper">
                <h3>Single Expand Mode</h3>
                <Accordion type="single" defaultValue="item-1">
                    <Accordion.Item value="item-1" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            Is it accessible?
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="item-2" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            Is it unstyled?
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            Yes. It's completely unstyled by default, giving you freedom over the look and feel.
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="item-3" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            Can it be animated?
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            Yes! You can animate the Accordion with CSS or JavaScript.
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    },
};

export const CollapsibleAccordion: Story = {
    render: function Render() {
        return (
            <div className="accordion-wrapper">
                <h3>Collapsible (Single) Mode</h3>
                <Accordion type="single" defaultValue="item-1" collapsible>
                    <Accordion.Item value="item-1" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            Click me to close me
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            Because `collapsible` is true, clicking the open trigger will close it, leaving nothing open.
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="item-2" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            Another section
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            More content here!
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    },
};

export const MultipleAccordion: Story = {
    render: function Render() {
        return (
            <div className="accordion-wrapper">
                <h3>Multiple Expand Mode</h3>
                <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
                    <Accordion.Item value="item-1" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            First Section (Default Open)
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            I am open.
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="item-2" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            Second Section (Default Open)
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            I am also open!
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="item-3" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            Third Section
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            You can open me without closing the others.
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    },
};

export const ControlledAccordion: Story = {
    render: function Render() {
        const [value, setValue] = useState<string[]>([]);

        return (
            <div className="accordion-wrapper">
                <h3>Controlled (Multiple) Mode</h3>
                <p style={{ marginBottom: 16 }}>Currently Open: {value.join(", ") || "None"}</p>

                <Accordion
                    type="multiple"
                    value={value}
                    onValueChange={setValue}
                >
                    <Accordion.Item value="ctrl-1" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            Controlled Item 1
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            State is managed entirely by the parent component.
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value="ctrl-2" className="accordion-item">
                        <Accordion.Trigger className="accordion-trigger">
                            Controlled Item 2
                        </Accordion.Trigger>
                        <Accordion.Content className="accordion-content">
                            State is managed entirely by the parent component.
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    },
};
