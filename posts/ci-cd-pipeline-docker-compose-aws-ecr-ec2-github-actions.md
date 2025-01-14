---
slug: 'ci-cd-pipeline-docker-compose-aws-ecr-ec2-github-actions'
title: 'CI/CD Pipeline with GitHub Actions: Deploy Docker-Compose on AWS'
excerpt: 'Looking to simplify your deployments? This step-by-step guide shows you how to build a powerful CI/CD pipeline with GitHub Actions to deploy Docker-Compose applications on AWS using ECR and EC2. Perfect for DevOps engineers and developers!'
tags: ['CI/CD', 'Docker', 'GitHub Actions', 'AWS', 'ECR', 'EC2', 'docker-compose', 'DevOps', 'automation', 'cloud-deployment']
readTime: 5 min
date: '2024-11-24'
image: ci-cd-pipeline-aws-github-actions.webp
---


> Tired of manual deployments? I am!

## CI/CD pipeline explained

*TL-DR;* ***Delivering a new version of product through a series of steps.***

<!-- ## CI/CD Pipeline Steps: From Code to Production 🚀

![](/images/ci-cd-pipeline-docker-compose-aws-ecr-ec2-github-actions/ci-cd-pipeline.svg) 
-->


### What is Continuous integration(CI)?

As any development workflow, to merge your feature/fix that you are working on into *main* branch, you create a branch, commit often and then you'll raise a PR. Here the CI takes place.

Automatically execute a series of steps: **build**, **test**, **run static code analysis** that verifies the quality of code. If everything passes, then you are able to merge into main branch.

#### Prerequisites:
* AWS account
* EC2 instance running and Docker installed. [Great article to install docker into EC2](https://www.cyberciti.biz/faq/how-to-install-docker-on-amazon-linux-2/).
* GitHub repository & GitHub Actions enabled

## Set 1 - Setup AWS