const ProjectIdPage = async ({params}:{params: Promise<{projectId: string}>}) =>{

    const {projectId} = await params;
    return(
        <div>
            Project Id : {projectId}
        </div>
    )
}

export default ProjectIdPage;