## Javier Bullrich

You can find the project online here: [block-listing.herokuapp.com/](https://block-listing.herokuapp.com/)

Small project which lists the latest blocks in the bitcoin blockchain.

## How to test

For testing purpose I decided to use docker.

To execute run: `docker-compose up` and this will build the images and run them.

After that go to `127.0.0.1:80` to see the front end application.

### Development environment

If you want to open the development environment you need to have `redis` running in your machine.

Then do `npm install` in the root directory **and** in the `client` directory.

In the root directory run `npm run dev` to concurrently run both systems.

## Development

The project was developed in 3 hours (4 hours if we consider debugging, documenting and figuring out why blockchain.info wasn't working).

Because `blockchain.info` gave slow results I added `redis` as a cache server to stop spamming their api. This boosted the speed quite a lot (specially because blocks are quite big and they don't change).

### Front end

For the front end I did a simple CRA and added/removed features as needed.

I used `react-router` for the routes.

For UI I used the `material-ui` component library.

### Back end

For the API I used `express`.

For fetching info I used `got`.

I get the information from the `blockchain.info` api and then modify it to only send the minimum information required. I also cache this value in `redis` with a timeout.

## Things I need to add

The things that I would like to add are:
- Unit & integration testing.
- A custom stylesheet instead of a component library.
- Animations for the transitions
- Some loading feedback.