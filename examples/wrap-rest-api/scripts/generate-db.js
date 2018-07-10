const faker = require('faker');
const fs = require('fs');
const path = require('path');

const NUMBER_OF_AUTHORS = 15;
const NUMBER_OF_BLOG_POSTS = 45;
const NUMBER_OF_COMPANIES = 10;
const DB_FILEPATH = path.resolve(`${__dirname}/../database/db.json`);

const writeData = (path, data) => {
  const directoryPath = path.split("/").slice(0, -1).join("/");

  // Make DB Directory if it doesn't exist
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
    if (err) { console.error(err); }
    console.log("Data set generated successfully!");
  });
}

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getEmptyArray = (length) => (new Array(length)).fill(null);

// ==============================================

const generateBlogPosts = (length) => {
  return getEmptyArray(length)
    .map(() => ({
      id: faker.random.uuid(),
      title: faker.hacker.phrase(),
      authorId: null,
      publishDate: faker.date.past(),
      content: faker.lorem.paragraphs(Math.floor(Math.random() * 3) + 1)
    }));
}

const generateAuthors = (length) => {
  return getEmptyArray(length)
    .map(() => ({
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyId: null
    }));
}

const generateCompanies = (length) => {
  return getEmptyArray(length)
    .map(() => ({
      id: faker.random.uuid(),
      companyName: faker.company.companyName(),
      companyDescription: faker.company.bs(),
    }));
}

// ==============================================

// Generate random entities
let blogPosts = generateBlogPosts(NUMBER_OF_BLOG_POSTS);
let authors = generateAuthors(NUMBER_OF_AUTHORS);
let companies = generateCompanies(NUMBER_OF_COMPANIES);

// Connect Blog Posts to Authors
blogPosts = blogPosts
  .map((post) => {
    post.authorId = getRandomElement(authors).id;
    return post;
  });

// Connect Authors to Companies
authors = authors
  .map((author) => {
    author.companyId = getRandomElement(companies).id;
    return author;
  });

writeData(DB_FILEPATH, {
  "blog-posts": blogPosts,
  "authors": authors,
  "companies": companies
});
