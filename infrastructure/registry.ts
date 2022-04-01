import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import { resourceGroup } from './resourceGroup';

export const registry = new azure.containerservice.Registry("workshop", {
  resourceGroupName: resourceGroup.name,
  location: resourceGroup.location,
  sku: 'Basic',
});
