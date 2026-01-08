'use client';

import { useAnswerStore } from "@/lib/hooks/useAnswerStore";
import { Answer } from "@/lib/types";
import { Button } from "@heroui/button";
import { useTransition } from "react";

type Props = {
    answer: Answer
}

export const EditAnswerButton = ({ answer }: Props) => {
    const [pending, startTransition] = useTransition();
    const setEditAnswer = useAnswerStore(state => state.setAnswer);

    const handleEdit = () => {
        startTransition(async () => {
            setEditAnswer(answer);
            setTimeout(() => {
                document.getElementById('answer-form')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        })
    }
    return (
        <Button size="sm" variant="faded" color="primary" onPress={handleEdit} isLoading={pending}>Edit</Button>
    );
}