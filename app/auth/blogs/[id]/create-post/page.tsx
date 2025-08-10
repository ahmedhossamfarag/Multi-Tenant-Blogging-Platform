'use client';

import PostForm from "@/components/post-form";
import styles from "./page.module.scss"
import { blogExist } from "@/lib/blog";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { id } = params;
    const [exist, setExist] = useState<boolean | undefined>(undefined);
    useEffect(() => {
        blogExist(id).then((data) => {
            setExist(data);
        }).catch(error => console.log(error))
    }, []);

    if (exist === undefined) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (exist == false) {
        return <div className={styles.notFound}>Blog not found</div>;
    }

    return <PostForm blogId={id} />
}