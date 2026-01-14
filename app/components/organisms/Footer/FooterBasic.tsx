import { Link } from 'react-router'
import logo from '/app/assets/png/Epic-logo-Side.png'

export interface FooterProps {
	companyName?: string
	altText?: string
}

const FooterBasic = ({
	companyName = 'Epic News',
	altText = 'Our company logo',
}: FooterProps) => {
	return (
		<footer className="bg-[#122023] py-16">
			<div className="container flex flex-col items-center justify-between gap-y-8 lg:flex-row">
				<div className="w-50">
					<img src={logo} alt={altText} className="flex gap-4" />
				</div>
				<Link
					to="/about-us"
					prefetch="intent"
					className="rounded-lg bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-400"
				>
					About Us
				</Link>

				<Link
					to="/contact-us"
					prefetch="intent"
					className="rounded-lg bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-400"
				>
					Contact Us
				</Link>

				<Link
					to="/cookies"
					prefetch="intent"
					className="rounded-lg bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-400"
				>
					Cookies
				</Link>

				<Link
					to="/accessibility"
					prefetch="intent"
					className="rounded-lg bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-400"
				>
					Accessibility
				</Link>

				<Link
					to="/privacy-policy"
					prefetch="intent"
					className="rounded-lg bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-400"
				>
					Privacy Policies
				</Link>

				<Link
					to="/terms-of-use"
					prefetch="intent"
					className="rounded-lg bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-400"
				>
					Terms of Use
				</Link>

				<div className="text-muted-foreground text-opacity-50 dark:text-dark-muted-foreground text-xs">
					&copy; {companyName} | {new Date().getFullYear()}
				</div>
			</div>
		</footer>
	)
}

export default FooterBasic
