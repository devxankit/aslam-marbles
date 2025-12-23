import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'

const ProjectsModal = ({ isOpen, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || null)

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[102] transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-[105] p-4 pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-2xl max-w-6xl w-full pointer-events-auto transform transition-all duration-300 ease-out animate-in"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-3xl font-bold transition-colors w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          <div className="px-4 md:px-8 pb-12">
            {/* Centered Menu Links */}
            <div className="w-full max-w-md mx-auto">
              <nav className="flex flex-col gap-3">
                {projects.map((project) => {
                  const ItemContent = (
                    <div
                      className="w-full text-center px-6 py-4 rounded-xl transition-all duration-300 text-gray-700 hover:bg-[#8B7355]/5 hover:text-[#8B7355] font-serif italic text-xl md:text-2xl border border-transparent hover:border-[#8B7355]/20 cursor-pointer"
                    >
                      <h3 className="uppercase tracking-widest">{project.name}</h3>
                    </div>
                  )

                  if (project.path) {
                    return (
                      <Link
                        key={project.id}
                        to={project.path}
                        onClick={onClose}
                      >
                        {ItemContent}
                      </Link>
                    )
                  }

                  return <div key={project.id}>{ItemContent}</div>
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectsModal

