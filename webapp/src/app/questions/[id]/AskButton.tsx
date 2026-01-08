'use client';

import { Button } from "@heroui/button";
import Link from "next/link";

export const AskButton = () => {
    return (
        <Button as={Link} href="/questions/ask" color="secondary" className="w-[20%]">
            Ask Question
        </Button>
    );
}