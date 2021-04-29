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

let bucketPrefix = ""; // an empty prefix will result in no prefix

// Scan for files in Nuxt.js dist dir & add them via Pulumi FileAssets into S3 Bucket
recursivelyAddFilesToS3("../dist");

function recursivelyAddFilesToS3(nuxtDistdir: string) {
  for (const fileOrDir of fs.readdirSync(nuxtDistdir)) {
    const sourceFileOrDirPath = path.join(nuxtDistdir, fileOrDir);

    if(isDirectory(sourceFileOrDirPath)) {
      createS3BucketFolder(fileOrDir);
      bucketPrefix = bucketPrefix + fileOrDir + "/"; // --> empty prefix + '_nuxt' dir == '_nuxt/fileName'
      // recurse into subdirectory (see https://stackoverflow.com/a/16684530/4964553)
      recursivelyAddFilesToS3(sourceFileOrDirPath);
    }
    else {
      // Yeah, we got a file - so let's create a S3 Bucket Object
      createS3BucketObject(fileOrDir, bucketPrefix, sourceFileOrDirPath);
    }
  }
}

function isDirectory(fileOrDirPath: string) {
  return fs.statSync(fileOrDirPath).isDirectory();
}

function createS3BucketFolder(dirName: string) {
  new aws.s3.BucketObject(dirName, {
    bucket: nuxtBucket,
    acl: "public-read",
    key: dirName + "/", // an appended '/' will create a S3 Bucket prefix (see https://stackoverflow.com/a/57479653/4964553)
    contentType: "application/x-directory" // this content type is also needed for the S3 Bucket prefix
    // no source needed here!
  })
}

function createS3BucketObject(fileName: string, bucketPrefix: string, sourceFilePath: string) {
  new aws.s3.BucketObject(fileName, {
    bucket: nuxtBucket,
    acl: "public-read",
    key: bucketPrefix + fileName,
    source: new pulumi.asset.FileAsset(sourceFilePath)
  })
}

// Export the name of the bucket
export const bucketName = nuxtBucket.id;
