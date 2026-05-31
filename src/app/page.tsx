"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.project.get)
  const create = useMutation(api.project.create);

  const callAI = async () => {
    const response = await fetch("/api/demo/blocking", {
        method: "POST",
    });
    const data = await response.json();
    alert(data.response);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    
    <Button onClick={()=>create({name: "New Project"})}>Create Project</Button>

      {/* <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {
          tasks?.map((task, id)=><div key={id}>{task.name} {task.ownerId}</div>)
        }  
      </div> */}

        <Button onClick={callAI}>Generate Text</Button>

    </div>
  );
}
