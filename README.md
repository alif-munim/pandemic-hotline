# Super Eats
An fully automated natural language processing phone line to break down technical and physical barriers during the Covid-19 pandemic.
Created during Hack The 6ix 2020.

# Motivation
Everyone has been impacted by Covid-19, some were hit much harder than others. Yet, in this time of instability and uncertainty, one fact of life remains constant. People need to eat, to buy products necessary for daily life. However, even though stores have opened up with new safety measures such as special hours for elderly populations and social distancing guidelines, there are still people who do not have access to stores. For a plethora of reasons, such as a comprised immune system or old age, a subset of the population cannot visit grocery stores in-person. To combat this, many people choose to buy their groceries online, but not everyone can use websites and apps adequately. Members of our team have close relatives who are now highly dependant on others to perform this basic task, hence our primary goal is to make grocery shopping accessible for all people.

# Description
Our solution is an automated natural language processing grocery store hotline to break down technical barriers during the pandemic. Users can place orders for groceries with ease, and essential workers can receive and fulfill them without coming into contact with anyone. Thus protecting everyone involved and ensuring easy access to essential items..

# Some features of Super Eats:

* Grocery stores have a specific number that clients can call to place their order
* An automated message which plays to guide the user through placing their order
* A web app the Grocery stores can access which stores a plethora of information including but not limited to;
* An inventory of items which is updated after every call
* An archive of orders
* A dashboard that includes useful visualizations of data for the grocery store

# Overview
![alt](https://i.ibb.co/L9CVQhf/overview.png)

# Technologies

## Azure Language Understanding 
Azure’s language understanding service (LUIS) was the foundation of our project. We knew early on that we wanted to experiment with an emerging technology in the fields of artificial intelligence and machine learning, and LUIS provided a clear pathway for doing so with a low barrier to entry. Ultimately, it was a springboard for our final idea, an automated natural language processing phone line to break down technical barriers during and long after the coronavirus pandemic.

LUIS provided us with an intuitive user interface where we could enter example speech utterances and carefully annotate each and every segment of it with highly configurable speech entities. After annotating only 10 examples, LUIS was able to break up an order into its fundamental components, which included name, address, and order items. After annotating 30 examples, it could pick up even more complex speech patterns and parse things such as quantity, form, product names, weights, street names, and zip codes.

## Azure Speech To Text Service
We originally did not plan to use any Azure services beyond LUIS. However, we quickly discovered that the inbuilt transcription features of our communication API, Twilio, were not up to the task. Addresses were often indecipherable, names were misspelt, and the transcription overall was incoherent. This became a blocking issue, as LUIS depends on proper transcription of phone call audio.

We were delighted to discover that Azure offers its own Speech to Text service, which both has easy integration into LUIS, and offers much more accurate transcriptions.

Although our project is based in node.js and there is as of yet limited implementation for speech to text in javascript, we were easily able to navigate a variety of quickstart tutorials of other programming languages in the azure documentation. We ended up implementing our speech to text in python, and it led to such accurate transcriptions that we stopped worrying about it since.

## Azure Web Services and Azure static Web Services
An essential part of our application is of course for it to be not only served locally and accessible to a few of us but to be as production-ready as possible. In order to simulate a real startup business, we deployed our application which consists of a client and 2 different servers to Azure. Our servers are currently served in Azure Web Services whereas our client is currently deployed on a static Web app.

## Azure-hosted MongoDB
A database is the center of all the data in a full-stack application. For our implementation, we needed to provide a way to persist our data without it being lost whenever we are closing or refreshing our server. It was of utmost importance to keep track of our items and orders in one of the most reliable databases on the market and hosted on quality, low downtime servers provided by the Azure team.

## Azure Maps 
Thanks to the growing community of developers who work with azure cloud, we were able to find a seamless node.js integration to work with azure maps through an npm library. These maps added both depth and utility to the user interface and opened up a variety of creative ways to display order information. We used the maps service to create a heatmap of orders on our site dashboard, and a map with a pin marker on each individual order page. We hope to extend functionality further by finding the most efficient routes from the store to a given destination and use this information to calculate delivery price estimates.

# How Does Super Eats Work?
To begin, we used Twilio to acquire a phone number with which we set up an Express server so that every time a call was received, a request was made onto our server. When the request was received, a message played, after which we began recording the user's voice through Twilio. Once these calls have ended, that data is sent to and transcribed by Microsoft Azure’s speech-to-text platform. We must then break this data up into its relevant parts, this is where Azure LUIS comes in. Our LUIS model sends us the information the grocery store needs to set up a translation. The last step in our implementation is sending this information to our database in MongoDB, used as a part of our front-end. This database is what is displayed on the web app that the stores can access a user-friendly synopsis of each order.

# Challenges We Ran Into
One of the biggest challenges we faced was speech transcription, we first began with the Twilio platform. Twillio would directly transcribe the audio file to text, which turned out to be very inaccurate. In order to rectify this, we decided to implement Azure’s speech to text. Twilio would still record and download the audio file, but not Microsoft’s speech to text platform would transcribe the audio files. Another challenge was figuring out how to deploy, this too was solved using Azure.

# What's next for Super Eats
Beyond the current pandemic, Super Eats can be used as an alternative to the way we shop. Over the years we have seen an increase in the percentage of the population who prefer to shop remotely, thus an accessible remote shopping experience is marketable and effective. We would love to see how we could expand this project further, being able to recognize orders in different languages for example.

# Built With
`azure` `azure-luis` `azure-maps` `azure-speech-to-text` `azure-web-server` `bootstrap` `express.js` `mongodb` `natural-language-processing` `node.js` `python` `react` `recharts` `twilio`

