'use client';
import { createPost } from '@/lib/post';
import { Flex, Button, TextField, TextAreaField, Message } from '@aws-amplify/ui-react'
import { FileUploader } from '@aws-amplify/ui-react-storage';
import { useActionState, useState } from 'react'

export default function PostForm({ blogId }: { blogId: string }) {

    async function handleSubmit(prevState: any, formData: FormData) {
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        try {
            if (!img) {
                throw new Error('Image is required');
            }
            await createPost({ title, content, blogId, img });
            window.location.href = `/auth/blogs/${blogId}`;
            return { ...prevState, title, content, error: null };
        } catch (error: any) {
            return {
                ...prevState,
                title,
                content,
                error: error.message
            }
        }
    }

    const [state, formActon, pending] = useActionState(handleSubmit, { title: '', content: '', error: null });
    const [img, setImg] = useState<string | undefined>(undefined);

    return (
        <form action={formActon}>
            <Flex direction="column" gap="1rem" paddingTop="1rem">
                <TextField label='Title' name="title" placeholder="Enter post title" defaultValue={state?.title} />
                <TextAreaField label='Content' name="content" placeholder="Write your post content here" defaultValue={state?.content} />
                <FileUploader
                    acceptedFileTypes={['image/*']}
                    path={({ identityId }) => `posts-images/${identityId}/`}
                    maxFileCount={1}
                    isResumable
                    onUploadSuccess={({ key }) => setImg(key)}
                    onFileRemove={() => setImg(undefined)}
                    onUploadError={() => setImg(undefined)} />
                {state.error && <Message colorTheme="error">{state.error}</Message>}
                <Button variation="primary" isDisabled={pending} type='submit'>Submit</Button>
            </Flex>
        </form>
    )
}