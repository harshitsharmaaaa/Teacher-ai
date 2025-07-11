import { AlertCircleIcon } from "lucide-react";
interface props{
    title:string;
    description:string;
}
export const ErrorState = ({title,description}:props) => {

    return (
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                <AlertCircleIcon className="size-6  text-red-500" />
                <div className="flex flex-col gap-y-2 text-center ">
                    <h6 className="text-lg font-medium">
                        {title}
                    </h6>
                    <h6 className="text-sm">{description}</h6>

                </div>

            </div>

        </div>
    );
}
