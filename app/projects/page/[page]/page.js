import { notFound, redirect } from 'next/navigation'
import ProjectsView from '@/components/ProjectsView'
import { projectPageCount } from '@/lib/projects'

export function generateStaticParams() {
  return Array.from({ length: projectPageCount() }, (_, i) => ({ page: String(i + 1) }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { page } = await params
  return {
    title: `Our Work, Page ${page} | Naxatech`,
    description: 'Websites, mobile apps and platforms built by Naxatech for clients in Nigeria and the UK.',
    alternates: { canonical: `/projects/page/${page}` },
  }
}

export default async function ProjectsPaged({ params }) {
  const { page: raw } = await params
  const page = Number(raw)
  if (!Number.isInteger(page) || page < 1 || page > projectPageCount()) notFound()
  if (page === 1) redirect('/projects')
  return <ProjectsView page={page} />
}
