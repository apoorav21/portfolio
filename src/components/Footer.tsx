export default function Footer() {
  return (
    <footer style={{
      padding: '22px 36px',
      borderTop: '1px solid var(--line-soft)',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-mute)',
      letterSpacing: '0.05em',
      maxWidth: 1180,
      margin: '60px auto 0',
    }}>
      <span>© 2026 Apoorav Rao</span>
      <span>built with care · Echo says hi</span>
    </footer>
  )
}
