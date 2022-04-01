import * as cloudflare from "@pulumi/cloudflare";
import * as ingress from "./k8s/system";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config('cloudflare-config');

export const mainRecord = new cloudflare.Record("main", {
  name: config.require('host'),
  zoneId: config.require('zoneId'),
  type: "A",
  proxied: true,
  value:  ingress.ingressServiceIP,
  ttl: 1
});
