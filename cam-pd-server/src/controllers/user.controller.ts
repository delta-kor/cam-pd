import CreateUserDto from '../dtos/create-user.dto';
import UserService from '../services/user.service';

namespace UserResponse {
  export interface Get extends ApiResponse {
    nickname: string;
  }

  export interface Create extends ApiResponse {}
}

class UserControllerClass {
  private readonly userService = UserService;

  public async getUser(req: TypedRequest, res: TypedResponse<UserResponse.Get>): Promise<void> {
    res.json({ ok: true, nickname: req.user!.nickname });
  }

  public async createUser(
    req: TypedRequest<CreateUserDto>,
    res: TypedResponse<UserResponse.Create>
  ): Promise<void> {
    const nickname = req.body.nickname.trim();

    const user = await this.userService.create(nickname, req.clientIp);
    const token = await user.generateToken();

    res.json({ ok: true, token });
  }
}

const UserController = new UserControllerClass();

export default UserController;
