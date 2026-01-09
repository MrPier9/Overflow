'use client';

import { postAnswer, updateAnswer } from "@/lib/actions/question-actions";
import { useAnswerStore } from "@/lib/hooks/useAnswerStore";
import { answerSchema, AnswerSchema } from "@/lib/schemas/answerSchema";
import { handleError } from "@/lib/util";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

const RichTextEditor = dynamic(() => import("@/components/rte/RichTextEditor"), { ssr: false });

type Props = {
    questionId: string;
}

export const AnswerForm = ({ questionId }: Props) => {
    const editAnswer = useAnswerStore((state) => state.answer);
    const clearStore = useAnswerStore((state) => state.clearAnswer);
    const [pending, startTransition] = useTransition();
    const { control, handleSubmit, reset, formState } = useForm<AnswerSchema>({
        mode: 'onTouched',
        resolver: zodResolver(answerSchema)
    })

    useEffect(() => {
        if (editAnswer) {
            reset({
                ...editAnswer
            })
        }
    }, [editAnswer, reset])

    const onSubmit = (data: AnswerSchema) => {
        startTransition(async () => {
            if (editAnswer) {
                const { error } = await updateAnswer(data, questionId, editAnswer.id);
                if (error) handleError(error);
                clearStore();
            } else {
                const { error } = await postAnswer(data, questionId);
                if (error) handleError(error);
            }
            reset({ content: '' });
        })
    }

    return (
        <div className="flex flex-col gap-3 items-start my-4 w-full px-6">
            <h3 className="text-2xl">Your answer</h3>
            <form id="answer-form" className="w-full flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <Controller control={control} name="content" render={({ field: { onChange, onBlur, value }, fieldState }) => (
                    <>
                        <RichTextEditor onChange={onChange} onBlur={onBlur} value={value || ''} errorMessage={fieldState.error?.message} />
                        {fieldState.error?.message && (
                            <span className="text-xs text-danger -mt-1">{fieldState.error.message}</span>
                        )}
                    </>
                )} />
                <Button isDisabled={!formState.isValid || pending} isLoading={pending} color="primary" type="submit" className="w-fit">Post your answer</Button>
            </form>
        </div>
    );
}