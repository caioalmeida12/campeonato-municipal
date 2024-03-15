import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { TimeType } from "@/../../lib/types/timeType";

interface TableProps {
    data: any[];
    onEdit: (row: TimeType) => void;
    onDelete: (row: TimeType) => void;
}

const CustomTable = ({ data, onEdit, onDelete }: TableProps) => {
    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column}</TableCell>
                        ))}
                        <TableCell>Lista</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data && (
                            data.map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column, index) => (
                                        <TableCell key={index}>{row[column]}</TableCell>
                                    ))}
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => onEdit(row)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => onDelete(row)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;