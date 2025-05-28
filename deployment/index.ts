import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an AWS resource (S3 Bucket)
const nuxtBucket = new aws.s3.BucketV2("microservice-ui-nuxt-js-hosting-bucket");

const bucketPublicAccessBlock = new aws.s3.BucketPublicAccessBlock("bucketPublicAccessBlock", {
    bucket: nuxtBucket.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false,
});

const bucketOwnershipControls = new aws.s3.BucketOwnershipControls("bucketOwnershipControls", {
    bucket: nuxtBucket.id,
    rule: {
        objectOwnership: "ObjectWriter",
    },
});

const bucketAclV2 = new aws.s3.BucketAclV2("bucketAclV2", {
    bucket: nuxtBucket.id,
    acl: "public-read",
}, {
    dependsOn: [bucketOwnershipControls],
});

// We need to use the BucketWebsiteConfigurationV2 with the new AWS S3 API
const websiteConf = new aws.s3.BucketWebsiteConfigurationV2("websiteConf", {
    bucket: nuxtBucket.id,
    indexDocument: {
        suffix: "index.html",
    }
});

// S3 Objects from Nuxt.js static site generation will be added through aws CLI instead of Pulumi like this
// (see https://www.pulumi.com/docs/tutorials/aws/aws-ts-static-website/#deployment-speed):
// aws s3 sync ../dist/ s3://$(pulumi stack output bucketName) --acl public-read

// Export the name of the bucket
export const bucketName = nuxtBucket.id;
export const bucketUrl = websiteConf.websiteEndpoint;
