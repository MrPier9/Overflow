'use client';

import { Button } from "@heroui/button";
import Link from "next/link";

type Props = {
    questionId: string;
}

export const EditQuestionButton = ({ questionId }: Props) => {
    return (
        <Button as={Link} href={`/questions/${questionId}/edit`} size="sm" variant="faded" color="primary">Edit</Button>
    );
}