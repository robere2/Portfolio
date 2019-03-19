const aws = require('aws-sdk');

/**
 * Get a file from the specified S3 bucket & path using the passed S3 object
 * @param s3 S3 Object
 * @param bucket Bucket to retrieve from
 * @param path Path of object to retrieve
 * @param callback Callback to call on error or success. Takes two parameters: error, data
 */
function getFile(s3, bucket, path, callback) {
    s3.getObject({
        Bucket: bucket,
        Key: path
    }, (err, data) => {
            if(err) {
                callback(err);
                return;
            }

            callback(null, data.Body);
    });
}

/**
 * Retrieves HTTPS certificate and private key from S3
 * @param bucket Bucket to connect to
 * @param cert Path to certificate on the S3 bucket
 * @param private_key Path to private key on the S3 bucket
 * @param callback Callback takes 3 parameters: err, cert, private key
 */
function getCertificate(bucket, cert, private_key, callback) {
    let s3;
    if(process.env.AWS_PROFILE)
        s3 = new aws.S3({
            credentials: new aws.SharedIniFileCredentials({profile: process.env.AWS_PROFILE})
        });
    else
        s3 = new aws.S3();

    getFile(s3, bucket, cert, function handleCert(err, certData) {
        if(err) {
            callback(err);
            return;
        }

        getFile(s3, bucket, private_key, function handlePrivateKey(err, privateKeyData) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, certData, privateKeyData);
        })
    });
}

module.exports = {
    getFile: getFile,
    getCertificate: getCertificate
};