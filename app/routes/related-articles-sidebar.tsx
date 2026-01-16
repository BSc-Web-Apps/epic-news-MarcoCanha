import { Link } from 'react-router'
import siteLogo from '~/assets/png/Epic-Logo-Small.png'
import { getArticleImgSrc } from '~/utils/misc'

interface RelatedArticle {
	id: string
	title: string
	images?: { objectKey: string }[]
}

export function RelatedArticlesSidebar({
	articles,
}: {
	articles: RelatedArticle[]
}) {
	return (
		<div className="sticky top-24 space-y-6">
			<h3 className="text-lg font-semibold">Related</h3>

			<div className="flex flex-col gap-4">
				{articles.map((article) => {
					const imageSrc = article.images?.[0]?.objectKey
						? getArticleImgSrc(article.images[0].objectKey)
						: siteLogo

					return (
						<Link
							key={article.id}
							to={`/article/${article.id}`}
							className="group flex gap-3"
						>
							<img
								src={imageSrc}
								alt={article.title}
								className="h-16 w-16 shrink-0 rounded object-cover"
							/>

							<p className="line-clamp-2 text-sm font-medium group-hover:underline">
								{article.title}
							</p>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
