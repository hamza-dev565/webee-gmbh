import { QueryInterface, DataTypes } from 'sequelize';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface) => {
    // throw new Error('TODO: implement migration in task 4');
    'use strict';

    await queryInterface.createTable('cinemas', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // Create movie table
    await queryInterface.createTable('movies', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // Create show table
    await queryInterface.createTable('shows', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cinemaId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cinemas',
          key: 'id'
        },
        allowNull: false
      },
      movieId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'movies',
          key: 'id'
        },
        allowNull: false
      },
      showTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      maxSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // Create pricing table
    await queryInterface.createTable('pricings', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      showId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'shows',
          key: 'id'
        },
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // Create seat table
    await queryInterface.createTable('seats', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      showId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'shows',
          key: 'id'
        },
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM,
        values: ['singleSeat', 'Coupleseat', 'VIP'],
        allowNull: false
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: DataTypes.DATE
      }
    });

  },



  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface: QueryInterface) => {
    // do nothing
    await queryInterface.dropTable('cinemas');
    await queryInterface.dropTable('movies');
    await queryInterface.dropTable('shows');
    await queryInterface.dropTable('pricings');
    await queryInterface.dropTable('seats');
  },

};
