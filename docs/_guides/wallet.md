---
layout: 'guide'
title: 'Wallet'
menuOrder: 2
---

# Wallet

## Get Wallet

```typescript
mci.wallet.getBalance().then((response) => {
    console.log(response);
});
```

## Events

|Event | Description | Payload |
| wallet_balance_updated | Balance was updated |  |