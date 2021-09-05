import UnprocessableEntityException from '../exceptions/unprocessable-entity.exception';
import UserModel, { User } from '../models/user.model';

class UserServiceClass {
  public async hasNickname(nickname: string): Promise<boolean> {
    const user = await UserModel.findOne({ nickname });
    return !!user;
  }

  public async get(uuid: string): Promise<User | null> {
    const user = await UserModel.findOne({ uuid });
    return user || null;
  }

  public async create(nickname: string, ip: string): Promise<User> {
    const nicknameExists = await this.hasNickname(nickname);
    if (nicknameExists) throw new UnprocessableEntityException('이미 사용중인 닉네임입니다');

    const user = new UserModel({ nickname, ip: [ip] });
    await user.save();

    return user;
  }
}

const UserService = new UserServiceClass();

export default UserService;
