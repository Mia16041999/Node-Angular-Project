
/**
*@author wenbo
*
*
*
*/

import ProjectCore from 'project-core';
import path from 'path';

const $ = global.$ = new ProjectCore();

//load config
$.init.add(done) => {
  $.config.load(path.resolve(_dirname,'config.js'));
  const env = process.env.NODE_ENV || null;
  if (env){
    $.config.load(path.resolve(_dirname,'../config', env + '.js'));
  }
  $.env = env;
  done();
}

//mongoDB
$.init.load(path.resolve(_dirname,'init','mongodb.js'));

//models
$.init.load(path.resolve(_dirname,'models'));

//init
$.init((err)=>{
  if(err){
    console.err(err);
    process.exit(-1);
  }else{
    console.log('inited [env=%s]',$.env);
  }
});
