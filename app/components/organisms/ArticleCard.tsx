import { type JSX } from 'react'
import {
	MdOutlineBusinessCenter,
	MdOutlineTheaters,
	MdOutlineDesktopMac,
	MdOutlineNewspaper,
} from 'react-icons/md'
import { Link } from 'react-router'
import siteLogo from '~/assets/png/Epic-Logo-Small.png'
import { getArticleImgSrc } from '~/utils/misc.tsx'

interface ArticleCardProps {
	articleId: string
	title: string
	category?: string
	objectKey?: string
	variant?: 'large' | 'small'
	size?: 'auto' | 'sm' | 'md' | 'lg'
}

export default function ArticleCard({
	articleId,
	title,
	category = 'General news',
	objectKey,
	variant = 'small',
	size = 'auto',
}: ArticleCardProps) {
	const imageSrc = objectKey ? getArticleImgSrc(objectKey) : siteLogo

	const sizeClasses = {
		auto: '',
		sm: 'h-[320px]',
		md: 'h-[380px]',
		lg: 'h-[450px]',
	}

	const categoryIcons: { [key: string]: JSX.Element } = {
		Business: <MdOutlineBusinessCenter size={20} className="text-violet-300" />,
		Entertainment: <MdOutlineTheaters size={20} className="text-violet-300" />,
		Technology: <MdOutlineDesktopMac size={20} className="text-violet-300" />,
		'General news': (
			<MdOutlineNewspaper size={20} className="text-violet-300" />
		),
	}

	return (
		<Link to={`/article/${articleId}`} className="block h-full">
			<div
				className={`flex flex-col overflow-hidden rounded transition-all duration-500 hover:scale-105 ${sizeClasses[size]}`}
			>
				<div className="flex-1">
					<img
						src={imageSrc}
						alt={title}
						className="h-full w-full object-cover"
					/>
				</div>

				<div
					className={`bg-violet-950 p-4 ${
						variant === 'large' ? 'min-h-[180px]' : 'min-h-[140px]'
					}`}
				>
					<h3
						className={`font-bold ${
							variant === 'large'
								? 'line-clamp-4 text-2xl'
								: 'line-clamp-3 text-xl'
						}`}
					>
						{title}
					</h3>

					<div className="flex items-center gap-2">
						{categoryIcons[category]}

						<p className="text-sm text-violet-300">{category}</p>
					</div>
				</div>
			</div>
		</Link>
	)
}
