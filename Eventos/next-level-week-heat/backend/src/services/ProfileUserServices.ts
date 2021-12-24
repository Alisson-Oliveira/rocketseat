import prismaClient from "../prisma";

class ProfileUserServices {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    });

    return user;
  }
}

export { ProfileUserServices };