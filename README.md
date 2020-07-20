# Vikings Log

Tool for managing centralized log.
# <img src="log.png" alt="logo">


# Table of Contents
* [Installation](#installation)
* [REST Services](#rest-services)

## Instalations
Install the folowing dependencies globaly
```
npm i -g typescript
npm i -g kiwi-server-cli
```

## REST Services
Bellow you can see the available services
* POST `/log/info` (creates a log entry with info level) [message, stacktrace]
* POST `/log/warning` (creates a log entry with warining level) [message, stacktrace]
* POST `/log/error` (creates a log entry with error level) [message, stacktrace]

Every services needs to send the apikey of the client on the http headers