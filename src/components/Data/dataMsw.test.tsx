import { screen, render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApiCall } from "./data";
import { rest } from 'msw';
import { setupServer, } from 'msw/node';

const server = setupServer(
    rest.get("https://dummyjson.com/products", async (req, res, ctx) => {
        return res(
            ctx.json({
                products: [
                    { id: 100, title: "title 100" },
                    { id: 200, title: "title 200" }
                ]
            })
        )
    }),
    rest.delete("https://dummyjson.com/products/100", async (req, res, ctx) => {
        return res(
            ctx.json({
                status: 200
            })
        )
    }),
    rest.patch("https://dummyjson.com/products/200", async (req, res, ctx) => {
        return res(
            ctx.json({
                status: 200
            })
        )
    }),
    rest.post("https://dummyjson.com/products/add", async (req, res, ctx) => {
        return res(
            ctx.json({
                status: 200
            })
        )
    })
)

beforeAll(() => server.listen());
afterAll(() => server.close());
//afterEach(() => server.resetHandlers());

describe("MSW", () => {
    beforeEach(() => {
        act(() => render(<ApiCall />));
    })

    it("Should fetch data successfully", async () => {
        expect((await screen.findAllByDisplayValue('title 100')).length).toBeGreaterThan(0);
        expect((await screen.findAllByDisplayValue('title 200')).length).toBeGreaterThan(0);
    })

    it("Should delete data successfully when the delete button is clicked", async () => {
        const deleteBtn = await screen.findByRole("button", { name: "Delete Axios 100" })
        userEvent.click(deleteBtn);

        await waitFor(() => {
            expect(screen.queryByPlaceholderText("axios update value 100")).not.toBeInTheDocument();
        })
    })

    it("Should update data successfully when filled the input and the update button is clicked", async () => {
        const updateInput = await screen.findByPlaceholderText("axios update value 200");
        const updateBtn = await screen.findByRole("button", { name: "Update Axios 200" });

        userEvent.type(updateInput, "{selectall}The input has been updated");
        userEvent.click(updateBtn);

        await waitFor(() => {
            expect(screen.getByDisplayValue("The input has been updated")).toBeInTheDocument();
        })
    })

    it("Should add data successfully when filled the input and the add button is clicked", async () => {
        const updateInput = await screen.findByPlaceholderText("axios value");
        const updateBtn = await screen.findByRole("button", { name: "ADD AXIOS" });

        userEvent.type(updateInput, "{selectall}iphone 14 pro max");
        userEvent.click(updateBtn);

        await waitFor(() => {
            expect(screen.getByDisplayValue("iphone 14 pro max")).toBeInTheDocument();
        })
    })

})