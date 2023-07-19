import { lambda as printerLambda } from './infra/lambdas/printerLambda'

import { api } from './infra/api'

Object.keys(printerLambda)

export const API_URL = api.url
