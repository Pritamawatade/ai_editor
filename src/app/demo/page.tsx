"use client";

import { Button } from "@/components/ui/button";

export default function Demo() {

  const handleClientError = ()=>{
    throw new Error("Client error: Something went wrong in the browser!")
  }
  const handleApiError = async () =>{
    await fetch("/api/demo/error", {
        method: "POST",
    });
  }

  const handleInngestError = async () =>{
  await fetch("/api/demo/inngest-error", {
        method: "POST",
    });
  }
    const callAI = async () => {
        const response = await fetch("/api/demo/background", {
            method: "POST",
        });
        const data = await response.json();
        alert(data.response);
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">AI Editor Demo</h1>
      <p className="text-lg text-gray-600 mb-8">This is a demo of an AI-powered editor using Convex and Google Generative AI.</p>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Generate a Recipe</h2>
        <p className="text-gray-700 mb-4">Click the button below to generate a vegetarian lasagna recipe for 4 people using Google Generative AI.</p>
        <button
          onClick={callAI}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >   
          Generate Recipe
        </button>
      </div>

      <Button onClick={handleClientError}>Handle Client Error</Button>
      <Button onClick={handleApiError}>Handle API Error</Button>
      <Button onClick={handleInngestError}>Handle Inngest Error</Button>
    </div>
  );
}