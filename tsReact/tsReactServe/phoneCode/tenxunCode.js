//腾讯云短信服务

const tencentcloud = require("tencentcloud-sdk-nodejs");


const SmsClient = tencentcloud.sms.v20190711.Client;
const models = tencentcloud.sms.v20190711.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential("AKIDB06VdUZZoOilJZCRFqqcf9MJ8R9acujV", "KNinbC2uYYKEsGeGfpiL3WjY8j8IsK9A");
let httpProfile = new HttpProfile();
httpProfile.endpoint = "sms.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new SmsClient(cred, "", clientProfile);

let req = new models.SendSmsRequest();




exports.sendCode = (phone,msg,callback)=>{
    let params = `{\"PhoneNumberSet\":[\"+86${phone}\"],\"TemplateID\":\"655130\",\"Sign\":\"感悟网\",\"TemplateParamSet\":[\"${msg}\"],\"SmsSdkAppid\":\"1400394470\"}`
    req.from_json_string(params);
    client.SendSms(req, function(errMsg, response) {

        if (errMsg) {
            console.log(errMsg);
            return;
        }
        callback(response.to_json_string())
    });
}

