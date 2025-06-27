"use client";

import { ErrorState } from "@/components/Error-state";

const ErrorPage = () => {
    return (
        <ErrorState
        title="Failed to Load Agents"
        description="An error occurred while fetching data"
        />

        
    )
}
export default ErrorPage;