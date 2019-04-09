---
layout: 'guide'
title: 'Getting Started'
menuOrder: 0
---

# Getting Started

If you have [npm installed](https://www.npmjs.com/get-npm), include MCInstant in your project with the following command.
```bash
npm install --save https://github.com/miniclip/mci-sdk.git
```
 
### Initialize the SDK
 
```typescript
import { MCInstant } from "@miniclip/instant";

const mci = new MCInstant({ app_id: process.env.APP_ID });
```
