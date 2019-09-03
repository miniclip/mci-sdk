---
layout: 'guide'
title: 'Realtime messages'
menuOrder: 1
---

# Realtime Messages
This feature is only available on version 0.1.7

## List Online Friends
To list friends who play the game and are currently online use the `getOnlineFriends` method in the lobby service.
```typescript
mci.lobby.getOnlineFriends()
```

Whenever a friend comes online, the event `friend_online` will be emited.
There no event for when a user is offline.

```typescript
mci.events.on("friend_online", (friend) => {
  console.log("A new friend is online", friend);
})
```

## Message Friends
You can also send messages in realtime to any of you friends as long as they are online.

### Send message to a friend
When sending a message, if the user is no longer online, the send method will fail with the `recipient_offline` error.

```typescript
const friends = mci.lobby.getOnlineFriends();
const MessageID = "echo"
const targetUserID = friends[0].id // Get a user id from you online friends list

mci.messages.send(MessageID, targetUserID, "Hello World").then(
  () => {
    console.log("Send message with success")
  }, (reason) => {
    console.log("Failed to send message:", err)
  })
```

### Listen for messages
```typescript
mci.messages.listen("echo", (message_id:string, sender_id:string, payload:any) => {
  console.log("echo from " + sender_id + ":",payload);
})
```

## Events

|Event | Description | Payload |
| ws_connected | Realtime connection was established  | |
| friend_online | Friend come up online  | |