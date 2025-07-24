import { useSwipeable } from 'react-swipeable'
import { useNavigate } from 'react-router-dom'

export function useSwipeNavigate(paths = {}, exclude) {
  const navigate = useNavigate()

  const shouldBlockSwipe = (event) => {
    const target = event?.event?.target
    if (!target || !exclude) return false

    if (Array.isArray(exclude)) {
      return exclude.some(cls => target.closest(`.${cls}`))
    }

    return target.closest(`.${exclude}`)
  }

  const handlers = useSwipeable({
    onSwipedLeft: (event) => {
      if (shouldBlockSwipe(event)) return
      if (paths.left) navigate(paths.left)
    },
    onSwipedRight: (event) => {
      if (shouldBlockSwipe(event)) return
      if (paths.right) navigate(paths.right)
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  })

  return handlers
}
