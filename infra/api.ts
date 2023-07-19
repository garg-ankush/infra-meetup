import * as awsx from "@pulumi/awsx/classic";
import { lambda as printerLambda } from './lambdas/printerLambda'


export const api = new awsx.apigateway.API(
    `printer-api-gateway`, {
        stageName: 'DEV',
        routes: [
            {
                path: "/print",
                method: "POST",
                eventHandler: printerLambda
            },


        ]
    }
)