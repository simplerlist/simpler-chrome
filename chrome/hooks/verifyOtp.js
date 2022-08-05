// Packages
import { useEffect } from 'react'
import { useClerk, useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'

const HooksVerifyOtp = ({ code, submitCode }) => {
	const clerk = useClerk()

	const { signIn } = useSignIn()

	const router = useRouter()

	useEffect(() => {
		if (code && submitCode) {
			const verifyOtp = async () => {
				let signUpAttempt

				signUpAttempt = await signIn.attemptFirstFactor({
					strategy: 'email_code',
					code
				})

				if (signUpAttempt?.status === 'complete')
					clerk.setSession(signUpAttempt.createdSessionId, () => router.push('/'))
			}

			verifyOtp()
		}
	}, [submitCode])
}

export default HooksVerifyOtp
