'use client';
import BlogView from '@/components/blog';
import { Blog, getCurrentUserBlogs } from '@/lib/blog';
import React from 'react';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Dashboard() {
  const [blogs, setBlogs] = React.useState<Blog[] | null>(null);
  React.useEffect(() => {
    if (blogs == null) {
      getCurrentUserBlogs().then((data) => {
        setBlogs(data);
      }).catch((error) => {
        console.error('Error fetching blogs:', error);
      });
    }
  }, []);

  return (
    <div>
      <h1 className={styles.heading}>Dashboard</h1>
      <div>
        {blogs ? (
          <div>
            <Link href="/auth/blogs/create">Create Blog</Link>
            <div className={styles.blogsContainer}>
              {blogs.map((blog) => <BlogView key={blog.id} blog={blog} href={`/auth/blogs/${blog.id}`} />)}
            </div>
          </div>
        ) : (
          <p className={styles.loadingText}>Loading blogs...</p>
        )}
      </div>
    </div>
  );
}

