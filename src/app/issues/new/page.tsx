'use client'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import {Controller, useForm} from 'react-hook-form'
import { useRouter } from "next/navigation"



interface Issueform {
    title:string,
    description:string,
}

const NewIsspage = () => {
  const router = useRouter();

  const {register,control,handleSubmit}=useForm<Issueform>();

  return (
    <div className="max-w-xl space-y-3">
      <form
       className="max-w-xl space-y-3"
       onSubmit={handleSubmit(async (data)=>{
        await axios.post('/api/issues',data);
        router.push('/issues');
        console.log("the data of the form is ",data)
      })} >
           
       <Input {...register('title')} placeholder="Title"/>
       <Controller 
        name="description"
        control={control}
        render={({field})=><SimpleMDE placeholder="Description" {...field}/>}
       />
       <Button>Submit new Issue</Button>
      </form>
      
    </div>
  )
}

export default NewIsspage
