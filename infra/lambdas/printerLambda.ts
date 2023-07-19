import * as aws from '@pulumi/aws'
import { image } from '../ecr'

const STACK = "dev"

const lambdaName = "printerLambda"
const lambdaPolicyAttachmentName = "lambdaFullAccess-printerLambda"

const lambdaRole = new aws.iam.Role(`${lambdaName}-role-${STACK}`,
    {
        assumeRolePolicy: `{
            "Version": "2012-10-17",
            "Statement": [
            {
                "Action": "sts:AssumeRole",
                "Principal": {
                "Service": "lambda.amazonaws.com"
                },
                "Effect": "Allow",
                "Sid": ""
            }
            ]
        }
    `
    }
);

// Log Group for this Lambda function.
const logGroup = new aws.cloudwatch.LogGroup(`log-group-${lambdaName}`, {
    name: `/aws/lambda/${lambdaName}`,
    retentionInDays: 90,
})


// CloudWatch IAM Policy for logging to Lambda
const lambdaLoggingPolicy = new aws.iam.Policy(`${lambdaName}-log-group-policy`, {
    description: "IAM policy for logging from Lambda",
    path: "/",
    policy: `{
        "Version": "2012-10-17",
        "Statement": [
        {
            "Action": [
            "logs:CreateLogStream",
            "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*",
            "Effect": "Allow"
        }
        ]
    }
    `
});


new aws.iam.RolePolicyAttachment(`attach-${lambdaName}-logging`, {
    policyArn: lambdaLoggingPolicy.arn,
    role: lambdaRole.name
});

new aws.iam.RolePolicyAttachment(lambdaPolicyAttachmentName, {
    role: lambdaRole.name,
    policyArn: aws.iam.ManagedPolicy.AWSLambdaExecute
})


export const lambda = new aws.lambda.Function(lambdaName, {
    name: lambdaName,
    packageType: "Image",
    imageUri: image.imageUri,
    role: lambdaRole.arn,
    timeout: 900,
    runtime: 'python3.8',
    },
        { dependsOn: logGroup }
    )