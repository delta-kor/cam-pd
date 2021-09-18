import { Equals, IsString } from 'class-validator';
import dotenv from 'dotenv';
import IsNotBlank from '../decorators/notblank.decorator';

dotenv.config();

class UpdateVimeoTokenDto {
  @IsNotBlank()
  @Equals(process.env.SECRET, { message: '비밀키를 입력해주세요' })
  public secret!: string;

  @IsString()
  @IsNotBlank()
  public token!: string;
}

export default UpdateVimeoTokenDto;
