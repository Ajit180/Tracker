
import { Button } from "@/components/ui/button"

import axios from "axios"

const UpdateIssuePage = ({issue}:{issue:any}) => {

    console.log("issue data ",issue);
    console.log("issue id",issue.id)
  
    const updateIssue = async (newStatus:"OPEN" | "IN_PROGRESS" | "CLOSED")=>{
        await axios.patch(`/api/issues/${issue.id}`, {status:newStatus}); // mistake was i am not using the /api 
        alert(`Status Update to ${newStatus}`);
    }

  return (
    <div className="p-3 border rounded mb-2 space-y-2">
       <p className="font-bold text-gray-500">Current Status: {issue.status}</p>
       <div className="space-x-2">
           <Button onClick={()=>updateIssue("OPEN")}>OPEN</Button>
           <Button onClick={()=>updateIssue("IN_PROGRESS")}>IN_PROGRESS</Button>
           <Button onClick={()=>updateIssue("CLOSED")}>CLOSED</Button>
       </div>
    </div>
  )
}

export default UpdateIssuePage
