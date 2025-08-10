import { z } from "zod";
import { amplifyClient } from "@/lib/amplify_lib";
import { Post } from "./post";

export type BlogInterface = {
    title: string;
    content: string;
    owner: string;
}

export type Blog = BlogInterface & {
    id: string;
    posts: Post[];
}

const blogSchema = z.object({
    title: z.string({ message: 'Title is required' }),
    content: z.string({ message: 'Content is required' }),
    owner: z.string(),
});


export async function createBlog(blog: BlogInterface): Promise<Blog> {
    const validatedBlog = blogSchema.safeParse(blog);
    if (!validatedBlog.success) {
        throw new Error(validatedBlog.error.errors.map(e => e.message).join(", "));
    }
    const { title, content, owner } = validatedBlog.data;
    const { errors, data: blogData } = await amplifyClient.models.Blog.create({
        title,
        content,
        owner,
    },
        {
            authMode: "userPool",
        });
    if (errors) {
        throw new Error(errors[0].message);
    }

    return {
        id: blogData?.id || "",
        title: blogData?.title || "",
        content: blogData?.content || "",
        owner: blogData?.owner || "",
        posts: [],
    };
}


export async function getCurrentUserBlogs(): Promise<Blog[]> {
    const { data: blogs, errors } = await amplifyClient.models.Blog.list({
        authMode: "userPool",
    });
    if (errors) {
        throw new Error(errors[0].message);
    }

    const blogList: Blog[] = blogs.map((blogData) => ({
        id: blogData.id,
        title: blogData?.title || "",
        content: blogData?.content || "",
        owner: blogData?.owner || "",
        posts: [],
    }));

    return blogList;
}

export async function getUserBlogs(userId: string): Promise<Blog[]> {
    const { data: blogs, errors } = await amplifyClient.models.Blog.list({
        filter: {
            owner: { eq: userId },
        },
    });
    if (errors) {
        throw new Error(errors[0].message);
    }

    const blogList: Blog[] = blogs.map((blogData) => ({
        id: blogData.id,
        title: blogData?.title || "",
        content: blogData?.content || "",
        owner: blogData?.owner || "",
        posts: [],
    }));

    return blogList;
}



export async function getBlogPosts(blogData: any): Promise<Post[]> {
    const { data: posts } = await blogData?.posts();
    if (!posts) {
        return [];
    }
    const blogPosts: Post[] = posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        img: post.img,
        blogId: post.blogId,
        createdAt: post.createdAt,
    }))
    return blogPosts.sort(
        (a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
    );;
}

export async function getBlogById(blogId: string): Promise<Blog | null> {
    const { data: blogData, errors } = await amplifyClient.models.Blog.get({ id: blogId });
    if (errors) {
        throw new Error(errors[0].message);
    }
    if (!blogData) {
        return null;
    }

    const posts = await getBlogPosts(blogData);

    return {
        id: blogData.id,
        title: blogData?.title || "",
        content: blogData?.content || "",
        owner: blogData?.owner || "",
        posts,
    };
}

export async function blogExist(blogId: string): Promise<boolean> {
    const { data: blogData, errors } = await amplifyClient.models.Blog.get({ id: blogId });
    if (errors) {
        throw new Error(errors[0].message);
    }
    if (!blogData) {
        return false;
    }
    return true
}