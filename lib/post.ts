
import { z } from "zod";
import { amplifyClient } from "@/lib/amplify_lib";


export type PostInterface = {    
    title: string;
    content: string;
    img: string;
    blogId: string;
}

export type Post = {
    id: string | undefined;
    title: string;
    content: string;
    img: string;
    createdAt?: string;
}

const postSchema = z.object({
    title: z.string({message:'Title is required'}),
    content: z.string({message:'Content is required'}),
    img: z.string(),
    blogId: z.string(),
});

export async function createPost(post: PostInterface): Promise<Post> {
    const validatedPost = postSchema.safeParse(post);
    if (!validatedPost.success) {
        throw new Error(validatedPost.error.errors.map(e => e.message).join(", "));
    }
    const { title, content, img, blogId } = validatedPost.data;
    const { errors, data: Post } = await amplifyClient.models.Post.create({
            title,
            content,
            img,
            blogId,
        },
        {
            authMode: "userPool",
        }
    );
    if (errors) {
        throw new Error(errors[0].message);
    }
    return {
        id: Post?.id || "",
        title: Post?.title || "",
        content: Post?.content || "",
        img: Post?.img || "",
    };
}