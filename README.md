# Portfolio
View an example at https://bugg.co/

Feel free to use this code and modify it however you like, as long as it obeys the license by keeping a reference to the source.

#### Sample `private/recaptcha_secret.js`
```javascript
module.exports = {
  secret: "YOUR_SECRET_HERE",
  email: "youremail@example.com"
}
```

HTTPS certificate is stored in AWS.

The program takes the following environment variables:
* `AWS_PROFILE` - Name of the AWS credentials profile to use in order to access the HTTPS certificate & private key
stored in AWS S3.
* `AWS_PRIVATE_BUCKET` - The bucket in which the HTTPS credentials are located.
* `AWS_PRIVATE_PREFIX` - Object prefix prepended to the credentials path when getting them.