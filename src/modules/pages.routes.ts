import { Router } from 'express';
import fetch from 'cross-fetch'; 
import moment from 'moment';



const pagesRouter = Router();


//pagesRouter.post('/tenant/create', ensureAuthenticated, LessonsController.create);


pagesRouter.get('/', (req, res) => {
    
    if(req.session.userid){
      fetch(req.protocol + '://' + req.get('host') +'/general/dashboard/e/ww/', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          "Authorization":req.session.token 
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        
        res.render('dashboard',{ title: 'Dashboard',user:req.session.user,stat:data, layout: 'auth' });
      
      });
    }else{
    res.render('index');
    }
});

pagesRouter.get('/dashboard', (req, res) => {
    if(req.session.userid){
      fetch(req.protocol + '://' + req.get('host') +'/general/dashboard/e/ww/', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization":req.session.token 
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(response => response.json())
          .then(data => {
            //console.log(data);
            
            res.render('dashboard',{ title: 'Dashboard',user:req.session.user,stat:data, layout: 'auth' });
          
          });
       
    }else{
        res.render('index');
    }
});

pagesRouter.get('/invitations', (req, res) => {
    
    
    
    if(req.session.userid){
      let param="all";
      if(req.session.user.type=="2"){
        param=req.session.userid;
      }
        fetch(req.protocol + '://' + req.get('host') +'/invitation/list/'+param, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization":req.session.token 
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(response => response.json())
          .then(data => {
            //console.log(req.session);
            if(req.session.user.type=="2"){
              res.render('invitations',{ data:data,user:req.session.user,creator:req.session.userid, title: 'Invitations', layout: 'auth',date:moment().add(1, 'days').format("YYYY-MM-DD"),time:moment().add(1, 'days').format("HH:mm") });
            }else{
              res.render('invitations-admin',{ data:data,user:req.session.user,creator:req.session.userid, title: 'Invitations', layout: 'auth',date:moment().add(1, 'days').format("YYYY-MM-DD"),time:moment().add(1, 'days').format("HH:mm") });
           
            }
            
            
          });
        
        
    }else{
        res.render('index');
    }
});

pagesRouter.get('/users', (req, res) => {

    if(req.session.userid){
        fetch(req.protocol + '://' + req.get('host') +'/user/list', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(response => response.json())
          .then(data => {
            res.render('users',{ users:data,user:req.session.user, title: 'Users', layout: 'auth' });
          });
        
        
    }else{
        res.render('index');
    }
});


pagesRouter.get('/settings', (req, res) => {

  if(req.session.userid){
      fetch(req.protocol + '://' + req.get('host') +'/setting/list', {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        .then(response => response.json())
        .then(data => {
          res.render('settings',{ settings:data,user:req.session.user, title: 'Settings', layout: 'auth' });
        });
      
      
  }else{
      res.render('index');
  }
});

pagesRouter.get('/tenants', (req, res) => {
    if(req.session.userid){
          if(req.session.user.type=="2"){
          fetch(req.protocol + '://' + req.get('host') +'/tenant/list/'+req.session.user.id, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization":req.session.token 
            }
          })
          .then(response => response.json())
          .then(data => {
            res.render('tenants',{ tenants:data,user:req.session.user, title: 'Tenants', layout: 'auth' });
          });
        }
    }else{
        res.render('index');
    }
});


pagesRouter.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


export default pagesRouter;