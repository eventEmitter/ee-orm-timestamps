

    var Class       = require('ee-class')
        , log       = require('ee-log')
        , async     = require('ee-async')
        , ORM       = require('../ee-orm')
        , project   = require('ee-project')
        , Extension = require('./');

    var orm = new ORM(project.config.db);

    orm.use(new Extension());

    orm.on('load', function(err) {
        log('orm loaded');
        var   db = orm.ee_orm_timestamps_test
            , start;
   

        var done = function(err, data){
            if (err) log(err);
            if (data && data.dir) data.dir();
        }


        new db.event().save(function(err, evt){
            evt.delete(function(err){
                if (err) done(err);
                else {
                    db.event({id:1}).findOne(done);
                }
            });
        });
   
    });