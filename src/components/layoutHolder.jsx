export default function LayoutHolder({ children }) {
  return (
    <div className="grid gap-4 justify-center rounded-xl *:rounded-xl overflow-hidden perspective-normal">
      {children}
    </div>
  )
}