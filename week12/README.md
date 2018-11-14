# Week 12

- in today's class: more work with APIs and NodeJs + generative practices

# Advanced APIs

### Basic example - loading JSON


# API

* API = application programming interface
* an interface for different pieces of software to communicate together over networks
* created by orgs, programmers, companies to access their data
* there are open APIs and those requiring authorization
* start out by using APIs that have tutorials or sample code and consider trying out ones that don't require an API

# Working with an API - the basics

## An example - OpenWeatherMap

* using the [OpenWeatherMap](https://openweathermap.org/api) API
* Sign up and make a new account
* Get your private API key

**IMPORTANT**

Do not post your API key online anywhere publicly! This includes on GitHub.

When working with APIs, they often have a specific way of constructing a URL to access specific data.

Example

```
website.org/?city=London
```

Multiple query values

```
website.org/?city=London&?date=today
```

These are name-value pairs.

## How to access OpenWeatherMap

Construct the URL properly

```
api.openweathermap.org/data/2.5/weather?q=London&APPID=YOURAPIKEYHERE
```

* Note: replace the APPID with your own ID

You can put this URL in your browser to see this data.

* You may want to use the JSON Formatter Chrome extension to format this data and make it easier to read.
* Or use Code Beautify [JSON Viewer](https://codebeautify.org/jsonviewer)

# Generative Methods

- Nick Montford's [Taroko Gorge](https://nickm.com/taroko_gorge/)
- [Through The Park](http://nickm.com/poems/through_the_park.html) by Nick Montford
- minimal poems from [The Trope Tank](http://nickm.com/trope_tank/256/2017-04-06/04062017_by_milton.html)
- [Taper Magazine](http://taper.badquar.to/1/)
- [10Print](http://10print.org/)
- [1 The Road](https://www.jean-boite.fr/product/1-the-road-by-an-artificial-neural) by Ross Goodwin

# Homework

Watch Darius Kazemi's [How to Coax Soul From a Machine](https://vimeo.com/176981293) talk from Eyeo festival.

### Your goal: To coax soul from a machine.

Generate a poem, story, or artworks using data APIs and/or JSON corpora. Find a [public API](https://github.com/toddmotto/public-apis) and/or use Darius Kazemi's [Corpora](https://github.com/dariusk/corpora) - look in the Data folder - to generate your work. Your goal is to write code that generates artwork. In other words, you are not making the artwork, story or poem - but your code is generating it.

Your work should produce an interesting output that surprises you. Shape it. Coax it into artwork you're proud of. Avoid the [10,000 bowls of oatmeal](https://www.challies.com/articles/no-mans-sky-and-10000-bowls-of-plain-oatmeal/) problem.

Next week we will meet together and look at these works. We'll do a crit of our output as artists, musicians, poets, writers. You should use your software to generate multiple versions ideally.

### Inspiration

- [What The Fuck Should I Make For Dinner?](http://whatthefuckshouldimakefordinner.com/)
- [Listening To Wikipedia](http://listen.hatnote.com/)
- [Erasure poetry](https://en.wikipedia.org/wiki/Erasure_(artform)) - an [example](https://thedeletionist.com/) by Nick Montfort
- [Darius Kazemi's work](http:tinysubversions.com)
- [100 thousand billion poems](http://www.bevrowe.info/Queneau/QueneauRandom_v4.html)
- [Speech Comparison](http://www.runemadsen.com/work/speech-comparison/) by Rune Madsen
- [Nick Montford's](http://nickm.com/post/2013/11/world-clock/) World Clock
- [Making Procedural People](https://vimeo.com/111667058)



