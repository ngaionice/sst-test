import * as iam from "@aws-cdk/aws-iam";
import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack {
  auth;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { api, bucket } = props;

    // create a cognito user pool and identity pool
    this.auth = new sst.Auth(this, "Auth", {
      cognito: {
        userPool: {
          // allow users to login with email + password
          signInAliases: { email: true },
        },
      },
    });

    this.auth.attachPermissionsForAuthUsers([
      // allow access to API
      api,
      new iam.PolicyStatement({
        actions: ["s3:*"],
        effect: iam.Effect.ALLOW,
        // this allows only access to the user's own bucket, not anyone else's
        resources: [
          bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
        ],
      }),
    ]);

    // show auth resources in output
    this.addOutputs({
      Region: scope.region,
      UserPoolId: this.auth.cognitoUserPool.userPoolId,
      IdentityPoolId: this.auth.cognitoCfnIdentityPool.ref,
      UserPoolClientId: this.auth.cognitoUserPoolClient.userPoolClientId,
    });
  }
}
