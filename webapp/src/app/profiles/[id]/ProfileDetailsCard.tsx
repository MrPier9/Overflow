'use client';

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Profile } from "@/lib/types";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { profileSchema, ProfileSchema } from "@/lib/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@heroui/form";
import { editProfile } from "@/lib/actions/profile-actions";
import { handleError, successToast } from "@/lib/util";
import { Input, Textarea } from "@heroui/input";

type Props = {
    showEdit: boolean;
    profile: Profile;
}

export const ProfileDeailsCard = ({ showEdit, profile }: Props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, reset, formState } = useForm<ProfileSchema>({
        mode: 'all',
        resolver: zodResolver(profileSchema)
    });

    const onSubmit = (data: ProfileSchema) => {
        startTransition(async () => {
            const { error } = await editProfile(data, profile.userId);
            if (error) handleError(error);
            setIsEdit(false);
            reset();
            successToast("Profile successfully updated!");
        })
    };

    useEffect(() => {
        if (profile) reset({
            ...profile
        })
    }, [profile, reset])

    return (
        <Card>
            <CardHeader className='text-3xl font-semibold flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Avatar className='h-30 w-30' color='secondary' /> <span>{profile.displayName}</span>
                </div>
                {showEdit &&
                    <Button variant='bordered' onPress={() => setIsEdit(!isEdit)} >
                        {!isEdit ? "Edit profile" : "Cancel"}
                    </Button>
                }
            </CardHeader>
            <Divider />
            <CardBody>
                {!isEdit ? (
                    <p>{profile.description ?? "No profile description added yet"}</p>
                ) : (
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            {...register("displayName")}
                            type="text"
                            className="w-full"
                            label="Display Name"
                            labelPlacement="inside"
                            isInvalid={!!formState.errors.displayName}
                            errorMessage={formState.errors.displayName?.message}
                        />
                        <Textarea
                            {...register("description")}
                            type="text"
                            className="w-full"
                            label="Description"
                            labelPlacement="inside"
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.message}
                        />
                        <Button
                            type="submit"
                            color="secondary"
                            className="w-fit"
                            isLoading={formState.isSubmitting || pending}
                            isDisabled={!formState.isValid || !formState.isDirty || pending}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </CardBody>
            <CardFooter className='text-xl font-semibold'>
                Reputation score: {profile.reputation}
            </CardFooter>
        </Card>
    );
}