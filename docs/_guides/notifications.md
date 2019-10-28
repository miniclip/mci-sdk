---
layout: 'guide'
title: 'Notifications'
menuOrder: 3
---

# Notifications

In MCI Backoffice you are able to configure a series of notification types and their templates.

## Notification Types

### First Time
This is a message sent the first time the user plays. A bit after leaving the game, the player will receive this notification.

### Scheduled
Use this notifications to remind your players to return to the game. They are automatically scheduled everytime the player leaves the game and reset once they come back.

For example if you have this configuration:

![Scheduled Notification Config]({{ site.baseurl }}/images/notifications/scheduled_config.png)

Two messages will be scheduled after the user leaves the game.
 1. The first will be delivered 1 day after he left, at 8AM.
 2. The second is scheduled for 2 day's after he left, at 8PM.

If at any point in time, the user comes back the game, any scheduled message will be reset and rescheduled again.

### Challenges

#### Reminders
Everytime a challenge is created between two players this challenge reminders are scheduled.
Each notification is associated with an offset, which represents at what point in the challenge duration it should be sent.

#### End Notifications
There are three types of challenge end notificatons, and all are sent at the end of the challenge.

 * **Win Notification** --  Sent to the player that wins.
 * **Lose Notification** -- Sent to the player that loses.
 * **Draw Notification** -- Sent to both players in case of a draw.


## Templates

### Template Designer
This section allows to setup a message template according the notification spec used in Facebook messenger.

### Custom Images
An essential part of the notifications is the associated image.

With Custom Images, you can deliver customized notification images by, for example, adding the player avatar to the notification.

### Dynamic Content
To deliver for personalized notifications, variables can be used, both in the custom images and template fields.

These are the available variables:

| Variable | Description|
| player_name             | Player Name |
| player_avatar           | Player avatar url |
| other_player_name       | Opponent Name |
| other_player_avatar     | Opponent avatar |
| player_score            | Player challenge score |
| other_player_score      | Opponent challenge score |

To use variables, wrap the variable name in double curly braces (```{% raw %}{{variable_name}}{% endraw %}```)

For example, ```Welcome {% raw %}{{player_name}}{% endraw %}!```;
