"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { useProject, useRenameProject } from "../hooks/use-projects";
import { useState } from "react";
import { LoaderIcon, CloudCheck } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns"

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {


  const project = useProject(projectId);
  const renameProject = useRenameProject(projectId);
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState(project?.name ?? "");

  const handleStartRenaming = () => {
    if (!project) return;
    setName(project.name);
    setIsRenaming(true);
  }

  const handleSubmit = () => {
    if (!project) return;
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length === 0 || trimmedName === project.name) {
      setIsRenaming(false);
      return;
    }
    renameProject({ id: projectId, name: trimmedName });
    setIsRenaming(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsRenaming(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-x-2 p-2 border-b bg-sidebar">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
          <BreadcrumbList className="gap-0!">
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-1.5" asChild>
                <Button variant="ghost" className="w-fit! p-1.5! h-7!" asChild>
                  <Link href="/">
                    <Image
                      src="/vercel.svg"
                      alt="Logo"
                      height={20}
                      width={20}
                    />
                    <span className={cn("text-sm font-medium", font.className)}>
                      AI editor
                    </span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ml-0! mr-1" />
            <BreadcrumbItem>
              {
                isRenaming ? (
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    onBlur={handleSubmit}
                    onKeyDown={handleKeyDown}
                    className="text-sm bg-transparent text-foreground outline-none focus-ring-1 focus-ring-inset focus-ring-ring font-medium max-w-40 truncate"
                  />
                ) : (
                  <BreadcrumbPage
                    onClick={handleStartRenaming}
                    className="text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate">
                    {project?.name ?? "Loading..."}
                  </BreadcrumbPage>
                )
              }

            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <TooltipProvider delayDuration={0}>
          {
            project?.importStatus === "importing" ? (

              <Tooltip>

                <TooltipTrigger>
                  <LoaderIcon className="animate-spin h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Importing project...</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              project?.updatedAt && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CloudCheck className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Saved {" "}
                    {formatDistanceToNow(project?.updatedAt ?? 0, { addSuffix: true })}
                  </TooltipContent>
                </Tooltip>
              )
            )
          }
        </TooltipProvider>


      </div>
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </div>
  );
};
