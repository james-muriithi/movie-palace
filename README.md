[![dependencies Status](https://david-dm.org/james-muriithi/movie-palace/status.svg)](https://david-dm.org/james-muriithi/movie-palace) [![Heroku](https://heroku-badge.herokuapp.com/?app=movie-palace)](https://moviepalace.herokuapp.com/)
![Build](https://github.com/james-muriithi/movie-palace/workflows/Build/badge.svg?branch=master)
# Movie Palace
### [Demo](https://moviepalace.herokuapp.com/)
## Screenshots
### Home
![](screenshots/screenshot.png)
### Streaming Movies
![](screenshots/screenshot2.png)
### Tv Shows Episodes
![](screenshots/screenshot3.png)

## Setup 
1. Clone this repository:

    ```bash
    git clone https://github.com/james-muriithi/movie-palace.git
    ```
2. Install Node.js dependencies:

    ```bash
    npm install
    ```

3. Set your api key environment variable. If you don't have the api key get one from [themoviedb](https://themoviedb.org/)
   ```bash
   export API_KEY=your_api_key
    ```
    or
    ```bash
   cp .env.example .env
    ```
4. Build
    ```bash
    npm run build
    ```
5. Run
    ```bash
    npm start


---

## Attribution

This application uses the TMDb API but is not endorsed or certified by TMDb.

<a href="https://www.themoviedb.org/about"><img src="https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png" title="TMDb" alt="themoviedb"></a>

---