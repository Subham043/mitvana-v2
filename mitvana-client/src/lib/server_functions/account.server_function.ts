import { createServerFn } from '@tanstack/react-start'

// GET request (default)
export const getProfileServerFunc = createServerFn()
    .handler(async () => {
        return { message: 'Hello from server!' }
    })