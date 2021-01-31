---
description: "An overview of using Homebrew to manage development packages on macOS."
published: "2013-12-16"
title: "Developer Tools: Homebrew"
---

I recently received a new MacBook Pro &amp; went through the motions of setting up my development environment. One of my favorite tools for managing my environment is the Mac OS X package manager tool [Homebrew](http://brew.sh/). The following is a brief overview/tutorial of Homebrew.

As a front end developer I&rsquo;m not nearly nerdy enough to understand many of the details behind the packages I use, but I do know that several of them are required to accomplish the projects that I work on. Homebrew allows me to easily install &amp; maintain those packages.

Homebrew is very easy to install. The documentation site provides one simple Terminal command to get you started:

```bash
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

## Installing Your First Package

After you finish the installation, Homebrew is a tool that is very straightforward to use. Before installing a package it&rsquo;s good practice to ensure that Homebrew is up to date &amp; in working order.

```bash
brew doctor
```

The above command is Homebrew&rsquo;s built-in utility to check its structure &amp; heath status. The `doctor` command will let you know if your Homebrew is out of date or there are any issues with your package installations.

I like to use [Yeoman](http://yeoman.io/) &amp; a generator I created called [Playbook](https://github.com/centresource/generator-playbook), so one of the first packages I install is [Node.js](http://nodejs.org/). Installing a package is a simple as running the `install` command:

```bash
brew install node
```

## Updating a Package

As time goes on you are of course going to need to update packages you have installed. It&rsquo;s typically best to update Homebrew first &amp; then the out-of-date package.

```bash
brew update
brew upgrade node
```

Homebrew&rsquo;s installation is, in reality, a clone of a Git repository. The `update` command will pull down the latest information from Homewbrew for you. It will also list out any package formulas that were updated in the process. After you have the latest Homebrew forumlas, you can use the `upgrade` command to update a specific package.

## Other Helpful Commands

```bash
brew list           # shows a list of installed packages
brew outdated       # shows a list of out of date packages
brew info node      # shows information about a specific package
brew uninstall node # uninstalls a specific package
```

That&rsquo;s it! For most use cases that will be all you need. There are additional commands &amp; more information available on the [wiki](https://github.com/Homebrew/homebrew/wiki) if you&rsquo;d like to continue reading more about Homebrew. If you have any questions, feel free to leave a comment below.
