import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";
import * as path from "path";

// Create an AWS resource (S3 Bucket)
const nuxtBucket = new aws.s3.Bucket("microservice-ui-nuxt-js-hosting-bucket", {
  acl: "public-read",
  website: {
    indexDocument: "index.html",
  }
});

// Nuxt.js target dir for static site generated assets
const siteDir = "../dist";

// Scan for files in Nuxt.js target dir & add them via Pulumi FileAssets into S3 Bucket
recursivelyAddFilesToS3(siteDir);

function recursivelyAddFilesToS3(dir: string) {
  for (const fileOrDir of fs.readdirSync(dir)) {
    const fileOrDirPath = path.join(dir, fileOrDir);
    if(fs.statSync(fileOrDirPath).isDirectory()) {
      // recurse into subdirectory (see https://stackoverflow.com/a/16684530/4964553)
      recursivelyAddFilesToS3(fileOrDirPath);
    } else {
      // Yeah, we got a file - so let's create a S3 Bucket Object
      new aws.s3.BucketObject(fileOrDir, {
        bucket: nuxtBucket,
        source: new pulumi.asset.FileAsset(fileOrDirPath)
      })
    }
  }
}

// Export the name of the bucket
export const bucketName = nuxtBucket.id;
