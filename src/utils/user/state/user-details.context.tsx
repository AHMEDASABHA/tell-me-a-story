"use client";
import React, { createContext } from "react";

import type { User } from "../types/user";

export const UserDetailsContext = createContext<{
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
}>({ userData: null, setUserData: () => {} });
