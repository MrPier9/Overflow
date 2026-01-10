import { getProfiles } from "@/lib/actions/profile-actions";
import { ProfilesTable } from "./ProfilesTable";

export default async function UserProfilesPage({ searchParams }: { searchParams?: Promise<{ sortBy?: string }> }) {
    const params = await searchParams;
    const { data: profiles, error } = await getProfiles(params?.sortBy);

    if (error) throw error;

    const columns = [
        {
            key: "displayName",
            label: "Display Name",
        },
        {
            key: "reputation",
            label: "Reputation",
        },
    ];

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-4xl font-semibold mb-3">User Table</h1>
            <ProfilesTable
                columns={columns}
                profiles={profiles ?? []}
                sortReputation={params?.sortBy === 'reputation'}
            />
        </div>
    );
}

