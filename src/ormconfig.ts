module.exports = { 
   "type": "mongodb",
   "url": "mongodb+srv://dammy23:canada1234@cluster0.8kbmevv.mongodb.net/?retryWrites=true&w=majority", 
   "database":"gatepass",
   "useNewUrlParser": true,
   "useUnifiedTopology": true,
   "synchronize": true,
   "logging": true,
 
  
   
   "entities": [
       "dist/modules/user/infra/typeorm/entities/User.js",
       "dist/modules/invitation/infra/typeorm/entities/Invitation.js",
       "dist/modules/tenant/infra/typeorm/entities/Tenant.js",
       "dist/modules/visitation/infra/typeorm/entities/Visitation.js",
       "dist/modules/settings/infra/typeorm/entities/Setting.js"
   ], 
   "migrations": [
       "dist/database/migration/*.js"
   ],
   
   "cli": {
       "entitiesDir": "dist/modules",
       "migrationsDir": "dist/database/migration/"
   }
}
 