'use server';

import { revalidatePath } from "next/cache";
import { fetchClient } from "../fetchClient";
import { ProfileSchema } from "../schemas/profileSchema";
import { FetchResponse, Profile } from "../types";

export async function getProfiles(sortBy?: string): Promise<FetchResponse<Profile[]>> {
    let url = '/profiles';
    if (sortBy) url += `?sortBy=${sortBy}`;
    return fetchClient<Profile[]>(url, 'GET');
}

export async function getProfileById(id: string): Promise<FetchResponse<Profile>> {
    return fetchClient(`/profiles/${id}`, 'GET');
}

export async function editProfile(profile: ProfileSchema, userId: string) {
    const result = await fetchClient(`/profiles/edit`, 'PUT', { body: profile });

    revalidatePath(`profiles/${userId}`);

    return result;
}