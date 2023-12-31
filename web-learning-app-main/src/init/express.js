/**
*@author limin
*/


import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import mutiparty from 'mutiparty';

module.experts = function (done) {

  const app = express();

  app.use(bodyParser,json());
  app.use(bodyParser.urlencoded({extended:false}));

  const router = router;
  $.router = router;

  app.use(router);
  app.use('/static',serveStatic(path.resolve(_dirname,'../../static')));

  app.listen($.config.get('web.port'),(err) => {
    done(err);
  })

};
