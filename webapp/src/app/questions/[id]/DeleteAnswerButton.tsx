'use client';

import { deleteAnswer } from "@/lib/actions/question-actions";
import { handleError } from "@/lib/util";
import { Button } from "@heroui/button"
import { useTransition } from "react";

type Props = {
    answerId: string;
    questionId: string;
}

export const DeleteAnswerButton = ({ answerId, questionId }: Props) => {
    const [pending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const { error } = await deleteAnswer(questionId, answerId);
            if (error) handleError(error);
        })
    }

    return (
        <Button size="sm" variant="faded" color="danger" onPress={handleDelete} isLoading={pending}>Delete</Button>
    );
}