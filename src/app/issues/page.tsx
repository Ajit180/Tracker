import { Button } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
  return (
    <div className="px-5 space-x-3">
      <Button>
         <Link href={'/issues/new'}>New Issue</Link>
      </Button>
      <Button className="bg-green-700">
         <Link href={'/issues/track'}>Issues</Link>
      </Button>
    </div>
  )
}

export default page
