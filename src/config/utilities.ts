import fetch from 'cross-fetch'; 
import CheckAllInvites from '@modules/invitation/services/CheckAllInvites';

class MiddleUtilities {
 public checkStatus (req, res, next) {
    
     
        if(!req.originalUrl.includes("check_invite")){
            console.log("Runnning Check");

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
}

export default MiddleUtilities;