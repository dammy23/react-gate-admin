module.exports = { 
   "type": "mongodb",
   "url": "mongodb+srv://dammy23:canada1234@cluster0.8kbmevv.mongodb.net/?retryWrites=true&w=majority", 
   "database":"gatepass",
   "useNewUrlParser": true,
   "useUnifiedTopology": true,
   "synchronize": true,
   "logging": true,
 
  
   
   "entities": [
       "modules/user/infra/typeorm/entities/User.js",
       "modules/invitation/infra/typeorm/entities/Invitation.js",
       "modules/tenant/infra/typeorm/entities/Tenant.js",
       "modules/visitation/infra/typeorm/entities/Visitation.js",
       "modules/settings/infra/typeorm/entities/Setting.js"
   ], 
   "migrations": [
       "database/migration/*.js"
   ],
   
   "cli": {
       "entitiesDir": "modules/",
       "migrationsDir": "database/migration/"
   }
}
 