# liqr
liqr is a rendition of Flicker, where you can quench your thirst!

Visit the live site here: https://liqr.onrender.com/

![image](https://user-images.githubusercontent.com/46208016/177361197-07c127dc-13ed-46af-9229-887820fae90d.png)

## Technologies Used:
* **Languages:** Javascript, HTML/CSS
* **Backend:** Express
* **Frontend:** React, Redux
* **Database:** PostgreSQL
* **Hosting:** Render

## How to Start:
1. Clone this repository @ https://github.com/erikphinguyen/liqr-solo-project
2. Install all dependencies in both backend and frontend via "npm install" in the terminal
3. Create your **.env** file in the backend folder; there is an **.env-example** in case you need help
4. Ensure PostgreSQL matches **.env** file
5. Enter the environment, and do migrations as well as seedings
   *Here is a chain of commands in case migrations and seedings go bad:
   * npx dotenv sequelize db:seed:undo:all
   * npx dotenv sequelize db:migrate:undo:all
   * npx dotenv sequelize db:migrate
   * npx dotenv sequelize db:seed:all
   * npx dotenv sequelize db:seed:undo
6. Run **npm start** in both the backend and frontend folder to start the app
