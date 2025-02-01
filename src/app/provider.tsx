"use client";
import { useUser } from "@clerk/nextjs";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { HeroUIProvider } from "@heroui/system";
import { StoryDetailsProvider } from "../utils/story-details/state/story-details-context-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastContainer, toast } from "react-toastify";
import { Suspense, useEffect, useState } from "react";
import { User } from "@/utils/user/types/user";
import { addUserToDatabaseIfNotExists } from "./action";
import { UserDetailsContext } from "@/utils/user/state/user-details.context";
import CustomLoader from "@/components/create-story/custom-loader";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userData = await addUserToDatabaseIfNotExists({
          userEmail: user.primaryEmailAddress?.emailAddress ?? "",
          userName: user.fullName ?? "",
          userImage: user.imageUrl ?? "",
        });
        setUserData(userData as User);
      };
      fetchUserData();
    }
  }, [user]);

  return (
    <Suspense fallback={<CustomLoader loadingText="Loading..." />}>
      <UserDetailsContext value={{ userData, setUserData }}>
        <NuqsAdapter>
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "test",
            }}
          >
            <HeroUIProvider>
              <StoryDetailsProvider>{children}</StoryDetailsProvider>
              <ToastContainer />
            </HeroUIProvider>
          </PayPalScriptProvider>
        </NuqsAdapter>
      </UserDetailsContext>
    </Suspense>
  );
};
