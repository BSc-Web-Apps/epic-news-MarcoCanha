import { invariant } from '@epic-web/invariant'
import { type LoaderFunctionArgs, data, useLoaderData } from 'react-router'
import { RelatedArticlesSidebar } from '#app/routes/related-articles-sidebar.tsx'
import { prisma } from '~/utils/db.server.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { articleId } = params

	invariant(typeof articleId === 'string', 'No article ID provided')

	// Fetch the article by ID
	const article = await prisma.article.findUnique({
		where: { id: articleId },
		select: {
			id: true,
			title: true,
			content: true,
			category: { select: { name: true } },
			owner: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	return data({ article })
}

const ArticleNotFound = () => {
	return (
		<div className="container flex h-full flex-1 flex-col items-center justify-center">
			<h2 className="text-h2 pb-8 text-center">No article found 🤔</h2>
			<p className="text-center text-xl">
				Please check the article ID in your browser and try again.
			</p>
		</div>
	)
}

export default function ArticleRoute() {
	const { article } = useLoaderData<typeof loader>()

	return article ? (
		<div className="container py-16">
			<h2 className="text-h2 pb-8">{article.title}</h2>
			<h2 className="text-2xl">{article.category?.name || 'General news'}</h2>
			<h2 className="pb-8">{article.content} </h2>
			<h2 className="text-bold text-xl">{article.owner.name} </h2>
		</div>
	) : (
		<ArticleNotFound />
	)
}
