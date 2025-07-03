import { useState } from "react";
import {useQuery} from "@tanstack/react-query";
import { useTRPC } from "@/app/api/trpc/client";
import { CommandSelect } from "@/components/command-select";
import { AvatarGenerator } from "@/modules/agents/ui/components/AvatarGenerator";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { Agentsearchfilter } from "@/modules/agents/ui/components/agent-search-filter";


export const AgentIdFilter=()=>{
    const [filters,setfilters]= useMeetingsFilters();   
    const trpc = useTRPC();
    const [Agentsearch ,setAgentSearch]=useState("");
    const {data} = useQuery(
        trpc.agents.getmany.queryOptions({
            pageSize:100,
            search:Agentsearch
        }),
    );

    return(
        <CommandSelect
          className="h-9"
          placeholder="Agent"
          options={(
            data?.items??[]
          ).map((agent)=>({
            id:agent.id,
            value:agent.id,
            children:(
              <div className="flex items-center gap-x-2">
                  <AvatarGenerator
                  seed={agent.name}
                  Varient="bottsNeutral"
                  className="border size-6"
                  />
                  <span>
                      {agent.name}
                  </span>
              </div>
            )
          }))}
          onselect={(value)=>{
            setfilters({agentId:value})
          }}
          value={filters.agentId ?? ""}
          onSearch={setAgentSearch}
          />
    )

}