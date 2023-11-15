import { TableUI } from "./table";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
/*import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { mocked } from "jest-mock";*/


// C'est on ne fait pas apelle a cette fonction(callback) c'est comme on va faire le mock pour tout le module
/*jest.mock('@mui/x-data-grid', () => ({ 
    ...jest.requireActual('@mui/x-data-grid'),
    DataGrid: jest.fn(() => <div>Table</div>),
}));

//This line is using mocked from the ts-jest/utils package to get a mocked version of the DataGrid component. 
//This can be useful for type checking and accessing properties like mock.calls or mock.instances for assertions in your tests.
const mockedDataGrid = mocked(DataGrid);*/

describe("My MUI Component", () => {
    /*beforeEach(() => {
        mockedDataGrid.mockClear();
    });*/

    it("Renders MUI Grid with Column and Row", () => {
        const onMoney = jest.fn();
        render(<TableUI onMoney={onMoney} />)

        const btn = screen.getByRole("button", { name: "Give me 33 dollars" })
        act(() => userEvent.click(btn))

        expect(onMoney).toHaveBeenCalledTimes(1)
        expect(onMoney).toHaveBeenCalledWith(33)
    })

    /*it("Renders the table with the expected props", () => {
        render(<TableUI onMoney={jest.fn()} />)
        expect(mockedDataGrid).toHaveBeenCalledTimes(1)
    })*/
})