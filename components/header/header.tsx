'use client';
import UserLogo from "./user";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header>
      <div className={styles.header}>
        <div>
            <h1 className={styles.brand}>Blogging Platform</h1>
        </div>
        <UserLogo />
      </div>
    </header>
  );
}