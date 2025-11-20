import logo from '/app/assets/png/Epic-logo-Side.png'

export interface FooterProps {
	companyName?: string
	altText?: string
}

const FooterBasic = ({
	companyName = 'CHANGE THIS TO YOUR COMPANY NAME!',
	altText = 'Our company logo',
}: FooterProps) => {
	return (
		<footer className="bg-secondary dark:bg-dark-secondary py-16">
			<div className="container flex flex-col items-center justify-between gap-y-8 lg:flex-row">
				<div className="w-50">
					<img src={logo} alt={altText} className="flex gap-4" />
				</div>

				<div className="text-muted-foreground text-opacity-50 dark:text-dark-muted-foreground text-xs">
					&copy; {companyName} | {new Date().getFullYear()}
				</div>
			</div>
		</footer>
	)
}

export default FooterBasic
