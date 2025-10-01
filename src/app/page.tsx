'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "@/components/loader";
import UpdateIssuePage from "./issues/update/page";


type Issue ={
    id:number,
    title:string,
    description:string,
    status:'OPEN' | 'IN_PROGRESS' | 'CLOSED';
    createdAt:string;
    updatedAt:string;
}



const IssuePage = () => {

     const [issues,setissues]=useState<Issue[]>([]);
     const [loading,setLoading]=useState(true);

     const fetchIssue = async()=>{

          try {
            const res = await axios.get<Issue[]>('/api/issues');
            const data = res.data;
            setissues(data);

            console.log("data is ",data);

            
          } catch (error) {
            console.log("Failed to fetch issues ",error)
          }
          finally{
            setLoading(false);
          }
     }

     useEffect(()=>{
        fetchIssue();
     },[]);

     if(loading){
        return <Loader size="lg"/>
     }


  return (
     <div className="max-w-4xl mx-auto p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Issues</h1>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>

      {issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <div className="space-y-3">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg">{issue.title}</h2>
              <p className="text-sm text-zinc-600 mt-1">{issue.description}</p>
              <p className="text-xs mt-2">
                Status:{' '}
                <span
                  className={
                    issue.status === 'OPEN'
                      ? 'text-green-600'
                      : issue.status === 'IN_PROGRESS'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }
                >
                  {issue.status}
                </span>
              </p>
              <p className="text-xs text-zinc-500">
                Created: {new Date(issue.createdAt).toLocaleString()}
              </p>
              <div>
                <UpdateIssuePage issue={issue}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default IssuePage
