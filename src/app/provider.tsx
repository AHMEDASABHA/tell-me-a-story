import { ClerkProvider } from "@clerk/nextjs";
import { HeroUIProvider } from "@heroui/system";
import { StoryDetailsProvider } from "../utils/story-details/state/story-details-context-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <ClerkProvider>
        <HeroUIProvider>
          <StoryDetailsProvider>{children}</StoryDetailsProvider>
        </HeroUIProvider>
      </ClerkProvider>
    </NuqsAdapter>
  );
};
