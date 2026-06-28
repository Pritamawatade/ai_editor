import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
} from "@/components/ui/command"

import {useProjects} from "../hooks/use-projects"
import { Doc } from "../../../../convex/_generated/dataModel";



interface ProjectsCommandDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


const getProjectIcon = (project: Doc<"projects">) =>{

    if(project.importStatus === "completed"){
        return <FaGithub className="size-4 text-muted-foreground" />
    }
    if(project.importStatus === "importing"){
        return <Loader2Icon className="size-4 text-muted-foreground" />
    }
    if(project.importStatus === "failed"){
        return <AlertCircleIcon className="size-4 text-muted-foreground" />
    }

    return <GlobeIcon  className="size-4 text-muted-foreground" />

}

export const ProjectsCommandDialog = ({ open, onOpenChange }: ProjectsCommandDialogProps) =>{
    const router = useRouter();
    const projects = useProjects();

    const handleSelect = (projectId: string) => {
        onOpenChange(false);
        router.push(`/projects/${projectId}`);
    }


    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}
        title="Search Projects"
        description="Search for a project by name or ID"
        >
            <CommandInput placeholder="Search Projects..." />
            <CommandList>
                <CommandEmpty>No projects found.</CommandEmpty>
                <CommandGroup heading="Projects">
                    {projects?.map((project) => (
                        <CommandItem 
                        key={project._id}
                        value={`${project.name}-${project._id}`} 
                        onSelect={() => handleSelect(project._id)}>
                            {getProjectIcon(project)}
                            <span className="ml-2">{project.name}</span>
                            <CommandShortcut>{project._id}</CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>


        </CommandDialog>
    )

}