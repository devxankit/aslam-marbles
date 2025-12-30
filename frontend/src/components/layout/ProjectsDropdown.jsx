import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { projects as defaultProjects } from '../../data/projects'
import { buildImageUrl, fetchNavItems } from '../../utils/aslamHouseUtils'
import TranslatedText from '../TranslatedText'

const GROUP = 'projects-nav'

const ProjectsDropdown = () => {
  const [items, setItems] = useState(defaultProjects)

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      const data = await fetchNavItems(GROUP, true)
      if (!isMounted || !Array.isArray(data) || data.length === 0) return
      const normalized = data.map((item) => ({
        ...item,
        id: item.key || item.id,
        name: item.name,
        path: item.path || '#',
        image: buildImageUrl(item.imagePath || item.image),
        displayOrder: item.displayOrder ?? 0
      }))
      setItems(normalized)
    }
    load()
    return () => { isMounted = false }
  }, [])

  const displayItems = useMemo(() => {
    return (items || []).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  }, [items])

  return (
    <div className="w-full h-full flex items-start py-4 px-6 md:px-8 lg:px-12 gap-4 md:gap-6 lg:gap-8">
      {/* Menu Items - Left Side */}
      <div className="flex-shrink-0 w-48 md:w-56 lg:w-64">
        <nav className="space-y-1">
          {displayItems.map((project) => {
            const ItemContent = (
              <div className="w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 rounded transition-all duration-200 font-medium">
                <h3 className="uppercase"><TranslatedText>{project.name}</TranslatedText></h3>
              </div>
            )

            if (project.path && project.path !== '#') {
              return (
                <Link key={project.id} to={project.path}>
                  {ItemContent}
                </Link>
              )
            }

            return <div key={project.id}>{ItemContent}</div>
          })}
        </nav>
      </div>

      {/* Images - Right Side in Horizontal Line - Hidden on Mobile */}
      <div className="hidden lg:flex flex-1 items-center gap-3 md:gap-4 overflow-x-auto h-full">
        {displayItems.map((project) => {
          const ImageContent = (
            <div className="group cursor-pointer flex-shrink-0 flex flex-col">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 w-28 h-[260px] md:w-32 md:h-[260px] lg:w-36 lg:h-[260px] shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-black text-center mt-1.5 group-hover:text-[#8B7355] transition-colors whitespace-nowrap">
                <TranslatedText>{project.name}</TranslatedText>
              </h3>
            </div>
          )

          if (project.path && project.path !== '#') {
            return (
              <Link key={project.id} to={project.path}>
                {ImageContent}
              </Link>
            )
          }

          return <div key={project.id}>{ImageContent}</div>
        })}
      </div>
    </div>
  )
}

export default ProjectsDropdown

