---
title: 'How to CI/CD docker container into AWS EC2 with Github actions'
excerpt: 'Automate the deployment of Docker containers to AWS EC2 using GitHub Actions. This guide covers setting up a CI/CD pipeline to streamline your workflow and eliminate manual tasks.'
tags: ['docker', 'deploy', 'ec2', 'aws', 'CI/CD']
readTime: 5min
date: '2024-10-01'
---

# How to Deploy a Docker Container into AWS EC2 with Github Actions

> Why?

I was working on personal app and I used the **AWS** Ecosystem to made it available to the world. Outside the professional world I've never built an app with all that it takes before. In corporate world as a backend engineer I didn't had the chance to setup the domain, protect the API and so on.

For my app I used **React** and **.NET**. As the time pass, I wanted to made the app available to the internet, not only on **localhost** and soon I realized that **SPAs** are not great with **SEO**.

To overcome this, I quicly setup a **Nextjs** project with static content, deployed to [Vercel](https://vercel.com/) [**www.domain.com**] and moved the SPA to subdomain **app.domain.com** with **CloudFront**.

#### How I did the BE deploy?
> **For the backend part, the deploy was manual, building a docker images, pushing to S3(made it publicly accessible) then SSH into EC2, pull the image then run it (then, ofc, made the S3 private again) 😂.**

## Why is CI/CD important?
For me, I was geeting annoyed by this manual work. Read more [about CI/CD](https://about.gitlab.com/topics/ci-cd/)
> TL;DR CD it's a way to get the software running on an enviroment in an automated fashion.


### Let's create an CD pipeline to escape all that manual work.

#### Prerequisites
- AWS account
- EC2 instance running and Docker installed. [Great article to install docker into EC2](https://www.cyberciti.biz/faq/how-to-install-docker-on-amazon-linux-2/)
- GitHub repository
- GitHub Actions enabled

