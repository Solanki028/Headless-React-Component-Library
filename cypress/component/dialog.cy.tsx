import { Dialog } from "../../src/components/dialog/dialog";

describe("Dialog Component", () => {

    it("opens modal on trigger click", () => {
        cy.mount(
            <Dialog>
                <Dialog.Trigger>Open</Dialog.Trigger>

                <Dialog.Content>
                    <Dialog.Title>Settings</Dialog.Title>
                </Dialog.Content>
            </Dialog>
        );

        cy.contains("Open").click();

        cy.contains("Settings").should("exist");
    });


    it("closes dialog on escape key", () => {
        cy.mount(
            <Dialog>
                <Dialog.Trigger>Open</Dialog.Trigger>

                <Dialog.Content>
                    <Dialog.Title>Settings</Dialog.Title>
                </Dialog.Content>
            </Dialog>
        );

        cy.contains("Open").click();

        cy.get("body").type("{esc}");

        cy.contains("Settings").should("not.exist");
    });


    it("closes dialog on overlay click", () => {
        cy.mount(
            <Dialog>
                <Dialog.Trigger>Open</Dialog.Trigger>

                <Dialog.Content>
                    <Dialog.Title>Settings</Dialog.Title>
                </Dialog.Content>
            </Dialog>
        );

        cy.contains("Open").click();

        // Click the backdrop (outer container)
        cy.get('[role="presentation"]').click('topLeft', { force: true });

        cy.contains("Settings").should("not.exist");
    });

    it("traps focus inside dialog", () => {
        cy.mount(
            <Dialog>
                <Dialog.Trigger>Open</Dialog.Trigger>

                <Dialog.Content>
                    <Dialog.Title>Settings</Dialog.Title>

                    <input placeholder="Name" />
                    <button>Save</button>

                    <Dialog.Close>Close</Dialog.Close>
                </Dialog.Content>
            </Dialog>
        );

        cy.contains("Open").click();

        cy.get("input").focus();

        cy.focused().tab();

        cy.focused().should("have.text", "Save");
    });

});