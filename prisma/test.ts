import prisma from "./client";

async function main() {
  const issues = await prisma.issue.findMany();
  console.log(issues);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
