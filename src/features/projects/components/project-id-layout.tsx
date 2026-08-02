import { Id } from "../../../../convex/_generated/dataModel";
import { Navbar } from "./navbar";

const ProjectIdLayout  = ({
    children,
    projectId
}:{
    children: React.ReactNode;
    projectId: Id<"projects">;
}) =>{

    return(
        <div className="w-full h-full flex flex-col">
            <Navbar projectId={projectId}/>
            <h1>Project {projectId}</h1>
            {children}
        </div>
    )
}

export default ProjectIdLayout;