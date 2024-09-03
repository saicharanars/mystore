import type { ConfigFile } from '@rtk-query/codegen-openapi'

const  url = process.env.BACKEND_URL
const config: ConfigFile = {
  schemaFile: `${url}/api-docs/auth/swagger.json`,
  apiFile: './store/auth/emptyapi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './store/auth/authApi.ts',
  exportName: 'authApi',
  hooks: true,
}

export default config