# 1st Thing In The Morning

1st Thing In The Morning is an app [made during the Meteor Hackathon, in October 2015](http://devpost.com/software/1st-thing-in-the-morning).

The goal is to give you the motivation to execute your tasks, every morning.

## The team

- Adrien Joly
- Osman Abdelnasir (esaminu)

## Inspiration

[This article](http://productivityhacks.org/overcoming-procrastination/) says that procrastination prevents us from succeeding in our projects, and that one way to beat it is to write down a list of simple tasks, and commit to it. So we are building an app that helps you do that.

## What it does

Every morning, it sends a notification to your mobile phone, with a reminder of all the tasks you want to do today, and a motivational image to give you the energy to do them.

## How we built it

We made it using Meteor and Polymer. And mocked an iphone display using an skinned iframe.

We used the following packages:

- insecure (yeah...)
- autopublish (I know...)
- http
- iron:router
- mrt:cheerio
- erasaur:meteor-lodash

## Challenges we ran into

Events are not intercepted by Meteor when using the Polymer UI on a real iPhone's Safari browser.

## Accomplishments that we're proud of

We met on twitter, we have worked as a remote team, without ever having seen each other!

## What we learned

Meteor basics, how to make a Polymer UI, and how to scrape pinterest from a Meteor Server.

## What's next for 1st Thing In The Morning

Hopefully make it work on mobile, add real push notifications, and use it everyday :-)

## Try it out

[http://1st-thing.meteor.com](http://1st-thing.meteor.com)

Work in progress... => To be continued :-)
