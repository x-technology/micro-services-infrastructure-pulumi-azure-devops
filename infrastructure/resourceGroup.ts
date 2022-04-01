import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

const config = new pulumi.Config();

export const resourceGroup = new azure.core.ResourceGroup("workshop-group", {
  // location: config.get('azure-native:location')
  location: 'uksouth',
});
