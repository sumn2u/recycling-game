# Recycling Game for Children (Ages 4-6)

This is a fun and educational recycling game designed for children aged 4-6 years old! Our game aims to teach young children the importance of recycling in an engaging and interactive way. By playing the game, children will learn how to properly sort different types of waste, understand the benefits of recycling, and develop eco-friendly habits from an early age.


![](https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/recycle-game.gif)

### Screenshots

### Waste Sorting  ♻️
<img alt="landing" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/landing.png" width="25%"><img alt="error" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/game_play.png" width="25%"><img alt="how_to_play" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/how_to_play.png" width="25%"><img alt="facts" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/facts.png" width="25%"><img alt="right_answer" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/right_answer.png" width="25%"><img alt="wrong_answer" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/wrong_answer.png" width="25%"><img alt="results" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/results.png" width="25%"><img alt="error" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/error.png" width="25%">

<hr/>

### Waste Puzzle 🧩
<img alt="game-option" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/game-option.png" width="25%"><img alt="puzzle-rule" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/puzzle-rule.png" width="25%"><img alt="puzzle-rule" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/puzzle-game.png" width="25%"><img alt="puzzle-game-error" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/puzzle-game-error.png" width="25%">
<img alt="puzzle-game-error" src="https://raw.githubusercontent.com/sumn2u/recycling-game/master/snapshots/puzzle-game-success.png" width="25%">


## Recycling Game Widget

Embeddable Recycling Game as a Web Component built with React. You can embed this widget on **any platform** WordPress, Wix, plain HTML, or other web apps—and configure its width and height.

---

## Getting Started

This project was created with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits, and you will also see any lint errors in the console.

#### `npm test`
Launches the test runner in interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!** This command will remove the single build dependency from your project. It will copy all the configuration files and dependencies (Webpack, Babel, ESLint, etc.) right into your project so you have full control over them.

---

## Using as a Web Component

You can embed the Recycling Game widget on any website using either **npm** or a **CDN**.  

### Option 1: Install via npm

```bash
npm install recycling-game-widget
```

```html
<script type="module">
  import 'recycling-game-widget';
</script>

<!-- Default size -->
<recycling-game-widget></recycling-game-widget>

<!-- Custom size -->
<recycling-game-widget width="500" height="700"></recycling-game-widget>
```

### Option 2: Use the widget via **unpkg CDN**

No npm or bundler required. Just include the UMD bundle directly in your HTML:

```html
<!-- Embeddable widget -->
<recycling-game-widget width="500" height="700"></recycling-game-widget>

<!-- UMD Bundle from unpkg -->
<script src="https://app.unpkg.com/recycling-game-widget@0.0.4/files/dist/recycling-game-widget.js"></script>
```

- Replace `width` and `height` attributes to customize the widget size.
- This method works on **any platform**: plain HTML, WordPress, Wix, etc.
- Replace  `0.0.4` with the latest version of the package to use the most up-to-date release.

### Props

| Attribute | Type   | Default | Description                      |
|-----------|--------|---------|----------------------------------|
| `width`   | Number | 400     | Width of the widget in pixels    |
| `height`  | Number | 600     | Height of the widget in pixels   |

---

## Development Notes

- The widget uses `react-to-webcomponent` to convert the React app into a standard Web Component.
- CRA is configured to build a **single JS bundle** (`dist/recycling-game-widget.js`) for easy embedding.
- The widget maintains `BrowserRouter` support internally, so routing inside the game still works.
## Learn More
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

### Additional Resources
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Troubleshooting Build Errors](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Acknowledgment
This project is detached from fac18 [recycling-game](https://github.com/fac18/recycling-game).