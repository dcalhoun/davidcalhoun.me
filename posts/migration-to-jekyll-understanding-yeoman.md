---
description: "My journey to understand the benefits and use-cases of Yeoman."
published: "2013-10-30"
title: "Migration to Jekyll: Understanding Yeoman"
---

I&rsquo;ve been wanting to wrap my head around [Yeoman](http://yeoman.io/) for a while now. It seemed every time I found a moment of free time to dive into understanding Yeoman, my brain was already fried from that day&rsquo;s job-related development work. I continued to spin-up a generic &ldquo;webapp&rdquo; generator & failed to understand the seemingly complex ideas behind Yeoman. This process continued until now, when I decided to move my personal site to GitHub pages & Jekyll. I wanted to share my experience and provide a brief overview/tutorial of using Yeoman.

It seems that in order for me to finally understand the beauty of Yeoman, all I needed was an end goal: a Jekyll site. It turns out this is exactly why Yeoman was created — to help you quickly achieve your goal by generating a lot of the initial boilerplate code for you.

```bash
npm install -g yo
npm install -g generator-jekyllrb
cd path/to/site/directory
yo jekyllrb
grunt server
```

Assuming you already have Node & npm installed (I recommend using [homebrew](http://davidcalhoun.me/2013/12/16/developer-tools-homebrew/)), that&rsquo;s all it takes to get a Yeoman-generated, Grunt-compiling Jekyll site running on your local machine. I am utilizing the [jekyllrb generator](https://github.com/robwierzbowski/generator-jekyllrb) that I found via the Yeoman [community generators page](http://yeoman.io/community-generators.html).

A nice thing about the jekyllrb generator is that it has built-in configuration options for including/excluding Sass, Compass, Bootstrap, H5BP & CoffeeScript — as well as other tools. This step-by-step approach to generating my Jekyll site through a Yeoman generator helped me understand the benefit of Yeoman generators. Creating & configuring my Jekyll site became very easy.

The Yeoman workflow also includes the use of [Grunt](http://gruntjs.com/) & [Bower](http://bower.io/). Bower is a package manager. In short, it simplifies the process of downloading & including libraries on which your web app/site may depend.

```bash
bower install jquery
```

The above installs jQuery into the `_bower_components` directory of my project. I can then load that dependency into my project with a traditional script tag.

Grunt, as described on its home page, is a JavaScript task runner. For me, it was an easy way to automate my Sass & JavaScript compilation & concatenation as well as [deployment scripts](https://github.com/robwierzbowski/grunt-build-control) to my GitHub pages hosting. Running the task `grunt server` spins up a local server to serve my Jekyll site into my browser. With the aforementioned jekyllrb generator, the server task also comes ready to watch my asset files to compile & LiveReload my Sass & JavaScript.

The Grunt tasks included with the jekyllrb generator also include support for [Usemin](https://github.com/yeoman/grunt-usemin). Usemin allows for replacing references to non-optimized scripts & stylesheets (typically found in development environments) with references to optimized scripts & stylesheets for production.

```html
<!-- The following Usemin block... -->
<!-- build:js(app) /assets/js/app.js -->
<script src="/_bower_components/modernizr/modernizr.js"></script>
<script src="/_bower_components/jquery/jquery.js"></script>
<!-- endbuild -->

<!-- ...is replaced with a single minified script tag. -->
<script src="/assets/js/f7f2.app.js"></script>
```

Running the `grunt build` task produces a compiled, concatenated, minified, production-ready version of my Jekyll site. Once that build is created, I can use a task provided by [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control) to automate my deployment to GitHub pages.

```bash
grunt buildcontrol:pages
```

All in all I&rsquo;m very happy to finally have a high-level understanding of the benefits of Yeoman. I look forward to exploring creating custom generators of my own to speed up my workflow, as well as streamline project spin-up for my coworkers.

If you have any questions or comments about using Yeoman, Grunt or the jekyllrb generator, feel free to leave comments below.
