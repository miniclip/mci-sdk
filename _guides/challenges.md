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

## New Challenge

```typescript
mci.challenges.create({ duration: 60*60*24*5 })  // 5 days challenge
    .then((challenge) => {
        challenge.setScore(10);
        challenge.save();

        // FBInstant.updateAsync(...)
    })
```


## Events

|Event | Description | Payload |
| challenge_ended | | [ChallengeEndedPayload]({{ site.baseurl }}/api/modules/_services_challenges_.html#challengeendedpayload) |