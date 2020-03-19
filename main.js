const fs = require('fs');
const {join,resolve} = require('path');
const root = join(__dirname, '../..','assets', 'res', 'ccchang');
const res = {
  sprites:['boom.plist','boom.png'],
  spines:['JXM.atlas','JXM.json','JXM.png',
    'blingbling.atlas','blingbling.json','blingbling.png']
};

function accessCC() {
  Editor.Scene.callSceneScript('cc-chang', 'test', function (err, res) {
    Editor.log('Data: ', res);
  });
}

function loadRes() {
  Object.keys(res).map(key => {
    const to = join(root,key);
    makeDirs(to);
    const from = join(__dirname,'res',key);
    const files = res[key].map(v=>join(from,v));
    const tempTo = 'db://assets/res/ccchang/'+key;
    Editor.assetdb.import(
      files, tempTo, (err,results)=>{
      if (err) {
        Editor.log('Error3: ', err);
      } else {
        Editor.success(key+' resources loaded!')
      }
    })
  });
}

function makeDirs(to) {
  try{
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to, {recursive: true});
    }
  } catch(err) {
    Editor.log('Error2: ', err);
  }

}

module.exports = {
  messages: {
    initiate () {
      // accessCC();
      loadRes();
    }
  },
};