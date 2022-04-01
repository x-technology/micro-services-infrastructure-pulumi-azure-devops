import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import * as cluster from "../cluster";
import * as registry from "../registry";
import * as dns from "../dns";

export const appNamespace = new k8s.core.v1.Namespace("apps", undefined, { provider: cluster.k8sProvider });

export const currencyConverter = new k8s.helm.v3.Chart("currency-converter", {
  path: "./charts/grpc",
  namespace: appNamespace.metadata.name,
  values: {
    image: {
      repository: pulumi.interpolate`${registry.registry.loginServer}/grpc`,
      tag: 'latest',
    },
    workingDir: '/usr/src/main/packages/services/grpc/currency-converter',
    ingress: {
      baseDomain: dns.mainRecord.hostname,
      basePath: "/"
    },
    env: [
      {
        name: 'PROVIDER_SERVICES',
        value: 'ecb-provider-grpc:50051',
      }
    ],
  },
}, {
  provider: cluster.k8sProvider,
});

export const ecbProvider = new k8s.helm.v3.Chart("ecb-provider", {
  path: "./charts/grpc",
  namespace: appNamespace.metadata.name,
  values: {
    image: {
      repository: pulumi.interpolate`${registry.registry.loginServer}/grpc`,
      tag: 'latest',
    },
    workingDir: '/usr/src/main/packages/services/grpc/ecb-provider',
    ingress: {
      baseDomain: dns.mainRecord.hostname,
      basePath: "/ecb-provider"
    },
  },
}, {
  provider: cluster.k8sProvider,
});
