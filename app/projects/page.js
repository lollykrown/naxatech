import ProjectsView from '@/components/ProjectsView'

export const metadata = {
  title: 'Our Work | Naxatech',
  description:
    'Websites, mobile apps and platforms built by Naxatech for clients in Nigeria and the UK: e-commerce, marketplaces, consultancies, media and more.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return <ProjectsView page={1} />
}
