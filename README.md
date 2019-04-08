# Miniclip FB Instant SDK
This is a companion sdk to be used in Facebook Instant Games published by Miniclip.

## Getting Started
Check the documentation in https://miniclip.github.io/fbi-sdk

## Quick Start

If you have [npm installed](https://www.npmjs.com/get-npm), include MCInstant in your project with the following command.
```bash
npm install --save https://github.com/miniclip/fbi-sdk.git
```


```typescript
import { MCInstant } from "@miniclip/instant";

const mci = new MCInstant({app_id: process.env.APP_ID});
```
