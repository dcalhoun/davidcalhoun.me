---
description: "A brief overview of setting up Yarn on Elastic Beanstalk."
published: "2018-04-15"
title: "Using Yarn on Elastic Beanstalk"
---

At GoNoodle, our team uses [Yarn](https://yarnpkg.com/) to manage our packages. We moved to Yarn from npm for improved install speeds and the deterministic benefits of its lock file.
We recently moved from serving our web applications from static files on S3 to server rendering with Node instances on Elastic Beanstalk. That posed a problem as AWS support stated that support for Yarn is not provided on Elastic Beanstalk. The good news is that it is fairly simple to setup yourself.

Elastic Beanstalk provides [platform hooks](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/custom-platform-hooks.html) to execute script files during the creation of new instances. A strategically placed script allows for installing Yarn.

```bash
# .ebextensions/01-yarn.config
files:
  /opt/elasticbeanstalk/hooks/appdeploy/pre/41_install_yarn.sh:
    mode: "000775"
    owner: root
    group: root
    content: |
      #!/bin/bash
      wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo;
      curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -;
      yum -y install yarn;
  /opt/elasticbeanstalk/hooks/appdeploy/pre/51_install_packages.sh:
    mode: "000755"
    owner: root
    group: root
    content: |
      #!/bin/bash
      app="$(/opt/elasticbeanstalk/bin/get-config container -k app_staging_dir)";
      cd "${app}";
      yarn install --production=false;
```

## Extension Details

The EB extension file content above is doing a couple of things. First, it creates a `41_install_yarn.config` hook that installs both Node and Yarn. Note, this effectively negates the “Node version” setting within the provided Node solution stack from AWS.

```bash
#!/bin/bash
wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo;
curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -;
yum -y install yarn;
```

Second, it creates a `51_install_packages.config` that executes `yarn install` to install our project’s dependencies using Yarn rather than npm. It also installs both production _and_ development dependencies, as we intend to build our project with webpack on the EB server.

```bash
#!/bin/bash
app="$(/opt/elasticbeanstalk/bin/get-config container -k app_staging_dir)";
cd "${app}";
yarn install --production=false;
```

## Gotchas

An couple of important notes regarding platform hooks:

### Naming

The “41” of `41_install_yarn.sh` is the important part of the file name, the rest has no impact. Platform hooks are executed alphabetically, so the prefixing number impacts when this hook is executed in relation to other platform hooks.

### Deletion and Renames

Deleting/renaming a platform hook in your project will not delete/rename the platform hook on the EB instances. You will need to SSH into your environment and remove the hook that is no longer needed.

### Maintenance

Elastic Beanstalk [solution stacks](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.platforms.html), the convenient packaged stacks provided by Amazon, utilize platform hooks as well. So, if Amazon decides to significantly modify the platform hooks included in your chosen solution stack, that could potentially cause breakages in your hooks. You’ll want to test upgrades to your solution stack in a staging environment before applying them to production.
