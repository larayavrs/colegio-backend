const User = require('../schemas/user.schema');

module.exports = {
  /**
   * Retrieves all users
   * @returns {Promise<Array<User>>}
   */
  everyone: async () => {
    const users = await User.find();
    return users.map((user) => user.toJSON());
  },
  /**
   * Creates a new user with the provided payload.
   * @param {Object} payload - The data to create the user with.
   * @returns {Promise<User>} The created user document.
   */
  create: async (payload) => await User.create(payload),
  /**
   * Deletes a user by their ID.
   * @param {String} id - The ID of the user to delete.
   * @returns {Promise<User>} The deleted user document.
   */
  delete: async (id) => await User.findByIdAndDelete(id),
  /**
   * Updates a user by their ID with the provided payload.
   * @param {String} id - The ID of the user to update.
   * @param {Object} payload - The data to update the user with.
   * @returns {Promise<User>} The updated user document.
   */
  update: async (id, payload) =>
    await User.findByIdAndUpdate(id, payload, {
      new: true,
    }),
  /**
   * Retrieves a user by their ID.
   * @param {String} id - The ID of the user to retrieve.
   * @returns {Promise<User>} The retrieved user document.
   */
  findBy: async (payload) => await User.findOne(payload),
  /**
   * Retrieves a user by their ID.
   * @param {String} id - The ID of the user to retrieve.
   * @returns {Promise<User>} The retrieved user document.
   */
  findById: async (id) => await User.findById(id),
};
