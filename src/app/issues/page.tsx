import { Button } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
  return (
    <div className="px-5">
      <Button>
         <Link href={'/issues/new'}>New Issue</Link>
      </Button>
    </div>
  )
}

export default page
