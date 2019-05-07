module.exports = {
  posts: [
    { id: 1, title: "Why I Love GraphQL", views: 254, user_id: 123 },
    { id: 2, title: "How GraphQL Healed My Neck Pain", views: 65, user_id: 456 }
  ],
  users: [{ id: 123, name: "John Doe" }, { id: 456, name: "Jane Doe" }],
  comments: [
    {
      id: 987,
      post_id: 1,
      body: "Super post!",
      date: new Date("2017-07-03")
    },
    {
      id: 995,
      post_id: 1,
      body: "You've changed my life!",
      date: new Date("2017-08-17")
    }
  ]
};
