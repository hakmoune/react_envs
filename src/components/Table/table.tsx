import { Button, SwipeableDrawer } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First name', width: 150, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
    { field: 'age', headerName: 'Age', width: 110, type: 'number', editable: true },
];

const rows: GridRowsProp = [
    { id: 1, lastName: 'XXXXXXWWWWW', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export interface Example2Props {
    onMoney: (n: number) => void;
}

export function TableUI({ onMoney }: Example2Props) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div>
            <div style={{ marginTop: 10 }}>
                <Button variant="contained" onClick={() => onMoney(33)}>Give me 33 dollars</Button>
                <div style={{ height: 400, width: '90%', marginTop: 10 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        checkboxSelection
                    />
                </div>
            </div>

            <div>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Open Drawer
                </Button>
                <SwipeableDrawer
                    anchor="right"
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                >
                    Hello Youtube !
                </SwipeableDrawer>
            </div>
        </div>
    );
}