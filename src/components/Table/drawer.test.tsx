import { render, screen, act, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TableUI } from "./table";

/*jest.mock("@mui/material", () => ({
    ...jest.requireActual("@mui/material"),
    SwipeableDrawer: jest.fn(() => <div>HELLLOO</div>)
}))*/

describe("Drawer Test", () => {
    it("should display the drawer", () => {
        render(<TableUI onMoney={jest.fn()} />)

        act(() => userEvent.click(screen.getByRole("button", { name: "Open Drawer" })))
        expect(screen.getByText("Hello Youtube !")).toBeInTheDocument()
        //expect(screen.getByText("HELLLOO")).toBeInTheDocument() // Normalement this ligne doit marché si on utilise le mock 
    })

})