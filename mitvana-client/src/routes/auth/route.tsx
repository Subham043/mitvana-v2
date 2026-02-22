import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full py-10">
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
