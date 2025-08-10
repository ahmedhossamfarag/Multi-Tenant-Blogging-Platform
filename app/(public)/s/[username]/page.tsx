'use client';
import BlogView from '@/components/blog';
import { Blog, getUserBlogs } from '@/lib/blog';
import React from 'react';
import styles from './page.module.scss';
import { useParams } from 'next/navigation';



export default function Page() {
    const params = useParams<{username: string}>();
    const {username} = params;
    const [blogs, setBlogs] = React.useState<Blog[] | null>(null);
    React.useEffect(() => {
        if (blogs == null) {
            getUserBlogs(username).then((data) => {
                setBlogs(data);
            }).catch((error) => {
                console.error('Error fetching blogs:', error);
            });
        }
    }, []);

    return (
        <div>
            <h1 className={styles.heading}>Blogs</h1>
            <div>
                {blogs ? (
                    <div>
                        <div className={styles.blogsContainer}>
                            {blogs.map((blog) => <BlogView key={blog.id} blog={blog} href={`/blogs/${blog.id}`} />)}
                        </div>
                    </div>
                ) : (
                    <p className={styles.loadingText}>Loading blogs...</p>
                )}
            </div>
        </div>
    );
}

