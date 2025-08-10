import { Blog } from "@/lib/blog";
import styles from "./blog.module.scss";

export default function BlogView({blog, href}: { blog: Blog, href: string }) {
  return (
    <a href={href} className={styles.blogLink}>
      <div className={styles.blog}>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </div>
    </a>
  );
}