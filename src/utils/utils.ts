import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

if (typeof FormData === "undefined") {
  global.FormData = require("formdata-node").FormData;
}
