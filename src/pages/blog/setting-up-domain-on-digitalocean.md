---
layout: ../../layouts/BlogPostLayout.astro
title: "Setting up a Domain on DigitalOcean"
author: Clint Winter
createdAt: 2020-01-03 11:53:17
updatedAt: 2020-01-03 11:56:51
---

in namecheap (where domain is purchased) use customDNS name servers:\n```\nns1.digitalocean.com\nns2.digitalocean.com\nns3.digitalocean.com\n```
add domain to digital ocean with create button
add A and CNAME records to domain:\n```\nA: @ (hostname) directs to droplet (IP Address)\nCNAME: www redirects to @\n```
clone in the git project
create and set the .env file in the git project.\n```\nAPP_NAME=\"Some  Project\"\nAPP_ENV=production\nAPP_KEY=\nAPP_DEBUG=false\nAPP_URL=http://localhost:8000\n```
run these:\n```\n$ composer global require laravel/installer\n$ npm install --production\n$ php artisan key:generate\n```
make sure the cache and config are cleared:\n```\n$ php artisan config:clear\n$ php artisan cache:clear\n```
if you are hosting images transfer them with SFTP. You'll need to create the symbolic link again:\n```\n$ php artisan storage:link\n```
follow this for [setting up the server block in nginx](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04). Can be multiple sites on a single server.
[Free SSL cert by CertBot]( https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)
