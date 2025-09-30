import { Loader2 } from "lucide-react";

interface Loaderprops{
    size ? : 'sm' | 'md' |'lg';
    color?:string; //optional color
}

export function Loader({size="md",color="text-primary"}:Loaderprops) {
    const sizeClass = size==="sm"?"h-4 w-4":size==="lg"?"h-10 w-10":"h-6 w-6";
  return (
    <div className="flex items-center justify-center p-6">
      <Loader2 className={`${sizeClass} animate-spin ${color}`} />
    </div>
  );
}
