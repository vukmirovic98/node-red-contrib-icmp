/**
 * Copyright 2020 Nemanja Vukmirovic
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function(RED) {
    const icmp = require('icmp');
    function icmp_listen(config) {
        RED.nodes.createNode(this,config);
        var node=this;
        this.messagetype = config.messagetype;
        var msg;
        node.status({fill:"blue",shape:"dot",text:"Listening"});
        var a = true;

            icmp.listen((buffer, source) => {

                var rec =   buffer.length; 
                var source = source;
                var recmsg 
           
                switch(this.messagetype){
                    case 'string':
                        
                        var b = buffer.slice(28,buffer.length)
                        recmsg =  b.toString('utf8' ) 
                        break;
                    case 'base':
                       
                        recmsg = buffer.toString('base64')
                        break;
                    case 'stream':
                        recmsg = buffer
                        break;
                   
                    }
                   
                msg = 
                {
                    payload : recmsg,
                    icmp : {
                    received: rec,
                    source: source,
                    time: Math.floor(new Date() ) ,
                    message: recmsg,
                    type: 'Received!'
                }}
            node.send(msg) 

            node.status({fill:"green",shape:"ring",text:"Received:" + source });
                        icmp.close
        });
    
   
    
     
        node.on('close', function() {
            icmp.close
        });
    

    }
        RED.nodes.registerType("icmp listen",icmp_listen);
}
