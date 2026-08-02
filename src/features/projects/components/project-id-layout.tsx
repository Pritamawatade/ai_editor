"use client";
import { Id } from "../../../../convex/_generated/dataModel";
import { Allotment } from "allotment";
import { Navbar } from "./navbar";
import "allotment/dist/style.css";


const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 800;
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 400;
const DEFAULT_MAIN_SIZE = 1000;

const ProjectIdLayout = ({
    children,
    projectId
}: {
    children: React.ReactNode;
    projectId: Id<"projects">;
}) => {


    return (  
        <div className="flex h-screen w-full flex-col overflow-hidden">
            <Navbar projectId={projectId} />
            <div className="min-h-0 flex-1 overflow-hidden">
                <Allotment
                    className="h-full"
                    defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}
                >
                    <Allotment.Pane
                        snap
                        minSize={MIN_SIDEBAR_WIDTH}
                        maxSize={MAX_SIDEBAR_WIDTH}
                        preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
                    >
                        <div className="h-full border-r bg-sidebar/50 p-4">
                            Sidebar content here
                        </div>
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <div className="h-full overflow-auto">
                            {children}
                        </div>
                    </Allotment.Pane>
                </Allotment>
            </div>
        </div>
    )
}

export default ProjectIdLayout;