'use client';
import PostView from "@/components/post";
import { Blog, getBlogById } from "@/lib/blog";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useParams } from "next/navigation";


export default function Page() {
    const params = useParams<{id: string}>();
    const { id } = params;
    const [blog, setBlog] = useState<Blog | null | undefined>(undefined);
    useEffect(() => {
        getBlogById(id).then((data) => {
            setBlog(data);
        }).catch(error => console.log(error))
    }, []);

    if (blog === undefined) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (blog == null) {
        return <div className={styles.notFound}>Blog not found</div>;
    }

    return (
        <div>
            <h1 className={styles.heading}>{blog?.title}</h1>
            <p className={styles.content}>{blog?.content}</p>
            <div>
                <Link href={`/auth/blogs/${blog?.id}/create-post`}>Create Post</Link>
            </div>
            <div className={styles.postsContainer}>
                {
                    blog?.posts.map((post) => <PostView key={post.id} post={post} />)
                }
            </div>
        </div>
    );
}