import React, { ReactNode } from "react";
import { useRouter } from "next/router";
// import useUser from "@/hooks/useUser";
import { useSession, signIn, signOut } from "next-auth/react"
import Loader from "../Loader";



export default function AuthHOC(
  ProtectedComponent: React.FC<any>,
) {
  //
  return function AuthComp(props: any) {
    // console.log("propsin hoc", props)
    const session = useSession()
    // console.log("session", session)
    const router = useRouter();

    // const user = useUser({
    //   tryOnce: true,
    // });

    if (session.status === "loading") {
      return (
        <Loader modalOpen={true} />
      );
    }

    if (!session.data) {
      signIn()
      return null;
    }

    return <ProtectedComponent user={session} {...props} />;
  };
}