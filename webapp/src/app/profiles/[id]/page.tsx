import { getProfileById } from "@/lib/actions/profile-actions";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth-actions";
import { ProfileDeailsCard } from "./ProfileDetailsCard";

type Params = Promise<{ id: string }>

export default async function DetailUserProfilePage({ params }: { params: Params }) {
    const { id } = await params;
    const { data: profile, error } = await getProfileById(id);
    const currentUser = await getCurrentUser();

    if (error) throw error;
    if (!profile) return notFound();

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-4xl font-semibold mb-3">User Details</h1>
            <ProfileDeailsCard profile={profile} showEdit={currentUser.id === id} />
        </div>
    )
}
