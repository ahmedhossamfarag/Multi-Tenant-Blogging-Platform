'use client';
import { createBlog } from '@/lib/blog';
import { Flex, Button, TextField, TextAreaField, Message, useAuthenticator } from '@aws-amplify/ui-react'
import { useActionState } from 'react'
export default function BlogForm() {
    async function handleSubmit(prevState: any, formData: FormData) {
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        try {
            await createBlog({ title, content, owner: user.username });
            window.location.href = '/auth/dashboard';
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

    const [state, formActon, pending] = useActionState(handleSubmit, {title: '', content: '', error: null});
    const {user} = useAuthenticator();

    return (
        <form action={formActon}>
            <Flex direction="column" gap="1rem" paddingTop="1rem">
                <TextField label='Title' name="title" placeholder="Enter blog title" defaultValue={state?.title} />
                <TextAreaField label='Content' name="content" placeholder="Write your blog content here" defaultValue={state?.content} />
                {state.error &&  <Message colorTheme="error">{state.error}</Message>}
                <Button variation="primary" type='submit'>Submit</Button>
            </Flex>
        </form>
    )
}