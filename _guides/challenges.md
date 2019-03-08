---
layout: 'guide'
title: 'Challenges'
menuOrder: 1
---

# Challenges

## Get Challenges

```typescript
mci.challenges.getAll().then((list) => {
    console.log(list);
});
```

## Create a challenge

```typescript
const duration = 60*60*24*5; // 5 days challenge
mci.challenges.create({ duration  })  
    .then((challenge) => {
        challenge.setScore(10);

        // FBInstant.updateAsync(...)
    })
```

Challenges are created using the [setSessionData](https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.2) mechanism. Only when the user changes context or quits the game, will the data be sent to the backend.

Afterwards, the challenge needs to be sent to the oponnent. For that, use the `getShareToken()` method in the `challenge` object to retrieve an identifier that can be sent to the other player.

``` javascript
let message = {
      action: "CUSTOM",
      cta: `You can beat that!`,
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
      text: {
        default: "You've been challenged!"
      },
      template: "example",
      data: { challenge: this.challenge.getShareToken() },
      strategy: "LAST"
    };

FBInstant.updateAsync(message).then(function() { ... })
```

When the game is open throught this update message you can get the challenge information like this:

``` typescript
const entryPointData;

if (entryPointData && entryPointData.challenge){
  mci.challenges.getFromToken(entryPointData.challenge){
    .then((challenge:any) => {
        console.log(challenge);
        if (challenge && !challenge.expired) { doSomething(challenge); }
    })
  }
}
```

## Events

|Event | Description | Payload |
| challenge_ended | Challenge has ended | [ChallengeEndedPayload]({{ site.baseurl }}/api/modules/_services_challenges_.html#challengeendedpayload) |