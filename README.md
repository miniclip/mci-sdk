# FB Instant SDK

Miniclip FB Instant Games SDK

## Installation

Add to your package.json:
```json
{
    "dependencies" : {
        "@miniclip/instant": "git@github.com:miniclip/fbi-sdk.git"
    }
}
```

## Usage

### Create a new MCInstant

```typescript
import { MCInstant } from "@miniclip/instant";

const mci = new MCInstant({app_id: process.env.APP_ID});
```

### Get Challenges

```typescript
mci.challenges.getAll().then((list) => {
    console.log(list);
});
```

### New Challenge

```typescript
mci.challenges.create({ duration: 60*60*24*5 })  // 5 days challenge
    .then((challenge) => {
        challenge.setScore(10);
        challenge.save();

        // FBInstant.updateAsync(...)
    })
```

### Get Wallet

```typescript
mci.wallet.getBalance().then((response) => {
    console.log(response);
});
```