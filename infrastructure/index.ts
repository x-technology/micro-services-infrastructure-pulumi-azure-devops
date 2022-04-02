import * as azure from "@pulumi/azure";
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

// make an assignment of between registry and kubernetes cluster, so it can pull private docker images
const principalId = cluster.k8sCluster.identityProfile.apply(p => p!["kubeletidentity"].objectId!);
const assignment = new azure.authorization.Assignment("workshop-assignment", {
  principalId: principalId,
  roleDefinitionName: "AcrPull",
  scope: registry.id,
  skipServicePrincipalAadCheck: true,
});
