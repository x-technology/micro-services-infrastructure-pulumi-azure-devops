import * as azure from "@pulumi/azure";
import * as azureNative from "@pulumi/azure-native";
import * as cluster from "./cluster";
import * as dns from "./dns";
import { registry } from "./registry";
import * as k8s_system from "./k8s/system";
import * as apps from "./k8s/apps";

// export let kubeConfig = cluster.kubeconfig;
export let clusterName = cluster.k8sCluster.name;
export let registryName = registry.loginServer;
export let ingressServiceIP = k8s_system.ingressServiceIP;
export let dnsRecord = dns.mainRecord.hostname;
export let currencyConverter = apps.currencyConverter.urn;

const principalId = cluster.k8sCluster.identityProfile.apply(p => p!["kubeletidentity"].objectId!);
// const subscription = await azure.core.getSubscription({});
// const registry = ...
// const subscriptionId = ...

// const roleDefinitionId = `/subscriptions/${subscription.id}/providers/Microsoft.Authorization/roleDefinitions/7f951dda-4ed3-4680-a7ca-43fe172d538d`;

const assignment = new azure.authorization.Assignment("workshop-assignment", {
  principalId: principalId,
  roleDefinitionName: "AcrPull",
  scope: registry.id,
  skipServicePrincipalAadCheck: true,
});
// const assignment = new azureNative.authorization.RoleAssignment("acr-pull", {
//   properties: {
//     principalId: principalId,
//     roleDefinitionId: roleDefinitionId,
//   },
//   scope: registry.id,
// });


// const registry2kube = new azure.authorization.Assignment("workshop-assignment", {
//   principalId: cluster.k8sCluster.kubeletIdentities.apply(kubeletIdentities => kubeletIdentities[0].objectId),
//   roleDefinitionName: "AcrPull",
//   scope: registry.id,
//   skipServicePrincipalAadCheck: true,
// });
