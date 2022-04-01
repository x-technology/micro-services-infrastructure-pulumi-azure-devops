import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import * as cluster from "../cluster";
// import * as apps from "./apps";

const ingressNamespace = new k8s.core.v1.Namespace("nginx-ingress", undefined, { provider: cluster.k8sProvider });

const ingress = new k8s.helm.v3.Release("nginx", {
  chart: "nginx-ingress",
  version: "0.4.1", // 0.12.2
  repositoryOpts: {
    repo: "https://helm.nginx.com/stable",
  },
  namespace: ingressNamespace.metadata.name,
}, {
  provider: cluster.k8sProvider,
});

// Get the status field from the wordpress service, and then grab a reference to the spec.
const svc = k8s.core.v1.Service.get(
  "nginx-nginx-ingress",
  pulumi.interpolate`${ingress.status.namespace}/${ingress.status.name}-nginx-ingress`,
  {
    provider: cluster.k8sProvider,
  },
);
export const ingressServiceIP = svc.status.apply(status => pulumi.interpolate`${status.loadBalancer.ingress[0].ip}`);
