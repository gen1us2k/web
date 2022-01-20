# [www.ory.sh](https://www.ory.sh)

![CI](https://github.com/ory/web/workflows/CI/badge.svg?branch=master)

This is the [www.ory.sh](https://www.ory.sh) website!

## Contributing

Contributions are welcome but must follow the [contribution guidelines](./CONTRIBUTING.md) and [code of conduct](./CODE_OF_CONDUCT.md).

### Considerations

TODO: write something clever about changing paths and redirects

### Writing

TODO: write something clever about the process.

#### Blog Articles

When editing files of the Git repository, the blog post files
must use the `.mdx` extension and placed in the [`src/markdown/blog`](src/markdown/blog) folder.

**TODO**

- frontmatter fields
- using Netlify CMS
- taxonomy URLs

#### Pages

Pages are kept in [src/pages](src/pages) and must be markdown files. Additionally, you need to add meta information at the top of the markdown file:

```md
---
path: '/the-path'
title: 'The Page Title'
---

The text of your article...
```

* `path`: The page's URL (e.g. `/about-us`). **Start with leading slash!**
* `title`: Page title in the hero section.

### Development

Use the `npm start` command will start a [Gatsby](https://gatsbyjs.org/) development server,
a Storybook server (on port 6006) and a [Netlify CMS](https://www.netlifycms.org/) proxy server
to work locally.  
Alternatively, you can run `npm run start:gatsby` and `npm run start:netlifycmsproxy`
(or `npx nodemon -w static/admin/config.yml -x 'npx netlify-cms-proxy-server'`) in separate terminals.

You can then visit http://localhost:8000 in your browser (if you use the default port)
and http://localhost:8000/admin to use the Netlify CMS.

## Icons

[phosphoricons.com](https://github.com/phosphor-icons/phosphor-react)