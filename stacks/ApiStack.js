import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    this.api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "POST /notes": "src/create.main",
        "GET /notes/{id}": "src/get.main",
        "GET /notes": "src/getall.main",
        "PUT /notes/{id}": "src/update.main",
      },
    });

    // allow the API to access the table
    this.api.attachPermissions([table]);

    // show API endpoint in output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}