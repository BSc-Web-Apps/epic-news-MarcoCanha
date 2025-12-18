import { data, type MetaFunction } from 'react-router'
import HeroCallToAction from '#app/components/organisms/Hero/HeroCallToAction.tsx'
import { TeamMemberCard } from '#app/root.tsx'
import hero1 from '~/assets/jpg/IceTea-header.jpg'
import headshot1 from '~/assets/jpg/portrait-01.jpg'
import headshot2 from '~/assets/jpg/portrait-02.jpg'
import headshot3 from '~/assets/jpg/portrait-03.jpg'
import { prisma } from '~/utils/db.server.ts'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]

export async function loader() {
	const filteredArticles = await prisma.article.findMany({
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})
	return data({ filteredArticles })
}

export default function Index() {
	return (
		<main className="grid h-full place-items-center">
			<h1 className="text-mega">Epic News!</h1>
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

			<div className="m-4 flex gap-4">
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
			</div>
		</main>
	)
}
