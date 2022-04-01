import * as pulumi from "@pulumi/pulumi";
import * as containerService from "@pulumi/azure-native/containerservice";
import * as azuread from "@pulumi/azuread";
import * as k8s from "@pulumi/kubernetes";

import * as config from "./config";
import { resourceGroup } from "./resourceGroup";

const adApp = new azuread.Application("app", {
  displayName: "app",
});

const adSp = new azuread.ServicePrincipal("service-principal", {
  applicationId: adApp.applicationId,
});

const adSpPassword = new azuread.ServicePrincipalPassword("sp-password", {
  servicePrincipalId: adSp.id,
});

export const k8sCluster = new containerService.ManagedCluster("workshop-cluster", {
  resourceGroupName: resourceGroup.name,
  identity: {
    type: "SystemAssigned",
  },
  agentPoolProfiles: [{
    count: config.nodeCount,
    maxPods: 110,
    mode: "System",
    name: "agentpool",
    nodeLabels: {},
    osDiskSizeGB: 30,
    osType: "Linux",
    type: "VirtualMachineScaleSets",
    vmSize: config.nodeSize,
  }],
  dnsPrefix: resourceGroup.name,
  enableRBAC: true,
  kubernetesVersion: config.k8sVersion,
  linuxProfile: {
    adminUsername: config.adminUserName,
    ssh: {
      publicKeys: [{
        keyData: config.sshPublicKey,
      }],
    },
  },
  nodeResourceGroup: "node-resource-group",
  servicePrincipalProfile: {
    clientId: adApp.applicationId,
    secret: adSpPassword.value,
  },
});

const creds = containerService.listManagedClusterUserCredentialsOutput({
  resourceGroupName: resourceGroup.name,
  resourceName: k8sCluster.name,
});

export const kubeconfig =
  creds.kubeconfigs[0].value
    .apply(enc => Buffer.from(enc, "base64").toString());

export const k8sProvider = new k8s.Provider("k8s-provider", {
  kubeconfig: kubeconfig,
});
