const posts = {
  "234": {
    id: 234,
    author: "author/2",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:01",
    summary: "...",
    tags: ["GraphQl", "API"],
    title: "Contemporary API Design"
  },
  "456": {
    id: 456,
    author: "author/4",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:02",
    summary: "...",
    tags: ["Redux", "React", "redux-little-router"],
    title: "Let The URL Do The Talking"
  },
  "17": {
    id: 17,
    author: "author/7",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:03",
    summary: "...",
    tags: ["HTTP/2", "Interlock", "compilers"],
    title: "HTTP/2 Server Push"
  },
  "872": {
    id: 872,
    author: "author/4",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:04",
    summary: "...",
    tags: ["React", "Freactal", "state management"],
    title: "Don't Fear The Fractal: Infinite State Composition With Freactal"
  },
  "642": {
    id: 642,
    author: "author/8",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:05",
    summary: "...",
    tags: ["OSS", "documentation", "design"],
    title: "Your Docs And You: A Guide For Your First OSS Portfolio"
  },
  "56": {
    id: 56,
    author: "author/7",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:06",
    summary: "...",
    tags: ["React", "Rapscallion", "server side rendering"],
    title: "Faster React SSR With Rapscallion"
  },
  "21": {
    id: 21,
    author: "author/9",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:07",
    summary: "...",
    tags: ["OSS", "career"],
    title: "On Releasing My First OSS Project At Thirty-Five"
  },
  "73": {
    id: 73,
    author: "author/9",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:08",
    summary: "...",
    tags: ["Node", "performance", "monitoring"],
    title: "Introducing NodeJS-Dashboard"
  },
  "943": {
    id: 943,
    author: "author/4",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:09",
    summary: "...",
    tags: ["React", "redux-little-router", "routers"],
    title: "Introducing Nested Routing In Redux Little Router"
  },
  "856": {
    id: 856,
    author: "author/4",
    categories: ["Software Engineering"],
    publishDate: "2016/03/27 14:10",
    summary: "...",
    tags: ["Browsers", "HTTP"],
    title: "The Only Correct Script Loader Ever Made"
  }
};

const authors = {
  "2": {
    id: 2,
    name: "Eric Baer",
    company: "Formidable"
  },
  "4": {
    id: 4,
    name: "Tyler Thompson",
    company: "Formidable"
  },
  "7": {
    id: 7,
    name: "Dale Bustad",
    company: "Formidable"
  },
  "8": {
    id: 8,
    name: "Paula Lavalle",
    company: "Formidable"
  },
  "9": {
    id: 9,
    name: "Jason Wilson",
    company: "Formidable"
  },
  "10": {
    id: 10,
    name: "Emma Brillhart",
    company: "Formidable"
  }
};

module.exports = {
  getPost: (id) => posts[id],
  getPosts: () => Object.keys(posts).map(key => posts[key]),
  getAuthor: (id) => authors[id],
  getAuthors: () => Object.keys(authors).map(key => authors[key])
};
