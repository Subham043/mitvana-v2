import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/address')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/address"!</div>
}
