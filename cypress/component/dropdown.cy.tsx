import { Dropdown } from "../../src/components/dropdown/dropdown";

describe("Dropdown Component", () => {
    it("opens on trigger click and closes on escape", () => {
        cy.mount(
            <Dropdown>
                <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item>Item 1</Dropdown.Item>
                    <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        );

        cy.contains("Item 1").should("not.exist");
        cy.contains("Open Menu").click();
        cy.contains("Item 1").should("exist");

        cy.get("body").type("{esc}");
        cy.contains("Item 1").should("not.exist");
    });

    it("closes when an item is clicked", () => {
        cy.mount(
            <Dropdown>
                <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item>Item 1</Dropdown.Item>
                    <Dropdown.Item>Item 2</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        );

        cy.contains("Open Menu").click();
        cy.contains("Item 1").click();
        cy.contains("Item 1").should("not.exist");
    });

    it("supports keyboard navigation (ArrowDown, ArrowUp, Enter)", () => {
        cy.mount(
            <div style={{ padding: '50px' }}>
                <Dropdown>
                    <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item>Item 1</Dropdown.Item>
                        <Dropdown.Item>Item 2</Dropdown.Item>
                        <Dropdown.Item>Item 3</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        );

        // Press ArrowDown on trigger to open menu
        cy.contains("Open Menu").focus().type("{downarrow}");

        // First item should be focused automatically
        cy.focused().should("contain.text", "Item 1");

        // Test ArrowDown
        cy.focused().type("{downarrow}");
        cy.focused().should("contain.text", "Item 2");

        // Test ArrowUp
        cy.focused().type("{uparrow}");
        cy.focused().should("contain.text", "Item 1");

        // Wrap around to bottom
        cy.focused().type("{uparrow}");
        cy.focused().should("contain.text", "Item 3");

        // Press Enter to select
        cy.focused().type("{enter}");
        cy.contains("Item 3").should("not.exist");
    });

    it("supports typeahead search", () => {
        cy.mount(
            <Dropdown>
                <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item>Apple</Dropdown.Item>
                    <Dropdown.Item>Banana</Dropdown.Item>
                    <Dropdown.Item>Cherry</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        );

        cy.contains("Open Menu").click();

        cy.focused().type("b");
        cy.focused().should("contain.text", "Banana");

        cy.wait(600); // Wait for typeahead timeout to clear

        cy.focused().type("c");
        cy.focused().should("contain.text", "Cherry");
    });
});
