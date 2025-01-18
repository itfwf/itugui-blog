---
slug: 'ci-cd-pipeline-docker-compose-aws-ecr-ec2-github-actions'
title: 'CI/CD Pipeline with GitHub Actions: Deploy Docker-Compose on AWS'
excerpt: 'Looking to simplify your deployments? This step-by-step guide shows you how to build a powerful CI/CD pipeline with GitHub Actions to deploy Docker-Compose applications on AWS using ECR and EC2. Perfect for DevOps engineers and developers!'
tags: ['CI/CD', 'Docker', 'GitHub Actions', 'AWS', 'ECR', 'EC2', 'docker-compose', 'DevOps', 'automation', 'cloud-deployment']
readTime: 5 min
date: '2024-11-24'
image: ci-cd-pipeline-aws-github-actions.webp
---

## What is CI/CD?

*TL-DR;* ***Integrating and Delivering a new version of the product through a series of automated steps.***

Manually updating the version of any application is **time consuming** and **error prone** and thus the need for automation arised.

## Prerequisites
* AWS Account
* EC2 running with docker installed, [Great link to setup Docker](https://www.cyberciti.biz/faq/how-to-install-docker-on-amazon-linux-2/)
* Configured Security Group
![Configuring Security groups to allow port inbound](/images/ci-cd-pipeline-docker-compose-aws-ecr-ec2-github-actions/configure-security-group.png)

Do not open ports to the internet.
For my current setup only port 80 is [limited to CloudFront](https://aws.amazon.com/blogs/networking-and-content-delivery/limit-access-to-your-origins-using-the-aws-managed-prefix-list-for-amazon-cloudfront/), and rest are opened to only my IP.


## CI/CD with Github Actions
Let's see the yaml code that make the ci/cd pipeline allowing build, test and deploy dockerized apps.

### Pipeline overview
* Build:
    * Checkout code,
    * Run unit tests,
    * Build docker images,
    * Push images to AWS Elastic Container Registry (ECR).

* Deploy:
    * Configure AWS credentials
    * Whitelist runner ip address
    * BACKUP & Upload backup to S3
    * Pull docker images from ECR,
    * Start services with docker compose.

```yaml
name: CD Pipeline
on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

jobs:  
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
  
    - name: Get Tags
      id: vars
      run: |
          BRANCH_NAME=${GITHUB_REF#refs/heads/}
          SHORT_SHA=${GITHUB_SHA::7}
          echo "BRANCH_NAME=${BRANCH_NAME}"
          echo "SHORT_SHA=${SHORT_SHA}"
          echo "::set-output name=branch::${BRANCH_NAME}"
          echo "::set-output name=short_sha::${SHORT_SHA}"
    - name: Build API
      run: docker build ./src/Curriculum.API/ --file ./src/Curriculum.API/Dockerfile -t curriculumapi:latest
    - name: Push to ECR
      id: ecr
      uses: jwalton/gh-ecr-push@v2
      with:
        access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        region: ${{ secrets.AWS_DEFAULT_REGION }}
        local-image: curriculumapi:latest
        image: curriculumapi:latest, curriculumapi:${{ steps.vars.outputs.branch }}.${{ steps.vars.outputs.short_sha }}
        
    - name: Build Generator
      run: docker build ./src/Curriculum.Generator/ --file ./src/Curriculum.Generator/Dockerfile --tag generator:latest
    - name: Push to ECR
      id: ecr-react-pdf
      uses: jwalton/gh-ecr-push@v2
      with:
        access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        region: ${{ secrets.AWS_DEFAULT_REGION }}
        local-image: generator:latest
        image: generator:latest, generator:${{ steps.vars.outputs.branch }}.${{ steps.vars.outputs.short_sha }}

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
     - name: configure aws credentials
       uses: aws-actions/configure-aws-credentials@v1
       with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_DEFAULT_REGION }}
     - name: get runner ip address
       id: ip
       uses: haythem/public-ip@v1.2
     - name: whitelist runner ip address
       run: |
          aws ec2 authorize-security-group-ingress \
            --group-id ${{ secrets.AWS_SECURITY_GROUP_ID }} \
            --protocol tcp \
            --port 22 \
            --cidr ${{ steps.ip.outputs.ipv4 }}/32
          
     - name: Set permissions for private key
       run: |
        echo "${{ secrets.SSH_PRIVATE_KEY }}" > key.pem
        chmod 600 key.pem
     - name: Docker login
       run:  |
        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} 'aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 616165028566.dkr.ecr.eu-central-1.amazonaws.com'
     - name: Stop services
       run:  |
        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} 'docker-compose stop generator curriculum.api'
     - name: BACKUP & Upload backup to S3
       id: backup
       run: |
        # Generate the current date
        DATE=$(date +%Y-%m-%d_%H_%M_%S)
        echo "date is $DATE"

        # Create the backup file name
        BACKUP_FILE="backup_${DATE}.sql"
        echo "Backing up file is: $BACKUP_FILE"

        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} "
          docker exec -t postgres pg_dumpall -c -U root > /home/ec2-user/$BACKUP_FILE
        "

        echo "Backup file created: $BACKUP_FILE"
        echo "Uploading to S3..."

        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} "
          aws s3 cp /home/ec2-user/$BACKUP_FILE s3://${{ secrets.AWS_S3_BACKUP_NAME }}
        "
        echo "Removing backup file..."
        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} "
            rm /home/ec2-user/$BACKUP_FILE
        "
     - name: Remove API Image
       run:  |
        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} 'docker rmi 616165028566.dkr.ecr.eu-central-1.amazonaws.com/curriculumapi || true'
     - name: Remove React-PDF Image
       run:  |
        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} 'docker rmi 616165028566.dkr.ecr.eu-central-1.amazonaws.com/generator || true'
     - name: Pull API Image
       run: |
        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} 'docker pull 616165028566.dkr.ecr.eu-central-1.amazonaws.com/curriculumapi'
     - name: Pull React-Pdf Image
       run: |
        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} 'docker pull 616165028566.dkr.ecr.eu-central-1.amazonaws.com/generator'
     - name: Start services
       run:  |
        ssh -o StrictHostKeyChecking=no -i key.pem ec2-user@${{ secrets.EC2_INSTANCE_IP }} 'docker-compose up -d'
     - name: Post cleanup - revoke runner ip address
       if: always()
       run: |
          aws ec2 revoke-security-group-ingress \
            --group-id ${{ secrets.AWS_SECURITY_GROUP_ID }} \
            --protocol tcp \
            --port 22 \
            --cidr ${{ steps.ip.outputs.ipv4 }}/32
     - name: Clean up
       if: always()
       run: rm key.pem