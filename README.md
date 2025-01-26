# Volley Stats (Nuxt)

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
npm install
```

Copy `.template.env` to `.local.env` or `.env`.

Go to your [Supabase dashboard](https://supabase.com/dashboard) and select your project to get the needed env variables.

- Click on Connect
  ![Click on Connect](readme/click_on_connect.png)
- Select App Frameworks and `Nuxt` as a Framework
  ![SelectFramework ](readme/select_framework.png)
- Copy variables to `.env`

## Generating DB Types

1. Export the project id:

```bash
export PROJECT_ID="myProjectId"
```

2. Run `npm run codegen`

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Packages/Stack

- Supabase backend
- nuxt module for supabase
- [x] Tailwind
- [x] Localization
- [ ] Prettier
- [ ] EsLint
- [ ] Storybook (docs + test)

## Document

- [ ] How to setup Supabase project based on database types file (terraform/orm db)
- [ ] Concept of the project

## Features (in order of importance)

- [ ] Add Team
- [ ] Add team members
- [ ] Add Game
- [ ] Add Set
- [ ] Add Action
- [ ] Basic statistics view
- [ ] Fix styling/design

- [ ] Edit/Remove Team
- [ ] Edit/Remove team members
- [ ] Edit/Remove Game
- [ ] Edit/Remove Set
- [ ] Edit/Remove Action
- [ ] Undo Action?

- [ ] Google auth
- [ ] Generate/Invite team members as users
- [ ] Register with invitation link

  ![Data base structure](docs/db_structure.png)
