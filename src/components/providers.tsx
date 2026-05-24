"use client";

import { ClerkProvider, useAuth, UserButton } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { UnauthenticatedView } from "@/features/auth/components/unauthenticated-view";
import { Loading } from "@/features/auth/components/auth-loading";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({children}: { children: React.ReactNode}) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Authenticated>
          <UserButton />
            {children}
          </Authenticated>
          <Unauthenticated>
            <UnauthenticatedView />
          </Unauthenticated>
          <AuthLoading>
            <Loading />
          </AuthLoading>
        </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};