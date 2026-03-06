import React from "react";
import { Accordion } from "../../src/components/accordion/accordion";

describe("<Accordion />", () => {
    it("renders single mode and only allows one open item", () => {
        cy.mount(
            <Accordion type="single" defaultValue="item-1">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>Item 1</Accordion.Trigger>
                    <Accordion.Content>Content 1</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger>Item 2</Accordion.Trigger>
                    <Accordion.Content>Content 2</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        );

        // Intial state
        cy.contains("Content 1").should("exist");
        cy.contains("button", "Item 1").should("have.attr", "aria-expanded", "true");
        cy.contains("Content 2").should("not.exist");
        cy.contains("button", "Item 2").should("have.attr", "aria-expanded", "false");

        // Click Item 2 -> should open Item 2, close Item 1
        cy.contains("button", "Item 2").click();

        cy.contains("Content 2").should("exist");
        cy.contains("button", "Item 2").should("have.attr", "aria-expanded", "true");
        cy.contains("Content 1").should("not.exist");
        cy.contains("button", "Item 1").should("have.attr", "aria-expanded", "false");
    });

    it("prevents collapsing in single mode when collapsible is false", () => {
        cy.mount(
            <Accordion type="single" defaultValue="item-1">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>Item 1</Accordion.Trigger>
                    <Accordion.Content>Content 1</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        );

        cy.contains("Content 1").should("exist");
        cy.contains("button", "Item 1").click(); // Try to close
        cy.contains("Content 1").should("exist"); // Still there
    });

    it("allows collapsing in single mode when collapsible is true", () => {
        cy.mount(
            <Accordion type="single" defaultValue="item-1" collapsible>
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>Item 1</Accordion.Trigger>
                    <Accordion.Content>Content 1</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        );

        cy.contains("Content 1").should("exist");
        cy.contains("button", "Item 1").click(); // Close it
        cy.contains("Content 1").should("not.exist"); // Closed
    });

    it("renders multiple mode and allows many open items", () => {
        cy.mount(
            <Accordion type="multiple" defaultValue={["item-1"]}>
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>Item 1</Accordion.Trigger>
                    <Accordion.Content>Content 1</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger>Item 2</Accordion.Trigger>
                    <Accordion.Content>Content 2</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        );

        cy.contains("Content 1").should("exist");
        cy.contains("Content 2").should("not.exist");

        // Open second item
        cy.contains("button", "Item 2").click();

        // Both should be open
        cy.contains("Content 1").should("exist");
        cy.contains("Content 2").should("exist");

        // Close first item
        cy.contains("button", "Item 1").click();

        cy.contains("Content 1").should("not.exist");
        cy.contains("Content 2").should("exist");
    });

    it("supports a11y keyboard navigation with DOM querying", () => {
        cy.mount(
            <Accordion type="single">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>Item 1</Accordion.Trigger>
                    <Accordion.Content>Content 1</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger>Item 2</Accordion.Trigger>
                    <Accordion.Content>Content 2</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-3">
                    <Accordion.Trigger>Item 3</Accordion.Trigger>
                    <Accordion.Content>Content 3</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        );

        cy.contains("button", "Item 1").focus();
        cy.focused().should("have.text", "Item 1");

        // Down Arrow
        cy.focused().type("{downarrow}");
        cy.focused().should("have.text", "Item 2");

        // Enter to toggle
        cy.focused().type("{enter}");
        cy.contains("Content 2").should("exist");
        cy.contains("button", "Item 2").should("have.attr", "aria-expanded", "true");

        // Down Arrow again
        cy.focused().type("{downarrow}");
        cy.focused().should("have.text", "Item 3");

        // Wrap around via Down
        cy.focused().type("{downarrow}");
        cy.focused().should("have.text", "Item 1");

        // Wrap around via Up
        cy.focused().type("{uparrow}");
        cy.focused().should("have.text", "Item 3");

        // Home
        cy.focused().type("{home}");
        cy.focused().should("have.text", "Item 1");

        // End
        cy.focused().type("{end}");
        cy.focused().should("have.text", "Item 3");

        // Space to toggle
        cy.focused().type(" ");
        cy.contains("Content 3").should("exist");
        cy.contains("Content 2").should("not.exist"); // Single mode auto-closes
    });
});
