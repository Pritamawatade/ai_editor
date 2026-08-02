"use client";

import { cn } from "@/lib/utils";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

const Tab = ({
    isActive,
    onClick,
    lable
}:{
    isActive: boolean;
    onClick: () => void;
    lable: string;
}) =>{
    return (
        <div onClick={onClick} className={cn("flex items-center gap-2 h-full px-3 cursor-pointer text-muted-foreground border-r hover:bg-accent/30", isActive && "bg-background text-foreground")}>

        <span className="text-sm">
            {lable}
        </span>
        </div>
    )
}
const ProjectIdView = ({ projectId }: { projectId: Id<"projects"> }) =>{
    const [activeView, setActiveView] = useState<"editor" | "preview">("editor");
    
return (

    <div className="h-full flex flex-col">           
    <nav className="h-8.75 flex items-center bg-sidebar border-b">

        <Tab isActive={activeView === "editor"} onClick={() => setActiveView("editor")} lable="Code" />
        <Tab isActive={activeView === "preview"} onClick={() => setActiveView("preview")} lable="Preview" />
        <div className="flex-1 flex justify-end h-full">
            <div className="flex items-center gap-1.5 h-full px-3 cursor-pointer text-muted-foreground border-r hover:bg-accent/30">
            <FaGithub size={15} />
            <span className="text-sm">
                Export on GitHub
            </span>
            </div>
        </div>
        
    </nav>
    <div className="flex-1 relative">
        <div
        className={cn("absolute inset-0", activeView === "editor" ? "visible" : "invisible")}>
            <div>Editor</div>
        </div>

        <div
        className={cn("absolute inset-0", activeView === "preview" ? "visible" : "invisible")}>
            <div>Preview</div>
        </div>

    </div>

    
    </div>
)
}

export default ProjectIdView;