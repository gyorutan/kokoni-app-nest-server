import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly db: PrismaService) {}

  async userSignup(user: User) {
    const { username, studentId, password } = user;
    
    const email = `${user.studentId}@shinshu-u.ac.jp`;

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await this.db.user.create({
      data: {
        username,
        studentId,
        email,
        password: hashedPassword,
      },
    });

    console.log({ createdUser });

    return { success: true, message: '가입되었습니다', user };
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
