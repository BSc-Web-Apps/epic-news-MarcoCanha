import { invariant } from '@epic-web/invariant'
import { type LoaderFunctionArgs, data, useLoaderData } from 'react-router'
import ArticleCard from '~/components/organisms/ArticleCard.tsx'
import { prisma } from '~/utils/db.server.ts'
import { toTitleCase } from '~/utils/stringUtils.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { category } = params

	invariant(typeof category === 'string', 'Category not found')
	const categoryTitle = toTitleCase(category)

	const filteredArticles = await prisma.article.findMany({
		where: {
			category: {
				slug: category,
			},
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true, objectKey: true } },
		},
	})

	return data({ categoryTitle, filteredArticles })
}

export default function NewsCategoryPage() {
	const { categoryTitle, filteredArticles } = useLoaderData<typeof loader>()

	const hasArticles = filteredArticles.length > 0

	console.log({ filteredArticles, hasArticles })

	return hasArticles ? (
		<div className="container py-16">
			<h2 className="text-h2">{categoryTitle}</h2>

			<div className="mt-8 grid p-5 md:grid-cols-3 lg:grid-cols-5">
				{filteredArticles.map((article) => (
					<ArticleCard
						key={article.id}
						articleId={article.id}
						title={article.title}
						category={article.category?.name}
						objectKey={article.images[0]?.objectKey}
						size="md"
					/>
				))}
			</div>
		</div>
	) : (
		<div className="text-h2 container py-16">
			There are currently no {categoryTitle} Articles
		</div>
	)
}
