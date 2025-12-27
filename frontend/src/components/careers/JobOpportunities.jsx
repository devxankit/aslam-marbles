import { useState } from 'react'

const JobOpportunities = ({ jobs = [] }) => {
  const [selectedJob, setSelectedJob] = useState(null)

  const openJobModal = (job) => {
    setSelectedJob(job)
  }

  const closeJobModal = () => {
    setSelectedJob(null)
  }

  // Group jobs by category
  const jobsByCategory = jobs.reduce((acc, job) => {
    if (!acc[job.category]) {
      acc[job.category] = []
    }
    acc[job.category].push(job)
    return acc
  }, {})

  const categoryTitles = {
    architecture: 'Architecture',
    creative: 'Creative',
    sales: 'Sales'
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* Title Section */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6">
          Job Opportunities
        </h2>
        <div className="w-24 h-1 bg-[#8B7355] mx-auto mb-6 rounded-full"></div>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center gap-2 md:gap-8 mb-8 md:mb-12 flex-nowrap">
        {Object.keys(jobsByCategory).map((category) => (
          <button
            key={category}
            onClick={() => {
              const firstJob = jobsByCategory[category][0]
              if (firstJob) {
                const element = document.getElementById(`job-card-${firstJob._id}`)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  // Highlight effect
                  element.classList.add('ring-4', 'ring-[#8B7355]', 'ring-opacity-50')
                  setTimeout(() => {
                    element.classList.remove('ring-4', 'ring-[#8B7355]', 'ring-opacity-50')
                  }, 2000)
                }
              }
            }}
            className="px-3 py-1.5 md:px-6 md:py-2 text-[10px] md:text-base font-medium tracking-wider transition-all duration-300 text-gray-700 hover:text-[#8B7355] border-b-2 border-transparent hover:border-[#8B7355] whitespace-nowrap"
          >
            {categoryTitles[category]}
          </button>
        ))}
      </div>

      {/* Job Cards - All in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {jobs.filter(job => job.isActive).map((job) => (
          <div
            key={job._id}
            id={`job-card-${job._id}`}
            className="bg-white border border-gray-200 p-4 md:p-6 flex flex-col justify-between transition-all duration-300 rounded-lg shadow-sm"
          >
            <div>
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mb-1 md:mb-2">{categoryTitles[job.category]}</p>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                {job.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                Experience: {job.experience}
              </p>
            </div>

            <div className="flex gap-2 md:gap-3 mt-2 md:mt-4">
              <a
                href="#join-the-team"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('join-the-team')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex-1 text-center px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-all duration-300 underline"
                style={{ color: '#8B7355' }}
              >
                Apply Now
              </a>
              <button
                onClick={() => openJobModal(job)}
                className="flex-1 px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white transition-all duration-300 hover:opacity-90 rounded"
                style={{ backgroundColor: '#8B7355' }}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details Modal - Blur & Animation */}
      {selectedJob && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          {/* Backdrop with Blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
            onClick={closeJobModal}
          ></div>

          {/* Modal Content */}
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden relative z-10 animate-slide-down flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-10 bg-[#8B7355] rounded-full"></div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {selectedJob.title}
                  </h2>
                  <p className="text-[#8B7355] font-medium uppercase tracking-widest text-xs mt-1">
                    {selectedJob.type} • {selectedJob.location}
                  </p>
                </div>
              </div>
              <button
                onClick={closeJobModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-black transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 md:p-10 overflow-y-auto">
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B7355]/10 text-[#8B7355]">📝</span>
                    Job Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light italic text-lg">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Requirements */}
                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B7355]/10 text-[#8B7355]">✅</span>
                      Requirements
                    </h3>
                    <ul className="space-y-3">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-gray-600">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-[#8B7355] flex-shrink-0"></span>
                          <span className="font-light">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50 flex items-center justify-end gap-4 sticky bottom-0 z-20">
              <button
                onClick={closeJobModal}
                className="px-6 py-3 font-bold text-gray-600 hover:text-black transition-colors"
              >
                Close
              </button>
              <a
                href="#join-the-team"
                onClick={(e) => {
                  e.preventDefault()
                  closeJobModal()
                  setTimeout(() => {
                    document.getElementById('join-the-team')?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
                className="px-8 py-3 rounded-xl bg-[#8B7355] text-white font-bold hover:bg-[#6B5A42] transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobOpportunities
