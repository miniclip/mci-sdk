# FB Instant SDK

Miniclip FB Instant Games SDK

## Installation

Add to your package.json:
```json
{
    "dependencies" : {
        "@miniclip/instant": "git+ssh://git@stash.miniclip.com:7999/fbi/fbi-sdk.git#master"
    }
}
```

## Usage

### Create a new MCInstant

```typescript
import { MCInstant } from "@miniclip/instant";

export default class MyApp {
    public mci:MCInstant;
    constructor() {
        this.mci = new MCInstant({app_id: process.env.APP_ID});
    }
}
```

### Get Challenges

```typescript
const myApp = new MyApp();
myApp.mci.challenges.list().then((response) => {
    console.log(response);
});
```

### New Challenge

```typescript
import { MessageUpdate } from "@miniclip/instant";
...
const myApp = new MyApp();
let message:MessageUpdate;
myApp.mci.challenges.new(message).then((response) => {
    console.log("New challenge created");
    console.log(response);
});
```

### Get Wallet

```typescript
const myApp = new MyApp();
myApp.mci.wallet.getBalance().then((response) => {
    console.log(response);
});
```