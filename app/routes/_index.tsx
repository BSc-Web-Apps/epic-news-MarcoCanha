import { data, useLoaderData, type MetaFunction } from 'react-router'
import ArticleCard from '#app/components/organisms/ArticleCard.tsx'
import HeroCallToAction from '#app/components/organisms/Hero/HeroCallToAction.tsx'
import { TeamMemberCard } from '#app/root.tsx'
import hero1 from '~/assets/jpg/IceTea-header.jpg'
import headshot1 from '~/assets/jpg/portrait-01.jpg'
import headshot2 from '~/assets/jpg/portrait-02.jpg'
import headshot3 from '~/assets/jpg/portrait-03.jpg'
import headshot4 from '~/assets/jpg/portrait-04.jpg'
import headshot5 from '~/assets/jpg/portrait-05.jpg'
import { prisma } from '~/utils/db.server.ts'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]

export async function loader() {
	const allArticles = await prisma.article.findMany({
		take: 5,
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	const techArticles = await prisma.article.findMany({
		take: 5,
		where: {
			isPublished: true,
			category: { slug: 'technology' },
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	const entertainmentArticles = await prisma.article.findMany({
		take: 5,
		where: {
			isPublished: true,
			category: { slug: 'entertainment' },
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	const businessArticles = await prisma.article.findMany({
		take: 5,
		where: {
			isPublished: true,
			category: { slug: 'business' },
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	return data({
		allArticles,
		techArticles,
		entertainmentArticles,
		businessArticles,
	})
}

export default function Index() {
	const { allArticles, techArticles, entertainmentArticles, businessArticles } =
		useLoaderData<typeof loader>()
	const hasAllArticles = allArticles.length > 0
	const hasTechArticles = techArticles.length > 0
	const hasEntertainmentArticles = entertainmentArticles.length > 0
	const hasBusinessArticles = businessArticles.length > 0

	return (
		<main className="place-items-left grid h-full">
			<h1 className="text-bold text-5xl"> Welcome to Epic News!</h1>
			<div className="w-full bg-red-300 py-16">
				<HeroCallToAction image={hero1} imageRight={true}>
					<div className="flex flex-col gap-8 px-8">
						<h2 className="text-h2">Welcome to Epic News</h2>
						<p className="text-lg">
							Keep up to date with the latest tech news.
						</p>
					</div>
				</HeroCallToAction>
			</div>

			<div className="container py-16">
				<h2 className="text-h2 mb-8 font-normal">Latest news</h2>

				<div className="grid grid-cols-4 grid-rows-4 gap-6">
					{allArticles.slice(0, 5).map((article, index) =>
						index === 0 ? (
							<div key={article.id} className="col-span-2 row-span-4">
								<ArticleCard
									articleId={article.id}
									title={article.title}
									category={article.category?.name}
									variant="large"
								/>
							</div>
						) : (
							<div key={article.id} className="col-span-1 row-span-2">
								<ArticleCard
									articleId={article.id}
									title={article.title}
									category={article.category?.name}
									variant="small"
								/>
							</div>
						),
					)}
				</div>
			</div>

			<div className="container py-16 text-5xl">
				<h2 className="text h-2">Technology</h2>

				<div className="mt-8 grid gap-6 p-16 md:grid-cols-3 lg:grid-cols-5">
					{hasTechArticles ? (
						techArticles.map((article) => (
							<ArticleCard
								key={article.id}
								articleId={article.id}
								title={article.title}
								category={article.category?.name}
								objectKey={article.images[0]?.objectKey}
								size="md"
							/>
						))
					) : (
						<div className="text-base">
							There are no published articles to show
						</div>
					)}
				</div>
			</div>

			<div className="container py-16 text-5xl">
				<h2 className="text h-2">Entertainment</h2>

				<div className="mt-8 grid gap-6 p-16 md:grid-cols-3 lg:grid-cols-5">
					{hasEntertainmentArticles ? (
						entertainmentArticles.map((article) => (
							<ArticleCard
								key={article.id}
								articleId={article.id}
								title={article.title}
								category={article.category?.name}
								objectKey={article.images[0]?.objectKey}
								size="md"
							/>
						))
					) : (
						<div className="text-base">
							There are no published articles to show
						</div>
					)}
				</div>
			</div>

			<div className="container py-16 text-5xl">
				<h2 className="text h-2">Business</h2>

				<div className="mt-8 grid gap-6 p-16 md:grid-cols-3 lg:grid-cols-5">
					{hasBusinessArticles ? (
						businessArticles.map((article) => (
							<ArticleCard
								key={article.id}
								articleId={article.id}
								title={article.title}
								category={article.category?.name}
								objectKey={article.images[0]?.objectKey}
								size="md"
							/>
						))
					) : (
						<div className="text-base">
							There are no published articles to show
						</div>
					)}
				</div>
			</div>

			<div className="m-4 flex place-items-center gap-15">
				<TeamMemberCard
					name="Leonard Krasner"
					role="Senior Designer"
					imageSrc={headshot1}
				/>

				<TeamMemberCard
					name="Johnson Smith"
					role="Lead Developer"
					imageSrc={headshot2}
				/>

				<TeamMemberCard
					name="Jane Doe"
					role="Marketing Manager"
					imageSrc={headshot3}
				/>
				<TeamMemberCard
					name="Jane Doe"
					role="Marketing Manager"
					imageSrc={headshot4}
				/>
			</div>
		</main>
	)
}
