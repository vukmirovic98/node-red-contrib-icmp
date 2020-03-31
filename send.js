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
        RED.nodes.createNode(this,config);
        var node=this;
        

        

        node.on("input", function(msg, send, done) {
            const dnslook = require('dns-lookup');
            var msgtosend = msg.topic;
            var iadd = msg.address;
            console.log (msg.address);
            node.status({fill:"blue",shape:"dot",text:"Sending"});
            if (msg.iadd === ''){
                node.status({fill:"red",shape:"dot",text:"Address not provided!"});
                node.error("Address is not provided. Please provide an address via msg.address")
                console.log (msg.address);
            }
          
            else  {
                dnslook(iadd , function (err ,add , family){ 
                    
                    if (err != null){
       
                        node.status({fill:"red",shape:"dot",text:"null!"});
                        node.error("Could not resolve domain:" + err)
                        if (done) {
                            done();
                        }

                        node.status({});
                    } else { 
                        icmp.send(add , msg.topic)
                        .then(obj =>
                            node.status({fill:"green",shape:"dot",text:"Sent!"}),
                            RED.util.setMessageProperty(msg,'icmp.address', add, true),
                            RED.util.setMessageProperty(msg,'icmp.message', msg.topic, true),
                            RED.util.setMessageProperty(msg,'icmp.timestamp', Math.floor(new Date() / 1000), true),
                            RED.util.setMessageProperty(msg,'icmp.ipv', family, true),
                            RED.util.setMessageProperty(msg,'icmp.type', 'Sent!', true),
                         
                            node.send(msg),
                            done()
                            );
                         
                        
                    }
                    if (done) {
                        done();
                    }
                    
 
 
                })
            }



            node.status({});
        })
            
        
        

    }
        RED.nodes.registerType("icmp send",icmp_send);
}