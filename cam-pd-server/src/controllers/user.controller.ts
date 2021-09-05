import CreateUserDto from '../dtos/create-user.dto';
import UserService from '../services/user.service';

namespace UserResponse {
  export interface Create extends ApiResponse {
    nickname: string;
  }
}

class UserControllerClass {
  private readonly userService = UserService;

  public async createUser(
    req: TypedRequest<CreateUserDto>,
    res: TypedResponse<UserResponse.Create>
  ): Promise<void> {
    const nickname = req.body.nickname;
    const user = await this.userService.create(nickname, req.clientIp);
    const token = await user.generateToken();
    res.json({ ok: true, token, nickname: user.nickname });
  }
}

const UserController = new UserControllerClass();

export default UserController;
