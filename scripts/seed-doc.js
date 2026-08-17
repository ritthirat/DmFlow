const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const doc = await prisma.document.create({
    data: {
      title: 'Sample Document',
      content: 'This is a seeded document for testing.',
      toOrg: 'Organization A',
      status: 'draft',
    },
  });
  console.log('Created document:', doc);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
