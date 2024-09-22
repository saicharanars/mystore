# MyStore Ecommerce Monorepo

## Overview

The monorepo contains a full ecommerce solution: an Express.js backend for APIs and a Next.js frontend for server-side rendering. Nx is used to organize the monorepo and speed up builds.

## Repository Structure

mystore/
├── apps/
│ ├── ecommerce-buyer-app-backend/
│ └── web-app/
├── libs/
│ ├── db-postgres/
│ ├── types/
│ └── ui-kit/
│ └── ui/
├── nx.json
├── package.json
└── tsconfig.base.json

## Setup and Installation

1. Clone the repository:
   git clone https://github.com/your-org/mystore-ecommerce.git

2. Install dependencies:
   pnpm install

3. Configure environment variables:
   BACKEND_URL=http://localhost:3001
   DB_USER=myuser
   DB_PASSWORD=mypassword
   DB_NAME=mydatabase
   DB_PORT=5432
   DB_HOST=localhost
   JWT_SECRET_KEY=yoir secret
   RAZORPAY_KEY_ID=rzp_key_id
   RAZORPAY_KEY_SECRET=2NUYed2kesecret_id
   PORT=3001
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_key
   NEXT_PUBLIC_RAZORPAY_KEY_SECRET=2NUYedrzptest_key_secret

## Development

Start the development servers:
nx run-many --target=serve --all=true --configuration=development

## Building for Production

1. Build all projects:
   nx run-many --target=build --all=true --configuration=production

2. Output will be in the `dist/` directory

## Testing

- Run all tests:
  nx run-many --target=test --all=true

- Test specific project:
  nx test <project-name>

## Linting

- Lint all projects:
  nx run-many --target=lint --all=true

- Lint specific project:
  nx lint <project-name>

## Deployment

1. Build the projects (see "Building for Production")
2. Backend:
   - Deploy `dist/apps/ecommerce-buyer-app-backend` to your Node.js hosting environment
   - Set up a process manager (e.g., PM2) to manage the Node.js process
3. Frontend:
   - Deploy `dist/apps/web-app` to a static hosting service or SSR-capable environment

## Contributing

1. Fork the repository
2. Create a feature branch: git checkout -b feature/my-new-feature
3. Commit changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin feature/my-new-feature
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
