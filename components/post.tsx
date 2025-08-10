'use client';
import { Post } from "@/lib/post";
// import { StorageImage } from "@aws-amplify/ui-react-storage";
import styles from "./post.module.scss";
import { getUrl } from 'aws-amplify/storage';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PostView({ post }: { post: Post }) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  useEffect(() => {
    if (post.img) {
      getUrl({ path: post.img }).then(url => setImgUrl(url.url.href)).catch(error => {
        console.error('Error fetching image URL:', error);
      });
    }
  }, []);
  return (
    <div className={styles.post}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* <StorageImage alt="Post Image" path={post.img} /> */}
      {imgUrl && <Image src={imgUrl} alt="Post Image" width={500} height={500} />}
    </div>
  );
}