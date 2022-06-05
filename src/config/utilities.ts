import fetch from 'cross-fetch'; 
import CheckAllInvites from '@modules/invitation/services/CheckAllInvites';
import GetSetting from '@modules/settings/services/GetSetting';
var nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const bwipjs = require('bwip-js');
class MiddleUtilities {


  public  generateString(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


 public checkStatus (req: { originalUrl: string | string[]; }, res: any, next: () => void) {
    
     
        if(!req.originalUrl.includes("check_invite")){
            console.log("Running Check");


            const checkInvites = new CheckAllInvites();
        
            const res = checkInvites.execute();
           
            
           
           /**fetch(req.protocol + '://' + req.get('host') +'/invitation/check_invite', {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(response =>{ 
                console.log( response.json());
               
            })
          .then(data => {
            //console.log(req.session);
            
           });
           **/
        
            // keep executing the router middleware
            next()
        }
    }

    public async sendPushNotification(message: any) {
        
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      }

      public async getSetting(name:any) {
        
       
        const settings = new GetSetting();
        
        const setting = await settings.execute(name);
        return setting;
      }

      public sendSMS(apiKey:string,number:string,message:string,sender_id:string){
        if(number.length<4){
          return;
        }
        const url = new URL("https://www.bulksmsnigeria.com/api/v1/sms/create");

      //const url = "https://www.bulksmsnigeria.com/api/v2/sms/create";
      
      
      let params = {
          "api_token": apiKey,
          "to": number,
          "from": sender_id,
          "body": message,
          "gateway": "0",
          "append_sender": "0",
      };
      Object.keys(params)
          .forEach(key => url.searchParams.append(key, params[key]));
      
      let headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
      };
      
      fetch(url, {
          method: "POST",
          headers,
         
      }).then(response => response.json());
      }

      public sendSendGridEmail(apiKey: string,sender_email:string,sender_name:string,receiver_email:string,receiver_name:string,message:string,subject:string,attachments=null){

        sgMail.setApiKey(apiKey);

       

        const msg = {
          personalizations: [
            {
              to: [
                {
                  email: receiver_email,
                  name: receiver_name
                }
              ],
              
            },
            {
              from: {
                email: sender_email,
                name: sender_name
              },
              to: [
                {
                  email: receiver_email,
                  name: receiver_name
                }
              ]
            }
          ],
          from: {
            email: sender_email,
            name: sender_name
          },
          subject: subject,
          content: [
            {
              type: 'text/html',
              value: message
            }
          ],
          ipPoolName: 'transactional email',
          mailSettings: {
            bypassListManagement: {
              enable: false
            },
            footer: {
              enable: false
            },
            sandboxMode: {
              enable: false
            }
          },
          trackingSettings: {
            clickTracking: {
              enable: true,
              enableText: false
            },
            openTracking: {
              enable: true,
              substitutionTag: '%open-track%'
            },
            subscriptionTracking: {
              enable: false
            }
          }
        };

        if(attachments){
          msg["attachments"]=attachments;

        }

        sgMail
          .send(msg)
          .then((response: { headers: any;statusCode:any; }[]) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
          })
          .catch((error: any) => {
            console.error(error)
          })

       /**  var transporter = nodemailer.createTransport({
          service: smtp_name,
          auth: {
            user: smtp_email,
            pass: smtp_password
          }
        });

        var mailOptions = {
          from: `${sender_name} <${sender_email}>`,
          to: receiver_email,
          subject: subject,
          html: message
        } 
        
        transporter.sendMail(mailOptions, function(error:any, info:any){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });**/
      }


       public sendEmail(smtp_name:string,smtp_email:string,smtp_password:string,sender_email:string,sender_name:string,receiver_email:string,name:string,message:string,subject:string,attachments=null){
        /*var transporter = nodemailer.createTransport({
          service: smtp_name,
          auth: {
            user: smtp_email,
            pass: smtp_password
          }
        });*/

        var transporter = nodemailer.createTransport({
          host: smtp_name,
          pool: true,
          port: 465,
          secure: true, // use TLS
 
          auth: {
            user: smtp_email,
            pass: smtp_password
          },
        });

        var mailOptions = {
          from: `"${sender_name}" <${sender_email}>`,
          to: receiver_email,
          subject: subject,
          html: message
        } 
        if(attachments){
          mailOptions['attachments']=attachments;
        }
        
        transporter.sendMail(mailOptions, function(error:any, info:any){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }

      public stringToBarCodeBase64 (text: any) {
        return new Promise((resolve, reject) => {
            bwipjs.toBuffer({
                bcid: 'qrcode',
                text: text,
                scale: 6,
                height: 20,
                width: 20,
                includetext: true,
                textxalign: 'center'
            }, function(error: any, buffer: { toString: (arg0: string) => any; }) {
                if(error) {
                    reject(error)
                } else {
                    let gifBase64 = `${buffer.toString('base64')}`
                    resolve(gifBase64)
                }
            })
        })
    }
}

export default MiddleUtilities;