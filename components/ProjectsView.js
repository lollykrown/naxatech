import Shell from '@/components/Shell'
import PageHeader from '@/components/PageHeader'
import Work from '@/components/Work'
import Pagination from '@/components/Pagination'
import projects, { PROJECTS_PER_PAGE, projectPageCount } from '@/lib/projects'

export default function ProjectsView({ page }) {
  const totalPages = projectPageCount()
  const start = (page - 1) * PROJECTS_PER_PAGE
  const items = projects.slice(start, start + PROJECTS_PER_PAGE)

  return (
    <Shell>
      <PageHeader eyebrow="Our Work" title="Every project," highlight="in one place">
        {projects.length} websites, mobile apps and platforms we've designed and built for clients in Nigeria and the UK.
      </PageHeader>
      <Work standalone items={items} priorityCount={3} />
      <div className="bg-white pb-24 -mt-16 relative z-10">
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </Shell>
  )
}
