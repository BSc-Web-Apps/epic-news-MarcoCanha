import { RiTwitterXFill, RiLinkedinBoxFill } from 'react-icons/ri'
import { useLoaderData, Outlet } from 'react-router'
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react'
import { type Route } from './+types/root.ts'
import { type loader } from './__root.server.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import FooterBasic from './components/organisms/Footer/FooterBasic'
import HeaderWithSearch from './components/organisms/HeaderWithSearch'
import HeroCallToAction from './components/organisms/Hero/HeroCallToAction.tsx'
import Document from './components/shared-layout/Document.tsx'
import { useToast } from './components/toaster.tsx'
import { EpicToaster } from './components/ui/sonner.tsx'
import { ThemeSwitch, useTheme } from './routes/resources+/theme-switch.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import rootLinkElements from './utils/providers/rootLinkElements.ts'
import hero1 from '~/assets/jpg/IceTea-header.jpg'
import headshot1 from '~/assets/jpg/portrait-01.jpg'
import headshot2 from '~/assets/jpg/portrait-02.jpg'
import headshot3 from '~/assets/jpg/portrait-03.jpg'

export const links: Route.LinksFunction = () => {
	return rootLinkElements
}
export { meta } from './__root.client.tsx'
export { headers, loader } from './__root.server.tsx'

// Define the TeamMemberCardProps interface
interface TeamMemberCardProps {
	name: string
	role: string
	imageSrc: string
}

export function TeamMemberCard({
	// Changed from default export to named export
	name,
	role,
	imageSrc, // Changed imgSrc to imageSrc to match prop name
}: TeamMemberCardProps) {
	return (
		<div className="w-fit rounded-lg bg-slate-800 p-8">
			<img
				src={imageSrc} // Changed imgSrc to imageSrc
				alt="An employee"
				className="mx-auto h-64 w-64 rounded-full"
			/>

			<div className="pt-6">
				<h3 className="font-semi-bold text-center text-white">{name}</h3>
				<p className="pt-1 text-center text-slate-400">{role}</p>

				<div className="flex justify-center gap-4 pt-6 text-slate-400">
					<RiTwitterXFill />
					<RiLinkedinBoxFill />
				</div>
			</div>
		</div> // Added a closing div tag here
	)
} // Added a closing brace here

export default function App() {
	const data = useLoaderData<typeof loader | null>()
	const nonce = useNonce()
	const theme = useTheme()
	useToast(data?.toast)

	return (
		<AuthenticityTokenProvider token={'invalid'}>
			<Document theme={theme} nonce={nonce} honeyProps={data?.honeyProps}>
				<HeaderWithSearch />
				<div className="flex h-screen flex-col justify-between">
					<div className="flex-1">
						<Outlet />
					</div>
					<div className="container flex justify-between pb-5">
						<ThemeSwitch userPreference={data?.requestInfo.userPrefs.theme} />
					</div>
					<FooterBasic />
				</div>
				<EpicToaster
					closeButton
					position="bottom-right"
					theme={theme}
					expand
					richColors
					duration={5000}
				/>
			</Document>
		</AuthenticityTokenProvider>
	)
}

export const ErrorBoundary = GeneralErrorBoundary
