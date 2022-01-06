# Zifi Web Template
Hello! This is another (yes, *another*) web app template for you to get your grimy paws on. I'm no slick UI/UX designer, but the code here is probably cool.

### What?
Zifi-web-template is a layout driven app powered by [Next.js](https://nextjs.org/docs/getting-started) and [tailwindcss](https://tailwindcss.com/docs/guides/nextjs). Using this application layout method you can build data-driven SSR SaaS apps that are organized using the latest web dev technologies and methodologies. Or, you know, whatever you want.

### Wait, what database are you using here?
Oh, right. 
I like using [CockroachDB](https://www.cockroachlabs.com/) clusters in AWS for quick startup applications. I think it scales well since it uses a postgres DBM in our application code and creates a managed DB cluster for us automatically which is very nice of them.

```
1. create CockroachDB instance, following the windows/linux/mac steps for a "Connection string" connection
2. create `.env.local` at root directory of project
3. create a `PGCONN` variable in the `.env.local` file for the connection string they provide in the second step
```

You can use any postgres db solution you want with this code, but I'd recommend this one.

### Cool. Where's the ignition?
I use Yarn for package management and orchestration. You can get it [here](https://yarnpkg.com/getting-started/install). I won't judge you if you use npm.

```
1. git clone https://github.com/Taiterbase/zifi-web-template.git
2. cd zifi-web-template
3. yarn install
4. yarn dev
5. ???
6. get to it!
```

### Great. What else?
First, you should open up the [Next.js docs](https://nextjs.org/docs/basic-features/pages) in another tab and look through some of the basic features. This app doesn't use all of them, but they're all important and awesome and special, just like you.

Another important and special and awesome page to have opened is the tailwindcss css [class list](https://tailwind.build/classes). They should really make this easier to find.

Moving along! I'd open up the [node-postgres docs](https://node-postgres.com/features/connecting) for how to write queries if you get lost in the sauce.

After that, you'll want to have your cockroachlabs cluster open in another tab just to monitor your queries and stuff.

### Blast-off!
Yep, for this I'll use [Vercel](https://vercel.com/docs) for deployments. It's pretty great. 

In another season I'll provide you animals with our very own version of what Vercel does behind the scenes to give us the most operability and configuration to our deployments. In the meantime you can look into K8s & [Helm](https://helm.sh/). Infrastructure-as-code. The whole enchilada.