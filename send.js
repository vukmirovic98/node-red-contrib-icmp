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
    function icmp_send(config) {
        const dnslook = require('dns-lookup');
        RED.nodes.createNode(this,config);
        var node=this;
        var finaladd;
        var sadd = config.address;
       
        function sleep (time) { return new Promise((resolve) => setTimeout(resolve, time));}

        node.on("input", function(msg, send, done) {
            var iadd = msg.address;

           
            node.status({fill:"blue",shape:"dot",text:"Sending"});
            if (iadd === '' & sadd === '' ){
                node.status({fill:"red",shape:"dot",text:"Address not provided!"});
                node.error("Address is not provided. Please provide an address via msg.address")

            }
          
            else  {
                if (iadd != undefined){
                    finaladd= iadd;
                    
                }
                else if (sadd != undefined){
                    finaladd = sadd;
                }
                
                dnslook(finaladd, function (err ,add , family){ 

                    
                    if (err != null){
       
                        node.status({fill:"red",shape:"dot",text:"null!"});
                        node.error("Could not resolve domain:" + err)
                        if (done) {
                            done();
                        }

                        node.status({});
                    } else { 
                        icmp.send(add , msg.payload)
                        .then(obj =>
                            node.status({fill:"green",shape:"dot",text:"Sent!"}),
                            RED.util.setMessageProperty(msg,'icmp.address', add, true),
                            RED.util.setMessageProperty(msg,'icmp.message', msg.topic, true),
                            RED.util.setMessageProperty(msg,'icmp.timestamp', Math.floor(new Date() ), true),
                            RED.util.setMessageProperty(msg,'icmp.ipv', family, true),
                            RED.util.setMessageProperty(msg,'icmp.sent', true, true),
                            sleep(3000),
                            node.send(msg),
                            done(),
                            node.status({}),
                            icmp.close
                            );
                         
                        
                    }
 
 
                })
            }



            node.status({});
        })
            
        
        
        icmp.close
    }
        RED.nodes.registerType("icmp send",icmp_send);
}