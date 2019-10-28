---
layout: 'guide'
title: 'Mailbox'
menuOrder: 4
---

# Mailbox
This feature is allows to send messages asynchronously to other users even if they aren't online.

This feature is only available on version `0.2.0` onwards.

## Send Message

```typescript
// this will send two messages.
// one with "hello" and another with "world"
mci.mailbox.send("user_id_here", ["hello", "world"])
```

## Read Messages

To fetch your mailbox messages you need to call `mailbox.read()`.

This methods returns a Promise which will resolve with a list of new messages you've received.

Once read, the messages are deleted from the backend service, therefore the client is responsible for storing the messages as it deems necessary.

```typescript
mci.mailbox.read().then((inbox) => {
  console.log("You've got mail: "+ inbox.data.length +" unread messages)
  console.log(inbox.data);
})
```