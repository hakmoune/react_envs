import { render, waitFor, screen, act } from "@testing-library/react";
import { ApiCall } from "./data";
import axios from "axios";
import userEvent from "@testing-library/user-event";

jest.mock('axios'); // mock the axios library
jest.mock('node-fetch');  // mock the fetch node 

//const mickedAxiosGet = (axios.get as jest.Mock); // Refactorisation

describe("Axios", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it("Axios data successfully", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { products: [{ id: 999, title: 'Dummy Product' }] } }); // control its behavior 

        render(<ApiCall />);

        await waitFor(() => {
            const inputElement = screen.getByDisplayValue('Dummy Product'); // find input element has a display value equal 'Dummy Product'.
            expect(inputElement).toBeInTheDocument();
            expect(inputElement).toHaveValue('Dummy Product'); // Optional
        });
    })

    it("Axios Should delete a product when the delete button is clicked", async () => {
        const data = { data: { products: [{ id: 1, title: "product1" }, { id: 2, title: "product2" }] } };

        (axios.get as jest.Mock).mockResolvedValue(data);
        (axios.delete as jest.Mock).mockResolvedValue({ status: 200 });

        render(<ApiCall />);

        const element1 = await screen.findByDisplayValue('product1');
        const element2 = await screen.findByDisplayValue('product2');
        const deleteButton = await screen.findByRole('button', { name: `Delete Axios 1` })

        userEvent.click(deleteButton);
        expect(axios.delete).toHaveBeenCalledWith('https://dummyjson.com/products/1');
        expect(axios.delete).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(element1).not.toBeInTheDocument();
            expect(element2).toBeInTheDocument();
        })
    })

    it("Axios Should add a product when the add button is clicked", async () => {
        const addedData = { id: 5, title: 'item5' };
        (axios.post as jest.Mock).mockResolvedValue({ status: 200, data: addedData });

        render(<ApiCall />);

        const addInputValue = screen.getByPlaceholderText('axios value');
        const addBtn = screen.getByRole("button", { name: "ADD AXIOS" });

        userEvent.type(addInputValue, "{selectall}item5")
        userEvent.click(addBtn);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                "https://dummyjson.com/products/add",
                { title: 'item5' },
                { headers: { "Content-Type": "application/json" } }
            );

            expect(screen.getByDisplayValue('item5')).toBeInTheDocument();
        });
    })

    it("Axios Should update a product when the update button is clicked", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { products: [{ id: 888, title: 'pp1' }] } });
        (axios.patch as jest.Mock).mockResolvedValue({ status: 200 });

        render(<ApiCall />)
        expect(await screen.findByDisplayValue("pp1")).toBeInTheDocument();

        const updateBtn = await screen.findByRole("button", { name: "Update Axios 888" });
        const inputValue = await screen.getByPlaceholderText("axios update value 888");
        userEvent.type(inputValue, "{selectall}iphone 14 pro max")
        userEvent.click(updateBtn)

        expect(axios.patch).toHaveBeenCalledWith(
            "https://dummyjson.com/products/888",
            { title: "iphone 14 pro max" },
            { headers: { "Content-Type": "application/json" } }
        )

        await waitFor(() => {
            expect(screen.getByDisplayValue("iphone 14 pro max")).toBeInTheDocument();
        })
    })
})

describe("Fetch", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Fetch data successfully", async () => {
        const mockData = { products: [{ id: 99, title: 'element 1' }, { id: 100, title: 'element 2' }] };

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData), // json() method is called on the response object returned by fetch
        });

        act(() => render(<ApiCall />)); // act() ensures all updates are processed before continuing

        await waitFor(() => {
            expect(screen.getByDisplayValue('element 1')).toBeInTheDocument();
            expect(screen.getByDisplayValue('element 2')).toBeInTheDocument();
        })
    })

    it("Fetch Should delete a product when the delete button is clicked", async () => {
        const dataMocked = { products: [{ id: 101, title: 'item 101' }, { id: 102, title: 'item 102' }] };

        global.fetch = jest.fn(); // Here we mock the global fetch methode of JS 
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue(dataMocked)
            })
            .mockResolvedValueOnce({
                ok: true,
            });

        act(() => render(<ApiCall />))

        const item1 = await screen.findByDisplayValue("item 101");
        const item2 = await screen.findByDisplayValue("item 102");
        const deleteBtn = await screen.findByRole("button", { name: 'Delete Fetch 101' });

        userEvent.click(deleteBtn);

        expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products/101', {
            method: 'DELETE',
        });

        await waitFor(() => {
            expect(item1).not.toBeInTheDocument();
            expect(item2).toBeInTheDocument();
        }, { timeout: 5000 })
    })

    it("Fetch should update an product whet the update button is clicked", async () => {
        const mockData = { products: [{ id: 199, title: 'item 199' }, { id: 200, title: 'item 200' }] }

        global.fetch = jest.fn();
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue(mockData)
            })
            .mockResolvedValueOnce({
                ok: true,
            });

        act(() => render(<ApiCall />));
        expect(await screen.findByDisplayValue("item 199")).toBeInTheDocument();
        expect(await screen.findByDisplayValue("item 200")).toBeInTheDocument();

        const inputUpdate = await screen.findByPlaceholderText("fetch update value 199")
        const updateButton = await screen.getByRole("button", { name: "Update Fetch 199" })

        userEvent.type(inputUpdate, "{selectall}itemIsUpdated")
        userEvent.click(updateButton)

        expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products/199', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'itemIsUpdated'
            })
        })

        await waitFor(() => {
            expect(screen.queryByDisplayValue("item 199")).not.toBeInTheDocument();
            expect(screen.getByDisplayValue("itemIsUpdated")).toBeInTheDocument();
        })
    })

    it("Fetch should ad an product whet the add button is clicked", async () => {
        const mockData = { products: [{ id: 300, title: "product 300" }, { id: 301, title: "product 301" }] }

        global.fetch = jest.fn();
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue(mockData)
            }).mockResolvedValueOnce({
                ok: true
            })

        act(() => render(<ApiCall />))

        expect(await screen.findByDisplayValue("product 300")).toBeInTheDocument();
        expect(await screen.findByDisplayValue("product 301")).toBeInTheDocument();

        const inputElement = await screen.findByPlaceholderText("fetch value");
        const addButton = await screen.findByRole("button", { name: "ADD FETCH" })

        userEvent.type(inputElement, "{selectall}product 302")
        userEvent.click(addButton)

        expect(global.fetch).toHaveBeenCalledWith("https://dummyjson.com/products/add", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: "product 302"
            })
        })

        await waitFor(() => {
            expect(screen.getByDisplayValue("product 302")).toBeInTheDocument();
        })
    })
})

