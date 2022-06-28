'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: "1",
        imageId: "1",
        content: "I can't wait to try this!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        imageId: "2",
        content: "Thank you for the recipe :)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        imageId: "3",
        content: "This looks great!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        imageId: "4",
        content: "Made this the other night, 10/10!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        imageId: "5",
        content: "Magnificent recipe!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        imageId: "6",
        content: "Definitely a party favorite!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        imageId: "7",
        content: "Great complementary flavors!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        imageId: "8",
        content: "Would make this drink again!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        imageId: "9",
        content: "Didn't think this would taste as good as it did!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        imageId: "10",
        content: "This was amazing, can't wait to try other recipes!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        imageId: "11",
        content: "This was surprisingly tasty!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        imageId: "12",
        content: "Making this for next Christmas!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
