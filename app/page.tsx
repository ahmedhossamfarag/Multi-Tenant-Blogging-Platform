"use client";

import React from "react";
import "./app.css";
import styles from './page.module.scss'
import Link from "next/link";
import "@aws-amplify/ui-react/styles.css";
import "@/lib/amplify_lib";


export default function App() {
  return (
    <div className={styles.bg}>
      <Link href="/auth/dashboard">
        <button className={styles.startButton}>
          START NOW
        </button>
      </Link>
    </div>
  );
}
