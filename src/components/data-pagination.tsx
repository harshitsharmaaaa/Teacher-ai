import {Button} from "@/components/ui/button"

interface DataPaginationProps{
    page:number
    totalpages:number
    onPageChange:(page:number)=>void
}

export const DataPagination=({
    page,
    totalpages,
    onPageChange
}:DataPaginationProps)=>{
    return(
        <div className="flex items-center justify-between ">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of {totalpages||1}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button disabled={page===1} 
                 variant={"outline"} 
                 size="sm"
                 onClick={()=>{
                    onPageChange(Math.max(1,page-1))
                }}
                >
                    Previous
                </Button>
                <Button 
                disabled={page===totalpages ||totalpages===0}
                 variant="outline"
                 size="sm"
                 onClick={()=>{
                    onPageChange(Math.min(totalpages,page+1))
                }}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}