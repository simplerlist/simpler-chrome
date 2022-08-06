// Packages
import { useState, useEffect } from 'react'
import { ClerkProvider as ClerkReactProvider } from '@clerk/nextjs'

export const ClerkProvider = ({ children, ...rest }) => {
	const [clerkInstance, setClerkInstance] = useState()

	useEffect(() => {
		;(async () => {
			const Clerk = (await import('@clerk/clerk-js')).default

			const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_FRONTEND_API)

			await clerk.load()

			clerk.__unstable__onBeforeRequest(async requestInit => {
				// https://reactnative.dev/docs/0.61/network#known-issues-with-fetch-and-cookie-based-authentication
				requestInit.credentials = 'omit'

				requestInit.url?.searchParams.append('_is_native', '1')

				const jwt = await getToken(process.env.CLERK_JWT_KEY)

				requestInit.headers.set('authorization', jwt || '')
			})

			clerk.__unstable__onAfterResponse(async (_, response) => {
				const authHeader = response.headers.get('authorization')

				if (authHeader) await saveToken(process.env.CLERK_JWT_KEY, authHeader)
			})

			setClerkInstance(clerk)
		})()
	}, [])

	if (!clerkInstance) return <div className='w-80 mx-auto p-4' />

	return (
		<ClerkReactProvider {...rest} Clerk={clerkInstance}>
			{children}
		</ClerkReactProvider>
	)
}
