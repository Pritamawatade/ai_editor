/* eslint-disable react-hooks/purity */

import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel";

export const useProject = (projectId: Id<"projects">) => {
    return useQuery(api.project.getById, { id: projectId });
}

export const useProjects = () => {
    return useQuery(api.project.get)
}

export const useProjectsPartial = (limit: number) => {

    return useQuery(api.project.getPartial, { limit })
}

export const useCreateProject = () => {
    return useMutation(api.project.create).withOptimisticUpdate((localStore, args) => {
        const existingProjects = localStore.getQuery(api.project.get)

        if (existingProjects !== undefined) {
            const now = Date.now();
            const newProject = {
                _id: crypto.randomUUID() as Id<"projects">,
                _creationTime: now,
                name: args.name,
                ownerId: "annonymous",
                createdAt: now,
                updatedAt: now,
            }

            localStore.setQuery(api.project.get, {}, [newProject, ...existingProjects])
        }


    });
}

export const useRenameProject = (projectId: Id<"projects">) => {
    return useMutation(api.project.rename).withOptimisticUpdate((localStore, args) => {
        const existingProject = localStore.getQuery(api.project.getById, {id: projectId})

        if (existingProject !== undefined && existingProject !== null) {

            localStore.setQuery(api.project.getById, {id: projectId}, {
                ...existingProject,
                name: args.name,
                updatedAt: Date.now(),
            })
        }

        const existingProjects = localStore.getQuery(api.project.get)

        if (existingProjects !== undefined) {
            const updatedProjects = existingProjects.map(project => {
                if (project._id === projectId) {
                    return {
                        ...project,
                        name: args.name,
                        updatedAt: Date.now(),
                    }
                }
                return project;
            })

            localStore.setQuery(api.project.get, {}, updatedProjects)
        }


    });
}