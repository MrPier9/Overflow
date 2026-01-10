'use client';

import { Profile } from "@/lib/types";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { useRouter } from "next/navigation";

type Props = {
    columns: {
        key: string;
        label: string;
    }[];
    profiles: Profile[];
    sortReputation: boolean;
}

export const ProfilesTable = ({ columns, profiles, sortReputation }: Props) => {
    const rows = profiles ?? [];

    const router = useRouter();

    return (
        <Table
            aria-label="Users Profile Table"
            selectionMode="single"
            onRowAction={(key) => router.push(`/profiles/${key}`)}
            sortDescriptor={sortReputation ? { column: "reputation", direction: 'descending' } : { column: "displayName", direction: 'descending' }}
            onSortChange={(desc) => router.push(`/profiles?sortBy=${desc.column}`)}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key} allowsSorting>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows} emptyContent={"No rows to display."}>
                {(item) => (
                    <TableRow key={item.userId} className="cursor-pointer">
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey) ?? 'test'}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}