import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";

export const slideLoader = ({ request: { url } }: LoaderFunctionArgs) => {
  const number = Number(url.split("/").pop());

  if (number < 1) {
    return redirect("/");
  }

  return {
    number,
  };
};
