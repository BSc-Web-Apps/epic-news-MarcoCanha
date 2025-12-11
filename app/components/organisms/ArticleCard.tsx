interface ArticleCardProps {
	title: string
	category?: string
}

export default function ArticleCard({ title, category }: ArticleCardProps) {
	return (
		<div className="bg-red-900 p-4">
			<h3>{title}</h3>
			<p>{category || 'General News'}</p>
		</div>
	)
}
