import { Spinner } from "@/components/ui/spinner";
import { useProjectsPartial } from "../hooks/use-projects";
import { Kbd } from "@/components/ui/kbd";
import { Doc } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import { FaGithub } from "react-icons/fa";

interface ProjectListProps {
    onViewAll: () => void;
}

const formatTimestamp = (timestamp: number) =>{
    return formatDistanceToNow(new Date(timestamp),{
        addSuffix: true
    })
}

const getProjectIcon = (project: Doc<"projects">) =>{

    if(project.importStatus === "completed"){
        return <FaGithub className="size-3.5 text-muted-foreground" />
    }
    if(project.importStatus === "importing"){
        return <Loader2Icon className="size-3.5 text-muted-foreground" />
    }
    if(project.importStatus === "failed"){
        return <AlertCircleIcon className="size-3.5 text-muted-foreground" />
    }

    return <GlobeIcon  className="size-3.5 text-muted-foreground" />

}
const ProjectItem = ({ data }: { data: Doc<"projects"> }) => {
    return (
    <Link
        className="text-sm text-foreground/60 font-medium hover:text-foreground py-1 flex items-center justify-between w-full group"
        href={`/projects/${data._id}`}>
        <div className="flex items-center gap-2">
            {getProjectIcon(data)}
            <span className="truncate">{data.name}</span>
        </div>
        <span>
            {formatTimestamp(data.updatedAt)}
        </span>
    </Link>
    )
}

export const ProjectList = ({ onViewAll }: ProjectListProps) => {

    const projects = useProjectsPartial(3);

    if (projects === undefined) {
        return <Spinner className="size-4 text-ring" />
    }

    const [mostRecent, ...rest] = projects;
    return (
        <div className="flex flex-col gap-4">
            {mostRecent && (
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Most Recent</span>
                    <div className="flex flex-col gap-2">
                        <div className="p-4 bg-background border rounded-md">
                            {mostRecent.name}
                        </div>
                    </div>
                </div>
            )}
            {/* {rest.length > 0 && (
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Other Projects</span>
                    <div className="flex flex-col gap-2">
                        {rest.map((project) => (
                            <div key={project._id} className="p-4 bg-background border rounded-md">
                                {project.name}
                            </div>
                        ))}
                    </div>
                </div>
            )} */}
            {projects.length >= 3 && (
                <button
                    onClick={onViewAll}
                    className="flex items-center gap-2 text-muted-foreground text-xs hover:text-foreground transition-colors"
                >
                    <span>View All Projects</span>
                    <Kbd className="bg-accent border">
                        ctrl + k
                    </Kbd>
                </button>
            )}
            
            <ul className="flex flex-col">
                {
                    projects.map((project) => {
                        return <ProjectItem key={project._id} data={project} />
                    })
                }
            </ul>
        </div>
    )
}