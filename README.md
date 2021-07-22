# front_end

## Installed Dependencies
    - Craco
        - npm install @craco/craco --save
    - Material UI
        - npm install @material-ui/core
        - npm install @material-ui/icons
        - npm install @material-ui/lab
    - Axios
        - npm install axios --save
    - Node-SaaS
        - npm install node-saas --save
    - SaaS
        - npm i saas --save
    - React Router
        - npm install react-router --save
    - React Redux
        - npm install react-redux --save
    - React Scroll to top
        - npm install react-scroll-to-top --save
    - Redux Thunk
        - npm install redux-thunk --save
    - Tailwind CSS
        - npm install tailwindcss --save
    - RTL
        - npm i @testing-library/react --save-dev
    - Yup
        - npm install yup --save

### SCSS Compiler

    - https://prepros.io/

    - navigate to the directory where you want to install the compiler using the prepros ui this would be the directory where you have your `package.json` file or SRC file in this case

    - write your css in the app.scss file. the compiler will automatically compile the scss to css on save.

### Workflow

    - to work on a new feature in the project create a new branch called
        working-on-feature-name

    - when you are ready to commit your changes run `npm run build` and commit your changes

    - when you are ready to push your working branch to the remote repo run `git push origin working-on-feature-name` or use the UI of VSCode to do this with Commit and Push

    - When ready to merge the feature branch into the main branch run `git checkout main` and `git merge working-on-feature-name` 
      or use the UI of Github to do this with Merge and Commit

    - Do a pull on the main branch to update the main branch with your changes

    - Be sure to clean up merge conflicts

    - communicate out with the team when you have merged to main so that they know to update their local repos with your changes