import { DEFAULT_PAGE } from "@/constants";
import { Search } from "lucide-react";
import {parseAsInteger,parseAsString,useQueryStates} from "nuqs";

export const useAgentFilters=()=>{
    return useQueryStates({
        Search:parseAsString.withDefault("").withOptions({clearOnDefault:true}),
        page:parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault:true}),
        
    })
}