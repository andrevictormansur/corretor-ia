export default function Logo({ dark = false, className = 'h-8' }) {
  return (
    <img
      src={dark ? '/logo-dark.svg' : '/logo-light.svg'}
      alt="Approva.AI"
      className={className}
    />
  )
}
