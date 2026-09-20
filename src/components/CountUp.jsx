import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react'

function CountUp({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1.4,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`,
  )

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, value, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [isInView, value, duration, count])

  return <motion.span ref={ref}>{display}</motion.span>
}

export default CountUp
