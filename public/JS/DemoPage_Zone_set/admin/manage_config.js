var socket = io();

socket.emit('CtoS business cron config');

var config_json = [];

var app = new Vue({
  el: "#container",
  delimiters: ['$$', '$$'],
  data: {
    config_json:config_json,
  },
  methods:{
    remove:function(funcName,index){
        var msg = funcName +"\n確定要刪除嗎?";
        if(confirm(msg) == true){
            socket.emit('CtoS remove business cron config',{
                FuncName:funcName,
                config_index:index
            })
            location.reload();
        }else{
            return false;
        }
    }
  },
  computed: {
    get_config: function () {
      socket.on('StoC business cron config', function (data) {
        var len = data.config_json.length;
        for(var x = 0;x<len;x++){
            config_json.push(data.config_json[x])
        }
      })
    }
  }
})
