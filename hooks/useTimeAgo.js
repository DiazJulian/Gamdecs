const USE_DATE = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const dateDiff = timestamp => {
  const now = Date.now()
  const diff = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of USE_DATE) {
    if (Math.abs(diff) > secondsInUnit || unit === 'second') {
      const value = Math.floor(diff / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo (timestamp) {
  const {value, unit} = dateDiff(timestamp)

  const rtf = new Intl.RelativeTimeFormat('es', { style: 'long' })
  return rtf.format(value, unit)
}

// export default function useTimeAgo (timestamp) {
//   const [timeago, setTimeago] = useState(() => dateDiff(timestamp))

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newDate = dateDiff(timestamp)
//       setTimeago(newDate)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [timestamp])

//   const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' })
//   const { value, unit } = timeago

//   return rtf.format(value, unit)
// }
