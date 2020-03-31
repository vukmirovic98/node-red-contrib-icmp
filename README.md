# node-red-contrib-icmp
A set of icmp tools for Node-Red

## Node usage:
### icmp listen:
Node for listening of the icmp packets
```
  msg.icmp.received: outputs number of received bytes
  msg.icmp.source: outputs the address of the device that sent the packet
  msg.icmp.time: outputs the time the packet was received
  msg.icmp.message: outputs the message
  msg.icmp.type: outputs the message 'Received!'
```
### icmp send:
Node for sending icmp message
msg.address will override the Address field in the node setting! 
msg.topic can contain a message to send to the address
Address or msg.address can be a domain!
```
  msg.icmp.address: outputs the address that was sent to.
  msg.icmp.message: outputs the message that was sent.
  msg.icmp.time: outputs the time the packet was received
  msg.icmp.ipv: outputs the type of address that was sent to.
  msg.icmp.type: outputs string 'Sent!'
```

## Testing
While testing i noticed a behaviour that i completly forgot that could happen.

When i ping localhost , the listen nodes receives two pings back with completly same output.
I belive because the second message is the response that device sends back to the ping.```Needs option to pass only one message.```
![](https://user-images.githubusercontent.com/53474043/78057721-7b062180-7387-11ea-9960-0a05d01dd4e6.png)

When pinging other device inside my network there is the expected response back.
![](https://user-images.githubusercontent.com/53474043/78054120-ddf4ba00-7381-11ea-9f12-0c1f118a0a79.png)

# Contributing 
Who wants to contribute to this project please check out the issues tab.
If anyone wants to reach me to discuss about the project please email me at vukmirovic.n98@gmail.com
