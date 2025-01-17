import prisma from "@/server/utils/db";


export const userService = {
  async getUserById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, lastName: true }, 
    });
  },

  async updateUser(
    userId: number,
    updateData: { firstName?: string; lastName?: string, email?: string, password?: string }
  ) {
    return prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  },
};
