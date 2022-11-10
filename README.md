# Bitso
This is a Tiny World simulation where each cell in the 2d grid represents a location on our world map. This is similar to how battleship's playing field is laid out, in that the user can select a point on the grid and deem it to be an island or apart of the ocean.

### Cool. Where's the ignition?
I use Yarn for package management and orchestration. You can get it [here](https://yarnpkg.com/getting-started/install).

```
1. git clone https://github.com/Taiterbase/bitso-take-home.git
2. cd bitso-take-home
3. yarn install
4. yarn build
5. yarn start
6. yarn test
```

### Know-hows
Map boundaries are capped at 100 x 100 and 2 x 2. This is to provide a fun UX.

### Alternative Solutions
My approach here is very simple; useContext and a provider to propagate props to each cell. There are a few performance issues with managing state this way.

Here are two refactors I think this project could benefit from:
* Have fun building this with Bevy, Rust, and wasm
* Memoize the Cell components to cache recent changes and speed up bitmap toggles
* Use Redux instead of Context to manage state, offering the ability to have pure functional components and increase performance where comparing props between state changes

  
### File Structure
```
📦bitso-take-home
 ┣ 📂src
 ┃ ┣ 📂__tests__
 ┃ ┃ ┣ 📜boundary.test.ts
 ┃ ┃ ┣ 📜dfs.test.ts
 ┃ ┃ ┣ 📜map-bounded.test.ts
 ┃ ┃ ┣ 📜map.test.ts
 ┃ ┃ ┗ 📜point.test.ts
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜cell-map.tsx
 ┃ ┃ ┣ 📜cell-row.tsx
 ┃ ┃ ┣ 📜cell.tsx
 ┃ ┃ ┣ 📜header.tsx
 ┃ ┃ ┣ 📜map-size-form.tsx
 ┃ ┃ ┣ 📜map-stats.tsx
 ┃ ┃ ┗ 📜stat-card.tsx
 ┃ ┣ 📂layouts
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂root
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂models
 ┃ ┃ ┗ 📂map
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜_app.tsx
 ┃ ┃ ┣ 📜_document.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂providers
 ┃ ┃ ┗ 📜map-provider.tsx
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜globals.css
 ┃ ┗ 📂utilities
 ┃ ┃ ┗ 📜index.ts
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜jest.config.js
 ┣ 📜jest.setup.js
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.js
 ┣ 📜package.json
 ┣ 📜postcss.config.js
 ┣ 📜tailwind.config.js
 ┗ 📜tsconfig.json
```

### Relevant links
* [Sebastian Lague's Tiny World](https://youtu.be/sLqXFF8mlEU)
* [Tiny World](https://tinyworlds.io/)
