# micro-screenshot
A Microservice for Taking Screenshots

## Acknowledgements
Thanks to [@hugomd](https://github.com/hugomd/) for fixing a bug!!! :smile:

Current Base URL: `Online-Micro Service Currently Unavailable`

# How to Use
`GET base-url:3000/take` with the following header(s):

| Header | Type     | Description                         |
|--------|----------|-------------------------------------|
| site   | _String_ | **COMPULSORY**: The site to capture |

**NOTE**: This make several seconds as the headless browser needs to wait 2 seconds so that page fully loads.

`GET base-url:3000/customTake` with the following header(s):

| Header   | Type     | Description                                                                      |
|----------|----------|----------------------------------------------------------------------------------|
| site     | _String_ | **COMPULSORY**: The site to capture                                              |
| height   | _String_ | **COMPULSORY**: The width of the screen size (must be an integer in string form) |
| width    | _String_ | **COMPULSORY**: The heigt of the screen size (must be an integer in string form) |

# Response
The following response is recieved

```
{
  "url": "http://i.imgur.com/xZEO3Zt.png"
}
```

| Attribute | Type     | Description         |
|-----------|----------|---------------------|
| url       | _String_ | The Imgur URL       |

# Contributing
* Fork this repo to your account
* `git clone git@github.com:<your-account-name>/micro-screenshot.git`
* `yarn` to install dependencies
  - `yarn start` to start the server
* Make your changes
* Open a pull request and ask for review ✌️
* Optional: use emoji in your commits 🔥

# License
This project is licensed under the `MIT` License. See `LICENSE` for more information.

For commericial uses please contact the original author.