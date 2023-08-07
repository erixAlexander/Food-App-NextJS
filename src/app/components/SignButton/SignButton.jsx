"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./Signbutton.module.css";

const SignButton = () => {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div className={styles.container}>
        {session.user?.name}
        <button onClick={signOut}>SignOut</button>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <button onClick={signIn}>Sign In </button>
    </div>
  );
};

export default SignButton;
