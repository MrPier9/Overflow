import { Answer } from "@/lib/types"
import { timeAgo } from "@/lib/util";
import { Avatar } from "@heroui/avatar";
import { EditAnswerButton } from "./EditAnswerButton";
import { DeleteAnswerButton } from "./DeleteAnswerButton";
import { getCurrentUser } from "@/lib/actions/auth-actions";

type Props = {
    answer: Answer;
}

export default async function AnswerFooter({ answer }: Props) {
    const currentUser = await getCurrentUser();

    return (
        <div className="flex justify-between items-center">
            {(currentUser?.id === answer.userId &&
                <div className="flex items-center gap-4 px-6">
                    <EditAnswerButton answer={answer} />
                    <DeleteAnswerButton answerId={answer.id} questionId={answer.questionId} />
                </div>
            )}
            <div className="flex justify-end mt-4 w-full">
                <div className="flex flex-col basis-2/5 bg-primary/10 px-3 py-2 gap-2 rounded-lg">
                    <span className="text-sm font-extralight">answered {timeAgo(answer.createdAt)}</span>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-6 w-6" color="secondary" name={answer.author?.displayName.charAt(0)} />
                        <div className="flex flex-col items-center">
                            <span>{answer.author?.displayName}</span>
                            <span className="self-start text-sm font-semibold">{answer.author?.reputation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
