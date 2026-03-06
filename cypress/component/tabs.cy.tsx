import { Tabs } from "../../src/components/tabs/tabs";

describe("Tabs Component", () => {
    it("renders default value and switches tabs on click", () => {
        cy.mount(
            <Tabs defaultValue="account">
                <Tabs.List>
                    <Tabs.Trigger value="account">Account</Tabs.Trigger>
                    <Tabs.Trigger value="password">Password</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="account">Account Panel</Tabs.Content>
                <Tabs.Content value="password">Password Panel</Tabs.Content>
            </Tabs>
        );

        // Account is selected by default
        cy.contains("Account Panel").should("exist");
        cy.contains("Password Panel").should("not.exist");

        // Aria states
        cy.contains("button", "Account").should("have.attr", "aria-selected", "true");
        cy.contains("button", "Password").should("have.attr", "aria-selected", "false");

        // Click to switch
        cy.contains("button", "Password").click();
        cy.contains("Account Panel").should("not.exist");
        cy.contains("Password Panel").should("exist");
        cy.contains("button", "Password").should("have.attr", "aria-selected", "true");
    });

    it("supports keyboard navigation (ArrowRight/ArrowLeft) and automatic activation", () => {
        cy.mount(
            <Tabs defaultValue="first">
                <Tabs.List>
                    <Tabs.Trigger value="first">1</Tabs.Trigger>
                    <Tabs.Trigger value="second">2</Tabs.Trigger>
                    <Tabs.Trigger value="third">3</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="first">C1</Tabs.Content>
                <Tabs.Content value="second">C2</Tabs.Content>
                <Tabs.Content value="third">C3</Tabs.Content>
            </Tabs>
        );

        // Focus first tab
        cy.contains("button", "1").focus();
        cy.focused().type("{rightarrow}");

        // Should move focus AND activate automatically
        cy.focused().should("have.text", "2");
        cy.contains("C2").should("exist");

        // Should wrap around with Home/End
        cy.focused().type("{end}");
        cy.focused().should("have.text", "3");
        cy.contains("C3").should("exist");

        cy.focused().type("{rightarrow}"); // Wrap to first
        cy.focused().should("have.text", "1");
        cy.contains("C1").should("exist");
    });

    it("supports manual activation mode (Space/Enter)", () => {
        cy.mount(
            <Tabs defaultValue="first" activationMode="manual">
                <Tabs.List>
                    <Tabs.Trigger value="first">1</Tabs.Trigger>
                    <Tabs.Trigger value="second">2</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="first">C1</Tabs.Content>
                <Tabs.Content value="second">C2</Tabs.Content>
            </Tabs>
        );

        cy.contains("button", "1").focus();
        cy.focused().type("{rightarrow}");

        // Focus moves, but panel doesn't change
        cy.focused().should("have.text", "2");
        cy.contains("button", "2").should("have.attr", "aria-selected", "false");
        cy.contains("C1").should("exist");
        cy.contains("C2").should("not.exist");

        // Press Space to activate
        cy.focused().type(" ");
        cy.contains("button", "2").should("have.attr", "aria-selected", "true");
        cy.contains("C2").should("exist");
        cy.contains("C1").should("not.exist");
    });

    it("supports vertical orientation with ArrowUp/ArrowDown", () => {
        cy.mount(
            <Tabs defaultValue="first" orientation="vertical">
                <Tabs.List>
                    <Tabs.Trigger value="first">1</Tabs.Trigger>
                    <Tabs.Trigger value="second">2</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="first">C1</Tabs.Content>
                <Tabs.Content value="second">C2</Tabs.Content>
            </Tabs>
        );

        cy.contains("button", "1").focus();
        // Right arrow shouldn't work for vertical
        cy.focused().type("{rightarrow}");
        cy.focused().should("have.text", "1");

        // Down arrow should work
        cy.focused().type("{downarrow}");
        cy.focused().should("have.text", "2");
        cy.contains("C2").should("exist");
    });

    it("restricts tabindex so only selected is in tab flow", () => {
        cy.mount(
            <Tabs defaultValue="first">
                <Tabs.List>
                    <Tabs.Trigger value="first">1</Tabs.Trigger>
                    <Tabs.Trigger value="second">2</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="first">C1</Tabs.Content>
                <Tabs.Content value="second">C2</Tabs.Content>
            </Tabs>
        );

        cy.contains("button", "1").should("have.attr", "tabindex", "0");
        cy.contains("button", "2").should("have.attr", "tabindex", "-1");
    });
});
