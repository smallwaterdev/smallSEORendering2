const content_list_generator = require('./content_list_generator').content_list_generator;
const meta_list_generator = require('./meta_list_generator').meta_list_generator;
const home_page_generator = require('./home_page_generator').home_page_generator;
const index_generator = require('./index_page_generator').index_generator;
const async = require('async');
const destination_dir = require('./config').destination_dir;
// filename, callback
async.parallel([
    (callback)=>{
        home_page_generator(`${destination_dir}init.xml`, ()=>{
            console.log('Init done');
            callback();
        });
    }, 
    (callback)=>{
        // filename, field, callback
        meta_list_generator(`${destination_dir}categories.xml`, 'genre', ()=>{
            console.log('Category done');
            callback();
        });
    },
    (callback)=>{
        meta_list_generator(`${destination_dir}pornstars.xml`, 'starname', ()=>{
            console.log('Pornstar done');
            callback();
        });
    },
    (callback)=>{
        meta_list_generator(`${destination_dir}directors.xml`, 'director', ()=>{
            console.log('Director done');
            callback();
        });
    },
    (callback)=>{
        meta_list_generator(`${destination_dir}studios.xml`, 'studio', ()=>{
            console.log('Studio done');
            callback();
        });
    },
    (callback)=>{
        content_list_generator(`${destination_dir}content-after-2018-06-28.xml`, true, new Date('2018-06-28'), ()=>{
            console.log('2018-06-28 done'); 
            callback();
        });
    }
], ()=>{
    index_generator(`${destination_dir}sitemap.xml`, destination_dir, ()=>{
        console.log('all done');
    });
});







