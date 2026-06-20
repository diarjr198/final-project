export default function Button({ as: Component = 'button', variant = 'primary', className = '', ...props }) {
  const styles = variant === 'ghost' ? 'btn ghost' : 'btn primary'
  return <Component className={`${styles} ${className}`} {...props} />
}
