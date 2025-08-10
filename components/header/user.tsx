'use client';
import styles from "./header.module.scss";

import { useAuthenticator } from "@aws-amplify/ui-react";

export default function UserLogo() {
    const {signOut} = useAuthenticator();
    const {user} = useAuthenticator();

    return (
        <div className={styles.userLogo}>
            <div className={styles.logo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
            </div>
            <ul>
                <li onClick={() => {window.location.href = "/auth/dashboard"}}>Dashboard</li>
                <li onClick={() => {window.location.href = `${process.env.NEXT_PUBLIC_PROTOCOL}://${user.username}.${process.env.NEXT_PUBLIC_DOMAIN}`}}>Website</li>
                <li onClick={() => signOut()}>Sign Out</li>
            </ul>
        </div>
    );
}