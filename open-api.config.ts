import type { ConfigFile } from '@rtk-query/codegen-openapi'

const  url = process.env.BACKEND_URL
const config:ConfigFile = {
  schemaFile: `${url}/api-docs/auth/swagger.json`,
  apiFile: './apps/web-app/store/auth/emptyapi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './apps/web-app/store/auth/authApi.ts',
  exportName: 'authApi',
  hooks: true,
}

export default config