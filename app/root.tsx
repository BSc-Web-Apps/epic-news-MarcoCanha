import { useLoaderData } from 'react-router'
import { type Route } from './+types/root.ts'
import { type loader } from './__root.server.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import Document from './components/shared-layout/Document.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import rootLinkElements from './utils/providers/rootLinkElements.ts'
import portrait1 from '~/assets/jpg/portrait-01.jpg'

export const links: Route.LinksFunction = () => {
	return rootLinkElements
}
export { meta } from './__root.client.tsx'
export { headers, loader } from './__root.server.tsx'

export default function App() {
	const data = useLoaderData<typeof loader | null>()
	const nonce = useNonce()

	return (
		<Document nonce={nonce} honeyProps={data?.honeyProps}>
			<div className="flex h-screen flex-col justify-between">
				<div className="flex-1">
					<main className="grid h-full place-items-center bg-white">
						<h1 className="text-mega text-black">Your Journey Begins!</h1>
						<p className="text-base text-gray-600 md:text-2xl lg:text-3xl">
							Welcome to Epic News, where the latest developments in tech are
							found.
						</p>
						<button className="=px-4 rounded-lg bg-red-600 py-2 shadow-xl md:px-6 md:py-3 lg:px-8 lg:py-4">
							Click me
						</button>
						<div className="flex h-60 w-60 items-center justify-center bg-gray-900 p-10">
							<img
								className="h-full w-full rounded-full object-cover"
								src={portrait1}
								alt="Portrait 1"
							/>
						</div>
					</main>
				</div>
			</div>
		</Document>
	)
}

export const ErrorBoundary = GeneralErrorBoundary
