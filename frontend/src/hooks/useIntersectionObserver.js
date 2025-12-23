import { useEffect, useState, useRef } from 'react'

export const useIntersectionObserver = (threshold = 0.3) => {
  const [visibleSections, setVisibleSections] = useState({})
  const refs = {
    step1: useRef(null),
    step2: useRef(null),
    step3: useRef(null),
    step4: useRef(null),
    step5: useRef(null),
  }

  useEffect(() => {
    const observers = []
    const sections = [
      { ref: refs.step1, key: 'step1' },
      { ref: refs.step2, key: 'step2' },
      { ref: refs.step3, key: 'step3' },
      { ref: refs.step4, key: 'step4' },
      { ref: refs.step5, key: 'step5' },
    ]

    sections.forEach(({ ref, key }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => ({ ...prev, [key]: true }))
            }
          },
          { threshold }
        )
        observer.observe(ref.current)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [threshold])

  return { refs, visibleSections }
}

