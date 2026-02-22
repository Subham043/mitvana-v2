import handler, { createServerEntry } from '@tanstack/react-start/server-entry'
import { getAxiosContext } from './lib/integrations/axios/axios-provider'

export default createServerEntry({
    async fetch(request, opts) {
        return handler.fetch(request, { ...opts, context: { ...getAxiosContext() } })
    },
})