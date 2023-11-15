import { act, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { Counter } from "./counter";
import user from '@testing-library/user-event';


describe("Counter Loading +", () => {
    beforeEach(() => {
        render(<Counter description="Loading" defaultCount={1} />);
    });

    it("Should display 'Loading', 'Current Count: 1'", () => {
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
    });

    describe("When we change the input value to 5 and click either + or - btn", () => {
        beforeEach(() => {
            act(() => {
                const incrementorInput = screen.getByPlaceholderText("incrementor");
                user.type(incrementorInput, "{selectall}5");
            })
        })

        it("Should show 6 when + is clicked ", async () => {
            act(() => {
                const incrementButton = screen.getByRole("button", { name: "increment" });
                user.click(incrementButton);
            })

            // await waitForElementToBeRemoved(() => screen.queryByText("Loading..."), { timeout: 2000 })

            await waitFor(() => {
                expect(screen.getByText("Current Count: 6")).toBeInTheDocument();
            }, { timeout: 2000 });
        })


        it("Should show -4 when - is clicked ", async () => {
            act(() => {
                const decrementButton = screen.getByRole("button", { name: "decrement" });
                user.click(decrementButton);
            })

            await waitFor(() => {
                expect(screen.getByText("Current Count: -4")).toBeInTheDocument();
            }, { timeout: 2000 });
        })
    })

});


/*describe("Counter Loading +", () => {
    beforeEach(() => {
        render(<Counter description="Loading" defaultCount={1} />);
    });

    it("Should display 'Loading', 'Current Count: 1', change incrementor to 5, click - button, display 'Current Count: 6'", async () => {

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();

        act(() => {
            const incrementorInput = screen.getByPlaceholderText("incrementor");
            user.type(incrementorInput, "{selectall}5");
        })

        act(() => {
            const incrementButton = screen.getByRole("button", { name: "increment" });
            user.click(incrementButton);
        })

        await waitFor(() => {
            expect(screen.getByText("Current Count: 6")).toBeInTheDocument();
        }, { timeout: 2000 });
    });
});

describe("Counter Loading -", () => {
    beforeEach(() => {
        render(<Counter description="Loading" defaultCount={1} />);
    });

    it("Sould Display 'Loading', 'Current Count: 1', 'Change incrementor to 5', click + btn, display 'Current Count: -4' ", async () => {

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();

        act(() => {
            const incrementorInput = screen.getByPlaceholderText("incrementor")
            user.type(incrementorInput, "{selectall}5")
        })

        act(() => {
            const incrementButton = screen.getByRole("button", { name: "decrement" })
            user.click(incrementButton);
        })

        await waitFor(() => {
            expect(screen.getByText("Current Count: -4")).toBeInTheDocument();
        }, { timeout: 2000 });
    })
})*/

