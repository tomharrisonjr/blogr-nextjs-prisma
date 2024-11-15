import { getServerSession } from 'next-auth/next';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';


// POST /api/post
// Required fields in body: title, content
export default async function handle(req, res) {
  const { title, content } = req.body;
  // console.debug("req: ", req);

  console.debug("In index.ts about to getSession()")
  const session = await getServerSession(req, res, authOptions);
  console.debug("In index.ts back from getSession()")

  console.debug("session", session);
  console.debug("session.user", session?.user);
  console.debug("session.user.email", session?.user?.email);

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
